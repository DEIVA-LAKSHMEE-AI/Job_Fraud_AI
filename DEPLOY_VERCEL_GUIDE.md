# 🚀 Deploy JobShield AI to Vercel - Complete Guide

**Goal**: Get your website LIVE on the internet in 30 minutes ✅

**What you'll get**:
- ✅ Live URL like: `jobshield-ai-xyz.vercel.app`
- ✅ Always online (never sleeps)
- ✅ Professional hosting
- ✅ Free SSL/HTTPS
- ✅ Auto-scaling for traffic

---

## ⏱️ Timeline

- **Step 1** (5 min): Get OpenAI API key
- **Step 2** (5 min): Create GitHub account & upload code
- **Step 3** (10 min): Connect Vercel & deploy
- **Step 4** (5 min): Test your live website
- **Step 5** (5 min): Optional - Add custom domain

**Total: 30 minutes**

---

# STEP 1: Get OpenAI API Key (5 min)

## 1.1 Go to OpenAI

Visit: https://platform.openai.com/account/api-keys

## 1.2 Sign in or Create Account

- If you don't have OpenAI account: Click "Sign up"
- If you have ChatGPT Plus: Use same email
- Complete verification

## 1.3 Create API Key

1. Click **"Create new secret key"** (blue button)
2. Copy the key immediately (looks like: `sk-...`)
3. **Save it somewhere safe** (Notepad, password manager, etc.)

⚠️ **IMPORTANT**: This key will be shown ONLY ONCE. Copy it now!

## 1.4 Set Up Payment (if needed)

1. Go to: https://platform.openai.com/account/billing/overview
2. Click **"Set up paid account"**
3. Add payment method (credit/debit card)
4. Set usage limit if desired (e.g., $10/month)

> **Note**: Free tier ChatGPT ≠ API key. You need to set up paid API access.

**Cost**: Usually $0.01 - $0.05 per analysis (very cheap!)

---

# STEP 2: Upload Code to GitHub (5 min)

## 2.1 Create GitHub Account

Visit: https://github.com/signup

1. Enter email
2. Create password
3. Confirm signup
4. Verify email

## 2.2 Create New Repository

1. Go to: https://github.com/new
2. Name: `jobshield-ai` (or any name)
3. Description: "AI job offer fraud detector"
4. Select **Public** (for free deployment)
5. Click **"Create repository"**

## 2.3 Upload Your Files

### Option A: Using GitHub Web Interface (Easiest)

1. On your new repo page, click **"uploading an existing file"**
2. Open file explorer → navigate to your `jobshield-ai` folder
3. Select all files (Ctrl+A) and drag them to the GitHub page
4. At bottom, click **"Commit changes"**
5. Write message: "Initial commit"
6. Click **"Commit"**

### Option B: Using Git Commands (If comfortable with terminal)

```bash
# In your jobshield-ai folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jobshield-ai.git
git push -u origin main
```

**⚠️ IMPORTANT**: Make sure `.env.local` is in `.gitignore` - Don't push your API key!

---

# STEP 3: Deploy to Vercel (10 min)

## 3.1 Go to Vercel

Visit: https://vercel.com

## 3.2 Sign Up with GitHub

1. Click **"Sign Up"**
2. Click **"Continue with GitHub"**
3. Authorize Vercel (click "Authorize")
4. Verify email if asked

## 3.3 Create New Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Paste your GitHub repo URL:
   ```
   https://github.com/YOUR_USERNAME/jobshield-ai
   ```
4. Click **"Import"**

## 3.4 Configure Environment Variables

**This is CRITICAL** ⚠️

1. You'll see "Environment Variables" section
2. Add your OpenAI key:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Paste your API key from Step 1
   - Click **"Add"**

```
Example:
Name:  OPENAI_API_KEY
Value: sk_test_abcdef123456789...
```

3. Click **"Deploy"** button

> The deployment will start automatically! ✅

---

# STEP 4: Wait for Deployment (5 min)

## What's happening

Vercel is:
1. ✅ Downloading your code
2. ✅ Installing dependencies
3. ✅ Building the website
4. ✅ Optimizing for production
5. ✅ Deploying to servers worldwide

## You'll see

- Real-time build progress
- Status messages
- When done: **Blue ✓ checkmark**

**Wait time**: Usually 3-5 minutes

---

# STEP 5: Get Your Live URL (1 min)

Once deployment finishes:

1. Look for: **"Congratulations! Your project is live"**
2. Click the blue link or look for:
   ```
   https://jobshield-ai-xxx.vercel.app
   ```

3. **Congratulations! Your website is LIVE!** 🎉

---

