import type { Perfil } from "@/interfaces/Perfil"

export interface DatosActualizarPerfil {
  nombre?:         string
  nombre_entidad?: string
  telefono?:       string
  direccion?:      string
  avatar_url?:     string
}

export interface PerfilRepository {
  obtenerMiPerfil(): Promise<Perfil | null>
  actualizarPerfil(datos: DatosActualizarPerfil): Promise<{ error?: string }>
  subirAvatar(archivo: File, userId: string): Promise<{ url?: string; error?: string }>
}
