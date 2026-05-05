import { create } from "zustand"
import type { Servicio, DatosCrearServicio } from "@/interfaces/Servicio"
import type { FiltrosServicio } from "@/database/repositories/ServicioRepository"
import { createServicioRepository } from "@/database/repositories"

const servicioRepo = createServicioRepository()

interface ServicioState {
  servicios:        Servicio[]
  resultados:       Servicio[]
  cargando:         boolean
  cargandoBusqueda: boolean
  error:            string | null

  cargarMisServicios: () => Promise<void>
  buscarServicios:    (filtros: FiltrosServicio) => Promise<void>
  subirImagen:        (archivo: File, entidadId: string) => Promise<{ url?: string; error?: string }>
  crearServicio:      (datos: DatosCrearServicio) => Promise<{ error?: string }>
  actualizarServicio: (id: string, datos: Partial<DatosCrearServicio>) => Promise<{ error?: string }>
  eliminarServicio:   (id: string) => Promise<{ error?: string }>
  toggleActivo:       (id: string, activo: boolean) => Promise<{ error?: string }>
}

export const useServicioStore = create<ServicioState>()((set, get) => ({
  servicios:        [],
  resultados:       [],
  cargando:         false,
  cargandoBusqueda: false,
  error:            null,

  cargarMisServicios: async () => {
    set({ cargando: true, error: null })
    const servicios = await servicioRepo.obtenerMisServicios()
    set({ servicios, cargando: false })
  },

  buscarServicios: async (filtros) => {
    set({ cargandoBusqueda: true, error: null })
    const resultados = await servicioRepo.buscarServicios(filtros)
    set({ resultados, cargandoBusqueda: false })
  },

  subirImagen: async (archivo, entidadId) => {
    return await servicioRepo.subirImagen(archivo, entidadId)
  },

  crearServicio: async (datos) => {
    set({ cargando: true, error: null })
    const { data, error } = await servicioRepo.crearServicio(datos)
    set({ cargando: false })
    if (error) { set({ error }); return { error } }
    if (data) set({ servicios: [data, ...get().servicios] })
    return {}
  },

  actualizarServicio: async (id, datos) => {
    const { error } = await servicioRepo.actualizarServicio(id, datos)
    if (error) { set({ error }); return { error } }
    set({
      servicios: get().servicios.map((s) =>
        s.id === id ? { ...s, ...datos } : s
      ),
    })
    return {}
  },

  eliminarServicio: async (id) => {
    const { error } = await servicioRepo.eliminarServicio(id)
    if (error) { set({ error }); return { error } }
    set({ servicios: get().servicios.filter((s) => s.id !== id) })
    return {}
  },

  toggleActivo: async (id, activo) => {
    const { error } = await servicioRepo.toggleActivo(id, activo)
    if (error) { set({ error }); return { error } }
    set({
      servicios: get().servicios.map((s) =>
        s.id === id ? { ...s, activo } : s
      ),
    })
    return {}
  },
}))