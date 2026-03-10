# Audit Remediation — Design Spec

Date: 2026-03-10
Scope: All 18 issues from the quality audit (2 Critical, 4 High, 7 Medium, 5 Low)

## Context

A comprehensive quality audit of the Polaris landing page identified 18 issues across accessibility, performance, theming, responsive design, and anti-patterns. This spec defines the remediation plan organized around 5 skill-driven phases plus a final manual cleanup pass.

## Approach

Work is organized as **5 sequential skill invocations**, each targeting a cluster of related issues. Order matters — structural fixes first, refinement last, so later phases don't conflict with earlier changes. Build verification after each phase.

## Phase 1: `/harden` — Accessibility & Resilience

Issues: C1, M4, M6, L5 (4 issues)

### C1: CSS animations ignore `prefers-reduced-motion`
- **File:** `app/globals.css` (after keyframes section, around line 461)
- **Action:** Add `@media (prefers-reduced-motion: reduce)` block that disables all continuous CSS animations: star twinkle (`twinkle`, `twinkleSlow`), water effects (`waterRipple`, `rippleDrift`, `waterGlow`, `waveDrift`, `reflectionShimmer`), star effects (`starPulse`, `starPulseEnhanced`, `starGlow`, `brightStarTwinkle`, `rotateGlow`, `starDrift`), CTA pulse (`ctaGlow`), float (`floatGentle`, `driftSlow`).
- **Note:** Scroll reveal animations (`revealUp`, `revealScale`, `revealStagger`) are already handled in `ScrollReveal.tsx` — they fire once and stop, so they're acceptable. The hero entrance (`heroFadeInUp`) is a one-shot animation and can stay.

### M4: Reveal content invisible without JS
- **File:** `app/globals.css` or `app/layout.tsx`
- **Action:** Add a `<noscript><style>` block that makes `.reveal`, `.reveal--scale`, and `.reveal-stagger > *` visible (opacity: 1, transform: none).

### M6: Blog callout click area mismatch
- **Files:** `components/sections/TokensSection.tsx`, `components/sections/StablecoinOSSection.tsx`
- **Action:** Make the entire `.blog-callout` container a clickable link, or remove the hover lift/border effects from the container so the visual affordance matches the actual interactive area.

### L5: Footer text link touch targets
- **File:** `app/globals.css` (footer section, around line 1901)
- **Action:** Add `min-height: 44px` and appropriate padding to `.footer__link` text links (not just `.footer__link--icon`).

## Phase 2: `/normalize` — Design Token Consistency

Issues: C2, H1, M3 (3 issues)

### C2: `--polaris-star-bright` is pure white
- **File:** `app/globals.css:17`
- **Action:** Change `--polaris-star-bright: #FFFFFF` to a warm near-white like `#FAF6EE`. This affects `.narrative-step__title`, `.benefit-card__title`, `.show-card__title`.
- **Constraint:** Must maintain sufficient contrast ratio (>7:1) against navy backgrounds.

### H1: Hard-coded SVG colors in HeroSection
- **File:** `components/sections/HeroSection.tsx:38-61,69-80`
- **Action:** Replace hard-coded `fill="#0d1f3c"`, `fill="#122a4d"`, and `stroke="rgba(232, 220, 196, 0.12)"` with CSS classes that reference design token variables.
- **Approach:** Add CSS classes for mountain layers and wave strokes that use `fill: var(--polaris-navy)` etc. Apply via className on the SVG elements.

### M3: `border-white/10` uses pure white
- **File:** `app/globals.css:68`
- **Action:** Replace `@apply border-white/10` with `border-color: rgba(var(--polaris-star-rgb), 0.1)`.

## Phase 3: `/optimize` — Performance

Issues: H2, M1, M2 (3 issues)

### H2: `transition: all` used broadly
- **File:** `app/globals.css` — lines 1111, 1138, 214, and other instances
- **Action:** Replace every `transition: all` with explicit property lists. Typical replacement: `transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease`. Each instance should list only the properties that actually change on that element.

