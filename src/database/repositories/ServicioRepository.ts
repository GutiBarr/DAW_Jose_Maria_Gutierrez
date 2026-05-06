import type { Servicio, DatosCrearServicio, TipoServicio } from "@/interfaces/Servicio"

export interface FiltrosServicio {
  nombre?:    string
  tipo?:      TipoServicio | ""
  ubicacion?: string
}

export interface ServicioRepository {
  subirImagen(archivo: File, entidadId: string): Promise<{ url?: string; error?: string }>
  obtenerMisServicios(): Promise<Servicio[]>
  buscarServicios(filtros: FiltrosServicio): Promise<Servicio[]>
  crearServicio(datos: DatosCrearServicio): Promise<{ data?: Servicio; error?: string }>
  actualizarServicio(id: string, datos: Partial<DatosCrearServicio>): Promise<{ error?: string }>
  eliminarServicio(id: string): Promise<{ error?: string }>
  toggleActivo(id: string, activo: boolean): Promise<{ error?: string }>
  incrementarVisitas(id: string): Promise<void>
}