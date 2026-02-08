import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const transparencyContent = `# AI Transparency & Editorial Standards

**Last Updated:** February 8, 2026
**Editorial Oversight:** Kwame Sarkodee-Adoo

---

## Our Commitment to Trust

At Growth Pulse, we believe in **radical transparency** about how we use artificial intelligence in our research, analysis, and content creation. As AI-generated content becomes more prevalent, we're committed to maintaining the trust of our readers through honesty, human oversight, and clear disclosure.

---

## How We Use AI

### ✅ What AI Helps Us With

- **Research & Monitoring:** AI tools scan thousands of sources to identify emerging growth marketing trends, campaign data, and industry research
- **Data Analysis:** Processing metrics, statistics, and trends from marketing industry reports
- **Content Structuring:** Organizing information into readable formats
- **Grammar & Style:** Basic proofreading and editorial consistency

### ❌ What Humans Do (No AI Involved)

- **Final Editorial Decisions:** All stories are reviewed and approved by human editors
- **Fact-Checking:** Every claim is verified by our editorial team
- **Context & Analysis:** Human editors provide interpretation, nuance, and strategic insight
- **Ethical Judgments:** Decisions about sensitive topics or controversial coverage
- **Voice & Tone:** The editorial personality and humor you read is human-crafted

---

## Our Human-in-the-Loop Process

AI Research Assistant → Human Writer → AI Grammar Check → Human Editor Review → Fact-Checker → Human Final Approval → Transparency-Labeled Publication

**Key Principle:** AI assists, humans decide. Every article is reviewed by at least two human editors before publication.

---

## Editorial Oversight

**Editor-in-Chief & AI Ethics Oversight:**
**Kwame Sarkodee-Adoo**

Kwame oversees all editorial operations and ensures our AI usage meets the highest ethical standards. With a commitment to transparency and journalistic integrity, Kwame reviews our AI policies regularly and makes final decisions on all contentious editorial matters.

**Responsibilities:**
- Final approval on all AI-related editorial policies
- Oversight of fact-checking procedures
- Reader trust and transparency initiatives
- Ethical review of sensitive marketing coverage

---

## Transparency Labels

Every article on Growth Pulse includes one of these labels:

- **🤖 AI-Assisted** — AI helped with research or drafting; heavily edited by humans
- **✍️ Human-Written** — Entirely written by human editors; AI only used for grammar checking
- **🔍 AI-Researched** — AI gathered sources and data; human wrote analysis
- **⚡ AI-Generated** — Fully AI-generated with human oversight (rare; clearly marked)

---

## Trust & Credibility Standards

### Source Verification
- ✅ Every statistic links to original source
- ✅ Research papers and reports linked and summarized
- ✅ Industry data independently verified
- ✅ Expert quotes confirmed authentic

### Correction Policy
We correct errors transparently:
- Errors are noted at the bottom of articles
- Correction timestamps show when changes were made
- Significant corrections include explanation of what changed

### No Hidden AI
- We never publish AI-generated content without disclosure
- We clearly distinguish AI-assisted from human-written content
- Our AI usage is documented in article metadata

---

## Reader Trust Initiatives

1. **Full Disclosure** — Every article shows exactly how it was created
2. **Source Transparency** — All sources linked; no anonymous claims
3. **Human Accountability** — Real editors (like Kwame) take responsibility for all content
4. **No Clickbait** — Headlines are accurate, not sensationalized
5. **Editorial Independence** — No paid content disguised as editorial; sponsored content clearly marked
6. **Open to Feedback** — Readers can report concerns; we investigate all claims

---

## Industry Best Practices We Follow

We align with standards from:
- **Reuters Institute** — AI transparency in journalism guidelines
- **Associated Press (AP)** — Standards around generative AI
- **EU AI Act** — Transparency obligations for AI-generated content
- **Society of Professional Journalists (SPJ)** — Code of Ethics

---

## Frequently Asked Questions

**Q: Is Growth Pulse fully automated?**
A: No. AI assists with research, but humans write, edit, and approve all content.

**Q: How do I know if an article used AI?**
A: Every article has a transparency label and editorial disclosure showing AI involvement level.

**Q: Who checks the facts?**
A: Human editors verify all claims. AI can make mistakes—we don't publish unchecked.

**Q: Can AI-generated content be biased?**
A: Yes, which is why we have human oversight. We audit for bias regularly.

**Q: Who is responsible for errors?**
A: Humans are. Kwame Sarkodee-Adoo oversees editorial accountability.

**Q: How can I trust your marketing analysis isn't just marketing?**
A: We're independent—no vendor pays us for coverage. Our analysis is editorially independent.

---

## Contact & Feedback

**Questions about our AI usage?**
Email: transparency@growthpulse.blog

**Report a factual error?**
Email: corrections@growthpulse.blog

**General feedback?**
We read every message. Your trust matters to us.

---

## Our Promise

> "We believe readers deserve to know how their content is made. AI is a powerful tool, but trust is built on transparency, human judgment, and editorial integrity. Every article we publish reflects that commitment."
>
> **— Kwame Sarkodee-Adoo, Editor-in-Chief**
`;

export const metadata = {
  title: 'AI Transparency & Editorial Standards — Growth Pulse',
  description: 'Learn about how Growth Pulse uses AI responsibly in our editorial process, our commitment to transparency, and our human-in-the-loop standards.',
};

export default function AITransparencyPage() {
  return (
    <article className="min-h-screen">
      {/* Header */}
      <div className="bg-surface-dim border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-5">
            <span className="inline-block px-4 py-1.5 bg-neon-cyan/90 text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-wider rounded-full">
              Editorial Policy
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-display)] font-bold leading-[1.1] text-ink">
            AI Transparency &<br />Editorial Standards
          </h1>
          <p className="mt-6 text-lg text-ink-muted font-[var(--font-body)] max-w-2xl">
            How we use AI responsibly, maintain editorial integrity, and earn your trust.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="content-prose font-[var(--font-body)]">
          <ReactMarkdown
            components={{
              h1: () => null,
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-[var(--font-display)] font-bold mt-12 mb-5 text-ink">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-[var(--font-display)] font-semibold mt-8 mb-4 text-ink">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 leading-[1.8] text-[#374151] text-[1.125rem]">
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-neon-magenta pl-6 my-8 italic text-xl font-[var(--font-body)] text-ink-muted bg-neon-magenta-dim py-4 pr-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-[#374151]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#374151]">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-[1.7] text-[1.05rem]">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-ink">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="bg-surface-dim px-1.5 py-0.5 rounded text-sm font-mono border border-border">
                  {children}
                </code>
              ),
              hr: () => (
                <hr className="my-10 border-border" />
              ),
            }}
          >
            {transparencyContent}
          </ReactMarkdown>
        </div>

        {/* Back link */}
        <div className="mt-16 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-muted hover:text-neon-cyan font-[var(--font-display)] text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
