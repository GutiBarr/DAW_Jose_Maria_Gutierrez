import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Usuario, DatosLogin, DatosRegistroFamilia, DatosRegistroEntidad, RolUsuario } from "@/interfaces/Usuario"
import { createAuthRepository } from "@/database/repositories"
import { supabase } from "@/database/supabase/Client"
import { usePerfilStore } from "@/store/perfilStore"
import { useServicioStore } from "@/store/servicioStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { useAdminStore } from "@/store/adminStore"

const authRepo = createAuthRepository()

let cerrandoSesion = false
let unsubscribeAuth: (() => void) | null = null
let inicializando = false

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
  useAdminStore.getState().reset()
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      usuario:      null,
      cargando:     false,
      inicializado: false,

      inicializar: async () => {
        if (cerrandoSesion || inicializando) return
        inicializando = true

        if (unsubscribeAuth) {
          unsubscribeAuth()
          unsubscribeAuth = null
        }

        try {
          const usuarioObtenido = await authRepo.obtenerUsuarioActual()

          // Si mientras esperábamos el await un iniciarSesion ya estableció usuario,
          // no sobreescribir con null — solo marcar como inicializado
          if (!usuarioObtenido && get().usuario) {
            set({ inicializado: true })
          } else {
            const usuario = usuarioObtenido

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
          }

          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (cerrandoSesion) return

            // INITIAL_SESSION se dispara al suscribirse; el usuario ya fue cargado arriba
            if (_event === "INITIAL_SESSION") return

            if (_event === "SIGNED_OUT" || !session?.user) {
              set({ usuario: null })
              return
            }

            // SIGNED_IN desde otra pestaña o TOKEN_REFRESHED:
            // si ya hay usuario en el store no hacemos nada (iniciarSesion/inicializar ya lo pusieron)
            if (get().usuario) return

            const u = session.user
            const metadata = u.user_metadata ?? {}
            set({
              usuario: {
                id:             u.id,
                email:          u.email!,
                rol:            (metadata.rol as RolUsuario) ?? "familia",
                nombre:         metadata.nombre,
                nombreEntidad:  metadata.nombreEntidad,
                cif:            metadata.cif,
                personaContacto: metadata.personaContacto,
                telefono:       metadata.telefono,
              },
            })
          })
          unsubscribeAuth = () => subscription.unsubscribe()
        } catch (e) {
          console.error("inicializar error:", e)
          set({ inicializado: true })
        } finally {
          inicializando = false
        }
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
          await authRepo.cerrarSesion()
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