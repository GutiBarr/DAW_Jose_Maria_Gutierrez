import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "@/database/supabase/Client"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useT } from "@/i18n/useT"

export default function NuevaPassword() {
  const navigate = useNavigate()
  const t = useT()

  const [password, setPassword]   = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [showPass, setShowPass]   = useState(false)
  const [showConf, setShowConf]   = useState(false)
  const [cargando, setCargando]   = useState(false)
  const [error, setError]         = useState("")
  const [listo, setListo]         = useState(false)
  const [sesionValida, setSesionValida] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setSesionValida(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError(t.registroFamilia.errPassCorta)
      return
    }
    if (password !== confirmar) {
      setError(t.registroFamilia.errPassNoCoinciden)
      return
    }

    setCargando(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setCargando(false)

    if (updateError) {
      setError(t.nuevaPassword.errorActualizar)
      return
    }

    setListo(true)
    setTimeout(() => navigate("/login"), 3000)
  }

  if (listo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">{t.nuevaPassword.exitoTitulo}</h1>
          <p className="text-sm text-muted-foreground mb-6">{t.nuevaPassword.exitoDesc}</p>
          <Link to="/login" className="text-sm text-emerald-500 hover:text-emerald-400 transition-colors">
            {t.nuevaPassword.irLogin}
          </Link>
        </div>
      </div>
    )
  }

  if (!sesionValida) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{t.nuevaPassword.verificando}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[380px] bg-card border-r border-border flex-col px-10 py-10">
        <Link to="/" className="flex items-center gap-2 mb-auto">
          <LogoFamilia variante="header" />
          <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
        </Link>

        <div className="py-14">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#10b981" strokeWidth="1.8"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="text-3xl font-semibold text-foreground leading-snug mb-4">{t.nuevaPassword.titulo}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{t.nuevaPassword.subtituloLeft}</p>
        </div>

        <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} ConciliaEx</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
              <LogoFamilia variante="header" />
              <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
            </Link>
            <h1 className="text-2xl font-semibold text-foreground mb-1.5">{t.nuevaPassword.tituloForm}</h1>
            <p className="text-sm text-muted-foreground">{t.nuevaPassword.minCaracteres}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.perfil.passwordNueva}</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError("") }}
                  required
                  className="w-full h-10 px-3 pr-16 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {showPass ? t.login.ocultar : t.login.ver}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.perfil.passwordConfirmar}</label>
              <div className="relative">
                <input
                  type={showConf ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmar}
                  onChange={(e) => { setConfirmar(e.target.value); setError("") }}
                  required
                  className="w-full h-10 px-3 pr-16 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <button type="button" onClick={() => setShowConf(!showConf)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {showConf ? t.login.ocultar : t.login.ver}
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
              type="submit"
              disabled={cargando}
              className="w-full h-10 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {cargando ? t.nuevaPassword.guardando : t.nuevaPassword.guardar}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}