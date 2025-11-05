export default function TechSpecs() {
  const specs = [
    { label: "BATTERY CAPACITY", value: "420 mAh (typical)" },
    { label: "CHEMISTRY", value: "Lithium‑ion polymer (Li‑Po)" },
    { label: "NOMINAL VOLTAGE", value: "3.85 V" },
    { label: "ENERGY", value: "1.62 Wh" },
    { label: "CHARGE TIME (0–100%)", value: "~90 minutes" },
    { label: "FAST CHARGE", value: "0–50% in ~30 minutes" },
    { label: "CYCLE LIFE", value: "> 500 cycles to 80% capacity" },
    { label: "OPERATING TEMP", value: "0°C to 35°C (32°F to 95°F)" },
  ]

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">POWER THAT LASTS</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">BATTERY SPECIFICATIONS</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* Battery Illustration */}
        <div className="flex justify-center ">
          <img src="/images/spec.png" alt="Battery Specifications" className="w-full h-96 object-contain" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {specs.map((spec, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <p className="text-xs font-semibold text-gray-600 mb-1">{spec.label}</p>
              <p className="text-lg font-semibold text-gray-900">{spec.value}</p>
            </div>
          ))}
        </div>
        </div>

      </div>
    </section>
  )
}
