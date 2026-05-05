import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-300 tracking-wide">
              Plataforma de servicios · Extremadura
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.08] tracking-tight mb-6">
            Encuentra el servicio{" "}
            <span className="gradient-text">que tu familia</span>{" "}
            necesita
          </h1>

          <p className="animate-fade-up delay-200 text-lg text-slate-400 max-w-xl leading-relaxed mb-10">
            Conectamos familias con personas dependientes con los mejores
            centros y servicios especializados de Extremadura.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-900/30"
            >
              Ver servicios disponibles
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link
              to="/registro"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium text-sm transition-colors"
            >
              Crear cuenta gratis
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-300 flex flex-wrap gap-10 mt-14">
            {[
              { value: "+200", label: "servicios disponibles" },
              { value: "180+", label: "entidades colaboradoras" },
              { value: "2.400+", label: "familias registradas" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}