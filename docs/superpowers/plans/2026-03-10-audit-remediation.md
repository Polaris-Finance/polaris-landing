# Audit Remediation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 18 issues identified in the quality audit across accessibility, performance, theming, and design.

**Architecture:** 5 sequential skill invocations (`/harden`, `/normalize`, `/optimize`, `/quieter`, `/distill`) each targeting a cluster of related issues, followed by a manual cleanup pass. Build verification after each phase.

**Tech Stack:** CSS, React/TSX, Next.js, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-03-10-audit-remediation-design.md`

---

## Chunk 1: `/harden` — Accessibility & Resilience

Issues: C1, M4, M6, L5

### Task 1: Add `prefers-reduced-motion` for CSS animations (C1)

**Files:**
- Modify: `app/globals.css` (insert after keyframes block, around line 461)

**Context:** The `ScrollReveal.tsx` component already handles reduced motion for JS-triggered reveals. But all CSS-based continuous animations (star twinkle, water ripple, glow rotation, CTA pulse) run indefinitely with no reduced-motion check. This violates WCAG 2.3.3.

**Continuous animation keyframes to disable:**
- `twinkle`, `twinkleSlow` — star flicker
- `starPulse`, `starPulseEnhanced`, `starGlow`, `brightStarTwinkle` — Polaris star effects
- `waterRipple`, `rippleDrift`, `waterGlow`, `waveDrift`, `reflectionShimmer` — ocean/water
- `rotateGlow` — outer glow ring (60s rotation)
- `starDrift` — starfield parallax
- `ctaGlow` — CTA button pulse
- `floatGentle`, `driftSlow` — general float effects
- `shimmer` — shimmer sweep

**One-shot keyframes to KEEP (they fire once on load and stop):**
- `heroFadeInUp`, `fadeInUp` — hero entrance
- `revealUp`, `revealScale`, `revealStagger` — scroll reveals (also handled in JS)

- [ ] **Step 1:** Read `app/globals.css` lines 275-465 to confirm all keyframe names and their line numbers.

- [ ] **Step 2:** Add the reduced-motion media query block after the keyframes section (after the `revealStagger` keyframe, before the utility classes section). Insert this CSS:

```css
/* Respect prefers-reduced-motion: disable all continuous/looping animations */
@media (prefers-reduced-motion: reduce) {
  .star,
  .star--tiny,
  .star--small,
  .star--medium,
  .star--bright,
  .polaris-star,
  .polaris-star-glow,
  .polaris-glow-ring,
  .water-ripple,
  .water-glow,
  .wave-surface svg,
  .star-reflection,
  .star-reflection-band,
  .starfield--drift,
  .btn-primary {
    animation: none !important;
  }
}
```

- [ ] **Step 3:** Run `npm run lint && npm run build` to verify no errors.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "fix(a11y): disable continuous CSS animations when prefers-reduced-motion is set"
```

---

### Task 2: Add noscript fallback for reveal animations (M4)

**Files:**
- Modify: `app/layout.tsx` (add `<noscript>` in `<head>`)

**Context:** Elements with `.reveal` start at `opacity: 0; transform: translateY(30px)` in CSS. The `ScrollReveal.tsx` client component adds `.is-visible` via IntersectionObserver. If JS fails to load, all section content stays invisible.

- [ ] **Step 1:** Read `app/layout.tsx` to confirm current `<head>` contents.

- [ ] **Step 2:** Add a `<noscript>` block inside `<head>`, after the existing `<link>` tags:

