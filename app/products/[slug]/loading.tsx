export default function Loading() {
  return (
    <div className="flex flex-col lg:flex-row bg-[#0f0f0f] min-h-screen">
      {/* Left panel skeleton */}
      <div className="relative lg:w-[45%] bg-[#0f0f0f]">
        <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-screen">
          {/* Bottle placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-72 bg-white/5 rounded-xl animate-pulse" />
          </div>
          {/* Text placeholder at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 space-y-3">
            <div className="h-2 w-24 bg-white/10 rounded animate-pulse" />
            <div className="h-8 w-56 bg-white/10 rounded animate-pulse" />
            <div className="h-2 w-36 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="lg:w-[55%] bg-[#FAF8F5] px-6 md:px-12 lg:px-14 xl:px-20 pt-12 lg:pt-24 pb-28 space-y-14">
        {/* Pulled quote */}
        <div className="space-y-3">
          <div className="h-6 w-full bg-[#E8E3DC] rounded animate-pulse" />
          <div className="h-6 w-5/6 bg-[#E8E3DC] rounded animate-pulse" />
          <div className="h-6 w-3/4 bg-[#E8E3DC] rounded animate-pulse" />
        </div>

        {/* Spec pills */}
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-3 w-16 bg-[#E8E3DC] rounded animate-pulse" />
          ))}
        </div>

        {/* Botanicals */}
        <div className="space-y-4">
          <div className="h-2 w-20 bg-[#E8E3DC] rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-7 w-20 bg-[#EDE8E1] rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Tasting notes */}
        <div className="space-y-4">
          <div className="h-2 w-24 bg-[#E8E3DC] rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-full bg-[#E8E3DC] rounded animate-pulse" />
            <div className="h-5 w-4/5 bg-[#E8E3DC] rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
