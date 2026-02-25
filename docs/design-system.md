# Brand & Design System

## Theme: "Celestial Night Sky"

A premium, ethereal aesthetic inspired by the Polaris star reflecting over calm ocean waters. Dark, sophisticated, with warm cream accents.

## Color Palette

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
--polaris-star-bright: #FFFFFF   /* Star core highlight only */
--polaris-star-glow: rgba(232, 220, 196, 0.6)  /* Glow effects */
--polaris-cream: #F5F0E6         /* Body text */
--polaris-cream-muted: rgba(245, 240, 230, 0.7)  /* Secondary text */
```

**Token Colors:**
```css
--polaris-pusd: #E8DCC4   /* Cream/gold - stablecoin */
--polaris-peth: #7BA5C9   /* Cool blue - ETH derivative */
--polaris-polar: #9B8FCF  /* Purple - governance token */
```

**Water/Ocean:**
```css
--polaris-water-dark: #0a1a2e
--polaris-water-light: #1a3a5c
--polaris-water-reflection: rgba(232, 220, 196, 0.15)
```

**Mountain silhouette:**
```css
--polaris-mountain: #0d1f3c
```

All variables defined in `app/globals.css`.

## Typography

**Fonts:**
- **Headings:** Cormorant Garamond (serif) - elegant, editorial feel
- **Body:** Inter (sans) - clean, readable
- Both loaded via `next/font/google` in `app/layout.tsx`

**CSS variables:**
```css
--font-serif: "Cormorant Garamond", "Times New Roman", Georgia, serif;
--font-sans: "Inter", "Helvetica Neue", "Segoe UI", Arial, sans-serif;
```

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

## Visual Patterns

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

## Animations (Subtle & Elegant)

- Star twinkle: gentle opacity pulsing
- Hero content: fade-in-up on load
- Cards: lift on hover
- Water effects: slow horizontal drift
- Glow rings: very slow rotation (60s)
- Always respect `prefers-reduced-motion`

## Component Hierarchy

```
hero-scene          -> Full celestial background with star
section             -> Content sections (use .section--gradient for variety)
  section-kicker    -> Small label/badge
  section-heading   -> Main title (serif)
  section-description -> Intro paragraph
card / stat-card / token-card / benefit-card -> Content cards
compass-divider     -> Section separator
footer              -> Site footer
```

These CSS classes are defined in `app/globals.css`.

## Icon Style

- Lucide icons (line style, 1.5px stroke)
- Custom icons in `@/components/icons.tsx`
- Icon containers: cream background at 8% opacity with subtle border

## Do's and Don'ts

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
