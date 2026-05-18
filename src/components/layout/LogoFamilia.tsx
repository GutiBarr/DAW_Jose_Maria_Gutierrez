type Variante = "header" | "hero" | "footer" | "auth"

interface LogoFamiliaProps {
  variante?: Variante
}

// Colores por figura (izquierda, centro, derecha)
const COLORES_HEADER = ["#10b981", "#059669", "#34d399"] // emerald-500, emerald-600, emerald-400
const COLORES_HERO   = ["#10b981", "#047857", "#6ee7b7"] // verde-principal, verde-oscuro, verde-claro
const COLORES_FOOTER = ["#6ee7b7", "#10b981", "#6ee7b7"]
const COLORES_AUTH   = ["#10b981", "#059669", "#34d399"]

const Figura = ({ color, clsBase, clsHead }: { color: string, clsBase: string, clsHead: string }) => (
  <div 
    style={{ background: color }} 
    className={`${clsBase} rounded-t-full relative before:content-[''] before:absolute ${clsHead} before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit`} 
  />
)

export default function LogoFamilia({ variante = "header" }: LogoFamiliaProps) {
  if (variante === "hero") {
    const [c1, c2, c3] = COLORES_HERO
    return (
      <div className="flex items-end justify-center gap-1.5 h-24">
        <Figura color={c1} clsBase="w-7 h-12" clsHead="before:w-4 before:h-4 before:-top-2.5" />
        <Figura color={c2} clsBase="w-7 h-16" clsHead="before:w-4 before:h-4 before:-top-2.5" />
        <Figura color={c3} clsBase="w-7 h-12" clsHead="before:w-4 before:h-4 before:-top-2.5" />
      </div>
    )
  }

  if (variante === "footer") {
    const [c1, c2, c3] = COLORES_FOOTER
    return (
      <div className="flex items-end justify-center gap-1 h-10">
        <Figura color={c1} clsBase="w-3.5 h-5" clsHead="before:w-2 before:h-2 before:-top-1" />
        <Figura color={c2} clsBase="w-3.5 h-7" clsHead="before:w-2 before:h-2 before:-top-1" />
        <Figura color={c3} clsBase="w-3.5 h-5" clsHead="before:w-2 before:h-2 before:-top-1" />
      </div>
    )
  }

  if (variante === "auth") {
    const [c1, c2, c3] = COLORES_AUTH
    return (
      <div className="flex items-end justify-center gap-1 h-14">
        <Figura color={c1} clsBase="w-4 h-7" clsHead="before:w-3 before:h-3 before:-top-1.5" />
        <Figura color={c2} clsBase="w-4 h-10" clsHead="before:w-3 before:h-3 before:-top-1.5" />
        <Figura color={c3} clsBase="w-4 h-7" clsHead="before:w-3 before:h-3 before:-top-1.5" />
      </div>
    )
  }

  // header por defecto — colores verdes visibles en modo claro y oscuro
  const [c1, c2, c3] = COLORES_HEADER
  return (
    <div className="flex items-end justify-center gap-0.5 h-10">
      <Figura color={c1} clsBase="w-3 h-5" clsHead="before:w-2 before:h-2 before:-top-1" />
      <Figura color={c2} clsBase="w-3 h-7" clsHead="before:w-2 before:h-2 before:-top-1" />
      <Figura color={c3} clsBase="w-3 h-5" clsHead="before:w-2 before:h-2 before:-top-1" />
    </div>
  )
}