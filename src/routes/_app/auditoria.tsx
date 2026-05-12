import { createFileRoute } from "@tanstack/react-router";
import { ScrollText, Search } from "lucide-react";

export const Route = createFileRoute("/_app/auditoria")({ component: Page });

const LOGS = [
  { t: "10/05/25 09:14", u: "María Fernández", a: "APROBÓ", o: "SOL-2025-0141", ip: "186.143.21.18", lvl: "info" },
  { t: "10/05/25 08:42", u: "Sistema", a: "GENERÓ_ALERTA", o: "Mora — Coop. Frijolera", ip: "—", lvl: "warn" },
  { t: "10/05/25 08:30", u: "José Rodríguez", a: "FIRMÓ_DICTAMEN", o: "SOL-2025-0140", ip: "192.168.5.41", lvl: "info" },
  { t: "10/05/25 08:00", u: "Roberto Mejía", a: "INICIÓ_INSPECCIÓN", o: "INS-2025-0098", ip: "200.124.45.7", lvl: "info" },
  { t: "10/05/25 07:55", u: "Carlos Mendoza", a: "CREÓ_USUARIO", o: "tecnico03", ip: "190.115.184.22", lvl: "info" },
  { t: "10/05/25 07:21", u: "Sistema", a: "INTENTO_LOGIN_FALLIDO", o: "user: oficial99", ip: "45.231.12.4", lvl: "error" },
  { t: "09/05/25 18:42", u: "Ana P. Lara", a: "RECHAZÓ", o: "SOL-2025-0135", ip: "186.143.21.20", lvl: "warn" },
];

function Page() {
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold tracking-tight">Auditoría y bitácora</h1><p className="text-sm text-muted-foreground">Historial completo de eventos del sistema.</p></div>

      <div className="rounded-xl border bg-card shadow-card">
        <div className="flex items-center justify-between border-b p-3">
          <div className="relative w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar evento, usuario, IP…" className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><ScrollText className="h-4 w-4" /> 12,847 registros totales</div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-4 py-3 text-left font-semibold">Timestamp</th><th className="px-4 py-3 text-left font-semibold">Usuario</th><th className="px-4 py-3 text-left font-semibold">Acción</th><th className="px-4 py-3 text-left font-semibold">Objeto</th><th className="px-4 py-3 text-left font-semibold">IP</th><th className="px-4 py-3 text-left font-semibold">Nivel</th></tr>
          </thead>
          <tbody>
            {LOGS.map((l,i) => (
              <tr key={i} className="border-t hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs">{l.t}</td>
                <td className="px-4 py-3 text-xs font-medium">{l.u}</td>
                <td className="px-4 py-3"><span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold">{l.a}</span></td>
                <td className="px-4 py-3 font-mono text-xs">{l.o}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.ip}</td>
                <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${l.lvl==="info"?"bg-info/10 text-info":l.lvl==="warn"?"bg-warning/15 text-warning-foreground":"bg-destructive/10 text-destructive"}`}>{l.lvl.toUpperCase()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
