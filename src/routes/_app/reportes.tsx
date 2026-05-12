import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Legend } from "recharts";
import { FileDown, FileSpreadsheet } from "lucide-react";
import { GEOGRAFICA, CREDITOS_RUBRO } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/reportes")({ component: Page });

const MORA_REGION = [
  { region: "Norte", mora: 3.8 }, { region: "Sur", mora: 6.2 }, { region: "Oriente", mora: 4.1 },
  { region: "Occidente", mora: 5.4 }, { region: "Central", mora: 3.2 }, { region: "Litoral Atl.", mora: 4.7 },
];

function Page() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Reportes y analítica</h1><p className="text-sm text-muted-foreground">Informes ejecutivos exportables de la cartera institucional.</p></div>
        <div className="flex gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"><FileDown className="h-4 w-4" /> PDF</button>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-success px-3 text-sm font-semibold text-success-foreground hover:opacity-95"><FileSpreadsheet className="h-4 w-4" /> Excel</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Créditos por departamento", d: "1,560 créditos · 18 deptos" },
          { t: "Créditos por rubro", d: "Café lidera con 38%" },
          { t: "Mora por región", d: "Promedio 4.7%" },
          { t: "Productividad agrícola", d: "+12% vs 2024" },
          { t: "Cartera activa", d: "L. 4,840M" },
          { t: "Recuperación de cartera", d: "94.3%" },
        ].map((r,i) => (
          <div key={i} className="cursor-pointer rounded-xl border bg-card p-4 shadow-card transition hover:shadow-elevated hover:border-primary">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Reporte</p>
            <h3 className="mt-1 font-semibold">{r.t}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{r.d}</p>
            <div className="mt-3 flex gap-1">
              <button className="rounded-md bg-muted px-2 py-1 text-xs font-medium hover:bg-muted/80">Ver</button>
              <button className="rounded-md border px-2 py-1 text-xs font-medium hover:bg-muted">PDF</button>
              <button className="rounded-md border px-2 py-1 text-xs font-medium hover:bg-muted">Excel</button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-1 font-semibold">Créditos por departamento</h3>
          <p className="mb-3 text-xs text-muted-foreground">Top 8 — créditos activos</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GEOGRAFICA}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="dpto" fontSize={10} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="creditos" fill="oklch(0.48 0.13 145)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-1 font-semibold">Mora por región (%)</h3>
          <p className="mb-3 text-xs text-muted-foreground">Comparativa nacional</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MORA_REGION}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="region" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="mora" fill="oklch(0.58 0.22 27)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
