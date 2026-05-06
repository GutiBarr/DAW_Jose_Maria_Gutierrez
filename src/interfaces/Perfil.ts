import type { RolUsuario } from "@/interfaces/Usuario"

export interface Perfil {
  id:              string
  email:           string
  rol:             RolUsuario
  nombre?:         string
  nombre_entidad?: string
  telefono?:       string
  direccion?:      string
  avatar_url?:     string
  activo:          boolean
  created_at:      string
}