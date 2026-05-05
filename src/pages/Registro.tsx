import { Link } from "react-router-dom"
import LogoFamilia from "@/components/layout/LogoFamilia"

const roles = [
  {
    id:          "familia",
    badge:       "Para familias",
    title:       "Busco servicios para mi familiar",
    description: "Encuentra recursos adaptados, envía solicitudes y sigue su estado desde tu panel.",
    features:    ["Búsqueda filtrada de servicios", "Solicitudes a entidades", "Seguimiento en tiempo real"],
    ruta:        "/registro/familia",
    color:       "emerald",
  },
  {
    id:          "entidad",
    badge:       "Para entidades",
    title:       "Quiero publicar mis servicios",
    description: "Publica tus servicios, recibe solicitudes de familias y gestiona tu panel desde un solo lugar.",
    features:    ["Publicación de servicios", "Gestión de solicitudes", "Estadísticas de visibilidad"],
    ruta:        "/registro/entidad",
    color:       "slate",
  },
]

export default function Registro() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top bar */}
      <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoFamilia variante="header" />
          <span className="text-sm font-semibold text-white">ConciliaEx</span>
        </Link>
        <Link to="/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
          ¿Ya tienes cuenta?{" "}
          <span className="text-emerald-400 font-medium">Inicia sesión</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold text-white mb-2">Crea tu cuenta</h1>
            <p className="text-slate-500 text-sm">
              Elige el tipo de cuenta que mejor se adapta a tu situación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((rol) => (
              <Link
                key={rol.id}
                to={rol.ruta}
                className={`group bg-slate-900 rounded-2xl border p-7 flex flex-col transition-all duration-200 hover:shadow-lg ${
                  rol.color === "emerald"
                    ? "border-slate-800 hover:border-emerald-500/40"
                    : "border-slate-800 hover:border-slate-600"
                }`}
              >
                <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full border mb-5 ${
                  rol.color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-slate-700/50 text-slate-400 border-slate-700"
                }`}>
                  {rol.badge}
                </span>

                <h2 className="text-base font-semibold text-white mb-2 leading-snug">
                  {rol.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {rol.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {rol.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5L10 3.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center text-xs font-semibold transition-colors ${
                  rol.color === "emerald"
                    ? "text-emerald-400 group-hover:text-emerald-300"
                    : "text-slate-400 group-hover:text-slate-300"
                }`}>
                  Continuar
                  <svg className="ml-1.5 transition-transform group-hover:translate-x-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-slate-600 mt-8">
            Al registrarte aceptas nuestros{" "}
            <a href="#" className="text-emerald-500 hover:underline">términos y condiciones</a>{" "}
            y la{" "}
            <a href="#" className="text-emerald-500 hover:underline">política de privacidad</a>.
          </p>
        </div>
      </div>
    </div>
  )
}