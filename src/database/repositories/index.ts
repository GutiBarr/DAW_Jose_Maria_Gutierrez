import { SupabaseAuthRepository } from "@/database/supabase/SupabaseAuthRepository"
import { SupabaseServicioRepository } from "@/database/supabase/SupabaseServicioRepository"
import { SupabaseAdminRepository } from "@/database/supabase/SupabaseAdminRepository"
import { SupabasePerfilRepository } from "@/database/supabase/SupabasePerfilRepository"
import { SupabaseSolicitudRepository } from "@/database/supabase/SupabaseSolicitudRepository"
import type { AuthRepository } from "./AuthRepository"
import type { ServicioRepository } from "./ServicioRepository"
import type { AdminRepository } from "./AdminRepository"
import type { PerfilRepository } from "./PerfilRepository"
import type { SolicitudRepository } from "./SolicitudRepository"

export const createAuthRepository = (): AuthRepository => {
  return new SupabaseAuthRepository()
}

export const createServicioRepository = (): ServicioRepository => {
  return new SupabaseServicioRepository()
}

export const createAdminRepository = (): AdminRepository => {
  return new SupabaseAdminRepository()
}

export const createPerfilRepository = (): PerfilRepository => {
  return new SupabasePerfilRepository()
}

export const createSolicitudRepository = (): SolicitudRepository => {
  return new SupabaseSolicitudRepository()
}