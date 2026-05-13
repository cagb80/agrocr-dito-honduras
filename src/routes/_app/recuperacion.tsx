import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Calendar, TrendingUp, AlertTriangle, RefreshCw, Gavel, FileText, Building2, Wallet, Phone, MapPin, Mail, Bell, ShieldCheck, Scale, FileSignature, ChevronRight, Download, Filter, Search, Plus, CircleDollarSign, Users2, Award, Clock, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { fmtL, fmtLk } from "@/lib/demo-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/_app/recuperacion")({ component: Page });

// ===== DEMO DATA =====
type EstadoCuota = "Pagado" | "Pendiente" | "Próximo" | "Vencido" | "Mora" | "Judicializado" | "Readecuado";

const CUOTAS: { id: string; cliente: string; credito: string; cuota: string; venc: string; monto: number; capital: number; interes: number; mora: number; estado: EstadoCuota; agencia: string; oficial: string; rubro: string; municipio: string; }[] = [
  { id: "C-001", cliente: "Coop. Cafetalera La Esperanza", credito: "CR-2024-0812", cuota: "12/36", venc: "2025-06-15", monto: 38500, capital: 28200, interes: 10300, mora: 0, estado: "Próximo", agencia: "Sta. Rosa de Copán", oficial: "M. Fernández", rubro: "Café", municipio: "Sta. Rosa de Copán" },
  { id: "C-002", cliente: "Ramón Antonio Posadas", credito: "CR-2024-0654", cuota: "9/60", venc: "2025-06-20", monto: 45200, capital: 31800, interes: 13400, mora: 0, estado: "Pendiente", agencia: "Juticalpa", oficial: "M. Fernández", rubro: "Ganadería", municipio: "Juticalpa" },
  { id: "C-003", cliente: "Avícola El Progreso", credito: "CR-2024-0421", cuota: "14/60", venc: "2025-05-28", monto: 62800, capital: 42100, interes: 18200, mora: 2500, estado: "Vencido", agencia: "El Progreso", oficial: "J. Rodríguez", rubro: "Avícola", municipio: "El Progreso" },
  { id: "C-004", cliente: "Coop. Frijolera del Sur", credito: "CR-2024-0198", cuota: "11/18", venc: "2025-04-30", monto: 32400, capital: 24800, interes: 7600, mora: 4850, estado: "Mora", agencia: "Danlí", oficial: "M. Fernández", rubro: "Frijol", municipio: "Danlí" },
  { id: "C-005", cliente: "Marta Lucía Pineda", credito: "CR-2024-0922", cuota: "8/24", venc: "2025-06-12", monto: 18200, capital: 14100, interes: 4100, mora: 0, estado: "Pagado", agencia: "La Esperanza", oficial: "M. Fernández", rubro: "Hortícola", municipio: "La Esperanza" },
  { id: "C-006", cliente: "Pedro Alfonso Madrid", credito: "CR-2023-0712", cuota: "10/12", venc: "2025-03-15", monto: 22800, capital: 18900, interes: 3900, mora: 8200, estado: "Judicializado", agencia: "Choluteca", oficial: "J. Rodríguez", rubro: "Maíz", municipio: "Choluteca" },
  { id: "C-007", cliente: "Inversiones Lenca MIPYME", credito: "CR-2024-1102", cuota: "5/36", venc: "2025-06-25", monto: 41800, capital: 29400, interes: 12400, mora: 0, estado: "Próximo", agencia: "Gracias", oficial: "J. Rodríguez", rubro: "MIPYME", municipio: "Gracias" },
  { id: "C-008", cliente: "Ganadera San Francisco", credito: "CR-2024-0388", cuota: "13/72", venc: "2025-05-10", monto: 58400, capital: 39200, interes: 19200, mora: 1850, estado: "Readecuado", agencia: "Catacamas", oficial: "M. Fernández", rubro: "Ganadería", municipio: "Catacamas" },
  { id: "C-009", cliente: "Palmas del Aguán S.A.", credito: "CR-2024-0091", cuota: "7/84", venc: "2025-06-18", monto: 92400, capital: 64200, interes: 28200, mora: 0, estado: "Pendiente", agencia: "Tocoa", oficial: "J. Rodríguez", rubro: "Palma", municipio: "Tocoa" },
  { id: "C-010", cliente: "AgroComayagua S. de R.L.", credito: "CR-2024-0501", cuota: "6/48", venc: "2025-05-22", monto: 71200, capital: 51400, interes: 19800, mora: 3200, estado: "Vencido", agencia: "Comayagua", oficial: "J. Rodríguez", rubro: "MIPYME", municipio: "Comayagua" },
];

const FLUJO_RECUP = [
  { mes: "Nov", recuperado: 18.2, mora: 6.4 }, { mes: "Dic", recuperado: 22.1, mora: 7.1 },
  { mes: "Ene", recuperado: 19.8, mora: 8.3 }, { mes: "Feb", recuperado: 24.6, mora: 7.8 },
  { mes: "Mar", recuperado: 28.2, mora: 6.9 }, { mes: "Abr", recuperado: 31.4, mora: 5.8 },
  { mes: "May", recuperado: 34.7, mora: 5.2 },
];

