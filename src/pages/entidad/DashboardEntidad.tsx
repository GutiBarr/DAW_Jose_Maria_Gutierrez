import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import type { Servicio, DatosCrearServicio, TipoServicio } from "@/interfaces/Servicio"
import type { Solicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"
import LogoFamilia from "../../components/layout/LogoFamilia"

const TIPOS: TipoServicio[] = [
  "Centro de Día", "Atención Temprana", "Actividades Ocupacionales",
  "Residencia", "Terapia Especializada", "Apoyo Familiar",
  "Empleo con Apoyo", "Respiro Familiar", "Otro",
]

const FORM_VACIO: DatosCrearServicio = {
  nombre: "", descripcion: "", tipo: "Centro de Día",
  ubicacion: "", telefono: "", imagen_url: "",
}

const estadoBadge = {
  pendiente: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  aceptada:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  rechazada: "bg-red-500/10 text-red-400 border border-red-500/20",
}

type Pestaña = "servicios" | "solicitudes"

export default function DashboardEntidad() {
  const { usuario, cerrarSesion } = useAuthStore()
  const {
    servicios, cargando: cargandoServicios,
    cargarMisServicios, crearServicio, eliminarServicio, toggleActivo, subirImagen,
  } = useServicioStore()
  const {
    solicitudes, cargando: cargandoSolicitudes,
    cargarSolicitudesEntidad, responderSolicitud,
  } = useSolicitudStore()

  const [pestaña, setPestaña]                 = useState<Pestaña>("servicios")
  const [mostrarForm, setMostrarForm]         = useState(false)
  const [form, setForm]                       = useState<DatosCrearServicio>(FORM_VACIO)
  const [archivoImagen, setArchivoImagen]     = useState<File | null>(null)
  const [previstaImagen, setPrevistaImagen]   = useState("")
  const [errorForm, setErrorForm]             = useState("")
  const [guardando, setGuardando]             = useState(false)
  const [confirmEliminar, setConfirmEliminar] = useState<string | null>(null)

  // Responder solicitud
  const [solicitudActiva, setSolicitudActiva] = useState<Solicitud | null>(null)
  const [respuesta, setRespuesta]             = useState({ estado: "aceptada" as "aceptada" | "rechazada", mensaje: "" })
  const [guardandoRespuesta, setGuardandoRespuesta] = useState(false)

  useEffect(() => {
  cargarMisServicios()
  cargarSolicitudesEntidad()
}, [])

  const handleLogout = () => {
    cerrarSesion()
    window.location.href = "/"
  }

  const setField = (k: keyof DatosCrearServicio, v: string) => {
    setForm({ ...form, [k]: v })
    setErrorForm("")
  }

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.descripcion || !form.ubicacion || !form.telefono) {
      setErrorForm("Rellena todos los campos obligatorios")
      return
    }
    setGuardando(true)
    let imagen_url = form.imagen_url
    if (archivoImagen && usuario?.id) {
      const { url, error } = await subirImagen(archivoImagen, usuario.id)
      if (error) { setErrorForm(error); setGuardando(false); return }
      imagen_url = url
    }
    const { error } = await crearServicio({ ...form, imagen_url })
    setGuardando(false)
    if (error) { setErrorForm(error); return }
    setForm(FORM_VACIO)
    setArchivoImagen(null)
    setPrevistaImagen("")
    setMostrarForm(false)
  }

  const handleResponder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!solicitudActiva || !respuesta.mensaje.trim()) return
    setGuardandoRespuesta(true)
    const datos: DatosResponderSolicitud = {
      estado: respuesta.estado,
      mensaje_respuesta: respuesta.mensaje,
    }
    await responderSolicitud(solicitudActiva.id, datos)
    setGuardandoRespuesta(false)
    setSolicitudActiva(null)
    setRespuesta({ estado: "aceptada", mensaje: "" })
  }

  const pendientes = solicitudes.filter((s) => s.estado === "pendiente").length

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
            <span className="text-sm text-slate-500">Panel de entidad</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/perfil"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-medium">
                {usuario?.nombreEntidad?.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-slate-400 hidden sm:block max-w-[120px] truncate">
                {usuario?.nombreEntidad}
              </span>
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
            <h1 className="text-2xl font-semibold text-white mb-1">{usuario?.nombreEntidad}</h1>
            <p className="text-sm text-slate-500">Gestiona tus servicios y solicitudes recibidas</p>
          </div>
          {pestaña === "servicios" && (
            <button
              onClick={() => { setMostrarForm(!mostrarForm); setErrorForm("") }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              {mostrarForm ? "Cancelar" : "+ Nuevo servicio"}
            </button>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Servicios",          value: servicios.length },
            { label: "Activos",            value: servicios.filter((s) => s.activo).length },
            { label: "Solicitudes totales", value: solicitudes.length },
            { label: "Pendientes",         value: pendientes, highlight: pendientes > 0 },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className={`text-2xl font-semibold mb-0.5 ${kpi.highlight ? "text-amber-400" : "text-white"}`}>
                {kpi.value}
              </div>
              <div className="text-sm text-slate-500">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Pestañas */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg w-fit mb-6">
          {(["servicios", "solicitudes"] as Pestaña[]).map((p) => (
            <button
              key={p}
              onClick={() => setPestaña(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize flex items-center gap-2 ${
                pestaña === p
                  ? "bg-slate-800 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {p === "solicitudes" ? "Solicitudes" : "Servicios"}
              {p === "solicitudes" && pendientes > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-semibold">
                  {pendientes}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── SERVICIOS ── */}
        {pestaña === "servicios" && (
          <>
            {/* Formulario */}
            {mostrarForm && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-semibold text-white mb-5">Nuevo servicio</h2>
                <form onSubmit={handleCrear} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "nombre", label: "Nombre *", placeholder: "Centro de Día San José", type: "text", field: "nombre" as keyof DatosCrearServicio },
                      { id: "ubicacion", label: "Ubicación *", placeholder: "Mérida, Badajoz", type: "text", field: "ubicacion" as keyof DatosCrearServicio },
                      { id: "telefono", label: "Teléfono *", placeholder: "924 000 000", type: "tel", field: "telefono" as keyof DatosCrearServicio },
                    ].map((f) => (
                      <div key={f.id} className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-500">{f.label}</label>
                        <input
                          type={f.type} placeholder={f.placeholder}
                          value={form[f.field] as string}
                          onChange={(e) => setField(f.field, e.target.value)}
                          className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-500">Tipo *</label>
                      <select
                        value={form.tipo}
                        onChange={(e) => setField("tipo", e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                      >
                        {TIPOS.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500">Descripción *</label>
                    <textarea
                      placeholder="Describe el servicio..."
                      value={form.descripcion}
                      onChange={(e) => setField("descripcion", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500">Imagen <span className="text-slate-600">(opcional)</span></label>
                    <input
                      type="file" accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setArchivoImagen(file)
                        setPrevistaImagen(URL.createObjectURL(file))
                      }}
                      className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
                    />
                    {previstaImagen && (
                      <div className="relative mt-2 w-full h-32 rounded-lg overflow-hidden border border-slate-700">
                        <img src={previstaImagen} alt="Vista previa" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => { setArchivoImagen(null); setPrevistaImagen("") }}
                          className="absolute top-2 right-2 bg-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white border border-slate-700 text-xs"
                        >✕</button>
                      </div>
                    )}
                  </div>

                  {errorForm && (
                    <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                      {errorForm}
                    </p>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setMostrarForm(false); setErrorForm("") }}
                      className="px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit" disabled={guardando}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {guardando ? "Guardando..." : "Publicar servicio"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lista servicios */}
            {cargandoServicios ? (
              <div className="text-center py-16">
                <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-600">Cargando...</p>
              </div>
            ) : servicios.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-sm font-medium text-slate-400 mb-1">Aún no tienes servicios publicados</p>
                <p className="text-xs text-slate-600">Pulsa "+ Nuevo servicio" para empezar</p>
              </div>
            ) : (
              <div className="space-y-3">
                {servicios.map((s: Servicio) => (
                  <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4 hover:border-slate-700 transition-colors">
                    {s.imagen_url && (
                      <img src={s.imagen_url} alt={s.nombre} className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-700" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-white truncate">{s.nombre}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          s.activo ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700 text-slate-400"
                        }`}>
                          {s.activo ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2 line-clamp-1">{s.descripcion}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                        <span>📍 {s.ubicacion}</span>
                        <span>🏷 {s.tipo}</span>
                        <span>👁 {s.visitas} visitas</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleActivo(s.id, !s.activo)}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs transition-colors"
                      >
                        {s.activo ? "Desactivar" : "Activar"}
                      </button>
                      {confirmEliminar === s.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => setConfirmEliminar(null)} className="px-2 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs">No</button>
                          <button onClick={async () => { await eliminarServicio(s.id); setConfirmEliminar(null) }} className="px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">Sí</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmEliminar(s.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-red-500/30 text-slate-500 hover:text-red-400 text-xs transition-colors"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── SOLICITUDES ── */}
        {pestaña === "solicitudes" && (
          <>
            {cargandoSolicitudes ? (
              <div className="text-center py-16">
                <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-600">Cargando...</p>
              </div>
            ) : solicitudes.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
                <p className="text-sm font-medium text-slate-400 mb-1">No hay solicitudes todavía</p>
                <p className="text-xs text-slate-600">Cuando las familias soliciten tus servicios aparecerán aquí</p>
              </div>
            ) : (
              <div className="space-y-3">
                {solicitudes.map((s: Solicitud) => (
                  <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-semibold text-white">{s.nombre_familiar}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[s.estado]}`}>
                            {s.estado.charAt(0).toUpperCase() + s.estado.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-1">
                          Servicio: <span className="text-slate-400">{s.servicio?.nombre}</span>
                          {" · "}{s.tipo_necesidad}
                          {" · "}Urgencia <span className="text-slate-400">{s.urgencia}</span>
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-2">{s.mensaje}</p>
                        {s.mensaje_respuesta && (
                          <p className="text-xs text-slate-500 mt-1">
                            Respuesta: <span className="text-slate-400">{s.mensaje_respuesta}</span>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-600">
                          {new Date(s.created_at).toLocaleDateString("es-ES")}
                        </span>
                        {s.estado === "pendiente" && (
                          <button
                            onClick={() => setSolicitudActiva(s)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition-colors"
                          >
                            Responder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal responder solicitud */}
      {solicitudActiva && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
          onClick={() => setSolicitudActiva(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">Responder solicitud</h2>
                <p className="text-xs text-slate-500 mt-0.5">De: {solicitudActiva.nombre_familiar}</p>
              </div>
              <button onClick={() => setSolicitudActiva(null)} className="text-slate-500 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="bg-slate-800 rounded-lg p-3 mb-5 text-xs text-slate-400">
              <p className="font-medium text-slate-300 mb-1">{solicitudActiva.servicio?.nombre}</p>
              <p>{solicitudActiva.mensaje}</p>
            </div>

            <form onSubmit={handleResponder} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {(["aceptada", "rechazada"] as const).map((e) => (
                  <button
                    key={e} type="button"
                    onClick={() => setRespuesta({ ...respuesta, estado: e })}
                    className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      respuesta.estado === e
                        ? e === "aceptada"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-red-500 bg-red-500/10 text-red-400"
                        : "border-slate-700 text-slate-500 hover:border-slate-600"
                    }`}
                  >
                    {e === "aceptada" ? "✓ Aceptar" : "✗ Rechazar"}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-500">Mensaje para la familia *</label>
                <textarea
                  placeholder="Explica tu decisión..."
                  value={respuesta.mensaje}
                  onChange={(e) => setRespuesta({ ...respuesta, mensaje: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit" disabled={guardandoRespuesta || !respuesta.mensaje.trim()}
                className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {guardandoRespuesta ? "Enviando..." : "Enviar respuesta"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}