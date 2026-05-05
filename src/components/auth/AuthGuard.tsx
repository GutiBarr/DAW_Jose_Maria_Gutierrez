import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"

export default function AuthGuard() {
  const { usuario } = useAuthStore()

  if (usuario) {
    return <Navigate to={getDashboardByRol(usuario.rol)} replace />
  }

  return <Outlet />
}