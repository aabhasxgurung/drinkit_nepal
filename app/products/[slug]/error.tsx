"use client"

import Link from "next/link"

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl font-serif text-gray-900 mb-4">
        Product not available
      </h2>
      <p className="text-gray-500 font-sans mb-8">
        We could not load this product right now.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#7B0323] text-white rounded-lg font-medium hover:bg-[#9B0C3C] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/products"
          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:border-[#7B0323] hover:text-[#7B0323] transition-colors"
        >
          Back to products
        </Link>
      </div>
    </div>
  )
}
