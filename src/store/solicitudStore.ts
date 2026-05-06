import { create } from "zustand"
import type { Solicitud, DatosCrearSolicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"
import { createSolicitudRepository } from "@/database/repositories"

const solicitudRepo = createSolicitudRepository()

interface SolicitudState {
  solicitudes: Solicitud[]
  cargando:    boolean
  error:       string | null

  crearSolicitud:           (datos: DatosCrearSolicitud) => Promise<{ error?: string }>
  cargarMisSolicitudes:     () => Promise<void>
  cargarSolicitudesEntidad: () => Promise<void>
  responderSolicitud:       (id: string, datos: DatosResponderSolicitud) => Promise<{ error?: string }>
  reset:                    () => void
}

export const useSolicitudStore = create<SolicitudState>()((set, get) => ({
  solicitudes: [],
  cargando:    false,
  error:       null,

  reset: () => set({ solicitudes: [], cargando: false, error: null }),

  crearSolicitud: async (datos) => {
    set({ cargando: true, error: null })
    try {
      const { data, error } = await solicitudRepo.crearSolicitud(datos)
      if (error) { set({ error }); return { error } }
      if (data) set({ solicitudes: [data, ...get().solicitudes] })
      return {}
    } catch (e) {
      console.error("crearSolicitud error:", e)
      const msg = "Error inesperado al enviar la solicitud"
      set({ error: msg })
      return { error: msg }
    } finally {
      set({ cargando: false })
    }
  },

  cargarMisSolicitudes: async () => {
    set({ cargando: true, error: null })
    try {
      const solicitudes = await solicitudRepo.obtenerMisSolicitudes()
      set({ solicitudes })
    } catch (e) {
      console.error("cargarMisSolicitudes error:", e)
      set({ error: "Error al cargar las solicitudes" })
    } finally {
      set({ cargando: false })
    }
  },

  cargarSolicitudesEntidad: async () => {
    set({ cargando: true, error: null })
    try {
      const solicitudes = await solicitudRepo.obtenerSolicitudesEntidad()
      set({ solicitudes })
    } catch (e) {
      console.error("cargarSolicitudesEntidad error:", e)
      set({ error: "Error al cargar las solicitudes" })
    } finally {
      set({ cargando: false })
    }
  },

  responderSolicitud: async (id, datos) => {
    try {
      const { error } = await solicitudRepo.responderSolicitud(id, datos)
      if (error) { set({ error }); return { error } }
      set({
        solicitudes: get().solicitudes.map((s) =>
          s.id === id
            ? { ...s, estado: datos.estado, mensaje_respuesta: datos.mensaje_respuesta }
            : s
        ),
      })
      return {}
    } catch (e) {
      console.error("responderSolicitud error:", e)
      const msg = "Error inesperado al responder"
      set({ error: msg })
      return { error: msg }
    }
  },
}))