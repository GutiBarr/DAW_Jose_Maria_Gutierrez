import type {
  Usuario,
  DatosRegistroFamilia,
  DatosRegistroEntidad,
  DatosLogin,
} from "@/interfaces/Usuario"

export interface AuthRepository {
  /**
   * Registra una cuenta de familia.
   */
  registrarFamilia(
    datos: DatosRegistroFamilia,
  ): Promise<{ data?: Usuario; error?: string }>

  /**
   * Registra una cuenta de entidad.
   */
  registrarEntidad(
    datos: DatosRegistroEntidad,
  ): Promise<{ data?: Usuario; error?: string }>

  /**
   * Inicia sesión con email y contraseña.
   */
  iniciarSesion(
    datos: DatosLogin,
  ): Promise<{ data?: Usuario; error?: string }>

  /**
   * Cierra la sesión del usuario actual.
   */
  cerrarSesion(): Promise<{ error?: string }>

  /**
   * Obtiene el usuario actualmente logueado (si existe).
   */
  obtenerUsuarioActual(): Promise<Usuario | null>
}