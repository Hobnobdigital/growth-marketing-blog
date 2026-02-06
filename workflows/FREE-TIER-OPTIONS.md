# Pulse AI - Free Tier Content Engine

## Cost Reduction Strategies

### Option 1: Hybrid Approach (Recommended - $5-10/month)

**Reduce costs by 80%:**

| Change | Savings |
|--------|---------|
| Run every 6 hours instead of 2 hours | 67% less API calls |
| Generate 1 image per article (not 3) | 66% image cost savings |
| Use Claude Haiku (fastest, cheapest) | 90% cheaper than Sonnet |
| Cache/reuse images for similar topics | Variable savings |
| Run only during business hours (9am-6pm) | 60% time reduction |

**New cost: ~$8-12/month**

### Option 2: Completely Free (Manual Curation)

**Zero API costs, but requires your time:**

1. **I monitor** RSS feeds every hour via cron (free)
2. **I alert you** on Discord/WhatsApp when interesting articles appear
3. **You approve** which ones to publish
4. **I generate** the rewrite + image (only for approved articles)

**Cost: $0** (you pay per article you actually publish)

### Option 3: Tiered Publishing

**Only pay for premium content:**

- **Auto-publish** 1-2 articles/day (free tier quality)
- **Queue premium** articles for manual review
- **You decide** which get the full AI treatment

---

## RSS vs Web Crawling

### Why RSS is Better

| RSS Feeds | Web Crawling |
|-----------|--------------|
| ✅ Instant notification of new content | ❌ Must constantly check for changes |
| ✅ Structured data (title, date, content) | ❌ Must parse messy HTML |
| ✅ Respects site resources | ❌ Can get IP blocked |
| ✅ Legal & ethical | ❌ May violate Terms of Service |
| ✅ 99% of news sites provide RSS | ❌ Requires custom scrapers per site |
| ✅ Low bandwidth (~1KB per check) | ❌ High bandwidth (full page loads) |

### Can I Crawl Instead?

**Technically yes, but not recommended:**

1. **Sites will block you** - Most have rate limiting
2. **Expensive** - Crawling uses more bandwidth than RSS
3. **Fragile** - HTML changes break scrapers constantly
4. **Legal issues** - Many sites prohibit crawling
5. **Slower** - Must download entire pages vs small RSS feeds

**Better approach:** Use RSS + selective crawling only when RSS fails

---

## Recommended Free Setup

### Architecture:

```
Cron Job (Free)
    ↓
Fetch RSS (Free)
    ↓
Filter & Rank (Free - code)
    ↓
[Decision Gate]
    ↓
    ├─ High relevance → Queue for AI rewrite
    └─ Low relevance → Skip
    ↓
Manual Approval (You via Discord/Chat)
    ↓
AI Rewrite + Image (Only when you approve)
    ↓
Publish
```

### What This Looks Like:

**Hour 1:** I check RSS → Found 5 articles → Ranked by relevance → Send you top 3 summaries

**You:** "Publish #1 and #3"

**Hour 2:** I generate rewrites + images for #1 and #3 → Publish → Cost: ~$0.08

**Total:** You only pay for what you actually publish

---

## Alternative: Crowdsourced Curation

**Zero cost approach:**

1. Set up **Google Alerts** for AI keywords (free)
2. Alerts go to a **shared email** or **Discord channel**
3. **You or I** review and pick best ones
4. **Manual publish** via simple form

**Pros:** Completely free
**Cons:** Less automated, requires daily attention

---

## My Recommendation

**Start with the Hybrid Approach:**
- Run every 6 hours (4x/day)
- Generate 1 image per article
- Cost: ~$8/month
- Scale up/down based on engagement

**Monitor for 2 weeks**, then decide:
- Getting good engagement? → Increase frequency
- Not worth it? → Switch to manual curation

**Want me to set up the free monitoring version first?** I can:
1. Create a cron job to check RSS every hour
2. Send you a daily digest of top AI news
3. You tell me which to publish
4. Only then use APIs

**Cost: $0 until you decide to publish**

Which approach interests you?