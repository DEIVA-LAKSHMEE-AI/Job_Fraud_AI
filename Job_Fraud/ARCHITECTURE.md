# Architecture & Extension Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                  │
├─────────────────────────────────────────────────────────┤
│  Pages      │ Components    │ Hooks        │ Store      │
│  - page.tsx │ - Hero        │ - useFileRef │ - Zustand  │
│  - layout   │ - Upload      │ - useState   │ - Context  │
│             │ - Results     │ - useEffect  │            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   API Routes (Node.js)                  │
├─────────────────────────────────────────────────────────┤
│  POST /api/analyze                                      │
│  ├─ Extract text from file                             │
│  ├─ Call AI service (OpenAI/Gemini)                    │
│  ├─ Parse AI response                                  │
│  └─ Return structured data                             │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
┌──────────────────────┐            ┌──────────────────────┐
│   AI Services        │            │   File Processing    │
│ ┌────────────────┐   │            │ ┌────────────────┐   │
│ │ OpenAI GPT-4   │   │            │ │ PDF.js         │   │
│ └────────────────┘   │            │ ├────────────────┤   │
│ ┌────────────────┐   │            │ │ Tesseract.js   │   │
│ │ Google Gemini  │   │            │ ├────────────────┤   │
│ └────────────────┘   │            │ │ Mammoth.js     │   │
└──────────────────────┘            │ └────────────────┘   │
                                    └──────────────────────┘
```

## Data Flow

### 1. File Upload
```
User Upload
    ↓
FileHandler.extractText()
    ↓
Text Extraction (TXT/PDF/DOCX/Image)
    ↓
POST /api/analyze
    ↓
Client State Update
```

### 2. Analysis Flow
```
Raw Text
    ↓
Information Extraction (Utils)
    ├─ Emails
    ├─ Phone Numbers
    ├─ Websites
    ├─ Salary Info
    ├─ Company Name
    └─ Recruiter Name
    ↓
Suspicious Indicators Detection
    ↓
AI Analysis (OpenAI/Gemini)
    ├─ Trust Score (0-100)
    ├─ Risk Level (low/medium/high)
    ├─ Domain Analysis
    ├─ Company Analysis
    ├─ Recruiter Analysis
    └─ Recommendations
    ↓
Return Structured Result
```

### 3. Report Generation
```
Investigation Data
    ↓
PDF Generation (jsPDF)
    ├─ Header & Metadata
    ├─ Trust Score Summary
    ├─ Extracted Information
    ├─ Suspicious Indicators
    ├─ Detailed Analysis
    └─ Recommendations
    ↓
Download PDF File
```

## Component Hierarchy

```
Root Layout
├── Navigation
├── Hero
├── UploadArea
│   ├── FileInput
│   ├── TextArea
│   └── ErrorDisplay
├── InvestigationScreen
│   └── InvestigationSteps (array)
├── ResultsScreen
│   ├── TrustScoreGauge
│   ├── RiskAssessment
│   ├── SuspiciousIndicators
│   ├── ExtractedInfo
│   │   └── InvestigationCard (array)
│   ├── AnalysisDetails
│   └── Recommendations
└── Footer
```

## State Management

### Zustand Store Structure

```typescript
{
  investigationData: {
    fileName: string
    uploadedAt: Date
    extracted: {
      company: string
      recruiter: string
      recruiterEmail: string
      // ... more fields
      rawText: string
    }
    result: {
      trustScore: number
      riskLevel: 'low' | 'medium' | 'high'
      emailDomainAnalysis: string
      // ... more fields
      recommendations: string[]
    }
  }
  isInvestigating: boolean
  // ... methods
}
```

## Extending the System

### 1. Adding OCR for PDFs

**Install Tesseract.js:**
```bash
npm install tesseract.js
```

**Update FileHandler.ts:**
```typescript
import Tesseract from 'tesseract.js';

