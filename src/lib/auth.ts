export type Role = "Administrador" | "Oficial de Crédito" | "Analista Financiero" | "Supervisor Regional";
export interface User { username: string; name: string; role: Role; initials: string; }

const USERS: Record<string, { password: string; user: User }> = {
  admin: { password: "Admin123", user: { username: "admin", name: "Carlos Mendoza", role: "Administrador", initials: "CM" } },
  oficial01: { password: "Credito123", user: { username: "oficial01", name: "María Fernández", role: "Oficial de Crédito", initials: "MF" } },
  analista01: { password: "Analisis123", user: { username: "analista01", name: "José Rodríguez", role: "Analista Financiero", initials: "JR" } },
  supervisor01: { password: "Supervisor123", user: { username: "supervisor01", name: "Ana Patricia Lara", role: "Supervisor Regional", initials: "AL" } },
};

const KEY = "banadesa_user";

export function login(u: string, p: string): { ok: true; user: User } | { ok: false; reason: "invalid" | "inactive" } {
  const rec = USERS[u.toLowerCase()];
  if (!rec) return { ok: false, reason: "invalid" };
  if (rec.password !== p) return { ok: false, reason: "invalid" };
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(rec.user));
  return { ok: true, user: rec.user };
}
export function logout() { if (typeof window !== "undefined") localStorage.removeItem(KEY); }
export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch { return null; }
}
