import type { Solicitud, DatosCrearSolicitud, DatosResponderSolicitud } from "@/interfaces/Solicitud"

export interface SolicitudRepository {
  crearSolicitud(datos: DatosCrearSolicitud): Promise<{ data?: Solicitud; error?: string }>
  obtenerMisSolicitudes(): Promise<Solicitud[]>
  obtenerSolicitudesEntidad(): Promise<Solicitud[]>
  responderSolicitud(id: string, datos: DatosResponderSolicitud): Promise<{ error?: string }>
}