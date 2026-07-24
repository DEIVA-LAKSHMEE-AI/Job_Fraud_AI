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
  const geminiKey = process.env.GEMINI_API_KEY;

  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity expert analyzing job offers for fraud indicators. Provide concise, professional analysis.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
    }
  }

  if (geminiKey) {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      console.error('Gemini API error:', error);
    }
  }

  return 'Unable to analyze. Please configure API keys.';
}

async function analyzeWithAI(text: string): Promise<Partial<InvestigationResult>> {
  const analysisPrompt = `Analyze this job offer for fraud indicators and provide a trust score (0-100) and risk assessment. Keep response under 300 words.

Job Offer Content:
${text}

Provide analysis in this format:
TRUST_SCORE: [0-100]
RISK_LEVEL: [low/medium/high]
EMAIL_ANALYSIS: [brief analysis]
COMPANY_ANALYSIS: [brief analysis]
RECRUITER_ANALYSIS: [brief analysis]
WEBSITE_ANALYSIS: [brief analysis]
PHONE_ANALYSIS: [brief analysis]
SUMMARY: [brief summary]`;

  const aiResponse = await callAI(analysisPrompt);

  // Parse AI response
  const trustScoreMatch = aiResponse.match(/TRUST_SCORE:\s*(\d+)/);
  const riskMatch = aiResponse.match(/RISK_LEVEL:\s*(low|medium|high)/i);
  const emailMatch = aiResponse.match(/EMAIL_ANALYSIS:\s*([^\n]+)/);
  const companyMatch = aiResponse.match(/COMPANY_ANALYSIS:\s*([^\n]+)/);
  const recruiterMatch = aiResponse.match(/RECRUITER_ANALYSIS:\s*([^\n]+)/);
  const websiteMatch = aiResponse.match(/WEBSITE_ANALYSIS:\s*([^\n]+)/);
  const phoneMatch = aiResponse.match(/PHONE_ANALYSIS:\s*([^\n]+)/);
  const summaryMatch = aiResponse.match(/SUMMARY:\s*([\s\S]+?)(?=\n\w+:|$)/);

  return {
    trustScore: trustScoreMatch ? parseInt(trustScoreMatch[1]) : 65,
    riskLevel: (riskMatch?.[1]?.toLowerCase() as 'low' | 'medium' | 'high') || 'medium',
    emailDomainAnalysis: emailMatch?.[1] || 'Email domain analysis pending',
    companyAnalysis: companyMatch?.[1] || 'Company analysis pending',
    recruiterAnalysis: recruiterMatch?.[1] || 'Recruiter analysis pending',
    websiteAnalysis: websiteMatch?.[1] || 'Website analysis pending',
    phoneAnalysis: phoneMatch?.[1] || 'Phone analysis pending',
    summary: summaryMatch?.[1] || aiResponse.substring(0, 300),
  };
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

    // Extract information from text
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

    // Detect suspicious indicators
    const suspiciousIndicators = detectSuspiciousIndicators(text);

    // AI Analysis
    const aiAnalysis = await analyzeWithAI(text);

    // Generate recommendations
    const recommendations: string[] = [];
    if (aiAnalysis.riskLevel === 'low') {
      recommendations.push('Proceed Safely');
      recommendations.push('Contact official company HR to confirm');
    } else if (aiAnalysis.riskLevel === 'medium') {
      recommendations.push('Proceed with Caution');
      recommendations.push('Verify recruiter identity independently');
      recommendations.push('Check company website for official contact info');
    } else {
      recommendations.push('Avoid Sharing Personal Information');
      recommendations.push('Contact Company Official HR');
      recommendations.push('Never pay registration/verification fees');
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
