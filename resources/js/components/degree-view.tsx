export default function DegreeView() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-gray-600 mb-2">360° VIEW</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">360 - DEGREE VIEW</h2>

        {/* Circular Display Placeholder */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
            <div className="w-40 h-40 border-4 border-gray-600 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-400">360°</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider controls */}
        <div className="flex justify-center items-center gap-8">
          <button className="text-gray-400 hover:text-gray-600">←</button>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1 ${i === 0 ? "w-8" : "w-4"} rounded-full ${i === 0 ? "bg-gray-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
          <button className="text-gray-400 hover:text-gray-600">→</button>
        </div>
      </div>
    </section>
  )
}
