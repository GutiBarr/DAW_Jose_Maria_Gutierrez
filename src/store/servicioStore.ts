import { create } from "zustand"
import type { Servicio, DatosCrearServicio } from "@/interfaces/Servicio"
import type { FiltrosServicio } from "@/database/repositories/ServicioRepository"
import { createServicioRepository } from "@/database/repositories"

const servicioRepo = createServicioRepository()

let searchIdActual    = 0
let cargarServiciosId = 0

interface ServicioState {
  servicios:        Servicio[]
  resultados:       Servicio[]
  cargando:         boolean
  cargandoBusqueda: boolean
  error:            string | null

  cargarMisServicios:  () => Promise<void>
  buscarServicios:     (filtros: FiltrosServicio) => Promise<void>
  subirImagen:         (archivo: File, entidadId: string) => Promise<{ url?: string; error?: string }>
  crearServicio:       (datos: DatosCrearServicio) => Promise<{ error?: string }>
  actualizarServicio:  (id: string, datos: Partial<DatosCrearServicio>) => Promise<{ error?: string }>
  eliminarServicio:    (id: string) => Promise<{ error?: string }>
  toggleActivo:        (id: string, activo: boolean) => Promise<{ error?: string }>
  incrementarVisitas:  (id: string) => Promise<void>
  reset:               () => void
}

export const useServicioStore = create<ServicioState>()((set, get) => ({
  servicios:        [],
  resultados:       [],
  cargando:         false,
  cargandoBusqueda: false,
  error:            null,

  reset: () => set({ servicios: [], resultados: [], cargando: false, cargandoBusqueda: false, error: null }),

  cargarMisServicios: async () => {
    const miId = ++cargarServiciosId
    set({ cargando: true, error: null })
    try {
      const servicios = await servicioRepo.obtenerMisServicios()
      if (miId !== cargarServiciosId) return
      set({ servicios })
    } catch (e) {
      if (miId !== cargarServiciosId) return
      console.error("cargarMisServicios error:", e)
      set({ error: "Error al cargar los servicios" })
    } finally {
      if (miId === cargarServiciosId) set({ cargando: false })
    }
  },

  buscarServicios: async (filtros) => {
    const miId = ++searchIdActual
    set({ cargandoBusqueda: true, error: null })
    try {
      const resultados = await servicioRepo.buscarServicios(filtros)
      if (miId !== searchIdActual) return
      set({ resultados })
    } catch (e) {
      if (miId !== searchIdActual) return
      console.error("buscarServicios error:", e)
      set({ resultados: [], error: "Error al buscar servicios" })
    } finally {
      if (miId === searchIdActual) {
        set({ cargandoBusqueda: false })
      }
    }
  },

  subirImagen: async (archivo, entidadId) => {
    try {
      return await servicioRepo.subirImagen(archivo, entidadId)
    } catch (e) {
      console.error("subirImagen error:", e)
      return { error: "Error al subir la imagen" }
    }
  },

  crearServicio: async (datos) => {
    set({ cargando: true, error: null })
    try {
      const { data, error } = await servicioRepo.crearServicio(datos)
      if (error) { set({ error }); return { error } }
      if (data) set({ servicios: [data, ...get().servicios] })
      return {}
    } catch (e) {
      console.error("crearServicio error:", e)
      const msg = "Error inesperado al crear el servicio"
      set({ error: msg })
      return { error: msg }
    } finally {
      set({ cargando: false })
    }
  },

  actualizarServicio: async (id, datos) => {
    try {
      const { error } = await servicioRepo.actualizarServicio(id, datos)
      if (error) { set({ error }); return { error } }
      set({
        servicios: get().servicios.map((s) =>
          s.id === id ? { ...s, ...datos } : s
        ),
      })
      return {}
    } catch (e) {
      console.error("actualizarServicio error:", e)
      const msg = "Error inesperado al actualizar"
      set({ error: msg })
      return { error: msg }
    }
  },

  eliminarServicio: async (id) => {
    try {
      const { error } = await servicioRepo.eliminarServicio(id)
      if (error) { set({ error }); return { error } }
      set({ servicios: get().servicios.filter((s) => s.id !== id) })
      return {}
    } catch (e) {
      console.error("eliminarServicio error:", e)
      const msg = "Error inesperado al eliminar"
      set({ error: msg })
      return { error: msg }
    }
  },

  toggleActivo: async (id, activo) => {
    try {
      const { error } = await servicioRepo.toggleActivo(id, activo)
      if (error) { set({ error }); return { error } }
      set({
        servicios: get().servicios.map((s) =>
          s.id === id ? { ...s, activo } : s
        ),
      })
      return {}
    } catch (e) {
      console.error("toggleActivo error:", e)
      const msg = "Error inesperado al cambiar estado"
      set({ error: msg })
      return { error: msg }
    }
  },

  incrementarVisitas: async (id) => {
    try {
      await servicioRepo.incrementarVisitas(id)
    } catch (e) {
      console.error("incrementarVisitas error:", e)
    }
  },
}))