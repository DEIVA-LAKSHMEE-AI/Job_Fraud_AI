# JobShield AI - Premium AI Job Offer Investigation Platform

A production-ready web application that analyzes job offers, emails, PDFs, and documents to detect fraud, phishing, and suspicious recruitment practices using AI.

## 🌟 Features

- **One-Click Analysis**: Upload a file or paste text for immediate investigation
- **AI-Powered Detection**: Leverages OpenAI or Gemini API for comprehensive fraud analysis
- **Smart Information Extraction**: Automatically identifies company, recruiter, email, phone, salary, and more
- **Trust Score Gauge**: Visual representation of offer legitimacy (0-100%)
- **Risk Assessment**: Low, Medium, or High risk classification
- **Suspicious Indicators**: Detects common phishing and fraud patterns
- **Detailed Report**: Professional PDF report generation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Premium UI**: Elegant glassmorphism design inspired by industry leaders

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key OR Gemini API key
- Supabase account (optional, for storage features)

### Installation

1. **Clone and setup**:
```bash
npm install
```

2. **Configure environment variables**:
```bash
cp .env.local.example .env.local
```

3. **Edit `.env.local`** with your credentials:
```env
# Choose one AI provider
OPENAI_API_KEY=sk_... # For OpenAI
# OR
GEMINI_API_KEY=... # For Google Gemini

# Optional: Supabase (for file storage in future)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
jobshield-ai/
├── app/
│   ├── api/
│   │   └── analyze/           # AI analysis endpoint
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page
│   └── globals.css            # Global styles
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── UploadArea.tsx
│   ├── InvestigationScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── TrustScoreGauge.tsx
│   ├── InvestigationCard.tsx
│   └── Footer.tsx
├── lib/
│   ├── store.ts               # Zustand state management
│   ├── utils.ts               # Helper functions
│   ├── fileHandler.ts         # File extraction logic
│   └── pdfGenerator.ts        # PDF report generation
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
└── package.json
```

## 🔧 Configuration

### Choosing Your AI Provider

#### OpenAI (GPT-4)
```env
OPENAI_API_KEY=sk_test_...
```

#### Google Gemini
```env
GEMINI_API_KEY=AIzaSy...
```

Both providers are supported. The app will use whichever API key is configured.

## 🎨 Design System

### Colors
- **Background**: `#09090B` (Almost black)
- **Card**: `#18181B` (Dark gray)
- **Primary**: `#6366F1` (Indigo)
- **Accent**: `#8B5CF6` (Purple)
- **Success**: `#22C55E` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Danger**: `#EF4444` (Red)

### Typography
- **Headings**: Space Grotesk
- **Body**: Inter

### Components
- Glassmorphism cards
- Animated gradients
- Floating particles
- Smooth transitions
- Responsive layouts

## 📊 How It Works

1. **Upload/Paste**: User provides job offer content
2. **Extraction**: System extracts key information (company, recruiter, salary, etc.)
3. **Analysis**: AI analyzes content for fraud patterns and risks
4. **Investigation**: Visual step-by-step animation of analysis process
5. **Results**: Comprehensive report with trust score, risk assessment, and recommendations
6. **Download**: User can download professional PDF report

## 🤖 AI Analysis Features

The system analyzes:

- **Email Domain**: Checks if email domain matches company
- **Company Information**: Verifies company details and legitimacy
- **Recruiter Details**: Analyzes recruiter information and patterns
- **Website**: Validates website URLs and legitimacy
- **Phone Numbers**: Checks phone number formatting and patterns
- **Suspicious Indicators**:
  - Upfront payment requests
  - Unusual money transfer methods
  - High-pressure urgency language
  - Poor grammar/spelling
  - Requesting sensitive information (SSN, banking details)
  - Generic greetings
  - Unrealistic salary claims
  - Domain mismatches

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git push origin main
```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

### Deploy to Other Platforms

Works with any platform supporting Node.js 18+:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted servers

## 🔒 Security

- No authentication required (client-side only)
- API keys stored in environment variables
- Files processed client-side before sending to AI
- No file storage (optional Supabase integration available)
- HTTPS recommended for production
- Regular security audits recommended

## 📈 Performance

- Optimized bundle size
- Fast page loads with code splitting
- Smooth animations (60fps)
- Responsive images
- CSS minification

## 🛣️ Future Enhancements

- [ ] OCR for image processing
- [ ] Domain verification API integration
- [ ] Recruiter background checks
- [ ] Advanced pattern detection
- [ ] Multi-language support
- [ ] Chrome extension
- [ ] Mobile app (React Native)
- [ ] API for businesses
- [ ] Analytics dashboard
- [ ] Collaboration features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for commercial purposes.

## 📞 Support

For issues, questions, or feedback:
- Email: support@jobshield.ai
- Twitter: @JobShieldAI
- GitHub Issues: [GitHub](https://github.com)

## 🙏 Acknowledgments

- Inspired by Stripe, Linear, Notion, Perplexity, and ChatGPT
- Built with Next.js, Tailwind CSS, and Framer Motion
- AI powered by OpenAI and Google Gemini

---

**Don't Let Fake Job Offers Steal Your Future** 🛡️
