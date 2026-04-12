"use client";
import { motion } from "framer-motion";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;
import { Droplet, GlassWater, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { CocktailWithIngredients } from "@/lib/types";

export default function FeaturedCocktailCard({
  title,
  description,
  ingredients,
  imageUrl,
  base,
  category,
}: CocktailWithIngredients) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.5, ease: EASE_SMOOTH }}
      className="flex flex-col lg:flex-row h-full w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100/50"
    >
      {/* ─── MOBILE LAYOUT (< lg) ─── */}
      <div className="lg:hidden flex flex-col w-full">
        {/* Image with gradient overlay + title */}
        <div className="relative h-[280px] overflow-hidden flex-shrink-0">
          <motion.div
            initial={{ scale: 1.12, filter: "blur(4px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            className="w-full h-full relative"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          </motion.div>

          {/* Overlaid badges + title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 p-6"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[10px] font-bold text-white tracking-[0.15em] uppercase">
                {category}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#7B0323]/70 backdrop-blur-sm text-[10px] font-bold text-white tracking-[0.15em] uppercase flex items-center gap-1.5">
                <Droplet className="w-2.5 h-2.5" />
                {base}
              </span>
            </div>
            <h3 className="text-2xl font-serif text-white leading-tight tracking-tight">
              {title}
            </h3>
          </motion.div>
        </div>

        {/* Content below image */}
        <div className="flex flex-col flex-1 p-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <h4 className="text-[11px] font-bold text-gray-900 mb-3 uppercase tracking-wider flex items-center gap-2">
              <GlassWater className="w-3.5 h-3.5 text-[#7B0323]" />
              Key Ingredients
            </h4>
            <ul className="space-y-2">
              {ingredients.slice(0, 3).map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <span className="text-[#7B0323]/50 mr-3 text-[10px]">◆</span>
                  {ingredient.amount} {ingredient.name}
                </li>
              ))}
              {ingredients.length > 3 && (
                <li className="text-xs text-gray-400 italic pl-5 pt-1">
                  +{ingredients.length - 3} more ingredients
                </li>
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="mt-5 pt-5 border-t border-gray-100"
          >
            <button className="group flex items-center gap-3 text-[11px] font-bold text-gray-900 hover:text-[#7B0323] uppercase tracking-[0.2em] transition-colors">
              View Full Recipe
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#7B0323] group-hover:bg-[#7B0323] transition-all duration-300">
                <ArrowRight className="w-3.5 h-3.5 group-hover:text-white transition-colors duration-300 group-hover:translate-x-0.5" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (lg+) ─── */}
      {/* Content Section */}
      <div className="hidden lg:flex w-[50%] p-14 flex-col justify-between z-10 bg-white">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100/80 text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase">
              {category}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#7B0323]/5 border border-[#7B0323]/10 text-[11px] font-bold text-[#7B0323] tracking-[0.15em] uppercase flex items-center gap-1.5">
              <Droplet className="w-3 h-3" />
              {base}
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[2.75rem] font-serif text-gray-900 mb-6 leading-[1.1] tracking-tight"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600/90 text-[1.1rem] font-sans leading-relaxed mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h4 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wide flex items-center gap-2">
              <GlassWater className="w-4 h-4 text-[#7B0323]" />
              Key Ingredients
            </h4>
            <ul className="space-y-3">
              {ingredients.slice(0, 4).map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-start text-gray-600 group cursor-default"
                >
                  <span className="text-[#7B0323]/40 group-hover:text-[#7B0323] transition-colors duration-300 mr-4 mt-[0.3rem] text-xs">
                    ◆
                  </span>
                  <span className="font-sans text-[15px]">
                    {ingredient.amount} {ingredient.name}
                  </span>
                </li>
              ))}
              {ingredients.length > 4 && (
                <li className="text-sm text-gray-400 italic font-sans pl-7 pt-2">
                  + more ingredients
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 pt-6 border-t border-gray-100"
        >
          <button className="group flex items-center gap-4 text-xs font-bold text-gray-900 hover:text-[#7B0323] uppercase tracking-[0.2em] transition-colors">
            View Full Recipe
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#7B0323] group-hover:bg-[#7B0323] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,3,35,0.2)]">
              <ArrowRight className="w-4 h-4 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Image Section — desktop only */}
      <div className="hidden lg:block w-[50%] relative overflow-hidden bg-gray-100">
        <motion.div
          initial={{ scale: 1.15, filter: "blur(4px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 bg-[#7B0323]/5 mix-blend-overlay z-10" />
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/5 z-0" />
        </motion.div>
      </div>
    </motion.div>
  );
}
