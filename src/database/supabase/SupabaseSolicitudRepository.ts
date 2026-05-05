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
    const { error } = await supabase
      .from("solicitudes")
      .update({
        estado:             datos.estado,
        mensaje_respuesta:  datos.mensaje_respuesta,
        updated_at:         new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("responderSolicitud:", error)
      return { error: "No se pudo responder la solicitud" }
    }

    return {}
  }
}