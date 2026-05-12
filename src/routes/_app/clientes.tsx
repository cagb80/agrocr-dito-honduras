import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, Users } from "lucide-react";
import { SOLICITUDES, fmtLk } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/clientes")({ component: Page });

function Page() {
  const clientes = Array.from(new Map(SOLICITUDES.map(s => [s.cliente, s])).values());
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Clientes</h1><p className="text-sm text-muted-foreground">Productores agrícolas y MIPYMES registrados.</p></div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated"><Plus className="h-4 w-4" /> Nuevo cliente</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {clientes.map(c => (
          <div key={c.id} className="rounded-xl border bg-card p-4 shadow-card hover:shadow-elevated transition">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary text-base font-bold text-primary-foreground">{c.cliente.split(" ").slice(0,2).map(w=>w[0]).join("")}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{c.cliente}</p>
                <p className="truncate text-xs text-muted-foreground">DNI {c.dni}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.municipio}, {c.departamento}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-center">
              <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rubro</p><p className="text-xs font-semibold">{c.rubro}</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cartera</p><p className="text-xs font-semibold font-mono">{fmtLk(c.monto)}</p></div>
              <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</p><p className="text-xs font-semibold text-success">{700+Math.floor(Math.random()*120)}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
