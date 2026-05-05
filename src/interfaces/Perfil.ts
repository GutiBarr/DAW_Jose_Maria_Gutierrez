import type { RolUsuario } from "@/interfaces/Usuario"

export interface Perfil {
  id:             string
  email:          string
  rol:            RolUsuario
  nombre?:        string
  nombre_entidad?: string
  activo:         boolean
  created_at:     string
}