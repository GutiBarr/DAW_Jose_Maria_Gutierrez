import { Link } from "react-router-dom"
import LogoFamilia from "@/components/layout/LogoFamilia"
import { useT } from "@/i18n/useT"

export default function Footer() {
  const t = useT()

  const links = {
    [t.footer.seccionPlataforma]: [
      { label: t.footer.verServicios, href: "#catalogo" },
      { label: t.footer.comoFunciona, href: "#como-funciona" },
      { label: t.footer.paraEntidades, href: "/registro/entidad" },
      { label: t.footer.paraFamilias, href: "/registro/familia" },
    ],
    [t.footer.seccionLegal]: [
      { label: t.footer.privacidad, href: "/legal/privacidad" },
      { label: t.footer.terminos, href: "/legal/terminos" },
      { label: t.footer.accesibilidad, href: "/legal/accesibilidad" },
      { label: t.footer.cookies, href: "/legal/cookies" },
    ],
    [t.footer.seccionContacto]: [
      { label: "info@conciliaex.es", href: "mailto:info@conciliaex.es" },
      { label: "924 000 000", href: "tel:924000000" },
      { label: "Mérida, Extremadura", href: "#" },
    ],
  }

  return (
    <footer id="contacto" className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <LogoFamilia variante="footer" />
              <span className="text-base font-semibold text-foreground">ConciliaEx</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              {t.footer.descripcion}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t.footer.activo}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        to={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} ConciliaEx. {t.footer.derechos}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {t.footer.proyecto}
          </p>
        </div>
      </div>
    </footer>
  )
}