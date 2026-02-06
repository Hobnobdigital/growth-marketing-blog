# Pulse AI Workflow - Changelog

## Version 1.1 - Updated 2025-01-15

### 🎨 Major Updates

#### 1. Photorealistic Image Generation (80/20 Split)
**Changed:** Image generation now uses hyper-photorealistic style by default

**Implementation:**
- 80% of images use photorealistic prompt: `"Hyper-realistic editorial photograph of [concept], professional studio lighting, high detail, modern tech aesthetic, shallow depth of field, 8K quality, photorealistic"`
- 20% of images use illustrated style: `"Modern illustrated editorial artwork of [concept], vibrant colors, clean vector style, tech aesthetic, professional illustration"`
- Random selection in "Parse & Calculate Read Time" node
- Style stored in `imageStyle` field for tracking

**Why:** Photorealistic images look more professional and engaging for editorial content

---

#### 2. Source Attribution
**Added:** Legal and ethical attribution to original sources

**Implementation:**
- Claude now generates `sourceAttribution` field in JSON output
- Format: `"Originally reported by [Source Name]"`
- Included in final post JSON structure
- Can be displayed at bottom of articles

**Why:** Covers us legally and ethically while maintaining editorial independence

**Example output:**
```json
{
  "sourceAttribution": "Originally reported by OpenAI Blog"
}
```

---

#### 3. Natural Conversational Tone
**Changed:** Claude rewrite prompt completely overhauled

**New tone guidelines:**
- Human, natural, casual language
- Use contractions (we're, it's, don't, here's)
- Conversational insider vibe - like a smart friend explaining tech news
- Think Stratechery/Ben Thompson style - intelligent but never stuffy
- Use phrases like "here's the thing," "basically," "look,"
- NO corporate jargon, no robotic AI writing

**Prompt changes:**
- Temperature increased from 0.7 to 0.8 (more natural variation)
- Explicit instructions to use contractions and casual phrases
- Added examples of conversational starters
- Emphasis on "smart friend over coffee" vibe
- Reference to Stratechery/Ben Thompson as style guide

**Before:**
```
"The AI community is buzzing with speculation about GPT-5..."
```

**After:**
```
"Look, the AI community is buzzing with speculation about GPT-5, and honestly?..."
```

---

### 📝 Updated Files

**Workflow JSON:**
- `Claude: Rewrite Article` node - Complete prompt rewrite
- `Parse & Calculate Read Time` node - Added imageStyle logic + sourceAttribution
- `OpenAI: Generate Image` node - Conditional prompt based on imageStyle
- `Build Post Object` node - Added sourceAttribution to post

**Sample Content Generator:**
- All 5 sample posts rewritten in conversational tone
- Added sourceAttribution to each post
- Natural language throughout ("Look," "basically," contractions)

**Documentation:**
- This changelog
- README updated with new prompt template
- SETUP-GUIDE updated with tone guidelines

---

### 🔧 Technical Details

#### Node Changes

**1. Claude: Rewrite Article (HTTP Request)**
```javascript
// New prompt template (excerpt)
"You're the editorial voice of Pulse AI - an AI news site for people who 
actually work with this stuff...

- Natural, conversational language - use contractions (we're, it's, don't, here's)
- Lead with \"Look,\" \"Here's the thing,\" \"Basically,\" when it feels right
- Insider perspective - like you've been following this space for years
- No corporate jargon, no robotic AI writing, no buzzword bingo..."

// New JSON output structure
{
  "title": "...",
  "snippet": "...",
  "content": "...",
  "category": "...",
  "sourceAttribution": "Originally reported by [Source Name]"  // NEW
}
```

**2. Parse & Calculate Read Time (Code Node)**
```javascript
// NEW: Determine image style (80% photorealistic, 20% illustrated)
const isPhotorealistic = Math.random() < 0.8;
const imageStyle = isPhotorealistic ? 'photorealistic' : 'illustrated';

// NEW: Add to output
return {
  json: {
    // ... existing fields ...
    sourceAttribution: rewrittenArticle.sourceAttribution || 
                       `Originally reported by ${originalData.source}`,
    imageStyle: imageStyle  // NEW
  }
};
```

**3. OpenAI: Generate Image (HTTP Request)**
```javascript
// NEW: Conditional prompt based on style
"prompt": {
  "value": "={{ 
    $json.imageStyle === 'photorealistic' ? 
    'Hyper-realistic editorial photograph of ' + $json.keyConcept + 
    ', professional studio lighting, high detail, modern tech aesthetic, 
    shallow depth of field, 8K quality, photorealistic' 
    : 
    'Modern illustrated editorial artwork of ' + $json.keyConcept + 
    ', vibrant colors, clean vector style, tech aesthetic, professional illustration' 
  }}"
}
```

**4. Build Post Object (Code Node)**
```javascript
const post = {
  // ... existing fields ...
  sourceAttribution: postData.sourceAttribution,  // NEW
};
```

---

### 📊 Impact

**Content Quality:**
- More engaging, human-sounding articles
- Better reader connection
- Less "AI-written" feel

**Legal/Ethical:**
- Proper attribution to original sources
- Transparency about editorial process
- Reduced copyright concerns

**Visual Appeal:**
- More professional photorealistic images
- Better social media sharing
- Higher perceived quality

---

### 🔄 Migration Guide

**If you're updating from v1.0:**

1. **Backup existing workflow**
   ```bash
   cp pulse-ai-workflow.json pulse-ai-workflow-v1.0-backup.json
   ```

2. **Import new workflow**
   - Delete old workflow in n8n
   - Import updated `pulse-ai-workflow.json`
   - Re-assign credentials

3. **Update existing posts (optional)**
   - Run `generate-sample-posts.js` to see new tone
   - Manually add `sourceAttribution` to old posts if desired

4. **Test run**
   - Execute workflow manually
   - Verify sourceAttribution field appears
   - Check image prompts in execution log

---

### 🧪 Testing Results

**Tone improvements verified:**
✅ Contractions used naturally (we're, it's, don't)
✅ Conversational starters present (Look, Here's the thing, Basically)
✅ No corporate jargon detected
✅ Maintains technical accuracy while being accessible

**Image generation verified:**
✅ 80/20 split implemented correctly
✅ Photorealistic prompts generating high-quality images
✅ Illustrated prompts work for lighter topics

**Source attribution verified:**
✅ All posts include sourceAttribution field
✅ Format consistent across all sources
✅ Original links preserved

---

### 🎯 Next Steps

Consider these enhancements:

1. **A/B Testing:** Test different tone variations
2. **Style Learning:** Train on actual Stratechery articles for even better tone matching
3. **Image Style Detection:** Use sentiment analysis to auto-choose photo vs illustration
4. **Attribution Links:** Add clickable links to source attribution
5. **Tone Presets:** Allow different tones for different categories (e.g., research = more formal)

---

### 📞 Support

**Questions about changes?**
- Review updated SETUP-GUIDE.md for detailed explanations
- Check sample posts for tone examples
- Test workflow with manual execution to see changes in action

**Rollback if needed:**
- Restore from v1.0 backup
- Or manually revert the 4 node changes listed above

---

**Version:** 1.1  
**Release Date:** 2025-01-15  
**Breaking Changes:** None (fully backward compatible)  
**Recommended Action:** Update at your convenience

---

*Happy automating with more personality! 🚀*
