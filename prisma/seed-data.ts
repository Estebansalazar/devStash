import type { ContentType } from "../src/generated/prisma/client";

export interface SeedItem {
  title: string;
  type: "snippet" | "prompt" | "command" | "link";
  contentType: ContentType;
  description: string;
  content?: string;
  url?: string;
  language?: string;
}

export interface SeedCollection {
  name: string;
  description: string;
  items: SeedItem[];
}

export const DEMO_USER = {
  email: "demo@devstash.io",
  name: "Demo User",
  password: "12345678",
};

export const BCRYPT_ROUNDS = 12;

const REACT_PATTERNS: SeedCollection = {
  name: "React Patterns",
  description: "Reusable React patterns and hooks",
  items: [
    {
      title: "useDebounce and useLocalStorage hooks",
      type: "snippet",
      contentType: "TEXT",
      language: "typescript",
      description: "Debounce a changing value and persist state in localStorage",
      content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    },
    {
      title: "Context provider with compound components",
      type: "snippet",
      contentType: "TEXT",
      language: "typescript",
      description: "Tabs built as compound components sharing state through context",
      content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>");
  return context;
}

export function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

Tabs.Trigger = function TabsTrigger({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useTabs();
  return (
    <button aria-selected={active === id} onClick={() => setActive(id)}>
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useTabs();
  return active === id ? <div>{children}</div> : null;
};`,
    },
    {
      title: "Utility functions: cn, formatDate, sleep",
      type: "snippet",
      contentType: "TEXT",
      language: "typescript",
      description: "Small helpers used across React components",
      content: `export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(date);
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}`,
    },
  ],
};

const AI_WORKFLOWS: SeedCollection = {
  name: "AI Workflows",
  description: "AI prompts and workflow automations",
  items: [
    {
      title: "Code review prompt",
      type: "prompt",
      contentType: "TEXT",
      description: "Ask for a focused review of a diff",
      content: `Review the following code change as a senior engineer.

Focus on, in this order:
1. Bugs and logic errors, including edge cases
2. Security issues (input validation, auth checks, secrets)
3. Performance problems (N+1 queries, unnecessary re-renders)
4. Readability and consistency with the existing code

For each issue give the file and line, why it is a problem, and a suggested fix.
Skip style nitpicks that a linter would catch.

<diff>
{{diff}}
</diff>`,
    },
    {
      title: "Documentation generator",
      type: "prompt",
      contentType: "TEXT",
      description: "Generate docs for a module from its source",
      content: `Write developer documentation for the module below.

Include:
- A one-paragraph overview of what it does and when to use it
- Every exported function or component with its parameters, return value and an example
- Any side effects, thrown errors or required environment variables

Write in Markdown. Keep examples short and runnable.

<code>
{{code}}
</code>`,
    },
    {
      title: "Refactoring assistant",
      type: "prompt",
      contentType: "TEXT",
      description: "Refactor code without changing its behavior",
      content: `Refactor the code below to improve readability and maintainability.

Rules:
- Do not change behavior or public interfaces
- Prefer small, named functions over long ones
- Remove duplication and dead code
- Keep the existing naming conventions

First list the changes you plan to make and why, then show the refactored code.

<code>
{{code}}
</code>`,
    },
  ],
};

const DEVOPS: SeedCollection = {
  name: "DevOps",
  description: "Infrastructure and deployment resources",
  items: [
    {
      title: "Next.js multi-stage Dockerfile",
      type: "snippet",
      contentType: "TEXT",
      language: "dockerfile",
      description: "Small production image for a Next.js app with standalone output",
      content: `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    {
      title: "Deploy with migrations",
      type: "command",
      contentType: "TEXT",
      language: "bash",
      description: "Apply pending Prisma migrations, then build and start",
      content: "npx prisma migrate deploy && npm run build && npm run start",
    },
    {
      title: "Docker documentation",
      type: "link",
      contentType: "URL",
      description: "Official Docker docs: Dockerfiles, Compose and build reference",
      url: "https://docs.docker.com/",
    },
    {
      title: "GitHub Actions documentation",
      type: "link",
      contentType: "URL",
      description: "Workflows, runners and CI/CD with GitHub Actions",
      url: "https://docs.github.com/en/actions",
    },
  ],
};

const TERMINAL_COMMANDS: SeedCollection = {
  name: "Terminal Commands",
  description: "Useful shell commands for everyday development",
  items: [
    {
      title: "Undo the last commit but keep the changes",
      type: "command",
      contentType: "TEXT",
      language: "bash",
      description: "Moves HEAD back one commit and leaves the changes staged",
      content: "git reset --soft HEAD~1",
    },
    {
      title: "Remove stopped containers and unused images",
      type: "command",
      contentType: "TEXT",
      language: "bash",
      description: "Frees disk space used by Docker",
      content: "docker system prune -a",
    },
    {
      title: "Find and kill the process on a port",
      type: "command",
      contentType: "TEXT",
      language: "bash",
      description: "Useful when port 3000 is already in use",
      content: "lsof -ti :3000 | xargs kill -9",
    },
    {
      title: "List outdated npm packages",
      type: "command",
      contentType: "TEXT",
      language: "bash",
      description: "Shows current, wanted and latest versions of each dependency",
      content: "npm outdated",
    },
  ],
};

const DESIGN_RESOURCES: SeedCollection = {
  name: "Design Resources",
  description: "UI/UX resources and references",
  items: [
    {
      title: "Tailwind CSS documentation",
      type: "link",
      contentType: "URL",
      description: "Utility classes and theme configuration reference",
      url: "https://tailwindcss.com/docs",
    },
    {
      title: "shadcn/ui",
      type: "link",
      contentType: "URL",
      description: "Accessible components built on Radix and Tailwind",
      url: "https://ui.shadcn.com",
    },
    {
      title: "Material Design 3",
      type: "link",
      contentType: "URL",
      description: "Google's design system: foundations, styles and components",
      url: "https://m3.material.io",
    },
    {
      title: "Lucide icons",
      type: "link",
      contentType: "URL",
      description: "Open source icon library used by DevStash",
      url: "https://lucide.dev/icons",
    },
  ],
};

export const SEED_COLLECTIONS: SeedCollection[] = [
  REACT_PATTERNS,
  AI_WORKFLOWS,
  DEVOPS,
  TERMINAL_COMMANDS,
  DESIGN_RESOURCES,
];
