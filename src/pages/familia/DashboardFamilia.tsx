import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { usePerfilStore } from "@/store/perfilStore"
import type { Solicitud } from "@/interfaces/Solicitud"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useThemeStore } from "@/store/themeStore"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"

const estadoBadge = {
  pendiente: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  aceptada:  "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  rechazada: "bg-red-500/10 text-red-500 border border-red-500/20",
}

const urgenciaBadge = {
  baja:  "bg-muted text-muted-foreground",
  media: "bg-amber-500/10 text-amber-500",
  alta:  "bg-red-500/10 text-red-500",
}

export default function DashboardFamilia() {
  const { usuario, cerrarSesion } = useAuthStore()
  const { solicitudes, cargando, cargarMisSolicitudes } = useSolicitudStore()
  const { perfil, cargarPerfil } = usePerfilStore()
  const { theme, toggleTheme } = useThemeStore()
  const { lang, toggleLang } = useLangStore()
  const t = useT()
  const [detalle, setDetalle] = useState<Solicitud | null>(null)

  useEffect(() => {
    cargarMisSolicitudes()
    cargarPerfil()
  }, [])

  const nombreCompleto = perfil?.nombre ?? usuario?.nombre ?? ""
  const nombreMostrar = nombreCompleto.split(" ")[0]
    ? nombreCompleto.split(" ")[0].charAt(0).toUpperCase() + nombreCompleto.split(" ")[0].slice(1).toLowerCase()
    : ""

  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length
  const aceptadas  = solicitudes.filter((s) => s.estado === "aceptada").length
  const rechazadas = solicitudes.filter((s) => s.estado === "rechazada").length

  const estadoLabel = (estado: string) => {
    if (estado === "pendiente") return t.dashFamilia.pendienteLabel
    if (estado === "aceptada")  return t.dashFamilia.aceptadaLabel
    return t.dashFamilia.rechazadaLabel
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <LogoFamilia variante="header" />
              <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
            </Link>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-sm text-muted-foreground">{t.nav.miPanel}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <Link
              to="/perfil"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:border-border-strong transition-colors"
            >
              {perfil?.avatar_url ? (
                <img src={perfil.avatar_url} alt={nombreCompleto} className="w-5 h-5 rounded-full object-cover ring-1 ring-border" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-500 font-medium">
                  {nombreCompleto.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-xs text-muted-foreground hidden sm:block">{nombreCompleto}</span>
            </Link>
            <button
              onClick={() => cerrarSesion()}
              className="px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {t.nav.salir}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              {t.dashFamilia.bienvenido} {nombreMostrar} 👋
            </h1>
            <p className="text-sm text-muted-foreground">{t.dashFamilia.resumen}</p>
          </div>
          <a
            href="/#catalogo"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {t.dashFamilia.explorar}
          </a>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: t.dashFamilia.pendientes, value: pendientes, color: "text-amber-500" },
            { label: t.dashFamilia.aceptadas,  value: aceptadas,  color: "text-emerald-500" },
            { label: t.dashFamilia.rechazadas, value: rechazadas, color: "text-red-500" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-card border border-border rounded-xl p-5">
              <div className={`text-2xl font-semibold mb-0.5 ${kpi.color}`}>{kpi.value}</div>
              <div className="text-sm text-muted-foreground">{kpi.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">{t.dashFamilia.misSolicitudes}</h2>
          <span className="text-xs text-muted-foreground">{solicitudes.length} {t.dashFamilia.total}</span>
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">...</p>
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <p className="text-sm font-medium text-foreground mb-1">{t.dashFamilia.sinSolicitudes}</p>
            <p className="text-xs text-muted-foreground mb-5">{t.dashFamilia.sinSolicitudesSub}</p>
            <a href="/#catalogo" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors">
              {t.dashFamilia.explorar}
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {solicitudes.map((s: Solicitud) => (
              <div
                key={s.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => setDetalle(s)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-foreground truncate">
                        {s.servicio?.nombre ?? t.dashFamilia.servicio}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[s.estado]}`}>
                        {estadoLabel(s.estado)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgenciaBadge[s.urgencia]}`}>
                        {s.urgencia}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {s.nombre_familiar} · {s.tipo_necesidad}
                    </p>
                    <p className="text-xs text-muted-foreground/60 line-clamp-1">{s.mensaje}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/60 shrink-0">
                    {new Date(s.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES")}
                  </span>
                </div>
                {s.mensaje_respuesta && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">{t.dashFamilia.mensaje}:</p>
                    <p className="text-xs text-foreground/80">{s.mensaje_respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal detalle */}
      {detalle && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" onClick={() => setDetalle(null)}>
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">{t.dashFamilia.verDetalle}</h2>
              <button onClick={() => setDetalle(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.dashFamilia.servicio}</span>
                <span className="text-foreground font-medium">{detalle.servicio?.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.dashFamilia.estado}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[detalle.estado]}`}>
                  {estadoLabel(detalle.estado)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.dashFamilia.entidad}</span>
                <span className="text-foreground">{detalle.nombre_familiar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.dashFamilia.fecha}</span>
                <span className="text-foreground">{new Date(detalle.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES")}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-muted-foreground mb-1.5">{t.dashFamilia.mensaje}</p>
                <p className="text-foreground/80 text-xs leading-relaxed">{detalle.mensaje}</p>
              </div>
              {detalle.mensaje_respuesta && (
                <div className="pt-2 border-t border-border">
                  <p className="text-muted-foreground mb-1.5">{t.dashEntidad?.solicitudesRecibidas ?? "Respuesta"}</p>
                  <p className="text-foreground/80 text-xs leading-relaxed">{detalle.mensaje_respuesta}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}