function Bone({ className }: { className: string }) {
  return <div className={`bg-muted rounded ${className}`} />
}

export function KpiCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 animate-pulse">
      <Bone className="h-7 w-10 mb-1.5" />
      <Bone className="h-4 w-24" />
    </div>
  )
}

export function ServicioCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 animate-pulse">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <Bone className="w-14 h-14 shrink-0 rounded-lg" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Bone className="h-4 w-40" />
            <Bone className="h-5 w-14 rounded-full" />
            <Bone className="h-5 w-20 rounded-full" />
          </div>
          <Bone className="h-3 w-4/5" />
          <div className="flex gap-4 pt-0.5">
            <Bone className="h-3 w-20" />
            <Bone className="h-3 w-16" />
            <Bone className="h-3 w-8" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
        <Bone className="h-7 w-14 rounded-lg" />
        <Bone className="h-7 w-20 rounded-lg" />
        <Bone className="h-7 w-16 rounded-lg" />
      </div>
    </div>
  )
}

export function SolicitudCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Bone className="h-4 w-36" />
            <Bone className="h-5 w-16 rounded-full" />
          </div>
          <Bone className="h-3 w-52" />
          <Bone className="h-3 w-4/5" />
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <Bone className="h-3 w-16" />
          <Bone className="h-7 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function CatalogoCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse flex flex-col">
      <div className="w-full h-40 bg-muted" />
      <div className="p-5 flex flex-col flex-1 space-y-2">
        <Bone className="h-5 w-24 rounded-full" />
        <Bone className="h-4 w-3/4" />
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-2/3" />
        <div className="flex flex-col gap-1.5 pt-1">
          <Bone className="h-3 w-28" />
          <Bone className="h-3 w-24" />
        </div>
        <div className="flex gap-2 pt-2">
          <Bone className="flex-1 h-8 rounded-lg" />
          <Bone className="flex-1 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function TableSkeleton({ cols = 5, rows = 6 }: { cols?: number; rows?: number }) {
  const colWidths = ["w-32", "w-40", "w-20", "w-24", "w-28"]
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="px-5 py-3 text-left">
                  <Bone className="h-3 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c} className="px-5 py-3.5">
                    <Bone className={`h-4 ${colWidths[c % colWidths.length]}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
