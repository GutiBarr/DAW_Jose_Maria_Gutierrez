import Header from "@/components/layout/Header"
import Hero from "@/components/landing/Hero"
import Caracteristicas from "@/components/landing/Caracteristicas"
import Servicios from "@/components/landing/Servicios"
import Roles from "@/components/landing/Roles"
import Accesibilidad from "@/components/landing/Accesibilidad"
import CTA from "@/components/landing/CTA"
import Footer from "@/components/layout/Footer"

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Caracteristicas />
        <Servicios />
        <Roles />
        <Accesibilidad />
        <CTA />
      </main>
      <Footer />
    </>
  )
}