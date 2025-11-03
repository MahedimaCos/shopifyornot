# Repository Guidelines

## Project Structure & Module Organization

-   Core UI lives in `app/`; `page.tsx` drives the landing flow and `page.module.css` plus `globals.css` supply scoped and global styles.
-   Shopify detection logic stays in the Edge route `app/api/check/route.ts`, the single touchpoint with external services.
-   Configuration sits in `next.config.ts`, `tsconfig.json`, and `eslint.config.mjs`. Static assets belong in `public/`; `.next/` holds build output.
-   Consult `UI_DESIGN.md` and `PROJECT_DESC.md` before reshaping UkwX copy or layout.

## Build, Test, and Development Commands

-   `npm run dev` launches the Next.js dev server (http://localhost:3000) with hot module reload.
-   `npm run build` compiles an optimized production bundle into `.next/`.
-   `npm start` serves the production build; run `npm run build` first.- `npm run lint` applies ESLint (Next Core Web Vitals + TypeScript rules) across the workspace; add `-- --fix` to auto-resolve safe issues.

## Coding Style & Naming Conventions

-   Use TypeScript functional components and hooks; keep route filenames lowercase (`app/<segment>/page.tsx`) while exporting components in PascalCase.
-   Keep variables camelCase, React components PascalCase, and CSS module classes descriptive (`statusRow`, `infoBlock`).
-   Stick with two-space indentation, trailing commas, and double quotes to match existing formatting. Run `npm run lint` before committing.

## Testing Guidelines

-   No automated tests exist yet; introduce Jest + React Testing Library (or similar) along with any new feature.
-   Co-locate specs as `*.test.ts(x)` or group them in a mirrored `__tests__/` directory.
-   Once a test script is added, standardize on `npm run test`, run it locally, and mention manual QA in the PR body.

## Commit & Pull Request Guidelines

-   Favor Conventional Commit prefixes (`feat`, `fix`, `chore`, `docs`) with succinct imperatives (`feat: add confidence badge tooltip`). Include a scope only when it clarifies the affected segment.
-   In PRs, link issues, add a short change summary, capture UI screenshots when visual changes occur, and outline API impacts.
-   Verify `npm run build` and `npm run lint` succeed, then record the results in the PR checklist for reviewers.

## Security & Configuration Tips

-   The Edge API route calls `https://dev-api.makemypass.com`; guard sensitive diagnostics and prefer `process.env` variables defined in `.env.local` for future secrets.
-   Do not commit `.env*` files. Document new configuration keys in the PR and mirror them in README updates.
