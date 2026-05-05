import { create } from "zustand"
import type { Perfil } from "@/interfaces/Perfil"
import type { DatosActualizarPerfil } from "@/database/repositories/PerfilRepository"
import { createPerfilRepository } from "@/database/repositories"

const perfilRepo = createPerfilRepository()

interface PerfilState {
  perfil:   Perfil | null
  cargando: boolean
  error:    string | null

  cargarPerfil:     () => Promise<void>
  actualizarPerfil: (datos: DatosActualizarPerfil) => Promise<{ error?: string }>
  subirAvatar:      (archivo: File, userId: string) => Promise<{ url?: string; error?: string }>
}

export const usePerfilStore = create<PerfilState>()((set) => ({
  perfil:   null,
  cargando: false,
  error:    null,

  cargarPerfil: async () => {
    set({ cargando: true, error: null })
    const perfil = await perfilRepo.obtenerMiPerfil()
    set({ perfil, cargando: false })
  },

  actualizarPerfil: async (datos) => {
    set({ cargando: true, error: null })
    const { error } = await perfilRepo.actualizarPerfil(datos)
    set({ cargando: false })
    if (error) { set({ error }); return { error } }
    set((state) => ({
      perfil: state.perfil ? { ...state.perfil, ...datos } : null,
    }))
    return {}
  },

  subirAvatar: async (archivo, userId) => {
    return await perfilRepo.subirAvatar(archivo, userId)
  },
}))