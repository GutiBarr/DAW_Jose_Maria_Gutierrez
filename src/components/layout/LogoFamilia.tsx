type Variante = "header" | "hero" | "footer" | "auth"

interface LogoFamiliaProps {
  variante?: Variante
}

export default function LogoFamilia({ variante = "header" }: LogoFamiliaProps) {
  if (variante === "hero") {
    return (
      <div className="flex items-end justify-center gap-1.5 h-24">
        <div className="w-7 h-12 bg-verde-principal rounded-t-full relative before:content-[''] before:absolute before:w-4 before:h-4 before:-top-2.5 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
        <div className="w-7 h-16 bg-verde-oscuro rounded-t-full relative before:content-[''] before:absolute before:w-4 before:h-4 before:-top-2.5 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
        <div className="w-7 h-12 bg-verde-claro rounded-t-full relative before:content-[''] before:absolute before:w-4 before:h-4 before:-top-2.5 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
      </div>
    )
  }

  if (variante === "footer") {
    return (
      <div className="flex items-end justify-center gap-1 h-10">
        <div className="w-3.5 h-5 bg-verde-claro rounded-t-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
        <div className="w-3.5 h-7 bg-verde-principal rounded-t-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
        <div className="w-3.5 h-5 bg-verde-claro rounded-t-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
      </div>
    )
  }

  if (variante === "auth") {
    return (
      <div className="flex items-end justify-center gap-1 h-14">
        <div className="w-4 h-7 bg-white rounded-t-full relative before:content-[''] before:absolute before:w-3 before:h-3 before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
        <div className="w-4 h-10 bg-white rounded-t-full relative before:content-[''] before:absolute before:w-3 before:h-3 before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
        <div className="w-4 h-7 bg-white rounded-t-full relative before:content-[''] before:absolute before:w-3 before:h-3 before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
      </div>
    )
  }

  // header por defecto
  return (
    <div className="flex items-end justify-center gap-0.5 h-10">
      <div className="w-3 h-5 bg-white rounded-t-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
      <div className="w-3 h-7 bg-white rounded-t-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
      <div className="w-3 h-5 bg-white rounded-t-full relative before:content-[''] before:absolute before:w-2 before:h-2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-inherit" />
    </div>
  )
}