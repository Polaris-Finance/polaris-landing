# Repository Guidelines

## Project Structure & Module Organization
The Next.js App Router lives in `app/`; route files such as `app/page.tsx` own UI logic, while shared styling sits in `app/globals.css`. Utility helpers belong in `lib/` (for example `lib/utils.ts` with the `cn` class merger). Static assets, favicons, and open graph images should be stored in `public/`. Configuration files at the root—`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `components.json`—define runtime, TypeScript, linting, and shadcn component settings, so update them in tandem with cross-cutting changes.

## Build, Test, and Development Commands
- `npm run dev` (or `bun dev`) launches the Turbopack dev server on http://localhost:3000 with hot reload.
- `npm run build` compiles the production bundle using Turbopack; run before deploying.
- `npm start` serves the build output locally for smoke testing.
- `npm run lint` executes ESLint with the repo configuration; use it before every commit.

## Coding Style & Naming Conventions
Write TypeScript-first React components with 2-space indentation and avoid default exports except for routed `page.tsx` files. Name component files in PascalCase when extracted (e.g., `HeroCard.tsx`) and colocate tailwind-heavy fragments with their host component. Prefer Tailwind utility classes; when they become unwieldy, extract variants via `lib/utils.ts:cn`. Keep imports sorted: framework first, then third-party, then local paths.

## Testing Guidelines
Automated tests are not yet wired in. When adding them, scaffold a `tests/` or `app/__tests__/` directory and use `@testing-library/react` with `vitest` or `jest` to cover UI states. At minimum, document manual verification steps in the PR, and ensure any new helpers include TypeScript unit coverage once the testing stack lands. Aim for smoke coverage of primary routes and critical rendering branches.

## Commit & Pull Request Guidelines
Commit messages should follow a concise `type: summary` pattern (`feat: add shimmer hero animation`, `fix: guard responsive breakpoints`). Reference related issues in the body when applicable. Pull requests need: a clear summary of intent, screenshots or recordings for UI changes, manual test notes, and a checklist of follow-up tasks. Keep PRs scoped to a single feature or fix, and confirm `npm run lint` (and future tests) pass before requesting review.

## Environment & Configuration Tips
Secrets such as API keys belong in `.env.local`, never in Git. When introducing a new environment variable, update `next.config.ts` to expose it safely and document the expected shape in the PR. Tailwind tokens are defined via PostCSS (`postcss.config.mjs`) and `components.json`; update both when adding design system primitives.
