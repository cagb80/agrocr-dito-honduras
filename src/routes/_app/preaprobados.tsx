import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Sparkles, Search, FileDown, Send, Filter, TrendingUp, Target, Trophy, Banknote, CheckCircle2 } from "lucide-react";
import { CARTERA, CATEGORIAS, carteraStats, type Categoria } from "@/lib/cartera";
import { CategoryBadge } from "@/components/banadesa/CategoryBadge";
import { fmtLk } from "@/lib/demo-data";

export const Route = createFileRoute("/_app/preaprobados")({ component: Page });

const COLORS: Record<Categoria, string> = {
  A: "oklch(0.48 0.13 145)", B: "oklch(0.55 0.18 245)", C: "oklch(0.72 0.17 75)",
  D: "oklch(0.65 0.18 45)", E: "oklch(0.58 0.22 27)",
};

function Page() {
  const stats = useMemo(() => carteraStats(), []);
  const [q, setQ] = useState("");
  const [agencia, setAgencia] = useState<string>("TODAS");

  const agencias = useMemo(() => Array.from(new Set(stats.preAprobados.map(c => c.agencia))).sort(), [stats.preAprobados]);

  const filtrados = useMemo(() => stats.preAprobados.filter(c => {
    if (agencia !== "TODAS" && c.agencia !== agencia) return false;
    if (q && !(c.cliente.toLowerCase().includes(q.toLowerCase()) || c.dni.includes(q))) return false;
    return true;
  }), [stats.preAprobados, agencia, q]);

  const pieData = stats.byCat.map(c => ({ name: c.id, value: c.count, color: COLORS[c.id] }));

  // Conversión potencial — meta vs disponible
  const potencial = filtrados.reduce((a, c) => a + c.montoPreAprobado, 0);
  const liquidadosCount = filtrados.filter(c => c.liquidado).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Campañas de colocación
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Cartera pre-aprobada</h1>
          <p className="text-sm text-muted-foreground">Clientes Categoría A con comportamiento óptimo, listos para una nueva oferta de crédito.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/rendimiento" className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted">
            <Trophy className="h-4 w-4 text-primary" /> Ver metas de gestores
          </Link>
          <button className="inline-flex h-9 items-center gap-2 rounded-md bg-success px-3 text-sm font-semibold text-success-foreground hover:opacity-95">
            <Send className="h-4 w-4" /> Lanzar campaña
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={CheckCircle2} label="Clientes pre-aprobados" value={`${stats.preAprobados.length}`} hint={`${liquidadosCount} liquidaron su crédito`} tone="success" />
        <Kpi icon={Banknote} label="Monto potencial a colocar" value={`L. ${fmtLk(stats.montoPre)}`} hint="Suma de ofertas sugeridas" tone="primary" />
        <Kpi icon={Target} label="Categoría A (Excelente)" value={`${stats.byCat[0].count}`} hint={`${((stats.byCat[0].count / stats.total) * 100).toFixed(1)}% de la cartera`} tone="success" />
        <Kpi icon={TrendingUp} label="Conversión esperada" value="68%" hint="Histórico campañas previas" tone="info" />
      </div>

      {/* Distribución cartera + leyenda categorías */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="font-semibold">Clasificación de cartera</h3>
          <p className="mb-3 text-xs text-muted-foreground">Por días de atraso · {stats.total} clientes</p>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
          <h3 className="font-semibold">Reglas de clasificación automática</h3>
          <p className="mb-3 text-xs text-muted-foreground">El sistema reclasifica diariamente según el comportamiento de pago.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {stats.byCat.map(c => (
              <div key={c.id} className="flex items-center gap-3 rounded-lg border p-3">
                <CategoryBadge categoria={c.id} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium leading-tight">{c.desc}</p>
                  <p className="text-[11px] text-muted-foreground">{c.count} clientes · {((c.count / stats.total) * 100).toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
            <p className="font-semibold text-primary">Regla de pre-aprobación automática</p>
            <p className="mt-0.5 text-muted-foreground">Cliente Categoría A + ha pagado &gt; 50% de su crédito (o liquidado) → genera oferta del 110% si está al día, 120% si liquidó.</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-3 shadow-card">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar cliente o DNI…" className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select value={agencia} onChange={e => setAgencia(e.target.value)} className="h-9 rounded-md border bg-background px-3 text-sm outline-none">
            <option value="TODAS">Todas las agencias</option>
            {agencias.map(a => <option key={a} value={a}>Agencia {a}</option>)}
          </select>
        </div>
        <button className="ml-auto inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted">
          <FileDown className="h-4 w-4" /> Exportar
        </button>
      </div>

      {/* Tabla pre-aprobados */}
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="border-b px-5 py-3">
          <h3 className="font-semibold">Clientes aptos para oferta pre-aprobada</h3>
          <p className="text-xs text-muted-foreground">{filtrados.length} clientes · potencial L. {fmtLk(potencial)}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold">Cliente</th>
                <th className="px-4 py-2.5 text-left font-semibold">Categoría</th>
                <th className="px-4 py-2.5 text-left font-semibold">Rubro</th>
                <th className="px-4 py-2.5 text-left font-semibold">Agencia</th>
                <th className="px-4 py-2.5 text-right font-semibold">Monto anterior</th>
                <th className="px-4 py-2.5 text-right font-semibold">% pagado</th>
                <th className="px-4 py-2.5 text-right font-semibold">Pre-aprobado</th>
                <th className="px-4 py-2.5 text-center font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.dni} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {c.cliente.split(" ").slice(0,2).map(w => w[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate max-w-[220px]">{c.cliente}</div>
                        <div className="text-[11px] text-muted-foreground">{c.dni}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2.5"><CategoryBadge categoria={c.categoria} /></td>
                  <td className="px-4 py-2.5 text-xs">{c.rubro}</td>
                  <td className="px-4 py-2.5"><span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">{c.agencia}</span></td>
                  <td className="px-4 py-2.5 text-right font-mono text-xs">{fmtLk(c.montoCredito)}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-success" style={{ width: `${c.pctPagado}%` }} />
                      </div>
                      <span className="text-xs font-semibold tabular-nums">{c.pctPagado}%</span>
                      {c.liquidado && <span className="rounded bg-success/10 px-1.5 py-0.5 text-[10px] font-bold text-success">LIQ</span>}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="font-mono text-sm font-bold text-primary">L. {fmtLk(c.montoPreAprobado)}</div>
                    <div className="text-[10px] text-muted-foreground">{c.liquidado ? "+20%" : "+10%"} sobre anterior</div>
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <Link
                      to="/solicitudes"
                      search={{ preDni: c.dni, monto: c.montoPreAprobado } as never}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-primary px-3 text-xs font-semibold text-primary-foreground shadow-card hover:shadow-elevated transition"
                    >
                      <Send className="h-3.5 w-3.5" /> Ofertar crédito
                    </Link>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">Sin clientes que coincidan con los filtros.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conexión con productividad */}
      <div className="rounded-xl border bg-gradient-to-br from-primary/5 to-success/5 p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Trophy className="h-5 w-5" /></div>
            <div>
              <h3 className="font-semibold">Conexión con metas de productividad</h3>
              <p className="text-xs text-muted-foreground">Las ofertas convertidas se acreditan automáticamente a las metas mensuales del gestor asignado.</p>
            </div>
          </div>
          <Link to="/rendimiento" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated">
            Ir al dashboard de rendimiento →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, hint, tone }: { icon: any; label: string; value: string; hint: string; tone: "primary" | "success" | "info" }) {
  const toneCls = tone === "success" ? "bg-success/10 text-success" : tone === "info" ? "bg-blue-500/10 text-blue-600" : "bg-primary/10 text-primary";
  return (
    <div className="rounded-xl border bg-card p-4 shadow-card">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneCls}`}><Icon className="h-4 w-4" /></div>
      <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}