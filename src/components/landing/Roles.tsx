const roles = [
  {
    titulo: "Familias",
    descripcion: "Encuentra los mejores servicios para tu familiar",
    items: [
      "Crea perfiles personalizados",
      "Busca servicios adaptados",
      "Consulta disponibilidad",
      "Contacta con entidades",
      "Guarda tus favoritos",
    ],
  },
  {
    titulo: "Entidades y Centros",
    descripcion: "Publica y gestiona tus servicios",
    items: [
      "Registra tu centro",
      "Publica tus servicios",
      "Actualiza información",
      "Recibe consultas",
      "Aumenta tu visibilidad",
    ],
  },
]

export default function Roles() {
  return (
    <section id="roles" className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-verde-oscuro mb-12">
          ¿Para Quién es ConciliaEx?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roles.map((rol) => (
            <div
              key={rol.titulo}
              className="bg-gradient-to-br from-verde-claro to-verde-principal text-white p-10 rounded-2xl text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-3">{rol.titulo}</h3>
              <p className="mb-6 text-white/90">{rol.descripcion}</p>

              <ul className="text-left space-y-2">
                {rol.items.map((item) => (
                  <li key={item} className="relative pl-6">
                    <span className="absolute left-0 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}