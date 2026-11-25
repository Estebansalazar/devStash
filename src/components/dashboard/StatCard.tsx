import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <article className="flex items-center justify-between rounded-xl border bg-card p-5">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-semibold">{value}</p>
      </div>
      <Icon className="size-5 text-muted-foreground" />
    </article>
  );
}
