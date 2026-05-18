import { create } from "zustand"
import type { Perfil } from "@/interfaces/Perfil"
import type { Servicio } from "@/interfaces/Servicio"
import type { RolUsuario } from "@/interfaces/Usuario"
import { createAdminRepository } from "@/database/repositories"

const adminRepo = createAdminRepository()

interface AdminState {
  perfiles:  Perfil[]
  servicios: Servicio[]
  cargando:  boolean
  error:     string | null

  cargarPerfiles:         () => Promise<void>
  cambiarRol:             (id: string, rol: RolUsuario) => Promise<{ error?: string }>
  toggleActivoUsuario:    (id: string, activo: boolean) => Promise<{ error?: string }>
  eliminarUsuario:        (id: string) => Promise<{ error?: string }>
  cargarTodosServicios:   () => Promise<void>
  eliminarServicio:       (id: string) => Promise<{ error?: string }>
  toggleActivoServicio:   (id: string, activo: boolean) => Promise<{ error?: string }>
  reset:                  () => void
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  perfiles:  [],
  servicios: [],
  cargando:  false,
  error:     null,

  reset: () => set({ perfiles: [], servicios: [], cargando: false, error: null }),

  cargarPerfiles: async () => {
    set({ cargando: true, error: null })
    try {
      const perfiles = await adminRepo.obtenerPerfiles()
      set({ perfiles })
    } catch (e) {
      console.error("cargarPerfiles error:", e)
      set({ error: "Error al cargar los usuarios" })
    } finally {
      set({ cargando: false })
    }
  },

  cambiarRol: async (id, rol) => {
    try {
      const { error } = await adminRepo.cambiarRol(id, rol)
      if (error) { set({ error }); return { error } }
      set({
        perfiles: get().perfiles.map((p) =>
          p.id === id ? { ...p, rol } : p
        ),
      })
      return {}
    } catch (e) {
      console.error("cambiarRol error:", e)
      const msg = "Error inesperado al cambiar el rol"
      set({ error: msg })
      return { error: msg }
    }
  },

  toggleActivoUsuario: async (id, activo) => {
    try {
      const { error } = await adminRepo.toggleActivoUsuario(id, activo)
      if (error) { set({ error }); return { error } }
      set({
        perfiles: get().perfiles.map((p) =>
          p.id === id ? { ...p, activo } : p
        ),
      })
      return {}
    } catch (e) {
      console.error("toggleActivoUsuario error:", e)
      const msg = "Error inesperado al cambiar estado"
      set({ error: msg })
      return { error: msg }
    }
  },

  eliminarUsuario: async (id) => {
    try {
      const { error } = await adminRepo.eliminarUsuario(id)
      if (error) { set({ error }); return { error } }
      set({ perfiles: get().perfiles.filter((p) => p.id !== id) })
      return {}
    } catch (e) {
      console.error("eliminarUsuario error:", e)
      const msg = "Error inesperado al eliminar el usuario"
      set({ error: msg })
      return { error: msg }
    }
  },

  cargarTodosServicios: async () => {
    set({ cargando: true, error: null })
    try {
      const servicios = await adminRepo.obtenerTodosServicios()
      set({ servicios })
    } catch (e) {
      console.error("cargarTodosServicios error:", e)
      set({ error: "Error al cargar los servicios" })
    } finally {
      set({ cargando: false })
    }
  },

  eliminarServicio: async (id) => {
    try {
      const { error } = await adminRepo.eliminarServicio(id)
      if (error) { set({ error }); return { error } }
      set({ servicios: get().servicios.filter((s) => s.id !== id) })
      return {}
    } catch (e) {
      console.error("eliminarServicio error:", e)
      const msg = "Error inesperado al eliminar el servicio"
      set({ error: msg })
      return { error: msg }
    }
  },

  toggleActivoServicio: async (id, activo) => {
    try {
      const { error } = await adminRepo.toggleActivoServicio(id, activo)
      if (error) { set({ error }); return { error } }
      set({
        servicios: get().servicios.map((s) =>
          s.id === id ? { ...s, activo } : s
        ),
      })
      return {}
    } catch (e) {
      console.error("toggleActivoServicio error:", e)
      const msg = "Error inesperado al cambiar estado del servicio"
      set({ error: msg })
      return { error: msg }
    }
  },
}))