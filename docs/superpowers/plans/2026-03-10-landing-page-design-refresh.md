# Landing Page Design Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve visual variety and professionalism of the landing page by differentiating sections, fixing misleading stat cards, adding blog callouts, and varying spacing rhythm.

**Architecture:** Four targeted changes to existing components and CSS. No new dependencies. Reuses the existing `blog-callout` CSS pattern. Each task is independent and can be implemented/committed separately.

**Tech Stack:** React 19 components (TSX), CSS in `app/globals.css`, existing blog-callout pattern.

**Spec:** `docs/superpowers/specs/2026-03-10-landing-page-design-refresh-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/sections/StatsSection.tsx` | Rewrite | Bold declarations layout (no cards) |
| `components/sections/StablecoinOSSection.tsx` | Rewrite | Editorial blocks + blog callout |
| `components/sections/HowItWorksSection.tsx` | Modify | Add blog callout at bottom |
| `lib/pageData.ts` | Modify | Remove `Icon` from `HeroStat` type |
| `app/globals.css` | Modify | Replace stat-card CSS, add editorial-block CSS, adjust section spacing, adjust compass divider opacity |

---

## Task 1: Stat Cards to Bold Declarations

**Files:**
- Modify: `lib/pageData.ts:12-17` (remove Icon from HeroStat type)
- Modify: `lib/pageData.ts:50-59` (remove Icon imports/references from heroStats)
- Rewrite: `components/sections/StatsSection.tsx`
- Modify: `app/globals.css:1363-1445` (replace stat-card CSS with declaration CSS)

- [ ] **Step 1: Update the HeroStat type and data**

In `lib/pageData.ts`, remove the `Icon` field from `HeroStat` type and the `Icon` values from `heroStats` array. The icons are no longer needed since we're removing the card containers.

Remove unused icon imports (`Link2OffIcon`, `ZapIcon`, `TrendingUpIcon`, `ShieldCheckIcon`) if they are no longer used elsewhere. Check `benefitHighlights` first — `TrendingUpIcon`, `ShieldCheckIcon` are still used there; `Link2OffIcon` and `ZapIcon` may only be used in `heroStats`.

```typescript
// lib/pageData.ts — updated type
export type HeroStat = {
  value: string;
  label: string;
};

// Updated data (remove Icon from each entry)
export const heroStats: HeroStat[] = [
  {
    value: "Counterparty free",
    label: "Polaris is free of trusted assets or other offchain dependencies: the whole protocol lives onchain; transparent and auditable",
  },
  {
    value: "Untapped yield source",
    label: "Harnesses novel, uncorrelated yield sources by monetizing volatility and growth via a bonding curve",
  },
  {
    value: "Scalable yields",
    label: "pUSD and pETH harness self-correlated yield sources as their adoption and supply grow",
  },
  {
    value: "Immutable & trustless",
    label: "Fully onchain, immutable and extensively verified: simulations, agent-based modeling and Tier-1 audits.",
  },
];
```

- [ ] **Step 2: Rewrite StatsSection component**

Replace the card-based layout with a clean text-only declaration strip.

```tsx
// components/sections/StatsSection.tsx
import { heroStats } from "@/lib/pageData";

export function StatsSection() {
  return (
    <section className="section section--declarations">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-stagger declarations-grid">
          {heroStats.map((stat) => (
            <div key={stat.value} className="declaration">
              <p className="declaration__value">{stat.value}</p>
              <p className="declaration__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Replace stat-card CSS with declaration CSS**

In `app/globals.css`, replace the stat-card block (lines 1363-1445) with new declaration styles. Also add the `.section--declarations` modifier.

Remove:
```css
/* Lines 1363-1445: entire .stat-card block */
```

Add in its place:
```css
  /* ============================================
     DECLARATIONS (bold statement strip)
     ============================================ */

  .section--declarations {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }

  @media (min-width: 640px) {
    .section--declarations {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
  }

  @media (min-width: 1024px) {
    .section--declarations {
      padding-top: 2.5rem;
      padding-bottom: 2.5rem;
    }
  }

  .declarations-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 640px) {
    .declarations-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem 3rem;
    }
  }

  @media (min-width: 1024px) {
    .declarations-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
  }

  .declaration__value {
    font-family: var(--font-serif);
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--polaris-star);
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  @media (min-width: 768px) {
    .declaration__value {
      font-size: 1.5rem;
    }
  }

  .declaration__label {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--polaris-cream-muted);
  }
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Visual check**

Take a screenshot with Playwright to verify the declarations look correct. Run the existing test suite to catch regressions.

Run: `npx playwright test tests/accessibility.spec.ts tests/seo.spec.ts --project=chromium --reporter=line`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/pageData.ts components/sections/StatsSection.tsx app/globals.css
git commit -m "refactor: replace stat cards with bold text declarations

Removes card containers, icons, and borders from the stats section.
Uses serif headings with supporting text in a clean grid layout.
Reduces vertical padding for this lightweight interstitial section.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: StablecoinOS Section Redesign

**Files:**
- Rewrite: `components/sections/StablecoinOSSection.tsx`
- Modify: `app/globals.css` (add editorial-block CSS after the narrative-timeline section)

- [ ] **Step 1: Rewrite StablecoinOSSection component**

Replace the narrative-timeline with editorial content blocks plus a blog callout.

