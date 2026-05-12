import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, MapPin, Camera, FileCheck2, AlertCircle, Building2, Phone, Mail, CreditCard, Calendar, CheckCircle2, Circle } from "lucide-react";
import { SOLICITUDES, fmtLk } from "@/lib/demo-data";
import { StatusBadge } from "@/components/banadesa/StatusBadge";

export const Route = createFileRoute("/_app/expediente/")({ component: Page });

const TIMELINE = [
  { label: "Solicitud recibida", date: "08 May 2025 · 09:14", done: true },
  { label: "Documentación validada", date: "08 May 2025 · 14:32", done: true },
  { label: "Análisis financiero", date: "09 May 2025 · 11:08", done: true },
  { label: "Inspección de campo", date: "10 May 2025 · 08:00", done: true, current: true },
  { label: "Comité de crédito", date: "Pendiente", done: false },
  { label: "Aprobación final", date: "Pendiente", done: false },
  { label: "Desembolso", date: "Pendiente", done: false },
];

function Page() {
  const { id } = Route.useParams();
  const s = SOLICITUDES.find(x => x.id === id) ?? SOLICITUDES[0];
  return (
    <div className="space-y-5">
      <Link to="/solicitudes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Solicitudes</Link>

      <div className="rounded-xl border bg-gradient-primary p-6 text-primary-foreground shadow-elevated">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Expediente digital</p>
            <h1 className="mt-1 text-2xl font-bold">{s.cliente}</h1>
            <p className="mt-1 text-sm opacity-90">Folio <span className="font-mono font-bold">{s.id}</span> · {s.rubro} · {s.municipio}, {s.departamento}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={s.estado} />
            <p className="text-xs opacity-80">Oficial: <b>{s.oficial}</b></p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-4">
          <div><p className="text-xs opacity-75">Monto solicitado</p><p className="text-lg font-bold">{fmtLk(s.monto)}</p></div>
          <div><p className="text-xs opacity-75">Plazo</p><p className="text-lg font-bold">{s.plazo} meses</p></div>
          <div><p className="text-xs opacity-75">Destino</p><p className="text-sm font-semibold">{s.destino}</p></div>
          <div><p className="text-xs opacity-75">Fecha solicitud</p><p className="text-sm font-semibold">{s.fecha}</p></div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card title="Información del cliente" icon={Building2}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Info icon={CreditCard} label="DNI" value={s.dni} />
              <Info icon={CreditCard} label="RTN" value={s.dni.replace(/-/g,"")+"1"} />
              <Info icon={Phone} label="Teléfono" value="+504 9988-7766" />
              <Info icon={Mail} label="Correo" value="cliente@correo.hn" />
              <Info icon={MapPin} label="Dirección" value={`Aldea El Mirador, ${s.municipio}, ${s.departamento}`} />
              <Info icon={Calendar} label="Antigüedad cliente" value="6 años · 3 créditos previos" />
            </div>
          </Card>

          <Card title="Historial crediticio" icon={FileCheck2}>
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b"><th className="py-2 text-left font-semibold">Folio</th><th className="text-left font-semibold">Año</th><th className="text-right font-semibold">Monto</th><th className="text-left font-semibold">Estado</th></tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-2 font-mono text-xs">CRD-2022-0814</td><td>2022</td><td className="text-right font-mono">{fmtLk(450000)}</td><td><StatusBadge status="Desembolsado" /></td></tr>
                <tr className="border-b"><td className="py-2 font-mono text-xs">CRD-2023-1102</td><td>2023</td><td className="text-right font-mono">{fmtLk(680000)}</td><td><StatusBadge status="Desembolsado" /></td></tr>
                <tr><td className="py-2 font-mono text-xs">CRD-2024-0091</td><td>2024</td><td className="text-right font-mono">{fmtLk(750000)}</td><td><StatusBadge status="En seguimiento" /></td></tr>
              </tbody>
            </table>
          </Card>

          <Card title="Documentos adjuntos" icon={FileText}>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { n: "DNI escaneado", s: "1.2 MB · PDF", ok: true },
                { n: "RTN", s: "0.8 MB · PDF", ok: true },
                { n: "Escrituras de propiedad", s: "3.4 MB · PDF", ok: true },
                { n: "Fotografías del proyecto (12)", s: "8.7 MB · ZIP", ok: true },
                { n: "Croquis del terreno", s: "2.1 MB · PDF", ok: true },
                { n: "Recibo de servicio público", s: "Pendiente", ok: false },
              ].map((d, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-lg border p-3 ${d.ok ? "" : "border-warning/30 bg-warning/5"}`}>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-md ${d.ok ? "bg-primary/10 text-primary":"bg-warning/15 text-warning-foreground"}`}>
                    {d.ok ? <FileText className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{d.n}</p>
                    <p className="text-xs text-muted-foreground">{d.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Visitas de campo" icon={Camera}>
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Inspección programada</p>
                  <p className="text-xs text-muted-foreground">10 May 2025 · 08:00 · Técnico Roberto Mejía</p>
                </div>
                <span className="rounded-md bg-info/10 px-2 py-1 text-xs font-semibold text-info">Próxima</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card title="Estado del proceso" icon={CheckCircle2}>
            <ol className="space-y-3">
              {TIMELINE.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {t.done ? <CheckCircle2 className={`h-5 w-5 ${t.current ? "text-warning":"text-success"}`} /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                    {i < TIMELINE.length - 1 && <div className={`mt-1 h-8 w-0.5 ${t.done ? "bg-success/40":"bg-border"}`} />}
                  </div>
                  <div className="pb-2">
                    <p className={`text-sm font-medium ${t.current ? "text-warning-foreground":""}`}>{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Garantías" icon={FileCheck2}>
            <div className="space-y-2">
              <div className="rounded-lg border p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hipotecaria</p>
                <p className="mt-1 text-sm font-semibold">Finca cafetalera 4.5 Mz</p>
                <p className="text-xs text-muted-foreground">Avalúo: <span className="font-mono font-semibold text-foreground">{fmtLk(1850000)}</span></p>
                <p className="text-xs text-muted-foreground">Cobertura: <span className="font-semibold text-success">217%</span></p>
              </div>
            </div>
          </Card>

          <Card title="Dictamen técnico" icon={FileText}>
            <p className="text-sm leading-relaxed text-muted-foreground">Cliente con historial crediticio impecable. Proyecto técnicamente viable, capacidad de pago demostrada. Se recomienda <b className="text-success">aprobación condicionada</b> con monitoreo trimestral.</p>
            <div className="mt-3 flex items-center justify-between text-xs"><span className="text-muted-foreground">Score interno</span><span className="rounded-md bg-success/10 px-2 py-0.5 font-bold text-success">782 / 850</span></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ title, icon: Icon, children }: any) {
  return (
    <div className="rounded-xl border bg-card shadow-card">
      <div className="flex items-center gap-2 border-b p-4"><Icon className="h-4 w-4 text-primary" /><h3 className="font-semibold">{title}</h3></div>
      <div className="p-4">{children}</div>
    </div>
  );
}
function Info({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-muted"><Icon className="h-3.5 w-3.5 text-muted-foreground" /></div>
      <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium">{value}</p></div>
    </div>
  );
}
