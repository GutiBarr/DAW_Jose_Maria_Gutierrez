import { useEffect, useState, useMemo } from "react"
import { useAuthStore } from "@/store/authStore"
import { useAdminStore } from "@/store/adminStore"
import { usePerfilStore } from "@/store/perfilStore"
import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"
import { useT } from "@/i18n/useT"
import { TIPOS_SERVICIO } from "@/lib/constants"
import { inputClass } from "@/lib/styles"
import { useAdminFiltros } from "@/hooks/useAdminFiltros"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import KpiCard from "@/components/dashboard/KpiCard"
import TabBar from "@/components/dashboard/TabBar"
import LoadingSpinner from "@/components/dashboard/LoadingSpinner"
import { TableSkeleton } from "@/components/dashboard/Skeleton"
import Modal from "@/components/dashboard/Modal"
import StatusBadge from "@/components/dashboard/StatusBadge"
import ToggleActivoButton from "@/components/dashboard/ToggleActivoButton"
import DataTable, { type Column } from "@/components/dashboard/DataTable"

type Pestaña = "usuarios" | "servicios"
const ROLES: RolUsuario[] = ["familia", "entidad", "admin"]

type AccionConfirm = {
  tipo: "eliminar-usuario" | "desactivar-usuario" | "eliminar-servicio"
  id: string
  nombre: string
}

