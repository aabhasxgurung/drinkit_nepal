export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] animate-pulse">
      {/* Banner skeleton */}
      <div className="w-full h-screen bg-gray-200" />
      {/* Brands skeleton */}
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-16" />
        <div className="grid grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-40" />
          ))}
        </div>
      </div>
    </div>
  )
}
