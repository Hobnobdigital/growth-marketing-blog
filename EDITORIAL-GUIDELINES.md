# Growth Pulse - Editorial Guidelines

## Core Principles

### 1. Data Claims REQUIRE Citations

**CRITICAL RULE:** Every factual claim with specific numbers, percentages, or statistics MUST include a source citation.

#### Examples:

✅ **GOOD:**
"B2B AI spending jumped 108% year over year according to Zylo's 2026 SaaS Management Index, which analyzed $75 billion in actual SaaS spend."

✅ **GOOD:**
"86% of buyers pre-select vendors before the first discovery call, according to Gartner research on B2B buying behavior."

❌ **BAD:**
"B2B AI spending jumped 108% year over year." *(No citation)*

❌ **BAD:**
"Most marketers are wasting their budgets." *(Vague claim, no data)*

#### Citation Format:
- Include source name (company/research firm)
- Include study/report name when available
- Include sample size or methodology when relevant
- Place source note at end of section or in footer

### 2. Source Quality Standards

**Acceptable Sources:**
- Industry research firms (Gartner, Forrester, McKinsey)
- Analytics platforms with actual data (Zylo, HubSpot State of Marketing)
- Established publications (Search Engine Journal, MarTech.org)
- Company earnings reports and official data
- Peer-reviewed studies

**Questionable Sources:**
- Surveys with small sample sizes (<100 respondents)
- Vendor-funded studies without independent verification
- Blog posts without original data
- Twitter/X threads and social media claims

**Unacceptable Sources:**
- Made-up statistics
- Unverified claims
- Anonymous sources for data claims
- Outdated studies (>3 years old for fast-moving topics)

### 3. Article Structure Requirements

#### Every Article Must Include:
1. **Unique H2 headers** (no formulaic templates)
2. **No em dashes** (use periods or commas)
3. **Data citations** for all statistics
4. **Source attribution** field in JSON
5. **Original analysis** (not just regurgitation)

#### Source Attribution Field:
```json
{
  "source_attribution": "Based on [Source 1], [Source 2], and original analysis"
}
```

### 4. Content Creation Workflow

#### Step 1: Source Research
- Run `python3 rss-monitor.py` to find trending topics
- Review articles from multiple sources (minimum 2-3)
- Extract key data points and their original sources

#### Step 2: Fact Check
- Verify all statistics have citations
- Cross-check data across multiple sources when possible
- Note methodology (sample size, date, geographic scope)

#### Step 3: Original Writing
- Rewrite with Growth Pulse voice (witty, casual, educational)
- Add original analysis and commentary
- Include proper citations for all data claims

#### Step 4: Citation Review
**Checklist:**
- [ ] All statistics have inline citations
- [ ] Source attribution field is complete
- [ ] Citations include source name + study/report
- [ ] Methodology noted for survey data

#### Step 5: Publication
- Generate GPT-1.5 image
- Add to posts.json with full citation info
- Commit and deploy

### 5. Tone and Style

- **Voice:** Witty, sharp, slightly irreverent but educational
- **Style:** Casual like talking to a smart friend
- **Humor:** Dry humor, occasional sarcasm, never mean-spirited
- **Length:** 400-600 words per article
- **Headers:** Unique per article, specific to content

### 6. Image Requirements

- **Model:** GPT-1.5 ONLY
- **Size:** 1536x1024 (landscape)
- **Quality:** High
- **Style:** Photorealistic as if taken with iPhone 16 ultra HD
- **Display:** object-contain (no cropping)
- **No text overlays** on images (titles appear below)

### 7. Example: Properly Cited Article

```json
{
  "id": "example-article",
  "title": "Why AI Marketing Spend is Out of Control",
  "content": "AI marketing spending jumped 108% year over year according to Zylo's 2026 SaaS Management Index, which analyzed $75 billion in actual SaaS spend across 40 million licenses. Meanwhile, overall marketing budgets only grew 8%.\n\n*Source: Zylo SaaS Management Index 2026 ($75B+ analyzed spend)*\n\n## The Problem with Tool Proliferation...",
  "source_attribution": "Based on Zylo SaaS Management Index 2026, MarTech.org reporting, and Search Engine Journal industry coverage"
}
```

### 8. Violations of These Guidelines

**DO NOT:**
- Make up statistics
- Use data without citations
- Cite questionable sources for factual claims
- Publish articles without source attribution
- Use em dashes (seriously, just don't)

**Consequences:**
- Loss of reader trust
- Potential legal issues
- Brand reputation damage
- Violation of journalistic ethics

### 9. Daily Checklist

Before publishing any article:

- [ ] All statistics have proper citations
- [ ] Source attribution field is complete
- [ ] Tone is witty but educational
- [ ] No em dashes used
- [ ] H2 headers are unique
- [ ] Image is GPT-1.5 photorealistic
- [ ] Content is original (not copied from sources)

---

**Remember:** Trust is built on accuracy. Every uncited claim erodes that trust. When in doubt, cite the source or remove the claim.

**Last Updated:** 2026-02-06
**Applies To:** All Growth Pulse content creators and contributors
