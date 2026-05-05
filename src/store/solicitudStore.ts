import { create } from "zustand"
import type { Solicitud, DatosCrearSolicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"
import { createSolicitudRepository } from "@/database/repositories"

const solicitudRepo = createSolicitudRepository()

interface SolicitudState {
  solicitudes:      Solicitud[]
  cargando:         boolean
  error:            string | null

  crearSolicitud:          (datos: DatosCrearSolicitud) => Promise<{ error?: string }>
  cargarMisSolicitudes:    () => Promise<void>
  cargarSolicitudesEntidad: () => Promise<void>
  responderSolicitud:      (id: string, datos: DatosResponderSolicitud) => Promise<{ error?: string }>
}

export const useSolicitudStore = create<SolicitudState>()((set, get) => ({
  solicitudes: [],
  cargando:    false,
  error:       null,

  crearSolicitud: async (datos) => {
    set({ cargando: true, error: null })
    const { data, error } = await solicitudRepo.crearSolicitud(datos)
    set({ cargando: false })
    if (error) { set({ error }); return { error } }
    if (data) set({ solicitudes: [data, ...get().solicitudes] })
    return {}
  },

  cargarMisSolicitudes: async () => {
    set({ cargando: true, error: null })
    const solicitudes = await solicitudRepo.obtenerMisSolicitudes()
    set({ solicitudes, cargando: false })
  },

  cargarSolicitudesEntidad: async () => {
    set({ cargando: true, error: null })
    const solicitudes = await solicitudRepo.obtenerSolicitudesEntidad()
    set({ solicitudes, cargando: false })
  },

  responderSolicitud: async (id, datos) => {
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
  },
}))