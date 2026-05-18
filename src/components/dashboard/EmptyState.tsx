import type { ReactNode } from "react"

interface EmptyStateProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function EmptyState({ title, subtitle, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 border border-dashed border-border rounded-2xl">
      <p className="text-sm font-medium text-foreground mb-1">{title}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground mb-5">{subtitle}</p>
      )}
      {action}
    </div>
  )
}
