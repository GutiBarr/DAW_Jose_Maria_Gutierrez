import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"
import { useT } from "@/i18n/useT"

export default function NotFound() {
  const { usuario } = useAuthStore()
  const t = useT()

  const destino = usuario ? getDashboardByRol(usuario.rol) : "/"
  const label   = usuario ? t.nav.miPanel : t.notFound.volver

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-8xl font-bold text-muted-foreground/10 mb-4 select-none">404</p>
        <h1 className="text-xl font-semibold text-foreground mb-2">
          {t.notFound.titulo}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          {t.notFound.descripcion}
        </p>
        <Link
          to={destino}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors"
        >
          {label}
        </Link>
      </div>
    </div>
  )
}