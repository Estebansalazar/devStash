import { Plus, Search } from "lucide-react";

import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

export function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b px-6">
      <div className="flex items-center gap-3">
        <SidebarToggle />
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Workspace</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Dashboard</span>
        </nav>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything in your stash..."
            className="pr-12 pl-9"
          />
          <Kbd className="absolute top-1/2 right-2 -translate-y-1/2">⌘K</Kbd>
        </div>
        <Button>
          <Plus />
          New Item
        </Button>
      </div>
    </header>
  );
}
