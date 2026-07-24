# API Documentation

## Overview

JobShield AI provides a REST API for analyzing job offers and detecting fraud. Currently, the API is designed for client-side usage but can be extended for server-to-server communication.

## Authentication

Currently, no authentication is required. In production, consider adding:
- API key authentication
- Rate limiting
- Request signing

## Endpoints

### POST /api/analyze

Analyzes a job offer text for fraud indicators and suspicious patterns.

#### Request

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Job offer content here..."}'
```

#### Request Body

```json
{
  "text": "string (required) - The job offer text to analyze"
}
```

#### Response (Success - 200)

```json
{
  "extracted": {
    "company": "string|null",
    "recruiter": "string|null",
    "recruiterEmail": "string|null",
    "phoneNumber": "string|null",
    "website": "string|null",
    "salary": "string|null",
    "jobRole": "string|null",
    "joiningDate": "string|null",
    "interviewProcess": "string|null",
    "requestedDocuments": ["string"],
    "links": ["string"],
    "deadlines": ["string"],
    "rawText": "string"
  },
  "result": {
    "trustScore": 0-100,
    "riskLevel": "low|medium|high",
    "emailDomainAnalysis": "string",
    "companyAnalysis": "string",
    "recruiterAnalysis": "string",
    "websiteAnalysis": "string",
    "phoneAnalysis": "string",
    "suspiciousIndicators": ["string"],
    "recommendations": ["string"],
    "summary": "string"
  }
}
```

#### Response (Error - 400)

```json
{
  "error": "Invalid input: text is required"
}
```

#### Response (Error - 500)

```json
{
  "error": "Analysis failed. Please try again."
}
```

#### Example Request

```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: `
      Dear Candidate,
      
      We are pleased to offer you the position of Senior Developer.
      
      Company: Tech Corp Inc.
      Contact: John Smith
      Email: john@techcorp.com
      Phone: (555) 123-4567
      Website: www.techcorp.com
      Salary: $120,000 - $150,000 per year
      Start Date: January 15, 2024
    `
  })
});

const data = await response.json();
console.log(data.result.trustScore); // 85
console.log(data.result.riskLevel); // 'low'
```

## Data Types

### ExtractedInformation

```typescript
{
  company?: string;                 // Company name
  recruiter?: string;               // Recruiter/hiring manager name
  recruiterEmail?: string;          // Contact email
  phoneNumber?: string;             // Contact phone
  website?: string;                 // Company website
  salary?: string;                  // Salary information
  jobRole?: string;                 // Job title/role
  joiningDate?: string;             // Expected start date
  interviewProcess?: string;        // Interview timeline
  requestedDocuments?: string[];    // Documents requested
  links?: string[];                 // URLs found in text
  deadlines?: string[];             // Application deadlines
  rawText: string;                  // Original text
}
```

### InvestigationResult

```typescript
{
  trustScore: number;               // 0-100 confidence score
  riskLevel: 'low'|'medium'|'high'; // Risk classification
  emailDomainAnalysis: string;      // Email domain assessment
  companyAnalysis: string;          // Company legitimacy check
  recruiterAnalysis: string;        // Recruiter information review
  websiteAnalysis: string;          // Website validity check
  phoneAnalysis: string;            // Phone number verification
  suspiciousIndicators: string[];   // Detected red flags
  recommendations: string[];        // Suggested next steps
  summary: string;                  // Overall assessment
}
```

## Trust Score Interpretation

| Score | Risk Level | Meaning |
|-------|-----------|---------|
| 80-100 | Low | Appears to be a legitimate offer |
| 50-79 | Medium | Some suspicious elements detected |
| 0-49 | High | Multiple red flags present |

## Suspicious Indicators

The API detects various suspicious patterns:

### Payment-Related
- "Requesting upfront payment fees"
- "Suspicious payment method requested" (Western Union, MoneyGram)
- "Unusual transfer fee request"

### Urgency & Pressure
- "High-pressure urgency language"
- "Artificial scarcity tactics"

### Poor Communication
- "Multiple spelling or grammar errors"

### Information Gathering
- "Requesting SSN information"
- "Requesting banking information"

### Generic Patterns
- "Generic greeting used"
- "Unrealistic salary claims"
- "Email domain may not match company"

## Rate Limiting (Future)

```
Tier | Requests/Hour | API Cost
-----|---------------|----------
Free | 100           | Free
Pro  | 1000          | $9/month
Team | 10000         | $99/month
```

## Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Invalid input | Check request format |
| 401 | Unauthorized | Add API key (future) |
| 429 | Too many requests | Wait before retrying |
| 500 | Server error | Retry or contact support |

## Code Examples

### JavaScript/TypeScript

```typescript
import { InvestigationData, ExtractedInformation, InvestigationResult } from '@/lib/store';

