import { Link } from "react-router-dom"
import LogoFamilia from "@/components/layout/LogoFamilia"

const links = {
  Plataforma: [
    { label: "Ver servicios", href: "#catalogo" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Para entidades", href: "/registro/entidad" },
    { label: "Para familias", href: "/registro/familia" },
  ],
  Legal: [
    { label: "Privacidad", href: "#" },
    { label: "Términos de uso", href: "#" },
    { label: "Accesibilidad", href: "#" },
    { label: "Cookies", href: "#" },
  ],
  Contacto: [
    { label: "info@conciliaex.es", href: "mailto:info@conciliaex.es" },
    { label: "924 000 000", href: "tel:924000000" },
    { label: "Mérida, Extremadura", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer id="contacto" className="bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <LogoFamilia variante="footer" />
              <span className="text-base font-semibold text-white">ConciliaEx</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-5">
              Plataforma de conexión entre familias con personas dependientes
              y servicios especializados en Extremadura.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Servicio activo · Extremadura
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ConciliaEx. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Proyecto Intermodular DAW · IES Albarregas, Mérida
          </p>
        </div>
      </div>
    </footer>
  )
}