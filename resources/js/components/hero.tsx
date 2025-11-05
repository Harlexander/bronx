import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from "@inertiajs/react"
import Autoplay from "embla-carousel-autoplay"

function BatteryPackIllustration() {
  return (
    <img src="/images/hero.png" alt="Battery Pack Illustration" />
  )
}

export default function Hero() {

  const slides = [
    {
      title: "Power for people who don’t run out",
      description:
        "Long‑lasting alkaline performance for toys, remotes, gaming controllers and more. Stock up and keep devices ready.",
      cta: "SHOP NOW →",
    },
    {
      title: "Reliable energy. Everyday.",
      description:
        "From AAA to 9V, BronX batteries deliver consistent power you can trust at home and on the go.",
      cta: "EXPLORE →",
    },
  ]

  return (
    <section
      className="relative text-white overflow-hidden bg-primary mt-5 sm:mt-0"
    >
      <div className="max-w-7xl mx-auto px-4 py-24 md:py-36 relative">
        <Carousel className="relative"
        plugins={[Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        })]}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  {/* Left Content */}
                  <div className="flex-1 z-10 gap-3 flex flex-col">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{slide.title}</h1>
                    <p className="text-sm sm:text-sm md:text-base text-white/80 max-w-xl">{slide.description}</p>
                    <Link href="/product">
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs sm:text-sm px-8 py-6">
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>

                  {/* Right Visual - Battery pack */}
                  <div className=" lg:flex flex-1 justify-center items-center relative h-96">
                    <BatteryPackIllustration />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/20 hover:bg-white/30 border-0 text-white" />
          <CarouselNext className="bg-white/20 hover:bg-white/30 border-0 text-white" />
        </Carousel>
      </div>
    </section>
  )
}
