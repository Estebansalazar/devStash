## Current Feature

Dashboard collections from the database

## Status

Not started

## Change Log

### 2026-11-27 — Feature documented

- Spec written in `Context/Features/dashboard-collections-spec.md`; feature added here, nothing implemented yet

### 2026-11-27 — Implemented on `feature/dashboard-collections`

- Added `src/lib/db/collections.ts`: `getRecentCollections(limit)` and `getCollectionStats()`, both scoped to the seeded demo user (`demo@devstash.io`) through a `DEMO_USER_EMAIL` constant, since there is no auth yet
- Collections are ordered by the last update of any item in them, falling back to the collection's own `updatedAt` when it has no items (Prisma cannot order by a related max, so the sort is done in JS after one query)
- `typeNamesByUsage()` counts the item types in a collection and returns them most-used first, so the card border is the most-used type and the icon row shows every type present; ties break alphabetically
- Unknown type names coming from the database are filtered out against `ITEM_TYPE_ICONS` instead of being cast, so no `any` and no crash on a custom type later
- `CollectionCard` now takes a single `collection: CollectionCardData` prop instead of `MockCollection` + a separate `typeNames` array; the markup and classes are unchanged
- New `RecentCollections` and `CollectionStatCards` server components, each with a skeleton fallback, plus an empty state on the collections grid
- `cacheComponents: true` makes database reads dynamic, so both are wrapped in `<Suspense>`; `/dashboard` now builds as `◐ Partial Prerender` (static shell, collections streamed in)
- Limit raised from 4 to 6 cards per the spec; the database has 5 collections, so all 5 show
- Stats cards: "Collections" and "Favorite collections" now come from the database; "Items" and "Favorite items" still read mock data, since items are a later feature
- The sidebar and `src/lib/collections.ts` still use mock data and are untouched
- Verified against the Neon dev branch: 5 collections, counts 4/4/4/3/3, DevOps gets the `link` border (link 2, command 1, snippet 1), stats show 5 collections and 0 favorites
- `tsc --noEmit`, `eslint` and `npm run build` all pass
- Not committed yet

### 2026-11-27 — Project history diagram updated

- `docs/project-history.excalidraw` refreshed for the seed and dashboard-collections work: 35 panels now, up from 33
- Two new timeline panels: "7 · Datos de ejemplo (el seed)" (merged `276cccf`) and "8 · Las colecciones, desde la base" marked `← ACÁ ESTAMOS`; panel 6 lost that marker and now records the `82ccf33` merge
- The map panel's "pieza desconectada" note is gone: `src/lib/prisma.ts` has its first importer, and mock-data is down to 4 importers (read from the repo, not written by hand)
- "Qué falta", "El viaje de un dato" (no longer hypothetical) and the verbatim prompts panel were updated; the three new prompts carry real timestamps from the Claude Code transcripts
- The generator script from the earlier session no longer exists in the repo, so the file was edited as JSON with a reflow pass that keeps the original gaps between panels; verified afterwards with no overlaps and no text spilling outside its panel
- `*.excalidraw` is gitignored, so this file stays local and is not part of the commit

## Goals

- Replace the mock collection data in the main area of the dashboard (right side) with real data from the Neon database through Prisma
- Keep the current look: the 6 recent collection cards, same design
- Create `src/lib/db/collections.ts` with the data fetching functions
- Fetch the collections directly in the server component (no API route, no Server Action)
- Collection card border color comes from the most-used content type in that collection
- Show small icons of all the types present in that collection
- Update the collection stats display
- Do not add the items underneath yet; that is a later feature

## Notes

- Spec: @Context/Features/dashboard-collections-spec.md
- Screenshot: @Context/Screenshots/Devdash-dark.png (the spec names `dashboard-ui-main.png` under `context/screenshots/`, which does not match the real paths; layout and design already exist, so the screenshot is only a reference)
- Data comes from the demo user's seeded collections (5 collections, 18 items) on the Neon **development** branch
- `src/lib/prisma.ts` exists but nothing imports it yet; this is the first place the dashboard reads from the database
- Only the main-area collections change; the sidebar, stats cards, pinned items and recent items still read `src/lib/mock-data.ts` unless the spec says otherwise ("Update collection stats display" is the one open point to settle while implementing)

