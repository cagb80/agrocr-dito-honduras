import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Camera, CheckCircle2, Calendar, Upload, Smartphone } from "lucide-react";

export const Route = createFileRoute("/_app/inspecciones")({ component: Page });

const VISITAS = [
  { id: "INS-2025-0098", cliente: "Coop. Cafetalera La Esperanza", lugar: "Santa Rosa de Copán", fecha: "10 May · 08:00", tecnico: "Roberto Mejía", estado: "Programada" },
  { id: "INS-2025-0097", cliente: "Ramón Antonio Posadas", lugar: "Juticalpa, Olancho", fecha: "10 May · 14:00", tecnico: "Roberto Mejía", estado: "En ruta" },
  { id: "INS-2025-0096", cliente: "Ganadera San Francisco", lugar: "Catacamas, Olancho", fecha: "09 May · 10:30", tecnico: "Lucía Sánchez", estado: "Completada" },
  { id: "INS-2025-0095", cliente: "Avícola El Progreso", lugar: "El Progreso, Yoro", fecha: "08 May · 09:00", tecnico: "Lucía Sánchez", estado: "Completada" },
];

const CHECK = [
  { l: "Proyecto existe físicamente", ok: true },
  { l: "Garantía validada en campo", ok: true },
  { l: "Producción observable", ok: true },
  { l: "Condiciones agroecológicas adecuadas", ok: true },
  { l: "Acceso vial al predio", ok: true },
  { l: "Evidencia fotográfica capturada", ok: false },
];

function Page() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Inspecciones de campo</h1><p className="text-sm text-muted-foreground">Programación, geolocalización y evidencias.</p></div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated"><Calendar className="h-4 w-4" /> Programar visita</button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border bg-card shadow-card lg:col-span-2">
          <div className="border-b p-4"><h3 className="font-semibold">Visitas programadas y recientes</h3></div>
          <ul className="divide-y">
            {VISITAS.map(v => (
              <li key={v.id} className="flex items-center gap-4 p-4 hover:bg-muted/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10 text-info"><MapPin className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{v.cliente}</p>
                  <p className="text-xs text-muted-foreground">{v.lugar} · {v.fecha} · Téc. {v.tecnico}</p>
                </div>
                <span className={`rounded-md px-2 py-1 text-xs font-semibold ${
                  v.estado === "Completada" ? "bg-success/10 text-success" :
                  v.estado === "En ruta" ? "bg-warning/15 text-warning-foreground" :
                  "bg-info/10 text-info"
                }`}>{v.estado}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border bg-card shadow-card">
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, oklch(0.55 0.15 150 / 0.4), transparent 40%), radial-gradient(circle at 70% 60%, oklch(0.42 0.12 250 / 0.4), transparent 40%)" }} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <MapPin className="mx-auto h-8 w-8 text-primary drop-shadow" />
                <p className="mt-1 text-xs font-mono font-semibold">14.7708° N · 88.7800° W</p>
                <p className="text-[10px] text-muted-foreground">Santa Rosa de Copán</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold">Ubicación del proyecto</p>
              <p className="text-xs text-muted-foreground">Coop. Cafetalera La Esperanza · 4.5 Mz</p>
            </div>
          </div>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 text-sm font-semibold text-primary hover:bg-primary/10">
            <Smartphone className="h-5 w-5" /> Subir fotografías desde móvil
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4 text-primary" /> Checklist de inspección</h3>
          <ul className="space-y-2">
            {CHECK.map((c,i) => (
              <li key={i} className={`flex items-center justify-between rounded-lg border p-3 ${c.ok ? "border-success/20 bg-success/5":"border-warning/30 bg-warning/5"}`}>
                <span className="text-sm font-medium">{c.l}</span>
                {c.ok ? <CheckCircle2 className="h-5 w-5 text-success" /> : <span className="text-xs font-semibold text-warning-foreground">Pendiente</span>}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Observaciones del técnico</label>
            <textarea rows={3} className="mt-1 w-full rounded-md border bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30" defaultValue="Cafetal en excelente estado fitosanitario. Se observa renovación reciente del 30% del cultivo. Acceso vial pavimentado hasta 200m del predio." />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><Camera className="h-4 w-4 text-primary" /> Evidencia fotográfica</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-primary/15 to-success/15 ring-1 ring-border" />
            ))}
          </div>
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed py-2 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary">
            <Upload className="h-3 w-3" /> Agregar fotografías
          </button>
        </div>
      </div>
    </div>
  );
}
