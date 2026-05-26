import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useT } from "@/i18n/useT"
import { esEmailValido } from "@/lib/validaciones"

type Errors = { nombre: string; email: string; password: string; confirmar: string; terminos: string; global: string }
const emptyErrors = (): Errors => ({ nombre: "", email: "", password: "", confirmar: "", terminos: "", global: "" })

export default function RegistroFamilia() {
  const navigate = useNavigate()
  const { registrarFamilia, cargando } = useAuthStore()
  const t = useT()
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    nombre: "", email: "", password: "", confirmar: "", terminos: false,
  })
  const [errors, setErrors] = useState<Errors>(emptyErrors())

  const set = (k: string, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: "", global: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = emptyErrors()
    if (form.nombre.trim().length < 2)       errs.nombre   = t.registroFamilia.errNombre
    if (!esEmailValido(form.email))           errs.email    = t.registroFamilia.errEmail
    if (form.password.length < 6)            errs.password = t.registroFamilia.errPassCorta
    if (form.password !== form.confirmar)    errs.confirmar = t.registroFamilia.errPassNoCoinciden
    if (!form.terminos)                      errs.terminos  = t.registroFamilia.errTerminos
    if (Object.values(errs).some(Boolean)) { setErrors(errs); return }

    const { error } = await registrarFamilia({ nombre: form.nombre, email: form.email, password: form.password })
    if (error) { setErrors(e => ({ ...e, global: error })); return }
    navigate("/familia/dashboard")
  }

  const inputCls = (err: string) =>
    `w-full h-10 px-3 rounded-lg border ${err ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-border focus:border-emerald-500 focus:ring-emerald-500/20"} bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-colors`

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left */}
      <div className="hidden lg:flex w-[380px] bg-card border-r border-border flex-col px-10 py-10">
        <Link to="/registro" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-auto">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.registroFamilia.volver}
        </Link>

        <div className="py-14">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="#10b981" strokeWidth="1.5"/>
              <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-xs font-semibold text-emerald-500 tracking-widest uppercase mb-3">
            {t.registroFamilia.etiqueta}
          </p>
          <h2 className="text-3xl font-semibold text-foreground leading-snug mb-4">
            {t.registroFamilia.titulo}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.registroFamilia.descripcion}
          </p>
        </div>

        <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} ConciliaEx</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-1.5">{t.registroFamilia.tituloForm}</h1>
            <p className="text-sm text-muted-foreground">
              {t.registroFamilia.yaConCuenta}{" "}
              <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                {t.registroFamilia.iniciaSesion}
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.registroFamilia.nombre}</label>
              <input type="text" placeholder="María García López"
                value={form.nombre} onChange={(e) => set("nombre", e.target.value)}
                className={inputCls(errors.nombre)} />
              {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.registroFamilia.email}</label>
              <input type="text" placeholder="tu@email.com"
                value={form.email} onChange={(e) => set("email", e.target.value)}
                className={inputCls(errors.email)} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.registroFamilia.password}</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} placeholder={t.registroFamilia.passwordPlaceholder}
                  value={form.password} onChange={(e) => set("password", e.target.value)}
                  className={`${inputCls(errors.password)} pr-16`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs transition-colors">
                  {showPass ? t.registroFamilia.ocultar : t.registroFamilia.ver}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">{t.registroFamilia.confirmar}</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} placeholder={t.registroFamilia.confirmarPlaceholder}
                  value={form.confirmar} onChange={(e) => set("confirmar", e.target.value)}
                  className={`${inputCls(errors.confirmar)} pr-16`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs transition-colors">
                  {showConfirm ? t.registroFamilia.ocultar : t.registroFamilia.ver}
                </button>
              </div>
              {errors.confirmar && <p className="text-xs text-red-500">{errors.confirmar}</p>}
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-start gap-2.5">
                <input type="checkbox" id="terminos"
                  checked={form.terminos} onChange={(e) => set("terminos", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border bg-input accent-emerald-500 cursor-pointer" />
                <label htmlFor="terminos" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                  {t.registroFamilia.acepto}{" "}
                  <a href="/legal/terminos" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">{t.registroFamilia.terminos}</a>{" "}
                  {t.registroFamilia.y}{" "}
                  <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">{t.registroFamilia.privacidad}</a>
                </label>
              </div>
              {errors.terminos && <p className="text-xs text-red-500">{errors.terminos}</p>}
            </div>

            {errors.global && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-lg">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {errors.global}
              </div>
            )}

            <button type="submit" disabled={cargando}
              className="w-full h-10 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50 mt-1">
              {cargando ? t.registroFamilia.creando : t.registroFamilia.crear}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}