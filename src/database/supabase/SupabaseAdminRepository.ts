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
    // 1. Actualizar el estado del perfil
    const { error: errorPerfil } = await supabase
      .from("perfiles")
      .update({ activo })
      .eq("id", id)

    if (errorPerfil) {
      console.error("toggleActivoUsuario:", errorPerfil.message)
      return { error: "No se pudo actualizar el estado" }
    }

    // 2. Cascada: ocultar/mostrar sus servicios en el catálogo
    const { error: errorServicios } = await supabase
      .from("servicios")
      .update({ activo, updated_at: new Date().toISOString() })
      .eq("entidad_id", id)

    if (errorServicios) {
      // No bloqueante — registramos pero el perfil ya quedó actualizado
      console.error("toggleActivoUsuario (servicios):", errorServicios.message)
    }

    return {}
  }

  async eliminarUsuario(id: string) {
    // La función RPC borra servicios, solicitudes, perfil y auth.users en orden correcto
    const { error } = await supabase.rpc("admin_delete_user", { user_id: id })

    if (error) {
      console.error("eliminarUsuario:", error.message)
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