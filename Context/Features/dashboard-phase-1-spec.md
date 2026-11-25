# Dashboard UI Phase 1 Spec

## Overview

This is phase 1 of 3 for the dashboard UI layout. Use the screenshot referenced below for how it should look.

## Requirements for phase 1

- ShadCN UI initialization and components
- ShadCN component installation
- Dashboard route at /dashboard
- Main dashboard layout and any global styles
- Dark mode by default
- Top bar with search and new item button (display only)
- Placeholder for sidebar. Just add an h2 with "Sidebar" for now.
- Main area with a couple of example data from the mock data file: collection cards and 3 recent item cards
- Use the exact colors from the screenshot (see below)

## Colors (dark mode, taken from the screenshot)

| Token                  | Hex       | Used for                          |
| ---------------------- | --------- | --------------------------------- |
| `--background`         | `#0c0d10` | Main area and top bar             |
| `--sidebar`            | `#101117` | Sidebar                           |
| `--card`               | `#171920` | Item cards                        |
| `--popover`            | `#131419` | Drawer                            |
| `--border`             | `#242830` | Borders and dividers              |
| `--input`              | `#15161b` | Search input                      |
| `--primary`            | `#6e64ed` | New Item / Save buttons, progress |
| `--secondary`/`--muted`| `#232730` | Tags and badges                   |
| `--accent`             | `#242136` | Active sidebar item               |
| `--foreground`         | `#edeef5` | Main text                         |
| `--muted-foreground`   | `#858c99` | Secondary text                    |

Item type colors come from the project overview (snippet `#3b82f6`, prompt `#8b5cf6`, command `#f97316`, note `#fde047`, file `#6b7280`, image `#ec4899`, link `#10b981`).

## References

- @Context/Screenshots/Devdash-dark.png
- @Context/project-overview.md
- @src/lib/mock-data.ts
- @Context/Features/dashboard-phase-2-spec.md
- @Context/Features/dashboard-phase-3-spec.md