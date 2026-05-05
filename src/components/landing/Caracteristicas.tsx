import { Card, CardContent } from "@/components/ui/card"

const caracteristicas = [
  {
    titulo: "Información Centralizada",
    descripcion:
      "Accede a todos los recursos, servicios y actividades disponibles en Extremadura en un único lugar. Sin necesidad de buscar en múltiples sitios.",
  },
  {
    titulo: "Perfiles Personalizados",
    descripcion:
      "Crea perfiles adaptados a las necesidades específicas de tu familiar para recibir recomendaciones personalizadas de servicios.",
  },
  {
    titulo: "Búsqueda Inteligente",
    descripcion:
      "Encuentra fácilmente los servicios más adecuados según características, ubicación y necesidades específicas.",
  },
  {
    titulo: "Conexión Directa",
    descripcion:
      "Contacta directamente con centros y entidades. Información actualizada y verificada en tiempo real.",
  },
  {
    titulo: "Totalmente Accesible",
    descripcion:
      "Diseño adaptado para personas con diferentes capacidades. Interfaz intuitiva y fácil de usar desde cualquier dispositivo.",
  },
  {
    titulo: "Multiplataforma",
    descripcion:
      "Accede desde ordenador, tablet o móvil. Información disponible cuando y donde la necesites.",
  },
]

export default function Caracteristicas() {
  return (
    <section id="caracteristicas" className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-verde-oscuro mb-12">
          ¿Qué ofrece ConciliaEx?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caracteristicas.map((item) => (
            <Card
              key={item.titulo}
              className="border-t-4 border-t-verde-principal shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-verde-oscuro mb-3">
                  {item.titulo}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.descripcion}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}