import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, Calendar, TrendingUp } from "lucide-react";
import { fmtLk } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/seguimiento")({ component: Page });

const SEG = [
  { cliente: "Coop. Cafetalera La Esperanza", proy: 78, estado: "Avance normal", riesgo: "bajo", proxVisita: "15 Jun 2025", saldo: 720000 },
  { cliente: "Ramón Antonio Posadas", proy: 62, estado: "Avance normal", riesgo: "bajo", proxVisita: "20 Jun 2025", saldo: 1100000 },
  { cliente: "Avícola El Progreso", proy: 45, estado: "Mora 15 días", riesgo: "medio", proxVisita: "12 Jun 2025", saldo: 1620000 },
  { cliente: "Coop. Frijolera del Sur", proy: 30, estado: "Mora 35 días", riesgo: "alto", proxVisita: "Urgente", saldo: 480000 },
  { cliente: "Marta Lucía Pineda", proy: 88, estado: "Avance excelente", riesgo: "bajo", proxVisita: "18 Jun 2025", saldo: 240000 },
];

function Page() {
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold tracking-tight">Seguimiento y supervisión</h1><p className="text-sm text-muted-foreground">Monitoreo post-desembolso de proyectos activos.</p></div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          { l: "Proyectos en seguimiento", v: "1,284", i: Activity, t: "primary" },
          { l: "Alertas de mora", v: "47", i: AlertTriangle, t: "destructive" },
          { l: "Visitas próximas", v: "23", i: Calendar, t: "info" },
          { l: "Avance promedio", v: "67%", i: TrendingUp, t: "success" },
        ].map((k,i) => {
          const tone: any = { primary: "bg-primary/10 text-primary", destructive: "bg-destructive/10 text-destructive", info: "bg-info/10 text-info", success: "bg-success/10 text-success" };
          return (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone[k.t]}`}><k.i className="h-4 w-4" /></div>
              <p className="mt-3 text-2xl font-bold tracking-tight">{k.v}</p>
              <p className="text-xs text-muted-foreground">{k.l}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="border-b p-4"><h3 className="font-semibold">Cartera en seguimiento</h3></div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-semibold">Cliente</th><th className="px-4 py-3 text-left font-semibold">Avance del proyecto</th><th className="px-4 py-3 text-left font-semibold">Estado</th><th className="px-4 py-3 text-left font-semibold">Próxima visita</th><th className="px-4 py-3 text-right font-semibold">Saldo</th></tr>
          </thead>
          <tbody>
            {SEG.map((s,i) => (
              <tr key={i} className="border-t hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{s.cliente}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${s.riesgo==="bajo"?"bg-success":s.riesgo==="medio"?"bg-warning":"bg-destructive"}`} style={{width: `${s.proy}%`}} />
                    </div>
                    <span className="font-mono text-xs font-semibold">{s.proy}%</span>
                  </div>
                </td>
                <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${s.riesgo==="bajo"?"bg-success/10 text-success":s.riesgo==="medio"?"bg-warning/15 text-warning-foreground":"bg-destructive/10 text-destructive"}`}>{s.estado}</span></td>
                <td className="px-4 py-3 text-xs">{s.proxVisita}</td>
                <td className="px-4 py-3 text-right font-mono text-xs font-semibold">{fmtLk(s.saldo)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4 text-warning" /> Alertas activas</h3>
          <ul className="space-y-2">
            {[
              { t: "Mora 35 días", d: "Coop. Frijolera del Sur — L. 24,500", n: "alta" },
              { t: "Pago próximo (3 días)", d: "Avícola El Progreso", n: "media" },
              { t: "Proyecto en riesgo climático", d: "Cafetales en Copán — alerta de roya", n: "media" },
              { t: "Baja productividad reportada", d: "Hortícolas en Intibucá", n: "baja" },
            ].map((a,i) => (
              <li key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${a.n==="alta"?"border-destructive/30 bg-destructive/5":a.n==="media"?"border-warning/30 bg-warning/5":"border-info/30 bg-info/5"}`}>
                <div className={`mt-1 h-2 w-2 rounded-full ${a.n==="alta"?"bg-destructive":a.n==="media"?"bg-warning":"bg-info"}`} />
                <div><p className="text-sm font-semibold">{a.t}</p><p className="text-xs text-muted-foreground">{a.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 font-semibold">Evidencia fotográfica reciente</h3>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-primary/15 via-success/10 to-accent/15 ring-1 ring-border" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
