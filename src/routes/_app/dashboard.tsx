import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown, FileCheck2, Clock, XCircle, AlertTriangle, Banknote, Sprout, ArrowRight, Bell, MapPin, FileWarning } from "lucide-react";
import { KPIS, DESEMBOLSOS_MENSUAL, CREDITOS_RUBRO, RIESGO_DATA, GEOGRAFICA, SOLICITUDES, ALERTAS, ACTIVIDAD, fmtLk } from "@/lib/demo-data";
import { StatusBadge } from "@/components/banadesa/StatusBadge";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

function Kpi({ label, value, delta, up, icon: Icon, tone = "primary" }: any) {
  const toneCls: any = { primary: "bg-primary/10 text-primary", success: "bg-success/10 text-success", warning: "bg-warning/15 text-warning-foreground", info: "bg-info/10 text-info", destructive: "bg-destructive/10 text-destructive", accent: "bg-accent/10 text-accent" };
  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneCls[tone]}`}><Icon className="h-5 w-5" /></div>
        {delta && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? "text-success" : "text-destructive"}`}>
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {delta}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Panel ejecutivo</p>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard institucional</h1>
          <p className="text-sm text-muted-foreground">Resumen operativo de la cartera de crédito agrícola y MIPYMES.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Período:</span> Mayo 2025 · <span className="text-success font-semibold">Datos en vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        <Kpi label="Créditos activos" value={KPIS.activos.toLocaleString("es-HN")} delta="+4.2%" up icon={Sprout} tone="primary" />
        <Kpi label="Aprobados (mes)" value={KPIS.aprobados} delta="+12%" up icon={FileCheck2} tone="success" />
        <Kpi label="Pendientes" value={KPIS.pendientes} delta="-3%" up icon={Clock} tone="warning" />
        <Kpi label="Rechazados" value={KPIS.rechazados} delta="-8%" up icon={XCircle} tone="destructive" />
        <Kpi label="Mora actual" value={`${KPIS.moraPct}%`} delta="-0.4 pp" up icon={AlertTriangle} tone="warning" />
        <Kpi label="Desembolso mes" value={`L. ${(KPIS.desembolsoMes/1e6).toFixed(1)}M`} delta="+8.7%" up icon={Banknote} tone="info" />
        <Kpi label="Proyectos activos" value={KPIS.proyectos.toLocaleString("es-HN")} delta="+2.1%" up icon={MapPin} tone="accent" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Desembolsos mensuales</h3>
              <p className="text-xs text-muted-foreground">Millones de Lempiras (L.) — últimos 7 meses</p>
            </div>
            <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">+8.7% vs mes anterior</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DESEMBOLSOS_MENSUAL}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.15 150)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.55 0.15 150)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="mes" stroke="oklch(0.48 0.02 240)" fontSize={12} />
                <YAxis stroke="oklch(0.48 0.02 240)" fontSize={12} tickFormatter={(v) => `L${v}M`} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.92 0.01 240)", fontSize: 12 }} formatter={(v: any) => [`L. ${v}M`, "Desembolso"]} />
                <Area type="monotone" dataKey="monto" stroke="oklch(0.48 0.13 145)" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-1 font-semibold">Créditos por rubro</h3>
          <p className="mb-3 text-xs text-muted-foreground">Distribución de la cartera</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CREDITOS_RUBRO} dataKey="value" nameKey="rubro" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {CREDITOS_RUBRO.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5">
            {CREDITOS_RUBRO.map((c) => (
              <li key={c.rubro} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: c.color }} /> {c.rubro}</span>
                <span className="font-semibold">{c.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-1 font-semibold">Riesgo crediticio</h3>
          <p className="mb-3 text-xs text-muted-foreground">Distribución mensual (%)</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RIESGO_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="mes" fontSize={12} stroke="oklch(0.48 0.02 240)" />
                <YAxis fontSize={12} stroke="oklch(0.48 0.02 240)" />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="bajo" stackId="a" fill="oklch(0.55 0.15 150)" name="Bajo" radius={[0,0,0,0]} />
                <Bar dataKey="medio" stackId="a" fill="oklch(0.72 0.16 75)" name="Medio" />
                <Bar dataKey="alto" stackId="a" fill="oklch(0.58 0.22 27)" name="Alto" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-1 font-semibold">Distribución geográfica</h3>
          <p className="mb-3 text-xs text-muted-foreground">Top departamentos por créditos activos</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GEOGRAFICA} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis type="number" fontSize={12} stroke="oklch(0.48 0.02 240)" />
                <YAxis type="category" dataKey="dpto" fontSize={11} stroke="oklch(0.48 0.02 240)" width={90} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="creditos" fill="oklch(0.42 0.12 250)" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card shadow-card lg:col-span-2">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">Solicitudes recientes</h3>
            <Link to="/solicitudes" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">Ver todas <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Folio</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Cliente</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Rubro</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Monto</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {SOLICITUDES.slice(0, 6).map((s) => (
                  <tr key={s.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-mono text-xs font-semibold">{s.id}</td>
                    <td className="px-4 py-2.5"><div className="font-medium">{s.cliente}</div><div className="text-xs text-muted-foreground">{s.municipio}, {s.departamento}</div></td>
                    <td className="px-4 py-2.5 text-xs">{s.rubro}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-xs font-semibold">{fmtLk(s.monto)}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={s.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card shadow-card">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="flex items-center gap-2 font-semibold"><Bell className="h-4 w-4 text-warning" /> Alertas</h3>
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">{ALERTAS.length}</span>
            </div>
            <ul className="divide-y">
              {ALERTAS.map((a, i) => (
                <li key={i} className="flex items-start gap-3 p-3 hover:bg-muted/30">
                  <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${a.nivel === "alta" ? "bg-destructive" : a.nivel === "media" ? "bg-warning" : "bg-info"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.titulo}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-card shadow-card">
            <div className="border-b p-4"><h3 className="flex items-center gap-2 font-semibold"><FileWarning className="h-4 w-4 text-accent" /> Actividad reciente</h3></div>
            <ul className="divide-y">
              {ACTIVIDAD.map((a, i) => (
                <li key={i} className="p-3">
                  <p className="text-sm"><span className="font-semibold">{a.user}</span> <span className="text-muted-foreground">{a.action}</span></p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
