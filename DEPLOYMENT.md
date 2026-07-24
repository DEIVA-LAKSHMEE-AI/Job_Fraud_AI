# Deployment Guide

## Quick Deployment Options

### 1. Vercel (Recommended) ⭐

**Why Vercel?**
- Optimized for Next.js
- Automatic deployments from Git
- Free tier available
- Zero configuration required

**Steps:**

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Visit [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Add environment variables:
   - Click "Environment Variables"
   - Add `OPENAI_API_KEY` or `GEMINI_API_KEY`
   - Add any Supabase variables if using

5. Click "Deploy"

6. Your site is live! (domain: `yourproject.vercel.app`)

**Custom Domain:**
- Go to Settings → Domains
- Enter your domain
- Follow DNS setup instructions

---

### 2. Netlify

**Steps:**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Set environment variables in Netlify dashboard

---

### 3. AWS Amplify

**Steps:**

1. Connect your GitHub repository
2. Choose `main` branch
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
4. Add environment variables
5. Deploy

---

### 4. Railway.app

**Steps:**

1. Visit [railway.app](https://railway.app)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Add environment variables in dashboard
5. Railway automatically deploys on git push

---

### 5. Self-Hosted (Docker)

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t jobshield-ai .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key \
  jobshield-ai
```

---

## Environment Variables Checklist

### Required
- [ ] `OPENAI_API_KEY` OR `GEMINI_API_KEY`

### Optional
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`

---

## Pre-Deployment Checklist

- [ ] Test locally: `npm run dev`
- [ ] Build locally: `npm run build`
- [ ] Run production build: `npm start`
- [ ] Check all environment variables
- [ ] Test file uploads
- [ ] Test PDF generation
- [ ] Test on mobile
- [ ] Check responsive design
- [ ] Verify API keys work
- [ ] Test error handling

---

## Performance Optimization

### Image Optimization
Already configured with Next.js Image component

### Bundle Size
- Automatic code splitting
- Tree shaking enabled
- Minified production builds

### Database Queries
- Server-side rendering where applicable
- API route caching

### CDN
- Automatic with Vercel/Netlify
- CloudFlare recommended for custom domains

---

## Monitoring & Analytics

### Logging
```bash
# Vercel
vercel logs

# Railway
railway logs
```

### Error Tracking (Optional)
- Sentry.io - Error tracking
- LogRocket - Session replay
- Posthog - Product analytics

---

## Scaling

### For Growing Traffic

1. **Database Optimization**
   - Add Supabase read replicas
   - Implement caching

2. **CDN**
   - Use CloudFlare
   - Set aggressive caching

3. **API Rate Limiting**
   - Implement on `/api/analyze`
   - Use Upstash Redis

4. **Load Testing**
   - Use k6 or Artillery
   - Test with expected traffic

---

## Cost Estimation

### Monthly Costs (Rough Estimates)

| Component | Free Tier | Paid Tier |
|-----------|-----------|-----------|
| Hosting (Vercel) | $0 | $20-200 |
| OpenAI API | Pay per use | $0.03-0.15/call |
| Gemini API | Pay per use | $0.001/call |
| Supabase | 500MB | $25+ |
| Domain | - | $10-15 |
| **Total** | **~$0-5** | **~$50-250** |

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### API Key Errors

- Verify format in .env.local
- Check API provider dashboard
- Ensure key has correct permissions

### File Upload Issues

- Check browser console for errors
- Verify file size < 10MB
- Check supported file types

### Slow Performance

- Check Next.js analytics
- Profile with DevTools
- Optimize AI API response time

---

## Next Steps

1. Deploy to production
2. Monitor error logs
3. Gather user feedback
4. Implement improvements
5. Scale infrastructure as needed

---

## Support

For deployment issues:
- Check platform documentation
- Review error logs
- Contact platform support
- Create GitHub issue
