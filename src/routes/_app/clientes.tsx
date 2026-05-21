import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Sparkles } from "lucide-react";
import { fmtLk } from "@/lib/demo-data";
import { CARTERA } from "@/lib/cartera";
import { CategoryBadge } from "@/components/banadesa/CategoryBadge";

export const Route = createFileRoute("/_app/clientes")({ component: Page });

function Page() {
  const clientes = CARTERA;
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Clientes</h1><p className="text-sm text-muted-foreground">Productores agrícolas y MIPYMES registrados.</p></div>
        <div className="flex gap-2">
          <Link to="/preaprobados" className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"><Sparkles className="h-4 w-4 text-primary" /> Cartera pre-aprobada</Link>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated"><Plus className="h-4 w-4" /> Nuevo cliente</button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {clientes.map(c => (
          <div key={c.dni} className="rounded-xl border bg-card p-4 shadow-card hover:shadow-elevated transition">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-base font-bold text-primary-foreground">{c.cliente.split(" ").slice(0,2).map(w=>w[0]).join("")}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-semibold">{c.cliente}</p>
                  <CategoryBadge categoria={c.categoria} showLabel={false} />
                </div>
                <p className="truncate text-xs text-muted-foreground">DNI {c.dni}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.municipio}, {c.departamento}</p>
              </div>
            </div>
            {c.preAprobado && (
              <div className="mt-3 flex items-center justify-between rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary"><Sparkles className="h-3 w-3" /> Pre-aprobado</div>
                <span className="font-mono text-xs font-bold text-primary">L. {fmtLk(c.montoPreAprobado)}</span>
              </div>
            )}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-center">
              <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rubro</p><p className="text-xs font-semibold">{c.rubro}</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cartera</p><p className="text-xs font-semibold font-mono">{fmtLk(c.montoCredito)}</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</p><p className={`text-xs font-semibold ${c.score >= 700 ? "text-success" : c.score >= 600 ? "text-amber-600" : "text-destructive"}`}>{c.score}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