-----

## Previous Feature

Seed sample data

## Status

Completed (2026-11-27) — merged to main (`276cccf`, from `feature/seed`)

## Change Log

### 2026-11-27 — Feature documented

- Spec written in `Context/Features/seed-spec.md`; feature added here, nothing implemented yet

### 2026-11-27 — Implemented on `feature/seed`

- Installed `bcryptjs` 3 (ships its own types, no `@types` package needed)
- Added `prisma/seed-data.ts` with the demo user, the 5 collections and their 18 items (real URLs for the 6 links), kept apart from the seed logic so `seed.ts` stays short
- `prisma/seed.ts` now seeds the system types, then upserts the demo user (password hashed with 12 rounds) and recreates the demo user's collections and items, linking each item through `ItemCollection`
- Idempotent: the demo user's items and collections are deleted and recreated on every run, so a second `npx prisma db seed` leaves the same counts
- Ran the seed twice on the Neon dev branch: 1 user, 7 types, 5 collections, 18 items, 18 collection links; the stored hash verifies against `12345678`
- `tsc --noEmit`, `eslint`, `npm run build` and `npm run db:test` all pass
- Not committed yet

### 2026-11-27 — Demo data checks in `scripts/test-db.ts`

- Two new sections in `npm run db:test`: "Demo user" (exists, `isPro` false, `emailVerified` set, password matches `12345678` with 12 bcrypt rounds) and "Demo collections" (5 collections with the item types per collection from the spec, each item printed with its type and URL)
- Expected counts are written from the spec, not imported from `prisma/seed-data.ts`, so the test catches a wrong seed instead of copying it
- The demo checks are skipped if the demo user is missing, and that counts as a failure
- All checks pass; the run also confirms `.env` points at the dev endpoint `ep-frosty-smoke-ben5c4d2`

### 2026-11-27 — Completed

- Merged to main (`276cccf`, from `feature/seed`)
- Done: demo user, 5 collections and 18 items seeded idempotently, plus demo data checks in `npm run db:test`
- Superseded as current feature by "Dashboard collections from the database"

## Goals

- Extend `prisma/seed.ts` to add a demo user, 5 collections and 18 items on top of the 7 system item types it already seeds
- Demo user: `demo@devstash.io`, name "Demo User", password `12345678` hashed with bcryptjs (12 rounds), `isPro: false`, `emailVerified` set to the seed date
- Collections and items, all owned by the demo user:
  - **React Patterns** ("Reusable React patterns and hooks"): 3 TypeScript snippets covering custom hooks (useDebounce, useLocalStorage), component patterns (context providers, compound components) and utility functions
  - **AI Workflows** ("AI prompts and workflow automations"): 3 prompts for code review, documentation generation and refactoring help
  - **DevOps** ("Infrastructure and deployment resources"): 1 snippet (Docker or CI/CD config), 1 command (deployment script) and 2 links to real documentation URLs
  - **Terminal Commands** ("Useful shell commands for everyday development"): 4 commands for git, Docker, process management and package managers
  - **Design Resources** ("UI/UX resources and references"): 4 links to real URLs for CSS/Tailwind references, component libraries, design systems and icon libraries
- Seed can be run more than once without creating duplicates

## Notes

- Spec: @Context/Features/seed-spec.md
- The system item types are already seeded by the existing `prisma/seed.ts`; keep that part and add the rest after it
- `bcryptjs` is not installed yet; it needs to be added as a dependency
- Items link to collections through the `ItemCollection` join table, and each item needs the right `contentType` (`TEXT` for snippets, prompts and commands, `URL` for links) plus `language` on snippets
- Run with `npx prisma db seed` against the Neon **development** branch only (on 25 Nov the production credentials ended up in `.env` by mistake, so check the host first)
- The dashboard still reads `src/lib/mock-data.ts`; switching it to the database is a separate feature