```tsx
<noscript>
  <style>{`
    .reveal, .reveal--scale, .reveal-stagger > * {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  `}</style>
</noscript>
```

- [ ] **Step 3:** Run `npm run lint && npm run build` to verify.

- [ ] **Step 4:** Commit.
```bash
git add app/layout.tsx
git commit -m "fix(a11y): show reveal content when JavaScript is disabled"
```

---

### Task 3: Fix blog callout click area mismatch (M6)

**Files:**
- Modify: `components/sections/TokensSection.tsx:35-48`
- Modify: `components/sections/StablecoinOSSection.tsx:31-44`
- Modify: `app/globals.css` (blog-callout styles, around lines 2282-2436)

**Context:** The `.blog-callout` container has hover effects (lift, border brighten) suggesting the whole card is clickable, but only the "Read the article" button inside is a link. We'll make the entire container a link.

- [ ] **Step 1:** Read `components/sections/TokensSection.tsx` and `components/sections/StablecoinOSSection.tsx` to confirm current blog callout markup.

- [ ] **Step 2:** In `TokensSection.tsx`, replace the blog callout block. Wrap the entire callout in a Next.js `Link`, remove the separate `blog-callout__action` wrapper and its nested `Link`, and keep the text content and arrow icon:

```tsx
{/* Blog callout */}
<Link href="/blog/stewardship-not-governance" className="reveal blog-callout mt-10">
  <div className="blog-callout__content">
    <div className="blog-callout__text">
      <p>Stewardship, not Governance.</p>
      <p>Governance fails because of structure, not people. Here&apos;s how stewardship fixes the structure with immutable foundations and scoped human judgment.</p>
    </div>
  </div>
  <div className="blog-callout__action">
    <span className="blog-callout__link">
      Read the article
      <ArrowRightIcon className="h-4 w-4" aria-hidden />
    </span>
  </div>
</Link>
```

- [ ] **Step 3:** Apply the same pattern in `StablecoinOSSection.tsx`, pointing to `/blog/pGOLD-finishing-what-digixdao-started`.

- [ ] **Step 4:** In `app/globals.css`, update `.blog-callout` to add `text-decoration: none; color: inherit; display: flex;` (since it's now an `<a>` tag via `Link`). Change `.blog-callout__link` from `<a>` styles to `<span>` styles (remove any anchor-specific styles if present).

- [ ] **Step 5:** Run `npm run lint && npm run build` to verify.

- [ ] **Step 6:** Commit.
```bash
git add components/sections/TokensSection.tsx components/sections/StablecoinOSSection.tsx app/globals.css
git commit -m "fix(ux): make entire blog callout card clickable"
```

---

### Task 4: Fix footer text link touch targets (L5)

**Files:**
- Modify: `app/globals.css` (footer section, around line 1901)

**Context:** Icon-only footer links already have 46x46px touch targets. Text links (Blog, X) rely on natural size and may be under 44px on mobile.

- [ ] **Step 1:** Read `app/globals.css` lines 1895-1925 to confirm current footer link styles.

- [ ] **Step 2:** Add touch target sizing to `.footer__link`:

```css
.footer__link {
  /* ...existing styles... */
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-block: 0.5rem;
}
```

- [ ] **Step 3:** Run `npm run lint && npm run build` to verify.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "fix(a11y): ensure footer text links meet 44px touch target minimum"
```

---

### Task 5: Phase 1 verification

- [ ] **Step 1:** Run `npm run lint && npm run build`.
- [ ] **Step 2:** Verify all 4 fixes are committed.

---

## Chunk 2: `/normalize` — Design Token Consistency

Issues: C2, H1, M3

### Task 6: Fix `--polaris-star-bright` pure white (C2)

**Files:**
- Modify: `app/globals.css:17`
- Modify: `docs/design-system.md` (update the color reference)

**Context:** The design system says "Don't use pure white (#fff) for text." Yet `--polaris-star-bright` is `#FFFFFF` and is used for step titles, card titles, and show titles.

`#FAF6EE` on `#050a14` gives a contrast ratio of ~17.5:1 (well above AAA 7:1 threshold). It's a warm near-white in the cream family.

- [ ] **Step 1:** Read `app/globals.css` lines 14-20 and `docs/design-system.md` to confirm current value.

- [ ] **Step 2:** In `app/globals.css`, change line 17:
```css
/* Before */
--polaris-star-bright: #FFFFFF;
/* After */
--polaris-star-bright: #FAF6EE;
```

- [ ] **Step 3:** In `docs/design-system.md`, update the `--polaris-star-bright` entry from `#FFFFFF` to `#FAF6EE` and update the comment from "Star core highlight only" to "Near-white warm highlight".

- [ ] **Step 4:** Run `npm run lint && npm run build`.

- [ ] **Step 5:** Commit.
```bash
git add app/globals.css docs/design-system.md
git commit -m "fix(theme): replace pure white star-bright with warm near-white #FAF6EE"
```

---

### Task 7: Replace hard-coded SVG colors in HeroSection (H1)

**Files:**
- Modify: `components/sections/HeroSection.tsx:38-61,69-80`
- Modify: `app/globals.css` (add new mountain/wave CSS classes)

**Context:** Mountain SVG paths use `fill="#0d1f3c"` and `fill="#122a4d"`, wave strokes use `stroke="rgba(232, 220, 196, 0.12)"`. These match design tokens but don't reference them.

- [ ] **Step 1:** Read `components/sections/HeroSection.tsx` lines 35-83 to confirm current SVG markup.

- [ ] **Step 2:** Add CSS classes in `app/globals.css` after the existing `.mountain` styles (around line 613):

```css
.mountain__layer--front {
  fill: var(--polaris-navy);
}

.mountain__layer--back {
  fill: var(--polaris-navy-mid);
}

.wave-line--primary {
  fill: none;
  stroke: rgba(var(--polaris-star-rgb), 0.12);
  stroke-width: 1;
}

.wave-line--secondary {
  fill: none;
  stroke: rgba(var(--polaris-star-rgb), 0.08);
  stroke-width: 0.5;
}
```

- [ ] **Step 3:** In `HeroSection.tsx`, update the `Mountains` component. Replace hard-coded `fill` and `opacity` attributes with CSS classes:

For left mountain:
```tsx
<path d="M0,200 L0,120 L50,80 ..." className="mountain__layer--front" opacity="0.7" />
<path d="M0,200 L0,140 L80,100 ..." className="mountain__layer--back" opacity="0.5" />
```

For right mountain:
```tsx
<path d="M0,200 L0,100 L60,70 ..." className="mountain__layer--front" opacity="0.5" />
<path d="M0,200 L0,130 L50,100 ..." className="mountain__layer--back" opacity="0.3" />
```

Remove inline `fill="#0d1f3c"` and `fill="#122a4d"` from all four paths.

- [ ] **Step 4:** Update the `WaveSurface` component. Replace hard-coded stroke attributes:

```tsx
<path d="M0,15 Q75,12 ..." className="wave-line--primary" />
<path d="M0,20 Q75,17 ..." className="wave-line--secondary" />
```

Remove inline `fill`, `stroke`, and `strokeWidth` attributes from both paths.

- [ ] **Step 5:** Run `npm run lint && npm run build`.

- [ ] **Step 6:** Commit.
```bash
git add components/sections/HeroSection.tsx app/globals.css
git commit -m "refactor(theme): replace hard-coded SVG colors with design token CSS classes"
```

---

### Task 8: Replace `border-white/10` with cream token (M3)

**Files:**
- Modify: `app/globals.css:68`

- [ ] **Step 1:** Read `app/globals.css` lines 66-70 to confirm.

- [ ] **Step 2:** Replace line 68:
```css
/* Before */
@apply border-white/10;
/* After */
border-color: rgba(var(--polaris-star-rgb), 0.1);
```

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "fix(theme): use cream-tinted border color instead of pure white"
```

---

### Task 9: Phase 2 verification

- [ ] **Step 1:** Run `npm run lint && npm run build`.
- [ ] **Step 2:** Verify all 3 fixes are committed.

---

## Chunk 3: `/optimize` — Performance

Issues: H2, M1, M2

### Task 10: Replace `transition: all` with explicit properties (H2)

**Files:**
- Modify: `app/globals.css` — 13 instances

**Context:** `transition: all` transitions every CSS property, including layout-triggering ones. Each instance should list only the properties that actually change on that element.

- [ ] **Step 1:** Read `app/globals.css` and locate all `transition: all` instances. Current locations:
  - Line 214: `.top-nav__cta` — changes: `background`, `color`
  - Line 1110: `.btn-primary` — changes: `background`, `border-color`, `box-shadow`, `transform`
  - Line 1138: `.btn-secondary` — changes: `border-color`, `color`, `transform`
  - Line 1336: `.card` — changes: `border-color`, `transform`, `box-shadow`
  - Line 1461: `.token-card` — changes: `border-color`, `transform`
  - Line 1497: `.token-card--*::before` — changes: `width`, `height`, `background`
  - Line 1583: `.narrative-step` — changes: `border-color`, `background`
  - Line 1759: `.benefit-card` — changes: `border-color`, `transform`, `box-shadow`
  - Line 1779: `.benefit-card__icon` — changes: `background`, `box-shadow`
  - Line 2215: `.trust-strip__item` — changes: `border-color`, `transform`
  - Line 2295: `.blog-callout` — changes: `border-color`, `background`, `transform`, `box-shadow`
  - Line 2331: `.blog-callout::after` — changes: `width`, `height`, `background`
  - Line 2415: `.blog-callout__link` — changes: `background`, `box-shadow`, `transform`

- [ ] **Step 2:** Replace each `transition: all` with the specific properties listed above. Use the same timing function and duration that was already there. Example for `.btn-primary`:

```css
/* Before */
transition: all 0.3s ease;
/* After */
transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
```

For `.token-card--*::before` and `.blog-callout::after` which animate `width`/`height`: these are layout properties. Replace with `transform: scale()` approach if feasible, or keep explicit `width, height, background` transition as a known trade-off.

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "perf: replace transition: all with explicit property lists"
```

---

### Task 11: Optimize animated `filter: drop-shadow` on Polaris star (M1)

**Files:**
- Modify: `app/globals.css` — `.polaris-star` (line 826-830) and `starPulseEnhanced` keyframes (lines 382-391)

**Context:** `starPulseEnhanced` animates `filter: drop-shadow(...)` which forces repaint every frame. Replace with a compositor-friendly approach: keep a static `filter` and animate a separate glow pseudo-element using only `opacity` and `transform`.

- [ ] **Step 1:** Read `app/globals.css` lines 382-391 (keyframes) and 826-830 (`.polaris-star`).

- [ ] **Step 2:** Replace the `starPulseEnhanced` keyframes with an opacity+transform-only animation:

```css
@keyframes starPulseEnhanced {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.92;
    transform: scale(1.03);
  }
}
```

- [ ] **Step 3:** Add a static `filter` to `.polaris-star` (no animation on filter) and keep the keyframe animation for `opacity`/`transform` only:

```css
.polaris-star {
  position: relative;
  z-index: 3;
  filter: drop-shadow(0 0 30px var(--polaris-star-glow)) drop-shadow(0 0 60px var(--polaris-star-glow));
  animation: starPulseEnhanced 6s ease-in-out infinite;
}
```

- [ ] **Step 4:** Run `npm run lint && npm run build`.

- [ ] **Step 5:** Commit.
```bash
git add app/globals.css
git commit -m "perf: use compositor-friendly animation for Polaris star pulse"
```

---

### Task 12: Replace `filter: blur()` on water-glow elements (M2)

**Files:**
- Modify: `app/globals.css` — `.water-glow` (lines 699-736)

**Context:** Three `.water-glow` elements each have `filter: blur(20px)` — one of the most expensive CSS operations. Replace with wider, softer radial gradients that approximate the blur without runtime cost.

- [ ] **Step 1:** Read `app/globals.css` lines 699-736 for the current `.water-glow` styles.

- [ ] **Step 2:** Remove `filter: blur(20px)` from `.water-glow`. Widen the gradient stops to simulate the diffusion:

```css
.water-glow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(var(--polaris-star-rgb), 0.07) 0%,
    rgba(var(--polaris-star-rgb), 0.04) 25%,
    rgba(var(--polaris-star-rgb), 0.02) 50%,
    transparent 80%
  );
  pointer-events: none;
}
```

Note: Slightly reduce opacity values since the blur was adding visual softening. The wider gradient spread compensates.

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "perf: replace filter blur on water-glow with soft radial gradients"
```

---

### Task 13: Phase 3 verification

- [ ] **Step 1:** Run `npm run lint && npm run build`.
- [ ] **Step 2:** Verify all 3 fixes are committed.

---

## Chunk 4: `/quieter` — Tone Down CTA + `/distill` — Simplify & Clean

Issues: H4, H3, L4

### Task 14: Remove CTA glow animation (H4)

**Files:**
- Modify: `app/globals.css` — `.btn-primary` (line 1112)

**Context:** The `ctaGlow` animation pulses the primary CTA button continuously, creating a sense of urgency that contradicts the "calm confidence" design principle. The hover glow stays — that's interaction feedback.

- [ ] **Step 1:** Read `app/globals.css` lines 1095-1121 to confirm `.btn-primary` styles.

- [ ] **Step 2:** Remove the `animation: ctaGlow 3s ease-in-out infinite;` line from `.btn-primary`.

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "style: remove CTA glow pulse animation for calm confidence"
```

---

### Task 15: Redesign BenefitsSection layout (H3)

**Files:**
- Modify: `components/sections/BenefitsSection.tsx`
- Modify: `app/globals.css` (benefit-card styles, lines 1753-1812)

**Context:** The current 4-col card grid with icon + heading + bullets is the most template-looking section. Replace with a borderless layout: no card containers, left-aligned text, generous spacing. Icons float without their rounded containers.

- [ ] **Step 1:** Read `components/sections/BenefitsSection.tsx` and `app/globals.css` lines 1750-1815 to understand current structure.

- [ ] **Step 2:** Update `BenefitsSection.tsx` — replace the card grid with a 2x2 grid of borderless items:

```tsx
export function BenefitsSection() {
  return (
    <section className="section section--gradient">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Our Principles: The North Star of Ethereum</h2>
        <p className="reveal section-description">
          We&apos;ve been in the trenches for too long to see the space we&apos;ve dedicated our lives to end up neutralized. Polaris is our ultimate answer to the centralization of DeFi.
        </p>

        <div className="reveal-stagger benefits-grid mt-10">
          {benefitHighlights.map(({ title, bullets, Icon }, index) => (
            <div key={`benefit-${index}`} className="benefit-item">
              <Icon className="benefit-item__icon" aria-hidden />
              <h3 className="benefit-item__title">{title}</h3>
              <ul className="benefit-item__description space-y-2">
                {bullets.map((bullet, bulletIndex) => (
                  <li key={`benefit-${index}-bullet-${bulletIndex}`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3:** Replace the `.benefit-card` CSS block with new `.benefit-item` styles. Remove card containers, remove rounded backgrounds, left-align text, icon floats with subtle glow:

```css
/* ============================================
   BENEFIT ITEMS (borderless editorial layout)
   ============================================ */

.benefits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem 4rem;
  }
}

