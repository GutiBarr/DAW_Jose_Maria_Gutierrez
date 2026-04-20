import { Button } from "@/components/ui/button"
import LogoFamilia from "@/components/layout/LogoFamilia"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="mt-20 bg-gradient-to-br from-verde-suave to-white py-24 px-8 text-center"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8 animate-[aparecer_1s_ease-out]">
          <LogoFamilia variante="hero" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-verde-oscuro mb-6">
          ConciliaEx
        </h1>

        <p className="text-xl text-muted-foreground mb-4">
          Plataforma web de orientación para familias con personas con discapacidad
        </p>

        <p className="text-lg text-muted-foreground mb-8">
          Encuentra los servicios y recursos adaptados que necesitas en un solo lugar
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-verde-principal hover:bg-verde-oscuro text-white rounded-full px-8"
          >
            Registrarse Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-verde-principal text-verde-principal hover:bg-verde-principal hover:text-white rounded-full px-8"
          >
            Conocer Más
          </Button>
        </div>
      </div>
    </section>
  )
}