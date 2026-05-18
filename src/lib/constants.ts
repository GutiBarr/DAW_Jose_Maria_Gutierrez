import type { TipoServicio } from "@/interfaces/Servicio"

export const estadoBadge = {
  pendiente: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
  aceptada:  "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
  rechazada: "bg-red-500/10 text-red-500 border border-red-500/20",
} as const

export const urgenciaBadge = {
  baja:  "bg-muted text-muted-foreground",
  media: "bg-amber-500/10 text-amber-500",
  alta:  "bg-red-500/10 text-red-500",
} as const

/** Tipos de servicio disponibles en la plataforma */
export const TIPOS_SERVICIO: TipoServicio[] = [
  "Centro de Día",
  "Atención Temprana",
  "Actividades Ocupacionales",
  "Residencia",
  "Terapia Especializada",
  "Apoyo Familiar",
  "Empleo con Apoyo",
  "Respiro Familiar",
  "Otro",
]

/** Tipos de necesidad para solicitudes */
export const TIPOS_NECESIDAD: string[] = [
  "Discapacidad intelectual",
  "Discapacidad física",
  "Discapacidad sensorial",
  "Trastorno del espectro autista",
  "Enfermedad mental",
  "Enfermedad rara",
  "Daño cerebral adquirido",
  "Otro",
]
