import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useAuthStore } from "@/store/authStore"

const enlaces = [
  { label: "Inicio", href: "#inicio" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Servicios", href: "#servicios" },
  { label: "Para quién", href: "#roles" },
  { label: "Contacto", href: "#contacto" },
]

export default function Header() {
  const navigate = useNavigate()
  const { usuario, cerrarSesion } = useAuthStore()

  // Determinar el nombre a mostrar según el rol
  const nombreMostrar = usuario?.rol === "entidad"
    ? usuario.nombreEntidad
    : usuario?.nombre

  const handleCerrarSesion = async () => {
    await cerrarSesion()
    navigate("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-verde-principal to-verde-oscuro shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <Link to="/" className="flex items-center gap-2 text-white">
          <LogoFamilia variante="header" />
          <span className="text-2xl font-bold">ConciliaEx</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <a
                href={enlace.href}
                className="text-white font-medium transition-opacity hover:opacity-80"
              >
                {enlace.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Si hay usuario -> nombre + cerrar sesión. Si no -> botón Acceder */}
        {usuario ? (
          <div className="flex items-center gap-4">
            <div className="text-white text-right hidden sm:block">
              <div className="text-sm opacity-80">Hola,</div>
              <div className="font-bold">{nombreMostrar}</div>
            </div>
            <Button
              onClick={handleCerrarSesion}
              variant="secondary"
              className="bg-white text-verde-principal hover:bg-white/90 rounded-full font-bold"
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <Button
            asChild
            variant="secondary"
            className="bg-white text-verde-principal hover:bg-white/90 rounded-full font-bold"
          >
            <Link to="/login">Acceder</Link>
          </Button>
        )}
      </nav>
    </header>
  )
}