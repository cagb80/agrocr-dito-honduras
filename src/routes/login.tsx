import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sprout, Lock, User as UserIcon, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import bg from "@/assets/login-bg.jpg";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState<{ type: "ok" | "err" | "warn"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    setTimeout(() => {
      const r = login(username, password);
      if (r.ok) {
        setMsg({ type: "ok", text: `Acceso concedido. Bienvenido, ${r.user.name}.` });
        setTimeout(() => navigate({ to: "/dashboard" }), 600);
      } else {
        setMsg({ type: "err", text: "Usuario o contraseña incorrectos." });
        setLoading(false);
      }
    }, 500);
  };

  const fill = (u: string, p: string) => { setUsername(u); setPassword(p); };

  return (
    <div className="relative flex min-h-screen w-full">
      <div className="relative hidden flex-1 lg:block">
        <img src={bg} alt="Cafetales hondureños" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
              <Sprout className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">BANADESA</p>
              <p className="text-xs uppercase tracking-widest text-white/70">República de Honduras</p>
            </div>
          </div>
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold leading-tight">Sistema Integral de Gestión de Crédito Agrícola y MIPYMES</h1>
            <p className="mt-4 text-base text-white/85">Plataforma institucional para la administración de créditos productivos, expedientes digitales y seguimiento de proyectos agrícolas en Honduras.</p>
            <div className="mt-8 flex items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Conexión cifrada</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Auditoría activa</div>
            </div>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} Banco Nacional de Desarrollo Agrícola — Tegucigalpa, Honduras</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-6 lg:w-[520px]">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary"><Sprout className="h-5 w-5 text-white" /></div>
            <div><p className="text-lg font-bold">BANADESA</p><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Sistema de Crédito</p></div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Acceso institucional</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Iniciar sesión</h2>
            <p className="mt-1 text-sm text-muted-foreground">Ingrese sus credenciales para continuar.</p>
          </div>

          {msg && (
            <div className={`mb-4 flex items-start gap-2 rounded-md border p-3 text-sm ${
              msg.type === "ok" ? "border-success/30 bg-success/10 text-success" :
              msg.type === "warn" ? "border-warning/30 bg-warning/10 text-warning-foreground" :
              "border-destructive/30 bg-destructive/10 text-destructive"
            }`}>
              {msg.type === "ok" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Usuario</label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username" placeholder="ej. oficial01" className="h-11 w-full rounded-md border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Contraseña</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} required type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" className="h-11 w-full rounded-md border bg-card pl-9 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-input accent-primary" />
                Recordarme
              </label>
              <a className="font-medium text-primary hover:underline" href="#">¿Olvidó su contraseña?</a>
            </div>

            <button type="submit" disabled={loading} className="h-11 w-full rounded-md bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-elevated transition hover:opacity-95 disabled:opacity-60">
              {loading ? "Verificando…" : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 rounded-lg border bg-muted/40 p-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Usuarios demo</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { u: "admin", p: "Admin123", r: "Administrador" },
                { u: "oficial01", p: "Credito123", r: "Oficial Crédito" },
                { u: "analista01", p: "Analisis123", r: "Analista" },
                { u: "supervisor01", p: "Supervisor123", r: "Supervisor" },
              ].map((d) => (
                <button key={d.u} type="button" onClick={() => fill(d.u, d.p)} className="flex flex-col items-start rounded border bg-card px-2 py-1.5 text-left hover:border-primary hover:bg-primary/5">
                  <span className="font-mono text-[11px] font-semibold text-foreground">{d.u}</span>
                  <span className="text-[10px] text-muted-foreground">{d.r}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
