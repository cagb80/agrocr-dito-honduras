import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CheckCircle2, Calendar } from "lucide-react";
import { fmtLk } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/desembolsos")({ component: Page });

function buildAmort() {
  const cap = 850000, tasa = 0.12/12, n = 36;
  const cuota = (cap*tasa)/(1-Math.pow(1+tasa,-n));
  let saldo = cap;
  return Array.from({length: 12}, (_, i) => {
    const interes = saldo*tasa, capital = cuota-interes;
    saldo -= capital;
    return { mes: i+1, fecha: `${String(i+6).padStart(2,"0")}/2025`, capital, interes, cuota, saldo: Math.max(saldo,0) };
  });
}

function Page() {
  const amort = buildAmort();
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold tracking-tight">Desembolsos</h1><p className="text-sm text-muted-foreground">Gestión financiera y cronograma de pagos.</p></div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Monto aprobado", v: fmtLk(850000), i: CheckCircle2, t: "success" },
          { l: "Monto desembolsado", v: fmtLk(425000), i: Banknote, t: "primary" },
          { l: "Pendiente desembolso", v: fmtLk(425000), i: Calendar, t: "warning" },
          { l: "Cuota mensual", v: fmtLk(28239.25), i: Banknote, t: "info" },
        ].map((k,i) => {
          const tone: any = { success: "bg-success/10 text-success", primary: "bg-primary/10 text-primary", warning: "bg-warning/15 text-warning-foreground", info: "bg-info/10 text-info" };
          return (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone[k.t]}`}><k.i className="h-4 w-4" /></div>
              <p className="mt-3 text-xl font-bold tracking-tight font-mono">{k.v}</p>
              <p className="text-xs text-muted-foreground">{k.l}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Cuenta bancaria de desembolso</h3>
          <span className="rounded-md bg-success/10 px-2 py-1 text-xs font-semibold text-success">Verificada</span>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div><p className="text-xs text-muted-foreground">Banco</p><p className="text-sm font-semibold">BANADESA</p></div>
          <div><p className="text-xs text-muted-foreground">Cuenta</p><p className="font-mono text-sm font-semibold">11-002-058741-3</p></div>
          <div><p className="text-xs text-muted-foreground">Titular</p><p className="text-sm font-semibold">Coop. Cafetalera La Esperanza</p></div>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between border-b p-4">
          <div><h3 className="font-semibold">Tabla de amortización</h3><p className="text-xs text-muted-foreground">SOL-2025-0142 · L. 850,000 · 12% anual · 36 meses</p></div>
          <button className="rounded-md border bg-card px-3 py-1.5 text-xs font-medium hover:bg-muted">Exportar Excel</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">#</th>
                <th className="px-4 py-2.5 text-left font-semibold">Fecha</th>
                <th className="px-4 py-2.5 text-right font-semibold">Capital</th>
                <th className="px-4 py-2.5 text-right font-semibold">Interés</th>
                <th className="px-4 py-2.5 text-right font-semibold">Cuota</th>
                <th className="px-4 py-2.5 text-right font-semibold">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {amort.map(a => (
                <tr key={a.mes} className="border-t font-mono text-xs">
                  <td className="px-4 py-2">{a.mes}</td>
                  <td className="px-4 py-2">{a.fecha}</td>
                  <td className="px-4 py-2 text-right">{fmtLk(Math.round(a.capital))}</td>
                  <td className="px-4 py-2 text-right">{fmtLk(Math.round(a.interes))}</td>
                  <td className="px-4 py-2 text-right font-semibold">{fmtLk(Math.round(a.cuota))}</td>
                  <td className="px-4 py-2 text-right">{fmtLk(Math.round(a.saldo))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
