import { useEffect, useRef, useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import { useLangStore } from "@/store/langStore"
import type { Servicio, TipoServicio } from "@/interfaces/Servicio"
import { useT } from "@/i18n/useT"
import { TIPOS_SERVICIO } from "@/lib/constants"


export default function Catalogo({ variante = "full" }: { variante?: "landing" | "full" }) {
  const { usuario } = useAuthStore()
  const { resultados, cargandoBusqueda, buscarServicios, incrementarVisitas } = useServicioStore()
  const { lang } = useLangStore()
  const navigate = useNavigate()
  const t = useT()

  const [nombre,    setNombre]    = useState("")
  const [tipo,      setTipo]      = useState<TipoServicio | "">("")
  const [ubicacion, setUbicacion] = useState("")
  const [detalle,   setDetalle]   = useState<Servicio | null>(null)

  // Carga inicial
  useEffect(() => { buscarServicios({}) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Búsqueda automática con debounce al escribir
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerBusqueda = (n: string, tp: TipoServicio | "", ub: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => buscarServicios({ nombre: n, tipo: tp, ubicacion: ub }), 400)
  }

  const handleNombre    = (v: string) => { setNombre(v); triggerBusqueda(v, tipo, ubicacion) }
  const handleTipo      = (v: TipoServicio | "") => { setTipo(v); triggerBusqueda(nombre, v, ubicacion) }
  const handleUbicacion = (v: string) => { setUbicacion(v); triggerBusqueda(nombre, tipo, v) }

  // Cerrar modal con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setDetalle(null) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault()
    buscarServicios({ nombre, tipo, ubicacion })
  }

  const serviciosAMostrar = useMemo(() => {
    if (variante === "full") return resultados
    // En landing mostramos 3 random
    return [...resultados].sort(() => 0.5 - Math.random()).slice(0, 3)
  }, [resultados, variante])

  const handleLimpiar = () => {
    setNombre("")
    setTipo("")
    setUbicacion("")
    buscarServicios({})
    if (debounceRef.current) clearTimeout(debounceRef.current)
  }

  // Abre el modal e incrementa visitas
  const handleVerDetalle = (s: Servicio) => {
    setDetalle(s)
    incrementarVisitas(s.id)
  }

  const handleSolicitar = (servicio: Servicio) => {
    if (!usuario) {
      navigate("/registro/familia")
      return
    }
    if (usuario.rol !== "familia") return
    navigate(`/solicitar/${servicio.id}`)
  }

  return (
    <section id="catalogo" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-emerald-500 tracking-widest uppercase mb-3">
              {t.catalogo.etiqueta}
            </p>
            <h2 className="text-4xl font-semibold text-foreground leading-tight">
              {t.catalogo.titulo}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs md:text-right leading-relaxed">
            {t.catalogo.descripcion}
          </p>
        </div>

        {/* Filtros */}
        {variante === "full" && (
          <form
            onSubmit={handleBuscar}
            className="bg-card border border-border rounded-2xl p-5 mb-8 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.catalogo.filtroNombre}</label>
              <input
                type="text"
                placeholder={t.catalogo.filtroNombrePlaceholder}
                value={nombre}
                onChange={(e) => handleNombre(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.catalogo.filtroTipo}</label>
              <select
                value={tipo}
                onChange={(e) => handleTipo(e.target.value as TipoServicio | "")}
                className="w-full h-9 px-3 rounded-lg border border-border bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              >
                <option value="">{t.catalogo.filtroTipoTodos}</option>
                {TIPOS_SERVICIO.map((tp) => <option key={tp}>{tp}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.catalogo.filtroUbicacion}</label>
              <input
                type="text"
                placeholder={t.catalogo.filtroUbicacionPlaceholder}
                value={ubicacion}
                onChange={(e) => handleUbicacion(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleLimpiar}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              {t.catalogo.limpiarFiltros}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              {t.catalogo.buscar}
            </button>
          </div>
        </form>
        )}

        {/* Resultados */}
        {cargandoBusqueda ? (
          <div className="text-center py-16">
            <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">{t.catalogo.buscando}</p>
          </div>
        ) : serviciosAMostrar.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <p className="text-sm font-medium text-foreground mb-1">{t.catalogo.sinResultados}</p>
            <p className="text-xs text-muted-foreground">{t.catalogo.sinResultadosSub}</p>
          </div>
        ) : (
          <>
            {variante === "full" && (
              <p className="text-xs text-muted-foreground mb-5">
                {t.catalogo.resultados(serviciosAMostrar.length)}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {serviciosAMostrar.map((s: Servicio) => (
                <div
                  key={s.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/30 hover:shadow-md transition-all duration-200 group flex flex-col"
                >
                  {/* Imagen */}
                  {s.imagen_url ? (
                    <img src={s.imagen_url} alt={s.nombre} className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-muted flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-20">
                        <rect x="3" y="3" width="34" height="34" rx="5" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 27l9-9 6 6 5-5 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="13" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-3">
                      <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium mb-2">
                        {s.tipo}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground leading-snug">
                        {s.nombre}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                      {s.descripcion}
                    </p>

                    <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mb-4">
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
                      {s.plazas !== null && (
                        <span className={`flex items-center gap-1.5 font-medium ${s.plazas === 0 ? "text-red-500" : "text-emerald-500"}`}>
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M1.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                          {s.plazas === 0
                            ? (lang === "es" ? "Sin plazas disponibles" : "No spots available")
                            : `${s.plazas} ${lang === "es" ? "plazas disponibles" : "spots available"}`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVerDetalle(s)}
                        className="flex-1 px-3 py-2 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
                      >
                        {t.catalogo.verDetalle}
                      </button>
                      <button
                        onClick={() => handleSolicitar(s)}
                        disabled={s.plazas === 0}
                        className="flex-1 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {t.catalogo.solicitarPlaza}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {variante === "landing" && (
              <div className="mt-10 text-center">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors shadow-sm hover:shadow"
                >
                  {lang === "es" ? "Explorar todos los servicios" : "Explore all services"}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}

        {/* CTA registro */}
        {!usuario && (
          <div className="mt-16 pt-12 border-t border-border flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {lang === "es" ? "¿Aún no tienes cuenta en ConciliaEx?" : "Don't have a ConciliaEx account yet?"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              {lang === "es" 
                ? "Únete a nuestra plataforma para encontrar o publicar servicios especializados en Extremadura."
                : "Join our platform to find or publish specialised services in Extremadura."}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/registro/familia"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                {lang === "es" ? "Registrarse como Familia" : "Register as Family"}
              </Link>
              <Link
                to="/registro/entidad"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-sm font-semibold transition-colors"
              >
                {t.catalogo.ctaEntidadBtn}
              </Link>
            </div>
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
            className="bg-card border border-border rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {detalle.imagen_url ? (
              <img src={detalle.imagen_url} alt={detalle.nombre} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 40 40" fill="none" className="opacity-20">
                  <rect x="3" y="3" width="34" height="34" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 27l9-9 6 6 5-5 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="13" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="text-lg font-semibold text-foreground">{detalle.nombre}</h2>
                <button
                  onClick={() => setDetalle(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-0.5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-medium mb-3">
                {detalle.tipo}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{detalle.descripcion}</p>
              <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4 mb-5">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="6" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  <span>{detalle.ubicacion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h.379a.5.5 0 01.464.314l.75 1.875a.5.5 0 01-.145.564l-.69.575a7.07 7.07 0 003.414 3.414l.575-.69a.5.5 0 01.564-.145l1.875.75a.5.5 0 01.314.464V8.5A1.5 1.5 0 018.5 10 6.5 6.5 0 012 3.5z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  <span>{detalle.telefono}</span>
                </div>
                {detalle.plazas !== null && (
                  <div className={`flex items-center gap-2 font-medium ${detalle.plazas === 0 ? "text-red-500" : "text-emerald-500"}`}>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M1.5 10.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span>
                      {detalle.plazas === 0
                        ? (lang === "es" ? "Sin plazas disponibles" : "No spots available")
                        : `${detalle.plazas} ${lang === "es" ? "plazas disponibles" : "spots available"}`}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => { setDetalle(null); handleSolicitar(detalle) }}
                disabled={detalle.plazas === 0}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {detalle.plazas === 0
                  ? (lang === "es" ? "Sin plazas disponibles" : "No spots available")
                  : t.catalogo.solicitarPlaza}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}