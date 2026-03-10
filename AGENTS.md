# Repository Guidelines

## Core Principles
- Prefer DRY/KISS/YAGNI solutions with minimal surface-area changes; fix root causes instead of layering temporary patches.
- Plan first for non-trivial work. If a task has multiple moving parts or you get stuck, stop and re-plan before making the code worse.
- Verify before calling work done. Run the relevant lint, build, and test commands and report concrete results.
- Work autonomously when the path is clear; this repo expects end-to-end follow-through rather than partial handoffs.
- When adding a new data source, update the related about/explainer content alongside the implementation.

## Project Structure & Runtime
This is a Next.js 16 App Router app using React 19, TypeScript, and Tailwind CSS v4. It is **statically exported** for GitHub Pages via `output: 'export'`, so avoid SSR-only or server-dependent assumptions.

- `app/` contains routes, layouts, metadata files, and global styling in `app/globals.css`.
- `components/` contains shared UI, with section components under `components/sections/` and custom icons in `components/icons.tsx`.
- `lib/` contains shared utilities such as class merging, path helpers, and blog helpers.
- `content/` contains markdown blog content.
- `public/` stores static assets, favicons, and OG images.
- `tests/` contains Playwright end-to-end coverage.
- `scripts/` contains build helpers such as image optimization.
- `docs/` is for app/product documentation only. Put agent plans, research, and process documents in `agents/`.
- `.github/workflows/` contains deployment and quality gates.
- Root config files such as `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `components.json` define runtime and tooling behavior; update them deliberately when a change crosses those boundaries.

## Build, Test, and Development Commands
- `npm run dev` starts the Turbopack dev server at `http://localhost:3000`.
- `npm run build` creates the production static export in `out/`.
- `npm start` serves the production build locally for smoke testing.
- `npm run lint` runs ESLint and should pass before every commit.
- `npx playwright test` runs the full end-to-end suite.
- `npx playwright test tests/seo.spec.ts` runs a focused Playwright suite when iterating.

## Coding Style & Naming Conventions
- Use TypeScript-first functional React components with 2-space indentation.
- Prefer named exports; use default exports only where Next.js routing requires them, such as `page.tsx` and `layout.tsx`.
- Prefer Tailwind utilities for styling. When conditional class logic grows, extract it with `cn()` from `@/lib/utils`.
- Keep imports ordered as framework, third-party, then local `@/` paths.
- Use PascalCase for extracted component filenames.
- Before creating a new primitive, check whether shadcn already provides it: `npx shadcn@latest add [component]`.
- Keep SEO/content plumbing consistent: JSON-LD lives in `components/JsonLd.tsx`, sitemap in `app/sitemap.ts`, robots in `app/robots.ts`, and the RSS feed in `app/blog/feed.xml/route.ts`.

## Testing & Verification
Playwright and axe-core are already wired into this repo. Existing suites cover accessibility, blog rendering, design quality, error handling, image optimization, link validation, mobile responsiveness, navbar behavior, performance, security headers, and SEO.

- Run the tests that match the area you changed; for cross-cutting work, also run `npm run lint` and `npm run build`.
- CI also runs Lighthouse using `lighthouserc.json`; avoid changes that regress core metrics or accessibility.
- Do not mark work complete without reporting the commands run and whether they passed.

## Deployment, Environment, and Assets
- Deployment is handled by GitHub Pages via `.github/workflows/deploy.yml`.
- The deploy pipeline optimizes images with `scripts/optimize-images.mjs`, then runs lint and build before publishing `out/`.
- Secrets belong in `.env.local`; the current public example is in `.env.example` (`NEXT_PUBLIC_GA_ID`).
- When adding a new environment variable, document it and expose it safely.

## Commits & Review
- Use concise `type: summary` commit messages, for example `feat: add hero animation` or `fix: mobile nav overflow`.
- Keep pull requests scoped to one feature or fix, include screenshots for UI changes, and note the verification commands you ran.

## Brand & Design
The site follows a "Celestial Night Sky" visual system: deep navy backgrounds, warm cream text/accent colors, subtle glows, and restrained motion. Treat [`docs/design-system.md`](docs/design-system.md) as the source of truth for palette, typography, animation, component hierarchy, and visual do/don'ts.
