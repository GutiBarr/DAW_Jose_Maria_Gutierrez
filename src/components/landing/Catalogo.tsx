import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import type { Servicio, TipoServicio } from "@/interfaces/Servicio"

const TIPOS: TipoServicio[] = [
  "Centro de Día",
  "Atención Temprana",
  "Actividades Ocupacionales",
  "Residencia",
  "Terapia Especializada",
  "Apoyo Familiar",
  "Empleo con Apoyo",
  "Respiro Familiar",
  "Otro",
]

export default function Catalogo() {
  const { usuario } = useAuthStore()
  const { resultados, cargandoBusqueda, buscarServicios } = useServicioStore()
  const navigate = useNavigate()

  const [nombre,    setNombre]    = useState("")
  const [tipo,      setTipo]      = useState<TipoServicio | "">("")
  const [ubicacion, setUbicacion] = useState("")
  const [detalle,   setDetalle]   = useState<Servicio | null>(null)

  useEffect(() => {
  buscarServicios({})
}, [])

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault()
    buscarServicios({ nombre, tipo, ubicacion })
  }

  const handleLimpiar = () => {
    setNombre("")
    setTipo("")
    setUbicacion("")
    buscarServicios({})
  }

  const handleSolicitar = (servicio: Servicio) => {
    if (!usuario) {
      navigate("/registro/familia")
      return
    }
    if (usuario.rol !== "familia") return
    // Aquí irá el flujo de solicitud — lo construimos en el siguiente paso
    navigate(`/solicitar/${servicio.id}`)
  }

  return (
    <section id="catalogo" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-3">
              Catálogo
            </p>
            <h2 className="text-4xl font-semibold text-white leading-tight">
              Servicios disponibles
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs md:text-right leading-relaxed">
            Todos los servicios están verificados y publicados por entidades colaboradoras de Extremadura.
          </p>
        </div>

        {/* Filtros */}
        <form
          onSubmit={handleBuscar}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Nombre</label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Tipo de servicio</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoServicio | "")}
                className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              >
                <option value="">Todos los tipos</option>
                {TIPOS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Ubicación</label>
              <input
                type="text"
                placeholder="Ciudad o provincia..."
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleLimpiar}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-3 py-1.5"
            >
              Limpiar filtros
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Resultados */}
        {cargandoBusqueda ? (
          <div className="text-center py-16">
            <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-500">Buscando servicios...</p>
          </div>
        ) : resultados.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm font-medium text-slate-400 mb-1">No se encontraron servicios</p>
            <p className="text-xs text-slate-600">Prueba a cambiar los filtros</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-600 mb-5">
              {resultados.length} servicio{resultados.length !== 1 ? "s" : ""} encontrado{resultados.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {resultados.map((s: Servicio) => (
                <div
                  key={s.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-200 group flex flex-col"
                >
                  {/* Imagen */}
                  {s.imagen_url ? (
                    <img
                      src={s.imagen_url}
                      alt={s.nombre}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-slate-800 flex items-center justify-center">
                      <span className="text-4xl opacity-40">🏥</span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium mb-2">
                        {s.tipo}
                      </span>
                      <h3 className="text-sm font-semibold text-white leading-snug">
                        {s.nombre}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-1">
                      {s.descripcion}
                    </p>

                    <div className="flex flex-col gap-1.5 text-xs text-slate-600 mb-4">
                      <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
                          <circle cx="6" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                        {s.ubicacion}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 3.5A1.5 1.5 0 013.5 2h.379a.5.5 0 01.464.314l.75 1.875a.5.5 0 01-.145.564l-.69.575a7.07 7.07 0 003.414 3.414l.575-.69a.5.5 0 01.564-.145l1.875.75a.5.5 0 01.314.464V8.5A1.5 1.5 0 018.5 10 6.5 6.5 0 012 3.5z" stroke="currentColor" strokeWidth="1.2"/>
                        </svg>
                        {s.telefono}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetalle(s)}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs font-medium transition-colors"
                      >
                        Ver detalle
                      </button>
                      <button
                        onClick={() => handleSolicitar(s)}
                        className="flex-1 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-medium transition-colors"
                      >
                        Solicitar plaza
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA registro */}
        {!usuario && (
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-4">
              ¿Eres una entidad y quieres publicar tus servicios?
            </p>
            <Link
              to="/registro/entidad"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Registrar mi entidad →
            </Link>
          </div>
        )}
      </div>

      {/* Modal detalle */}
      {detalle && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          onClick={() => setDetalle(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {detalle.imagen_url ? (
              <img src={detalle.imagen_url} alt={detalle.nombre} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-slate-800 flex items-center justify-center">
                <span className="text-5xl opacity-30">🏥</span>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-lg font-semibold text-white">{detalle.nombre}</h2>
                <button
                  onClick={() => setDetalle(null)}
                  className="text-slate-500 hover:text-white transition-colors shrink-0 mt-0.5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium mb-3">
                {detalle.tipo}
              </span>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{detalle.descripcion}</p>
              <div className="space-y-2 text-sm text-slate-500 border-t border-slate-800 pt-4 mb-5">
                <div className="flex items-center gap-2">
                  <span>📍</span><span>{detalle.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span><span>{detalle.telefono}</span>
                </div>
              </div>
              <button
                onClick={() => { setDetalle(null); handleSolicitar(detalle) }}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors"
              >
                Solicitar plaza
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}