import { Link } from "react-router-dom"
import LogoFamilia from "@/components/layout/LogoFamilia"

const roles = [
  {
    id: "familia",
    titulo: "Soy una Familia",
    descripcion: "Busca servicios y recursos adaptados para tu familiar con discapacidad.",
    items: [
      "Crea perfiles personalizados",
      "Busca servicios adaptados",
      "Guarda tus favoritos",
    ],
    ruta: "/registro/familia",
  },
  {
    id: "entidad",
    titulo: "Somos una Entidad",
    descripcion: "Publica y gestiona los servicios que ofrece tu centro o asociación.",
    items: [
      "Registra tu centro",
      "Publica servicios",
      "Recibe consultas de familias",
    ],
    ruta: "/registro/entidad",
  },
]

export default function Registro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-verde-suave to-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-verde-principal to-verde-oscuro p-3 rounded-xl">
              <LogoFamilia variante="header" />
            </div>
            <h1 className="text-3xl font-bold text-verde-oscuro">ConciliaEx</h1>
          </Link>

          <h2 className="text-4xl font-bold text-verde-oscuro mb-3">
            Crea tu cuenta
          </h2>
          <p className="text-lg text-muted-foreground">
            Elige el tipo de cuenta que mejor se adapta a ti
          </p>
        </div>

        {/* Tarjetas de selección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {roles.map((rol) => (
            <Link
              key={rol.id}
              to={rol.ruta}
              className="group bg-white p-8 rounded-2xl border-2 border-border hover:border-verde-principal hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-verde-oscuro mb-3 group-hover:text-verde-principal transition-colors">
                {rol.titulo}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {rol.descripcion}
              </p>

              <ul className="space-y-2 mb-6">
                {rol.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-verde-principal font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="text-verde-principal font-semibold group-hover:translate-x-1 transition-transform">
                Continuar →
              </div>
            </Link>
          ))}
        </div>

        {/* Link a login */}
        <p className="text-center text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-verde-principal hover:text-verde-oscuro font-semibold hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}