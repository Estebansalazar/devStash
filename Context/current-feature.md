## Current Feature

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
- Screenshot: @Context/Screenshots/Devdash-dark.png
- Use data from @src/lib/mock-data.ts (import directly until the database is implemented)
- Phase 2 of 3; see also @Context/Features/dashboard-phase-1-spec.md and @Context/Features/dashboard-phase-3-spec.md

-----

## Previous Feature

Dashboard UI Phase 1: base layout at /dashboard

## Status

Completed
- ShadCN UI set up (button, input, kbd)
- /dashboard route created with dark mode by default
- Exact colors from the screenshot applied to the dark theme
- Top bar with breadcrumb, search (⌘K) and New Item button (display only)
- "Sidebar" placeholder
- Main area with example data from mock data: 4 collection cards and 3 recent item cards

## Goals

- Set up ShadCN UI
- Create /dashboard route with dark mode by default
- Use the exact colors from the screenshot
- Top bar with search and New Item button (display only)
- "Sidebar" placeholder
- Main area with example data from mock data (collections + 3 recent items)

## Notes

- Spec: @Context/Features/dashboard-phase-1-spec.md

-----

## History

- Initial Next.js setup (Create Next App, Tailwind v4, boilerplate removed)
- Dashboard UI Phase 1 (completed): ShadCN set up, /dashboard route in dark mode with the exact screenshot colors, top bar with search and New Item button, sidebar placeholder, and example collections and recent items from mock data
- Dashboard UI Phase 2 (completed): collapsible sidebar with item type links, favorite and recent collections, user avatar area, and a drawer on mobile
