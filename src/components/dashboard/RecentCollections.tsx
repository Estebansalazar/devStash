import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { getRecentCollections } from "@/lib/db/collections";

const RECENT_COLLECTIONS_LIMIT = 6;
const GRID = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";

export async function RecentCollections() {
  const collections = await getRecentCollections(RECENT_COLLECTIONS_LIMIT);

  if (collections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No collections yet. Create one to group your items.
      </p>
    );
  }

  return (
    <div className={GRID}>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}

export function RecentCollectionsSkeleton() {
  return (
    <div className={GRID} aria-hidden>
      {Array.from({ length: RECENT_COLLECTIONS_LIMIT }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-xl border bg-muted/40"
        />
      ))}
    </div>
  );
}
