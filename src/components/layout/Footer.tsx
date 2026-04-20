import LogoFamilia from "@/components/layout/LogoFamilia"

const enlacesRapidos = [
  { label: "Inicio", href: "#inicio" },
  { label: "Características", href: "#caracteristicas" },
  { label: "Servicios", href: "#servicios" },
  { label: "Para quién es", href: "#roles" },
]

const legales = [
  { label: "Política de Privacidad", href: "#" },
  { label: "Términos y Condiciones", href: "#" },
  { label: "Accesibilidad", href: "#" },
  { label: "Cookies", href: "#" },
]

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#333333] text-white pt-12 pb-4 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoFamilia variante="footer" />
              <h3 className="text-xl font-bold">ConciliaEx</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Plataforma de orientación para familias con personas con discapacidad en Extremadura.
            </p>
            <p className="text-white/80 mt-3">
              En colaboración con Plena Inclusión Extremadura
            </p>
          </div>

          <div>
            <h3 className="text-verde-claro font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {enlacesRapidos.map((enlace) => (
                <li key={enlace.href}>
                  <a
                    href={enlace.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {enlace.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-verde-claro font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legales.map((enlace) => (
                <li key={enlace.label}>
                  <a
                    href={enlace.href}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                  
                    {enlace.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-verde-claro font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-white/80">
              <li>info@conciliaex.es</li>
              <li>924 000 000</li>
              <li>Mérida, Extremadura</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/70 text-sm">
          <p>ConciliaEx</p>
        </div>
      </div>
    </footer>
  )
}