import { NextRequest, NextResponse } from 'next/server';
import {
  extractEmailsFromText,
  extractPhoneNumbers,
  extractWebsites,
  extractSalaryInfo,
  extractCompanyInfo,
  extractRecruiterName,
  extractJobRole,
  extractJoiningDate,
  extractLinks,
  detectSuspiciousIndicators,
} from '@/lib/utils';
import { ExtractedInformation, InvestigationResult } from '@/lib/store';

async function callAI(prompt: string): Promise<string> {
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey) {
    console.error('OPENAI_API_KEY not configured');
    return 'API key not configured';
  }

  try {
    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a cybersecurity expert analyzing job offers for fraud indicators. Provide DETAILED, specific analysis. DO NOT ask users to verify things - YOU do the analysis and provide facts. Be thorough and technical.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI Error:', data.error);
      return `API Error: ${data.error.message}`;
    }

    if (data.choices?.[0]?.message?.content) {
      console.log('AI Response received');
      return data.choices[0].message.content;
    }

    console.error('Unexpected OpenAI response:', data);
    return 'No response from AI';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

async function analyzeWithAI(text: string): Promise<Partial<InvestigationResult>> {
  const analysisPrompt = `You are analyzing a job offer for fraud. Provide DETAILED analysis for EACH section. DO NOT ask users to verify - YOU analyze and provide findings.

Job Offer:
${text}

IMPORTANT: Analyze each section thoroughly. Look for:
- Email domain mismatches (does it match official company domain?)
- Company legitimacy issues
- Recruiter verification problems
- Website red flags
- Phone number validity

Provide response in EXACTLY this format (multi-line sections allowed):

TRUST_SCORE: [0-100 number]
RISK_LEVEL: [low/medium/high]
EMAIL_ANALYSIS: [Detailed analysis of email domain - does it match the company? Any red flags?]
COMPANY_ANALYSIS: [Detailed analysis - is company name verified? Any issues found?]
RECRUITER_ANALYSIS: [Detailed analysis - does recruiter info appear legitimate? Red flags?]
WEBSITE_ANALYSIS: [Detailed analysis - is website legitimate? Suspicious elements?]
PHONE_ANALYSIS: [Detailed analysis - phone format valid? Any red flags?]
SUMMARY: [2-3 sentence summary of findings]`;

  const aiResponse = await callAI(analysisPrompt);

  console.log('Parsing AI response...');

  const trustScoreMatch = aiResponse.match(/TRUST_SCORE:\s*(\d+)/i);
  const riskMatch = aiResponse.match(/RISK_LEVEL:\s*(low|medium|high)/i);
  
  const emailMatch = aiResponse.match(/EMAIL_ANALYSIS:\s*(.+?)(?=COMPANY_ANALYSIS:|RECRUITER_ANALYSIS:|WEBSITE_ANALYSIS:|PHONE_ANALYSIS:|SUMMARY:|$)/is);
  const companyMatch = aiResponse.match(/COMPANY_ANALYSIS:\s*(.+?)(?=RECRUITER_ANALYSIS:|EMAIL_ANALYSIS:|WEBSITE_ANALYSIS:|PHONE_ANALYSIS:|SUMMARY:|$)/is);
  const recruiterMatch = aiResponse.match(/RECRUITER_ANALYSIS:\s*(.+?)(?=WEBSITE_ANALYSIS:|EMAIL_ANALYSIS:|COMPANY_ANALYSIS:|PHONE_ANALYSIS:|SUMMARY:|$)/is);
  const websiteMatch = aiResponse.match(/WEBSITE_ANALYSIS:\s*(.+?)(?=PHONE_ANALYSIS:|EMAIL_ANALYSIS:|COMPANY_ANALYSIS:|RECRUITER_ANALYSIS:|SUMMARY:|$)/is);
  const phoneMatch = aiResponse.match(/PHONE_ANALYSIS:\s*(.+?)(?=SUMMARY:|EMAIL_ANALYSIS:|COMPANY_ANALYSIS:|RECRUITER_ANALYSIS:|WEBSITE_ANALYSIS:|$)/is);
  const summaryMatch = aiResponse.match(/SUMMARY:\s*(.+?)$/is);

  const parseSection = (match: RegExpMatchArray | null): string => {
    if (!match) return '';
    return match[1]?.trim().replace(/\n+/g, ' ') || '';
  };

  const result = {
    trustScore: trustScoreMatch ? Math.min(100, Math.max(0, parseInt(trustScoreMatch[1]))) : 50,
    riskLevel: (riskMatch?.[1]?.toLowerCase() as 'low' | 'medium' | 'high') || 'medium',
    emailDomainAnalysis: parseSection(emailMatch) || 'Email domain analysis: Unable to determine',
    companyAnalysis: parseSection(companyMatch) || 'Company analysis: Unable to determine',
    recruiterAnalysis: parseSection(recruiterMatch) || 'Recruiter analysis: Unable to determine',
    websiteAnalysis: parseSection(websiteMatch) || 'Website analysis: Unable to determine',
    phoneAnalysis: parseSection(phoneMatch) || 'Phone analysis: Unable to determine',
    summary: parseSection(summaryMatch) || aiResponse.substring(0, 300),
  };

  console.log('Parsed result:', result);
  return result;
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: text is required' },
        { status: 400 }
      );
    }

    const extracted: ExtractedInformation = {
      company: extractCompanyInfo(text),
      recruiter: extractRecruiterName(text),
      recruiterEmail: extractEmailsFromText(text)[0],
      phoneNumber: extractPhoneNumbers(text)[0],
      website: extractWebsites(text)[0],
      salary: extractSalaryInfo(text),
      jobRole: extractJobRole(text),
      joiningDate: extractJoiningDate(text),
      requestedDocuments: [],
      links: extractLinks(text),
      deadlines: [],
      rawText: text,
    };

    const suspiciousIndicators = detectSuspiciousIndicators(text);
    const aiAnalysis = await analyzeWithAI(text);

    const recommendations: string[] = [];
    if (aiAnalysis.riskLevel === 'low') {
      recommendations.push('✓ Appears legitimate - Proceed to next stage');
      recommendations.push('✓ Email domain verified as legitimate');
      recommendations.push('✓ Company information verified');
      recommendations.push('✓ Recruiter details appear authentic');
    } else if (aiAnalysis.riskLevel === 'medium') {
      recommendations.push('⚠ Multiple red flags detected');
      recommendations.push('⚠ Email domain may not match official company domain');
      recommendations.push('⚠ Company details require verification');
      recommendations.push('⚠ Recruiter information appears questionable');
      recommendations.push('Action: Contact company official HR directly to confirm');
    } else {
      recommendations.push('🚫 HIGH RISK - Likely fraudulent');
      recommendations.push('🚫 DO NOT provide personal information');
      recommendations.push('🚫 DO NOT click links or download files');
      recommendations.push('🚫 DO NOT send money for any reason');
      recommendations.push('🚫 DO NOT respond to this offer');
      recommendations.push('Action: Report to company and relevant authorities');
    }

    const result: InvestigationResult = {
      trustScore: aiAnalysis.trustScore || 65,
      riskLevel: aiAnalysis.riskLevel || 'medium',
      emailDomainAnalysis: aiAnalysis.emailDomainAnalysis || 'Analysis pending',
      companyAnalysis: aiAnalysis.companyAnalysis || 'Analysis pending',
      recruiterAnalysis: aiAnalysis.recruiterAnalysis || 'Analysis pending',
      websiteAnalysis: aiAnalysis.websiteAnalysis || 'Analysis pending',
      phoneAnalysis: aiAnalysis.phoneAnalysis || 'Analysis pending',
      suspiciousIndicators,
      recommendations,
      summary: aiAnalysis.summary || 'Analysis complete',
    };

    return NextResponse.json({
      extracted,
      result,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
