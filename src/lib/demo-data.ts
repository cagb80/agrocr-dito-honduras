export interface Solicitud {
  id: string;
  cliente: string;
  dni: string;
  rubro: string;
  monto: number;
  plazo: number;
  municipio: string;
  departamento: string;
  estado: "Pendiente" | "En revisión" | "En inspección" | "Aprobado" | "Rechazado" | "Desembolsado" | "En seguimiento";
  fecha: string;
  oficial: string;
  destino: string;
}

export const DEPARTAMENTOS = ["Atlántida", "Choluteca", "Colón", "Comayagua", "Copán", "Cortés", "El Paraíso", "Francisco Morazán", "Intibucá", "Islas de la Bahía", "La Paz", "Lempira", "Ocotepeque", "Olancho", "Santa Bárbara", "Valle", "Yoro", "Gracias a Dios"];
export const RUBROS = ["Café", "Ganadería", "Maíz", "Frijol", "Palma", "MIPYME", "Avícola", "Hortícola"];

export const SOLICITUDES: Solicitud[] = [
  { id: "SOL-2025-0142", cliente: "Coop. Cafetalera La Esperanza", dni: "0401-1980-04521", rubro: "Café", monto: 850000, plazo: 36, municipio: "Santa Rosa de Copán", departamento: "Copán", estado: "En revisión", fecha: "2025-05-08", oficial: "María Fernández", destino: "Renovación de cafetales" },
  { id: "SOL-2025-0141", cliente: "Ramón Antonio Posadas", dni: "1501-1975-00214", rubro: "Ganadería", monto: 1250000, plazo: 60, municipio: "Juticalpa", departamento: "Olancho", estado: "Aprobado", fecha: "2025-05-07", oficial: "María Fernández", destino: "Compra de ganado bovino" },
  { id: "SOL-2025-0140", cliente: "AgroComayagua S. de R.L.", dni: "0801-2018-00091", rubro: "MIPYME", monto: 2400000, plazo: 48, municipio: "Comayagua", departamento: "Comayagua", estado: "En inspección", fecha: "2025-05-06", oficial: "José Rodríguez", destino: "Capital de trabajo y maquinaria" },
  { id: "SOL-2025-0139", cliente: "Marta Lucía Pineda", dni: "0501-1982-03311", rubro: "Hortícola", monto: 320000, plazo: 24, municipio: "La Esperanza", departamento: "Intibucá", estado: "Desembolsado", fecha: "2025-05-04", oficial: "María Fernández", destino: "Siembra de papa" },
  { id: "SOL-2025-0138", cliente: "Avícola El Progreso", dni: "0501-2010-00455", rubro: "Avícola", monto: 1800000, plazo: 60, municipio: "El Progreso", departamento: "Yoro", estado: "En seguimiento", fecha: "2025-04-30", oficial: "José Rodríguez", destino: "Ampliación de galpones" },
  { id: "SOL-2025-0137", cliente: "Pedro Alfonso Madrid", dni: "1801-1968-00123", rubro: "Maíz", monto: 180000, plazo: 12, municipio: "Choluteca", departamento: "Choluteca", estado: "Pendiente", fecha: "2025-05-09", oficial: "María Fernández", destino: "Capital de trabajo siembra" },
  { id: "SOL-2025-0136", cliente: "Palmas del Aguán S.A.", dni: "0801-2005-00789", rubro: "Palma", monto: 4500000, plazo: 84, municipio: "Tocoa", departamento: "Colón", estado: "Aprobado", fecha: "2025-04-28", oficial: "José Rodríguez", destino: "Inversión fija - extracción" },
  { id: "SOL-2025-0135", cliente: "Coop. Frijolera del Sur", dni: "0601-2012-00321", rubro: "Frijol", monto: 540000, plazo: 18, municipio: "Danlí", departamento: "El Paraíso", estado: "Rechazado", fecha: "2025-04-25", oficial: "María Fernández", destino: "Capital de trabajo" },
  { id: "SOL-2025-0134", cliente: "Inversiones Lenca MIPYME", dni: "1301-2019-00088", rubro: "MIPYME", monto: 950000, plazo: 36, municipio: "Gracias", departamento: "Lempira", estado: "En revisión", fecha: "2025-05-05", oficial: "José Rodríguez", destino: "Equipamiento agroindustrial" },
  { id: "SOL-2025-0133", cliente: "Ganadera San Francisco", dni: "1501-2000-00712", rubro: "Ganadería", monto: 2100000, plazo: 72, municipio: "Catacamas", departamento: "Olancho", estado: "Desembolsado", fecha: "2025-04-20", oficial: "María Fernández", destino: "Mejoramiento genético" },
];

