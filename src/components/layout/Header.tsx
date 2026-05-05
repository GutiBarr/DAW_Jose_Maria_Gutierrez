import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"
import LogoFamilia from "@/components/layout/LogoFamilia"

const navLinks = [
  { label: "Servicios", href: "#catalogo" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
]

export default function Header() {
  const { usuario, cerrarSesion } = useAuthStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = async () => {
    await cerrarSesion()
    window.location.href = "/"
  }

  const nombreMostrar = usuario?.rol === "entidad"
    ? usuario.nombreEntidad
    : usuario?.nombre

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <LogoFamilia variante="header" />
            <span className="text-base font-semibold text-white tracking-tight">
              ConciliaEx
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {usuario ? (
              <>
                <Link
                  to={getDashboardByRol(usuario.rol)}
                  className="px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Mi panel
                </Link>
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 font-medium">
                    {nombreMostrar?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-300 max-w-[120px] truncate">
                    {nombreMostrar}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2">
            {usuario ? (
              <>
                <Link to={getDashboardByRol(usuario.rol)} className="px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                  Mi panel
                </Link>
                <button onClick={handleLogout} className="px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-left">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                  Iniciar sesión
                </Link>
                <Link to="/registro" className="px-3 py-2.5 text-sm font-medium bg-emerald-500 text-white rounded-lg text-center">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}