-----

## Previous Feature

Prisma + Neon PostgreSQL setup

## Status

In progress — schema and seed are live on the Neon dev branch

Completed (2026-11-27) — see the last Change Log entry

## Change Log

### 2026-11-25 — Setup written

- Prisma 7 installed (`prisma`, `@prisma/client`, `@prisma/adapter-pg`) with `tsx` for the seed
- `prisma.config.ts` (Prisma 7 style: schema, migrations path, seed command, datasource url)
- `prisma/schema.prisma` with all models, the NextAuth models, indexes and cascade deletes
- Generator `prisma-client` with output `src/generated/prisma` (Prisma 7 default, not `@prisma/client`)
- `src/lib/prisma.ts` singleton using the `PrismaPg` driver adapter
- `prisma/seed.ts` for the 7 system item types
- First migration generated: `prisma/migrations/20261125203211_init`
- `.env` is gitignored, `.env.example` is committed
- `build` and `postinstall` run `prisma generate`
- Migration was never applied and the seed never ran — see below

### 2026-11-27 — Blocked: Neon rejected the credentials

- `DATABASE_URL` failed with `28P01 password authentication failed for user 'neondb_owner'`
- Old endpoint: `ep-crimson-sound-be75c9k5-pooler.c-9.us-east-2.aws.neon.tech`
- Cause: the Neon development branch was deleted after about a day, so the endpoint and password no longer existed
- Diagnosis detail is kept in "Neon connection review" under Notes

### 2026-11-27 — Resolved: dev branch recreated

- New credentials in `.env`; new endpoint `ep-frosty-smoke-ben5c4d2` (confirms the branch was recreated, not just a password reset)
- Added `DIRECT_URL` support: `prisma.config.ts` now uses `process.env.DIRECT_URL ?? process.env.DATABASE_URL`, and `.env.example` documents both
- Applied the **existing** `20261125203211_init` migration — no new migration was created, the history stays single
- Seed ran: 7 system item types
- Verified: 11 tables in `public`, `prisma migrate status` says "Database schema is up to date!", `npm run build` passes
- Still to do: add `DIRECT_URL` permanently to `.env` (the unpooled host, same credentials without `-pooler`); it was only exported for the migration run

### 2026-11-27 — Database test script

- Added `scripts/test-db.ts`, run with `npx tsx scripts/test-db.ts`
- Loads env via `dotenv/config` (standalone script, so Next.js does not load `.env` for it) and connects with the `PrismaPg` adapter, same pattern as `prisma/seed.ts`
- Checks: connection and server version, `_prisma_migrations` rows all finished, the 7 system item types with valid hex colors, `count()` on every model, and a write round-trip covering relations and cascade deletes
- The write test runs inside a transaction that is always rolled back, so it leaves no rows in the dev database
- Exits with code 1 if any check fails, so it can be used in CI later
- All checks pass; `tsc --noEmit` and `eslint` are clean

### 2026-11-27 — Project history diagram

