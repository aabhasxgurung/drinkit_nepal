"use client";
import { Bottle } from "@/constants/product";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface BottleDetailProps {
  bottle: Bottle;
}

export function Detail({ bottle }: BottleDetailProps) {
  if (!bottle) {
    return (
      <div className="text-center text-2xl text-amber-600">Wine not found</div>
    );
  }

  const {
    name,
    description,
    img,
    volume,
    category,
    country,
    flavors,
    pairings,
    highlights,
    grapeVarietal,
    alcoholPercentage,
  } = bottle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative mt-10">
      {/* Wine Title */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-10 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-light tracking-wider text-wine mb-4 font-serif">
          {name}
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-center font-light">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Wine Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex justify-center my-12"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <img
            src={img}
            alt={name}
            className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
          />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto border-t border-wine-200 pt-10"
      >
        {/* Left Column */}
        <motion.div variants={fadeIn} className="space-y-6">
          {grapeVarietal && (
            <>
              <h3 className="text-xl font-light text-wine-700 mb-4">
                Grape Varietal
              </h3>
              <p className="text-gray-700 font-light">{grapeVarietal}</p>
            </>
          )}

          {/* Alcohol Percentage */}
          {alcoholPercentage && (
            <>
              <h3 className="text-xl font-light text-wine-700 mb-4">
                Alcohol Percentage
              </h3>
              <p className="text-gray-700 font-light">{alcoholPercentage}</p>
            </>
          )}

          {/* Suggested Pairing */}
          {pairings && pairings.length > 0 && (
            <>
              <h3 className="text-xl font-light text-wine-700 mb-4 mt-8">
                Suggested Pairing
              </h3>
              <ul className="space-y-2">
                {pairings.map((pairing, index) => (
                  <li key={index} className="text-gray-700 font-light">
                    {pairing}
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeIn} className="space-y-6">
          {flavors && (
            <>
              <h3 className="text-xl font-light text-wine-700 mb-4">
                Flavours
              </h3>
              <p className="text-gray-700 font-light">{flavors}</p>
            </>
          )}
          {highlights && (
            <>
              <h3 className="text-xl font-light text-wine-700 mb-4 mt-8">
                {category} Highlights
              </h3>
              <ul className="space-y-2">
                {highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700 font-light">
                    {highlight}
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>

        {/* Additional Details */}
        <motion.div variants={fadeIn} className="md:col-span-2 mt-6">
          <div className="grid grid-cols-3 gap-4 border-t border-wine-200 pt-6">
            <div className="border border-wine-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Type</p>
              <p className="font-medium text-gray-800">{category}</p>
            </div>
            <div className="border border-wine-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Country</p>
              <p className="font-medium text-gray-800">{country}</p>
            </div>
            <div className="border border-wine-100 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Volume</p>
              <p className="font-medium text-gray-800">{volume}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
