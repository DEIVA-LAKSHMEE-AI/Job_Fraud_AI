# Quick Start Guide

Get JobShield AI running in 5 minutes ⚡

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn
- OpenAI or Gemini API key
- Code editor (VSCode recommended)

## Step 1: Get API Key (2 minutes)

### Option A: OpenAI (GPT-4)

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Go to "API keys"
4. Click "Create new secret key"
5. Copy the key (you'll use it in step 3)

### Option B: Google Gemini (Free tier available)

1. Visit [ai.google.dev](https://ai.google.dev)
2. Click "Get API key"
3. Create new API key
4. Copy the key

## Step 2: Setup Project (2 minutes)

```bash
# 1. Create directory and navigate to it
mkdir jobshield-ai && cd jobshield-ai

# 2. Copy all files from this folder into jobshield-ai/

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.local.example .env.local
```

## Step 3: Configure API Key (1 minute)

**Edit `.env.local`** and add your API key:

```env
# If using OpenAI
OPENAI_API_KEY=sk_test_your_actual_key_here

# OR if using Google Gemini
GEMINI_API_KEY=your_actual_key_here
```

⚠️ **Never commit `.env.local` to GitHub!** It's in `.gitignore` for security.

## Step 4: Run Application (0 minutes)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

## Step 5: Test It

1. Paste this sample job offer into the text area:

```
Dear Candidate,

We are impressed with your profile and would like to offer you a position 
in our company. We are a growing tech startup based in Silicon Valley.

Position: Senior Developer
Company: TechCorp Solutions
Recruiter: John Smith
Email: john@techcorp-solutions.com
Phone: +1 (555) 123-4567
Website: www.techcorp-solutions.com
Salary: $150,000 - $200,000 per year
Start Date: February 1, 2024

Please confirm your interest by clicking the link below:
https://techcorp-solutions.com/confirm-offer

Best regards,
John Smith
Recruitment Team
```

2. Click "Start Investigation"
3. Watch the animated analysis
4. View the results and download the PDF report

## Common Issues

### Issue: "OpenAI API error"
**Solution:**
- Check API key is correct (no extra spaces)
- Verify you have API credits
- Check API key has correct permissions

### Issue: "Port 3000 already in use"
**Solution:**
```bash
npm run dev -- -p 3001
# Runs on port 3001 instead
```

### Issue: Module not found errors
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Application crashes on startup
**Solution:**
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run dev
```

## Deployment (Optional)

Ready to go live? Choose one:

### Easiest: Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add API key in environment variables
5. Click Deploy ✅

→ See [DEPLOYMENT.md](./DEPLOYMENT.md) for more options

## What's Included

✅ **Frontend**
- Beautiful responsive UI
- Glassmorphism design
- Animated trust score gauge
- PDF report generation
- Dark mode

✅ **Backend**
- AI-powered analysis
- Fraud detection
- Information extraction
- Email/phone/website verification

✅ **Features**
- Drag-and-drop file upload
- Text paste support
- Automatic data extraction
- Investigation animation
- Risk assessment
- Suspicious indicator detection

## Next Steps

### Learn More
- [README.md](./README.md) - Full documentation
- [API.md](./API.md) - API reference
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Hosting guide

### Customize
- Edit colors in `tailwind.config.js`
- Change AI model in `app/api/analyze/route.ts`
- Modify analysis logic in `lib/utils.ts`
- Update UI in `components/`

### Extend
- Add OCR for images/PDFs
- Integrate domain verification
- Add recruiter background checks
- Build mobile app
- Add authentication

## File Structure

```
jobshield-ai/
├── app/                          # Next.js app directory
│   ├── api/analyze/              # AI analysis endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── Hero.tsx
│   ├── UploadArea.tsx
│   ├── InvestigationScreen.tsx
│   ├── ResultsScreen.tsx
│   └── ... more
├── lib/                          # Utilities
│   ├── store.ts                  # State management
│   ├── utils.ts                  # Helper functions
│   ├── fileHandler.ts            # File processing
│   └── pdfGenerator.ts           # PDF creation
├── .env.local                    # Environment variables (YOUR KEYS!)
├── package.json                  # Dependencies
└── tailwind.config.js            # Tailwind setup
```

## Tips & Tricks

### Add Custom Domain
```bash
# Deploy to Vercel first, then add domain in dashboard
```

### Monitor Performance
```bash
# Build production bundle
npm run build

# Check bundle size
npm run build -- --analyze
```

### Enable HTTPS Locally
```bash
npm install -g mkcert
mkcert -install
npm run dev -- --cert
```

### Debug Mode
```bash
# Enable debug logging
NODE_DEBUG=* npm run dev
```

## Support

Stuck? Try:
1. Check [README.md](./README.md)
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Check error messages in console
4. Create GitHub issue
5. Email: support@jobshield.ai

## Security Checklist

Before going to production:

- [ ] API keys in `.env.local` only
- [ ] `.env.local` in `.gitignore`
- [ ] HTTPS enabled
- [ ] Content Security Policy configured
- [ ] Input validation enabled
- [ ] Rate limiting configured
- [ ] Error messages don't expose secrets
- [ ] Regular security audits

## License

MIT - Use freely for personal and commercial projects

---

**You're all set!** 🚀

The application is now running. Start by analyzing a test job offer, then explore the features. 

Need help? Check the documentation files or create an issue on GitHub.
