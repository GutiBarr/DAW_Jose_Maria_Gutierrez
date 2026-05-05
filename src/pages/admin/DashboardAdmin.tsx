import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useAdminStore } from "@/store/adminStore"
import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"
import LogoFamilia from "../../components/layout/LogoFamilia"

type Pestaña = "usuarios" | "servicios"
const ROLES: RolUsuario[] = ["familia", "entidad", "admin"]

export default function DashboardAdmin() {
  const { usuario, cerrarSesion } = useAuthStore()
  const {
    perfiles, servicios, cargando,
    cargarPerfiles, cambiarRol, toggleActivoUsuario, eliminarUsuario,
    cargarTodosServicios, eliminarServicio, toggleActivoServicio,
  } = useAdminStore()

  const [pestaña, setPestaña]                 = useState<Pestaña>("usuarios")
  const [confirmEliminar, setConfirmEliminar] = useState<string | null>(null)

  useEffect(() => {
  cargarPerfiles()
  cargarTodosServicios()
}, [])

  const handleLogout = () => {
    cerrarSesion()
    window.location.href = "/"
  }

  const totalFamilias  = perfiles.filter((p) => p.rol === "familia").length
  const totalEntidades = perfiles.filter((p) => p.rol === "entidad").length
  const totalActivos   = servicios.filter((s) => s.activo).length

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <LogoFamilia variante="header" />
              <span className="text-sm font-semibold text-white">ConciliaEx</span>
            </Link>
            <span className="text-slate-700">·</span>
            <span className="text-sm text-slate-500">Administración</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium border border-violet-500/20">
              Admin
            </span>
            <Link
              to="/perfil"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {usuario?.email}
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

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1">Panel de administración</h1>
          <p className="text-sm text-slate-500">Gestiona usuarios y servicios de la plataforma</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Usuarios totales",  value: perfiles.length },
            { label: "Familias",          value: totalFamilias },
            { label: "Entidades",         value: totalEntidades },
            { label: "Servicios activos", value: totalActivos },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-2xl font-semibold text-white mb-0.5">{kpi.value}</div>
              <div className="text-sm text-slate-500">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Pestañas */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg w-fit mb-6">
          {(["usuarios", "servicios"] as Pestaña[]).map((p) => (
            <button
              key={p}
              onClick={() => { setPestaña(p); setConfirmEliminar(null) }}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                pestaña === p
                  ? "bg-slate-800 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {p === "usuarios" ? `Usuarios (${perfiles.length})` : `Servicios (${servicios.length})`}
            </button>
          ))}
        </div>

        {cargando ? (
          <div className="text-center py-16">
            <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-600">Cargando...</p>
          </div>
        ) : pestaña === "usuarios" ? (

          /* ── TABLA USUARIOS ── */
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Usuario</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rol</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {perfiles.map((p: Perfil) => (
                  <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-white truncate max-w-[200px]">
                        {p.nombre ?? p.nombre_entidad ?? "—"}
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">{p.email}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={p.rol}
                        onChange={(e) => cambiarRol(p.id, e.target.value as RolUsuario)}
                        className="text-xs border border-slate-700 rounded-lg px-2 py-1 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                      >
                        {ROLES.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.activo
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-700/50 text-slate-400 border border-slate-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.activo ? "bg-emerald-500" : "bg-slate-500"}`} />
                        {p.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleActivoUsuario(p.id, !p.activo)}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs transition-colors"
                        >
                          {p.activo ? "Desactivar" : "Activar"}
                        </button>
                        {confirmEliminar === p.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => setConfirmEliminar(null)}
                              className="px-2 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs">
                              No
                            </button>
                            <button
                              onClick={async () => { await eliminarUsuario(p.id); setConfirmEliminar(null) }}
                              className="px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
                            >
                              Sí
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmEliminar(p.id)}
                            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-red-500/30 text-slate-500 hover:text-red-400 text-xs transition-colors"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {perfiles.length === 0 && (
              <p className="text-sm text-slate-600 text-center py-10">No hay usuarios registrados</p>
            )}
          </div>

        ) : (

          /* ── TABLA SERVICIOS ── */
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Servicio</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tipo</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {servicios.map((s: Servicio) => (
                  <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-white truncate max-w-[200px]">{s.nombre}</div>
                      <div className="text-xs text-slate-500">📍 {s.ubicacion}</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {s.tipo}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                        s.activo
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-700/50 text-slate-400 border border-slate-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.activo ? "bg-emerald-500" : "bg-slate-500"}`} />
                        {s.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleActivoServicio(s.id, !s.activo)}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs transition-colors"
                        >
                          {s.activo ? "Desactivar" : "Activar"}
                        </button>
                        {confirmEliminar === s.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => setConfirmEliminar(null)}
                              className="px-2 py-1.5 rounded-lg border border-slate-700 text-slate-400 text-xs">
                              No
                            </button>
                            <button
                              onClick={async () => { await eliminarServicio(s.id); setConfirmEliminar(null) }}
                              className="px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
                            >
                              Sí
                            </button>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {servicios.length === 0 && (
              <p className="text-sm text-slate-600 text-center py-10">No hay servicios publicados</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}