const RECUP_REGION = [
  { region: "Olancho", monto: 8.4 }, { region: "Copán", monto: 7.2 },
  { region: "Comayagua", monto: 5.8 }, { region: "Yoro", monto: 4.9 },
  { region: "Cortés", monto: 4.1 }, { region: "Intibucá", monto: 2.8 },
  { region: "Lempira", monto: 2.4 }, { region: "El Paraíso", monto: 1.9 },
];

const RECUP_RUBRO = [
  { name: "Café", value: 32, color: "var(--chart-1)" },
  { name: "Ganadería", value: 26, color: "var(--chart-2)" },
  { name: "MIPYME", value: 18, color: "var(--chart-3)" },
  { name: "Granos", value: 14, color: "var(--chart-4)" },
  { name: "Otros", value: 10, color: "var(--chart-5)" },
];

const ALERTAS_PAGO = [
  { tipo: "Cuota próxima a vencer", cliente: "Coop. Cafetalera La Esperanza", monto: 38500, dias: 3, prio: "media", canal: ["interno", "sms", "email"] },
  { tipo: "Pago vencido", cliente: "Avícola El Progreso", monto: 62800, dias: -8, prio: "alta", canal: ["interno", "sms"] },
  { tipo: "Cliente en mora", cliente: "Coop. Frijolera del Sur", monto: 37250, dias: -35, prio: "critica", canal: ["interno", "email"] },
  { tipo: "Riesgo alto incumplimiento", cliente: "AgroComayagua S. de R.L.", monto: 74400, dias: -12, prio: "alta", canal: ["interno"] },
  { tipo: "Garantía en riesgo", cliente: "Pedro Alfonso Madrid", monto: 31000, dias: -82, prio: "critica", canal: ["interno", "email"] },
  { tipo: "Cuota próxima a vencer", cliente: "Inversiones Lenca MIPYME", monto: 41800, dias: 7, prio: "baja", canal: ["interno", "sms"] },
];

const READECUACIONES = [
  { id: "READ-2025-018", cliente: "Ganadera San Francisco", tipo: "Ampliación de plazo", saldo: 1840000, plazoOrig: 72, plazoNvo: 96, tasa: 14.5, estado: "Aprobado", justif: "Pérdidas por sequía 2024", fecha: "2025-04-12" },
  { id: "READ-2025-017", cliente: "Coop. Frijolera del Sur", tipo: "Período de gracia", saldo: 480000, plazoOrig: 18, plazoNvo: 24, tasa: 13.8, estado: "En análisis", justif: "Pérdida de cosecha por roya", fecha: "2025-05-02" },
  { id: "READ-2025-016", cliente: "Avícola El Progreso", tipo: "Refinanciamiento parcial", saldo: 1620000, plazoOrig: 60, plazoNvo: 84, tasa: 15.2, estado: "Pendiente", justif: "Brote sanitario en plantel", fecha: "2025-05-08" },
  { id: "READ-2025-015", cliente: "Pedro Alfonso Madrid", tipo: "Consolidación de deuda", saldo: 285000, plazoOrig: 12, plazoNvo: 36, tasa: 16.0, estado: "Rechazado", justif: "Sin garantías suficientes", fecha: "2025-03-20" },
];

const MORA_DETALLE = [
  { cliente: "Coop. Frijolera del Sur", saldo: 480000, dias: 35, nivel: "Mora administrativa", contactos: 4, ultimoPago: "2025-04-30", compromiso: "10 Jun", riesgo: "alto" },
  { cliente: "AgroComayagua S. de R.L.", saldo: 1820000, dias: 12, nivel: "Mora temprana", contactos: 2, ultimoPago: "2025-05-22", compromiso: "08 Jun", riesgo: "medio" },
  { cliente: "Avícola El Progreso", saldo: 1620000, dias: 8, nivel: "Mora temprana", contactos: 1, ultimoPago: "2025-05-28", compromiso: "Pendiente", riesgo: "medio" },
  { cliente: "Pedro Alfonso Madrid", saldo: 285000, dias: 82, nivel: "Mora judicial", contactos: 9, ultimoPago: "2025-03-15", compromiso: "Vía judicial", riesgo: "critico" },
  { cliente: "Hortícolas del Valle", saldo: 320000, dias: 48, nivel: "Mora prejudicial", contactos: 6, ultimoPago: "2025-04-15", compromiso: "Negociando", riesgo: "alto" },
];

const GESTIONES_TIMELINE = [
  { fecha: "12 Jun 2025 14:30", tipo: "Llamada", gestor: "Carlos Mendoza", desc: "Cliente confirma pago parcial L. 15,000 el 15/06" },
  { fecha: "10 Jun 2025 10:15", tipo: "Visita", gestor: "Ana Lara", desc: "Visita en finca — situación climática adversa" },
  { fecha: "05 Jun 2025 09:00", tipo: "Carta", gestor: "Sistema", desc: "Envío automático carta de cobro Nº 3" },
  { fecha: "28 May 2025 16:45", tipo: "Email", gestor: "Carlos Mendoza", desc: "Recordatorio de cuota vencida con propuesta de readecuación" },
  { fecha: "20 May 2025 11:20", tipo: "SMS", gestor: "Sistema", desc: "Notificación automática de mora 7 días" },
];

