import { useState } from "react"
import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"

export function useAdminFiltros(perfiles: Perfil[], servicios: Servicio[]) {
  const [busquedaUsuarios,       setBusquedaUsuarios]       = useState("")
  const [filtroRol,              setFiltroRol]              = useState<RolUsuario | "todos">("todos")
  const [filtroActivoUsuarios,   setFiltroActivoUsuarios]   = useState<"todos" | "activo" | "inactivo">("todos")

  const [busquedaServicios,      setBusquedaServicios]      = useState("")
  const [filtroTipo,             setFiltroTipo]             = useState("todos")
  const [filtroActivoServicios,  setFiltroActivoServicios]  = useState<"todos" | "activo" | "inactivo">("todos")
  const [filtroEntidad,          setFiltroEntidad]          = useState("todos")

  const perfilesFiltrados = perfiles.filter((p) => {
    const texto = busquedaUsuarios.toLowerCase()
    const coincideTexto =
      !texto ||
      (p.nombre         ?? "").toLowerCase().includes(texto) ||
      (p.nombre_entidad ?? "").toLowerCase().includes(texto) ||
      p.email.toLowerCase().includes(texto)
    const coincideRol    = filtroRol           === "todos" || p.rol === filtroRol
    const coincideActivo = filtroActivoUsuarios === "todos" ||
      (filtroActivoUsuarios === "activo" ? p.activo : !p.activo)
    return coincideTexto && coincideRol && coincideActivo
  })

  const entidadNombreMap = Object.fromEntries(
    perfiles.map((p) => [p.id, (p.nombre_entidad ?? p.nombre ?? p.email).toLowerCase()])
  )

  const serviciosFiltrados = servicios.filter((s) => {
    const texto = busquedaServicios.toLowerCase()
    const coincideTexto =
      !texto ||
      s.nombre.toLowerCase().includes(texto) ||
      (s.ubicacion ?? "").toLowerCase().includes(texto) ||
      (entidadNombreMap[s.entidad_id] ?? "").includes(texto)
    const coincideTipo    = filtroTipo           === "todos" || s.tipo === filtroTipo
    const coincideActivo  = filtroActivoServicios === "todos" ||
      (filtroActivoServicios === "activo" ? s.activo : !s.activo)
    const coincideEntidad = filtroEntidad === "todos" || s.entidad_id === filtroEntidad
    return coincideTexto && coincideTipo && coincideActivo && coincideEntidad
  })

  return {
    busquedaUsuarios,      setBusquedaUsuarios,
    filtroRol,             setFiltroRol,
    filtroActivoUsuarios,  setFiltroActivoUsuarios,
    perfilesFiltrados,

    busquedaServicios,     setBusquedaServicios,
    filtroTipo,            setFiltroTipo,
    filtroActivoServicios, setFiltroActivoServicios,
    filtroEntidad,         setFiltroEntidad,
    serviciosFiltrados,
  }
}
