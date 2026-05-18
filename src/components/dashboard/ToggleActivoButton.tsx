interface ToggleActivoButtonProps {
  activo:          boolean
  labelActivar:    string
  labelDesactivar: string
  onClick:         () => void
  className?:      string
}

export default function ToggleActivoButton({
  activo, labelActivar, labelDesactivar, onClick, className = "",
}: ToggleActivoButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
        activo
          ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/25 hover:border-amber-500/40"
          : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 hover:border-emerald-500/40"
      } ${className}`}
    >
      {activo ? labelDesactivar : labelActivar}
    </button>
  )
}
