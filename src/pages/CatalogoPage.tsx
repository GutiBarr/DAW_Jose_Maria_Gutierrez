import DashboardHeader from "@/components/dashboard/DashboardHeader"
import Catalogo from "@/components/landing/Catalogo"
import { useT } from "@/i18n/useT"

export default function CatalogoPage() {
  const t = useT()
  
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader subtitle={t.nav.servicios} />
      <main className="pt-16">
        <Catalogo />
      </main>
    </div>
  )
}
