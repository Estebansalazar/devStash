import { Suspense } from "react";
import { Package, Pin, Star } from "lucide-react";

import {
  CollectionStatCards,
  CollectionStatCardsSkeleton,
} from "@/components/dashboard/CollectionStatCards";
import { ItemCard } from "@/components/dashboard/ItemCard";
import {
  RecentCollections,
  RecentCollectionsSkeleton,
} from "@/components/dashboard/RecentCollections";
import { StatCard } from "@/components/dashboard/StatCard";
import type { ItemTypeName } from "@/lib/constants/item-types";
import { items, itemTypes } from "@/lib/mock-data";
import type { MockItem } from "@/lib/mock-data";

const RECENT_ITEMS_LIMIT = 10;

const typeById = new Map(itemTypes.map((type) => [type.id, type]));

function renderItemCard(item: MockItem) {
  const type = typeById.get(item.itemTypeId);
  return (
    <ItemCard
      key={item.id}
      item={item}
      typeName={type?.name as ItemTypeName}
      typeLabel={type?.label.slice(0, -1) ?? ""}
    />
  );
}

export default function DashboardPage() {
  const totalItems = itemTypes.reduce((sum, type) => sum + type.count, 0);
  const pinnedItems = items.filter((item) => item.isPinned);
  const recentItems = [...items]
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
    .slice(0, RECENT_ITEMS_LIMIT);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          A home for everything you don&apos;t want to Google twice.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Items" value={totalItems} icon={Package} />
        <StatCard
          label="Favorite items"
          value={items.filter((item) => item.isFavorite).length}
          icon={Star}
        />
        <Suspense fallback={<CollectionStatCardsSkeleton />}>
          <CollectionStatCards />
        </Suspense>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Suspense fallback={<RecentCollectionsSkeleton />}>
          <RecentCollections />
        </Suspense>
      </section>

      {pinnedItems.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Pin className="size-4 text-muted-foreground" />
            Pinned
            <span className="text-sm font-normal text-muted-foreground">
              {pinnedItems.length}
            </span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pinnedItems.map(renderItemCard)}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Recent</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentItems.map(renderItemCard)}
        </div>
      </section>
    </div>
  );
}
