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
    // 1. Actualizar el estado de la solicitud
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

    // 2. Si se aceptó: decrementar plazas y desactivar si llegan a 0 (Opción C)
    if (datos.estado === "aceptada") {
      // Obtener el servicio_id de la solicitud
      const { data: solicitud } = await supabase
        .from("solicitudes")
        .select("servicio_id")
        .eq("id", id)
        .single()

      if (solicitud?.servicio_id) {
        // Leer plazas actuales del servicio
        const { data: servicio } = await supabase
          .from("servicios")
          .select("plazas")
          .eq("id", solicitud.servicio_id)
          .single()

        // Solo actuar si el servicio tiene plazas limitadas (no null) y quedan plazas
        if (servicio && servicio.plazas !== null && servicio.plazas > 0) {
          const nuevasPlazas = servicio.plazas - 1
          const updates: Record<string, unknown> = {
            plazas:     nuevasPlazas,
            updated_at: new Date().toISOString(),
          }
          // Opción C: si llegan a 0 → desactivar automáticamente
          if (nuevasPlazas === 0) {
            updates.activo = false
          }

          await supabase
            .from("servicios")
            .update(updates)
            .eq("id", solicitud.servicio_id)
        }
      }
    }

    return {}
  }
}