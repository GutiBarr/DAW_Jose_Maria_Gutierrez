import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { usePerfilStore } from "@/store/perfilStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useThemeStore } from "@/store/themeStore"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"

export default function Header() {
  const { usuario, cerrarSesion } = useAuthStore()
  const { perfil, cargarPerfil } = usePerfilStore()
  const { theme, toggleTheme } = useThemeStore()
  const { lang, toggleLang } = useLangStore()
  const t = useT()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Cargar perfil cuando haya usuario autenticado para tener el avatar
  useEffect(() => {
    if (usuario) cargarPerfil()
  }, [usuario?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogout = async () => {
    await cerrarSesion()
  }

  const nombreMostrar = usuario?.rol === "entidad"
  ? (perfil?.nombre_entidad ?? usuario.nombreEntidad)
  : (perfil?.nombre ?? usuario?.nombre)

  const navLinks = [
    { label: t.nav.servicios, href: "#catalogo" },
    { label: t.nav.comoFunciona, href: "#como-funciona" },
    { label: t.nav.contacto, href: "#contacto" },
  ]

  const isDark = theme === "dark"

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <LogoFamilia variante="header" />
            <span className="text-base font-semibold text-foreground tracking-tight">
              ConciliaEx
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Modo claro" : "Modo oscuro"}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors tracking-wide"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            {usuario ? (
              <>
                <Link
                  to={getDashboardByRol(usuario.rol)}
                  className="px-3.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {t.nav.miPanel}
                </Link>
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:border-border-strong transition-colors"
                >
                  {/* Avatar: foto si existe, inicial si no */}
                  {perfil?.avatar_url ? (
                    <img
                      src={perfil.avatar_url}
                      alt={nombreMostrar}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-500 font-medium">
                      {nombreMostrar?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-foreground max-w-[120px] truncate">
                    {nombreMostrar}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {t.nav.salir}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {t.nav.iniciarSesion}
                </Link>
                <Link
                  to="/registro"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-white transition-colors"
                >
                  {t.nav.registrarse}
                </Link>
              </>
            )}
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted"
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
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Theme + Lang row */}
          <div className="flex items-center gap-2 px-3 py-2.5">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isDark ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <span>{lang === "es" ? "Modo claro" : "Light mode"}</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{lang === "es" ? "Modo oscuro" : "Dark mode"}</span>
                </>
              )}
            </button>
            <span className="text-muted-foreground/30 ml-auto">|</span>
            <button
              onClick={toggleLang}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang === "es" ? "Switch to English" : "Cambiar a Español"}
            </button>
          </div>

          <div className="mt-1 pt-3 border-t border-border flex flex-col gap-2">
            {usuario ? (
              <>
                <Link to="/perfil" className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted rounded-lg transition-colors">
                  {perfil?.avatar_url ? (
                    <img src={perfil.avatar_url} alt={nombreMostrar} className="w-7 h-7 rounded-full object-cover ring-1 ring-border flex-shrink-0" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-500 font-semibold flex-shrink-0">
                      {nombreMostrar?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground truncate">{nombreMostrar}</span>
                </Link>
                <Link to={getDashboardByRol(usuario.rol)} className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                  {t.nav.miPanel}
                </Link>
                <button onClick={handleLogout} className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg text-left">
                  {t.nav.cerrarSesion}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                  {t.nav.iniciarSesion}
                </Link>
                <Link to="/registro" className="px-3 py-2.5 text-sm font-medium bg-emerald-500 text-white rounded-lg text-center">
                  {t.nav.registrarse}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}