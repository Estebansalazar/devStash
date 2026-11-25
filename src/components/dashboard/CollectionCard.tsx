import { Folder, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ITEM_TYPE_ICONS,
  ITEM_TYPE_STYLES,
  type ItemTypeName,
} from "@/lib/constants/item-types";
import type { MockCollection } from "@/lib/mock-data";

interface CollectionCardProps {
  collection: MockCollection;
  typeNames: ItemTypeName[];
}

export function CollectionCard({ collection, typeNames }: CollectionCardProps) {
  const main = ITEM_TYPE_STYLES[typeNames[0] ?? "file"];

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl border p-5 transition-colors",
        main.border,
        main.tint,
      )}
    >
      <div className="flex items-center justify-between">
        <Folder className={cn("size-5", main.text)} />
        <Star
          className={cn(
            "size-4",
            collection.isFavorite ? "fill-note text-note" : "text-muted-foreground",
          )}
        />
      </div>
      <div>
        <h3 className="font-medium">{collection.name}</h3>
        <p className="text-sm text-muted-foreground">{collection.description}</p>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{collection.itemCount} items</span>
        <div className="flex gap-1.5">
          {typeNames.map((name) => {
            const Icon = ITEM_TYPE_ICONS[name];
            return <Icon key={name} className={cn("size-4", ITEM_TYPE_STYLES[name].text)} />;
          })}
        </div>
      </div>
    </article>
  );
}
