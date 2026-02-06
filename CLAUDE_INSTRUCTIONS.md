# CLAUDE CODE INSTRUCTIONS - Growth Marketing Blog

## Project: Growth Marketing Blog

Build a complete Next.js blog website with the EXACT same design as Pulse AI.

### Design Reference
- Use the same Editorial Neon Brutalism aesthetic
- Copy the exact same component structure from /home/ec2-user/clawd/pulse-ai
- Same fonts: Space Grotesk (display), Newsreader (body)
- Same colors: white background, neon cyan (#00FFAA), magenta (#FF00FF), yellow (#FFDD00)
- Same animations with Framer Motion

### Required Files (Copy from Pulse AI and modify)

1. **app/layout.tsx** - Root layout with fonts
2. **app/page.tsx** - Homepage with Hero + PostGrid
3. **app/post/[id]/page.tsx** - Article page
4. **app/globals.css** - Global styles
5. **components/Header.tsx** - Navigation
6. **components/Hero.tsx** - Featured post (title BELOW image)
7. **components/PostCard.tsx** - Article card (object-contain for images)
8. **components/PostGrid.tsx** - Article grid
9. **components/Footer.tsx** - Site footer
10. **components/ScrollProgress.tsx** - Reading progress bar
11. **public/posts/posts.json** - Article database (create with 5 sample articles)
12. **tailwind.config.ts** - Tailwind config with neon theme
13. **next.config.ts** - Next.js config
14. **package.json** - Dependencies
15. **tsconfig.json** - TypeScript config

### Content: 5 Sample Articles

Create 5 high-quality articles about growth marketing:

1. **"The End of Third-Party Cookies: What Growth Marketers Must Do Now"**
   - Category: Digital Marketing
   - Discuss Google's cookie deprecation, first-party data strategies, alternative tracking

2. **"LinkedIn's Algorithm Changed Again: How to Beat the 2026 Feed"**
   - Category: B2B Marketing
   - LinkedIn content strategy, engagement hacks, personal brand growth

3. **"Retention is the New Acquisition: Why Smart Startups Focus on LTV"**
   - Category: Growth Hacking
   - Customer retention strategies, LTV:CAC ratios, churn reduction

4. **"TikTok Shop is Eating Amazon: The Social Commerce Revolution"**
   - Category: B2C Marketing
   - Social commerce trends, TikTok marketing, influencer strategies

5. **"AI-Powered Personalization at Scale: Beyond [FirstName] Tokens"**
   - Category: Marketing Tech
   - AI in marketing, dynamic content, behavioral personalization

### Image Generation
For each article, include a placeholder image path:
- /images/article-1-cookies.png
- /images/article-2-linkedin.png
- /images/article-3-retention.png
- /images/article-4-tiktok.png
- /images/article-5-ai-personalization.png

### Brand Identity
- Site Name: "Growth Pulse"
- Tagline: "Your daily dose of growth marketing intelligence"
- Logo Text: "GROWTH PULSE"

### Critical Requirements
1. Use object-contain for ALL images (no cropping)
2. Hero title must appear BELOW the image (not overlay)
3. H2 headers in articles must be UNIQUE (not formulaic)
4. No em dashes in content
5. Fully responsive design
6. Static export compatible

### Commands to Run
```bash
npm install
npm run build
```

Build must complete without errors.
