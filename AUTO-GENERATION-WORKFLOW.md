# Pulse AI - Auto-Generation Workflow

## ✅ UPDATED: 6 Articles/Day Target

### New Workflow:

```
Every 4 Hours (6 times/day):
    ↓
Check 15 RSS Sources
    ↓
Find Best AI Article (from last 4 hours)
    ↓
AUTO-REWRITE with Claude (witty/educational tone)
AUTO-GENERATE image with GPT-Image-1.5
    ↓
Save Draft for Your Review
    ↓
You Review → Approve/Publish
```

### What Happens Now:

1. **Monitoring** (FREE) - Checks 15 sources every 4 hours
2. **Auto-Generation** - When articles found:
   - ✅ Claude rewrites immediately (witty tone for fun topics, serious for sensitive)
   - ✅ OpenAI generates photorealistic image
   - ✅ Saves as draft
3. **Your Review** - I notify you with full drafts
4. **You Publish** - Review and approve what you like

### Tone Detection:

**Witty Tone (default):**
- Product launches
- Technical breakthroughs  
- Industry trends
- Fun AI applications

**Serious Tone (auto-detected):**
- AI safety concerns
- Ethics & bias
- Job displacement
- Privacy/security breaches
- Regulation/policy

### Cost:

**Per Article Generated:**
- Claude Haiku: $0.003
- GPT-Image-1.5: $0.04
- **Total: ~$0.043 per draft**

**Target: 6 articles/day × $0.043 = ~$7.74/month**

You review all 6 daily drafts, publish your favorites!

### Commands:

**Review drafts:**
```bash
cat /home/ec2-user/clawd/pulse-ai/.review-digest.txt
```

**Publish selected:**
```bash
python3 publish-draft.py 1,2,5
```

**Publish all:**
```bash
python3 publish-draft.py all
```

**Skip/Discard:**
```bash
python3 publish-draft.py skip
```

### Files:

- `rss-monitor.py` - Finds new articles
- `generate-drafts.py` - Auto-writes with Claude + images
- `publish-draft.py` - Publishes approved articles
- `.article-drafts.json` - Drafts waiting for review
- `.review-digest.txt` - Human-readable draft summary

### Schedule (6 Articles/Day Target):

| Run # | Time (UTC) |
|-------|------------|
| 1 | ~8:30 AM |
| 2 | ~12:30 PM |
| 3 | ~4:30 PM |
| 4 | ~8:30 PM |
| 5 | ~12:30 AM |
| 6 | ~4:30 AM |

### Status:

- ✅ Daemon running (PID: 233176)
- ✅ Auto-generation enabled
- ✅ Schedule: Every 4 hours (6×/day)
- ✅ Target: ~6 articles/day
- ✅ Next check: ~12:30 PM UTC

---

**Ready! You'll receive ~6 draft articles per day for review.** 🚀
