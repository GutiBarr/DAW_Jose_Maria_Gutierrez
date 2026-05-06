import { useT } from "@/i18n/useT"

const icons = [
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M20 4H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
]

const numeros = ["01", "02", "03", "04"]

export default function ComoFunciona() {
  const t = useT()

  return (
    <section id="como-funciona" className="py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-emerald-500 tracking-widest uppercase mb-3">
            {t.comoFunciona.etiqueta}
          </p>
          <h2 className="text-4xl font-semibold text-foreground leading-tight mb-4">
            {t.comoFunciona.titulo}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.comoFunciona.descripcion}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.comoFunciona.pasos.map((paso, i) => (
            <div
              key={i}
              className="relative bg-card border border-border rounded-2xl p-6 hover:border-emerald-500/30 hover:shadow-md transition-all duration-200"
            >
              {/* Número */}
              <div className="text-5xl font-bold text-muted-foreground/20 absolute top-4 right-5 select-none">
                {numeros[i]}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-5">
                {icons[i]}
              </div>

              <h3 className="text-base font-semibold text-foreground mb-2">{paso.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}