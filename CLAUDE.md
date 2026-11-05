# first nextjs APP
Developer knowledge hub for snippets, commands, prompts, notes, files, images, likes and custom types.


## Context Files
read the following to get the full context of the project
- @Context/project-overview.md
- @Context/coding-standards.md
- @Context/ai-interaction.md
- @Context/current-feature.md

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`; no auto-fix flag baked in)
- No test runner is configured.

## Next.js version caveat

This is Next.js 16.4.4 with React 19.3 and has breaking changes versus older Next.js. Per `AGENTS.md`, read the relevant guide in `node_modules/next/dist/docs/` (e.g. `01-app/03-api-reference/03-file-conventions/`) before writing code, and heed deprecation notices.

## Architecture

- App Router only, under `src/app/` (`@/*` maps to `src/*`). `layout.tsx` is the root layout (uses `LayoutProps<"/">` global type and loads Geist fonts via `next/font/google`); `page.tsx` is the home route.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, which change caching/prefetch behavior, so check the docs before using data fetching or dynamic APIs.
- Tailwind v4 is wired through Turbopack, not PostCSS: `next.config.ts` routes `*.css` through `@tailwindcss/turbopack`, and `src/app/globals.css` contains just `@import "tailwindcss";`. There is no `tailwind.config` file.
- `layout.tsx` still sets up the Geist font CSS variables and the default "Create Next App" metadata, but `globals.css` no longer maps them to Tailwind theme fonts.





