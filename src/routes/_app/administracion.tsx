import { createFileRoute } from "@tanstack/react-router";
import { Plus, Shield, UserCog } from "lucide-react";

export const Route = createFileRoute("/_app/administracion")({ component: Page });

const USERS = [
  { u: "admin", n: "Carlos Mendoza", r: "Administrador", e: "activo", l: "hace 12 min" },
  { u: "oficial01", n: "María Fernández", r: "Oficial de Crédito", e: "activo", l: "hace 38 min" },
  { u: "analista01", n: "José Rodríguez", r: "Analista Financiero", e: "activo", l: "hace 1 h" },
  { u: "supervisor01", n: "Ana Patricia Lara", r: "Supervisor Regional", e: "activo", l: "hace 3 h" },
  { u: "tecnico02", n: "Roberto Mejía", r: "Técnico de Campo", e: "activo", l: "ayer" },
  { u: "comite01", n: "Junta Directiva", r: "Comité de Crédito", e: "inactivo", l: "hace 5 días" },
];

const ROLES = ["Administrador","Oficial de Crédito","Analista Financiero","Supervisor Regional","Técnico de Campo","Comité de Crédito"];

function Page() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold tracking-tight">Administración y seguridad</h1><p className="text-sm text-muted-foreground">Gestión de usuarios, roles y permisos.</p></div>
        <button className="inline-flex h-9 items-center gap-2 rounded-md bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-elevated"><Plus className="h-4 w-4" /> Nuevo usuario</button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border bg-card shadow-card lg:col-span-2">
          <div className="flex items-center gap-2 border-b p-4"><UserCog className="h-4 w-4 text-primary" /><h3 className="font-semibold">Usuarios del sistema</h3></div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-3 text-left font-semibold">Usuario</th><th className="px-4 py-3 text-left font-semibold">Rol</th><th className="px-4 py-3 text-left font-semibold">Estado</th><th className="px-4 py-3 text-left font-semibold">Último acceso</th></tr>
            </thead>
            <tbody>
              {USERS.map(u => (
                <tr key={u.u} className="border-t hover:bg-muted/30">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground">{u.n.split(" ").map(w=>w[0]).slice(0,2).join("")}</div><div><div className="font-medium">{u.n}</div><div className="font-mono text-xs text-muted-foreground">{u.u}</div></div></div></td>
                  <td className="px-4 py-3 text-xs">{u.r}</td>
                  <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${u.e==="activo"?"bg-success/10 text-success":"bg-muted text-muted-foreground"}`}>{u.e}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-card">
          <h3 className="mb-3 flex items-center gap-2 font-semibold"><Shield className="h-4 w-4 text-primary" /> Roles y permisos</h3>
          <ul className="space-y-2">
            {ROLES.map(r => (
              <li key={r} className="flex items-center justify-between rounded-lg border bg-muted/20 p-2.5">
                <span className="text-sm font-medium">{r}</span>
                <button className="text-xs font-semibold text-primary hover:underline">Editar →</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-card">
        <h3 className="mb-3 font-semibold">Control de sesiones activas</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { u: "Carlos Mendoza", ip: "190.115.184.22", d: "Tegucigalpa · Chrome / Win" },
            { u: "María Fernández", ip: "186.143.21.18", d: "Santa Rosa · Edge / Win" },
            { u: "Roberto Mejía", ip: "200.124.45.7", d: "Catacamas · Móvil iOS" },
          ].map((s,i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="flex items-center justify-between"><p className="text-sm font-semibold">{s.u}</p><span className="h-2 w-2 rounded-full bg-success animate-pulse" /></div>
              <p className="font-mono text-xs text-muted-foreground">{s.ip}</p>
              <p className="text-xs text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
