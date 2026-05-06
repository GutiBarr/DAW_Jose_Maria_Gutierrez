import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Usuario, DatosLogin, DatosRegistroFamilia, DatosRegistroEntidad } from "@/interfaces/Usuario"
import { createAuthRepository } from "@/database/repositories"
import { supabase } from "@/database/supabase/Client"
import { usePerfilStore } from "@/store/perfilStore"
import { useServicioStore } from "@/store/servicioStore"
import { useSolicitudStore } from "@/store/solicitudStore"

const authRepo = createAuthRepository()

let cerrandoSesion = false
let unsubscribeAuth: (() => void) | null = null

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

// Limpia todos los stores que guardan datos de usuario
function limpiarStores() {
  localStorage.removeItem("conciliaex-auth")
  usePerfilStore.getState().reset()
  useServicioStore.getState().reset()
  useSolicitudStore.getState().reset()
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario:      null,
      cargando:     false,
      inicializado: false,

      inicializar: async () => {
        if (cerrandoSesion) return

        if (unsubscribeAuth) {
          unsubscribeAuth()
          unsubscribeAuth = null
        }

        const usuario = await authRepo.obtenerUsuarioActual()

        if (usuario) {
          const { data: perfil } = await supabase
            .from("perfiles")
            .select("activo")
            .eq("id", usuario.id)
            .single()

          if (!perfil || !perfil.activo) {
            cerrandoSesion = true
            await supabase.auth.signOut({ scope: "local" })
            cerrandoSesion = false
            set({ usuario: null, inicializado: true })
            return
          }
        }

        set({ usuario, inicializado: true })

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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

          if (!perfil || !perfil.activo) {
            cerrandoSesion = true
            await supabase.auth.signOut({ scope: "local" })
            cerrandoSesion = false
            set({ usuario: null })
            return
          }

          set({ usuario: u })
        })
        unsubscribeAuth = () => subscription.unsubscribe()
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

        if (unsubscribeAuth) {
          unsubscribeAuth()
          unsubscribeAuth = null
        }

        set({ usuario: null, inicializado: false })
        limpiarStores()

        try {
          await supabase.auth.signOut({ scope: "local" })
        } catch (e) {
          console.error(e)
        }

        window.location.replace("/")
      },
    }),
    {
      name: "conciliaex-auth",
      partialize: (state) => ({ usuario: state.usuario }),
    },
  ),
)