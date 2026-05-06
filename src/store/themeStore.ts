import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "dark" | "light"

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  aplicar: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "dark",

      aplicar: () => {
        const { theme } = get()
        if (theme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },

      toggleTheme: () => {
        const next: Theme = get().theme === "dark" ? "light" : "dark"
        set({ theme: next })
        if (next === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      },
    }),
    {
      name: "conciliaex-theme",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
