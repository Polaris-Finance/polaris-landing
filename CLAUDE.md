# Polaris Landing Page

DeFi protocol landing page built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. **Statically exported** to GitHub Pages (no SSR).

## Core Principles

- DRY/KISS/YAGNI. Minimal impact. Find root causes, no temp fixes.
- When adding a data source, update the about page.
- **Plan first**: Enter plan mode for non-trivial tasks (3+ steps). If stuck, stop and re-plan.
- **Verify before done**: Prove it works — build, type-check, test. Never claim done without evidence.
- **Be autonomous**: Fix bugs end-to-end without hand-holding. Chase logs and errors yourself.

## Folder Structure

All agents plans (design or implementation), as well as research and processes documents are placed in the `/agents/` folder.
**`/docs/` is to be used for application-related documentation only**

## Quick Commands

```bash
npm run dev       # Dev server with Turbopack (localhost:3000)
npm run build     # Production build (static export to out/)
npm run start     # Serve production build locally
npm run lint      # ESLint check (run before commits)
```

## Testing

Playwright end-to-end tests with axe-core accessibility checks:

```bash
npx playwright test                    # Run all tests
npx playwright test tests/seo.spec.ts  # Run a specific suite
npx playwright test --ui               # Interactive UI mode
```

Test suites in `tests/`: accessibility, blog, design-quality, error-handling, image-optimization, links-validation, mobile-responsive, navbar-mobile, performance, security-headers, seo.

CI also runs Lighthouse audits (thresholds in `lighthouserc.json`).

## Stack

- **Framework:** Next.js 16.1 App Router with Turbopack, static export (`output: 'export'`)
- **UI:** Tailwind CSS v4 + shadcn/ui (new-york style, minimal — only dialog so far)
- **Icons:** Lucide React (`@/components/icons.tsx` for custom icons)
- **Content:** Markdown files in `content/` parsed with gray-matter + react-markdown + remark-gfm
- **Images:** sharp for optimization, automated via `scripts/optimize-images.mjs`

## Project Structure

```
app/              -> Pages and layouts (App Router)
components/       -> Shared components (PascalCase files)
lib/              -> Utilities (cn, basePath, blog helpers)
content/          -> Markdown blog posts
public/           -> Static assets, favicons, OG images
tests/            -> Playwright e2e test suites
scripts/          -> Build scripts (image optimization)
docs/             -> Reference docs (design system, etc.)
.github/workflows -> CI/CD (deploy.yml, quality.yml)
```

## Code Conventions

- **Exports:** Named exports only; default exports only for `page.tsx`/`layout.tsx`
- **Styling:** Tailwind utilities first; use `cn()` from `@/lib/utils` for conditional classes
- **Imports:** Framework first, then third-party, then local (`@/` paths)
- **Components:** Functional components with TypeScript types; colocate types at top of file
- **Indentation:** 2 spaces

## Path Aliases

```typescript
@/*  ->  ./*   // (tsconfig.json)
```

Common: `@/components`, `@/lib`, `@/components/ui`

## When Adding Components

1. Check if shadcn has it: `npx shadcn@latest add [component]`
2. Custom icons go in `@/components/icons.tsx`
3. Page sections can live in `@/components/sections/`

## SEO & Content

- JSON-LD schemas in `@/components/JsonLd.tsx`
- Sitemap at `app/sitemap.ts`, robots at `app/robots.ts`
- RSS feed at `app/blog/feed.xml/route.ts`
- Blog posts in `content/blog/`, parsed by `lib/blog.ts`

## Deployment

Static export deployed to **GitHub Pages** via GitHub Actions:

- **deploy.yml**: push to main -> image optimization -> lint -> build -> upload to Pages
- **quality.yml**: push/PR -> lint, build, Playwright tests, Lighthouse audit, accessibility checks

Image optimization runs automatically before build (`scripts/optimize-images.mjs`).

## Environment

- Secrets in `.env.local` (never commit)
- See `.env.example` for required variables (currently: `NEXT_PUBLIC_GA_ID`)

## Commits

Format: `type: summary`
Examples: `feat: add hero animation`, `fix: mobile nav overflow`

## Brand & Design

"Celestial Night Sky" theme — deep navy backgrounds, warm cream text/accents, subtle glows.
Full design system reference: **[docs/design-system.md](docs/design-system.md)** (colors, typography, visual patterns, animations, component hierarchy, do's/don'ts).

## Design Context

### Users
DeFi power users — experienced with CDPs, bonding curves, and yield strategies. They evaluate protocols critically, value technical depth, and can tell when a project is serious versus hype. The site should respect their intelligence and get to substance quickly.

### Brand Personality
**Bold, visionary, warm.** Ambitious but approachable — like space exploration with a human touch. Polaris positions itself as a guiding star: confident in its direction, inviting others to follow. The tone is authoritative without being cold, forward-looking without being vaporware.

### Aesthetic Direction
- **Theme:** Celestial Night Sky — the protocol's own visual identity, not borrowed from any external reference. Deep navy cosmos, warm cream starlight, subtle luminous effects.
- **Dark mode only.** No light theme.
- **Typography:** Cormorant Garamond (serif) for headings gives editorial gravitas; Inter (sans) for body gives clean readability. Generous letter-spacing on display text reinforces the premium, unhurried feel.
- **Color:** Navy blues (`#050a14` to `#1a3a5c`), warm cream/star (`#E8DCC4`, `#F5F0E6`), token accents (pETH blue `#7BA5C9`, POLAR purple `#9B8FCF`). No neons, no saturated gradients.
- **Motion:** Subtle and purposeful — star twinkle, fade-in-up reveals, gentle card lifts. Always respects `prefers-reduced-motion`.
- **Anti-references:** Avoid generic DeFi aesthetics — no neon accent gradients, no rotating TVL counters, no "launch app" urgency patterns. Polaris should feel like discovering a constellation, not entering a casino.

### Design Principles
1. **Substance over spectacle.** Every visual element should reinforce the protocol's credibility. If it doesn't inform or orient, remove it.
2. **Warm precision.** Combine the warmth of cream-on-navy with precise spacing, alignment, and typographic hierarchy. Premium is in the details.
3. **Calm confidence.** The site should feel unhurried and assured. No urgency tactics, no visual noise. Let the content breathe.
4. **Celestial consistency.** Every component should feel like it belongs in the same night sky — same palette, same glass-like surfaces, same subtle luminosity.
5. **Respect the reader.** DeFi power users skim fast. Clear hierarchy, scannable sections, and direct language over marketing fluff.
