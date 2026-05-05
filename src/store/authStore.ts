import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Usuario, DatosLogin, DatosRegistroFamilia, DatosRegistroEntidad } from "@/interfaces/Usuario"
import { createAuthRepository } from "@/database/repositories"
import { supabase } from "@/database/supabase/Client"

const authRepo = createAuthRepository()

// Flag para evitar que onAuthStateChange interfiera durante el logout
let cerrandoSesion = false

interface AuthState {
  usuario:      Usuario | null
  cargando:     boolean
  inicializado: boolean

  registrarFamilia: (datos: DatosRegistroFamilia) => Promise<{ error?: string }>
  registrarEntidad: (datos: DatosRegistroEntidad) => Promise<{ error?: string }>
  iniciarSesion:    (datos: DatosLogin) => Promise<{ error?: string }>
  cerrarSesion:     () => Promise<void>
  inicializar:      () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario:      null,
      cargando:     false,
      inicializado: false,

      inicializar: async () => {
        // Si estamos cerrando sesión no hacer nada
        if (cerrandoSesion) return

        const usuario = await authRepo.obtenerUsuarioActual()

        if (usuario) {
          const { data: perfil } = await supabase
            .from("perfiles")
            .select("activo")
            .eq("id", usuario.id)
            .single()

          if (perfil && !perfil.activo) {
            cerrandoSesion = true
            await supabase.auth.signOut({ scope: "local" })
            cerrandoSesion = false
            set({ usuario: null, inicializado: true })
            return
          }
        }

        set({ usuario, inicializado: true })

        supabase.auth.onAuthStateChange(async (_event, session) => {
          if (cerrandoSesion) return

          if (_event === "SIGNED_OUT" || !session) {
            set({ usuario: null })
            return
          }

          const u = await authRepo.obtenerUsuarioActual()
          if (!u) { set({ usuario: null }); return }

          const { data: perfil } = await supabase
            .from("perfiles")
            .select("activo")
            .eq("id", u.id)
            .single()

          if (perfil && !perfil.activo) {
            cerrandoSesion = true
            await supabase.auth.signOut({ scope: "local" })
            cerrandoSesion = false
            set({ usuario: null })
            return
          }

          set({ usuario: u })
        })
      },

      registrarFamilia: async (datos) => {
        set({ cargando: true })
        const { data, error } = await authRepo.registrarFamilia(datos)
        set({ cargando: false })
        if (error) return { error }
        set({ usuario: data })
        return {}
      },

      registrarEntidad: async (datos) => {
        set({ cargando: true })
        const { data, error } = await authRepo.registrarEntidad(datos)
        set({ cargando: false })
        if (error) return { error }
        set({ usuario: data })
        return {}
      },

      iniciarSesion: async (datos) => {
        set({ cargando: true })
        const { data, error } = await authRepo.iniciarSesion(datos)
        set({ cargando: false })
        if (error) return { error }
        set({ usuario: data })
        return {}
      },

      cerrarSesion: async () => {
        cerrandoSesion = true
        set({ usuario: null, inicializado: false })
        localStorage.removeItem("conciliaex-auth")
        try {
          await supabase.auth.signOut({ scope: "local" })
        } catch (e) {
          console.error(e)
        }
        cerrandoSesion = false
        window.location.replace("/")
      },
    }),
    {
      name: "conciliaex-auth",
      partialize: (state) => ({ usuario: state.usuario }),
    },
  ),
)