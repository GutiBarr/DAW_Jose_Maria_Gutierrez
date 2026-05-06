import type { SolicitudRepository } from "@/database/repositories/SolicitudRepository"
import type { Solicitud, DatosCrearSolicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"
import { supabase } from "./Client"

export class SupabaseSolicitudRepository implements SolicitudRepository {
  async crearSolicitud(datos: DatosCrearSolicitud) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "No hay sesión activa" }

    const { data, error } = await supabase
      .from("solicitudes")
      .insert({ ...datos, familia_id: user.id })
      .select()
      .single()

    if (error) {
      console.error("crearSolicitud:", error)
      return { error: "No se pudo enviar la solicitud" }
    }

    return { data: data as Solicitud }
  }

  async obtenerMisSolicitudes(): Promise<Solicitud[]> {
    const { data, error } = await supabase
      .from("solicitudes")
      .select(`
        *,
        servicio:servicios(nombre, tipo, ubicacion)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("obtenerMisSolicitudes:", error)
      return []
    }

    return data as Solicitud[]
  }

  async obtenerSolicitudesEntidad(): Promise<Solicitud[]> {
    const { data, error } = await supabase
      .from("solicitudes")
      .select(`
        *,
        servicio:servicios(nombre, tipo, ubicacion)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("obtenerSolicitudesEntidad:", error)
      return []
    }

    return data as Solicitud[]
  }

  async responderSolicitud(id: string, datos: DatosResponderSolicitud) {
    // 1. Leer el estado actual de la solicitud ANTES de actualizarla
    const { data: solicitudActual } = await supabase
      .from("solicitudes")
      .select("servicio_id, estado")
      .eq("id", id)
      .single()

    // 2. Actualizar el estado de la solicitud
    const { error } = await supabase
      .from("solicitudes")
      .update({
        estado:            datos.estado,
        mensaje_respuesta: datos.mensaje_respuesta,
        updated_at:        new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("responderSolicitud:", error)
      return { error: "No se pudo responder la solicitud" }
    }

    // 3. Gestionar plazas según el cambio de estado
    if (solicitudActual?.servicio_id) {
      const { data: servicio } = await supabase
        .from("servicios")
        .select("plazas, activo")
        .eq("id", solicitudActual.servicio_id)
        .single()

      if (servicio && servicio.plazas !== null) {
        let nuevasPlazas = servicio.plazas

        // Aceptar una que NO estaba aceptada: decrementar plaza
        if (datos.estado === "aceptada" && solicitudActual.estado !== "aceptada") {
          nuevasPlazas = Math.max(0, servicio.plazas - 1)
        }

        // Rechazar una que SÍ estaba aceptada: devolver plaza
        if (datos.estado === "rechazada" && solicitudActual.estado === "aceptada") {
          nuevasPlazas = servicio.plazas + 1
        }

        // Solo actualizar si el número cambió
        if (nuevasPlazas !== servicio.plazas) {
          const updates: Record<string, unknown> = {
            plazas:     nuevasPlazas,
            updated_at: new Date().toISOString(),
          }

          // Si se devuelve una plaza y el servicio estaba desactivado por falta de plazas, reactivarlo
          if (nuevasPlazas > 0 && datos.estado === "rechazada") {
            updates.activo = true
          }

          // Si las plazas llegan a 0, desactivar el servicio
          if (nuevasPlazas === 0) {
            updates.activo = false
          }

          await supabase
            .from("servicios")
            .update(updates)
            .eq("id", solicitudActual.servicio_id)
        }
      }
    }

    return {}
  }
}