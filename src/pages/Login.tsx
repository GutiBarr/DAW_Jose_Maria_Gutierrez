import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { getDashboardByRol } from "@/components/auth/RoleRoute"

export default function Login() {
  const navigate = useNavigate()
  const { iniciarSesion, cargando } = useAuthStore()
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const { error } = await iniciarSesion({ email, password })
    if (error) { setError(error); return }

    // Esperar a que el usuario esté en el store
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
        setError("Error al iniciar sesión, recarga la página")
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex w-[420px] bg-slate-900 border-r border-slate-800 flex-col px-12 py-10">
        <Link to="/" className="flex items-center gap-2.5 mb-auto">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 11L6 7L9 9.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="4" r="1.5" fill="white"/>
            </svg>
          </div>
          <span className="text-base font-semibold text-white">ConciliaEx</span>
        </Link>

        <div className="py-16">
          <p className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-4">
            Bienvenido
          </p>
          <h2 className="text-3xl font-semibold text-white leading-snug mb-4">
            Accede a tu panel
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            Gestiona perfiles, solicitudes y servicios desde un único lugar.
          </p>
          <div className="space-y-4">
            {[
              "Busca servicios adaptados a tu familiar",
              "Envía solicitudes a entidades especializadas",
              "Sigue el estado de tus solicitudes",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-sm text-slate-400">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-700">
          © {new Date().getFullYear()} ConciliaEx · IES Albarregas
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 11L6 7L9 9.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="4" r="1.5" fill="white"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">ConciliaEx</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-1.5">Iniciar sesión</h1>
            <p className="text-sm text-slate-500">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Correo electrónico</label>
              <input
                type="email" placeholder="tu@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full h-10 px-3 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-500">Contraseña</label>
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full h-10 px-3 pr-16 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors text-xs"
                >
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg">
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
              {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}