private async extractFromPDF(file: File): Promise<string> {
  const worker = await Tesseract.createWorker();
  const result = await worker.recognize(file);
  await worker.terminate();
  return result.data.text;
}
```

### 2. Adding Domain Verification

**Create new API route: `/api/verify-domain`**

```typescript
export async function POST(req: NextRequest) {
  const { domain, company } = await req.json();
  
  // Use DNS API to verify domain
  // Use WHOIS API to check registration
  // Return verification status
}
```

**Update analysis to include domain verification:**
```typescript
// In /api/analyze
const domainVerification = await verifyDomain(website);
```

### 3. Adding Recruiter Verification

**Create `/api/verify-recruiter`**

```typescript
export async function POST(req: NextRequest) {
  const { email, name, company } = await req.json();
  
  // Check LinkedIn profile
  // Verify email with Hunter.io or similar
  // Check company directory
  // Return verification status
}
```

### 4. Adding Database Logging

**Install Supabase client:**
```bash
npm install @supabase/supabase-js
```

**Create `/lib/supabase.ts`:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function logInvestigation(data: InvestigationData) {
  const { error } = await supabase
    .from('investigations')
    .insert([data]);
  
  if (error) throw error;
}
```

### 5. Adding Email Verification

**Create `/api/verify-email`**

```typescript
// Using Hunter.io API
const verifyEmail = async (email: string) => {
  const response = await fetch(
    `https://api.hunter.io/v2/email-verifier?email=${email}`,
    {
      headers: { Authorization: `Bearer ${process.env.HUNTER_API_KEY}` }
    }
  );
  return response.json();
};
```

### 6. Advanced Fraud Detection

**Create `/lib/fraudDetector.ts`**

```typescript
export async function detectFraudPatterns(text: string) {
  const patterns = [
    // Work-from-home scams
    /work from home|remote position|no experience/i,
    
    // Payment scams
    /upfront|fee|deposit|gift card/i,
    
    // Romance/advance fee scams
    /financial hardship|emergency|urgent money/i,
    
    // Identity theft
    /social security|ssn|bank account|credit card/i,
  ];
  
  return patterns.filter(p => p.test(text));
}
```

### 7. Adding Notifications

**Install Resend for emails:**
```bash
npm install resend
```

**Create notification service:**
```typescript
export async function notifyHighRisk(
  investigation: InvestigationData,
  userEmail: string
) {
  if (investigation.result.riskLevel === 'high') {
    await resend.emails.send({
      from: 'alerts@jobshield.ai',
      to: userEmail,
      subject: 'High-Risk Job Offer Detected',
      html: `<p>We detected a high-risk offer...</p>`
    });
  }
}
```

### 8. Adding Analytics

**Install PostHog:**
```bash
npm install posthog-js
```

**Track events:**
```typescript
import { usePostHog } from 'posthog-js/react';

export function useAnalytics() {
  const posthog = usePostHog();
  
  const trackAnalysis = (riskLevel: string) => {
    posthog.capture('investigation_complete', {
      riskLevel,
      timestamp: new Date()
    });
  };
  
  return { trackAnalysis };
}
```

## Performance Considerations

### Current Optimization

- ✅ Code splitting by route
- ✅ Dynamic imports for heavy components
- ✅ Image optimization
- ✅ CSS minification
- ✅ Font subsetting

### Recommended Additions

- [ ] Add service worker for offline support
- [ ] Implement request caching
- [ ] Add compression for API responses
- [ ] Database query optimization
- [ ] API rate limiting with Redis

## Security Checklist

- [x] No sensitive data in client code
- [x] Environment variables for secrets
- [x] HTTPS in production
- [x] Input validation
- [ ] Rate limiting on API endpoints
- [ ] CORS configuration
- [ ] CSP headers
- [ ] XSS protection
- [ ] CSRF tokens

## Testing Strategy

### Unit Tests
```bash
npm install --save-dev jest @testing-library/react

# Test utils
jest lib/utils.test.ts
```

### Integration Tests
```bash
# Test API routes
jest app/api/__tests__/analyze.test.ts
```

### E2E Tests
```bash
npm install --save-dev playwright

# Test full user flow
npx playwright test
```

## Deployment Pipeline

```
Git Push
  ↓
GitHub Actions (CI)
  ├─ Run tests
  ├─ Lint code
  └─ Build Next.js
  ↓
Auto Deploy (CD)
  ├─ Staging environment
  ├─ Run smoke tests
  └─ Production deploy
```

## Monitoring & Maintenance

### Error Tracking
- Sentry.io for errors
- LogRocket for user sessions
- Custom logging to database

### Performance Monitoring
- Vercel Analytics
- Web Vitals tracking
- API response time logging

### Regular Tasks
- Update dependencies
- Security audits
- Performance profiling
- Database maintenance
- Log cleanup

---

This architecture is designed to be scalable, maintainable, and easy to extend with new features.
