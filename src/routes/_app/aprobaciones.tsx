import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, CheckCircle2, XCircle, FileSignature, Clock } from "lucide-react";
import { SOLICITUDES, fmtLk } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/aprobaciones")({ component: Page });

const NIVELES = ["Oficial de crédito", "Analista", "Supervisor", "Comité de crédito", "Junta directiva"];

function Page() {
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold tracking-tight">Aprobaciones</h1><p className="text-sm text-muted-foreground">Flujo multinivel de aprobación de crédito.</p></div>

      <div className="rounded-xl border bg-card p-5 shadow-card">
        <h3 className="mb-4 font-semibold">Flujo de aprobación</h3>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {NIVELES.map((n, i) => (
            <div key={n} className="flex items-center gap-1">
              <div className={`flex flex-col items-center rounded-lg border-2 p-3 min-w-32 ${i < 3 ? "border-success bg-success/5":"border-border bg-muted/30"}`}>
                {i < 3 ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Clock className="h-5 w-5 text-muted-foreground" />}
                <p className="mt-1.5 text-xs font-semibold text-center">{n}</p>
                <p className="text-[10px] text-muted-foreground">{i<3 ? "Aprobado":"Pendiente"}</p>
              </div>
              {i < NIVELES.length - 1 && <div className={`h-0.5 w-4 ${i < 2 ? "bg-success":"bg-border"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="border-b p-4"><h3 className="font-semibold">Bandeja de aprobaciones · Comité de crédito</h3></div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-semibold">Folio</th><th className="px-4 py-3 text-left font-semibold">Cliente</th><th className="px-4 py-3 text-right font-semibold">Monto</th><th className="px-4 py-3 text-left font-semibold">Recomendación</th><th className="px-4 py-3 text-right font-semibold">Acciones</th></tr>
          </thead>
          <tbody>
            {SOLICITUDES.slice(0,5).map(s => (
              <tr key={s.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs font-semibold">{s.id}</td>
                <td className="px-4 py-3"><div className="font-medium">{s.cliente}</div><div className="text-xs text-muted-foreground">{s.rubro}</div></td>
                <td className="px-4 py-3 text-right font-mono text-xs font-semibold">{fmtLk(s.monto)}</td>
                <td className="px-4 py-3"><span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">Aprobar</span></td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-semibold text-success hover:bg-success/15"><CheckCircle2 className="h-3 w-3" /> Aprobar</button>
                    <button className="inline-flex items-center gap-1 rounded-md bg-warning/15 px-2 py-1 text-xs font-semibold text-warning-foreground hover:bg-warning/20">Condicionar</button>
                    <button className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive hover:bg-destructive/15"><XCircle className="h-3 w-3" /> Rechazar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-card">
        <h3 className="mb-3 flex items-center gap-2 font-semibold"><FileSignature className="h-4 w-4 text-primary" /> Firma digital y comentarios</h3>
        <textarea rows={3} placeholder="Agregar comentario para el comité…" className="w-full rounded-md border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Firmando como: <b className="text-foreground">Ana Patricia Lara · Supervisor Regional</b></p>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated"><FileSignature className="h-4 w-4" /> Firmar y registrar</button>
        </div>
      </div>
    </div>
  );
}
