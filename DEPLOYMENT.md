# 🚀 Deployment Guide - Pulse AI

Complete guide to deploying your Pulse AI website to production.

## 📋 Pre-Deployment Checklist

- [x] Build passes locally (`npm run build`)
- [x] No TypeScript errors
- [x] Images load correctly
- [x] All routes working
- [x] Git repository initialized
- [x] Content finalized in `posts.json`

## 🔧 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero-config deployments
- Automatic HTTPS
- Global CDN
- Instant rollbacks
- Free hobby tier

#### Steps:

1. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub
   git remote add origin https://github.com/YOUR_USERNAME/pulse-ai.git
   git push -u origin master
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!**
   - Your site deploys in ~2 minutes
   - Get a `.vercel.app` domain automatically
   - Configure custom domain in settings

#### Vercel CLI Alternative:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd pulse-ai
vercel

# Deploy to production
vercel --prod
```

### Option 2: Netlify

1. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

3. **Deploy:**
   - Connect GitHub repository
   - Configure build settings
   - Deploy

### Option 3: AWS Amplify

1. **Connect repository**
2. **Build settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Option 4: Self-Hosted (VPS/Docker)

#### Using Docker:

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

Update `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
  // ... rest of config
};
```

Build and run:
```bash
docker build -t pulse-ai .
docker run -p 3000:3000 pulse-ai
```

#### Using PM2 (Node process manager):

```bash
# Install PM2
npm install -g pm2

# Build
npm run build

# Start with PM2
pm2 start npm --name "pulse-ai" -- start

# Enable on system boot
pm2 startup
pm2 save
```

## 🌐 Custom Domain Setup

### Vercel:

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Cloudflare (Optional):

Add Cloudflare for:
- Additional CDN layer
- DDoS protection
- Analytics
- Flexible SSL

DNS settings:
```
Type: CNAME
Name: @
Value: your-project.vercel.app
Proxy: Enabled
```

## 🔒 Security Best Practices

### 1. Environment Variables

Even though this project doesn't need them initially, for future integrations:

```bash
# .env.local (never commit this!)
NEXT_PUBLIC_SITE_URL=https://pulseai.com
MAILCHIMP_API_KEY=your_key_here
ANALYTICS_ID=your_analytics_id
```

In Vercel: Settings → Environment Variables

### 2. Content Security Policy

Add to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

### 3. Rate Limiting

For API routes (when you add email signup):
```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
```

## 📊 Analytics Setup

### Vercel Analytics (Built-in):

```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics 4:

```bash
npm install @next/third-parties
```

```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

### Plausible (Privacy-friendly):

```typescript
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
```

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
```bash
# Ensure all dependencies are in package.json
npm install --save <missing-package>
git add package.json package-lock.json
git commit -m "Fix: Add missing dependency"
git push
```

**Error: "Out of memory"**
- Increase Node memory in `package.json`:
```json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Images Not Loading

**Unsplash images blocked:**
- Ensure `next.config.ts` has remotePatterns configured
- Check browser console for CSP errors

**Local images 404:**
- Verify files are in `/public` directory
- Use `/images/file.jpg` not `./images/file.jpg`

### Hydration Errors

**Mismatch between server and client:**
- Don't use `Date.now()` or random values in SSR
- Ensure consistent HTML structure
- Check for browser extensions modifying HTML

## 📈 Performance Optimization

### Image Optimization

Already handled by Next.js Image component, but ensure:
- Use WebP format where possible
- Set appropriate `sizes` prop
- Lazy load below-the-fold images

### Font Optimization

Already optimized via `next/font/google`:
- Fonts are self-hosted
- No external requests
- Optimal loading strategy

### Bundle Analysis

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Analyze
ANALYZE=true npm run build
```

### Lighthouse Score Targets

Aim for:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

Run audit:
```bash
npx lighthouse https://your-site.com --view
```

## 🔄 Continuous Deployment

### GitHub Actions (Optional):

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📝 Post-Deployment Checklist

- [ ] Test all pages on production URL
- [ ] Verify images load
- [ ] Check mobile responsiveness
- [ ] Test email signup form (when implemented)
- [ ] Verify social share previews (og:image)
- [ ] Test on multiple browsers
- [ ] Check Lighthouse scores
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics
- [ ] Add site to Google Search Console
- [ ] Submit sitemap

## 🚨 Monitoring

### Error Tracking with Sentry:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Uptime Monitoring:

Free options:
- [UptimeRobot](https://uptimerobot.com)
- [Better Uptime](https://betteruptime.com)
- [Pingdom](https://www.pingdom.com)

## 🎉 You're Live!

Your Pulse AI site is now in production! Share it:

- Submit to [Product Hunt](https://www.producthunt.com)
- Post on [Hacker News](https://news.ycombinator.com)
- Share on Twitter/X with #AI #Tech hashtags
- Add to your portfolio

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Community: https://github.com/vercel/next.js/discussions

**Happy Deploying! 🚀**
