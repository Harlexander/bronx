import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Award, CheckCircle2, Factory, Globe, HeartHandshake, Leaf, ShieldCheck } from "lucide-react"
import { useEffect } from "react"
import { useAppearance } from "@/hooks/use-appearance"

export default function About() {
  const { updateAppearance } = useAppearance()
  useEffect(() => {
    updateAppearance('light')
  }, [updateAppearance])

  return (
    <main className="w-full">
      <Header />
      <div className="py-12"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 border-b">
        <p className="text-2xl font-bold">About</p>
        <p className="text-sm text-gray-500">Home / About</p>
      </div>
      {/* Intro + Years */}
      <section className="bg-white grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-18 md:py-20">
        <div className="flex justify-center">
            <img src="/images/spec.png" alt="About" className="w-full h-96 object-cover" />
        </div>
        <div className="col-span-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            We have created beautiful products for you
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
            A streamlined cloud solution. User generated content in real‑time will have multiple touchpoints
            that evolve towards a unified experience across devices.
            </p>
            <p className="text-slate-600 leading-relaxed">
            Our design system enables rapid iteration while maintaining quality and performance.
            </p>
        </div>
        
      </section>

      {/* Our mission & strengths */}
      <section className="bg-white max-w-7xl mx-auto px-4 pb-6 md:pb-10 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Feature icon={<ShieldCheck className="h-5 w-5" />} title="Secure by design" description="Best‑in‑class security practices and regular audits." />
          <Feature icon={<Leaf className="h-5 w-5" />} title="Sustainably made" description="Materials and processes with the planet in mind." />
          <Feature icon={<Award className="h-5 w-5" />} title="Award‑winning support" description="Humans that care, available when you need them." />
          <Feature icon={<Globe className="h-5 w-5" />} title="Global footprint" description="Products used in 40+ countries and growing." />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <Stat value="2346" label="Employees from around the world" />
          <Stat value="345+" label="We care about our investors" />
          <Stat value="26+" label="People are our biggest capital" />
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-xl font-semibold mb-6">Milestones</h3>
          <div className="relative border-l pl-6">
            {[
              { year: '2019', title: 'Founded', desc: 'Started with a small team and a big vision.' },
              { year: '2021', title: 'First 10k customers', desc: 'Reached product‑market fit and scaled support.' },
              { year: '2024', title: 'Sustainability pledge', desc: 'Offset operations and improved packaging.' },
            ].map((m) => (
              <div key={m.year} className="mb-6">
                <div className="absolute -left-1.5 mt-1 size-3 rounded-full bg-primary" />
                <p className="text-xs text-muted-foreground">{m.year}</p>
                <p className="font-medium">{m.title}</p>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-xl font-semibold mb-6">What we believe</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Value icon={<HeartHandshake className="h-5 w-5" />} title="Customer first" description="We listen deeply and iterate fast to exceed expectations." />
            <Value icon={<CheckCircle2 className="h-5 w-5" />} title="Craft matters" description="Small details compound into remarkable experiences." />
            <Value icon={<Factory className="h-5 w-5" />} title="Responsible manufacturing" description="Supply chains audited and continuously improved." />
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid grid-cols-1 md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
          <div>
            <h3 className="text-white text-2xl md:text-3xl font-semibold">You’ll be happy to see our awesome features</h3>
            <p className="mt-3 text-white/70 max-w-2xl">
              Expression of modern scientific inquiry and exposition. Our approach follows a series of sprints to
              deliver consistent value while maintaining craftsmanship.
            </p>
            <a href="#" className="inline-flex items-center gap-2 mt-6 text-white font-semibold">
              Explore our products <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-xl overflow-hidden">
            <img src="/images/hero.png" alt="Features preview" className="w-64 h-64 md:h-80 object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-6">
      <div className="text-primary mb-3">{icon}</div>
      <div className="text-slate-900 font-semibold">{title}</div>
      <p className="text-slate-600 mt-1 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-primary">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-slate-500">{label}</div>
    </div>
  )
}

function Value({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border p-6">
      <div className="text-primary mb-3">{icon}</div>
      <div className="text-slate-900 font-semibold">{title}</div>
      <p className="text-slate-600 mt-1 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

