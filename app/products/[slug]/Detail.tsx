"use client";
import type { Product } from "@prisma/client";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Detail({ product }: { product: Product }) {
  const reduce = useReducedMotion();

  const flavorPills: string[] =
    product.flavors
      ?.split(",")
      .map((f) => f.trim())
      .filter(Boolean) ?? [];

  // Page-load: clip-path reveal from bottom, staggered by delayMs
  function heroAnim(delayMs: number) {
    if (reduce)
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2, delay: delayMs / 1000 },
      };
    return {
      initial: { clipPath: "inset(0 0 100% 0)" },
      animate: { clipPath: "inset(0 0 0% 0)" },
      transition: { duration: 0.42, delay: delayMs / 1000, ease: EASE_OUT },
    };
  }

  // Scroll-triggered: clip-path reveal from bottom via IntersectionObserver
  function scrollAnim() {
    if (reduce)
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true } as const,
        transition: { duration: 0.2 },
      };
    return {
      initial: { clipPath: "inset(0 0 100% 0)" },
      whileInView: { clipPath: "inset(0 0 0% 0)" },
      viewport: { once: true, margin: "-60px" } as const,
      transition: { duration: 0.3, ease: EASE_OUT },
    };
  }

  // Botanical pills: translateY(8px)→0, opacity 0→1, 40ms stagger
  function pillAnim(i: number) {
    if (reduce)
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true } as const,
        transition: { duration: 0.15 },
      };
    return {
      initial: { opacity: 0, transform: "translateY(8px)" },
      whileInView: { opacity: 1, transform: "translateY(0px)" },
      viewport: { once: true } as const,
      transition: { duration: 0.26, delay: i * 0.04, ease: EASE_OUT },
    };
  }

  // Cocktail rows: translateY(12px)→0, opacity 0→1, 50ms stagger
  function rowAnim(i: number) {
    if (reduce)
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true } as const,
        transition: { duration: 0.15 },
      };
    return {
      initial: { opacity: 0, transform: "translateY(12px)" },
      whileInView: { opacity: 1, transform: "translateY(0px)" },
      viewport: { once: true } as const,
      transition: { duration: 0.28, delay: i * 0.05, ease: EASE_OUT },
    };
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative mt-12">
      {/* Hero — clip-path stagger: brand label → name → description */}
      <div className="text-center mb-10 relative z-10">
        <motion.p
          {...heroAnim(0)}
          className="text-sm font-semibold tracking-[0.25em] text-[#7B0323] uppercase mb-3"
        >
          {product.category}
        </motion.p>

        <motion.h1
          {...heroAnim(100)}
          className="text-5xl md:text-6xl font-light tracking-wider text-wine mb-4 font-serif"
        >
          {product.name}
        </motion.h1>

        <motion.p
          {...heroAnim(180)}
          className="text-gray-700 leading-relaxed text-center font-light max-w-3xl mx-auto"
        >
          {product.description}
        </motion.p>
      </div>

      {/* Bottle — scale 0.97→1, ease-out 400ms */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="flex justify-center my-12"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <Image
            width={400}
            height={400}
            src={product.image}
            alt={product.name}
            className="product-bottle-img object-contain w-full h-full"
          />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto border-t border-wine-200 pt-10 space-y-12">
        {/* Botanical pills — flavors split by comma, 40ms stagger */}
        {flavorPills.length > 0 && (
          <div>
            <motion.h3 {...scrollAnim()} className="text-xl font-light text-wine-700 mb-5">
              Tasting Notes
            </motion.h3>
            <div className="flex flex-wrap gap-2">
              {flavorPills.map((flavor, i) => (
                <motion.span
                  key={flavor}
                  {...pillAnim(i)}
                  className="px-4 py-1.5 rounded-full border border-[#7B0323]/20 text-sm text-[#7B0323] bg-[#7B0323]/5 font-sans"
                >
                  {flavor}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-6">
            {product.grapeVarietal && (
              <div>
                <motion.h3 {...scrollAnim()} className="text-xl font-light text-wine-700 mb-4">
                  Grape Varietal
                </motion.h3>
                <motion.p {...scrollAnim()} className="text-gray-700 font-light">
                  {product.grapeVarietal}
                </motion.p>
              </div>
            )}
            {product.alcoholPercentage && (
              <div>
                <motion.h3 {...scrollAnim()} className="text-xl font-light text-wine-700 mb-4">
                  Alcohol Percentage
                </motion.h3>
                <motion.p {...scrollAnim()} className="text-gray-700 font-light">
                  {product.alcoholPercentage}
                </motion.p>
              </div>
            )}
          </div>

          {/* Highlights — clip-path reveal from bottom on scroll */}
          {product.highlights.length > 0 && (
            <div>
              <motion.h3 {...scrollAnim()} className="text-xl font-light text-wine-700 mb-4">
                {product.category} Highlights
              </motion.h3>
              <ul className="space-y-2">
                {product.highlights.map((highlight, i) => (
                  <motion.li key={i} {...rowAnim(i)} className="text-gray-700 font-light">
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Cocktail rows — pairings, 50ms stagger on scroll */}
        {product.pairings.length > 0 && (
          <div>
            <motion.h3 {...scrollAnim()} className="text-xl font-light text-wine-700 mb-4">
              Suggested Pairing
            </motion.h3>
            <ul className="space-y-2">
              {product.pairings.map((pairing, i) => (
                <motion.li key={i} {...rowAnim(i)} className="text-gray-700 font-light">
                  {pairing}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Specs grid */}
        <motion.div {...scrollAnim()} className="border-t border-wine-200 pt-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-wine-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Type</p>
              <p className="font-medium text-gray-800">{product.category}</p>
            </div>
            <div className="border border-wine-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Country</p>
              <p className="font-medium text-gray-800">{product.country}</p>
            </div>
            <div className="border border-wine-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Volume</p>
              <p className="font-medium text-gray-800">{product.volume}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