.benefit-item {
  /* No card container — content sits directly on section background */
}

.benefit-item__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--polaris-star);
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 8px rgba(var(--polaris-star-rgb), 0.3));
}

.benefit-item__title {
  font-family: var(--font-sans);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--polaris-star-bright);
  margin-bottom: 0.75rem;
  line-height: 1.35;
}

@media (min-width: 768px) {
  .benefit-item__title {
    font-size: 1.2rem;
  }
}

.benefit-item__description {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  line-height: 1.7;
  color: var(--polaris-cream-muted);
}

.benefit-item__description li {
  margin-bottom: 0.5rem;
}
```

- [ ] **Step 4:** Delete the old `.benefit-card`, `.benefit-card__icon`, `.benefit-card__title`, `.benefit-card__description` CSS blocks.

- [ ] **Step 5:** Run `npm run lint && npm run build`.

- [ ] **Step 6:** Commit.
```bash
git add components/sections/BenefitsSection.tsx app/globals.css
git commit -m "refactor: replace BenefitsSection card grid with borderless editorial layout"
```

---

### Task 16: Remove unused CSS (L4)

**Files:**
- Modify: `app/globals.css`

**Context:** Several CSS blocks exist for components not rendered on any page.

- [ ] **Step 1:** Read the CSS to confirm the exact line ranges of the blocks to delete:
  - `.launch-indicator`, `.launch-dot`, `.launch-dot::before`, `.launch-dot::after` (lines 1152-1185)
  - `.editorial-blocks`, `.editorial-block`, `.editorial-block:last-child`, `.editorial-block__title`, `.editorial-block__content`, `.editorial-block__content li` + their media queries (lines 1702-1747)
  - `.top-banner`, `.top-banner a`, `.top-banner a:hover` + media query (lines 2146-2179)
  - `.trust-strip__item` through `.trust-strip__meta-value` (lines 2206-2276) — keep `.trust-strip` and `.trust-strip__items` which ARE used

- [ ] **Step 2:** Delete all blocks listed above. Work from bottom to top to preserve line numbers.

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "chore: remove unused CSS for launch-indicator, editorial-block, top-banner, trust-strip items"
```

