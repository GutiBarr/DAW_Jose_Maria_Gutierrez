export type TipoServicio =
  | "Centro de Día"
  | "Atención Temprana"
  | "Actividades Ocupacionales"
  | "Residencia"
  | "Terapia Especializada"
  | "Apoyo Familiar"
  | "Empleo con Apoyo"
  | "Respiro Familiar"
  | "Otro"

export interface Servicio {
  id:          string
  entidad_id:  string
  nombre:      string
  descripcion: string
  tipo:        TipoServicio
  ubicacion:   string
  telefono:    string
  imagen_url?: string
  activo:      boolean
  plazas:      number | null  // null = sin límite de plazas
  visitas:     number
  consultas:   number
  created_at:  string
  updated_at:  string
  perfiles?: {
    nombre_entidad?: string
    avatar_url?:     string
  }
}

export interface DatosCrearServicio {
  nombre:      string
  descripcion: string
  tipo:        TipoServicio
  ubicacion:   string
  telefono:    string
  imagen_url?: string
  plazas?:     number | null  // null = sin límite
}