import { SOLICITUDES, type Solicitud } from "./demo-data";

export type Categoria = "A" | "B" | "C" | "D" | "E";

export interface ClienteCartera {
  cliente: string;
  dni: string;
  rubro: string;
  municipio: string;
  departamento: string;
  oficial: string;
  agencia: string;
  montoCredito: number;
  plazoMeses: number;
  cuotasPagadas: number;
  pctPagado: number; // 0..100
  diasAtraso: number;
  categoria: Categoria;
  score: number;
  liquidado: boolean;
  preAprobado: boolean;
  montoPreAprobado: number;
  ultimoPago: string;
}

// Deterministic pseudo-random based on string hash — avoids SSR hydration mismatch
function seedFrom(key: string): number {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) { h ^= key.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}
function rand(seed: number, salt: number): number { return ((seed * 9301 + 49297 + salt * 233) % 233280) / 233280; }

const AGENCIA_BY_DPTO: Record<string, string> = {
  "Francisco Morazán": "TGU", Cortés: "SPS", Choluteca: "CHO", Comayagua: "CMY",
  Olancho: "JUT", Copán: "SRC", Yoro: "SPS", Intibucá: "CMY",
  Lempira: "SRC", "El Paraíso": "TGU", Colón: "SPS",
};

function classify(diasAtraso: number): Categoria {
  if (diasAtraso === 0) return "A";
  if (diasAtraso <= 30) return "B";
  if (diasAtraso <= 60) return "C";
  if (diasAtraso <= 90) return "D";
  return "E";
}

export const CATEGORIAS: { id: Categoria; label: string; desc: string; tone: string }[] = [
  { id: "A", label: "Excelente", desc: "0 días de atraso — Pagos a tiempo", tone: "bg-success/10 text-success border-success/30" },
  { id: "B", label: "Normal", desc: "1 a 30 días de atraso ocasional", tone: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
  { id: "C", label: "Riesgo bajo", desc: "31 a 60 días de atraso", tone: "bg-amber-500/10 text-amber-700 border-amber-500/30" },
  { id: "D", label: "Mora", desc: "61 a 90 días de atraso", tone: "bg-orange-500/10 text-orange-700 border-orange-500/30" },
  { id: "E", label: "Crítico", desc: "Más de 90 días — judicializable", tone: "bg-destructive/10 text-destructive border-destructive/30" },
];

export function categoriaTone(c: Categoria) { return CATEGORIAS.find(x => x.id === c)!.tone; }
export function categoriaLabel(c: Categoria) { return CATEGORIAS.find(x => x.id === c)!.label; }

function buildCliente(s: Solicitud): ClienteCartera {
  const seed = seedFrom(s.dni + s.id);
  // Cuotas pagadas (0..plazo)
  const cuotasPagadas = Math.floor(rand(seed, 1) * (s.plazo + 1));
  const pctPagado = Math.min(100, Math.round((cuotasPagadas / s.plazo) * 100));
  const liquidado = pctPagado >= 100;
  // Días de atraso — distribución sesgada hacia 0
  const r = rand(seed, 2);
  let diasAtraso = 0;
  if (r > 0.55 && r <= 0.78) diasAtraso = 1 + Math.floor(rand(seed,3) * 30);
  else if (r > 0.78 && r <= 0.9) diasAtraso = 31 + Math.floor(rand(seed,4) * 30);
  else if (r > 0.9 && r <= 0.96) diasAtraso = 61 + Math.floor(rand(seed,5) * 30);
  else if (r > 0.96) diasAtraso = 91 + Math.floor(rand(seed,6) * 120);
  if (liquidado) diasAtraso = 0;

  const categoria = classify(diasAtraso);
  const score = Math.round(420 + (1 - diasAtraso / 180) * 380 + rand(seed,7) * 30);

  // Pre-aprobado: Categoría A + (liquidado o pctPagado > 50%)
  const preAprobado = categoria === "A" && (liquidado || pctPagado > 50);
  const incremento = liquidado ? 1.20 : 1.10;
  const montoPreAprobado = preAprobado ? Math.round(s.monto * incremento / 1000) * 1000 : 0;

  // Último pago
  const daysAgo = diasAtraso + Math.floor(rand(seed,8) * 8);
  const d = new Date(); d.setDate(d.getDate() - daysAgo);
  const ultimoPago = d.toISOString().slice(0,10);

  return {
    cliente: s.cliente, dni: s.dni, rubro: s.rubro, municipio: s.municipio, departamento: s.departamento,
    oficial: s.oficial, agencia: AGENCIA_BY_DPTO[s.departamento] ?? "TGU",
    montoCredito: s.monto, plazoMeses: s.plazo, cuotasPagadas, pctPagado,
    diasAtraso, categoria, score, liquidado, preAprobado, montoPreAprobado, ultimoPago,
  };
}

// Dedupe by cliente — one cartera record por cliente
export const CARTERA: ClienteCartera[] = Array.from(
  new Map(SOLICITUDES.map(s => [s.cliente, buildCliente(s)])).values()
);

// Inyectamos algunos pre-aprobados garantizados para que la demo siempre muestre datos
const FORCE_PRE = ["Ramón Antonio Posadas", "Marta Lucía Pineda", "Palmas del Aguán S.A.", "Ganadera San Francisco"];
for (const c of CARTERA) {
  if (FORCE_PRE.includes(c.cliente)) {
    c.categoria = "A"; c.diasAtraso = 0;
    c.pctPagado = Math.max(c.pctPagado, 65);
    c.liquidado = c.pctPagado >= 100;
    c.preAprobado = true;
    const inc = c.liquidado ? 1.20 : 1.10;
    c.montoPreAprobado = Math.round(c.montoCredito * inc / 1000) * 1000;
    c.score = Math.max(c.score, 760);
  }
}

export function carteraStats() {
  const total = CARTERA.length;
  const byCat = CATEGORIAS.map(c => ({ ...c, count: CARTERA.filter(x => x.categoria === c.id).length }));
  const preAprobados = CARTERA.filter(c => c.preAprobado);
  const montoPre = preAprobados.reduce((a, c) => a + c.montoPreAprobado, 0);
  return { total, byCat, preAprobados, montoPre };
}

export function getClienteByDni(dni: string) {
  return CARTERA.find(c => c.dni === dni);
}