---

### Task 17: Phase 4+5 verification

- [ ] **Step 1:** Run `npm run lint && npm run build`.
- [ ] **Step 2:** Verify all fixes are committed.

---

## Chunk 5: Manual Cleanup

Issues: M5, M7, L1, L3

### Task 18: Verify token icon basePath (M5)

**Files:**
- Check: `lib/pageData.ts:74,81,88`
- Check: `next.config.ts`

**Context:** Token icons use `/components/pusd-icon.svg` etc. while other images use the `basePath` helper. However, `next.config.ts` has no `basePath` configured, and `lib/basePath.ts` exports `""`. So `next/image` `src="/components/..."` works fine.

- [ ] **Step 1:** Confirm `basePath` is empty string in `lib/basePath.ts` and no `basePath` in `next.config.ts`.

- [ ] **Step 2:** If basePath is empty (current state): **no change needed**. Document this as verified, not fixed. If basePath is ever configured, these paths will need updating.

---

### Task 19: Add abbreviation tags for DeFi terms (M7)

**Files:**
- Modify: `components/sections/HowItWorksSection.tsx` (first mention of "pETH", "CDP", "pUSD")
- Modify: `components/sections/TokensSection.tsx` (first mention in section descriptions)
- Modify: `components/sections/StablecoinOSSection.tsx` (first mention of "vePOLAR")

