interface Tab<T extends string> {
  key: T
  label: string
  badge?: number
}

interface TabBarProps<T extends string> {
  tabs: Tab<T>[]
  active: T
  onChange: (tab: T) => void
}

export default function TabBar<T extends string>({ tabs, active, onChange }: TabBarProps<T>) {
  return (
    <div className="flex gap-1 bg-card border border-border p-1 rounded-lg w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
            active === tab.key
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
          {typeof tab.badge === "number" && tab.badge > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-semibold">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