```tsx
// components/sections/StablecoinOSSection.tsx
import { ArrowRightIcon } from "@/components/icons";
import { stablecoinOSMilestones } from "@/lib/pageData";
import Link from "next/link";

export function StablecoinOSSection() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Stablecoin Operating System</h2>
        <p className="reveal section-description">
          The Polaris StablecoinOS is a framework to steward Polaris growth and enable selected projects to deploy their own decentralized stablecoin while benefiting from shared liquidity and protocol-level integrations.
        </p>

        <div className="reveal-stagger editorial-blocks mt-10">
          {stablecoinOSMilestones.map((milestone, index) => (
            <div key={`os-milestone-${index}`} className="editorial-block">
              <h3 className="editorial-block__title">{milestone.title}</h3>
              <ul className="editorial-block__content space-y-2">
                {milestone.bullets.map((bullet, bulletIndex) => (
                  <li key={`os-${index}-bullet-${bulletIndex}`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Blog callout */}
        <div className="reveal blog-callout mt-10">
          <div className="blog-callout__content">
            <div className="blog-callout__text">
              <p>Governance is broken. Here&apos;s what replaces it.</p>
              <p>Why governance fails because of structure, not people &mdash; and how stewardship fixes it with immutable foundations and scoped human judgment.</p>
            </div>
          </div>
          <div className="blog-callout__action">
            <Link href="/blog/stewardship-not-governance" className="blog-callout__link">
              Read the article
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add editorial-block CSS**

In `app/globals.css`, add new styles after the narrative-timeline section (after line ~1675, before the benefit-card section). These are distinct from narrative-step: no markers, no connecting lines, more horizontal room.

```css
  /* ============================================
     EDITORIAL BLOCKS (non-sequential content)
     ============================================ */

  .editorial-blocks {
    display: grid;
    gap: 0;
  }

  .editorial-block {
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(var(--polaris-star-rgb), 0.08);
  }

  .editorial-block:last-child {
    border-bottom: none;
  }

  .editorial-block__title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--polaris-star);
    margin-bottom: 0.75rem;
  }

  @media (min-width: 768px) {
    .editorial-block__title {
      font-size: 1.375rem;
    }
  }

  .editorial-block__content {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--polaris-cream-muted);
    max-width: 52rem;
  }

  @media (min-width: 768px) {
    .editorial-block__content {
      font-size: 0.9375rem;
    }
  }

  .editorial-block__content li {
    margin-bottom: 0.5rem;
  }
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Visual check and tests**

Run: `npx playwright test tests/accessibility.spec.ts tests/seo.spec.ts --project=chromium --reporter=line`
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/sections/StablecoinOSSection.tsx app/globals.css
git commit -m "refactor: redesign StablecoinOS as editorial blocks with blog callout

Replaces the narrative-timeline (identical to HowItWorks) with editorial
content blocks using serif headings and flowing text separated by subtle
dividers. Adds blog callout linking to the stewardship article.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Blog Callout in HowItWorksSection

**Files:**
- Modify: `components/sections/HowItWorksSection.tsx`

- [ ] **Step 1: Add blog callout to HowItWorksSection**

Add the blog callout after the narrative-timeline, before the closing `</div>`. Reuses the existing `blog-callout` CSS (no new styles needed). Add the required imports.

```tsx
// Add to imports at top of file:
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

// Add after the closing </div> of narrative-timeline, before the section's closing </div>:
        {/* Blog callout */}
        <div className="reveal blog-callout mt-10">
          <div className="blog-callout__content">
            <div className="blog-callout__text">
              <p>The bonding curve: Polaris&apos; secret weapon.</p>
              <p>How a single mechanism enables pETH&apos;s rising floor, guaranteed liquidity, and protocol-wide value capture.</p>
            </div>
          </div>
          <div className="blog-callout__action">
            <Link href="/blog/bonding-curve" className="blog-callout__link">
              Read the article
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HowItWorksSection.tsx
git commit -m "feat: add bonding curve blog callout to HowItWorks section

Links to the bonding curve article using the existing blog-callout
pattern, matching the callouts in Tokens and StablecoinOS sections.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Spacing & Rhythm Variation

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Increase compass divider visibility**

In `app/globals.css` line 1011, change the compass divider SVG opacity from `0.2` to `0.3`.

```css
/* Line 1011 — change from: */
  opacity: 0.2;
/* To: */
  opacity: 0.3;
```

- [ ] **Step 2: Add section spacing modifier for tokens**

Add a `.section--showcase` modifier after the `.section--gradient` block (after line 1221) that gives the tokens section more breathing room:

```css
  .section--showcase {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 640px) {
    .section--showcase {
      padding-top: 3.5rem;
      padding-bottom: 3.5rem;
    }
  }

  @media (min-width: 1024px) {
    .section--showcase {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
  }

  @media (min-width: 1280px) {
    .section--showcase {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }
```

- [ ] **Step 3: Apply showcase class to TokensSection**

In `components/sections/TokensSection.tsx` line 8, add the `section--showcase` class:

```tsx
// Change from:
<section className="section section--gradient">
// To:
<section className="section section--gradient section--showcase">
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 5: Full test suite**

Run the full Playwright test suite to catch any regressions across all changes:

Run: `npx playwright test --project=chromium --reporter=line`
Expected: All tests pass. If any design-quality tests fail due to changed selectors (e.g., tests looking for `.stat-card`), update those test selectors to match the new `.declaration` class names.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/sections/TokensSection.tsx
git commit -m "style: vary section spacing and increase compass divider visibility

Reduces stats section padding (lightweight interstitial), increases
tokens section padding (product showcase), and bumps compass divider
opacity from 0.2 to 0.3 for better visual separation.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Post-Implementation

After all 4 tasks are complete:

1. Take full-page screenshots (desktop + mobile) with Playwright to compare before/after
2. Run `npm run lint` to catch any lint issues
3. Run `npm run build` for final production build verification
