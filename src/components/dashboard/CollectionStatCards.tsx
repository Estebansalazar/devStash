import { Folder, Star } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";
import { getCollectionStats } from "@/lib/db/collections";

export async function CollectionStatCards() {
  const stats = await getCollectionStats();

  return (
    <>
      <StatCard label="Collections" value={stats.total} icon={Folder} />
      <StatCard label="Favorite collections" value={stats.favorites} icon={Star} />
    </>
  );
}

export function CollectionStatCardsSkeleton() {
  return (
    <>
      {["Collections", "Favorite collections"].map((label) => (
        <article
          key={label}
          className="flex items-center justify-between rounded-xl border bg-card p-5"
        >
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="mt-1 h-8 w-10 animate-pulse rounded bg-muted/60" />
          </div>
        </article>
      ))}
    </>
  );
}