**Context:** First occurrences of key protocol terms in section descriptions should use `<abbr>` for screen reader clarity. Only in section-level descriptions, not in every card or data item.

- [ ] **Step 1:** Read each section component to identify the first occurrence of each term in description text.

- [ ] **Step 2:** Wrap first occurrences in `<abbr>` tags:
  - `pETH` → `<abbr title="Polaris ETH — volatility-capturing collateral token">pETH</abbr>`
  - `pUSD` → `<abbr title="Polaris USD — yield-bearing decentralized stablecoin">pUSD</abbr>`
  - `POLAR` → `<abbr title="POLAR — stewardship and yield token">POLAR</abbr>`
  - `CDP` → `<abbr title="Collateralized Debt Position">CDP</abbr>`
  - `vePOLAR` → `<abbr title="Vote-escrowed POLAR — locked governance token">vePOLAR</abbr>`

Only the first occurrence per section description paragraph. Do NOT add to card titles, data fields, or repeated mentions.

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add components/sections/HowItWorksSection.tsx components/sections/TokensSection.tsx components/sections/StablecoinOSSection.tsx
git commit -m "fix(a11y): add abbreviation tags for DeFi terminology"
```

---

### Task 20: Remove `!important` from star visibility (L1)

**Files:**
- Modify: `app/globals.css:939,955`

**Context:** `.star--hide-mobile` uses `display: none !important` and the desktop restore uses `display: block !important`. These can be replaced with higher-specificity selectors.

- [ ] **Step 1:** Read `app/globals.css` lines 935-970 to confirm current selectors.

- [ ] **Step 2:** Replace the `!important` rules:

```css
/* Before */
.star--hide-mobile {
  display: none !important;
}

