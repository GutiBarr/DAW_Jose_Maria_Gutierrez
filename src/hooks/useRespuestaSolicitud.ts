import { useState } from "react"
import { useSolicitudStore } from "@/store/solicitudStore"
import type { Solicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"

export function useRespuestaSolicitud() {
  const { responderSolicitud } = useSolicitudStore()

  const [solicitudActiva, setSolicitudActiva] = useState<Solicitud | null>(null)
  const [respuesta, setRespuesta]             = useState({ estado: "aceptada" as "aceptada" | "rechazada", mensaje: "" })
  const [guardandoRespuesta, setGuardandoRespuesta] = useState(false)

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
      estado:            respuesta.estado,
      mensaje_respuesta: respuesta.mensaje,
    }
    await responderSolicitud(solicitudActiva.id, datos)
    setGuardandoRespuesta(false)
    setSolicitudActiva(null)
    setRespuesta({ estado: "aceptada", mensaje: "" })
  }

  return {
    solicitudActiva, setSolicitudActiva,
    respuesta, setRespuesta,
    guardandoRespuesta,
    handleAbrirRespuesta,
    handleResponder,
  }
}
