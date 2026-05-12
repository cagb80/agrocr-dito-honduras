import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Filter, Download, Search, FileText, Save, Send, X, Upload } from "lucide-react";
import { SOLICITUDES, RUBROS, DEPARTAMENTOS, fmtLk } from "@/lib/demo-data";
import { StatusBadge } from "@/components/banadesa/StatusBadge";

export const Route = createFileRoute("/_app/solicitudes")({ component: Page });

function Page() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const list = SOLICITUDES.filter(s => (filtro === "Todos" || s.estado === filtro) && (q === "" || s.cliente.toLowerCase().includes(q.toLowerCase()) || s.id.includes(q)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Solicitudes de crédito</h1>
          <p className="text-sm text-muted-foreground">Gestión integral del flujo de solicitudes agrícolas y MIPYMES.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"><Download className="h-4 w-4" /> Exportar</button>
          <button onClick={() => setOpen(true)} className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated hover:opacity-95"><Plus className="h-4 w-4" /> Nueva solicitud</button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-2 border-b p-3">
          <div className="relative flex-1 min-w-60">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar por cliente o folio…" className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {["Todos","Pendiente","En revisión","En inspección","Aprobado","Desembolsado","Rechazado"].map(f => (
              <button key={f} onClick={()=>setFiltro(f)} className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-medium ${filtro===f ? "border-primary bg-primary/10 text-primary":"bg-card hover:bg-muted"}`}>{f}</button>
            ))}
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm hover:bg-muted"><Filter className="h-4 w-4" /> Filtros</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Folio</th>
                <th className="px-4 py-3 text-left font-semibold">Cliente</th>
                <th className="px-4 py-3 text-left font-semibold">Rubro</th>
                <th className="px-4 py-3 text-left font-semibold">Ubicación</th>
                <th className="px-4 py-3 text-right font-semibold">Monto (L.)</th>
                <th className="px-4 py-3 text-center font-semibold">Plazo</th>
                <th className="px-4 py-3 text-left font-semibold">Estado</th>
                <th className="px-4 py-3 text-left font-semibold">Oficial</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map(s => (
                <tr key={s.id} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs font-semibold">{s.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{s.cliente}</div>
                    <div className="text-xs text-muted-foreground">DNI {s.dni}</div>
                  </td>
                  <td className="px-4 py-3"><span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{s.rubro}</span></td>
                  <td className="px-4 py-3 text-xs">{s.municipio}<div className="text-muted-foreground">{s.departamento}</div></td>
                  <td className="px-4 py-3 text-right font-mono text-xs font-semibold">{fmtLk(s.monto)}</td>
                  <td className="px-4 py-3 text-center text-xs">{s.plazo}m</td>
                  <td className="px-4 py-3"><StatusBadge status={s.estado} /></td>
                  <td className="px-4 py-3 text-xs">{s.oficial}</td>
                  <td className="px-4 py-3 text-right"><Link to="/expediente/$id" params={{id:s.id}} className="text-xs font-semibold text-primary hover:underline">Expediente →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t p-3 text-xs text-muted-foreground">
          <span>Mostrando <b className="text-foreground">{list.length}</b> de {SOLICITUDES.length} solicitudes</span>
          <div className="flex gap-1">
            <button className="rounded border bg-card px-2 py-1 hover:bg-muted">‹</button>
            <button className="rounded border bg-primary px-2 py-1 text-primary-foreground">1</button>
            <button className="rounded border bg-card px-2 py-1 hover:bg-muted">2</button>
            <button className="rounded border bg-card px-2 py-1 hover:bg-muted">›</button>
          </div>
        </div>
      </div>

      {open && <NewSolicitudModal onClose={() => setOpen(false)} />}
    </div>
  );
}

function Field({ label, children, span = 1 }: any) {
  return <div className={span === 2 ? "md:col-span-2" : ""}><label className="mb-1 block text-xs font-medium text-foreground">{label}</label>{children}</div>;
}
const inputCls = "h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function NewSolicitudModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-card shadow-elevated">
        <div className="flex items-center justify-between border-b bg-gradient-primary p-4 text-primary-foreground">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Nuevo registro</p>
            <h2 className="text-lg font-bold">Solicitud de crédito agrícola</h2>
          </div>
          <button onClick={onClose} className="rounded p-1.5 hover:bg-white/15"><X className="h-4 w-4" /></button>
        </div>

        <div className="flex border-b bg-muted/30 px-4">
          {["Datos personales","Datos empresariales","Información del crédito","Adjuntos"].map((s, i) => (
            <button key={s} onClick={()=>setStep(i+1)} className={`relative px-4 py-3 text-xs font-medium ${step===i+1 ? "text-primary":"text-muted-foreground hover:text-foreground"}`}>
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">{i+1}</span>{s}
              {step===i+1 && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {step===1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nombre completo" span={2}><input className={inputCls} placeholder="Juan Antonio Pérez Madrid" /></Field>
              <Field label="DNI"><input className={inputCls} placeholder="0801-1985-12345" /></Field>
              <Field label="RTN"><input className={inputCls} placeholder="08011985123451" /></Field>
              <Field label="Teléfono"><input className={inputCls} placeholder="+504 9999-9999" /></Field>
              <Field label="Correo electrónico"><input className={inputCls} type="email" placeholder="cliente@correo.hn" /></Field>
              <Field label="Dirección" span={2}><input className={inputCls} placeholder="Aldea, calle…" /></Field>
              <Field label="Departamento"><select className={inputCls}>{DEPARTAMENTOS.map(d => <option key={d}>{d}</option>)}</select></Field>
              <Field label="Municipio"><input className={inputCls} placeholder="Municipio" /></Field>
            </div>
          )}
          {step===2 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Tipo de productor"><select className={inputCls}><option>Pequeño productor</option><option>Mediano productor</option><option>Cooperativa</option><option>MIPYME</option></select></Field>
              <Field label="Actividad económica"><input className={inputCls} placeholder="Producción cafetalera" /></Field>
              <Field label="Rubro" span={2}>
                <div className="flex flex-wrap gap-2">
                  {RUBROS.map(r => <label key={r} className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm hover:border-primary cursor-pointer"><input type="radio" name="rubro" className="accent-primary" /> {r}</label>)}
                </div>
              </Field>
            </div>
          )}
          {step===3 && (
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Destino del crédito" span={2}>
                <div className="grid gap-2 md:grid-cols-2">
                  {["Capital de trabajo","Inversión fija","Siembra","Compra de maquinaria"].map(d => <label key={d} className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm hover:border-primary cursor-pointer"><input type="checkbox" className="accent-primary" /> {d}</label>)}
                </div>
              </Field>
              <Field label="Monto solicitado (L.)"><input className={inputCls} type="number" placeholder="500000.00" /></Field>
              <Field label="Plazo (meses)"><input className={inputCls} type="number" placeholder="36" /></Field>
              <Field label="Tipo de garantía" span={2}><select className={inputCls}><option>Hipotecaria</option><option>Prendaria</option><option>Fiduciaria</option><option>Mixta</option></select></Field>
            </div>
          )}
          {step===4 && (
            <div className="grid gap-3 md:grid-cols-2">
              {["DNI (PDF)","RTN (PDF)","Fotografías","Croquis","Recibo de servicio público","Escrituras","Documentos de garantía"].map(d => (
                <label key={d} className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-2 border-dashed bg-muted/20 p-5 text-center hover:border-primary hover:bg-primary/5">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{d}</span>
                  <span className="text-xs text-muted-foreground">Click o arrastrar archivo</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t bg-muted/20 p-4">
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">Cancelar</button>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"><Save className="h-4 w-4" /> Guardar borrador</button>
            {step < 4 ? (
              <button onClick={()=>setStep(step+1)} className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-95">Siguiente →</button>
            ) : (
              <button className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated hover:opacity-95"><Send className="h-4 w-4" /> Enviar a análisis</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
