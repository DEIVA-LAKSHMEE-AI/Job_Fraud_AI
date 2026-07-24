export function extractEmailsFromText(text: string): string[] {
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
  return [...new Set(text.match(emailRegex) || [])];
}

export function extractPhoneNumbers(text: string): string[] {
  const phoneRegex = /(\+?1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+[1-9]\d{1,14}/g;
  return [...new Set(text.match(phoneRegex) || [])];
}

export function extractWebsites(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s]+|www\.[^\s]+/g;
  const matches = text.match(urlRegex) || [];
  return [...new Set(matches.map((url) => url.replace(/[.,;()]/g, '')))];
}

export function extractLinks(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s)]+/g;
  return [...new Set(text.match(urlRegex) || [])];
}

export function extractSalaryInfo(text: string): string | undefined {
  const salaryRegex = /\$[\d,]+(?:\s*-\s*\$[\d,]+)?|\b(\d{3,}(?:,\d{3})*)\s*(?:per\s+year|\/year|p\.a\.|annually|\/annum)\b/gi;
  const matches = text.match(salaryRegex);
  return matches ? matches[0] : undefined;
}

export function extractCompanyInfo(text: string): string | undefined {
  const companyRegex = /(?:at|from|with|at)\s+([A-Z][A-Za-z\s&,.'()-]+?)(?:\s+(?:is|has|will|we|our|the|Inc|LLC|Ltd|Corp|Co|Company|Inc\.|Corporation)|$|\.|\n|,)/i;
  const match = text.match(companyRegex);
  return match ? match[1].trim() : undefined;
}

export function extractRecruiterName(text: string): string | undefined {
  // Look for patterns like "I am [name]", "This is [name]", "Contact [name]"
  const recruiterRegex = /(?:I am|This is|My name is|Contact|Thank you,|Best regards,|Sincerely,)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/;
  const match = text.match(recruiterRegex);
  return match ? match[1].trim() : undefined;
}

export function extractJobRole(text: string): string | undefined {
  const roleRegex = /(?:for\s+(?:the\s+)?position\s+of|hire.*?(?:as|for)|apply.*?(?:for|as)|position.*?:|role.*?:|vacancy.*?:)\s+([A-Za-z\s]+?)(?:\.\s|,\s|\n|$)/i;
  const match = text.match(roleRegex);
  return match ? match[1].trim() : undefined;
}

export function extractJoiningDate(text: string): string | undefined {
  const dateRegex = /(?:joining|start|commence|begin|report)(?:\s+date)?.*?(?:on|is|by)?\s+(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\w+\s+\d{1,2},?\s+\d{4})/i;
  const match = text.match(dateRegex);
  return match ? match[1].trim() : undefined;
}

export function detectSuspiciousIndicators(text: string): string[] {
  const indicators: string[] = [];
  const lowercaseText = text.toLowerCase();

  // Payment/money related
  if (lowercaseText.includes('upfront') && lowercaseText.includes('fee')) {
    indicators.push('Requesting upfront payment fees');
  }
  if (lowercaseText.includes('western union') || lowercaseText.includes('money gram')) {
    indicators.push('Suspicious payment method requested');
  }
  if (lowercaseText.includes('transfer') && lowercaseText.includes('fee')) {
    indicators.push('Unusual transfer fee request');
  }

  // Urgency/pressure
  if (lowercaseText.includes('urgent') && lowercaseText.includes('immediately')) {
    indicators.push('High-pressure urgency language');
  }
  if (lowercaseText.includes('limited time') || lowercaseText.includes('act now')) {
    indicators.push('Artificial scarcity tactics');
  }

  // Poor communication
  if ((text.match(/spelling|grammar|error/gi) || []).length > 3) {
    indicators.push('Multiple spelling or grammar errors');
  }

  // Information gathering
  if (lowercaseText.includes('ssn') || lowercaseText.includes('social security')) {
    indicators.push('Requesting SSN information');
  }
  if (lowercaseText.includes('bank account') || lowercaseText.includes('banking details')) {
    indicators.push('Requesting banking information');
  }

  // Generic language
  if (lowercaseText.includes('dear candidate') || lowercaseText.includes('dear applicant')) {
    indicators.push('Generic greeting used');
  }

  // Too good to be true
  if (lowercaseText.match(/\$\d{6,}|high pay|easy money/gi)) {
    indicators.push('Unrealistic salary claims');
  }

  // Domain mismatches
  const emailRegex = /@([^\s.]+\.[^\s]+)/g;
  const domainMatches = text.match(emailRegex) || [];
  const companyLower = extractCompanyInfo(text)?.toLowerCase() || '';
  
  for (const domain of domainMatches) {
    const cleanDomain = domain.substring(1).split('.')[0].toLowerCase();
    if (companyLower && !companyLower.includes(cleanDomain) && !cleanDomain.includes('gmail') && !cleanDomain.includes('yahoo')) {
      indicators.push(`Email domain "${cleanDomain}" may not match company`);
    }
  }

  return [...new Set(indicators)];
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function isValidFileType(filename: string): boolean {
  const validTypes = ['pdf', 'docx', 'png', 'jpg', 'jpeg', 'webp', 'txt'];
  return validTypes.includes(getFileExtension(filename));
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