export const KPIS = {
  activos: 1842,
  aprobados: 156,
  pendientes: 87,
  rechazados: 23,
  moraPct: 4.7,
  desembolsoMes: 48750000,
  proyectos: 1284,
};

export const DESEMBOLSOS_MENSUAL = [
  { mes: "Nov", monto: 32.4 }, { mes: "Dic", monto: 38.1 },
  { mes: "Ene", monto: 28.9 }, { mes: "Feb", monto: 35.6 },
  { mes: "Mar", monto: 41.2 }, { mes: "Abr", monto: 44.8 },
  { mes: "May", monto: 48.7 },
];

export const CREDITOS_RUBRO = [
  { rubro: "Café", value: 38, color: "var(--chart-1)" },
  { rubro: "Ganadería", value: 24, color: "var(--chart-2)" },
  { rubro: "Granos básicos", value: 14, color: "var(--chart-3)" },
  { rubro: "MIPYME", value: 12, color: "var(--chart-4)" },
  { rubro: "Otros", value: 12, color: "var(--chart-5)" },
];

export const RIESGO_DATA = [
  { mes: "Nov", bajo: 68, medio: 24, alto: 8 },
  { mes: "Dic", bajo: 70, medio: 22, alto: 8 },
  { mes: "Ene", bajo: 66, medio: 26, alto: 8 },
  { mes: "Feb", bajo: 64, medio: 28, alto: 8 },
  { mes: "Mar", bajo: 67, medio: 26, alto: 7 },
  { mes: "Abr", bajo: 71, medio: 23, alto: 6 },
  { mes: "May", bajo: 73, medio: 22, alto: 5 },
];

export const GEOGRAFICA = [
  { dpto: "Olancho", creditos: 312 }, { dpto: "Copán", creditos: 268 },
  { dpto: "Comayagua", creditos: 224 }, { dpto: "Yoro", creditos: 198 },
  { dpto: "Cortés", creditos: 176 }, { dpto: "Intibucá", creditos: 142 },
  { dpto: "Lempira", creditos: 128 }, { dpto: "Choluteca", creditos: 112 },
];

export const ALERTAS = [
  { tipo: "mora", titulo: "Mora 30+ días", desc: "Coop. Frijolera del Sur — L. 24,500", nivel: "alta" },
  { tipo: "visita", titulo: "Visita de campo programada", desc: "Hoy 14:00 — Catacamas, Olancho", nivel: "media" },
  { tipo: "expediente", titulo: "Expediente incompleto", desc: "SOL-2025-0137 — falta croquis", nivel: "media" },
  { tipo: "pago", titulo: "Pago próximo a vencer", desc: "Avícola El Progreso — 3 días", nivel: "baja" },
];

export const ACTIVIDAD = [
  { user: "María Fernández", action: "aprobó solicitud SOL-2025-0141", time: "hace 12 min" },
  { user: "José Rodríguez", action: "completó análisis de SOL-2025-0140", time: "hace 38 min" },
  { user: "Ana Patricia Lara", action: "firmó dictamen de comité", time: "hace 1 h" },
  { user: "Sistema", action: "generó alerta de mora — Coop. Frijolera", time: "hace 2 h" },
  { user: "Carlos Mendoza", action: "creó usuario tecnico03", time: "hace 4 h" },
];

export const fmtL = (n: number) => "L. " + n.toLocaleString("es-HN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fmtLk = (n: number) => "L. " + n.toLocaleString("es-HN");
