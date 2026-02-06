# Pulse AI - n8n Content Engine Setup Guide

## Overview

This guide walks you through setting up the automated content engine for Pulse AI using n8n.io.

## What This Workflow Does

**Every 2 hours, the workflow:**
1. Fetches latest AI news from 9 reputable sources via RSS
2. Filters and ranks articles by AI relevance
3. Selects top 3 articles
4. Rewrites each with Claude (witty, original editorial voice)
5. Generates photorealistic images with OpenAI GPT-Image-1.5
6. Saves to posts.json
7. Commits to GitHub → Auto-deploys to Vercel

## Prerequisites

- n8n.io account (cloud or self-hosted)
- Anthropic API key
- OpenAI API key
- GitHub access to your Pulse AI repo

## Step 1: Import the Workflow

1. Open n8n dashboard
2. Go to **Workflows** → **Import from File**
3. Select `pulse-ai-content-engine.json`
4. Click **Import**

## Step 2: Configure Credentials

### Anthropic API (for Claude article rewriting)

1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Select **HTTP Header Auth**
4. Configure:
   - **Name:** `Anthropic API`
   - **Header Name:** `x-api-key`
   - **Header Value:** Your Anthropic API key (starts with `sk-ant-...`)
5. Save
6. In the workflow, click on **"Claude: Rewrite Article"** node
7. Under **Authentication**, select your **Anthropic API** credential

### OpenAI API (for image generation)

1. Add another **HTTP Header Auth** credential
2. Configure:
   - **Name:** `OpenAI API`
   - **Header Name:** `Authorization`
   - **Header Value:** `Bearer YOUR_OPENAI_KEY` (starts with `sk-proj-...`)
3. Save
4. In the workflow, click on **"OpenAI: Generate Image"** node
5. Select your **OpenAI API** credential

## Step 3: Configure Git Access

The workflow needs to commit to GitHub. Ensure the n8n environment has:

```bash
# SSH key for GitHub (recommended)
ssh-keygen -t ed25519 -C "pulse-ai@n8n"
# Add ~/.ssh/id_ed25519.pub to GitHub repo deploy keys

# Or use HTTPS with token
git remote set-url origin https://TOKEN@github.com/username/pulse-ai.git
```

## Step 4: Test the Workflow

1. Click **"Execute Workflow"** to run manually
2. Check each node's execution:
   - RSS nodes should return articles
   - Claude node should return rewritten article JSON
   - OpenAI node should return image data
   - Git push should succeed
3. Check your site updates within 2-3 minutes

## Step 5: Enable Schedule

1. Click on **"Schedule: Every 2 Hours"** node
2. Toggle **Active**
3. The workflow now runs automatically every 2 hours

## RSS Feed Sources

The workflow pulls from these reputable AI/tech sources:

| Source | Feed URL | Type |
|--------|----------|------|
| OpenAI Blog | https://openai.com/blog/rss.xml | Official |
| MarkTechPost | https://www.marktechpost.com/feed/ | News |
| Hugging Face | https://huggingface.co/blog/feed.xml | Research |
| TechCrunch AI | https://techcrunch.com/category/artificial-intelligence/feed/ | Tech News |
| VentureBeat AI | https://venturebeat.com/category/ai/feed/ | Enterprise |
| Google AI | https://blog.google/technology/ai/rss/ | Official |
| Anthropic | https://www.anthropic.com/news/rss.xml | Official |
| The Rundown AI | https://www.therundown.ai/rss | Newsletter |

## Customization Options

### Change Schedule Frequency

Edit the **"Schedule: Every 2 Hours"** node:
- Every hour for more content
- Every 4-6 hours for less content
- Specific times (e.g., 9am, 12pm, 3pm) for business hours

### Adjust Article Selection

Edit the **"Aggregate & Filter Top 3"** code node:
- Change `relevanceKeywords` to filter different topics
- Adjust time window (default: last 12 hours)
- Change number of articles (currently top 3)

### Modify Editorial Tone

Edit the **"Claude: Rewrite Article"** prompt:
- Adjust humor level
- Change word count
- Modify categories
- Add specific style instructions

### Image Style

Edit the **"OpenAI: Generate Image"** prompt:
- Change color scheme
- Adjust art style
- Modify dimensions

## Cost Estimation

**Per run (every 2 hours):**
- Claude Haiku: ~$0.003 × 3 = $0.009
- GPT-Image-1.5: ~$0.04 × 3 = $0.12
- **Total per run: ~$0.13**

**Monthly (12 runs/day × 30 days):**
- **~$46.80/month**

## Troubleshooting

### "No new articles found"

- RSS feeds might not have fresh content
- Try increasing time window in filter node
- Check if RSS URLs are still valid

### Claude returns invalid JSON

- Check the prompt formatting
- Review Claude's raw output in execution log
- Adjust prompt to emphasize JSON format

### Image generation fails

- Verify OpenAI API key has credits
- Check API quota at platform.openai.com
- Image node has 3 retries built-in

### Git push fails

- Ensure n8n has SSH key or token access
- Check Git remote URL is correct
- Verify write permissions to repo

## Monitoring

### Check Execution History

1. Go to **Executions** tab in n8n
2. Filter by workflow name
3. Review success/failure status
4. Click any execution to see detailed flow

### Set Up Alerts (Optional)

Add a Discord/Slack/Email node after "Git Commit & Push" to notify on:
- New articles published
- Workflow failures

## Security Notes

- Store API keys in n8n credentials (encrypted)
- Never commit keys to Git
- Rotate keys every 90 days
- Monitor API usage for anomalies

## Support

**n8n docs:** https://docs.n8n.io
**Claude docs:** https://docs.anthropic.com
**OpenAI docs:** https://platform.openai.com/docs

---

**Ready to automate! 🚀**