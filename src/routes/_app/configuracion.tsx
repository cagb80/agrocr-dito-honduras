import { createFileRoute } from "@tanstack/react-router";
import { Settings, Bell, Shield, Building2 } from "lucide-react";
export const Route = createFileRoute("/_app/configuracion")({ component: Page });

function Page() {
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-bold tracking-tight">Configuración</h1><p className="text-sm text-muted-foreground">Preferencias institucionales del sistema.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { i: Building2, t: "Datos institucionales", d: "Información oficial de BANADESA" },
          { i: Shield, t: "Seguridad y autenticación", d: "Políticas de contraseña y MFA" },
          { i: Bell, t: "Notificaciones", d: "Alertas y correos automáticos" },
          { i: Settings, t: "Parámetros operativos", d: "Tasas, plazos y comisiones" },
        ].map((c,i) => (
          <div key={i} className="cursor-pointer rounded-xl border bg-card p-5 shadow-card transition hover:shadow-elevated hover:border-primary">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><c.i className="h-5 w-5" /></div>
            <h3 className="mt-3 font-semibold">{c.t}</h3>
            <p className="text-xs text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
