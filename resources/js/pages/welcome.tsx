import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import HowItsMade from "@/components/how-its-made"
import TechSpecs from "@/components/tech-specs"
import DegreeView from "@/components/degree-view"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import { useEffect } from "react"
import { useAppearance } from "@/hooks/use-appearance"

export default function Home() {
    const { updateAppearance } = useAppearance()    
    useEffect(() => {
        updateAppearance('light')
    }, [updateAppearance])

  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Features />
      <HowItsMade />
      <TechSpecs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
