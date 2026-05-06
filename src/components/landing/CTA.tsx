import { Link } from "react-router-dom"
import { useT } from "@/i18n/useT"

export default function CTA() {
  const t = useT()

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Fondo gradiente cálido */}
      <div className="absolute inset-0 bg-gradient-to-br from-[--primary] to-teal-700" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          {t.hero.badge}
        </span>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          ¿Listo para empezar?
        </h2>
        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Únete a ConciliaEx y descubre cómo podemos ayudarte
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/registro"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-white text-[--primary] font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Crear cuenta gratis
          </Link>
          <a
            href="#catalogo"
            className="inline-flex items-center px-7 py-4 rounded-2xl border-2 border-white/30 hover:border-white/60 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  )
}