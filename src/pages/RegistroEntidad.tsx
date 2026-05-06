import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useT } from "@/i18n/useT"

export default function RegistroEntidad() {
  const navigate = useNavigate()
  const { registrarEntidad, cargando } = useAuthStore()
  const t = useT()
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    nombreEntidad: "", cif: "", personaContacto: "", telefono: "",
    email: "", password: "", confirmar: "", terminos: false,
  })
  const [error, setError] = useState("")

  const set = (k: string, v: string | boolean) => {
    setForm({ ...form, [k]: v })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmar) return setError(t.registroEntidad.errPassNoCoinciden)
    if (form.password.length < 6) return setError(t.registroEntidad.errPassCorta)
    if (!form.terminos) return setError(t.registroEntidad.errTerminos)
    const { error } = await registrarEntidad({
      nombreEntidad: form.nombreEntidad, cif: form.cif,
      personaContacto: form.personaContacto, telefono: form.telefono,
      email: form.email, password: form.password,
    })
    if (error) return setError(error)
    navigate("/entidad/dashboard")
  }

  const inputClass = "w-full h-10 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
  const labelClass = "text-xs font-medium text-muted-foreground"
  const sectionClass = "text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest border-b border-border pb-2"

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left */}
      <div className="hidden lg:flex w-[380px] bg-card border-r border-border flex-col px-10 py-10">
        <Link to="/registro" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-auto">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.registroEntidad.volver}
        </Link>

        <div className="py-14">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="8" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="10" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-3">
            {t.registroEntidad.etiqueta}
          </p>
          <h2 className="text-3xl font-semibold text-foreground leading-snug mb-4">
            {t.registroEntidad.titulo}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.registroEntidad.descripcion}
          </p>
        </div>

        <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} ConciliaEx</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-1.5">{t.registroEntidad.tituloForm}</h1>
            <p className="text-sm text-muted-foreground">
              {t.registroEntidad.yaConCuenta}{" "}
              <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                {t.registroEntidad.iniciaSesion}
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Entidad */}
            <div className="space-y-3">
              <p className={sectionClass}>{t.registroEntidad.datosEntidad}</p>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.nombreEntidad}</label>
                <input type="text" placeholder="Asociación Plena Inclusión"
                  value={form.nombreEntidad} onChange={(e) => set("nombreEntidad", e.target.value)} required
                  className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.cif}</label>
                <input type="text" placeholder="G12345678"
                  value={form.cif} onChange={(e) => set("cif", e.target.value)} required
                  className={inputClass} />
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-3 pt-1">
              <p className={sectionClass}>{t.registroEntidad.personaContacto}</p>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.nombreApellidos}</label>
                <input type="text" placeholder="Juan Pérez García"
                  value={form.personaContacto} onChange={(e) => set("personaContacto", e.target.value)} required
                  className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.telefono}</label>
                <input type="tel" placeholder="924 000 000"
                  value={form.telefono} onChange={(e) => set("telefono", e.target.value)} required
                  className={inputClass} />
              </div>
            </div>

            {/* Acceso */}
            <div className="space-y-3 pt-1">
              <p className={sectionClass}>{t.registroEntidad.datosAcceso}</p>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.email}</label>
                <input type="email" placeholder="contacto@entidad.com"
                  value={form.email} onChange={(e) => set("email", e.target.value)} required
                  className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.password}</label>
                <div className="relative">
                  <input type={showPass ? "text" : "password"} placeholder={t.registroEntidad.passwordPlaceholder}
                    value={form.password} onChange={(e) => set("password", e.target.value)} required
                    className={`${inputClass} pr-16`} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs transition-colors">
                    {showPass ? t.registroEntidad.ocultar : t.registroEntidad.ver}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>{t.registroEntidad.confirmar}</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} placeholder={t.registroEntidad.confirmarPlaceholder}
                    value={form.confirmar} onChange={(e) => set("confirmar", e.target.value)} required
                    className={`${inputClass} pr-16`} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs transition-colors">
                    {showConfirm ? t.registroEntidad.ocultar : t.registroEntidad.ver}
                  </button>
                </div>
              </div>
            </div>

            {/* Términos */}
            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="terminos"
                checked={form.terminos} onChange={(e) => set("terminos", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-border bg-input accent-emerald-500 cursor-pointer" />
              <label htmlFor="terminos" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                {t.registroEntidad.acepto}{" "}
                <a href="#" className="text-emerald-500 hover:underline">{t.registroEntidad.terminos}</a>{" "}
                {t.registroEntidad.y}{" "}
                <a href="#" className="text-emerald-500 hover:underline">{t.registroEntidad.privacidad}</a>
              </label>
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

            <button type="submit" disabled={cargando}
              className="w-full h-10 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50 mt-1">
              {cargando ? t.registroEntidad.registrando : t.registroEntidad.registrar}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}