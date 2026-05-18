import { useState } from "react"
import type { Solicitud } from "@/interfaces/Solicitud"

export function useSolicitudesFiltro(solicitudes: Solicitud[]) {
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")

  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideEstado = filtroEstado === "todos" || s.estado === filtroEstado
    const searchLower = busqueda.toLowerCase()
    const coincideTexto =
      (s.servicio?.nombre?.toLowerCase() ?? "").includes(searchLower) ||
      (s.nombre_familiar.toLowerCase() ?? "").includes(searchLower)
    return coincideEstado && coincideTexto
  })

  return { filtroEstado, setFiltroEstado, busqueda, setBusqueda, solicitudesFiltradas }
}
