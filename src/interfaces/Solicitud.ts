export type EstadoSolicitud = "pendiente" | "aceptada" | "rechazada"
export type UrgenciaSolicitud = "baja" | "media" | "alta"

export interface Solicitud {
  id:                string
  servicio_id:       string
  familia_id:        string
  entidad_id:        string
  nombre_familiar:   string
  tipo_necesidad:    string
  urgencia:          UrgenciaSolicitud
  mensaje:           string
  estado:            EstadoSolicitud
  mensaje_respuesta?: string
  created_at:        string
  updated_at:        string
  // Join con servicios (opcional)
  servicio?: {
    nombre:    string
    tipo:      string
    ubicacion: string
  }
}

export interface DatosCrearSolicitud {
  servicio_id:     string
  entidad_id:      string
  nombre_familiar: string
  tipo_necesidad:  string
  urgencia:        UrgenciaSolicitud
  mensaje:         string
}

export interface DatosResponderSolicitud {
  estado:            "aceptada" | "rechazada"
  mensaje_respuesta: string
}