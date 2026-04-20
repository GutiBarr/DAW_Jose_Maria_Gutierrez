import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-20 px-8 bg-gradient-to-br from-verde-principal to-verde-oscuro text-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">¿Listo para empezar?</h2>

        <p className="text-lg mb-8 text-white/90">
          Únete a ConciliaEx y descubre cómo podemos ayudarte
        </p>

        <Button
  asChild
  size="lg"
  className="bg-white text-verde-principal hover:bg-white hover:text-verde-principal rounded-full px-10 py-6 text-base font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>
  <Link to="/registro">Crear Cuenta Gratis</Link>
</Button>
      </div>
    </section>
  )
}