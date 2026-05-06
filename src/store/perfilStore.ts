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
    try {
      const perfil = await perfilRepo.obtenerMiPerfil()
      set({ perfil })
    } catch (e) {
      console.error("cargarPerfil error:", e)
      set({ error: "Error al cargar el perfil" })
    } finally {
      set({ cargando: false })
    }
  },

  actualizarPerfil: async (datos) => {
    set({ cargando: true, error: null })
    try {
      const { error } = await perfilRepo.actualizarPerfil(datos)
      if (error) { set({ error }); return { error } }
      set((state) => ({
        perfil: state.perfil ? { ...state.perfil, ...datos } : null,
      }))
      return {}
    } catch (e) {
      console.error("actualizarPerfil error:", e)
      const msg = "Error inesperado al guardar"
      set({ error: msg })
      return { error: msg }
    } finally {
      set({ cargando: false })
    }
  },

  subirAvatar: async (archivo, userId) => {
    try {
      return await perfilRepo.subirAvatar(archivo, userId)
    } catch (e) {
      console.error("subirAvatar error:", e)
      return { error: "Error al subir la imagen" }
    }
  },
}))