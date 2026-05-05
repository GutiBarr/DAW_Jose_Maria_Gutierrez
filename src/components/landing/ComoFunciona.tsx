const pasos = [
  {
    numero: "01",
    titulo: "Explora los servicios",
    descripcion:
      "Navega por el catálogo de servicios disponibles en Extremadura. Filtra por tipo, ubicación o nombre para encontrar lo que necesitas.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    numero: "02",
    titulo: "Crea tu cuenta",
    descripcion:
      "Regístrate como familia en menos de un minuto. Solo necesitas tu nombre, email y contraseña.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    numero: "03",
    titulo: "Solicita una plaza",
    descripcion:
      "Envía una solicitud al servicio que te interesa indicando el tipo de necesidad y un mensaje para la entidad.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M20 4H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    numero: "04",
    titulo: "Recibe respuesta",
    descripcion:
      "La entidad revisará tu solicitud y te responderá con un mensaje de aceptación o rechazo desde su panel.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold text-emerald-400 tracking-widest uppercase mb-3">
            Cómo funciona
          </p>
          <h2 className="text-4xl font-semibold text-white leading-tight mb-4">
            De la búsqueda a la plaza en 4 pasos
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Un proceso sencillo y transparente para que las familias encuentren
            el servicio adecuado sin complicaciones.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pasos.map((paso, i) => (
            <div
              key={i}
              className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 hover:bg-slate-800 transition-all duration-200"
            >
              {/* Número */}
              <div className="text-5xl font-bold text-slate-700/60 absolute top-4 right-5 select-none">
                {paso.numero}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                {paso.icon}
              </div>

              <h3 className="text-base font-semibold text-white mb-2">{paso.titulo}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}