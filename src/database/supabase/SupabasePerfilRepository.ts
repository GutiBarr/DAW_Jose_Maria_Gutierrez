import type { PerfilRepository, DatosActualizarPerfil } from "@/database/repositories/PerfilRepository"
import type { Perfil } from "@/interfaces/Perfil"
import { supabase } from "./Client"

export class SupabasePerfilRepository implements PerfilRepository {
  async obtenerMiPerfil(): Promise<Perfil | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (error) {
      console.error("obtenerMiPerfil:", error)
      return null
    }

    return data as Perfil
  }

  async actualizarPerfil(datos: DatosActualizarPerfil) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: "No hay sesión activa" }

    const { error } = await supabase
      .from("perfiles")
      .update({ ...datos, updated_at: new Date().toISOString() })
      .eq("id", user.id)

    if (error) {
      console.error("actualizarPerfil:", error)
      return { error: "No se pudo actualizar el perfil" }
    }

    return {}
  }

  async subirAvatar(archivo: File, userId: string) {
    const extension = archivo.name.split(".").pop()
    const ruta = `${userId}/avatar.${extension}`

    const { error } = await supabase.storage
      .from("avatares")
      .upload(ruta, archivo, { upsert: true })

    if (error) {
      console.error("subirAvatar:", error)
      return { error: "No se pudo subir la imagen" }
    }

    const { data } = supabase.storage
      .from("avatares")
      .getPublicUrl(ruta)

    const url = `${data.publicUrl}?t=${Date.now()}`
    return { url }
  }
}