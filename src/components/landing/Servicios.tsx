const servicios = [
  { titulo: "Centros de Día", descripcion: "Atención diurna especializada" },
  { titulo: "Atención Temprana", descripcion: "Intervención en edades tempranas" },
  { titulo: "Actividades Ocupacionales", descripcion: "Programas de desarrollo personal" },
  { titulo: "Residencias", descripcion: "Estancias temporales y permanentes" },
  { titulo: "Talleres y Actividades", descripcion: "Ocio y formación adaptada" },
  { titulo: "Terapias Especializadas", descripcion: "Fisioterapia, logopedia y más" },
  { titulo: "Apoyo Familiar", descripcion: "Orientación y asesoramiento" },
  { titulo: "Empleo con Apoyo", descripcion: "Inserción laboral adaptada" },
]

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 px-8 bg-verde-suave">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-verde-oscuro mb-12">
          Servicios Disponibles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicios.map((item) => (
            <div
              key={item.titulo}
              className="bg-white p-6 rounded-lg text-center border-l-4 border-l-verde-principal transition-all duration-300 hover:scale-105 hover:shadow-lg"
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