import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/authStore"
import { useSolicitudStore } from "../../store/solicitudStore"
import type { Solicitud } from "../../interfaces/Solicitud"
import LogoFamilia from "../../components/layout/LogoFamilia"

const estadoBadge = {
  pendiente: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  aceptada:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  rechazada: "bg-red-500/10 text-red-400 border border-red-500/20",
}

const urgenciaBadge = {
  baja:  "bg-slate-500/10 text-slate-400",
  media: "bg-amber-500/10 text-amber-400",
  alta:  "bg-red-500/10 text-red-400",
}

export default function DashboardFamilia() {
  const { usuario, cerrarSesion } = useAuthStore()
  const { solicitudes, cargando, cargarMisSolicitudes } = useSolicitudStore()
  const [detalle, setDetalle] = useState<Solicitud | null>(null)

  useEffect(() => {
  cargarMisSolicitudes()
}, [])

  const handleLogout = async () => {
    cerrarSesion()
    window.location.href = "/"
  }

  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length
  const aceptadas  = solicitudes.filter((s) => s.estado === "aceptada").length
  const rechazadas = solicitudes.filter((s) => s.estado === "rechazada").length

  const nombreMostrar = usuario?.nombre?.split(" ")[0]
    ? usuario.nombre!.split(" ")[0].charAt(0).toUpperCase() + usuario.nombre!.split(" ")[0].slice(1).toLowerCase()
    : ""

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <LogoFamilia variante="header" />
              <span className="text-sm font-semibold text-white">ConciliaEx</span>
            </Link>
            <span className="text-slate-700">·</span>
            <span className="text-sm text-slate-500">Mi panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/perfil"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-medium">
                {usuario?.nombre?.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-slate-400 hidden sm:block">{usuario?.nombre}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        {/* Título */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Hola, {nombreMostrar} 👋
            </h1>
            <p className="text-sm text-slate-500">
              Aquí puedes ver el estado de todas tus solicitudes
            </p>
          </div>
          <Link
            to="/#catalogo"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Buscar servicios
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pendientes", value: pendientes, color: "text-amber-400" },
            { label: "Aceptadas",  value: aceptadas,  color: "text-emerald-400" },
            { label: "Rechazadas", value: rechazadas, color: "text-red-400" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className={`text-2xl font-semibold mb-0.5 ${kpi.color}`}>{kpi.value}</div>
              <div className="text-sm text-slate-500">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Lista solicitudes */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300">Mis solicitudes</h2>
          <span className="text-xs text-slate-600">{solicitudes.length} en total</span>
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-600">Cargando solicitudes...</p>
          </div>
        ) : solicitudes.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm font-medium text-slate-400 mb-1">
              Aún no has enviado ninguna solicitud
            </p>
            <p className="text-xs text-slate-600 mb-5">
              Explora los servicios disponibles y solicita una plaza
            </p>
            <Link
              to="/#catalogo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              Ver servicios
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {solicitudes.map((s: Solicitud) => (
              <div
                key={s.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors cursor-pointer"
                onClick={() => setDetalle(s)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-white truncate">
                        {s.servicio?.nombre ?? "Servicio"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[s.estado]}`}>
                        {s.estado.charAt(0).toUpperCase() + s.estado.slice(1)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${urgenciaBadge[s.urgencia]}`}>
                        Urgencia {s.urgencia}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">
                      Familiar: <span className="text-slate-400">{s.nombre_familiar}</span>
                      {" · "}
                      {s.tipo_necesidad}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1">{s.mensaje}</p>
                  </div>
                  <span className="text-xs text-slate-600 shrink-0">
                    {new Date(s.created_at).toLocaleDateString("es-ES")}
                  </span>
                </div>

                {s.mensaje_respuesta && (
                  <div className="mt-3 pt-3 border-t border-slate-800">
                    <p className="text-xs text-slate-500 mb-1 font-medium">Respuesta de la entidad:</p>
                    <p className="text-xs text-slate-400">{s.mensaje_respuesta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal detalle */}
      {detalle && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          onClick={() => setDetalle(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Detalle de solicitud</h2>
              <button
                onClick={() => setDetalle(null)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Servicio</span>
                <span className="text-white font-medium">{detalle.servicio?.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estado</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[detalle.estado]}`}>
                  {detalle.estado.charAt(0).toUpperCase() + detalle.estado.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Familiar</span>
                <span className="text-white">{detalle.nombre_familiar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Necesidad</span>
                <span className="text-white">{detalle.tipo_necesidad}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgencia</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${urgenciaBadge[detalle.urgencia]}`}>
                  {detalle.urgencia.charAt(0).toUpperCase() + detalle.urgencia.slice(1)}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <p className="text-slate-500 mb-1.5">Mensaje enviado</p>
                <p className="text-slate-300 text-xs leading-relaxed">{detalle.mensaje}</p>
              </div>
              {detalle.mensaje_respuesta && (
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-slate-500 mb-1.5">Respuesta de la entidad</p>
                  <p className="text-slate-300 text-xs leading-relaxed">{detalle.mensaje_respuesta}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}