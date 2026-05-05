import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"

export interface AdminRepository {
  obtenerPerfiles(): Promise<Perfil[]>
  cambiarRol(id: string, rol: RolUsuario): Promise<{ error?: string }>
  toggleActivoUsuario(id: string, activo: boolean): Promise<{ error?: string }>
  eliminarUsuario(id: string): Promise<{ error?: string }>
  obtenerTodosServicios(): Promise<Servicio[]>
  eliminarServicio(id: string): Promise<{ error?: string }>
  toggleActivoServicio(id: string, activo: boolean): Promise<{ error?: string }>
}