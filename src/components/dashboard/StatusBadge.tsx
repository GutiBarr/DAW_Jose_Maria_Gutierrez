interface StatusBadgeProps {
  activo:        boolean
  labelActivo:   string
  labelInactivo: string
}

export default function StatusBadge({ activo, labelActivo, labelInactivo }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${
      activo
        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
        : "bg-muted text-muted-foreground border border-border"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${activo ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
      {activo ? labelActivo : labelInactivo}
    </span>
  )
}
