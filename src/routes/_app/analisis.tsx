import { createFileRoute } from "@tanstack/react-router";
import { Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Legend } from "recharts";

export const Route = createFileRoute("/_app/analisis")({ component: Page });

const FLUJO = [
  { mes: "Mes 1", ingresos: 0, egresos: 45 }, { mes: "Mes 2", ingresos: 0, egresos: 38 },
  { mes: "Mes 3", ingresos: 0, egresos: 28 }, { mes: "Mes 4", ingresos: 22, egresos: 18 },
  { mes: "Mes 5", ingresos: 95, egresos: 18 }, { mes: "Mes 6", ingresos: 142, egresos: 22 },
  { mes: "Mes 7", ingresos: 168, egresos: 18 }, { mes: "Mes 8", ingresos: 110, egresos: 18 },
];

function Page() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Análisis de crédito</h1>
        <p className="text-sm text-muted-foreground">Evaluación financiera y de riesgo · SOL-2025-0142 · Coop. Cafetalera La Esperanza</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="mb-4 font-semibold">Indicadores de evaluación</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { l: "Capacidad de pago", v: "82%", t: "success", d: "Holgada — flujo cubre 1.8x cuota" },
                { l: "Score interno", v: "782", t: "success", d: "Categoría A · Bajo riesgo" },
                { l: "Central de riesgo", v: "Categoría I", t: "success", d: "Sin reportes negativos" },
                { l: "Nivel de endeudamiento", v: "34%", t: "info", d: "Dentro del rango aceptable" },
                { l: "Riesgo climático", v: "Medio", t: "warning", d: "Zona susceptible a roya" },
                { l: "Riesgo de mercado", v: "Bajo", t: "success", d: "Café diferenciado · contrato fijo" },
              ].map((i,k) => {
                const tone: any = { success: "text-success bg-success/10 border-success/20", info: "text-info bg-info/10 border-info/20", warning: "text-warning-foreground bg-warning/10 border-warning/30" };
                return (
                  <div key={k} className={`rounded-lg border p-3 ${tone[i.t]}`}>
                    <p className="text-xs font-medium opacity-80">{i.l}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{i.v}</p>
                    <p className="mt-1 text-xs opacity-90">{i.d}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="mb-1 font-semibold">Proyección de flujo de caja</h3>
            <p className="mb-3 text-xs text-muted-foreground">Miles de Lempiras (L.) · 8 meses post-desembolso</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={FLUJO}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                  <XAxis dataKey="mes" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="ingresos" stroke="oklch(0.55 0.15 150)" strokeWidth={2.5} name="Ingresos" />
                  <Line type="monotone" dataKey="egresos" stroke="oklch(0.58 0.22 27)" strokeWidth={2.5} name="Egresos" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-card text-center">
            <h3 className="mb-3 font-semibold">Semáforo de riesgo</h3>
            <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-success/10">
              <div className="absolute inset-2 rounded-full border-8 border-success/30" />
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-7 w-7 text-success" />
                <p className="mt-1 text-xl font-bold text-success">BAJO</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold">Recomendación automática</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-md bg-success/10 px-2.5 py-1 text-xs font-bold text-success"><CheckCircle2 className="h-3 w-3" /> APROBAR CONDICIONADO</span>
            <p className="mt-3 text-xs text-muted-foreground">Monitoreo trimestral, cobertura de seguro climático sugerida.</p>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="mb-3 flex items-center gap-2 font-semibold"><Calculator className="h-4 w-4 text-primary" /> Calculadora agrícola</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Costo producción / Mz</span><span className="font-mono font-semibold">L. 38,500</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Rendimiento estimado</span><span className="font-mono font-semibold">22 qq/Mz</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Precio referencial</span><span className="font-mono font-semibold">L. 4,200/qq</span></div>
              <div className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Ingreso bruto / Mz</span><span className="font-mono font-semibold">L. 92,400</span></div>
              <div className="flex justify-between pt-1"><span className="font-semibold">Ganancia proyectada / Mz</span><span className="font-mono font-bold text-success">L. 53,900</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
