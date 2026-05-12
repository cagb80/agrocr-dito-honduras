import { Sprout } from "lucide-react";

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-elevated">
        <Sprout className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-warning ring-2 ring-background" />
      </div>
      {!compact && (
        <div className="flex flex-col leading-none">
          <span className={`text-base font-bold tracking-tight ${light ? "text-sidebar-foreground" : "text-foreground"}`}>BANADESA</span>
          <span className={`text-[10px] font-medium uppercase tracking-wider ${light ? "text-sidebar-foreground/70" : "text-muted-foreground"}`}>Sistema de Crédito Agrícola</span>
        </div>
      )}
    </div>
  );
}
