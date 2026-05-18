import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { useServicioStore } from "@/store/servicioStore"
import type { UrgenciaSolicitud } from "@/interfaces/Solicitud"
import { useThemeStore } from "@/store/themeStore"
import { useLangStore } from "@/store/langStore"
import { useT } from "@/i18n/useT"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { TIPOS_NECESIDAD } from "@/lib/constants"


export default function SolicitarServicio() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { usuario } = useAuthStore()
  const { crearSolicitud, cargando } = useSolicitudStore()
  const { resultados, buscarServicios } = useServicioStore()
  const { theme, toggleTheme } = useThemeStore()
  const { lang, toggleLang } = useLangStore()
  const t = useT()

  const URGENCIAS: { value: UrgenciaSolicitud; label: string; desc: string }[] = [
    { value: "baja",  label: t.solicitarServicio.urgenciaBajaLabel,  desc: t.solicitarServicio.urgenciaBajaDesc  },
    { value: "media", label: t.solicitarServicio.urgenciaMediaLabel, desc: t.solicitarServicio.urgenciaMediaDesc },
    { value: "alta",  label: t.solicitarServicio.urgenciaAltaLabel,  desc: t.solicitarServicio.urgenciaAltaDesc  },
  ]

  const [form, setForm] = useState({
    nombre_familiar: "",
    tipo_necesidad:  TIPOS_NECESIDAD[0],
    urgencia:        "media" as UrgenciaSolicitud,
    mensaje:         "",
  })
  const [error,  setError]  = useState("")
  const [exito,  setExito]  = useState(false)

  useEffect(() => {
    if (resultados.length === 0) buscarServicios({})
  }, [buscarServicios, resultados])

  useEffect(() => {
    if (!usuario || usuario.rol !== "familia") {
      navigate("/login")
    }
  }, [usuario, navigate])

  const servicio = resultados.find((s) => s.id === id)

  const setField = (k: string, v: string) => {
    setForm({ ...form, [k]: v })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre_familiar || !form.mensaje) {
      setError(t.solicitarServicio.errCampos)
      return
    }
    if (!servicio) {
      setError(t.solicitarServicio.errServicio)
      return
    }

    const { error } = await crearSolicitud({
      servicio_id:     servicio.id,
      entidad_id:      servicio.entidad_id,
      nombre_familiar: form.nombre_familiar,
      tipo_necesidad:  form.tipo_necesidad,
      urgencia:        form.urgencia,
      mensaje:         form.mensaje,
    })

    if (error) { setError(error); return }
    setExito(true)
  }

  const inputClass = "w-full h-10 px-3 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"

  if (exito) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">{t.solicitarServicio.exito}</h1>
          <p className="text-sm text-muted-foreground mb-8">{t.solicitarServicio.exitoDesc}</p>
          <div className="flex flex-col gap-2">
            <Link
              to="/familia/dashboard"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              {t.dashFamilia.misSolicitudes}
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {t.notFound.volver}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoFamilia variante="header" />
          <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {theme === "dark" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            onClick={toggleLang}
            className="px-2 py-1 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted border border-border transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {t.solicitarServicio.volver}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Servicio info */}
        {servicio && (
          <div className="bg-card border border-border rounded-xl p-4 mb-8 flex items-center gap-4">
            {servicio.imagen_url ? (
              <img src={servicio.imagen_url} alt={servicio.nombre} className="w-14 h-14 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <span className="text-2xl opacity-40">🏥</span>
              </div>
            )}
            <div>
              <span className="text-xs text-emerald-500 font-medium">{servicio.tipo}</span>
              <h2 className="text-sm font-semibold text-foreground">{servicio.nombre}</h2>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1C4.067 1 2.5 2.567 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.567 7.933 1 6 1z" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="6" cy="4.5" r="1" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                {servicio.ubicacion}
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1.5">{t.solicitarServicio.titulo}</h1>
          <p className="text-sm text-muted-foreground">{t.solicitarServicio.subtitulo}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre familiar */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t.solicitarServicio.nombreFamiliar}</label>
            <input
              type="text"
              placeholder={t.solicitarServicio.nombreFamiliarPlaceholder}
              value={form.nombre_familiar}
              onChange={(e) => setField("nombre_familiar", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Tipo de necesidad */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {t.solicitarServicio.necesidad} *
            </label>
            <select
              value={form.tipo_necesidad}
              onChange={(e) => setField("tipo_necesidad", e.target.value)}
              className={inputClass}
            >
              {TIPOS_NECESIDAD.map((tp) => <option key={tp}>{tp}</option>)}
            </select>
          </div>

          {/* Urgencia */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">{t.solicitarServicio.urgenciaLabel}</label>
            <div className="grid grid-cols-3 gap-3">
              {URGENCIAS.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => setField("urgencia", u.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    form.urgencia === u.value
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-border hover:border-border-strong"
                  }`}
                >
                  <div className={`text-xs font-semibold mb-0.5 ${
                    form.urgencia === u.value ? "text-emerald-500" : "text-foreground"
                  }`}>
                    {u.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{u.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mensaje */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {t.solicitarServicio.mensaje} *
            </label>
            <textarea
              placeholder={t.solicitarServicio.mensajePlaceholder}
              value={form.mensaje}
              onChange={(e) => setField("mensaje", e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-input text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
            />
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
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {cargando ? t.solicitarServicio.enviando : t.solicitarServicio.enviar}
          </button>
        </form>
      </main>
    </div>
  )
}