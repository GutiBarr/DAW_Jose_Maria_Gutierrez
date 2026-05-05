import type { AdminRepository } from "@/database/repositories/AdminRepository"
import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"
import { supabase } from "./Client"

export class SupabaseAdminRepository implements AdminRepository {
  async obtenerPerfiles(): Promise<Perfil[]> {
    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("obtenerPerfiles:", error)
      return []
    }

    return data as Perfil[]
  }

  async cambiarRol(id: string, rol: RolUsuario) {
    const { error } = await supabase
      .from("perfiles")
      .update({ rol })
      .eq("id", id)

    if (error) {
      console.error("cambiarRol:", error)
      return { error: "No se pudo cambiar el rol" }
    }

    return {}
  }

  async toggleActivoUsuario(id: string, activo: boolean) {
    const { error } = await supabase
      .from("perfiles")
      .update({ activo })
      .eq("id", id)

    if (error) {
      console.error("toggleActivoUsuario:", error)
      return { error: "No se pudo actualizar el estado" }
    }

    return {}
  }

  async eliminarUsuario(id: string) {
  // Desactivar y eliminar perfil (auth.users no se puede borrar desde cliente)
  const { error } = await supabase
    .from("perfiles")
    .update({ activo: false })
    .eq("id", id)

  if (error) {
    console.error("eliminarUsuario:", error)
    return { error: "No se pudo eliminar el usuario" }
  }

  return {}
}

  async obtenerTodosServicios(): Promise<Servicio[]> {
    const { data, error } = await supabase
      .from("servicios")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("obtenerTodosServicios:", error)
      return []
    }

    return data as Servicio[]
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

  async toggleActivoServicio(id: string, activo: boolean) {
    const { error } = await supabase
      .from("servicios")
      .update({ activo, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      console.error("toggleActivoServicio:", error)
      return { error: "No se pudo actualizar el estado" }
    }

    return {}
  }
}