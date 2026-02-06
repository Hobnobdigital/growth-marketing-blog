# Pulse AI - Free RSS Monitoring System

## ✅ System Status: RUNNING

### 📡 Monitoring 15 AI News Sources:

1. **OpenAI Blog** - Official OpenAI updates
2. **The Rundown AI** - Daily AI newsletter  
3. **MarkTechPost** - AI/ML news
4. **Hugging Face** - Open source AI
5. **TechCrunch AI** - Tech industry AI coverage
6. **VentureBeat AI** - Enterprise AI
7. **Google AI** - Official Google AI blog
8. **Anthropic** - Claude updates & research
9. **MIT Technology Review** - Deep tech analysis
10. **Wired AI** - Consumer tech angle
11. **The Verge AI** - Accessible tech news
12. **ArXiv CS.AI** - Research papers
13. **AI News (UK)** - European perspective
14. **Towards Data Science** - Practical ML
15. **Microsoft AI** - Azure/OpenAI integration

### 🔄 How It Works:

**Every Hour:**
1. Check all 15 RSS feeds
2. Find new articles from last hour
3. Score by AI relevance (0-100)
4. Save top articles to state file
5. **Notify you** via Discord with digest

**When You Approve:**
1. You reply: "publish 1, 3, 5"
2. Claude rewrites each article (witty tone)
3. OpenAI generates photorealistic image
4. Publish to Pulse AI
5. Git push → Auto-deploy to Vercel
6. **Cost: ~$0.08 per published article**

### 💰 Cost Breakdown:

**Base Cost: $0** (monitoring is free)

**Per Article Published:**
- Claude Haiku rewrite: $0.003
- GPT-Image-1.5 image: $0.04
- Git/Vercel: Free
- **Total: ~$0.08 per article**

**Example:**
- If you publish 2 articles/day: $4.80/month
- If you publish 5 articles/day: $12/month
- If you skip days: $0

### 🎮 Commands:

**To check current articles waiting:**
```bash
cat /home/ec2-user/clawd/pulse-ai/.latest-digest.txt
```

**To publish articles (after I notify you):**
```bash
# Publish specific articles
cd /home/ec2-user/clawd/pulse-ai
python3 approve-articles.py 1,3,5

# Publish all waiting articles
python3 approve-articles.py all
```

**To check system status:**
```bash
tail -f /tmp/rss-monitor.log
```

### 📊 Files:

- `rss-monitor.py` - Checks RSS feeds hourly
- `rss-daemon.py` - Background daemon (running now)
- `approve-articles.py` - Publishing workflow
- `.rss-monitor-state.json` - Pending articles
- `.latest-digest.txt` - Latest digest for Discord

### 🚨 Next Steps:

1. **I'm now monitoring** - First check complete ✅
2. **When I find articles**, I'll notify you here
3. **You approve** which to publish
4. **Only pay for what you publish**

---

**Status:** Active and monitoring 15 sources every hour
**Last Check:** Just ran - no new articles in last hour
**Next Check:** In ~1 hour