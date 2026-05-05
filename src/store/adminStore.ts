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
}

export const useAdminStore = create<AdminState>()((set, get) => ({
  perfiles:  [],
  servicios: [],
  cargando:  false,
  error:     null,

  cargarPerfiles: async () => {
    set({ cargando: true, error: null })
    const perfiles = await adminRepo.obtenerPerfiles()
    set({ perfiles, cargando: false })
  },

  cambiarRol: async (id, rol) => {
    const { error } = await adminRepo.cambiarRol(id, rol)
    if (error) { set({ error }); return { error } }
    set({
      perfiles: get().perfiles.map((p) =>
        p.id === id ? { ...p, rol } : p
      ),
    })
    return {}
  },

  toggleActivoUsuario: async (id, activo) => {
    const { error } = await adminRepo.toggleActivoUsuario(id, activo)
    if (error) { set({ error }); return { error } }
    set({
      perfiles: get().perfiles.map((p) =>
        p.id === id ? { ...p, activo } : p
      ),
    })
    return {}
  },

  eliminarUsuario: async (id) => {
    const { error } = await adminRepo.eliminarUsuario(id)
    if (error) { set({ error }); return { error } }
    set({ perfiles: get().perfiles.filter((p) => p.id !== id) })
    return {}
  },

  cargarTodosServicios: async () => {
    set({ cargando: true, error: null })
    const servicios = await adminRepo.obtenerTodosServicios()
    set({ servicios, cargando: false })
  },

  eliminarServicio: async (id) => {
    const { error } = await adminRepo.eliminarServicio(id)
    if (error) { set({ error }); return { error } }
    set({ servicios: get().servicios.filter((s) => s.id !== id) })
    return {}
  },

  toggleActivoServicio: async (id, activo) => {
    const { error } = await adminRepo.toggleActivoServicio(id, activo)
    if (error) { set({ error }); return { error } }
    set({
      servicios: get().servicios.map((s) =>
        s.id === id ? { ...s, activo } : s
      ),
    })
    return {}
  },
}))