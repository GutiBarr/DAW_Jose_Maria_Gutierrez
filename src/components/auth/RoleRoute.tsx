import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import type { RolUsuario } from "@/interfaces/Usuario"

interface RoleRouteProps {
  roles: RolUsuario[]
}

export default function RoleRoute({ roles }: RoleRouteProps) {
  const { usuario } = useAuthStore()

  if (!usuario) return null

  if (!roles.includes(usuario.rol)) {
    return <Navigate to={getDashboardByRol(usuario.rol)} replace />
  }

  return <Outlet />
}

export function getDashboardByRol(rol: RolUsuario): string {
  switch (rol) {
    case "admin":   return "/admin"
    case "entidad": return "/entidad/dashboard"
    case "familia": return "/familia/dashboard"
  }
}