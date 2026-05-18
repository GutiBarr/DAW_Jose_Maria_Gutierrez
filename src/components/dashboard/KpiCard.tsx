interface KpiCardProps {
  label: string
  value: number | string
  color?: string
  highlight?: boolean
}

export default function KpiCard({ label, value, color, highlight }: KpiCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className={`text-2xl font-semibold mb-0.5 ${highlight ? "text-amber-500" : (color ?? "text-foreground")}`}>
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
