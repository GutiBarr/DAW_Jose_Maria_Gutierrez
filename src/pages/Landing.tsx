import Header from "@/components/layout/Header"
import Hero from "@/components/landing/Hero"
import ComoFunciona from "@/components/landing/ComoFunciona"
import Catalogo from "@/components/landing/Catalogo"
import Footer from "@/components/layout/Footer"

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ComoFunciona />
        <Catalogo />
      </main>
      <Footer />
    </>
  )
}