- Added `docs/project-history.excalidraw` (for humans, like the other diagrams in `docs/`)
- Timeline of every phase so far with the files each one produced, taken from `git log`, plus panels on the 10-step workflow and on why the schema lives in Prisma instead of being clicked into the Neon console
- The "prompts" shown are reconstructed from the Goals in this file, the specs and the commit messages — earlier sessions' prompts are not stored in the repo, and the diagram says so
- Expanded the same day after review: 16 panels instead of 11, in two columns
- Added: a map of which file calls which when `/dashboard` loads, the data model (9 models to 11 tables, 7 cascades, 1 SetNull, the indexes), the stack with real installed versions, the non-obvious technical decisions, the 27 Nov incident layer by layer, and what is still missing
- Flagged in the map that `src/lib/prisma.ts` is not imported anywhere yet, while `src/lib/mock-data.ts` is imported by 5 files — that gap is the next piece of work
- The whole file is generated by a script from `git log`, `find src`, `package.json` and `schema.prisma`, so the numbers are read from the repo rather than written by hand
- Expanded again on request: 20 panels. Added the monetisation plan (nothing of it implemented), the visual rules, and a worked example of Dashboard Phase 2 going through all 10 workflow steps
- Correction: earlier sessions' prompts ARE recoverable — Claude Code stores them in `~/.claude/projects/<project>/*.jsonl`. 5 sessions, 57 user messages since 25 Nov. The diagram now quotes them verbatim with timestamps instead of paraphrasing, and the note panel says so
- Recovered from those transcripts an incident that was not recorded anywhere: on 25 Nov the credentials pasted into `.env` were the PRODUCTION branch, not development. The init migration was first applied to the wrong branch and re-run against development the same day
- `*.excalidraw` added to `.gitignore` at the user's request, so the diagrams are local-only. Note `docs/ai-workflow.excalidraw` was already tracked, so gitignore does not untrack it — it still needs `git rm --cached` if that is wanted, and `Context/ai-interaction.md` links to it
- Reworked to teach rather than just record: 26 panels, ~4,450 words. Added a glossary (leading with the git-branch vs Neon-branch confusion), a line-by-line reading of a `schema.prisma` model, a command cheatsheet with what each one does and when, eight traps with the reason each one bites, how to read the common database errors, and the path a row will take from Postgres to the screen once Prisma replaces the mock data
- Commands were verified against `npx prisma --help` before being documented; `prisma studio` is called out as the answer to the 25 Nov question about not seeing seeded data
- The client/server split is listed from the actual 6 files carrying `'use client'`
- Rewritten again for a reader with no programming background: a third column, "DESDE CERO", with 7 panels explaining the fundamentals behind everything else in the diagram, each term tied to where it appears in this project and most carrying an everyday analogy
- Covers: computer vs server, package/npm/node_modules, what a database is (table, row, column, primary key, foreign key, 1:N and N:M, index, cascade, SQL), the Prisma vocabulary (ORM, schema, migration, seed, client, adapter), the 4 layers of a connection (DNS, TCP port, TLS, auth) mapped onto the 27 Nov failure, git (commit, branch, merge, PR, push, tracked), React/Next (component, props, state, server vs client, folder routing, TypeScript, Tailwind, shadcn), and dev vs prod with why secrets live in `.env`
- Now 33 panels, ~6,600 words, 3540 x 9300 px, in three columns

### 2026-11-27 — Completed

- Merged to main (`82ccf33`, from `feature/database`)
- Done: Prisma 7 with the `PrismaPg` adapter, full schema including the NextAuth models, indexes and cascade deletes, the `init` migration applied to the Neon dev branch, the 7 system item types seeded, `DIRECT_URL` support for migrations, and `scripts/test-db.ts` (`npm run db:test`)
- Left open: `DIRECT_URL` is still not saved permanently in `.env`
- Superseded as current feature by "Seed sample data"

## Goals

- Set up Prisma 7 ORM with Neon PostgreSQL (serverless)
- Create the initial schema from the data models in project-overview.md (it will evolve)
- Include the NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Create the first migration with `prisma migrate dev` (never `db push`)

## Notes

- Spec: @Context/Features/database-spec.md
- Data models: @Context/project-overview.md; database standards: @Context/coding-standards.md
- Prisma 7 has breaking changes: read the upgrade guide (https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7) and the quickstart (https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres) before writing code
- Development branch of the Neon database goes in DATABASE_URL; production is a separate branch. Always create migrations, never push directly unless specified

### Neon connection review (2026-11-27, resolved)

Kept as a record of how the outage was diagnosed. Checked in order:

- DNS for `ep-crimson-sound-be75c9k5-pooler.c-9.us-east-2.aws.neon.tech` resolves, TCP 5432 accepts connections, TLS completes — so it is not a network or firewall problem
- The server rejects the login: `28P01 password authentication failed for user 'neondb_owner'`
- The URL itself is well formed: `sslmode=require&channel_binding=require`, password is a clean `npg_` token with no characters needing URL-encoding and no stray whitespace
- `prisma migrate status` reports this as `P1001 Can't reach database server`, which is misleading — the server is reachable, the credentials are stale