# STEP 6: Test Your Website (5 min)

Open your live URL in browser:

1. Click **"Start Investigation"**
2. Paste this test job offer:

```
Dear Candidate,

We are pleased to offer you a position in our company.

Company: Tech Corp
Recruiter: John Smith
Email: john@techcorp.com
Phone: +1 (555) 123-4567
Website: www.techcorp.com
Salary: $120,000 - $150,000
Start Date: January 15, 2024

Best regards,
John Smith
```

3. Click **"Start Investigation"**
4. Watch the animation
5. See your results
6. Download PDF

✅ **If this works, you're DONE!**

---

# Troubleshooting

## Problem: Deployment Failed

**Solution**:
1. Go to Vercel dashboard
2. Find your project
3. Click **"Deployments"**
4. Click failed deployment
5. Look at logs (red text = error)
6. Common issues:
   - Missing `package.json` → Fix: Upload correct files
   - API key not set → Fix: Go back to Step 3.4
   - Node version → Vercel auto-handles this

## Problem: Website shows error

**Solution**:
1. Open browser console (F12)
2. Look for red error messages
3. Check if API key is working
4. Wait 30 seconds and refresh

## Problem: "API Key Invalid"

**Solution**:
1. Go to https://platform.openai.com/account/api-keys
2. Delete old key
3. Create new key
4. Go to Vercel dashboard
5. Settings → Environment Variables
6. Update `OPENAI_API_KEY`
7. Redeploy (click "Deployments" → "Redeploy")

---

# 🎉 Your Website is LIVE!

## What you can do now:

### 1. Share your link
```
https://jobshield-ai-xxx.vercel.app
```
- ✅ Send to friends
- ✅ Post on social media
- ✅ Add to resume/portfolio
- ✅ Share on LinkedIn

### 2. Monitor your website

Go to Vercel dashboard to see:
- ✅ Visit analytics
- ✅ Build logs
- ✅ Performance metrics
- ✅ Traffic

### 3. Later: Add Custom Domain (Optional)

**Now** (free Vercel domain): `jobshield-ai-xxx.vercel.app`

**Later** (custom domain): `jobshield.com`

Steps:
1. Buy domain from Godaddy/Namecheap/etc (~$10/year)
2. Go to Vercel dashboard
3. Settings → Domains
4. Add your domain
5. Follow DNS instructions
6. Done! ✅

---

# Common Questions

### Q: Will it stay live forever?

**A**: Yes! Vercel keeps it running 24/7. You only pay for actual usage (very cheap on free tier).

### Q: Can I update the code?

**A**: Yes! Make changes locally, push to GitHub, and Vercel auto-deploys in seconds.

### Q: Is my data safe?

**A**: Yes! No data is stored. Each analysis is temporary.

### Q: How much does it cost?

**A**: Free for most usage. You only pay:
- Vercel: $0 for free tier
- OpenAI API: ~$0.01 per analysis
- Custom domain: ~$10/year

### Q: Can I add features later?

**A**: Yes! See ARCHITECTURE.md for how to extend.

---

# Next Steps

## Immediate (Right now!)
- [ ] Deploy to Vercel ✅
- [ ] Test your live site ✅
- [ ] Share the link with friends ✅

## This Week
- [ ] Monitor traffic in Vercel dashboard
- [ ] Get feedback from users
- [ ] Fix any bugs

## This Month
- [ ] Add custom domain
- [ ] Set up analytics
- [ ] Consider premium features

---

# Support

If you get stuck:

1. **Vercel Docs**: https://vercel.com/docs
2. **GitHub Help**: https://docs.github.com
3. **OpenAI Docs**: https://platform.openai.com/docs

---

## Summary

| Step | Time | Status |
|------|------|--------|
| 1. Get API Key | 5 min | ✅ |
| 2. Upload to GitHub | 5 min | ✅ |
| 3. Deploy to Vercel | 10 min | ✅ |
| 4. Get Live URL | 1 min | ✅ |
| 5. Test Website | 5 min | ✅ |
| **TOTAL** | **26 min** | **✅ LIVE!** |

---

## 🎊 Congratulations!

Your JobShield AI website is now LIVE on the internet! 

**Share it proudly:**
```
Check out my job offer fraud detector: https://jobshield-ai-xxx.vercel.app
```

You now have a **real, working website** that:
- ✅ Is always online
- ✅ Never sleeps
- ✅ Uses real AI
- ✅ Looks professional
- ✅ Works worldwide

**Don't Let Fake Job Offers Steal Your Future** 🛡️

---

**Next help**: Need to add a custom domain? See the "Add Custom Domain" section above!