interface AnalyzeResponse {
  extracted: ExtractedInformation;
  result: InvestigationResult;
}

async function analyzeJobOffer(text: string): Promise<AnalyzeResponse> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

// Usage
try {
  const result = await analyzeJobOffer(jobOfferText);
  console.log(`Trust Score: ${result.result.trustScore}%`);
  console.log(`Risk Level: ${result.result.riskLevel}`);
} catch (error) {
  console.error('Analysis failed:', error);
}
```

### Python

```python
import requests
import json

def analyze_job_offer(text: str) -> dict:
    """Analyze a job offer for fraud indicators."""
    
    url = "http://localhost:3000/api/analyze"
    payload = {"text": text}
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()

# Usage
result = analyze_job_offer("Job offer text here...")
print(f"Trust Score: {result['result']['trustScore']}%")
print(f"Risk Level: {result['result']['riskLevel']}")
```

### cURL

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Dear Candidate, We are pleased to offer you..."
  }' | jq '.result | {trustScore, riskLevel}'
```

## Batch Processing (Future)

```bash
POST /api/analyze/batch

{
  "jobs": [
    { "id": "1", "text": "..." },
    { "id": "2", "text": "..." }
  ]
}

Response:
{
  "results": [
    { "id": "1", "result": {...} },
    { "id": "2", "result": {...} }
  ]
}
```

## Webhooks (Future)

```typescript
// Register webhook
POST /api/webhooks
{
  "url": "https://yourapp.com/webhook",
  "events": ["analysis.complete", "high_risk_detected"]
}

// Webhook payload
{
  "event": "analysis.complete",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "analysis_123",
    "trustScore": 45,
    "riskLevel": "high"
  }
}
```

## Best Practices

### Input Validation
- Ensure text is between 10-100,000 characters
- Remove PII before submitting (optional)
- Use HTTPS in production

### Error Handling
```javascript
try {
  const result = await analyzeJobOffer(text);
} catch (error) {
  if (error.response?.status === 400) {
    // Validation error
  } else if (error.response?.status === 429) {
    // Rate limited - implement exponential backoff
  } else {
    // Server error
  }
}
```

### Performance
- Cache results for identical inputs
- Batch similar analysis requests
- Implement request timeout (30s recommended)

### Security
- Never expose API keys in client code
- Use HTTPS for all requests
- Validate server responses
- Implement rate limiting on client side

## Support

For API questions:
- Documentation: [https://jobshield.ai/docs](https://jobshield.ai/docs)
- Issues: [GitHub Issues](https://github.com/jobshield-ai/issues)
- Email: api@jobshield.ai

## Changelog

### v1.0.0 (Current)
- Initial release
- Text analysis endpoint
- Fraud detection
- PDF report generation

### v1.1.0 (Planned)
- OCR support
- Batch processing
- Webhooks
- API key authentication

### v2.0.0 (Future)
- Advanced domain verification
- Recruiter background checks
- Machine learning models
- Custom fraud patterns
