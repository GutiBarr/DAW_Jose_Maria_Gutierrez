import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

export default function ProtectedRoute() {
  const { usuario, inicializado } = useAuthStore()
  const location = useLocation()

  if (!inicializado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}