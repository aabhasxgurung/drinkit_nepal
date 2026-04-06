export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[40vh] bg-[#F5EBDA]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-12 border-t border-gray-100"
          >
            <div className="h-10 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
