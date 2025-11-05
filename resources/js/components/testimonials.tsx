import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const TESTIMONIALS = [
  {
    quote:
      "Investing with Bronxx has been seamless. The dashboard is clear and the returns are transparent.",
    name: "Ava Thompson",
    title: "Product Lead, Northwind",
  },
  {
    quote:
      "Finally a platform that treats retail investors like pros. KYC was quick and support is stellar.",
    name: "Marcus Lee",
    title: "Engineer, Acme Co",
  },
  {
    quote:
      "I moved a portion of my portfolio here and love the clarity around risk and timeline.",
    name: "Priya Patel",
    title: "Analyst, Contoso",
  },
]

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi | null>(null)
  const [current, setCurrent] = React.useState(0)
  const total = TESTIMONIALS.length

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on("select", onSelect)
    onSelect()
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section className="relative bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-36">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-semibold tracking-widest text-primary/70 mb-2">TESTIMONIALS</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">What our clients say</h2>
        </div>

        <div className="relative">
          <Carousel setApi={setApi} className="">
            <CarouselContent className="items-stretch">
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx}>
                  <div className="mx-auto max-w-3xl">
                    <figure className="rounded-2xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-slate-200 p-8 md:p-12">
                      <blockquote className="">
                        <p className="text-xl md:text-2xl leading-relaxed text-slate-800">“{t.quote}”</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-4">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-slate-700 font-semibold">
                          {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="text-left">
                          <div className="text-sm md:text-base font-semibold text-slate-900">{t.name}</div>
                          <div className="text-xs md:text-sm text-slate-600">{t.title}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 md:-left-6" />
            <CarouselNext className="-right-2 md:-right-6" />
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  i === current ? "bg-slate-900 w-6" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
