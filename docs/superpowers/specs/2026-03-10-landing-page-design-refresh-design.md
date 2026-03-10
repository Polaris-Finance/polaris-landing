# Landing Page Design Refresh

## Goal

Improve professionalism and visual variety of the landing page by addressing four specific issues identified in the design audit: monotonous section rhythm, misleading stat cards, underused blog content, and an identical-looking StablecoinOS section.

## Scope

Touch only: StatsSection, StablecoinOSSection, HowItWorksSection (blog callout only), spacing/rhythm in globals.css.
Do NOT touch: TopNav, HeroSection, HowItWorks layout, TokensSection, BenefitsSection, Footer, trust signals.

## Changes

### 1. Stat Cards to Bold Declarations

**File:** `components/sections/StatsSection.tsx`, `app/globals.css`

Remove card containers, icons, and stat-card styling. Replace with a horizontal strip of bold serif statements with supporting text below each. No cards, no borders, no icons.

- Desktop: 4-column grid of text-only declarations
- Mobile: stack vertically
- Title uses `font-serif`, larger weight, `--polaris-star` color
- Description uses `font-sans`, `--polaris-cream-muted`
- Section gets reduced vertical padding (lightweight content, doesn't need same breathing room)

### 2. StablecoinOS Section Redesign

**File:** `components/sections/StablecoinOSSection.tsx`, `app/globals.css`

Replace the narrative-timeline (identical to HowItWorks) with editorial content blocks. Each milestone becomes a wider block with:
- Prominent left-aligned heading (serif)
- Flowing bullet content with more horizontal room
- No dot markers, no connecting lines
- Subtle bottom border between items (instead of timeline connector)

Rationale: This content is three parallel concepts (stewardship, forkable infrastructure, community ownership), not a sequential process. The timeline visual metaphor is wrong for this content.

### 3. Blog Callouts

**Files:** `components/sections/HowItWorksSection.tsx`, `components/sections/StablecoinOSSection.tsx`

Add blog-callout component (reusing existing CSS pattern from TokensSection) to:

- **HowItWorksSection**: Hook line about the bonding curve + link to `/blog/bonding-curve/`
- **StablecoinOSSection**: Hook line about stewardship vs governance + link to `/blog/stewardship-not-governance/`

### 4. Spacing & Rhythm Variation

**File:** `app/globals.css`

- Stat declarations section: reduce vertical padding (it's a lightweight interstitial, not a full content section)
- TokensSection: slightly more vertical padding (product showcase deserves emphasis)
- Compass dividers: bump opacity from 0.2 to 0.3 so they function as visible separators

## Out of Scope

- No new components or dependencies
- No changes to blog pages
- No changes to nav or footer
- No changes to color palette, fonts, or design tokens
- No changes to HowItWorks layout or content
- No changes to BenefitsSection