const CASOS_LEGALES = [
  { exp: "EXP-2025-LEG-042", cliente: "Pedro Alfonso Madrid", saldo: 285000, juzgado: "Juzgado Civil de Choluteca", abogado: "Lic. Roberto Aguilar", fecha: "2025-04-10", etapa: "Sentencia", estado: "Judicial" },
  { exp: "EXP-2025-LEG-041", cliente: "Hortícolas del Valle", saldo: 320000, juzgado: "Juzgado Civil de La Esperanza", abogado: "Lic. Sandra Rivera", fecha: "2025-05-15", etapa: "Notificación", estado: "Prejudicial" },
  { exp: "EXP-2025-LEG-040", cliente: "Coop. Maicera Olanchana", saldo: 720000, juzgado: "Juzgado Civil de Juticalpa", abogado: "Lic. Roberto Aguilar", fecha: "2025-03-22", etapa: "Audiencia", estado: "Judicial" },
  { exp: "EXP-2025-LEG-039", cliente: "Tabacalera Copaneca", saldo: 1240000, juzgado: "Juzgado Civil de Sta. Rosa", abogado: "Lic. Sandra Rivera", fecha: "2025-02-08", etapa: "Ejecución de sentencia", estado: "Ejecución" },
];

const GARANTIAS = [
  { id: "GAR-001", cliente: "Pedro Alfonso Madrid", tipo: "Hipotecaria", valor: 480000, cobertura: 168, avaluo: "2024-08-12", estado: "En ejecución", riesgo: "alto" },
  { id: "GAR-002", cliente: "Hortícolas del Valle", tipo: "Prendaria", valor: 380000, cobertura: 119, avaluo: "2024-11-05", estado: "Iniciar ejecución", riesgo: "alto" },
  { id: "GAR-003", cliente: "Coop. Maicera Olanchana", tipo: "Hipotecaria", valor: 980000, cobertura: 136, avaluo: "2024-06-20", estado: "Recuperación parcial", riesgo: "medio" },
  { id: "GAR-004", cliente: "Tabacalera Copaneca", tipo: "Hipotecaria", valor: 1850000, cobertura: 149, avaluo: "2023-12-01", estado: "Adjudicada", riesgo: "bajo" },
  { id: "GAR-005", cliente: "Coop. Frijolera del Sur", tipo: "Fiduciaria", valor: 540000, cobertura: 113, avaluo: "2024-09-15", estado: "Vigente", riesgo: "medio" },
];

const TABS = ["Resumen", "Calendario", "Alertas", "Mora", "Readecuaciones", "Gestión admin.", "Legal", "Garantías"] as const;
type Tab = typeof TABS[number];

const estadoStyle: Record<EstadoCuota, string> = {
  "Pagado": "bg-success/10 text-success border-success/20",
  "Pendiente": "bg-info/10 text-info border-info/20",
  "Próximo": "bg-warning/15 text-warning-foreground border-warning/30",
  "Vencido": "bg-destructive/10 text-destructive border-destructive/20",
  "Mora": "bg-destructive/15 text-destructive border-destructive/30",
  "Judicializado": "bg-foreground/10 text-foreground border-foreground/20",
  "Readecuado": "bg-muted text-muted-foreground border-border",
};

function Page() {
  const [tab, setTab] = useState<Tab>("Resumen");
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Módulo 12</p>
          <h1 className="text-2xl font-bold tracking-tight">Recuperación y cobro</h1>
          <p className="text-sm text-muted-foreground">Gestión integral de cartera, mora, readecuaciones y ejecución de garantías.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-medium hover:bg-muted"><Download className="h-4 w-4" /> Exportar</button>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"><Plus className="h-4 w-4" /> Nueva gestión</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-lg border bg-card p-1 shadow-card">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${tab===t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{t}</button>
        ))}
      </div>

      {tab === "Resumen" && <Resumen />}
      {tab === "Calendario" && <Calendario />}
      {tab === "Alertas" && <Alertas />}
      {tab === "Mora" && <Mora />}
      {tab === "Readecuaciones" && <Readecuaciones />}
      {tab === "Gestión admin." && <GestionAdmin />}
      {tab === "Legal" && <Legal />}
      {tab === "Garantías" && <Garantias />}
    </div>
  );
}

/* =========================================================
   RESUMEN — Dashboard ejecutivo
   ========================================================= */
