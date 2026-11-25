import { collections, items } from "@/lib/mock-data";
import type { MockCollection } from "@/lib/mock-data";

export function getRecentCollections(limit: number): MockCollection[] {
  const lastUpdated = (collectionId: string) =>
    Math.max(
      0,
      ...items
        .filter((item) => item.collectionIds.includes(collectionId))
        .map((item) => Date.parse(item.updatedAt)),
    );

  return [...collections]
    .sort((a, b) => lastUpdated(b.id) - lastUpdated(a.id))
    .slice(0, limit);
}
