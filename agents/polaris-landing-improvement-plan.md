# Polaris Landing — Improvement Plan

**Date:** 2026-06-11
**Method:** Three independent assessments, synthesized: (A) design-director review with live browser inspection at desktop 1440×900 and mobile 390×844 (homepage, blog index, blog post, 404), Nielsen heuristic scoring, cognitive-load checklist, and persona walkthroughs; (B) deterministic anti-pattern detector (CLI scan over `app/` + `components/`, plus in-page detector injection on 3 pages); (C) content/conversion/SEO/technical review from source + curl.

**Design health score: 28/40** (Good — solid foundation, address weak areas). Full heuristic table in the appendix.

---

## Executive summary

The site is **not** AI-slop and the craft is real: the coded celestial hero (seeded starfield, layered mountains, animated water reflections), the bespoke system diagrams (including a separately composed mobile variant), measured text contrast of 7.3–17.4:1 everywhere, and an unusually honest FAQ put it well above the generic DeFi landing page.

The problems are almost all **trust mechanics, not aesthetics** — and trust is the one thing the stated audience (skeptical DeFi power users) evaluates hardest:

1. ~~The hero claims "Tier-1 audits" in present tense while the roadmap says audits are *upcoming*.~~ **Fixed 2026-06-11.**
2. ~~Five of six FAQ answers are silently truncated on mobile — including the risk disclosure.~~ **Fixed 2026-06-11 (+ regression test).**
3. ~~The FAQ describes the testnet as gated ("DM to request access") but the testnet is **open access** — stale copy actively deterring users from an open product.~~ **Fixed 2026-06-11: both FAQ passages now describe a public testnet.**
4. ~~The strongest trust asset the project has — Robert Lauko (Liquity founder) is publicly named in the blog — is invisible on the homepage, which instead says "DeFi legends" facing "the final boss".~~ **Fixed 2026-06-11: homepage now names Lauko and Liquity's original devs.**
5. ~~The most valuable nav slot advertises what doesn't exist ("Whitepaper coming soon"), and there is no docs path at all.~~ **Owner: docs are coming soon and will resolve this — no action needed beyond linking them in the nav when live.**

Fixing the P1 tier is mostly copy and small component changes: cheap, fast, and directly accretive to the site's single success metric (a skeptic clicking through to app or docs, convinced).

---

## What's working — do not touch

- **The coded hero scene** (`components/sections/HeroSection.tsx` + `app/globals.css`): deterministic seeded starfield (mulberry32), layered SVG mountains, animated star-reflection bands. The brand promise executed literally in code. This is why the site doesn't read as template.
- **Illustration as explanation**: the 5-step system diagram with a hand-recomposed vertical SVG for mobile (`HowItWorksSection.tsx`), bespoke on-palette blog covers. "Substance over spectacle" honored.
- **Accessibility floor**: working skip link, 3px focus outlines everywhere, all measured text ≥7.3:1 contrast, color-blind-safe patterned token cards, `prefers-reduced-motion` honored in 5 blocks, `aria-label`s on icon links.
- **FAQ substance**: the bonding-curve formula (`price = alpha × supply^beta`, beta ≈ 0.3), honest drawdown mechanics, the Liquity comparison. Best content on the site.
- **SEO foundations**: single h1, canonical URLs, per-post OG images with measured dimensions, sitemap with image extensions, valid RSS, clean JSON-LD (no fabricated ratings), strong blog↔home interlinking.

---

## P1 — Fix before anything else (trust-critical)

### 1. Resolve the audit-claim contradiction — DONE (2026-06-11)
`lib/pageData.ts` hero stat rewritten to *"Fully onchain and immutable, verified through simulations and agent-based modeling, with Tier-1 audits ahead of mainnet."* — consistent with the roadmap's "Audits: Upcoming". Name the firms here once engagements are signed.

### 2. Fix the FAQ mobile clipping bug — DONE (2026-06-11)
The `max-h-[800px]` animation in `components/sections/FAQSection.tsx` (which cut 5 of 6 answers mid-sentence at 390px, including the risk disclosure) was replaced with the `grid-template-rows: 0fr → 1fr` technique. Regression test added: `tests/mobile-responsive.spec.ts` "FAQ Accordion" asserts every answer expands without clipping (scrollHeight == clientHeight) at mobile viewport; verified passing on chromium + Mobile Chrome against the static build.

