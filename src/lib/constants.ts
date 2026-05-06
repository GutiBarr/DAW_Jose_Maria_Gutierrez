import type { TipoServicio } from "@/interfaces/Servicio"

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
