export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
  workspace: string;
}

export interface MockItemType {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  isPro: boolean;
  count: number;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  itemCount: number;
  typeIds: string[];
  defaultTypeId: string | null;
}

export interface MockItem {
  id: string;
  title: string;
  itemTypeId: string;
  contentType: "TEXT" | "FILE" | "URL";
  content: string | null;
  url: string | null;
  description: string | null;
  language: string | null;
  tags: string[];
  collectionIds: string[];
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export const currentUser: MockUser = {
  id: "user-1",
  name: "Alex Morgan",
  email: "alex@example.com",
  image: null,
  isPro: false,
  workspace: "Personal workspace",
};

export const itemTypes: MockItemType[] = [
  { id: "type-snippet", name: "snippet", label: "Snippets", icon: "Code", color: "#3b82f6", isPro: false, count: 48 },
  { id: "type-prompt", name: "prompt", label: "Prompts", icon: "Sparkles", color: "#8b5cf6", isPro: false, count: 24 },
  { id: "type-command", name: "command", label: "Commands", icon: "Terminal", color: "#f97316", isPro: false, count: 16 },
  { id: "type-note", name: "note", label: "Notes", icon: "StickyNote", color: "#fde047", isPro: false, count: 32 },
  { id: "type-link", name: "link", label: "Links", icon: "Link", color: "#10b981", isPro: false, count: 19 },
  { id: "type-file", name: "file", label: "Files", icon: "File", color: "#6b7280", isPro: true, count: 8 },
  { id: "type-image", name: "image", label: "Images", icon: "Image", color: "#ec4899", isPro: true, count: 12 },
];

export const collections: MockCollection[] = [
  {
    id: "col-react",
    name: "React Patterns",
    description: "Hooks, components & good ideas",
    isFavorite: true,
    itemCount: 24,
    typeIds: ["type-snippet", "type-link"],
    defaultTypeId: "type-snippet",
  },
  {
    id: "col-python",
    name: "Python Snippets",
    description: "Small scripts. Big time savers.",
    isFavorite: false,
    itemCount: 18,
    typeIds: ["type-snippet", "type-command"],
    defaultTypeId: "type-snippet",
  },
  {
    id: "col-context",
    name: "Context Files",
    description: "Give your AI a head start.",
    isFavorite: false,
    itemCount: 8,
    typeIds: ["type-file"],
    defaultTypeId: "type-file",
  },
  {
    id: "col-interview",
    name: "Interview Prep",
    description: "Questions, notes and reminders.",
    isFavorite: false,
    itemCount: 12,
    typeIds: ["type-note", "type-snippet", "type-prompt"],
    defaultTypeId: null,
  },
];

export const items: MockItem[] = [
  {
    id: "item-1",
    title: "useDebounce hook",
    itemTypeId: "type-snippet",
    contentType: "TEXT",
    content: `import { useEffect, useState } from 'react';

export function useDebounce<T>(
  value: T,
  delay = 300,
): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    url: null,
    description: "Delay updating a value until the user stops typing. A tiny hook for search inputs and API calls.",
    language: "typescript",
    tags: ["react", "typescript"],
    collectionIds: ["col-react", "col-interview"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2026-11-21T10:00:00Z",
    updatedAt: "2026-11-25T08:00:00Z",
  },
  {
    id: "item-2",
    title: "Code review system prompt",
    itemTypeId: "type-prompt",
    contentType: "TEXT",
    content: "You are a senior engineer. Review the following code for correctness, readability, and edge cases.",
    url: null,
    description: "Reusable reviewer persona.",
    language: null,
    tags: ["ai", "workflow"],
    collectionIds: ["col-interview"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-11-20T09:00:00Z",
    updatedAt: "2026-11-25T05:00:00Z",
  },
  {
    id: "item-3",
    title: "git rebase interactive",
    itemTypeId: "type-command",
    contentType: "TEXT",
    content: "git rebase -i HEAD~5",
    url: null,
    description: "Squash, reword and reorder recent commits.",
    language: "bash",
    tags: ["git", "terminal"],
    collectionIds: ["col-python"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-11-18T12:00:00Z",
    updatedAt: "2026-11-24T10:00:00Z",
  },
  {
    id: "item-4",
    title: "Prisma client singleton",
    itemTypeId: "type-snippet",
    contentType: "TEXT",
    content: `const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();`,
    url: null,
    description: "Avoid multiple Prisma clients in dev.",
    language: "typescript",
    tags: ["prisma", "database"],
    collectionIds: ["col-react"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-11-19T15:00:00Z",
    updatedAt: "2026-11-25T08:00:00Z",
  },
  {
    id: "item-5",
    title: "Next.js App Router docs",
    itemTypeId: "type-link",
    contentType: "URL",
    content: null,
    url: "https://nextjs.org/docs/app",
    description: "Routing, rendering & data fetching.",
    language: null,
    tags: ["nextjs", "reference"],
    collectionIds: ["col-react"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2026-11-17T11:00:00Z",
    updatedAt: "2026-11-25T06:00:00Z",
  },
  {
    id: "item-6",
    title: "API design checklist",
    itemTypeId: "type-note",
    contentType: "TEXT",
    content: "Consistent resource names. Cursor-based pagination. Useful errors, every time.",
    url: null,
    description: null,
    language: null,
    tags: ["api", "architecture"],
    collectionIds: ["col-interview"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-11-16T08:00:00Z",
    updatedAt: "2026-11-24T09:00:00Z",
  },
  {
    id: "item-7",
    title: "Python virtualenv setup",
    itemTypeId: "type-command",
    contentType: "TEXT",
    content: "python -m venv .venv && source .venv/bin/activate",
    url: null,
    description: "Fresh isolated environment.",
    language: "bash",
    tags: ["python", "terminal"],
    collectionIds: ["col-python"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-11-15T09:00:00Z",
    updatedAt: "2026-11-23T18:00:00Z",
  },
  {
    id: "item-8",
    title: "Tailwind v4 migration guide",
    itemTypeId: "type-link",
    contentType: "URL",
    content: null,
    url: "https://tailwindcss.com/docs/upgrade-guide",
    description: "Everything that changed in v4.",
    language: null,
    tags: ["tailwind", "css"],
    collectionIds: ["col-react"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-11-14T10:00:00Z",
    updatedAt: "2026-11-23T12:00:00Z",
  },
  {
    id: "item-9",
    title: "Behavioral interview answers",
    itemTypeId: "type-note",
    contentType: "TEXT",
    content: "Use the STAR format: Situation, Task, Action, Result. Keep each story under two minutes.",
    url: null,
    description: null,
    language: null,
    tags: ["interview", "career"],
    collectionIds: ["col-interview"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-11-13T14:00:00Z",
    updatedAt: "2026-11-22T16:00:00Z",
  },
  {
    id: "item-10",
    title: "Python dict merge",
    itemTypeId: "type-snippet",
    contentType: "TEXT",
    content: "merged = {**defaults, **overrides}",
    url: null,
    description: "Merge dictionaries, last one wins.",
    language: "python",
    tags: ["python"],
    collectionIds: ["col-python"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-11-12T08:00:00Z",
    updatedAt: "2026-11-22T09:00:00Z",
  },
];