Root cause: Neon deleted the development branch after about a day, so both the endpoint host and the password changed. Fixed by pasting a fresh connection string from the Neon console and applying the existing migration.

Lesson for next time: if the dev branch disappears again, the fix is **not** a new migration. Point `.env` at the new branch and run `npx prisma migrate dev` (it applies the pending migration to the empty database) followed by `npx prisma db seed`. A `P1001 Can't reach database server` from Prisma can really be an auth failure — test with a plain `pg` client to see the true error code.

### Pooled vs direct endpoint

`DATABASE_URL` points at the **pooled** endpoint (`-pooler` in the host), which is right for the app at runtime. Migrations must use the direct/unpooled endpoint, because PgBouncer breaks the advisory locks and prepared statements that `prisma migrate` relies on.

Done: `prisma.config.ts` reads `DIRECT_URL ?? DATABASE_URL` and `.env.example` documents both. The unpooled host is the same host without `-pooler`, with the same credentials.

-----

## Previous Feature

Dashboard UI Phase 3: main area

## Status

Completed
- 4 stats cards (items, collections, favorite items, favorite collections)
- Recent collections, pinned items and 10 recent items in the main area
- Theme toggle (sun/moon) in the top bar, dark by default and remembered
- 4 extra mock items to fill the 10 recent items
- Recent collections logic shared between sidebar and dashboard

## Goals

- 4 stats cards at the top: items, collections, favorite items, favorite collections (not in screenshot)
- Recent collections
- Pinned items
- 10 recent items
- Theme toggle (sun/moon icon) in the top bar for dark/light theme, dark by default

## Notes

- Spec: @Context/Features/dashboard-phase-3-spec.md
- Screenshot: @Context/Screenshots/Devdash-dark.png
- Use data from @src/lib/mock-data.ts (import directly until the database is implemented)
- Mock data only has 6 items, so 4 more are added to fill the 10 recent items
- Phase 3 of 3; see also @Context/Features/dashboard-phase-1-spec.md and @Context/Features/dashboard-phase-2-spec.md

-----

## Previous Feature

Dashboard UI Phase 2: collapsible sidebar

## Status

Completed
- shadcn sheet and avatar components added
- Collapsible sidebar (full width / icon-only) toggled from the top bar drawer icon
- Types list linking to /items/TYPE with colored icons, counts and PRO badges
- Favorite collections and recent collections (ordered by latest item update)
- User avatar area at the bottom (initials fallback, Free badge, workspace)
- Always a drawer below 1024px, closing on navigation
- Data imported directly from mock data

## Goals

- Collapsible sidebar
- Items/types with links to /items/TYPE (e.g. /items/snippets)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Drawer icon to open/close the sidebar
- Always a drawer on mobile view

## Notes

- Spec: @Context/Features/dashboard-phase-2-spec.md

-----

## History

- Initial Next.js setup (Create Next App, Tailwind v4, boilerplate removed)
- Dashboard UI Phase 1 (completed): ShadCN set up, /dashboard route in dark mode with the exact screenshot colors, top bar with search and New Item button, sidebar placeholder, and example collections and recent items from mock data
- Dashboard UI Phase 2 (completed): collapsible sidebar with item type links, favorite and recent collections, user avatar area, and a drawer on mobile
- Dashboard UI Phase 3 (completed): stats cards, recent collections, pinned items, 10 recent items and a dark/light theme toggle
- Prisma + Neon PostgreSQL setup (completed): Prisma 7 with the pg adapter, full schema with NextAuth models, init migration on the Neon dev branch, 7 system item types seeded and a database test script
- Seed sample data (completed): demo user, 5 collections and 18 items seeded idempotently with bcryptjs, plus demo data checks in the database test script
