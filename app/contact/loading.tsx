export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[40vh] bg-[#F5EBDA]" />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info skeleton */}
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="h-7 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
              </div>
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-gray-100" />
                    <div className="space-y-2">
                      <div className="h-5 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-48 bg-gray-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form skeleton */}
            <div className="bg-white rounded-2xl p-10 border border-gray-100 space-y-5">
              <div className="h-7 w-48 bg-gray-200 rounded mb-6" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                  <div className="h-10 w-full bg-gray-100 rounded-lg" />
                </div>
              ))}
              <div className="h-11 w-full bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
