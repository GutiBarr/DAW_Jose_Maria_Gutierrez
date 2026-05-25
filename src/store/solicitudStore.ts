import { create } from "zustand"
import type { Solicitud, DatosCrearSolicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"
import { createSolicitudRepository } from "@/database/repositories"

const solicitudRepo = createSolicitudRepository()

let cargarMisSolicitudesId     = 0
let cargarSolicitudesEntidadId = 0

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
    const miId = ++cargarMisSolicitudesId
    set({ cargando: true, error: null })
    try {
      const solicitudes = await solicitudRepo.obtenerMisSolicitudes()
      if (miId !== cargarMisSolicitudesId) return
      set({ solicitudes })
    } catch (e) {
      if (miId !== cargarMisSolicitudesId) return
      console.error("cargarMisSolicitudes error:", e)
      set({ error: "Error al cargar las solicitudes" })
    } finally {
      if (miId === cargarMisSolicitudesId) set({ cargando: false })
    }
  },

  cargarSolicitudesEntidad: async () => {
    const miId = ++cargarSolicitudesEntidadId
    set({ cargando: true, error: null })
    try {
      const solicitudes = await solicitudRepo.obtenerSolicitudesEntidad()
      if (miId !== cargarSolicitudesEntidadId) return
      set({ solicitudes })
    } catch (e) {
      if (miId !== cargarSolicitudesEntidadId) return
      console.error("cargarSolicitudesEntidad error:", e)
      set({ error: "Error al cargar las solicitudes" })
    } finally {
      if (miId === cargarSolicitudesEntidadId) set({ cargando: false })
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