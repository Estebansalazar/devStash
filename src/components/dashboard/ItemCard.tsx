import { Pin, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ITEM_TYPE_ICONS,
  ITEM_TYPE_STYLES,
  type ItemTypeName,
} from "@/lib/constants/item-types";
import type { MockItem } from "@/lib/mock-data";

interface ItemCardProps {
  item: MockItem;
  typeName: ItemTypeName;
  typeLabel: string;
}

export function ItemCard({ item, typeName, typeLabel }: ItemCardProps) {
  const Icon = ITEM_TYPE_ICONS[typeName];
  const style = ITEM_TYPE_STYLES[typeName];
  const preview = item.url ?? item.content ?? "";

  return (
    <article
      className={cn("flex flex-col gap-3 rounded-xl border bg-card p-5", style.border)}
    >
      <div className={cn("flex items-center gap-2 text-sm font-medium", style.text)}>
        <Icon className="size-4" />
        {typeLabel}
      </div>
      <h3 className="font-medium">{item.title}</h3>
      <p
        className={cn(
          "line-clamp-3 text-sm whitespace-pre-wrap text-muted-foreground",
          item.language && "font-mono",
        )}
      >
        {preview}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-end gap-2 border-t pt-3 text-muted-foreground">
        <Star className={cn("size-4", item.isFavorite && "fill-note text-note")} />
        <Pin className={cn("size-4", item.isPinned && "text-primary")} />
      </div>
    </article>
  );
}
