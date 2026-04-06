"use client"

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-serif text-gray-900 mb-4">
        Could not load contact page
      </h2>
      <p className="text-gray-500 font-sans mb-8">
        Something went wrong. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#7B0323] text-white rounded-lg font-medium hover:bg-[#9B0C3C] transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
