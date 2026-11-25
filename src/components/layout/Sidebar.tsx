"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Folder, Settings, Terminal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/components/layout/SidebarProvider";
import {
  ITEM_TYPE_ICONS,
  ITEM_TYPE_STYLES,
  type ItemTypeName,
} from "@/lib/constants/item-types";
import { getRecentCollections } from "@/lib/collections";
import { collections, currentUser, itemTypes } from "@/lib/mock-data";
import type { MockCollection } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const RECENT_COLLECTIONS_LIMIT = 4;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface SidebarSectionProps {
  title: string;
  collapsed: boolean;
  children: React.ReactNode;
}

function SidebarSection({ title, collapsed, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {!collapsed && (
        <h3 className="px-3 py-1 text-xs font-medium text-muted-foreground">{title}</h3>
      )}
      {children}
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  collapsed: boolean;
  active: boolean;
  onNavigate: () => void;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
}

function SidebarLink({
  href,
  label,
  collapsed,
  active,
  onNavigate,
  icon,
  trailing,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      title={label}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      {icon}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{label}</span>
          {trailing}
        </>
      )}
    </Link>
  );
}

interface SidebarContentProps {
  collapsed: boolean;
  onNavigate: () => void;
}

function SidebarContent({ collapsed, onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const favoriteCollections = collections.filter((collection) => collection.isFavorite);
  const recentCollections = getRecentCollections(RECENT_COLLECTIONS_LIMIT);

  const renderCollection = (collection: MockCollection) => (
    <SidebarLink
      key={collection.id}
      href={`/collections/${collection.id}`}
      label={collection.name}
      collapsed={collapsed}
      active={pathname === `/collections/${collection.id}`}
      onNavigate={onNavigate}
      icon={<Folder className="size-4 shrink-0" />}
    />
  );

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-3">
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className={cn("flex items-center gap-3 px-2 py-1", collapsed && "justify-center px-0")}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Terminal className="size-4" />
        </span>
        {!collapsed && <span className="text-lg font-semibold">DevStash</span>}
      </Link>

      <nav className="flex flex-1 flex-col gap-6">
        <SidebarSection title="Types" collapsed={collapsed}>
          {itemTypes.map((type) => {
            const href = `/items/${type.label.toLowerCase()}`;
            const typeName = type.name as ItemTypeName;
            const Icon = ITEM_TYPE_ICONS[typeName];
            return (
              <SidebarLink
                key={type.id}
                href={href}
                label={type.label}
                collapsed={collapsed}
                active={pathname === href}
                onNavigate={onNavigate}
                icon={<Icon className={cn("size-4 shrink-0", ITEM_TYPE_STYLES[typeName].text)} />}
                trailing={
                  <span className="flex items-center gap-2">
                    {type.isPro && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase">
                        Pro
                      </span>
                    )}
                    <span className="text-xs">{type.count}</span>
                  </span>
                }
              />
            );
          })}
        </SidebarSection>

        {favoriteCollections.length > 0 && (
          <SidebarSection title="Favorites" collapsed={collapsed}>
            {favoriteCollections.map(renderCollection)}
          </SidebarSection>
        )}

        <SidebarSection title="Recent" collapsed={collapsed}>
          {recentCollections.map(renderCollection)}
          {!collapsed && (
            <Link
              href="/collections"
              onClick={onNavigate}
              className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              View all collections
              <ChevronRight className="size-4" />
            </Link>
          )}
        </SidebarSection>
      </nav>

      <div className={cn("flex items-center gap-3 border-t pt-3", collapsed && "justify-center")}>
        <Avatar>
          {currentUser.image && <AvatarImage src={currentUser.image} alt={currentUser.name} />}
          <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground">{currentUser.workspace}</p>
            </div>
            <Settings className="size-4 shrink-0 text-muted-foreground" />
          </>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      <aside
        className={cn(
          "hidden shrink-0 border-r bg-sidebar transition-[width] duration-200 ease-in-out lg:block",
          collapsed ? "w-16" : "w-72",
        )}
      >
        <SidebarContent collapsed={collapsed} onNavigate={() => {}} />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="bg-sidebar p-0 lg:hidden" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
