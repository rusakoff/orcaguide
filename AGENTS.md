# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 documentation site built with Fumadocs and TypeScript. Application routes live in `app/`; the landing page is `app/(home)/page.tsx` and documentation routes are under `app/docs/`. Shared UI and source configuration live in `components/`, `lib/`, and `source.config.ts`.

MDX content is the primary product. The introductory page lives at `content/docs/chto-takoe-orca.mdx`. Other official upstream pages live directly in these generated sections under `content/docs/`: `agents`, `browser`, `cli`, `editing`, `model`, `recipes`, `reference`, and `review`. There is no separate `content/docs/original/` directory. Each section's navigation order lives in its adjacent `meta.json`.

Refresh the upstream corpus with `scripts/import-orca-docs.mjs`. Keep hand-written local material in `content/docs/community/`; the importer preserves that directory and `content/docs/index.mdx`. Global styling is in `app/global.css`; static files, if added, belong in `public/`.

## Build, Test, and Development Commands

- `npm run dev` — start the local Next.js server.
- `npm run build` — create a production build; run this before handing off route or MDX changes.
- `npm run start` — serve a completed production build.
- `npm run types:check` — generate Fumadocs types and run TypeScript checks.
- `npm run lint` — check formatting and style with Biome.
- `npm run format` — apply Biome formatting to the repository.
- `npm run import:orca` — replace the generated thematic sections with the current public Orca documentation.

There is no automated test suite yet. For content or routing changes, run `npm run types:check` and `npm run build`, then check the affected page at `http://localhost:3000/docs/...`.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow Biome's configured formatting (`biome.json`): do not hand-format around its output. Name React components in `PascalCase`; use `camelCase` for variables and functions. Use lowercase, hyphen-separated MDX filenames such as `first-session.mdx`, and keep frontmatter titles clear and user-facing. Preserve source links and translation-status notices on imported or translated articles.

## Content Import and Configuration

Do not make irreplaceable edits inside generated upstream sections: the next `npm run import:orca` removes and recreates them. Make repeatable import changes in `scripts/import-orca-docs.mjs`, and put persistent local articles in `content/docs/community/`.

The importer also regenerates `content/docs/meta.json` and every generated section's `meta.json`. When moving or removing imported pages, update links from `content/docs/index.mdx`, `app/(home)/page.tsx`, and any affected MDX pages. Preserve source links and translation-status notices. Keep secrets out of MDX, source files, and commits; configure external images through `next.config.mjs` only when needed.

## Commit & Pull Request Guidelines

Git history currently contains only `Initial commit`, so no repository-specific convention exists. Use short, imperative commit subjects, for example `Add Russian install guide` or `Fix external documentation images`. Pull requests should describe the user-visible change, list verification commands, link related issues when available, and include screenshots for visual layout changes.
