export type RolUsuario = "familia" | "entidad" | "admin"

export interface Usuario {
  id: string
  email: string
  rol: RolUsuario
  nombre?: string
  // Campos opcionales específicos por rol
  nombreEntidad?: string
  cif?: string
  telefono?: string
  personaContacto?: string
}

// Datos para registrar una familia
export interface DatosRegistroFamilia {
  nombre: string
  email: string
  password: string
}

// Datos para registrar una entidad
export interface DatosRegistroEntidad {
  nombreEntidad: string
  cif: string
  personaContacto: string
  telefono: string
  email: string
  password: string
}

// Datos para login
export interface DatosLogin {
  email: string
  password: string
}