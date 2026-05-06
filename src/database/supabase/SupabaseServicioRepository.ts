import type { ServicioRepository, FiltrosServicio } from "@/database/repositories/ServicioRepository"
import type { Servicio, DatosCrearServicio } from "@/interfaces/Servicio"
import { supabase } from "./Client"

export class SupabaseServicioRepository implements ServicioRepository {
  async subirImagen(archivo: File, entidadId: string): Promise<{ url?: string; error?: string }> {
    const extension = archivo.name.split(".").pop()
    const ruta = `${entidadId}/${Date.now()}.${extension}`

    const { error } = await supabase.storage
      .from("servicios-imagenes")
      .upload(ruta, archivo, { upsert: false })

    if (error) {
      console.error("subirImagen:", error)
      return { error: "No se pudo subir la imagen" }
    }

    const { data } = supabase.storage
      .from("servicios-imagenes")
      .getPublicUrl(ruta)

    return { url: data.publicUrl }
  }

  async obtenerMisServicios(): Promise<Servicio[]> {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("obtenerMisServicios:", error)
      return []
    }

    return data as Servicio[]
  }

  async buscarServicios(filtros: FiltrosServicio): Promise<Servicio[]> {
    let query = supabase
      .from("servicios")
      .select("*")
      .eq("activo", true)
      .order("created_at", { ascending: false })

    if (filtros.tipo && filtros.tipo !== "") {
      query = query.eq("tipo", filtros.tipo)
    }

    if (filtros.ubicacion && filtros.ubicacion.trim() !== "") {
      query = query.ilike("ubicacion", `%${filtros.ubicacion.trim()}%`)
    }

    if (filtros.nombre && filtros.nombre.trim() !== "") {
      query = query.ilike("nombre", `%${filtros.nombre.trim()}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error("buscarServicios:", error)
      return []
    }

    return data as Servicio[]
  }

  async crearServicio(datos: DatosCrearServicio) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "No hay sesión activa" }

    const { data, error } = await supabase
      .from("servicios")
      .insert({ ...datos, entidad_id: user.id })
      .select()
      .single()

    if (error) {
      console.error("crearServicio:", error)
      return { error: "No se pudo crear el servicio" }
    }

    return { data: data as Servicio }
  }

  async actualizarServicio(id: string, datos: Partial<DatosCrearServicio>) {
    const { error } = await supabase
      .from("servicios")
      .update({ ...datos, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      console.error("actualizarServicio:", error)
      return { error: "No se pudo actualizar el servicio" }
    }

    return {}
  }

  async eliminarServicio(id: string) {
    const { error } = await supabase
      .from("servicios")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("eliminarServicio:", error)
      return { error: "No se pudo eliminar el servicio" }
    }

    return {}
  }

  async toggleActivo(id: string, activo: boolean) {
    const { error } = await supabase
      .from("servicios")
      .update({ activo, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      console.error("toggleActivo:", error)
      return { error: "No se pudo actualizar el estado" }
    }

    return {}
  }

  async incrementarVisitas(id: string): Promise<void> {
    const { error } = await supabase.rpc("incrementar_visitas", { servicio_id: id })
    if (error) {
      console.error("incrementarVisitas:", error)
    }
  }
}