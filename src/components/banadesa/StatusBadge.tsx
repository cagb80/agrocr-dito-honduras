import { cn } from "@/lib/utils";
const map: Record<string, string> = {
  "Pendiente": "bg-muted text-muted-foreground border-border",
  "En revisión": "bg-info/10 text-info border-info/20",
  "En inspección": "bg-warning/15 text-warning-foreground border-warning/30",
  "Aprobado": "bg-success/10 text-success border-success/20",
  "Rechazado": "bg-destructive/10 text-destructive border-destructive/20",
  "Desembolsado": "bg-primary/10 text-primary border-primary/20",
  "En seguimiento": "bg-accent/10 text-accent border-accent/20",
  "Condicionado": "bg-warning/15 text-warning-foreground border-warning/30",
  "Devuelto": "bg-muted text-muted-foreground border-border",
};
export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", map[status] ?? "bg-muted text-muted-foreground border-border")}>
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
