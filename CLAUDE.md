# Polaris Landing Page

DeFi protocol landing page built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## Quick Commands

```bash
npm run dev      # Dev server with Turbopack (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check (run before commits)
```

## Stack

- **Framework:** Next.js 15.5 App Router with Turbopack
- **UI:** Tailwind CSS v4 + shadcn/ui (new-york style)
- **Icons:** Lucide React (`@/components/icons.tsx` for custom icons)
- **Content:** Markdown files in `content/` parsed with gray-matter

## Project Structure

```
app/           → Pages and layouts (App Router)
components/    → Shared components (PascalCase files)
lib/           → Utilities (cn, basePath, blog helpers)
content/       → Markdown blog posts
public/        → Static assets, favicons, OG images
```

## Code Conventions

- **Exports:** Named exports only; default exports only for `page.tsx`/`layout.tsx`
- **Styling:** Tailwind utilities first; use `cn()` from `@/lib/utils` for conditional classes
- **Imports:** Framework first, then third-party, then local (`@/` paths)
- **Components:** Functional components with TypeScript types; colocate types at top of file
- **Indentation:** 2 spaces

## Path Aliases

```typescript
@/components  → components/
@/lib         → lib/
@/components/ui → components/ui/  (shadcn components)
```

## When Adding Components

1. Check if shadcn has it: `npx shadcn@latest add [component]`
2. Custom icons go in `@/components/icons.tsx`
3. Page sections can live in `@/components/sections/`

## SEO

- JSON-LD schemas in `@/components/JsonLd.tsx`
- Sitemap at `app/sitemap.ts`
- Robots at `app/robots.ts`

## Environment

- Secrets in `.env.local` (never commit)
- See `.env.example` for required variables

## Commits

Format: `type: summary`
Examples: `feat: add hero animation`, `fix: mobile nav overflow`

---

## Brand & Design System

### Theme: "Celestial Night Sky"

A premium, ethereal aesthetic inspired by the Polaris star reflecting over calm ocean waters. Dark, sophisticated, with warm cream accents.

### Color Palette

**Backgrounds (deep navy blues):**
```css
--polaris-navy-darkest: #050a14  /* Primary background */
--polaris-navy-dark: #0a1628     /* Section backgrounds */
--polaris-navy: #0d1f3c          /* Cards, elevated surfaces */
--polaris-navy-mid: #122a4d      /* Hover states */
--polaris-navy-light: #1a3a5c    /* Borders, subtle accents */
```

**Text & Accents (warm cream/star):**
```css
--polaris-star: #E8DCC4          /* Headings, primary text, CTAs */
--polaris-cream: #F5F0E6         /* Body text */
--polaris-cream-muted: rgba(245, 240, 230, 0.7)  /* Secondary text */
```

**Token Colors:**
```css
--polaris-pusd: #E8DCC4   /* Cream/gold - stablecoin */
--polaris-peth: #7BA5C9   /* Cool blue - ETH derivative */
--polaris-polar: #9B8FCF  /* Purple - governance token */
```

### Typography

**Fonts:**
- **Headings:** Cormorant Garamond (serif) - elegant, editorial feel
- **Body:** Inter (sans) - clean, readable
- Both loaded via `next/font/google` in `layout.tsx`

**Usage patterns:**
- `.font-serif` / `font-family: var(--font-serif)` for headings
- `.font-display` for hero titles (serif + letter-spacing: 0.2em)
- Default sans for body text
- Headings use `--polaris-star` color
- Body uses `--polaris-cream-muted`

**Letter spacing:**
- Hero title: 0.35em
- Section headings: 0.05em
- Kickers/labels: 0.15-0.2em (uppercase)
- Buttons: 0.1em (uppercase)

### Visual Patterns

**Cards:**
- Background: `rgba(13, 31, 60, 0.5)` with `backdrop-filter: blur(10px)`
- Border: `1px solid rgba(232, 220, 196, 0.1)`
- Border radius: 1.5rem (24px)
- Hover: border brightens, subtle lift (`translateY(-4px)`)

**Buttons:**
- Primary: Cream background, dark text, pill shape (9999px radius)
- Secondary: Transparent, cream border, pill shape
- Both have subtle glow on hover

**Section kickers:**
- Small uppercase text with icon
- Pill-shaped badge with subtle border
- Example: "THE ASSETS" with star icon

**Dividers:**
- Use compass rose SVG or wave patterns
- Subtle cream gradients fading to transparent

### Animations (Subtle & Elegant)

- Star twinkle: gentle opacity pulsing
- Hero content: fade-in-up on load
- Cards: lift on hover
- Water effects: slow horizontal drift
- Glow rings: very slow rotation (60s)
- Always respect `prefers-reduced-motion`

### Component Hierarchy

```
hero-scene          → Full celestial background with star
section             → Content sections (use .section--gradient for variety)
  section-kicker    → Small label/badge
  section-heading   → Main title (serif)
  section-description → Intro paragraph
card / stat-card / token-card / benefit-card → Content cards
compass-divider     → Section separator
footer              → Site footer
```

### Icon Style

- Lucide icons (line style, 1.5px stroke)
- Custom icons in `@/components/icons.tsx`
- Icon containers: cream background at 8% opacity with subtle border

### Do's and Don'ts

**Do:**
- Use generous whitespace
- Keep text contrast high (cream on navy)
- Use subtle glows and blurs for depth
- Animate sparingly and smoothly
- Mobile-first responsive design

**Don't:**
- Use pure white (#fff) for text - use cream tones
- Use harsh borders - keep them subtle (10-20% opacity)
- Over-animate - this is a premium, calm aesthetic
- Use bright saturated colors - stay in the muted palette
- Forget dark mode is the only mode here
