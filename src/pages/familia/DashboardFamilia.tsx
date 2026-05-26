import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { usePerfilStore } from "@/store/perfilStore"
import type { Solicitud } from "@/interfaces/Solicitud"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"
import { estadoBadge, urgenciaBadge } from "@/lib/constants"
import { inputClass } from "@/lib/styles"
import { useSolicitudesFiltro } from "@/hooks/useSolicitudesFiltro"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import KpiCard from "@/components/dashboard/KpiCard"
import EmptyState from "@/components/dashboard/EmptyState"
import LoadingSpinner from "@/components/dashboard/LoadingSpinner"
import { SolicitudCardSkeleton } from "@/components/dashboard/Skeleton"
import Modal, { ModalHeader } from "@/components/dashboard/Modal"

export default function DashboardFamilia() {
  const { usuario } = useAuthStore()
  const { solicitudes, cargando, cargarMisSolicitudes } = useSolicitudStore()
  const { perfil, cargarPerfil } = usePerfilStore()
  const { lang } = useLangStore()
  const t = useT()
  const [detalle, setDetalle] = useState<Solicitud | null>(null)
  const { filtroEstado, setFiltroEstado, busqueda, setBusqueda, solicitudesFiltradas } = useSolicitudesFiltro(solicitudes)

  useEffect(() => {
    if (usuario?.id) {
      cargarMisSolicitudes()
      cargarPerfil()
    }
  }, [usuario?.id]) // eslint-disable-line react-hooks/exhaustive-deps

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
      <DashboardHeader subtitle={t.nav.miPanel} />

      <main className="max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-10">
        {/* Título + CTA */}
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
          <KpiCard label={t.dashFamilia.pendientes} value={pendientes} color="text-amber-500" />
          <KpiCard label={t.dashFamilia.aceptadas}  value={aceptadas}  color="text-emerald-500" />
          <KpiCard label={t.dashFamilia.rechazadas} value={rechazadas} color="text-red-500" />
        </div>

        {/* Cabecera lista y Filtros */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{t.dashFamilia.misSolicitudes}</h2>
            <span className="text-xs text-muted-foreground">{solicitudesFiltradas.length} {t.dashFamilia.total}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder={t.dashFamilia.buscar}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className={`${inputClass} sm:w-64`}
            />
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className={`${inputClass} sm:w-auto`}
            >
              <option value="todos">{t.dashFamilia.todosEstados}</option>
              <option value="pendiente">{t.dashFamilia.pendienteLabel}</option>
              <option value="aceptada">{t.dashFamilia.aceptadaLabel}</option>
              <option value="rechazada">{t.dashFamilia.rechazadaLabel}</option>
            </select>
          </div>
        </div>

        {/* Lista de solicitudes */}
        {cargando ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <SolicitudCardSkeleton key={i} />)}
          </div>
        ) : solicitudes.length === 0 ? (
          <EmptyState
            title={t.dashFamilia.sinSolicitudes}
            subtitle={t.dashFamilia.sinSolicitudesSub}
            action={
              <a href="/#catalogo" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors">
                {t.dashFamilia.explorar}
              </a>
            }
          />
        ) : solicitudesFiltradas.length === 0 ? (
          <EmptyState
            title={t.dashFamilia.noSolicitudes}
            subtitle={t.dashFamilia.noFiltros}
          />
        ) : (
          <div className="space-y-3">
            {solicitudesFiltradas.map((s: Solicitud) => (
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
        <Modal onClose={() => setDetalle(null)}>
          <ModalHeader title={t.dashFamilia.verDetalle} onClose={() => setDetalle(null)} />
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
              <span className="text-muted-foreground">{t.dashFamilia.familiar}</span>
              <span className="text-foreground">{detalle.nombre_familiar}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t.dashFamilia.fecha}</span>
              <span className="text-foreground">
                {new Date(detalle.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES")}
              </span>
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
        </Modal>
      )}
    </div>
  )
}
