## Current Feature

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
