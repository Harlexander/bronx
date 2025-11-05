import { Play } from "lucide-react"

export default function HowItsMade() {
  return (
    <section
      className="relative bg-cover bg-center py-24"
      style={{ backgroundImage: "url(/placeholder.svg?height=600&width=1200&query=smartwatch-manufacturing)" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-yellow-400 mb-4">HOW IT'S MADE</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">HOW TO MADE</h2>
        <button className="bg-yellow-400 hover:bg-yellow-500 rounded-full p-4 inline-block transition">
          <Play className="w-8 h-8 text-black" />
        </button>
      </div>
    </section>
  )
}
