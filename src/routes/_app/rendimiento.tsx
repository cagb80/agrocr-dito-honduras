import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell, Legend, Line, LineChart } from "recharts";
import { Building2, Trophy, TrendingUp, Banknote, Users, Target, FileDown, FileSpreadsheet, Crown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { fmtLk } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/rendimiento")({ component: Page });

type Agencia = "GLOBAL" | "TGU" | "SPS" | "CHO" | "CMY" | "JUT" | "SRC";

const AGENCIAS: { id: Exclude<Agencia,"GLOBAL">; nombre: string; region: string }[] = [
  { id: "TGU", nombre: "Oficina Principal Tegucigalpa", region: "Central" },
  { id: "SPS", nombre: "Agencia San Pedro Sula", region: "Norte" },
  { id: "CHO", nombre: "Agencia Choluteca", region: "Sur" },
  { id: "CMY", nombre: "Agencia Comayagua", region: "Central" },
  { id: "JUT", nombre: "Agencia Juticalpa", region: "Oriente" },
  { id: "SRC", nombre: "Agencia Santa Rosa de Copán", region: "Occidente" },
];

interface Gestor {
  id: string; nombre: string; cargo: "Oficial de crédito" | "Gestor de cobro" | "Analista"; agencia: Exclude<Agencia,"GLOBAL">;
  // Créditos
  cGestionados: number; cAprobados: number; cRechazados: number; montoAprobado: number; montoRechazado: number;
  // Cobros
  recuperado: number; metaCobro: number; clientesContactados: number; promesasPago: number;
}

const GESTORES: Gestor[] = [
  { id: "U-014", nombre: "María Fernández", cargo: "Oficial de crédito", agencia: "TGU", cGestionados: 48, cAprobados: 39, cRechazados: 9, montoAprobado: 12450000, montoRechazado: 1850000, recuperado: 3420000, metaCobro: 3500000, clientesContactados: 142, promesasPago: 38 },
  { id: "U-022", nombre: "José Rodríguez", cargo: "Oficial de crédito", agencia: "SPS", cGestionados: 52, cAprobados: 41, cRechazados: 11, montoAprobado: 14820000, montoRechazado: 2240000, recuperado: 2980000, metaCobro: 3800000, clientesContactados: 128, promesasPago: 31 },
  { id: "U-031", nombre: "Ana Patricia Lara", cargo: "Analista", agencia: "TGU", cGestionados: 36, cAprobados: 30, cRechazados: 6, montoAprobado: 9840000, montoRechazado: 980000, recuperado: 1840000, metaCobro: 2200000, clientesContactados: 88, promesasPago: 24 },
  { id: "U-045", nombre: "Carlos Mendoza", cargo: "Gestor de cobro", agencia: "CHO", cGestionados: 28, cAprobados: 19, cRechazados: 9, montoAprobado: 4120000, montoRechazado: 1320000, recuperado: 4180000, metaCobro: 4000000, clientesContactados: 196, promesasPago: 71 },
  { id: "U-058", nombre: "Glenda Suazo", cargo: "Gestor de cobro", agencia: "CMY", cGestionados: 24, cAprobados: 17, cRechazados: 7, montoAprobado: 3680000, montoRechazado: 1140000, recuperado: 3920000, metaCobro: 3600000, clientesContactados: 178, promesasPago: 64 },
  { id: "U-061", nombre: "Roberto Padilla", cargo: "Oficial de crédito", agencia: "JUT", cGestionados: 44, cAprobados: 33, cRechazados: 11, montoAprobado: 10240000, montoRechazado: 2480000, recuperado: 2240000, metaCobro: 2800000, clientesContactados: 102, promesasPago: 27 },
  { id: "U-073", nombre: "Lourdes Maradiaga", cargo: "Gestor de cobro", agencia: "SRC", cGestionados: 19, cAprobados: 14, cRechazados: 5, montoAprobado: 2890000, montoRechazado: 720000, recuperado: 3460000, metaCobro: 3200000, clientesContactados: 164, promesasPago: 58 },
  { id: "U-088", nombre: "Walter Erazo", cargo: "Oficial de crédito", agencia: "SPS", cGestionados: 40, cAprobados: 28, cRechazados: 12, montoAprobado: 8420000, montoRechazado: 2960000, recuperado: 1980000, metaCobro: 2600000, clientesContactados: 96, promesasPago: 22 },
  { id: "U-094", nombre: "Iris Banegas", cargo: "Analista", agencia: "CMY", cGestionados: 32, cAprobados: 26, cRechazados: 6, montoAprobado: 7240000, montoRechazado: 880000, recuperado: 1620000, metaCobro: 1900000, clientesContactados: 74, promesasPago: 19 },
  { id: "U-102", nombre: "Mario Bustillo", cargo: "Gestor de cobro", agencia: "JUT", cGestionados: 22, cAprobados: 15, cRechazados: 7, montoAprobado: 3240000, montoRechazado: 1080000, recuperado: 3780000, metaCobro: 3500000, clientesContactados: 188, promesasPago: 69 },
];

const COLORS = ["oklch(0.48 0.13 145)", "oklch(0.42 0.14 245)", "oklch(0.62 0.18 50)", "oklch(0.58 0.22 27)", "oklch(0.55 0.15 290)", "oklch(0.65 0.14 180)"];

const TENDENCIA = [
  { mes: "Ene", colocado: 38.4, recuperado: 24.2 },
  { mes: "Feb", colocado: 41.8, recuperado: 25.9 },
  { mes: "Mar", colocado: 44.6, recuperado: 27.4 },
  { mes: "Abr", colocado: 48.2, recuperado: 28.6 },
  { mes: "May", colocado: 51.4, recuperado: 30.8 },
];

function Page() {
  const [agencia, setAgencia] = useState<Agencia>("GLOBAL");
  const [tab, setTab] = useState<"creditos" | "cobros">("creditos");
  const [periodo, setPeriodo] = useState("mes");

  const filtrados = useMemo(() => agencia === "GLOBAL" ? GESTORES : GESTORES.filter(g => g.agencia === agencia), [agencia]);

  const kpis = useMemo(() => {
    const totalColocado = filtrados.reduce((a, g) => a + g.montoAprobado, 0);
    const totalRecuperado = filtrados.reduce((a, g) => a + g.recuperado, 0);
    const totalMeta = filtrados.reduce((a, g) => a + g.metaCobro, 0);
    const totalAprobados = filtrados.reduce((a, g) => a + g.cAprobados, 0);
    const totalGestionados = filtrados.reduce((a, g) => a + g.cGestionados, 0);
    const conversion = totalGestionados ? (totalAprobados / totalGestionados) * 100 : 0;
    const cumplimiento = totalMeta ? (totalRecuperado / totalMeta) * 100 : 0;
    const topCredito = [...filtrados].sort((a,b) => b.montoAprobado - a.montoAprobado)[0];
    const topCobro = [...filtrados].sort((a,b) => (b.recuperado/b.metaCobro) - (a.recuperado/a.metaCobro))[0];
    return { totalColocado, totalRecuperado, totalMeta, conversion, cumplimiento, topCredito, topCobro, totalAprobados, totalGestionados };
  }, [filtrados]);

  const porAgencia = useMemo(() => AGENCIAS.map((a, i) => {
    const gs = GESTORES.filter(g => g.agencia === a.id);
    return {
      agencia: a.id, nombre: a.nombre, region: a.region,
      colocado: gs.reduce((s,g) => s + g.montoAprobado, 0),
      recuperado: gs.reduce((s,g) => s + g.recuperado, 0),
      color: COLORS[i % COLORS.length],
      gestores: gs.length,
    };
  }), []);

  const barData = useMemo(() => [...filtrados]
    .sort((a,b) => tab === "creditos" ? b.montoAprobado - a.montoAprobado : b.recuperado - a.recuperado)
    .slice(0, 8)
    .map(g => ({
      nombre: g.nombre.split(" ")[0] + " " + (g.nombre.split(" ")[1]?.[0] ?? "") + ".",
      Aprobado: +(g.montoAprobado / 1_000_000).toFixed(2),
      Rechazado: +(g.montoRechazado / 1_000_000).toFixed(2),
      Recuperado: +(g.recuperado / 1_000_000).toFixed(2),
      Meta: +(g.metaCobro / 1_000_000).toFixed(2),
    })), [filtrados, tab]);

  const pieData = useMemo(() => porAgencia.map(a => ({
    name: a.agencia, value: tab === "creditos" ? a.colocado : a.recuperado, color: a.color, nombre: a.nombre,
  })), [porAgencia, tab]);

  const isGlobal = agencia === "GLOBAL";
  const agenciaActiva = AGENCIAS.find(a => a.id === agencia);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Trophy className="h-3.5 w-3.5" /> Dashboard de rendimiento
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Reportes y productividad</h1>
          <p className="text-sm text-muted-foreground">Evaluación del rendimiento del equipo en créditos y cobros{isGlobal ? " — Vista consolidada Oficina Principal" : ` — ${agenciaActiva?.nombre}`}.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5">
            <Building2 className="h-4 w-4 text-primary" />
            <select value={agencia} onChange={(e) => setAgencia(e.target.value as Agencia)} className="bg-transparent text-sm font-medium outline-none">
              <option value="GLOBAL">🏛️ Global · Oficina Principal</option>
              {AGENCIAS.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="h-9 rounded-md border bg-card px-3 text-sm font-medium outline-none">
            <option value="mes">Mes actual</option>
            <option value="trim">Trimestre</option>
            <option value="ano">Año en curso</option>
          </select>
          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"><FileDown className="h-4 w-4" /> PDF</button>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-success px-3 text-sm font-semibold text-success-foreground hover:opacity-95"><FileSpreadsheet className="h-4 w-4" /> Excel</button>
        </div>
      </div>

      {isGlobal && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-xs">
          <span className="font-semibold text-primary">Vista de Gerencia General</span>
          <span className="ml-2 text-muted-foreground">consolidando datos de {AGENCIAS.length} agencias · {GESTORES.length} gestores activos</span>
        </div>
      )}

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Banknote} label="Total colocado" value={`L. ${fmtLk(Math.round(kpis.totalColocado))}`} hint={`${kpis.totalAprobados} créditos aprobados`} trend="+12.4%" up tone="primary" />
        <KpiCard icon={TrendingUp} label="Total recuperado" value={`L. ${fmtLk(Math.round(kpis.totalRecuperado))}`} hint={`${kpis.cumplimiento.toFixed(1)}% de la meta`} trend="+8.1%" up tone="success" />
        <KpiCard icon={Target} label="Tasa de conversión" value={`${kpis.conversion.toFixed(1)}%`} hint={`${kpis.totalAprobados}/${kpis.totalGestionados} solicitudes`} trend="+2.3%" up tone="info" />
        <GestorMesCard top={kpis[tab === "creditos" ? "topCredito" : "topCobro"]} tab={tab} />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-lg border bg-card p-1 w-fit shadow-card">
        {(["creditos", "cobros"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {t === "creditos" ? "Créditos" : "Cobros"}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Productividad por gestor</h3>
              <p className="text-xs text-muted-foreground">{tab === "creditos" ? "Montos aprobados vs rechazados (millones L.)" : "Recuperado vs meta (millones L.)"} · Top 8</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
                <XAxis dataKey="nombre" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `L. ${v}M`} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {tab === "creditos" ? (
                  <>
                    <Bar dataKey="Aprobado" fill="oklch(0.48 0.13 145)" radius={[4,4,0,0]} />
                    <Bar dataKey="Rechazado" fill="oklch(0.58 0.22 27)" radius={[4,4,0,0]} />
                  </>
                ) : (
                  <>
                    <Bar dataKey="Recuperado" fill="oklch(0.48 0.13 145)" radius={[4,4,0,0]} />
                    <Bar dataKey="Meta" fill="oklch(0.42 0.14 245)" radius={[4,4,0,0]} />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-semibold">Distribución por agencia</h3>
          <p className="mb-3 text-xs text-muted-foreground">{tab === "creditos" ? "Colocación" : "Recuperación"} total</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `L. ${fmtLk(v)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1 text-xs">
            {pieData.map(d => (
              <li key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} /> {d.name}</span>
                <span className="font-mono font-medium">L. {fmtLk(Math.round(d.value))}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tendencia */}
      <div className="rounded-xl border bg-card p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Tendencia de colocación vs recuperación</h3>
            <p className="text-xs text-muted-foreground">Últimos 5 meses · millones de lempiras</p>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TENDENCIA}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 240)" />
              <XAxis dataKey="mes" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `L. ${v}M`} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="colocado" name="Colocado" stroke="oklch(0.48 0.13 145)" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="recuperado" name="Recuperado" stroke="oklch(0.42 0.14 245)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla detallada */}
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div>
            <h3 className="font-semibold">Detalle por gestor</h3>
            <p className="text-xs text-muted-foreground">{filtrados.length} gestores · métricas de {tab === "creditos" ? "colocación" : "recuperación"}</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-xs font-medium hover:bg-muted"><FileDown className="h-3.5 w-3.5" /> PDF</button>
            <button className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-xs font-medium hover:bg-muted"><FileSpreadsheet className="h-3.5 w-3.5" /> CSV</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Gestor</th>
                <th className="px-4 py-2.5 text-left font-semibold">Agencia</th>
                <th className="px-4 py-2.5 text-left font-semibold">Cargo</th>
                {tab === "creditos" ? (
                  <>
                    <th className="px-4 py-2.5 text-right font-semibold">Gestionados</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Aprobados (L.)</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Rechazados (L.)</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Conversión</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-2.5 text-right font-semibold">Contactados</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Recuperado (L.)</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Meta (L.)</th>
                    <th className="px-4 py-2.5 text-right font-semibold">% Meta</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((g, idx) => {
                const conversion = g.cGestionados ? (g.cAprobados / g.cGestionados) * 100 : 0;
                const cumpl = g.metaCobro ? (g.recuperado / g.metaCobro) * 100 : 0;
                const ag = AGENCIAS.find(a => a.id === g.agencia)!;
                return (
                  <tr key={g.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{g.nombre.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                        <div>
                          <div className="font-medium">{g.nombre}</div>
                          <div className="text-[11px] text-muted-foreground">{g.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{ag.id}</span>
                      <span className="ml-1.5 text-xs text-muted-foreground">{ag.region}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{g.cargo}</td>
                    {tab === "creditos" ? (
                      <>
                        <td className="px-4 py-2.5 text-right font-mono">{g.cGestionados}</td>
                        <td className="px-4 py-2.5 text-right font-mono font-medium text-success">{fmtLk(g.montoAprobado)}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-destructive">{fmtLk(g.montoRechazado)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Pct value={conversion} good={70} mid={50} />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2.5 text-right font-mono">{g.clientesContactados}</td>
                        <td className="px-4 py-2.5 text-right font-mono font-medium text-success">{fmtLk(g.recuperado)}</td>
                        <td className="px-4 py-2.5 text-right font-mono text-muted-foreground">{fmtLk(g.metaCobro)}</td>
                        <td className="px-4 py-2.5 text-right">
                          <Pct value={cumpl} good={100} mid={80} />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, hint, trend, up, tone }: { icon: any; label: string; value: string; hint: string; trend: string; up: boolean; tone: "primary" | "success" | "info" }) {
  const toneCls = tone === "success" ? "bg-success/10 text-success" : tone === "info" ? "bg-blue-500/10 text-blue-600" : "bg-primary/10 text-primary";
  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneCls}`}><Icon className="h-4 w-4" /></div>
        <span className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${up ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend}
        </span>
      </div>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function GestorMesCard({ top, tab }: { top: Gestor; tab: "creditos" | "cobros" }) {
  const ag = AGENCIAS.find(a => a.id === top.agencia)!;
  return (
    <div className="rounded-xl border bg-gradient-to-br from-primary to-primary/80 p-4 text-primary-foreground shadow-elevated">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15"><Crown className="h-4 w-4" /></div>
        <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold">Gestor del mes</span>
      </div>
      <p className="mt-3 text-xs font-medium opacity-80">{tab === "creditos" ? "Mayor colocación" : "Mayor recuperación"}</p>
      <p className="mt-0.5 text-lg font-bold leading-tight">{top.nombre}</p>
      <p className="text-[11px] opacity-80">{ag.nombre} · {top.cargo}</p>
      <p className="mt-2 font-mono text-sm font-semibold">L. {fmtLk(tab === "creditos" ? top.montoAprobado : top.recuperado)}</p>
    </div>
  );
}

function Pct({ value, good, mid }: { value: number; good: number; mid: number }) {
  const tone = value >= good ? "text-success bg-success/10" : value >= mid ? "text-amber-600 bg-amber-500/10" : "text-destructive bg-destructive/10";
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${tone}`}>{value.toFixed(1)}%</span>;
}