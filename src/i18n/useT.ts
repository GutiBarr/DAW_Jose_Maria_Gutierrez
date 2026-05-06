import { useLangStore } from "@/store/langStore"
import { es } from "./es"
import { en } from "./en"

export function useT() {
  const { lang } = useLangStore()
  return lang === "en" ? en : es
}
