import { categoriaTone, categoriaLabel, type Categoria } from "@/lib/cartera";
import { cn } from "@/lib/utils";

export function CategoryBadge({ categoria, size = "sm", showLabel = true }: { categoria: Categoria; size?: "sm" | "md"; showLabel?: boolean }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-md border font-semibold",
      categoriaTone(categoria),
      size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
    )}>
      <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-current/20 text-[10px] font-bold text-current">{categoria}</span>
      {showLabel && <span>{categoriaLabel(categoria)}</span>}
    </span>
  );
}