### M1: Animated `filter: drop-shadow()` on Polaris star
- **File:** `app/globals.css` — `starPulseEnhanced` keyframes (lines 382-391) and `.polaris-star` (line 829)
- **Action:** Replace the animating `filter: drop-shadow(...)` with a compositor-friendly approach. Options: use a `::after` pseudo-element with `box-shadow` and animate only its `opacity`, or use a static drop-shadow with a separate glow element animated via `opacity` and `transform` only.

### M2: `filter: blur(20px)` on water-glow elements
- **File:** `app/globals.css` — `.water-glow` (lines 700-736)
- **Action:** Replace `filter: blur(20px)` with wider, softer radial gradients that approximate the blur effect without runtime cost. The gradient stops should be more spread out to simulate the diffusion.

## Phase 4: `/quieter` — Tone Down CTA

Issues: H4 (1 issue)

### H4: CTA glow animation contradicts "calm confidence"
- **File:** `app/globals.css` — `.btn-primary` (line 1112)
- **Action:** Remove `animation: ctaGlow 3s ease-in-out infinite` from `.btn-primary`. The button's static appearance (cream fill, dark text, pill shape) is confident enough without pulsing. Keep the hover glow (`box-shadow` on hover) — that's interaction feedback, not idle urgency.

## Phase 5: `/distill` — Simplify & Clean

Issues: H3, L4 (2 issues)

### H3: BenefitsSection redesign
- **File:** `components/sections/BenefitsSection.tsx`, `app/globals.css` (benefit-card styles, lines 1753-1812)
- **Action:** Replace the 4-col card grid with a layout that doesn't match the "icon + heading + text in identical cards" anti-pattern. Options:
  - Borderless editorial layout: remove card containers, left-align text, let content sit directly on section background with generous spacing
  - Two-column alternating layout with larger spacing
  - Stacked list with horizontal rule separators (like the editorial-block pattern but without cards)
- **Constraint:** Keep the icon, title, and bullet content. The data in `pageData.ts` doesn't change.

### L4: Remove unused CSS
- **File:** `app/globals.css`
- **Action:** Delete all CSS for components not used on any page:
  - `.launch-indicator`, `.launch-dot` (lines 1152-1185)
  - `.top-banner` and children (lines 2146-2179)
  - `.trust-strip__item`, `__header`, `__logo`, `__logo--full`, `__logo-image`, `__logo-image--full`, `__meta`, `__meta-label`, `__meta-value` (lines 2206-2276)
  - `.editorial-block`, `__title`, `__content` (lines 1702-1747)
- **Note:** Keep `.trust-strip` and `.trust-strip__items` — those are used by `TokensSection`.

## Phase 6: Manual Cleanup

Issues: M5, M7, L1, L3 (4 issues) — no matching skill, small targeted fixes.

### M5: Token icon basePath
- **File:** `lib/pageData.ts:74,81,88`
- **Action:** Verify whether `next/image` auto-applies `basePath` to `src` strings. If not, prepend using the `basePath` helper.

### M7: Abbreviation tags for DeFi terms
- **Files:** Section components where pUSD, pETH, POLAR, CDP first appear
- **Action:** Wrap first occurrences in `<abbr title="...">` tags. Keep it minimal — only in section descriptions, not every mention.

### L1: Remove `!important` from star visibility
- **File:** `app/globals.css:939,955`
- **Action:** Replace `.star--hide-mobile { display: none !important; }` with a higher-specificity selector like `.starfield .star--hide-mobile { display: none; }`. Same for the desktop restore.

### L3: Deterministic star generation
- **File:** `components/sections/HeroSection.tsx:12-28`
- **Action:** Replace `Math.random()` with a simple seeded PRNG (e.g., mulberry32) so star positions are identical across builds.

## Verification

After each phase:
1. `npm run lint` — no new lint errors
2. `npm run build` — static export succeeds
3. Spot-check affected sections visually (dev server)

After all phases:
4. Full Playwright test suite: `npx playwright test`
