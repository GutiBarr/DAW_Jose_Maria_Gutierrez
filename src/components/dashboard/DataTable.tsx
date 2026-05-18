import type { ReactNode } from "react"

export interface Column<T> {
  key:      string
  header:   string
  align?:   "left" | "right"
  render:   (row: T) => ReactNode
}

interface DataTableProps<T> {
  columns:       Column<T>[]
  data:          T[]
  keyExtractor:  (row: T) => string
  emptyMessage?: string
}

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage,
}: DataTableProps<T>) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="hover:bg-muted/40 transition-colors">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-5 py-3.5 ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {data.length === 0 && emptyMessage && (
        <p className="text-sm text-muted-foreground text-center py-10">{emptyMessage}</p>
      )}
    </div>
  )
}
