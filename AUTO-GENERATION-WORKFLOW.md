# Pulse AI - Auto-Generation Workflow

## ✅ Every 1 Hour - You Decide What to Publish

### Workflow:

```
Every 1 Hour (24 times/day):
    ↓
Check 15 RSS Sources
    ↓
Find Best Article (from last 1 hour)
    ↓
AUTO-REWRITE with Claude (witty/educational tone)
AUTO-GENERATE image with GPT-Image-1.5
    ↓
Save Draft for Your Review
    ↓
YOU DECIDE → Publish or Skip
```

### How It Works:

1. **Every 1 hour** - Checks 15 sources for new AI articles
2. **Auto-generates** - Rewrites with Claude + generates image immediately
3. **You review** - I notify you with full draft
4. **You decide** - Publish or skip each draft
5. **Target** - ~6 articles/day published (from ~24 options)

### Tone Detection:

**Witty Tone (default):**
- Product launches, breakthroughs, trends, fun applications

**Serious Tone (auto-detected):**
- AI safety, ethics, bias, job displacement, privacy, regulation

### Schedule (24 Checks/Day):

Runs every hour on the hour. You pick ~6 from ~24 daily options!

### Cost:

**Per draft generated:** ~$0.043 (Claude + Image)  
**~24 drafts/day:** ~$1.03/day = ~$31/month  
**You only publish what you approve!**

### Commands:

**Review draft:**
```bash
cat /home/ec2-user/clawd/pulse-ai/.review-digest.txt
```

**Publish:**
```bash
python3 publish-draft.py 1
```

**Skip:**
```bash
python3 publish-draft.py skip
```

### Status:

- ✅ Daemon running (PID: 233687)
- ✅ Checks every 1 hour (24×/day)
- ✅ You decide what to publish
- ✅ Target: ~6 published/day
- ✅ Next check: ~9:30 AM UTC

---

**Ready! You'll receive draft articles every hour. You pick what to publish!** 🚀
