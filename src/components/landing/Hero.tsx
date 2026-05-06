import { Link } from "react-router-dom"
import { useT } from "@/i18n/useT"

export default function Hero() {
  const t = useT()

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Dot background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Blob decorativo cálido */}
      <div className="absolute inset-0 bg-blob" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-500 tracking-wide">
              {t.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.08] tracking-tight mb-6">
            {t.hero.titulo1}{" "}
            <span className="gradient-text">{t.hero.tituloResaltado}</span>{" "}
            {t.hero.titulo2}
          </h1>

          <p className="animate-fade-up delay-200 text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
            {t.hero.descripcion}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-900/20"
            >
              {t.hero.ctaServicios}
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-border-strong text-muted-foreground hover:text-foreground font-medium text-sm transition-colors"
            >
              {t.hero.ctaCuenta}
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-300 flex flex-wrap gap-10 mt-14">
            {[
              { value: t.hero.stat1Value, label: t.hero.stat1Label },
              { value: t.hero.stat2Value, label: t.hero.stat2Label },
              { value: t.hero.stat3Value, label: t.hero.stat3Label },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}