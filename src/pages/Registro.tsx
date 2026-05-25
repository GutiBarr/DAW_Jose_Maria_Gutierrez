import { Link } from "react-router-dom"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useT } from "@/i18n/useT"

export default function Registro() {
  const t = useT()

  const roles = [
    {
      id:          "familia",
      badge:       t.registro.familiasBadge,
      title:       t.registro.familiasTitulo,
      description: t.registro.familiasDesc,
      features:    [t.registro.familiasF1, t.registro.familiasF2, t.registro.familiasF3],
      ruta:        "/registro/familia",
      color:       "emerald",
    },
    {
      id:          "entidad",
      badge:       t.registro.entidadBadge,
      title:       t.registro.entidadTitulo,
      description: t.registro.entidadDesc,
      features:    [t.registro.entidadF1, t.registro.entidadF2, t.registro.entidadF3],
      ruta:        "/registro/entidad",
      color:       "slate",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-card">
        <Link to="/" className="flex items-center gap-2">
          <LogoFamilia variante="header" />
          <span className="text-sm font-semibold text-foreground">ConciliaEx</span>
        </Link>
        <Link to="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          {t.registro.yaConCuenta}{" "}
          <span className="text-emerald-500 font-medium">{t.registro.iniciaSesion}</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold text-foreground mb-2">{t.registro.titulo}</h1>
            <p className="text-muted-foreground text-sm">
              {t.registro.subtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((rol) => (
              <Link
                key={rol.id}
                to={rol.ruta}
                className={`group bg-card rounded-2xl border p-7 flex flex-col transition-all duration-200 hover:shadow-lg ${
                  rol.color === "emerald"
                    ? "border-border hover:border-emerald-500/40"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full border mb-5 ${
                  rol.color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-muted text-muted-foreground border-border"
                }`}>
                  {rol.badge}
                </span>

                <h2 className="text-base font-semibold text-foreground mb-2 leading-snug">
                  {rol.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {rol.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {rol.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l2.5 2.5L10 3.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center text-xs font-semibold transition-colors ${
                  rol.color === "emerald"
                    ? "text-emerald-500 group-hover:text-emerald-400"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}>
                  {t.registro.continuar}
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground/60 mt-8">
            {t.registro.terminosTexto}{" "}
            <a href="/legal/terminos" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">{t.registro.terminos}</a>{" "}
            y la{" "}
            <a href="/legal/privacidad" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">{t.registro.privacidad}</a>.
          </p>
        </div>
      </div>
    </div>
  )
}