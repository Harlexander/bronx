import { Battery, Zap, Thermometer } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Battery,
      title: "Long‑lasting Capacity",
      description:
        "High‑density Li‑Po cells deliver all‑day power with optimized discharge for consistent performance.",
    },
    {
      icon: Zap,
      title: "Fast Charging",
      description: "0–50% in about 30 minutes with smart thermal management and charge protection.",
    },
    {
      icon: Thermometer,
      title: "Safe & Efficient",
      description: "Multi‑layer safety (OVP/OCP/SCP) and temperature monitoring for reliable longevity.",
    },
  ]

  return (
    <section className="bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-24 md:py-36 ">
        <div className="mb-12">
          <p className="text-sm font-semibold text-gray-600 mb-2">BATTERY FEATURES</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            POWER THAT LASTS
            <br />
            SMART BATTERY TECH.
          </h2>
        </div>

        {/* Battery Image Placeholder */}
        <div className="flex justify-center">
            <img src="/images/ring.png" alt="Battery" className="w-full h-full object-cover" />
        </div>

        <div className=" flex flex-col gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <Icon className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
