import type { AuthRepository } from "@/database/repositories/AuthRepository"
import type {
  Usuario,
  DatosRegistroFamilia,
  DatosRegistroEntidad,
  DatosLogin,
  RolUsuario,
} from "@/interfaces/Usuario"
import { supabase } from "./Client"

export class SupabaseAuthRepository implements AuthRepository {
  async registrarFamilia(datos: DatosRegistroFamilia) {
    const { data, error } = await supabase.auth.signUp({
      email: datos.email,
      password: datos.password,
      options: {
        data: {
          rol: "familia" as RolUsuario,
          nombre: datos.nombre,
        },
      },
    })

    if (error) {
      console.error("Error registrarFamilia:", error)
      return { error: this.traducirError(error.message) }
    }

    if (!data.user) {
      return { error: "No se pudo crear el usuario" }
    }

    return {
      data: {
        id: data.user.id,
        email: data.user.email!,
        rol: "familia" as RolUsuario,
        nombre: datos.nombre,
      },
    }
  }

  async registrarEntidad(datos: DatosRegistroEntidad) {
    const { data, error } = await supabase.auth.signUp({
      email: datos.email,
      password: datos.password,
      options: {
        data: {
          rol: "entidad" as RolUsuario,
          nombreEntidad: datos.nombreEntidad,
          cif: datos.cif,
          personaContacto: datos.personaContacto,
          telefono: datos.telefono,
        },
      },
    })

    if (error) {
      console.error("Error registrarEntidad:", error)
      return { error: this.traducirError(error.message) }
    }

    if (!data.user) {
      return { error: "No se pudo crear la entidad" }
    }

    return {
      data: {
        id: data.user.id,
        email: data.user.email!,
        rol: "entidad" as RolUsuario,
        nombreEntidad: datos.nombreEntidad,
        cif: datos.cif,
        personaContacto: datos.personaContacto,
        telefono: datos.telefono,
      },
    }
  }

  async iniciarSesion(datos: DatosLogin) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: datos.email,
      password: datos.password,
    })

    if (error) {
      console.error("Error iniciarSesion:", error)
      return { error: this.traducirError(error.message) }
    }

    if (!data.user) {
      return { error: "No se pudo iniciar sesión" }
    }

    const metadata = data.user.user_metadata || {}

    return {
      data: {
        id: data.user.id,
        email: data.user.email!,
        rol: (metadata.rol as RolUsuario) || "familia",
        nombre: metadata.nombre,
        nombreEntidad: metadata.nombreEntidad,
        cif: metadata.cif,
        personaContacto: metadata.personaContacto,
        telefono: metadata.telefono,
      },
    }
  }

  async cerrarSesion() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error cerrarSesion:", error)
      return { error: error.message }
    }
    return {}
  }

  async obtenerUsuarioActual(): Promise<Usuario | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const metadata = user.user_metadata || {}

    return {
      id: user.id,
      email: user.email!,
      rol: (metadata.rol as RolUsuario) || "familia",
      nombre: metadata.nombre,
      nombreEntidad: metadata.nombreEntidad,
      cif: metadata.cif,
      personaContacto: metadata.personaContacto,
      telefono: metadata.telefono,
    }
  }

  /**
   * Traduce los errores más comunes de Supabase a español.
   */
  private traducirError(mensaje: string): string {
    const mapaErrores: Record<string, string> = {
      "Invalid login credentials": "Email o contraseña incorrectos",
      "User already registered": "Este email ya está registrado",
      "Password should be at least 6 characters":
        "La contraseña debe tener al menos 6 caracteres",
      "Unable to validate email address: invalid format":
        "El formato del email no es válido",
    }

    return mapaErrores[mensaje] || mensaje
  }
}