function Resumen() {
  const KPIS = [
    { l: "Recuperación del mes", v: fmtLk(34700000), d: "+18.2%", up: true, i: CircleDollarSign, t: "success" },
    { l: "Recuperación anual", v: fmtLk(178400000), d: "Meta 92%", up: true, i: TrendingUp, t: "primary" },
    { l: "Créditos en mora", v: "412", d: "+24 vs Abr", up: false, i: AlertTriangle, t: "destructive" },
    { l: "Mora total", v: fmtLk(28900000), d: "5.2% cartera", up: false, i: ArrowDownRight, t: "warning" },
    { l: "Procesos legales activos", v: "47", d: "8 nuevos", up: false, i: Gavel, t: "info" },
    { l: "Garantías en ejecución", v: "12", d: fmtLk(8400000), up: false, i: ShieldCheck, t: "primary" },
  ];
  const tone: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
    warning: "bg-warning/15 text-warning-foreground",
    info: "bg-info/10 text-info",
  };

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {KPIS.map((k, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone[k.t]}`}><k.i className="h-4 w-4" /></div>
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${k.up ? "text-success" : "text-destructive"}`}>
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{k.d}
              </span>
            </div>
            <p className="mt-3 text-xl font-bold tracking-tight">{k.v}</p>
            <p className="text-xs text-muted-foreground">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div><h3 className="font-semibold">Flujo mensual de recuperaciones</h3><p className="text-xs text-muted-foreground">Recuperado vs nueva mora (millones de L.)</p></div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Recuperado</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Mora</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={FLUJO_RECUP}>
              <defs>
                <linearGradient id="gRec" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} /><stop offset="95%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient>
                <linearGradient id="gMora" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.3} /><stop offset="95%" stopColor="var(--destructive)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="mes" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="recuperado" stroke="var(--primary)" fill="url(#gRec)" strokeWidth={2} />
              <Area type="monotone" dataKey="mora" stroke="var(--destructive)" fill="url(#gMora)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 font-semibold">Recuperación por rubro</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={RECUP_RUBRO} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {RECUP_RUBRO.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 space-y-1.5">
            {RECUP_RUBRO.map((r, i) => (
              <li key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: r.color }} />{r.name}</span>
                <span className="font-mono font-semibold">{r.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 font-semibold">Recuperación por región</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={RECUP_REGION} layout="vertical" margin={{ left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
              <YAxis type="category" dataKey="region" stroke="var(--muted-foreground)" fontSize={11} width={80} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={(v: number) => `L. ${v}M`} />
              <Bar dataKey="monto" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="mb-3 flex items-center gap-2 font-semibold"><Award className="h-4 w-4 text-primary" /> Ranking de gestores</h3>
            <ul className="space-y-2.5">
              {[
                { n: "Carlos Mendoza", agencia: "Tegucigalpa", rec: 4280000, casos: 38 },
                { n: "Ana Patricia Lara", agencia: "San Pedro Sula", rec: 3940000, casos: 32 },
                { n: "Roberto Aguilar", agencia: "La Ceiba", rec: 3210000, casos: 28 },
                { n: "Sandra Rivera", agencia: "Choluteca", rec: 2810000, casos: 24 },
              ].map((g, i) => (
                <li key={i} className="flex items-center justify-between gap-3 rounded-lg border bg-muted/20 p-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${i===0?"bg-warning text-warning-foreground":"bg-muted text-muted-foreground"}`}>{i+1}</div>
                    <div className="min-w-0"><p className="truncate text-sm font-semibold">{g.n}</p><p className="truncate text-[11px] text-muted-foreground">{g.agencia} · {g.casos} casos</p></div>
                  </div>
                  <span className="font-mono text-xs font-bold text-success">{fmtLk(g.rec)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          { l: "Cobrados hoy", v: fmtLk(1240000), c: "success" },
          { l: "Vencidos hoy", v: "8 cuotas", c: "destructive" },
          { l: "Pendiente del mes", v: fmtLk(12800000), c: "warning" },
          { l: "Cartera castigada", v: fmtLk(4200000), c: "muted" },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl border p-4 shadow-card ${s.c==="success"?"border-success/30 bg-success/5":s.c==="destructive"?"border-destructive/30 bg-destructive/5":s.c==="warning"?"border-warning/30 bg-warning/5":"bg-muted/30"}`}>
            <p className="text-xs font-medium text-muted-foreground">{s.l}</p>
            <p className="mt-1 text-xl font-bold tracking-tight">{s.v}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   CALENDARIO DE VENCIMIENTOS
   ========================================================= */
function Calendario() {
  const [estado, setEstado] = useState<string>("Todos");
  const [rubro, setRubro] = useState<string>("Todos");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => CUOTAS.filter(c =>
    (estado === "Todos" || c.estado === estado) &&
    (rubro === "Todos" || c.rubro === rubro) &&
    (q === "" || c.cliente.toLowerCase().includes(q.toLowerCase()) || c.credito.toLowerCase().includes(q.toLowerCase()))
  ), [estado, rubro, q]);

  // Mini calendar — current month June 2025
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const eventByDay = (d: number) => CUOTAS.filter(c => Number(c.venc.split("-")[2]) === d && c.venc.startsWith("2025-06"));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="rounded-xl border bg-card p-4 shadow-card">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Buscar</label>
            <div className="relative"><Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cliente o crédito…" className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" /></div>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</label>
            <select value={estado} onChange={e=>setEstado(e.target.value)} className="h-9 rounded-md border bg-background px-2 text-sm">
              {["Todos","Pagado","Pendiente","Próximo","Vencido","Mora","Judicializado","Readecuado"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Rubro</label>
            <select value={rubro} onChange={e=>setRubro(e.target.value)} className="h-9 rounded-md border bg-background px-2 text-sm">
              {["Todos","Café","Ganadería","Maíz","Frijol","Palma","MIPYME","Avícola","Hortícola"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-md border bg-card px-3 text-sm font-medium hover:bg-muted"><Filter className="h-4 w-4" /> Más filtros</button>
        </div>
      </div>

      {/* Mini calendar */}
      <div className="rounded-xl border bg-card p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold">Junio 2025 — Vencimientos</h3>
          <div className="flex flex-wrap gap-3 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Pagado</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> Próximo</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Vencido / Mora</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-muted-foreground" /> Readecuado</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-[11px]">
          {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(d => <div key={d} className="py-1 text-center font-semibold uppercase tracking-wider text-muted-foreground">{d}</div>)}
          {days.map(d => {
            const ev = eventByDay(d);
            const has = ev.length > 0;
            const dom = ev[0]?.estado;
            const cls = !has ? "bg-card" : dom==="Pagado" ? "bg-success/10 border-success/30" : dom==="Próximo" ? "bg-warning/15 border-warning/30" : dom==="Readecuado" ? "bg-muted border-border" : "bg-destructive/10 border-destructive/30";
            return (
              <div key={d} className={`min-h-[58px] rounded-md border p-1.5 ${cls}`}>
                <p className="font-mono text-xs font-bold">{d}</p>
                {has && <p className="mt-0.5 truncate text-[10px] font-medium">{ev.length} cuota{ev.length>1?"s":""}</p>}
                {has && <p className="truncate text-[10px] text-muted-foreground">{fmtLk(ev.reduce((s,e)=>s+e.monto,0))}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-xl border bg-card shadow-card">
        <div className="border-b p-4"><h3 className="font-semibold">Cuotas ({filtered.length})</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold">Vence</th>
                <th className="px-3 py-2.5 text-left font-semibold">Cliente</th>
                <th className="px-3 py-2.5 text-left font-semibold">Crédito · Cuota</th>
                <th className="px-3 py-2.5 text-right font-semibold">Capital</th>
                <th className="px-3 py-2.5 text-right font-semibold">Interés</th>
                <th className="px-3 py-2.5 text-right font-semibold">Mora</th>
                <th className="px-3 py-2.5 text-right font-semibold">Total</th>
                <th className="px-3 py-2.5 text-left font-semibold">Estado</th>
                <th className="px-3 py-2.5 text-left font-semibold">Oficial</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-t hover:bg-muted/30">
                  <td className="px-3 py-2.5 font-mono text-xs">{c.venc}</td>
                  <td className="px-3 py-2.5 font-medium">{c.cliente}<p className="text-[11px] text-muted-foreground">{c.municipio} · {c.rubro}</p></td>
                  <td className="px-3 py-2.5 font-mono text-xs">{c.credito}<p className="text-[11px] text-muted-foreground">Cuota {c.cuota}</p></td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs">{fmtLk(c.capital)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs">{fmtLk(c.interes)}</td>
                  <td className={`px-3 py-2.5 text-right font-mono text-xs font-semibold ${c.mora>0?"text-destructive":"text-muted-foreground"}`}>{c.mora>0?fmtLk(c.mora):"—"}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs font-bold">{fmtLk(c.monto+c.mora)}</td>
                  <td className="px-3 py-2.5"><span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${estadoStyle[c.estado]}`}>{c.estado}</span></td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground">{c.oficial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ALERTAS AUTOMÁTICAS DE PAGO
   ========================================================= */
function Alertas() {
  const prioStyle: Record<string, string> = {
    baja: "border-info/30 bg-info/5",
    media: "border-warning/30 bg-warning/5",
    alta: "border-destructive/30 bg-destructive/5",
    critica: "border-destructive bg-destructive/10",
  };
  const dot: Record<string, string> = { baja: "bg-info", media: "bg-warning", alta: "bg-destructive", critica: "bg-destructive animate-pulse" };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {ALERTAS_PAGO.map((a, i) => (
          <div key={i} className={`rounded-xl border p-4 shadow-card ${prioStyle[a.prio]}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${dot[a.prio]}`} />
                <div>
                  <p className="text-sm font-semibold">{a.tipo}</p>
                  <p className="text-xs text-muted-foreground">{a.cliente}</p>
                  <p className="mt-1 font-mono text-sm font-bold">{fmtLk(a.monto)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${a.prio==="critica"||a.prio==="alta"?"bg-destructive text-destructive-foreground":a.prio==="media"?"bg-warning text-warning-foreground":"bg-info text-info-foreground"}`}>{a.prio}</span>
                <p className="mt-1 text-[11px] text-muted-foreground">{a.dias < 0 ? `${Math.abs(a.dias)} días vencido` : `Vence en ${a.dias} días`}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t pt-2.5">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                {a.canal.includes("interno") && <span className="inline-flex items-center gap-1"><Bell className="h-3 w-3" /> Interno</span>}
                {a.canal.includes("sms") && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" /> SMS</span>}
                {a.canal.includes("email") && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" /> Correo</span>}
              </div>
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">Gestionar <ChevronRight className="h-3 w-3" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 font-semibold">Configuración de alertas</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { l: "Aviso de vencimiento", d: "7, 3 y 1 día antes" },
              { l: "Aviso de mora", d: "Días 1, 7, 15, 30" },
              { l: "Notificación judicial", d: "+90 días en mora" },
              { l: "Garantía en riesgo", d: "Cobertura < 120%" },
            ].map((c, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border bg-muted/20 p-2.5">
                <div><p className="text-sm font-medium">{c.l}</p><p className="text-[11px] text-muted-foreground">{c.d}</p></div>
                <button className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">ACTIVO</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-primary/10 to-info/10 p-5 shadow-card">
          <h3 className="mb-1 font-semibold">Resumen del día</h3>
          <p className="text-xs text-muted-foreground">Notificaciones enviadas hoy</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-card p-2"><p className="text-lg font-bold">128</p><p className="text-[10px] text-muted-foreground">SMS</p></div>
            <div className="rounded-md bg-card p-2"><p className="text-lg font-bold">94</p><p className="text-[10px] text-muted-foreground">Correos</p></div>
            <div className="rounded-md bg-card p-2"><p className="text-lg font-bold">47</p><p className="text-[10px] text-muted-foreground">Internos</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GESTIÓN DE MORA
   ========================================================= */
function Mora() {
  const riesgoColor: Record<string, string> = {
    medio: "bg-warning/15 text-warning-foreground",
    alto: "bg-destructive/10 text-destructive",
    critico: "bg-destructive text-destructive-foreground",
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { l: "Mora temprana", v: "187", d: "1-30 días", c: "warning" },
          { l: "Mora administrativa", v: "142", d: "31-60 días", c: "warning" },
          { l: "Mora prejudicial", v: "56", d: "61-90 días", c: "destructive" },
          { l: "Mora judicial", v: "27", d: "+90 días", c: "destructive" },
        ].map((k, i) => (
          <div key={i} className={`rounded-xl border p-4 shadow-card ${k.c==="destructive"?"border-destructive/30":"border-warning/30"}`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{k.v}</p>
            <p className="text-[11px] text-muted-foreground">{k.d}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card shadow-card lg:col-span-2">
          <div className="border-b p-4"><h3 className="font-semibold">Cartera en mora</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2.5 text-left font-semibold">Cliente</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Saldo</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Días</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Nivel</th>
                  <th className="px-3 py-2.5 text-center font-semibold">Contactos</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Compromiso</th>
                  <th className="px-3 py-2.5 text-left font-semibold">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {MORA_DETALLE.map((m, i) => (
                  <tr key={i} className="border-t hover:bg-muted/30">
                    <td className="px-3 py-3 font-medium">{m.cliente}<p className="text-[11px] text-muted-foreground">Último pago: {m.ultimoPago}</p></td>
                    <td className="px-3 py-3 text-right font-mono text-xs font-bold">{fmtLk(m.saldo)}</td>
                    <td className="px-3 py-3 text-center font-mono text-xs font-bold">{m.dias}</td>
                    <td className="px-3 py-3 text-xs">{m.nivel}</td>
                    <td className="px-3 py-3 text-center"><span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-semibold">{m.contactos}</span></td>
                    <td className="px-3 py-3 text-xs">{m.compromiso}</td>
                    <td className="px-3 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold uppercase ${riesgoColor[m.riesgo]}`}>{m.riesgo}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><Clock className="h-4 w-4 text-primary" /> Timeline de gestiones</h3>
          <p className="mb-3 text-xs text-muted-foreground">Coop. Frijolera del Sur</p>
          <ol className="relative space-y-3 border-l-2 border-border pl-4">
            {GESTIONES_TIMELINE.map((g, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[21px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-card bg-primary" />
                <p className="text-[11px] text-muted-foreground">{g.fecha}</p>
                <p className="text-sm font-semibold">{g.tipo} · <span className="text-muted-foreground font-normal">{g.gestor}</span></p>
                <p className="text-xs">{g.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   READECUACIONES
   ========================================================= */
function Readecuaciones() {
  const estadoStyle: Record<string, string> = {
    "Pendiente": "bg-info/10 text-info",
    "En análisis": "bg-warning/15 text-warning-foreground",
    "Aprobado": "bg-success/10 text-success",
    "Rechazado": "bg-destructive/10 text-destructive",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { l: "Solicitudes activas", v: "38", i: RefreshCw },
          { l: "Aprobadas mes", v: "14", i: CheckCircle2 },
          { l: "En análisis", v: "12", i: Clock },
          { l: "Saldo readecuado", v: fmtLk(8400000), i: Wallet },
        ].map((k, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><k.i className="h-4 w-4" /></div>
            <p className="mt-3 text-xl font-bold tracking-tight">{k.v}</p>
            <p className="text-xs text-muted-foreground">{k.l}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Solicitudes de readecuación</h3>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-95"><Plus className="h-3.5 w-3.5" /> Nueva readecuación</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold">Expediente</th>
                <th className="px-3 py-2.5 text-left font-semibold">Cliente</th>
                <th className="px-3 py-2.5 text-left font-semibold">Tipo</th>
                <th className="px-3 py-2.5 text-right font-semibold">Saldo</th>
                <th className="px-3 py-2.5 text-center font-semibold">Plazo</th>
                <th className="px-3 py-2.5 text-center font-semibold">Tasa</th>
                <th className="px-3 py-2.5 text-left font-semibold">Justificación</th>
                <th className="px-3 py-2.5 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {READECUACIONES.map(r => (
                <tr key={r.id} className="border-t hover:bg-muted/30">
                  <td className="px-3 py-3 font-mono text-xs">{r.id}<p className="text-[11px] text-muted-foreground">{r.fecha}</p></td>
                  <td className="px-3 py-3 font-medium">{r.cliente}</td>
                  <td className="px-3 py-3 text-xs">{r.tipo}</td>
                  <td className="px-3 py-3 text-right font-mono text-xs font-semibold">{fmtLk(r.saldo)}</td>
                  <td className="px-3 py-3 text-center font-mono text-xs">{r.plazoOrig}<span className="text-muted-foreground"> → </span><span className="font-bold">{r.plazoNvo}m</span></td>
                  <td className="px-3 py-3 text-center font-mono text-xs">{r.tasa}%</td>
                  <td className="px-3 py-3 max-w-[220px] text-xs text-muted-foreground">{r.justif}</td>
                  <td className="px-3 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${estadoStyle[r.estado]}`}>{r.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GESTIÓN ADMINISTRATIVA
   ========================================================= */
function GestionAdmin() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-xl border bg-card p-5 shadow-card lg:col-span-2">
        <h3 className="mb-3 font-semibold">Cartas de cobro generadas</h3>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-3 py-2.5 text-left font-semibold">Folio</th><th className="px-3 py-2.5 text-left font-semibold">Cliente</th><th className="px-3 py-2.5 text-left font-semibold">Tipo</th><th className="px-3 py-2.5 text-left font-semibold">Fecha</th><th className="px-3 py-2.5 text-left font-semibold">Estado</th></tr>
          </thead>
          <tbody>
            {[
              { f: "CC-2025-0421", c: "Coop. Frijolera del Sur", t: "Carta de cobro Nº 3", d: "12 Jun 2025", e: "Entregada" },
              { f: "CC-2025-0420", c: "Avícola El Progreso", t: "Carta de cobro Nº 1", d: "11 Jun 2025", e: "Enviada" },
              { f: "CC-2025-0419", c: "AgroComayagua S. de R.L.", t: "Carta de cobro Nº 2", d: "10 Jun 2025", e: "Entregada" },
              { f: "CC-2025-0418", c: "Hortícolas del Valle", t: "Notificación prejudicial", d: "08 Jun 2025", e: "Acuse recibido" },
              { f: "CC-2025-0417", c: "Pedro Alfonso Madrid", t: "Notificación judicial", d: "05 Jun 2025", e: "Entregada" },
            ].map((r, i) => (
              <tr key={i} className="border-t hover:bg-muted/30">
                <td className="px-3 py-2.5 font-mono text-xs">{r.f}</td>
                <td className="px-3 py-2.5 font-medium">{r.c}</td>
                <td className="px-3 py-2.5 text-xs">{r.t}</td>
                <td className="px-3 py-2.5 text-xs text-muted-foreground">{r.d}</td>
                <td className="px-3 py-2.5"><span className="inline-flex rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">{r.e}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex justify-end"><button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-95"><FileSignature className="h-3.5 w-3.5" /> Generar carta automática</button></div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-primary" /> Visitas programadas</h3>
          <ul className="space-y-2">
            {[
              { c: "Coop. Frijolera", g: "C. Mendoza", d: "Hoy 14:00" },
              { c: "Avícola El Progreso", g: "A. Lara", d: "Mañ. 09:30" },
              { c: "AgroComayagua", g: "C. Mendoza", d: "Vie. 11:00" },
            ].map((v, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border bg-muted/20 p-2.5">
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{v.c}</p><p className="text-[11px] text-muted-foreground">{v.g}</p></div>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">{v.d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><Users2 className="h-4 w-4 text-primary" /> Productividad</h3>
          <div className="space-y-3">
            {[
              { n: "C. Mendoza", rec: 4280000, casos: 38, pct: 92 },
              { n: "A. Lara", rec: 3940000, casos: 32, pct: 84 },
              { n: "R. Aguilar", rec: 3210000, casos: 28, pct: 76 },
            ].map((g, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-xs"><span className="font-semibold">{g.n}</span><span className="font-mono text-success">{fmtLk(g.rec)}</span></div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:`${g.pct}%`}} /></div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{g.casos} casos · {g.pct}% efectividad</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   GESTIÓN LEGAL
   ========================================================= */
function Legal() {
  const etapaStyle: Record<string, string> = {
    "Administrativo": "bg-info/10 text-info",
    "Prejudicial": "bg-warning/15 text-warning-foreground",
    "Judicial": "bg-destructive/10 text-destructive",
    "Sentencia": "bg-foreground/10 text-foreground",
    "Ejecución": "bg-primary/10 text-primary",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-5">
        {[
          { l: "Administrativo", v: "18" },
          { l: "Prejudicial", v: "23" },
          { l: "Judicial", v: "32" },
          { l: "Sentencia", v: "9" },
          { l: "Ejecución", v: "6" },
        ].map((k, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{k.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold">Expedientes legales</h3>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-95"><Plus className="h-3.5 w-3.5" /> Nuevo expediente</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold">Expediente</th>
                <th className="px-3 py-2.5 text-left font-semibold">Cliente</th>
                <th className="px-3 py-2.5 text-right font-semibold">Saldo</th>
                <th className="px-3 py-2.5 text-left font-semibold">Juzgado</th>
                <th className="px-3 py-2.5 text-left font-semibold">Abogado</th>
                <th className="px-3 py-2.5 text-left font-semibold">Fecha</th>
                <th className="px-3 py-2.5 text-left font-semibold">Etapa</th>
                <th className="px-3 py-2.5 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {CASOS_LEGALES.map(c => (
                <tr key={c.exp} className="border-t hover:bg-muted/30">
                  <td className="px-3 py-3 font-mono text-xs">{c.exp}</td>
                  <td className="px-3 py-3 font-medium">{c.cliente}</td>
                  <td className="px-3 py-3 text-right font-mono text-xs font-bold">{fmtLk(c.saldo)}</td>
                  <td className="px-3 py-3 text-xs">{c.juzgado}</td>
                  <td className="px-3 py-3 text-xs">{c.abogado}</td>
                  <td className="px-3 py-3 font-mono text-xs">{c.fecha}</td>
                  <td className="px-3 py-3 text-xs">{c.etapa}</td>
                  <td className="px-3 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${etapaStyle[c.estado]}`}>{c.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><Scale className="h-4 w-4 text-primary" /> Próximas audiencias</h3>
          <ul className="space-y-2.5">
            {[
              { c: "Pedro A. Madrid", j: "Juz. Civil Choluteca", d: "18 Jun 2025 · 09:00" },
              { c: "Coop. Maicera Olanchana", j: "Juz. Civil Juticalpa", d: "22 Jun 2025 · 14:30" },
              { c: "Hortícolas del Valle", j: "Juz. Civil La Esperanza", d: "25 Jun 2025 · 10:00" },
            ].map((a, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border bg-muted/20 p-3">
                <div><p className="text-sm font-semibold">{a.c}</p><p className="text-[11px] text-muted-foreground">{a.j}</p></div>
                <span className="rounded-md bg-warning/15 px-2 py-1 text-[11px] font-bold text-warning-foreground">{a.d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><FileText className="h-4 w-4 text-primary" /> Documentos judiciales</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Demanda ejecutiva — EXP-2025-LEG-042",
              "Sentencia primera instancia — EXP-2025-LEG-039",
              "Notificación de embargo — EXP-2025-LEG-040",
              "Acta de audiencia conciliatoria — EXP-2025-LEG-041",
            ].map((d, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border bg-muted/20 p-2.5">
                <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /><span className="text-xs">{d}</span></span>
                <button className="text-[11px] font-semibold text-primary hover:underline">Descargar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EJECUCIÓN DE GARANTÍAS
   ========================================================= */
function Garantias() {
  const tipoIcon: Record<string, any> = { "Hipotecaria": Building2, "Prendaria": ShieldCheck, "Fiduciaria": FileSignature };
  const riesgoColor: Record<string, string> = {
    bajo: "bg-success/10 text-success",
    medio: "bg-warning/15 text-warning-foreground",
    alto: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {[
          { l: "Garantías totales", v: "1,284", c: fmtLk(842000000) },
          { l: "En ejecución", v: "12", c: fmtLk(8400000) },
          { l: "Adjudicadas", v: "7", c: fmtLk(4200000) },
          { l: "Cobertura promedio", v: "138%", c: "Sobre saldo" },
        ].map((k, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k.l}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight">{k.v}</p>
            <p className="text-[11px] text-muted-foreground">{k.c}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {GARANTIAS.map(g => {
          const Icon = tipoIcon[g.tipo] || ShieldCheck;
          return (
            <div key={g.id} className="rounded-xl border bg-card p-5 shadow-card">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.tipo}</p><p className="font-mono text-[11px]">{g.id}</p></div>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${riesgoColor[g.riesgo]}`}>{g.riesgo}</span>
              </div>
              <p className="text-sm font-semibold">{g.cliente}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">{fmtLk(g.valor)}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3 text-xs">
                <div><p className="text-muted-foreground">Cobertura</p><p className="font-mono font-bold">{g.cobertura}%</p></div>
                <div><p className="text-muted-foreground">Avalúo</p><p className="font-mono">{g.avaluo}</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t pt-3">
                <span className="text-[11px] font-semibold">{g.estado}</span>
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">Ver proceso <ChevronRight className="h-3 w-3" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}