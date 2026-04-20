import { SupabaseAuthRepository } from "@/database/supabase/SupabaseAuthRepository"
import type { AuthRepository } from "./AuthRepository"

/**
 * Fábrica del repositorio de autenticación.
 * Si mañana cambiamos Supabase por Firebase u otro, solo tocamos aquí.
 */
export const createAuthRepository = (): AuthRepository => {
  return new SupabaseAuthRepository()
}