import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Usuario } from "@/interfaces/Usuario"
import { createAuthRepository } from "@/database/repositories"
import type {
  DatosLogin,
  DatosRegistroFamilia,
  DatosRegistroEntidad,
} from "@/interfaces/Usuario"

const authRepo = createAuthRepository()

interface AuthState {
  usuario: Usuario | null
  cargando: boolean

  registrarFamilia: (
    datos: DatosRegistroFamilia,
  ) => Promise<{ error?: string }>
  registrarEntidad: (
    datos: DatosRegistroEntidad,
  ) => Promise<{ error?: string }>
  iniciarSesion: (datos: DatosLogin) => Promise<{ error?: string }>
  cerrarSesion: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      cargando: false,

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
        await authRepo.cerrarSesion()
        set({ usuario: null })
      },
    }),
    {
      name: "conciliaex-auth",
    },
  ),
)