### 3. Update stale "gated testnet" copy — DONE (2026-06-11)
*(Reframed after owner correction: the testnet is NOT gated; the site copy was what's wrong.)*
Both passages in `components/sections/FAQSection.tsx` rewritten: "gated testnet phase… limited to select participants" → "public testnet phase… Anyone can try the protocol", and the "Getting Started" answer now says the testnet is public (open the app, connect a wallet) with X as a help channel, replacing the "DM to request access / special wETH we distribute" instructions. If test wETH still requires a specific distribution step (faucet, in-app mint), add that detail to "Getting Started".

### 4. Claim the team credibility that's already public — DONE (2026-06-11)
The "DeFi legends… final boss" bullet in `lib/pageData.ts` now reads: *"The Polaris team is composed of experienced Solidity developers who shipped several stablecoins. The model builds on research by Liquity founder Robert Lauko, and Liquity's original devs are contributing their expertise to this next chapter."* — every claim verifiable against `content/blog/path-to-the-north-star.md`. Optional later: a small named-team row (TokenBrice, Robert Mullins/0xLuude, Laurens are all public in the blog).

### 5. Put real actions in the nav; retire the dead pill — RESOLVED BY UPCOMING DOCS
**Owner decision (2026-06-11): docs are coming soon and will take this slot — skip this item.** Residual suggestion for when docs ship: replace the "Whitepaper coming soon" pill (`components/TopNav.tsx:49-52`) with the docs link, and consider adding Try Testnet to the nav alongside it.

---

## P2 — High-leverage improvements

### 6. Add a closing CTA section after the FAQ — DONE (2026-06-11)
The page ended FAQ → sparse footer with the only conversion CTA at the very top of a ~15,700px mobile scroll. **Implemented:** `components/sections/ClosingCtaSection.tsx` ("The testnet is open" + Try Testnet + View Live Metrics → analytics dashboard), inserted after the FAQ with a compass divider, registered in the dot nav as "Testnet". Also partially addresses #8 (analytics link now exists outside the FAQ).

### 7. Build a "Security & Verification" block (section now, page later)
Consolidate: audit status (honest), the simulations/agent-based-modeling results the copy keeps citing, GitHub contracts repo, Testnet Analytics dashboard. This is the verification path the "verify before trusting" user currently can't find. Note: CLAUDE.md references an about page ("when adding a data source, update the about page") but `/about/` 404s — decide whether this block lives on the homepage or becomes that page.

### 8. Link "Testnet Analytics" where it's named
`components/sections/RoadmapSection.tsx:12` says "Explore metrics at Testnet Analytics" as **plain text**. The live dashboard is the project's best proof-of-life asset and its only link is inside FAQ answer 2. Make the roadmap mention a real link; consider surfacing one real metric in `StatsSection` (currently 4 "stats" containing zero numbers).

### 9. De-hype the remaining copy
- `FAQSection.tsx:213`: "nuclear-grade security … infinite scalability" → concrete claims or cut.
- `lib/pageData.ts:37`: "Three interlocking primitives… sustainable yield… robust stability mechanisms" → filler; tighten.
- Terminology drift: "uncorrelated yield" (How It Works) vs "self-correlated yield sources" (hero stats) — pick one or explain the distinction; to a careful reader it looks like an error.
- "Stable beta, real yield" (POLAR tagline) — ambiguous even to DeFi natives.
- Define "Yield Trap" at first use (it appears in scare quotes, undefined on-page).

### 10. Mobile nav: label the icons
`TopNav.tsx` hides `top-nav__link-text` on mobile, leaving icon-only Blog/X/Telegram glyphs (a first-timer red flag), and "WP coming soon" is meaningless. Brand tap target is 28×28px (below 44pt). Show short labels or increase targets; #5 removes the WP pill anyway.

### 11. SEO/meta tune-up
- `lib/constants.ts:3-4`: meta description is the tagline; rewrite to mention pUSD/pETH, CDP, Ethereum, yield-bearing stablecoin (query-matching terms).
- `content/blog/bull-case.md:9`: remove the markdown `#` H1 — the template already renders the title, producing a duplicate h1 (verified).
- 404 page keeps the homepage `<title>`; give it its own.
- `components/JsonLd.tsx`: Organization `logo` points to an SVG (Google prefers raster ≥112×112); `softwareApplicationSchema` `operatingSystem: "Ethereum"` + `offers.price: "0"` are semantically odd.
- `/polaris-og.png` is 460KB; recompress below ~300KB.

### 12. Hero clarity for the uninitiated
H1 "Self-Scaling Stablecoin Operating System" contains neither "Polaris" nor a plain-language sentence about what this is. Keep the H1 if it's the brand line, but add one concrete subline (the existing "without T-Bills, without CEXs, without compromises" line is the best on the site — make sure a plain "what is this" sentence sits near it). `<abbr>` tooltips (pETH, CDP) are hover-only — dead on touch; consider tap-friendly definitions or a one-line glossary.

---

## P3 — Polish & tech debt

**Repo/perf**
- **Delete `public/.backup-originals/` (5.2MB)** — committed and shipped in the static export (`out/.backup-originals` exists). Gitignore + remove; exclude from the optimize-script glob.
- `public/infographics/` is **12MB of PNGs** (eight files >500KB), served via plain `<img>` with Next image optimization off. Extend `scripts/optimize-images.mjs` to emit WebP/AVIF (+ `<picture>` or content-pipeline rewrite). Currently 0 webp/avif files in `public/`.
- `public/polaris_cover.png` (896KB) and `public/cover-image.png` (284KB) appear unreferenced — confirm and delete.
- `npx tsc --noEmit` fails: `tests/error-handling.spec.ts:179,199` — `checkValidity` on `SVGElement | HTMLElement`; cast to `HTMLInputElement`/`HTMLFormElement`.
- `eslint-config-next` pinned 15.5.3 vs `next` ^16.1.6 — align.
- `RoadmapSection.tsx`: unnecessary `"use client"`; fragile inline-style regex hack (`config.bg.match(/var\(([^)]+)\)/)`) bypassing the token system used everywhere else.
- `app/globals.css:2284` (`.blog-callout`): transitions `width`/`height` (layout properties; detector hit) — animate transform/opacity instead.

**Design/copy consistency**
- Heading case drifts: "Triple-Engine Architecture" (Title Case) vs "Stewarded, not governed" (sentence case) — pick one.
- X naming drifts: "X.com" (nav) / "X" (footer) / "Twitter/X" (FAQ).
- One section, three names: "Transmission Log" heading, `id="featured-shows"`, dot-nav label "Media".
- "Open recording" links render two arrow glyphs (inline arrow + external ↗) — pick one.
- Blog card restates its title (on the cover image *and* as the heading beneath).
- Blog-callout cards use a bolded `<p>` as a pseudo-heading — use a real heading element.
- Em dashes per house style: `app/blog/page.tsx:78`, `FAQSection.tsx` ("yet—we prioritize", "floor price—the minimum").
- Focus order: the 9 ActiveSectionNav dots receive Tab focus before the top nav — keyboard users wade through 9 tiny anchors to reach "Blog". Move the dot nav later in DOM order (CSS-position it) or add a second skip target.
- Homepage body line lengths measured at ~90–147ch in several sections (target ≤75ch) — tighten `max-width` on section descriptions and FAQ answers.
- TableOfContents (`app/blog/[slug]/page.tsx:46`) `border-l-2` — detector side-stripe hit; it's low-alpha/tonal so borderline, but a full hairline border would be cleaner.
- Latest post is 2026-04-27 (6 weeks stale) while the sitemap claims `weekly` changefreq for `/blog/` — publish or adjust.

**Test coverage gaps**
- No FAQ accordion test (would have caught the P1 clipping bug).
- No JSON-LD parseability assertion; nothing catching markdown-sourced duplicate h1s (bull-case slipped through).
- No guard that `.backup-originals` stays out of the deploy artifact.

---

## Suggested execution order

| Wave | Items | Nature | Verify |
|---|---|---|---|
| 1 — same day | #9 copy de-hype (~~#1, #3, #4~~ done); #8 link; #11 bull-case h1 + 404 title | Copy/one-liners | `npm run lint`, `npx playwright test tests/seo.spec.ts` |
| 2 — components | #10 mobile nav labels (~~#2 FAQ fix + test~~ done; #5 dropped — docs coming) | Small components | `npx playwright test` (mobile + a11y suites), manual 390px check |
| 3 — sections | ~~#6 closing CTA~~ done; #7 security/verification block; #12 hero subline | New section work | full Playwright + Lighthouse |
| 4 — repo hygiene | backup-originals, infographics WebP/AVIF, tsc errors, dep skew, RoadmapSection cleanup | Tech debt | `npm run build`, inspect `out/`, `npx tsc --noEmit` |
| 5 — polish | P3 consistency items, line lengths, focus order | Sweep | a11y + design-quality suites |

---

## Appendix A — Heuristic scores (Nielsen, 0–4)

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 3 | "Try Testnet" gives no signal it exits to a gated app; FAQ clips silently |
| 2 | Match system / real world | 3 | Right register for DeFi natives; hero H1 pure jargon otherwise; "Yield Trap" undefined |
| 3 | User control and freedom | 3 | Good: back-links, collapsible FAQ, externals in new tabs |
| 4 | Consistency and standards | 3 | Heading case drift; X naming drift; RoadmapSection bypasses token system |
| 5 | Error prevention | 2 | Gated-CTA surprise; inert "coming soon" button-shaped span |
| 6 | Recognition rather than recall | 2 | Icon-only mobile nav; testnet access rules 8,000px from the CTA |
| 7 | Flexibility and efficiency | 3 | Skip link, dot nav, blog search, RSS |
| 8 | Aesthetic and minimalist design | 4 | Genuinely calm and hierarchical; StablecoinOS bullets the only text-wall |
| 9 | Error recovery | 3 | On-brand 404; wrong `<title>` on it |
| 10 | Help and documentation | 2 | Excellent FAQ; but no docs, inert whitepaper, GitHub buried |
| | **Total** | **28/40** | **Good** |

**Cognitive load:** 2 of 8 checklist failures (moderate) — hero decision point shows 7 options with X/Telegram duplicated between nav and hero; testnet-access knowledge must be carried from page bottom to top.

## Appendix B — Detector evidence (deterministic)

CLI scan (`app/` + `components/`): 2 findings — `side-tab` (`app/blog/[slug]/page.tsx:46`, low-alpha tonal, borderline) and `layout-transition` (`app/globals.css:2284`, real). In-page detector across 3 pages: line-length violations (~90–147ch, 67 hits), `overused-font` (Inter 71–89% — expected: it's the body face), `image-hover-transform` on blog cards and `clipped-overflow-container` hits (standard image-zoom card pattern, mostly benign), `dark-glow` ×14 (the brand's deliberate luminosity, accepted), and 6 `low-contrast` hits on roadmap accent colors that visual inspection contradicts (detector resolved solid status-dot elements as text backgrounds — false positives; measured real text contrast is 7.3–17.4:1 site-wide).

## Appendix C — Persona highlights

- **Mara (skeptical DeFi power user, the target):** checklist on arrival — docs ✗, whitepaper ✗, audits contradictory, team unnamed ("DeFi legends"), contracts ✗, GitHub buried. What wins her back: the curve formula, the honest risk FAQ, the Liquity comparison. The substance exists; three hype phrases and one contradiction undercut it.
- **Jordan (first-timer):** no plain-language "what is this" above the fold; icon-only mobile nav; hover-only `<abbr>` tooltips dead on touch.
- **Riley (stress tester):** FAQ clipping; promise/reality gap on the CTA; "Testnet Analytics" named but not linked; 404 title; inert WP pill.
- **Casey (distracted mobile):** 15,701px scroll with the only CTA at the top; back-to-top occupies the thumb zone instead of an action; sub-44pt targets (brand 28×28, show-card links 26px tall).

## Appendix D — Three questions worth sitting with

1. If a skeptical whale reads "Tier-1 audits" in the hero and "Audits: Upcoming" two scrolls later, which of your other claims do they still believe?
2. The most valuable slot on the site announces what you *don't* have. What would it say about the protocol's confidence if the app link were there instead?
3. The reader is most convinced at the bottom of the page, but the only invitation to act is at the top — and it quietly over-promises. What does an honest conversion moment look like?
