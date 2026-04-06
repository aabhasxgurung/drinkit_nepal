export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12 animate-pulse">
      {/* Title */}
      <div className="text-center mb-10 space-y-4">
        <div className="h-12 w-96 bg-gray-200 rounded mx-auto" />
        <div className="h-4 w-2/3 bg-gray-100 rounded mx-auto" />
        <div className="h-4 w-1/2 bg-gray-100 rounded mx-auto" />
      </div>

      {/* Bottle image */}
      <div className="flex justify-center my-12">
        <div className="w-80 h-80 bg-gray-100 rounded-full" />
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto border-t border-gray-100 pt-10">
        <div className="space-y-6">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-5 w-40 bg-gray-200 rounded mt-4" />
          <div className="h-4 w-3/4 bg-gray-100 rounded" />
        </div>
        <div className="space-y-6">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-gray-100 rounded" />
          ))}
        </div>
        <div className="md:col-span-2 mt-6 border-t border-gray-100 pt-6">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4 text-center space-y-2">
                <div className="h-3 w-12 bg-gray-100 rounded mx-auto" />
                <div className="h-5 w-20 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
