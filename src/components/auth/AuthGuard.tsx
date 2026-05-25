import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"

export default function AuthGuard() {
  const { usuario, inicializado } = useAuthStore()

  // Si hay usuario persisted pero aún no verificado, esperar sin redirigir
  if (usuario && !inicializado) return null

  if (usuario) {
    return <Navigate to={getDashboardByRol(usuario.rol)} replace />
  }

  return <Outlet />
}