import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, FileText, Users, Calculator, MapPin, ShieldCheck, Banknote, Activity, BarChart3, Settings, Shield, ScrollText, LogOut, Bell, Search, Gavel, Trophy, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { getUser, logout } from "@/lib/auth";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/solicitudes", label: "Solicitudes", icon: FileText },
  { to: "/clientes", label: "Clientes", icon: Users },
  { to: "/preaprobados", label: "Cartera pre-aprobada", icon: Sparkles },
  { to: "/analisis", label: "Análisis de crédito", icon: Calculator },
  { to: "/inspecciones", label: "Inspecciones de campo", icon: MapPin },
  { to: "/aprobaciones", label: "Aprobaciones", icon: ShieldCheck },
  { to: "/desembolsos", label: "Desembolsos", icon: Banknote },
  { to: "/seguimiento", label: "Seguimiento", icon: Activity },
  { to: "/recuperacion", label: "Recuperación y cobro", icon: Gavel },
  { to: "/reportes", label: "Reportes", icon: BarChart3 },
  { to: "/rendimiento", label: "Rendimiento", icon: Trophy },
  { to: "/administracion", label: "Administración", icon: Shield },
  { to: "/auditoria", label: "Auditoría", icon: ScrollText },
  { to: "/configuracion", label: "Configuración", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  useEffect(() => { if (!getUser()) navigate({ to: "/login" }); }, [navigate]);
  if (!user) return null;

  const handleLogout = () => { logout(); setUser(null); navigate({ to: "/login" }); };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <Logo light />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">Operación</p>
          <ul className="space-y-0.5">
            {NAV.map((n) => {
              const active = path === n.to || path.startsWith(n.to + "/");
              return (
                <li key={n.to}>
                  <Link to={n.to} className={cn(
                    "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                    active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}>
                    <n.icon className="h-4 w-4" />
                    <span>{n.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/50 p-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">{user.initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">{user.role}</p>
            </div>
            <button onClick={handleLogout} className="rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" title="Cerrar sesión">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-card/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <div className="md:hidden"><Logo compact /></div>
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Buscar cliente, solicitud, expediente…" className="h-9 w-80 rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative rounded-md border bg-card p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">7</span>
            </button>
            <div className="hidden md:flex items-center gap-2 rounded-md border bg-card px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">Sistema operativo</span>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
