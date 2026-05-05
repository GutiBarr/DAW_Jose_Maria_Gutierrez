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
  visitas:     number
  consultas:   number
  created_at:  string
  updated_at:  string
}

export interface DatosCrearServicio {
  nombre:      string
  descripcion: string
  tipo:        TipoServicio
  ubicacion:   string
  telefono:    string
  imagen_url?: string
}