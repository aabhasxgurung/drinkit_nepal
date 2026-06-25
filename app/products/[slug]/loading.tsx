export default function Loading() {
  return (
    <div>
      {/* Hero */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ backgroundColor: "#1C1814", minHeight: "100svh" }}
      >
        {/* Left — text */}
        <div className="lg:w-[52%] px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-12 lg:pb-20 flex flex-col justify-between order-2 lg:order-1">
          <div className="space-y-5">
            <div className="h-2 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-14 w-72 bg-white/10 rounded animate-pulse" />
            <div className="space-y-2 pt-2">
              <div className="h-2.5 w-full max-w-md bg-white/[0.06] rounded animate-pulse" />
              <div className="h-2.5 w-4/5 max-w-sm bg-white/[0.06] rounded animate-pulse" />
              <div className="h-2.5 w-3/5 max-w-xs bg-white/[0.06] rounded animate-pulse" />
            </div>
          </div>
          <div className="flex gap-8 pt-8" style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
            {[24, 20, 28, 18].map((w, i) => (
              <div key={i}>
                <div className="h-1.5 w-10 bg-white/[0.15] rounded animate-pulse mb-2" />
                <div className={`h-2.5 w-${w} bg-white/[0.06] rounded animate-pulse`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right — bottle placeholder */}
        <div
          className="relative lg:w-[48%] order-1 lg:order-2"
          style={{ minHeight: "55svh" }}
        >
          <div className="absolute inset-10 bg-white/[0.03] rounded-2xl animate-pulse" />
        </div>
      </div>

      {/* Tasting notes */}
      <div
        className="px-6 md:px-12 lg:px-16 py-20 md:py-28 space-y-10"
        style={{ backgroundColor: "#FAF8F5" }}
      >
        <div className="h-2 w-24 bg-[#E8E3DC] rounded animate-pulse" />
        <div className="grid md:grid-cols-3 gap-10">
          {["Nose", "Palate", "Finish"].map((n) => (
            <div key={n} className="space-y-3">
              <div className="h-2 w-12 bg-[#E8E3DC] rounded animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-[#F0EBE5] rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-[#F0EBE5] rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-[#F0EBE5] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div
        className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
        style={{ backgroundColor: "#1C1814" }}
      >
        <div className="grid md:grid-cols-3 gap-16">
          {[5, 3, 4].map((rows, col) => (
            <div key={col} className="space-y-4">
              <div className="h-1.5 w-20 bg-white/10 rounded animate-pulse mb-6" />
              {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex justify-between py-3.5" style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <div className="h-2 w-16 bg-white/[0.1] rounded animate-pulse" />
                  <div className="h-2 w-20 bg-white/[0.06] rounded animate-pulse" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
