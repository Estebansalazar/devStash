import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { ItemCard } from "@/components/dashboard/ItemCard";
import type { ItemTypeName } from "@/lib/constants/item-types";
import { collections, items, itemTypes } from "@/lib/mock-data";

const typeById = new Map(itemTypes.map((type) => [type.id, type]));

export default function DashboardPage() {
  const recentItems = items.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          A home for everything you don&apos;t want to Google twice.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Collections</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              typeNames={collection.typeIds.map(
                (id) => typeById.get(id)?.name as ItemTypeName,
              )}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Recent</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentItems.map((item) => {
            const type = typeById.get(item.itemTypeId);
            return (
              <ItemCard
                key={item.id}
                item={item}
                typeName={type?.name as ItemTypeName}
                typeLabel={type?.label.slice(0, -1) ?? ""}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
