import {
  Code,
  File,
  Image,
  Link,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export type ItemTypeName =
  | "snippet"
  | "prompt"
  | "command"
  | "note"
  | "file"
  | "image"
  | "link";

export const ITEM_TYPE_ICONS: Record<ItemTypeName, LucideIcon> = {
  snippet: Code,
  prompt: Sparkles,
  command: Terminal,
  note: StickyNote,
  file: File,
  image: Image,
  link: Link,
};

export const ITEM_TYPE_STYLES: Record<
  ItemTypeName,
  { text: string; border: string; tint: string }
> = {
  snippet: { text: "text-snippet", border: "border-snippet/40", tint: "bg-snippet/8" },
  prompt: { text: "text-prompt", border: "border-prompt/40", tint: "bg-prompt/8" },
  command: { text: "text-command", border: "border-command/40", tint: "bg-command/8" },
  note: { text: "text-note", border: "border-note/40", tint: "bg-note/8" },
  file: { text: "text-file", border: "border-file/40", tint: "bg-file/8" },
  image: { text: "text-image", border: "border-image/40", tint: "bg-image/8" },
  link: { text: "text-link", border: "border-link/40", tint: "bg-link/8" },
};