export default function DashboardAdmin() {
  const { usuario } = useAuthStore()
  const {
    perfiles, servicios, cargando, error: adminError,
    cargarPerfiles, cambiarRol, toggleActivoUsuario, eliminarUsuario,
    cargarTodosServicios, eliminarServicio, toggleActivoServicio,
  } = useAdminStore()
  const { cargarPerfil } = usePerfilStore()
  const t = useT()

  const [pestaña, setPestaña] = useState<Pestaña>("usuarios")
  const [confirm, setConfirm] = useState<AccionConfirm | null>(null)

  const {
    busquedaUsuarios,      setBusquedaUsuarios,
    filtroRol,             setFiltroRol,
    filtroActivoUsuarios,  setFiltroActivoUsuarios,
    perfilesFiltrados,
    busquedaServicios,     setBusquedaServicios,
    filtroTipo,            setFiltroTipo,
    filtroActivoServicios, setFiltroActivoServicios,
    filtroEntidad,         setFiltroEntidad,
    serviciosFiltrados,
  } = useAdminFiltros(perfiles, servicios)

  useEffect(() => {
    if (usuario?.id) {
      cargarPerfiles()
      cargarTodosServicios()
      cargarPerfil()
    }
  }, [usuario?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const entidadNombre = useMemo(() =>
    Object.fromEntries(perfiles.map((p) => [p.id, p.nombre_entidad ?? p.nombre ?? p.email])),
    [perfiles]
  )

  const totalFamilias  = perfiles.filter((p) => p.rol === "familia").length
  const totalEntidades = perfiles.filter((p) => p.rol === "entidad").length
  const totalActivos   = servicios.filter((s) => s.activo).length

  const handleConfirm = async () => {
    if (!confirm) return
    if (confirm.tipo === "eliminar-usuario")   await eliminarUsuario(confirm.id)
    if (confirm.tipo === "desactivar-usuario") await toggleActivoUsuario(confirm.id, false)
    if (confirm.tipo === "eliminar-servicio")  await eliminarServicio(confirm.id)
    setConfirm(null)
  }

  const modalConfig = confirm ? {
    "eliminar-usuario": {
      titulo:    t.dashAdmin.eliminarCuenta,
      desc:      t.dashAdmin.confirmarEliminarCuenta(confirm.nombre),
      btnColor:  "bg-red-500 hover:bg-red-600 text-white",
      btnLabel:  t.dashAdmin.siEliminar,
      iconColor: "bg-red-500/10",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-red-500">
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    "desactivar-usuario": {
      titulo:    t.dashAdmin.desactivarCuenta,
      desc:      t.dashAdmin.confirmarDesactivar(confirm.nombre),
      btnColor:  "bg-amber-500 hover:bg-amber-600 text-white",
      btnLabel:  t.dashAdmin.siDesactivar,
      iconColor: "bg-amber-500/10",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber-500">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M12 8v5M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    "eliminar-servicio": {
      titulo:    t.dashAdmin.eliminarServicio,
      desc:      t.dashAdmin.confirmarEliminarServicio(confirm.nombre),
      btnColor:  "bg-red-500 hover:bg-red-600 text-white",
      btnLabel:  t.dashAdmin.siEliminar,
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

      {/* Modal confirmación */}
      {confirm && modalConfig && (
        <Modal onClose={() => setConfirm(null)}>
          <div className="animate-fade-up">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${modalConfig.iconColor}`}>
              {modalConfig.icon}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{modalConfig.titulo}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{modalConfig.desc}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirm(null)}
                className="px-5 py-2.5 rounded-xl border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                {t.dashAdmin.cancelar}
              </button>
              <button onClick={handleConfirm}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm ${modalConfig.btnColor}`}>
                {modalConfig.btnLabel}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <DashboardHeader subtitle={t.dashAdmin.titulo} />

      {adminError && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-4 py-2.5 rounded-lg">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="flex-1">{adminError}</span>
          </div>
        </div>
      )}

      <main className={`max-w-7xl mx-auto px-6 lg:px-8 pb-10 ${adminError ? "pt-6" : "pt-28"}`}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">{t.dashAdmin.titulo}</h1>
          <p className="text-sm text-muted-foreground">{t.dashAdmin.descripcion}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <KpiCard label={t.dashAdmin.usuarios}   value={perfiles.length} />
          <KpiCard label={t.dashAdmin.familias}   value={totalFamilias} />
          <KpiCard label={t.dashAdmin.entidades}  value={totalEntidades} />
          <KpiCard label={t.dashAdmin.servicios}                      value={totalActivos} />
        </div>

        {/* Pestañas */}
        <TabBar<Pestaña>
          tabs={[
            { key: "usuarios",  label: `${t.dashAdmin.usuarios} (${perfiles.length})` },
            { key: "servicios", label: `${t.dashAdmin.servicios} (${servicios.length})` },
          ]}
          active={pestaña}
          onChange={setPestaña}
        />

        {/* Filtros usuarios */}
        {pestaña === "usuarios" && (
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              placeholder={t.dashAdmin.buscarUsuarios}
              value={busquedaUsuarios}
              onChange={(e) => setBusquedaUsuarios(e.target.value)}
              className={`${inputClass} sm:w-64`}
            />
            <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value as typeof filtroRol)} className={`${inputClass} sm:w-36`}>
              <option value="todos">{t.dashAdmin.todosRoles}</option>
              <option value="familia">Familia</option>
              <option value="entidad">Entidad</option>
              <option value="admin">Admin</option>
            </select>
            <select value={filtroActivoUsuarios} onChange={(e) => setFiltroActivoUsuarios(e.target.value as typeof filtroActivoUsuarios)} className={`${inputClass} sm:w-36`}>
              <option value="todos">{t.dashAdmin.todosEstados}</option>
              <option value="activo">{t.dashAdmin.activo}</option>
              <option value="inactivo">{t.dashAdmin.inactivo}</option>
            </select>
            <span className="text-xs text-muted-foreground self-center ml-auto shrink-0">
              {perfilesFiltrados.length} / {perfiles.length}
            </span>
          </div>
        )}

        {/* Filtros servicios */}
        {pestaña === "servicios" && (
          <div className="flex flex-col sm:flex-row gap-2 mb-4 flex-wrap">
            <input
              type="text"
              placeholder={t.dashAdmin.buscarServicios}
              value={busquedaServicios}
              onChange={(e) => setBusquedaServicios(e.target.value)}
              className={`${inputClass} sm:w-56`}
            />
            <select value={filtroEntidad} onChange={(e) => setFiltroEntidad(e.target.value)} className={`${inputClass} sm:w-48`}>
              <option value="todos">{t.dashAdmin.todasEntidades}</option>
              {perfiles.filter((p) => p.rol === "entidad").map((p) => (
                <option key={p.id} value={p.id}>{p.nombre_entidad ?? p.email}</option>
              ))}
            </select>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className={`${inputClass} sm:w-44`}>
              <option value="todos">{t.dashAdmin.todosTipos}</option>
              {TIPOS_SERVICIO.map((tp) => <option key={tp} value={tp}>{tp}</option>)}
            </select>
            <select value={filtroActivoServicios} onChange={(e) => setFiltroActivoServicios(e.target.value as typeof filtroActivoServicios)} className={`${inputClass} sm:w-36`}>
              <option value="todos">{t.dashAdmin.todosEstados}</option>
              <option value="activo">{t.dashAdmin.activo}</option>
              <option value="inactivo">{t.dashAdmin.inactivo}</option>
            </select>
            <span className="text-xs text-muted-foreground self-center ml-auto shrink-0">
              {serviciosFiltrados.length} / {servicios.length}
            </span>
          </div>
        )}

        {cargando ? (
          <TableSkeleton cols={pestaña === "servicios" ? 4 : 5} rows={6} />
        ) : pestaña === "usuarios" ? (
          <DataTable<Perfil>
            data={perfilesFiltrados}
            keyExtractor={(p) => p.id}
            emptyMessage={t.dashAdmin.sinDatos}
            columns={[
              {
                key: "nombre", header: t.dashAdmin.nombre,
                render: (p) => (
                  <>
                    <div className="font-medium text-foreground truncate max-w-[200px] flex items-center gap-2">
                      {p.nombre ?? p.nombre_entidad ?? "—"}
                      {p.id === usuario?.id && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-500 border border-violet-500/20 font-medium">
                          {t.dashAdmin.tu}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{p.email}</div>
                  </>
                ),
              },
              {
                key: "rol", header: t.dashAdmin.rol,
                render: (p) => (
                  <select value={p.rol}
                    onChange={(e) => cambiarRol(p.id, e.target.value as RolUsuario)}
                    disabled={p.id === usuario?.id}
                    className="text-xs border border-border rounded-lg px-2 py-1 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                ),
              },
              {
                key: "estado", header: t.dashAdmin.estado,
                render: (p) => (
                  <StatusBadge activo={p.activo} labelActivo={t.dashAdmin.activo} labelInactivo={t.dashAdmin.inactivo} />
                ),
              },
              {
                key: "acciones", header: t.dashAdmin.acciones, align: "right",
                render: (p) => (
                  <div className="flex items-center justify-end gap-2">
                    {p.id !== usuario?.id && p.activo && (
                      <button
                        onClick={() => setConfirm({ tipo: "desactivar-usuario", id: p.id, nombre: p.nombre ?? p.nombre_entidad ?? p.email })}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/25 hover:border-amber-500/40 transition-colors">
                        {t.dashAdmin.desactivar}
                      </button>
                    )}
                    {p.id !== usuario?.id && !p.activo && (
                      <button onClick={() => toggleActivoUsuario(p.id, true)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 hover:border-emerald-500/40 transition-colors">
                        {t.dashAdmin.activar}
                      </button>
                    )}
                    {p.id !== usuario?.id && (
                      <button
                        onClick={() => setConfirm({ tipo: "eliminar-usuario", id: p.id, nombre: p.nombre ?? p.nombre_entidad ?? p.email })}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 hover:border-red-500/40 transition-colors">
                        {t.dashAdmin.eliminar}
                      </button>
                    )}
                    {p.id === usuario?.id && (
                      <span className="text-xs text-muted-foreground/50 italic">
                        {t.dashAdmin.tuCuenta}
                      </span>
                    )}
                  </div>
                ),
              },
            ] satisfies Column<Perfil>[]}
          />
        ) : (
          <DataTable<Servicio>
            data={serviciosFiltrados}
            keyExtractor={(s) => s.id}
            emptyMessage={t.dashAdmin.sinDatos}
            columns={[
              {
                key: "servicio", header: t.dashFamilia.servicio,
                render: (s) => (
                  <>
                    <div className="font-medium text-foreground truncate max-w-[200px]">{s.nombre}</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
                        <circle cx="6" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      {s.ubicacion}
                    </div>
                  </>
                ),
              },
              {
                key: "tipo", header: t.dashEntidad.tipo,
                render: (s) => (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                    {s.tipo}
                  </span>
                ),
              },
              {
                key: "entidad", header: t.dashFamilia.entidad,
                render: (s) => (
                  <span className="text-xs text-muted-foreground truncate max-w-[160px] block">
                    {entidadNombre[s.entidad_id] ?? "—"}
                  </span>
                ),
              },
              {
                key: "estado", header: t.dashAdmin.estado,
                render: (s) => (
                  <StatusBadge activo={s.activo} labelActivo={t.dashAdmin.activo} labelInactivo={t.dashAdmin.inactivo} />
                ),
              },
              {
                key: "acciones", header: t.dashAdmin.acciones, align: "right",
                render: (s) => (
                  <div className="flex items-center justify-end gap-2">
                    <ToggleActivoButton
                      activo={s.activo}
                      labelActivar={t.dashAdmin.activar}
                      labelDesactivar={t.dashAdmin.desactivar}
                      onClick={() => toggleActivoServicio(s.id, !s.activo)}
                    />
                    <button onClick={() => setConfirm({ tipo: "eliminar-servicio", id: s.id, nombre: s.nombre })}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/25 hover:border-red-500/40 transition-colors">
                      {t.dashAdmin.eliminar}
                    </button>
                  </div>
                ),
              },
            ] satisfies Column<Servicio>[]}
          />
        )}
      </main>
    </div>
  )
}
