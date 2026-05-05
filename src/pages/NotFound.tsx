import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"

export default function NotFound() {
  const { usuario } = useAuthStore()

  const destino = usuario ? getDashboardByRol(usuario.rol) : "/"
  const label   = usuario ? "Ir a mi panel" : "Volver al inicio"

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-bold text-gray-100 mb-4 select-none">404</p>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Página no encontrada
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          to={destino}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
        >
          {label}
        </Link>
      </div>
    </div>
  )
}