import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"
import { useT } from "@/i18n/useT"
import LogoFamilia from "@/components/layout/LogoFamilia"

export default function Login() {
  const navigate = useNavigate()
  const { iniciarSesion, cargando } = useAuthStore()
  const t = useT()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const { error } = await iniciarSesion({ email, password })
    if (error) { setError(error); return }

    let intentos = 0
    const intervalo = setInterval(() => {
      const usuario = useAuthStore.getState().usuario
      intentos++
      if (usuario) {
        clearInterval(intervalo)
        navigate(getDashboardByRol(usuario.rol))
      }
      if (intentos > 10) {
        clearInterval(intervalo)
        setError(t.login.errorRecarga)
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[420px] bg-card border-r border-border flex-col px-12 py-10">
        <Link to="/" className="flex items-center gap-2.5 mb-auto">
          <LogoFamilia variante="header" />
          <span className="text-base font-semibold text-foreground">ConciliaEx</span>
        </Link>

        <div className="py-16">
          <p className="text-xs font-semibold text-emerald-500 tracking-widest uppercase mb-4">
            {t.login.bienvenido}
          </p>
          <h2 className="text-3xl font-semibold text-foreground leading-snug mb-4">
            {t.login.accedeTuPanel}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10">
            {t.login.gestionaDesde}
          </p>
          <div className="space-y-4">
            {[t.login.beneficio1, t.login.beneficio2, t.login.beneficio3].map((txt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-muted-foreground">{txt}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground/40">
          © {new Date().getFullYear()} ConciliaEx · IES Albarregas
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <LogoFamilia variante="header" />
            <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-1.5">{t.login.titulo}</h1>
            <p className="text-sm text-muted-foreground">
              {t.login.sinCuenta}{" "}
              <Link to="/registro" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                {t.login.registrateGratis}
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.login.email}</label>
              <input
                type="email" placeholder="tu@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full h-10 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">{t.login.password}</label>
                <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors">
                  {t.login.olvidaste}
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full h-10 px-3 pr-16 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-xs"
                >
                  {showPass ? t.login.ocultar : t.login.ver}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={cargando}
              className="w-full h-10 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50 mt-1"
            >
              {cargando ? t.login.iniciando : t.login.iniciar}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}