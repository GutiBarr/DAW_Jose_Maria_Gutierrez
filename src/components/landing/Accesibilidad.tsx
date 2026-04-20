const caracteristicas = [
  { titulo: "Alto Contraste", descripcion: "Colores pensados para buena legibilidad" },
  { titulo: "Navegación por Teclado", descripcion: "Uso completo sin necesidad de ratón" },
  { titulo: "Lectores de Pantalla", descripcion: "Compatible con tecnologías de asistencia" },
  { titulo: "Diseño Responsive", descripcion: "Adaptado a todos los dispositivos" },
]

export default function Accesibilidad() {
  return (
    <section className="py-20 px-8 bg-muted">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-verde-oscuro mb-4">
          Compromiso con la Accesibilidad
        </h2>

        <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
          ConciliaEx está diseñado siguiendo las pautas de accesibilidad WCAG para
          garantizar que todas las personas puedan usar la plataforma sin barreras.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caracteristicas.map((item) => (
            <div
              key={item.titulo}
              className="bg-white p-6 rounded-xl border border-border"
            >
              <h4 className="font-bold text-verde-oscuro mb-2">{item.titulo}</h4>
              <p className="text-sm text-muted-foreground">{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}