import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

export default function RegistroFamilia() {
  const navigate = useNavigate()
  const { registrarFamilia, cargando } = useAuthStore()
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    nombre: "", email: "", password: "", confirmar: "", terminos: false,
  })
  const [error, setError] = useState("")

  const set = (k: string, v: string | boolean) => {
    setForm({ ...form, [k]: v })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmar) return setError("Las contraseñas no coinciden")
    if (form.password.length < 6) return setError("La contraseña debe tener mínimo 6 caracteres")
    if (!form.terminos) return setError("Debes aceptar los términos y condiciones")
    const { error } = await registrarFamilia({ nombre: form.nombre, email: form.email, password: form.password })
    if (error) return setError(error)
    navigate("/familia/dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left */}
      <div className="hidden lg:flex w-[380px] bg-slate-900 border-r border-slate-800 flex-col px-10 py-10">
        <Link to="/registro" className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm mb-auto">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Volver
        </Link>

        <div className="py-14">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="#10b981" strokeWidth="1.5"/>
              <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-3">
            Cuenta de familia
          </p>
          <h2 className="text-3xl font-semibold text-white leading-snug mb-4">
            Encuentra el apoyo que necesitas
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Regístrate y accede a cientos de servicios y entidades
            especializadas en toda Extremadura.
          </p>
        </div>

        <p className="text-xs text-slate-700">© {new Date().getFullYear()} ConciliaEx</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white mb-1.5">Crear cuenta de familia</h1>
            <p className="text-sm text-slate-500">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Nombre completo</label>
              <input
                type="text" placeholder="María García López"
                value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required
                className="w-full h-10 px-3 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Correo electrónico</label>
              <input
                type="email" placeholder="tu@email.com"
                value={form.email} onChange={(e) => set("email", e.target.value)} required
                className="w-full h-10 px-3 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} placeholder="Mínimo 6 caracteres"
                  value={form.password} onChange={(e) => set("password", e.target.value)} required
                  className="w-full h-10 px-3 pr-16 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs transition-colors">
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {/* Confirmar */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Confirmar contraseña</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"} placeholder="Repite tu contraseña"
                  value={form.confirmar} onChange={(e) => set("confirmar", e.target.value)} required
                  className="w-full h-10 px-3 pr-16 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs transition-colors">
                  {showConfirm ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox" id="terminos"
                checked={form.terminos}
                onChange={(e) => set("terminos", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 accent-emerald-500 cursor-pointer"
              />
              <label htmlFor="terminos" className="text-xs text-slate-500 cursor-pointer leading-relaxed">
                Acepto los{" "}
                <a href="#" className="text-emerald-400 hover:underline">términos y condiciones</a>{" "}
                y la{" "}
                <a href="#" className="text-emerald-400 hover:underline">política de privacidad</a>
              </label>
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
              {cargando ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}