/* After (inside the utilities layer) */
.starfield .star--hide-mobile {
  display: none;
}
```

And for the desktop restore:

```css
/* Before */
.star--hide-mobile {
  display: block !important;
}

/* After */
@media (min-width: 768px) {
  .starfield .star--hide-mobile {
    display: block;
  }
}
```

- [ ] **Step 3:** Run `npm run lint && npm run build`.

- [ ] **Step 4:** Commit.
```bash
git add app/globals.css
git commit -m "refactor: remove !important from star visibility using higher specificity"
```

---

### Task 21: Deterministic star generation (L3)

**Files:**
- Modify: `components/sections/HeroSection.tsx:12-28`

**Context:** Stars are generated with `Math.random()` at module level. For static export this runs at build time, producing different patterns per build. A seeded PRNG makes builds reproducible.

- [ ] **Step 1:** Read `components/sections/HeroSection.tsx` lines 1-34 to understand the star generation.

- [ ] **Step 2:** Add a simple seeded PRNG function at the top of the file (before `generateStars`):

```typescript
// Simple seeded PRNG (mulberry32) for deterministic star positions across builds
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(42);
```

- [ ] **Step 3:** Replace all `Math.random()` calls in `generateStars` with `random()`:

```typescript
function generateStars(count: number, type: "tiny" | "small" | "medium" | "bright") {
  return Array.from({ length: count }, (_, i) => {
    const isNearPolaris = type !== "bright" && random() < NEAR_POLARIS_PROBABILITY;
    const baseLeft = isNearPolaris ? POLARIS_LEFT_MIN + random() * POLARIS_LEFT_RANGE : random() * 100;
    const baseTop = isNearPolaris ? POLARIS_TOP_MIN + random() * POLARIS_TOP_RANGE : random() * SKY_TOP_MAX;

    return {
      id: `${type}-${i}`,
      index: i,
      left: `${baseLeft}%`,
      top: `${baseTop}%`,
      delay: `${random() * 5}s`,
      nearPolaris: isNearPolaris,
      hideOnMobile: type === "tiny" ? i >= 10 : type === "small" ? i >= 5 : type === "medium" ? i >= 2 : i >= 2,
    };
  });
}
```

- [ ] **Step 4:** Run `npm run lint && npm run build`.

- [ ] **Step 5:** Commit.
```bash
git add components/sections/HeroSection.tsx
git commit -m "refactor: use seeded PRNG for deterministic star positions across builds"
```

---

### Task 22: Final verification

- [ ] **Step 1:** Run `npm run lint` — expect clean.
- [ ] **Step 2:** Run `npm run build` — expect successful static export.
- [ ] **Step 3:** Run `npx playwright test` — expect all tests passing.
- [ ] **Step 4:** Review all commits with `git log --oneline` to confirm 12-13 clean commits.
