import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/authStore"
import { useServicioStore } from "@/store/servicioStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { usePerfilStore } from "@/store/perfilStore"
import type { Servicio, DatosCrearServicio, TipoServicio } from "@/interfaces/Servicio"
import type { Solicitud } from "@/interfaces/Solicitud"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"
import { TIPOS_SERVICIO, estadoBadge } from "@/lib/constants"
import { inputClass, textareaClass } from "@/lib/styles"
import { useSolicitudesFiltro } from "@/hooks/useSolicitudesFiltro"
import { useServicioForm } from "@/hooks/useServicioForm"
import { useRespuestaSolicitud } from "@/hooks/useRespuestaSolicitud"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import KpiCard from "@/components/dashboard/KpiCard"
import TabBar from "@/components/dashboard/TabBar"
import EmptyState from "@/components/dashboard/EmptyState"
import LoadingSpinner from "@/components/dashboard/LoadingSpinner"
import { ServicioCardSkeleton, SolicitudCardSkeleton } from "@/components/dashboard/Skeleton"
import Modal, { ModalHeader } from "@/components/dashboard/Modal"
import ToggleActivoButton from "@/components/dashboard/ToggleActivoButton"

type Pestaña = "servicios" | "solicitudes"

export default function DashboardEntidad() {
  const { usuario } = useAuthStore()
  const {
    servicios, cargando: cargandoServicios,
    cargarMisServicios, eliminarServicio, toggleActivo,
  } = useServicioStore()
  const {
    solicitudes, cargando: cargandoSolicitudes,
    cargarSolicitudesEntidad,
  } = useSolicitudStore()
  const { perfil, cargarPerfil } = usePerfilStore()
  const { lang } = useLangStore()
  const t = useT()

  const [pestaña, setPestaña] = useState<Pestaña>("servicios")

  const {
    mostrarForm, setMostrarForm,
    form, setForm, setField,
    setArchivoImagen,
    previstaImagen, setPrevistaImagen,
    errorForm, setErrorForm,
    guardando,
    confirmEliminar, setConfirmEliminar,
    editandoServicio, setEditandoServicio,
    formEditar, setFormEditar,
    archivoImagenEditar, setArchivoImagenEditar,
    previstaImagenEditar, setPrevistaImagenEditar,
    errorEditar,
    guardandoEdicion,
    handleCrear,
    handleAbrirEditar,
    handleGuardarEdicion,
  } = useServicioForm()

  const {
    solicitudActiva, setSolicitudActiva,
    respuesta, setRespuesta,
    guardandoRespuesta,
    handleAbrirRespuesta,
    handleResponder,
  } = useRespuestaSolicitud()

  const { filtroEstado, setFiltroEstado, busqueda, setBusqueda, solicitudesFiltradas } =
    useSolicitudesFiltro(solicitudes)

  useEffect(() => {
    if (usuario?.id) {
      cargarMisServicios()
      cargarSolicitudesEntidad()
      cargarPerfil()
    }
  }, [usuario?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const nombreEntidad = perfil?.nombre_entidad ?? usuario?.nombreEntidad ?? ""
  const pendientes    = solicitudes.filter((s) => s.estado === "pendiente").length

  const estadoLabel = (e: string) => {
    if (e === "pendiente") return t.dashEntidad.pendienteLabel
    if (e === "aceptada")  return t.dashEntidad.aceptadaLabel
    return t.dashEntidad.rechazadaLabel
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader subtitle={`${t.dashEntidad.bienvenido} ${nombreEntidad}`.trim()} />

      <main className="max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">{nombreEntidad}</h1>
            <p className="text-sm text-muted-foreground">{t.dashEntidad.descripcionTexto}</p>
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
          <KpiCard label={t.dashEntidad.misServicios}         value={servicios.length} />
          <KpiCard label={t.dashAdmin.activo}                 value={servicios.filter((s) => s.activo).length} />
          <KpiCard label={t.dashEntidad.solicitudesRecibidas} value={solicitudes.length} />
          <KpiCard label={t.dashFamilia.pendientes}           value={pendientes} highlight={pendientes > 0} />
        </div>

        {/* Pestañas */}
        <TabBar<Pestaña>
          tabs={[
            { key: "servicios",    label: t.dashEntidad.misServicios },
            { key: "solicitudes",  label: t.dashEntidad.solicitudesRecibidas, badge: pendientes },
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
                        placeholder={t.dashEntidad.sinLimite}
                        onChange={(e) => setForm({ ...form, plazas: e.target.value === "" ? null : parseInt(e.target.value) })}
                        className={inputClass} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.descripcion} *</label>
                    <textarea
                      placeholder={t.dashEntidad.descripcionPlaceholder}
                      value={form.descripcion}
                      onChange={(e) => setField("descripcion", e.target.value)}
                      rows={3}
                      className={textareaClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.dashEntidad.imagen} <span className="text-muted-foreground/50">({t.dashEntidad.opcional})</span>
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
                      { label: `${t.dashEntidad.nombre} *`,    field: "nombre"    as keyof DatosCrearServicio, type: "text" },
                      { label: `${t.dashEntidad.ubicacion} *`, field: "ubicacion" as keyof DatosCrearServicio, type: "text" },
                      { label: `${t.dashEntidad.telefono} *`,  field: "telefono"  as keyof DatosCrearServicio, type: "tel"  },
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
                      className={textareaClass} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.dashEntidad.plazas}</label>
                    <input type="number" min="0"
                      value={formEditar.plazas ?? ""}
                      placeholder={t.dashEntidad.sinLimite}
                      onChange={(e) => setFormEditar({ ...formEditar, plazas: e.target.value === "" ? null : parseInt(e.target.value) })}
                      className={inputClass} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">
                      {t.dashEntidad.imagen} <span className="text-muted-foreground/50">({t.dashEntidad.opcional})</span>
                    </label>
                    <input type="file" accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setArchivoImagenEditar(file)
                        setPrevistaImagenEditar(URL.createObjectURL(file))
                      }}
                      className="w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-emerald-500/10 file:text-emerald-500 hover:file:bg-emerald-500/20 cursor-pointer"
                    />
                    {previstaImagenEditar && (
                      <div className="relative mt-2 w-full h-32 rounded-lg overflow-hidden border border-border">
                        <img src={previstaImagenEditar} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button"
                          onClick={() => {
                            setArchivoImagenEditar(null)
                            setPrevistaImagenEditar("")
                            setFormEditar({ ...formEditar, imagen_url: "" })
                          }}
                          className="absolute top-2 right-2 bg-card rounded-full w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground border border-border text-xs"
                        >✕</button>
                      </div>
                    )}
                  </div>
                  {errorEditar && (
                    <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{errorEditar}</p>
                  )}
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
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <ServicioCardSkeleton key={i} />)}
              </div>
            ) : servicios.length === 0 ? (
              <EmptyState
                title={t.dashEntidad.sinServicios}
                subtitle={t.dashEntidad.sinServiciosSub(t.dashEntidad.nuevoServicio)}
              />
            ) : (
              <div className="space-y-3">
                {servicios.map((s: Servicio) => (
                  <div key={s.id} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                    {s.imagen_url && (
                      <img src={s.imagen_url} alt={s.nombre} className="w-14 h-14 rounded-lg object-cover shrink-0 border border-border" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-foreground truncate">{s.nombre}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.activo ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                          {s.activo ? t.dashAdmin.activo : t.dashAdmin.inactivo}
                        </span>
                        {s.plazas === null ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-medium">
                            ∞ {t.dashEntidad.sinLimiteLabel}
                          </span>
                        ) : s.plazas === 0 ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-medium">
                            {t.dashEntidad.sinPlazas}
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 border border-teal-500/20 font-medium">
                            {s.plazas} {t.dashEntidad.plazasLabel}
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
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start flex-wrap">
                      <button onClick={() => handleAbrirEditar(s)}
                        className="px-3 py-1.5 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-xs transition-colors">
                        {t.dashEntidad.editar}
                      </button>
                      <ToggleActivoButton
                        activo={s.activo}
                        labelActivar={t.dashAdmin.activar}
                        labelDesactivar={t.dashAdmin.desactivar}
                        onClick={() => toggleActivo(s.id, !s.activo)}
                      />
                      <button onClick={() => setConfirmEliminar(s.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 transition-colors">
                        {t.dashEntidad.eliminar}
                      </button>
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
                placeholder={t.dashEntidad.buscarSolicitudes}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={`${inputClass} sm:w-64`}
              />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className={`${inputClass} sm:w-auto`}
              >
                <option value="todos">{t.dashEntidad.todosEstados}</option>
                <option value="pendiente">{t.dashEntidad.pendienteLabel}</option>
                <option value="aceptada">{t.dashEntidad.aceptadaLabel}</option>
                <option value="rechazada">{t.dashEntidad.rechazadaLabel}</option>
              </select>
            </div>

            {cargandoSolicitudes ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => <SolicitudCardSkeleton key={i} />)}
              </div>
            ) : solicitudes.length === 0 ? (
              <EmptyState
                title={t.dashEntidad.sinSolicitudes}
                subtitle={t.dashEntidad.sinSolicitudesSub}
              />
            ) : solicitudesFiltradas.length === 0 ? (
              <EmptyState
                title={t.dashEntidad.noSolicitudes}
                subtitle={t.dashEntidad.noFiltros}
              />
            ) : (
              <div className="space-y-3">
                {solicitudesFiltradas.map((s: Solicitud) => (
                  <div key={s.id} className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm font-semibold text-foreground truncate">{s.nombre_familiar}</span>
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
                            {t.dashEntidad.respuesta}: <span className="text-foreground/80">{s.mensaje_respuesta}</span>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <span className="text-xs text-muted-foreground/60">
                          {new Date(s.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES")}
                        </span>
                        {s.estado === "pendiente" ? (
                          <button onClick={() => handleAbrirRespuesta(s)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20 text-xs font-medium transition-colors">
                            {t.dashEntidad.responder}
                          </button>
                        ) : (
                          <button onClick={() => handleAbrirRespuesta(s)}
                            className="px-3 py-1.5 rounded-lg bg-muted border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
                            {t.dashEntidad.modificar}
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

      {/* Modal confirmar eliminación */}
      {confirmEliminar && (() => {
        const servicio = servicios.find((s) => s.id === confirmEliminar)
        return (
          <Modal onClose={() => setConfirmEliminar(null)} maxWidth="max-w-sm">
            <ModalHeader title={t.dashEntidad.confirmarEliminarTitulo} onClose={() => setConfirmEliminar(null)} />
            {servicio && (
              <p className="text-sm font-medium text-foreground mb-2">{servicio.nombre}</p>
            )}
            <p className="text-xs text-muted-foreground mb-6">{t.dashEntidad.confirmarEliminarDesc}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmEliminar(null)}
                className="flex-1 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.dashEntidad.cancelar}
              </button>
              <button
                onClick={async () => { await eliminarServicio(confirmEliminar); setConfirmEliminar(null) }}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-medium transition-colors"
              >
                {t.dashEntidad.eliminar}
              </button>
            </div>
          </Modal>
        )
      })()}

      {/* Modal responder / modificar */}
      {solicitudActiva && (
        <Modal onClose={() => setSolicitudActiva(null)} maxWidth="max-w-md">
          <ModalHeader
            title={solicitudActiva.estado === "pendiente" ? t.dashEntidad.responderSolicitud : t.dashEntidad.modificarRespuesta}
            subtitle={`${t.dashEntidad.de}: ${solicitudActiva.nombre_familiar}`}
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
              {t.dashEntidad.yaRespondida}
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
                {t.dashEntidad.mensajeFamilia}
              </label>
              <textarea
                placeholder={t.dashEntidad.explicaTuDecision}
                value={respuesta.mensaje}
                onChange={(e) => setRespuesta({ ...respuesta, mensaje: e.target.value })}
                rows={3}
                className={textareaClass}
              />
            </div>
            <button type="submit" disabled={guardandoRespuesta || !respuesta.mensaje.trim()}
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50">
              {guardandoRespuesta
                ? t.dashEntidad.guardando
                : solicitudActiva.estado === "pendiente"
                  ? t.dashEntidad.enviarRespuesta
                  : t.dashEntidad.guardarCambios}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
