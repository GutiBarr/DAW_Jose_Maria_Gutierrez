import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { usePerfilStore } from "@/store/perfilStore"
import type { Servicio, DatosCrearServicio, TipoServicio } from "@/interfaces/Servicio"
import type { Solicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"
import { TIPOS_SERVICIO } from "@/lib/constants"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import KpiCard from "@/components/dashboard/KpiCard"
import TabBar from "@/components/dashboard/TabBar"
import EmptyState from "@/components/dashboard/EmptyState"
import LoadingSpinner from "@/components/dashboard/LoadingSpinner"
import Modal, { ModalHeader } from "@/components/dashboard/Modal"

const FORM_VACIO: DatosCrearServicio = {
  nombre: "", descripcion: "", tipo: "Centro de Día",
  ubicacion: "", telefono: "", imagen_url: "", plazas: null,
}

const estadoBadge = {
  pendiente: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  aceptada:  "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  rechazada: "bg-red-500/10 text-red-500 border border-red-500/20",
}

type Pestaña = "servicios" | "solicitudes"

export default function DashboardEntidad() {
  const { usuario } = useAuthStore()
  const {
    servicios, cargando: cargandoServicios,
    cargarMisServicios, crearServicio, eliminarServicio, toggleActivo, subirImagen,
    actualizarServicio,
  } = useServicioStore()
  const {
    solicitudes, cargando: cargandoSolicitudes,
    cargarSolicitudesEntidad, responderSolicitud,
  } = useSolicitudStore()
  const { perfil, cargarPerfil } = usePerfilStore()
  const { lang } = useLangStore()
  const t = useT()

  const [pestaña, setPestaña]                   = useState<Pestaña>("servicios")
  const [mostrarForm, setMostrarForm]           = useState(false)
  const [form, setForm]                         = useState<DatosCrearServicio>(FORM_VACIO)
  const [archivoImagen, setArchivoImagen]       = useState<File | null>(null)
  const [previstaImagen, setPrevistaImagen]     = useState("")
  const [errorForm, setErrorForm]               = useState("")
  const [guardando, setGuardando]               = useState(false)
  const [confirmEliminar, setConfirmEliminar]   = useState<string | null>(null)
  const [solicitudActiva, setSolicitudActiva]   = useState<Solicitud | null>(null)
  const [respuesta, setRespuesta]               = useState({ estado: "aceptada" as "aceptada" | "rechazada", mensaje: "" })
  const [guardandoRespuesta, setGuardandoRespuesta] = useState(false)
  const [editandoServicio, setEditandoServicio] = useState<Servicio | null>(null)
  const [formEditar, setFormEditar]             = useState<DatosCrearServicio>(FORM_VACIO)
  const [guardandoEdicion, setGuardandoEdicion] = useState(false)
  const [filtroEstado, setFiltroEstado]         = useState<string>("todos")
  const [busqueda, setBusqueda]                 = useState<string>("")

  useEffect(() => {
    if (usuario?.id) {
      cargarMisServicios()
      cargarSolicitudesEntidad()
      cargarPerfil()
    }
  }, [usuario?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const nombreEntidad = perfil?.nombre_entidad ?? usuario?.nombreEntidad ?? ""

  const setField = (k: keyof DatosCrearServicio, v: string) => {
    setForm({ ...form, [k]: v })
    setErrorForm("")
  }

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.descripcion || !form.ubicacion || !form.telefono) {
      setErrorForm(lang === "es" ? "Rellena todos los campos obligatorios" : "Fill in all required fields")
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

  const handleAbrirEditar = (s: Servicio) => {
    setEditandoServicio(s)
    setFormEditar({
      nombre:      s.nombre,
      descripcion: s.descripcion,
      tipo:        s.tipo,
      ubicacion:   s.ubicacion,
      telefono:    s.telefono,
      imagen_url:  s.imagen_url ?? "",
      plazas:      s.plazas,
    })
  }

  const handleGuardarEdicion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editandoServicio) return
    setGuardandoEdicion(true)
    await actualizarServicio(editandoServicio.id, formEditar)
    cargarMisServicios()
    setGuardandoEdicion(false)
    setEditandoServicio(null)
  }

  const handleAbrirRespuesta = (s: Solicitud) => {
    setSolicitudActiva(s)
    setRespuesta({
      estado:  s.estado === "pendiente" ? "aceptada" : s.estado as "aceptada" | "rechazada",
      mensaje: s.mensaje_respuesta ?? "",
    })
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

  const estadoLabel = (e: string) => {
    if (e === "pendiente") return t.dashEntidad.pendienteLabel
    if (e === "aceptada")  return t.dashEntidad.aceptadaLabel
    return t.dashEntidad.rechazadaLabel
  }

  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideEstado = filtroEstado === "todos" || s.estado === filtroEstado
    const searchLower = busqueda.toLowerCase()
    const coincideTexto = 
      (s.servicio?.nombre?.toLowerCase() ?? "").includes(searchLower) ||
      (s.nombre_familiar.toLowerCase() ?? "").includes(searchLower)
    return coincideEstado && coincideTexto
  })

  const inputClass = "w-full h-9 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader subtitle={t.dashEntidad.bienvenido} />

      <main className="max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">{nombreEntidad}</h1>
            <p className="text-sm text-muted-foreground">
              {lang === "es" ? "Gestiona tus servicios y solicitudes recibidas" : "Manage your services and received requests"}
            </p>
          </div>
          {pestaña === "servicios" && (
            <button
              onClick={() => { setMostrarForm(!mostrarForm); setErrorForm("") }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              {mostrarForm ? t.dashEntidad.cancelar : `+ ${t.dashEntidad.nuevoServicio}`}
            </button>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <KpiCard label={t.dashEntidad.misServicios} value={servicios.length} />
          <KpiCard label={t.dashAdmin.activo} value={servicios.filter((s) => s.activo).length} />
          <KpiCard label={t.dashEntidad.solicitudesRecibidas} value={solicitudes.length} />
          <KpiCard label={t.dashFamilia.pendientes} value={pendientes} highlight={pendientes > 0} />
        </div>

        {/* Pestañas */}
        <TabBar<Pestaña>
          tabs={[
            { key: "servicios", label: t.dashEntidad.misServicios },
            { key: "solicitudes", label: t.dashEntidad.solicitudesRecibidas, badge: pendientes },
          ]}
          active={pestaña}
          onChange={setPestaña}
        />

        {/* ── SERVICIOS ── */}
        {pestaña === "servicios" && (
          <>
            {mostrarForm && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <h2 className="text-sm font-semibold text-foreground mb-5">{t.dashEntidad.nuevoServicio}</h2>
                <form onSubmit={handleCrear} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "nombre",    label: `${t.dashEntidad.nombre} *`,    placeholder: "Centro de Día San José", type: "text", field: "nombre"    as keyof DatosCrearServicio },
                      { id: "ubicacion", label: `${t.dashEntidad.ubicacion} *`, placeholder: "Mérida, Badajoz",       type: "text", field: "ubicacion" as keyof DatosCrearServicio },
                      { id: "telefono",  label: `${t.dashEntidad.telefono} *`,  placeholder: "924 000 000",           type: "tel",  field: "telefono"  as keyof DatosCrearServicio },
                    ].map((f) => (
                      <div key={f.id} className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder}
                          value={form[f.field] as string}
                          onChange={(e) => setField(f.field, e.target.value)}
                          className={inputClass} />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.tipo} *</label>
                      <select value={form.tipo} onChange={(e) => setField("tipo", e.target.value)} className={inputClass}>
                        {TIPOS_SERVICIO.map((tp) => <option key={tp}>{tp}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.plazas}</label>
                      <input type="number" min="0"
                        value={form.plazas ?? ""}
                        placeholder={lang === "es" ? "Vacío = sin límite" : "Empty = unlimited"}
                        onChange={(e) => setForm({ ...form, plazas: e.target.value === "" ? null : parseInt(e.target.value) })}
                        className={inputClass} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.descripcion} *</label>
                    <textarea
                      placeholder={lang === "es" ? "Describe el servicio..." : "Describe the service..."}
                      value={form.descripcion}
                      onChange={(e) => setField("descripcion", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.dashEntidad.imagen} <span className="text-muted-foreground/50">({lang === "es" ? "opcional" : "optional"})</span>
                    </label>
                    <input type="file" accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setArchivoImagen(file)
                        setPrevistaImagen(URL.createObjectURL(file))
                      }}
                      className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-emerald-500/10 file:text-emerald-500 hover:file:bg-emerald-500/20 cursor-pointer"
                    />
                    {previstaImagen && (
                      <div className="relative mt-2 w-full h-32 rounded-lg overflow-hidden border border-border">
                        <img src={previstaImagen} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button"
                          onClick={() => { setArchivoImagen(null); setPrevistaImagen("") }}
                          className="absolute top-2 right-2 bg-card rounded-full w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground border border-border text-xs"
                        >✕</button>
                      </div>
                    )}
                  </div>
                  {errorForm && <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{errorForm}</p>}
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => { setMostrarForm(false); setErrorForm("") }}
                      className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm transition-colors">
                      {t.dashEntidad.cancelar}
                    </button>
                    <button type="submit" disabled={guardando}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors disabled:opacity-50">
                      {guardando ? t.dashEntidad.publicando : t.dashEntidad.publicar}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Modal editar servicio */}
            {editandoServicio && (
              <Modal onClose={() => setEditandoServicio(null)} maxWidth="max-w-lg">
                <ModalHeader title={t.dashEntidad.editar} onClose={() => setEditandoServicio(null)} />
                <form onSubmit={handleGuardarEdicion} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: `${t.dashEntidad.nombre} *`, field: "nombre" as keyof DatosCrearServicio, type: "text" },
                      { label: `${t.dashEntidad.ubicacion} *`, field: "ubicacion" as keyof DatosCrearServicio, type: "text" },
                      { label: `${t.dashEntidad.telefono} *`, field: "telefono" as keyof DatosCrearServicio, type: "tel" },
                    ].map((f) => (
                      <div key={f.field} className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
                        <input type={f.type} value={formEditar[f.field] as string}
                          onChange={(e) => setFormEditar({ ...formEditar, [f.field]: e.target.value })}
                          className={inputClass} />
                      </div>
                    ))}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.tipo}</label>
                      <select value={formEditar.tipo}
                        onChange={(e) => setFormEditar({ ...formEditar, tipo: e.target.value as TipoServicio })}
                        className={inputClass}>
                        {TIPOS_SERVICIO.map((tp) => <option key={tp}>{tp}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.descripcion}</label>
                    <textarea value={formEditar.descripcion}
                      onChange={(e) => setFormEditar({ ...formEditar, descripcion: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.plazas}</label>
                    <input type="number" min="0"
                      value={formEditar.plazas ?? ""}
                      placeholder={lang === "es" ? "Vacío = sin límite" : "Empty = unlimited"}
                      onChange={(e) => setFormEditar({ ...formEditar, plazas: e.target.value === "" ? null : parseInt(e.target.value) })}
                      className={inputClass} />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setEditandoServicio(null)}
                      className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm transition-colors">
                      {t.dashEntidad.cancelar}
                    </button>
                    <button type="submit" disabled={guardandoEdicion}
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors disabled:opacity-50">
                      {guardandoEdicion ? t.dashEntidad.actualizando : t.dashEntidad.actualizar}
                    </button>
                  </div>
                </form>
              </Modal>
            )}

            {cargandoServicios ? (
              <LoadingSpinner />
            ) : servicios.length === 0 ? (
              <EmptyState 
                title={t.dashEntidad.sinServicios} 
                subtitle={lang === "es" ? `Pulsa "+ ${t.dashEntidad.nuevoServicio}" para empezar` : `Click "+ ${t.dashEntidad.nuevoServicio}" to start`} 
              />
            ) : (
              <div className="space-y-3">
                {servicios.map((s: Servicio) => (
                  <div key={s.id} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 hover:border-emerald-500/30 transition-colors">
                    {s.imagen_url && (
                      <img src={s.imagen_url} alt={s.nombre} className="w-16 h-16 rounded-lg object-cover shrink-0 border border-border" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-foreground truncate">{s.nombre}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.activo ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                          {s.activo ? t.dashAdmin.activo : t.dashAdmin.inactivo}
                        </span>
                        {s.plazas === null ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                            ∞ {lang === "es" ? "Sin límite" : "Unlimited"}
                          </span>
                        ) : s.plazas === 0 ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-medium">
                            {lang === "es" ? "Sin plazas" : "No spots"}
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20 font-medium">
                            {s.plazas} {lang === "es" ? "plazas" : "spots"}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{s.descripcion}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground/80 mt-1">
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
                            <circle cx="6" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
                          </svg>
                          {s.ubicacion}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6.5 1.5l4 4a1.414 1.414 0 010 2l-3.5 3.5a1.414 1.414 0 01-2 0l-4-4V1.5h5.5z" stroke="currentColor" strokeWidth="1.2"/>
                            <circle cx="3.5" cy="3.5" r="0.5" stroke="currentColor" strokeWidth="1.2"/>
                          </svg>
                          {s.tipo}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1 6c1.5-2.5 3.5-4 5-4s3.5 1.5 5 4-3.5 4-5 4-3.5-1.5-5-4z" stroke="currentColor" strokeWidth="1.2"/>
                            <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
                          </svg>
                          {s.visitas}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleAbrirEditar(s)}
                        className="px-3 py-1.5 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-xs transition-colors">
                        {lang === "es" ? "Editar" : "Edit"}
                      </button>
                      <button onClick={() => toggleActivo(s.id, !s.activo)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          s.activo
                            ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/25"
                            : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                        }`}>
                        {s.activo ? t.dashAdmin.desactivar : t.dashAdmin.activar}
                      </button>
                      {confirmEliminar === s.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => setConfirmEliminar(null)} className="px-2 py-1.5 rounded-lg border border-border text-muted-foreground text-xs">No</button>
                          <button onClick={async () => { await eliminarServicio(s.id); setConfirmEliminar(null) }} className="px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">Sí</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmEliminar(s.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 transition-colors">
                          {t.dashEntidad.eliminar}
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
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={lang === "es" ? "Buscar por servicio o familia..." : "Search by service or family..."}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={`${inputClass} sm:w-64`}
              />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className={`${inputClass} sm:w-auto`}
              >
                <option value="todos">{lang === "es" ? "Todos los estados" : "All states"}</option>
                <option value="pendiente">{t.dashEntidad.pendienteLabel}</option>
                <option value="aceptada">{t.dashEntidad.aceptadaLabel}</option>
                <option value="rechazada">{t.dashEntidad.rechazadaLabel}</option>
              </select>
            </div>

            {cargandoSolicitudes ? (
              <LoadingSpinner />
            ) : solicitudes.length === 0 ? (
              <EmptyState 
                title={t.dashEntidad.sinSolicitudes} 
                subtitle={lang === "es" ? "Cuando las familias soliciten tus servicios aparecerán aquí" : "When families request your services they will appear here"} 
              />
            ) : solicitudesFiltradas.length === 0 ? (
              <EmptyState
                title={lang === "es" ? "No se encontraron solicitudes" : "No requests found"}
                subtitle={lang === "es" ? "Intenta con otros filtros de búsqueda" : "Try with different search filters"}
              />
            ) : (
              <div className="space-y-3">
                {solicitudesFiltradas.map((s: Solicitud) => (
                  <div key={s.id} className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{s.nombre_familiar}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoBadge[s.estado]}`}>
                            {estadoLabel(s.estado)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {t.dashFamilia.servicio}: <span className="text-foreground/80">{s.servicio?.nombre}</span>
                          {" · "}{s.tipo_necesidad}
                        </p>
                        <p className="text-xs text-muted-foreground/60 line-clamp-2">{s.mensaje}</p>
                        {s.mensaje_respuesta && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {lang === "es" ? "Respuesta" : "Response"}: <span className="text-foreground/80">{s.mensaje_respuesta}</span>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground/60">
                          {new Date(s.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES")}
                        </span>
                        {s.estado === "pendiente" ? (
                          <button onClick={() => handleAbrirRespuesta(s)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 text-xs font-medium transition-colors">
                            {lang === "es" ? "Responder" : "Reply"}
                          </button>
                        ) : (
                          <button onClick={() => handleAbrirRespuesta(s)}
                            className="px-3 py-1.5 rounded-lg bg-muted border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
                            {lang === "es" ? "Modificar" : "Modify"}
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

      {/* Modal responder / modificar */}
      {solicitudActiva && (
        <Modal onClose={() => setSolicitudActiva(null)} maxWidth="max-w-md">
          <ModalHeader 
            title={solicitudActiva.estado === "pendiente" ? (lang === "es" ? "Responder solicitud" : "Reply to request") : (lang === "es" ? "Modificar respuesta" : "Modify response")}
            subtitle={`${lang === "es" ? "De" : "From"}: ${solicitudActiva.nombre_familiar}`}
            onClose={() => setSolicitudActiva(null)} 
          />
          <div className="bg-muted rounded-lg p-3 mb-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">{solicitudActiva.servicio?.nombre}</p>
            <p>{solicitudActiva.mensaje}</p>
          </div>
          {solicitudActiva.estado !== "pendiente" && (
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs px-3 py-2.5 rounded-lg mb-4">
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {lang === "es" ? "Esta solicitud ya fue respondida. Puedes cambiar la decisión." : "This request was already answered. You can change the decision."}
            </div>
          )}
          <form onSubmit={handleResponder} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {(["aceptada", "rechazada"] as const).map((e) => (
                <button key={e} type="button"
                  onClick={() => setRespuesta({ ...respuesta, estado: e })}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    respuesta.estado === e
                      ? e === "aceptada" ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" : "border-red-500 bg-red-500/10 text-red-500"
                      : "border-border text-muted-foreground hover:border-border-strong"
                  }`}>
                  {e === "aceptada" ? `✓ ${t.dashEntidad.aceptar}` : `✗ ${t.dashEntidad.rechazar}`}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                {lang === "es" ? "Mensaje para la familia *" : "Message to the family *"}
              </label>
              <textarea
                placeholder={lang === "es" ? "Explica tu decisión..." : "Explain your decision..."}
                value={respuesta.mensaje}
                onChange={(e) => setRespuesta({ ...respuesta, mensaje: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
              />
            </div>
            <button type="submit" disabled={guardandoRespuesta || !respuesta.mensaje.trim()}
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50">
              {guardandoRespuesta
                ? (lang === "es" ? "Guardando..." : "Saving...")
                : solicitudActiva.estado === "pendiente"
                  ? (lang === "es" ? "Enviar respuesta" : "Send reply")
                  : (lang === "es" ? "Guardar cambios" : "Save changes")}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}