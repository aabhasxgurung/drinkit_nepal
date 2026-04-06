export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[40vh] bg-gray-200" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar skeleton */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6">
              <div className="h-10 bg-gray-100 rounded-xl" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 bg-gray-100 rounded" />
                ))}
              </div>
            </div>
          </aside>

          {/* Grid skeleton */}
          <main className="lg:w-3/4">
            <div className="h-5 w-32 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="aspect-[4/5] bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
