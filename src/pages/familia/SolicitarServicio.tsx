import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"
import { useSolicitudStore } from "@/store/solicitudStore"
import { useServicioStore } from "@/store/servicioStore"
import type { UrgenciaSolicitud } from "@/interfaces/Solicitud"

const TIPOS_NECESIDAD = [
  "Discapacidad intelectual",
  "Discapacidad física",
  "Discapacidad sensorial",
  "Trastorno del espectro autista",
  "Enfermedad mental",
  "Enfermedad rara",
  "Daño cerebral adquirido",
  "Otro",
]

const URGENCIAS: { value: UrgenciaSolicitud; label: string; desc: string }[] = [
  { value: "baja",  label: "Baja",  desc: "Sin prisa, buscando opciones" },
  { value: "media", label: "Media", desc: "Necesario en los próximos meses" },
  { value: "alta",  label: "Alta",  desc: "Necesidad inmediata" },
]

export default function SolicitarServicio() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { usuario } = useAuthStore()
  const { crearSolicitud, cargando } = useSolicitudStore()
  const { resultados, buscarServicios } = useServicioStore()

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
      setError("Rellena todos los campos obligatorios")
      return
    }
    if (!servicio) {
      setError("Servicio no encontrado")
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

  if (exito) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Solicitud enviada</h1>
          <p className="text-sm text-slate-400 mb-8">
            La entidad revisará tu solicitud y te responderá en breve.
            Puedes ver el estado en tu panel.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/familia/dashboard"
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors"
            >
              Ver mis solicitudes
            </Link>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-sm transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 11L6 7L9 9.5L12 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="4" r="1.5" fill="white"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">ConciliaEx</span>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          ← Volver
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Servicio info */}
        {servicio && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-8 flex items-center gap-4">
            {servicio.imagen_url ? (
              <img
                src={servicio.imagen_url}
                alt={servicio.nombre}
                className="w-14 h-14 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                <span className="text-2xl opacity-40">🏥</span>
              </div>
            )}
            <div>
              <span className="text-xs text-emerald-400 font-medium">{servicio.tipo}</span>
              <h2 className="text-sm font-semibold text-white">{servicio.nombre}</h2>
              <p className="text-xs text-slate-500">📍 {servicio.ubicacion}</p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-1.5">Solicitar plaza</h1>
          <p className="text-sm text-slate-400">
            Completa el formulario y la entidad recibirá tu solicitud
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre familiar */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">
              Nombre del familiar *
            </label>
            <input
              type="text"
              placeholder="Nombre y apellidos"
              value={form.nombre_familiar}
              onChange={(e) => setField("nombre_familiar", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Tipo de necesidad */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">
              Tipo de necesidad *
            </label>
            <select
              value={form.tipo_necesidad}
              onChange={(e) => setField("tipo_necesidad", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
            >
              {TIPOS_NECESIDAD.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Urgencia */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400">Urgencia *</label>
            <div className="grid grid-cols-3 gap-3">
              {URGENCIAS.map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => setField("urgencia", u.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    form.urgencia === u.value
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className={`text-xs font-semibold mb-0.5 ${
                    form.urgencia === u.value ? "text-emerald-400" : "text-white"
                  }`}>
                    {u.label}
                  </div>
                  <div className="text-xs text-slate-500">{u.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mensaje */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400">
              Mensaje para la entidad *
            </label>
            <textarea
              placeholder="Describe brevemente la situación y qué tipo de apoyo necesitáis..."
              value={form.mensaje}
              onChange={(e) => setField("mensaje", e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors resize-none"
            />
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
            type="submit"
            disabled={cargando}
            className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {cargando ? "Enviando solicitud..." : "Enviar solicitud"}
          </button>
        </form>
      </main>
    </div>
  )
}