import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useAdminStore } from "@/store/adminStore"
import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"
import LogoFamilia from "../../components/layout/LogoFamilia"
import { useThemeStore } from "@/store/themeStore"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"

type Pestaña = "usuarios" | "servicios"
const ROLES: RolUsuario[] = ["familia", "entidad", "admin"]

type AccionConfirm = {
  tipo: "eliminar-usuario" | "desactivar-usuario" | "eliminar-servicio"
  id: string
  nombre: string
}

export default function DashboardAdmin() {
  const { usuario, cerrarSesion } = useAuthStore()
  const {
    perfiles, servicios, cargando, error: adminError,
    cargarPerfiles, cambiarRol, toggleActivoUsuario, eliminarUsuario,
    cargarTodosServicios, eliminarServicio, toggleActivoServicio,
  } = useAdminStore()
  const { theme, toggleTheme } = useThemeStore()
  const { lang, toggleLang } = useLangStore()
  const t = useT()

  const [pestaña, setPestaña] = useState<Pestaña>("usuarios")
  const [confirm, setConfirm] = useState<AccionConfirm | null>(null)

  useEffect(() => {
    cargarPerfiles()
    cargarTodosServicios()
  }, [])

  const handleLogout = () => { cerrarSesion() }

  const totalFamilias  = perfiles.filter((p) => p.rol === "familia").length
  const totalEntidades = perfiles.filter((p) => p.rol === "entidad").length
  const totalActivos   = servicios.filter((s) => s.activo).length

  const thBtn = "w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"

  const handleConfirm = async () => {
    if (!confirm) return
    if (confirm.tipo === "eliminar-usuario")   await eliminarUsuario(confirm.id)
    if (confirm.tipo === "desactivar-usuario") await toggleActivoUsuario(confirm.id, false)
    if (confirm.tipo === "eliminar-servicio")  await eliminarServicio(confirm.id)
    setConfirm(null)
  }

  const modalConfig = confirm ? {
    "eliminar-usuario": {
      titulo:   lang === "es" ? "Eliminar cuenta" : "Delete account",
      desc:     lang === "es"
        ? `¿Estás seguro de que quieres eliminar la cuenta de "${confirm.nombre}"? Esta acción no se puede deshacer y eliminará también todos sus servicios.`
        : `Are you sure you want to delete "${confirm.nombre}"'s account? This action cannot be undone and will also delete all their services.`,
      btnColor: "bg-red-500 hover:bg-red-600 text-white",
      btnLabel: lang === "es" ? "Sí, eliminar" : "Yes, delete",
      iconColor: "bg-red-500/10",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-red-500">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    "desactivar-usuario": {
      titulo:   lang === "es" ? "Desactivar cuenta" : "Deactivate account",
      desc:     lang === "es"
        ? `¿Estás seguro de que quieres desactivar la cuenta de "${confirm.nombre}"? Sus servicios dejarán de aparecer en el catálogo.`
        : `Are you sure you want to deactivate "${confirm.nombre}"'s account? Their services will be hidden from the catalog.`,
      btnColor: "bg-amber-500 hover:bg-amber-600 text-white",
      btnLabel: lang === "es" ? "Sí, desactivar" : "Yes, deactivate",
      iconColor: "bg-amber-500/10",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber-500">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M12 8v5M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    "eliminar-servicio": {
      titulo:   lang === "es" ? "Eliminar servicio" : "Delete service",
      desc:     lang === "es"
        ? `¿Estás seguro de que quieres eliminar el servicio "${confirm.nombre}"? Esta acción no se puede deshacer.`
        : `Are you sure you want to delete the service "${confirm.nombre}"? This action cannot be undone.`,
      btnColor: "bg-red-500 hover:bg-red-600 text-white",
      btnLabel: lang === "es" ? "Sí, eliminar" : "Yes, delete",
      iconColor: "bg-red-500/10",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-red-500">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  }[confirm.tipo] : null

  return (
    <div className="min-h-screen bg-background">

      {/* ── MODAL DE CONFIRMACIÓN ── */}
      {confirm && modalConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setConfirm(null)} />
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-up">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${modalConfig.iconColor}`}>
              {modalConfig.icon}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{modalConfig.titulo}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{modalConfig.desc}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirm(null)}
                className="px-5 py-2.5 rounded-xl border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {lang === "es" ? "Cancelar" : "Cancel"}
              </button>
              <button
                onClick={handleConfirm}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm ${modalConfig.btnColor}`}
              >
                {modalConfig.btnLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border bg-card px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <LogoFamilia variante="header" />
              <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
            </Link>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-sm text-muted-foreground">{t.dashAdmin.titulo}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className={thBtn}>
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
            <button onClick={toggleLang} className="px-2 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors">
              {lang === "es" ? "EN" : "ES"}
            </button>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-medium border border-violet-500/20">
              Admin
            </span>
            <Link to="/perfil" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {usuario?.email}
            </Link>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {t.nav.salir}
            </button>
          </div>
        </div>
      </header>

      {/* Error banner */}
      {adminError && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-4">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-4 py-2.5 rounded-lg">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="flex-1">{adminError}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">{t.dashAdmin.titulo}</h1>
          <p className="text-sm text-muted-foreground">
            {lang === "es" ? "Gestiona usuarios y servicios de la plataforma" : "Manage platform users and services"}
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: t.dashAdmin.usuarios,  value: perfiles.length },
            { label: lang === "es" ? "Familias" : "Families", value: totalFamilias },
            { label: t.dashAdmin.entidades, value: totalEntidades },
            { label: t.dashAdmin.servicios, value: totalActivos },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card border border-border rounded-xl p-5">
              <div className="text-2xl font-semibold text-foreground mb-0.5">{kpi.value}</div>
              <div className="text-sm text-muted-foreground">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Pestañas */}
        <div className="flex gap-1 bg-card border border-border p-1 rounded-lg w-fit mb-6">
          {(["usuarios", "servicios"] as Pestaña[]).map((p) => (
            <button key={p} onClick={() => setPestaña(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pestaña === p ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "usuarios"
                ? `${t.dashAdmin.usuarios} (${perfiles.length})`
                : `${t.dashAdmin.servicios} (${servicios.length})`}
            </button>
          ))}
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
          </div>
        ) : pestaña === "usuarios" ? (

          /* ── TABLA USUARIOS ── */
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.dashAdmin.nombre}</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.dashAdmin.rol}</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.dashAdmin.estado}</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.dashAdmin.acciones}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {perfiles.map((p: Perfil) => (
                  <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-foreground truncate max-w-[200px] flex items-center gap-2">
                        {p.nombre ?? p.nombre_entidad ?? "—"}
                        {p.id === usuario?.id && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-500 border border-violet-500/20 font-medium">
                            {lang === "es" ? "Tú" : "You"}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{p.email}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={p.rol}
                        onChange={(e) => cambiarRol(p.id, e.target.value as RolUsuario)}
                        disabled={p.id === usuario?.id}
                        className="text-xs border border-border rounded-lg px-2 py-1 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {ROLES.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.activo
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.activo ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                        {p.activo ? t.dashAdmin.activo : t.dashAdmin.inactivo}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        {p.id !== usuario?.id && p.activo && (
                          <button
                            onClick={() => setConfirm({ tipo: "desactivar-usuario", id: p.id, nombre: p.nombre ?? p.nombre_entidad ?? p.email })}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/25 hover:border-amber-500/40 transition-colors"
                          >
                            {t.dashAdmin.desactivar}
                          </button>
                        )}
                        {p.id !== usuario?.id && !p.activo && (
                          <button
                            onClick={() => toggleActivoUsuario(p.id, true)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 hover:border-emerald-500/40 transition-colors"
                          >
                            {t.dashAdmin.activar}
                          </button>
                        )}
                        {p.id !== usuario?.id && (
                          <button
                            onClick={() => setConfirm({ tipo: "eliminar-usuario", id: p.id, nombre: p.nombre ?? p.nombre_entidad ?? p.email })}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 hover:border-red-500/40 transition-colors"
                          >
                            {lang === "es" ? "Eliminar" : "Delete"}
                          </button>
                        )}
                        {p.id === usuario?.id && (
                          <span className="text-xs text-muted-foreground/50 italic">
                            {lang === "es" ? "Tu cuenta" : "Your account"}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {perfiles.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">{t.dashAdmin.sinDatos}</p>
            )}
          </div>

        ) : (

          /* ── TABLA SERVICIOS ── */
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{lang === "es" ? "Servicio" : "Service"}</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{lang === "es" ? "Tipo" : "Type"}</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.dashAdmin.estado}</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.dashAdmin.acciones}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {servicios.map((s: Servicio) => (
                  <tr key={s.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-foreground truncate max-w-[200px]">{s.nombre}</div>
                      <div className="text-xs text-muted-foreground">📍 {s.ubicacion}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                        {s.tipo}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                        s.activo
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.activo ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                        {s.activo ? t.dashAdmin.activo : t.dashAdmin.inactivo}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleActivoServicio(s.id, !s.activo)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            s.activo
                              ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/25 hover:border-amber-500/40"
                              : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 hover:border-emerald-500/40"
                          }`}
                        >
                          {s.activo ? t.dashAdmin.desactivar : t.dashAdmin.activar}
                        </button>
                        <button
                          onClick={() => setConfirm({ tipo: "eliminar-servicio", id: s.id, nombre: s.nombre })}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 hover:border-red-500/40 transition-colors"
                        >
                          {lang === "es" ? "Eliminar" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {servicios.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">{t.dashAdmin.sinDatos}</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}