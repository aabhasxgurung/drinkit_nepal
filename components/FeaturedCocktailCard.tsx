"use client";
import { motion } from "framer-motion";
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col lg:flex-row h-full w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100/50"
    >
      {/* Content Section */}
      <div className="w-full lg:w-[50%] p-10 lg:p-14 flex flex-col justify-between z-10 bg-white order-2 lg:order-1">
        <div>
          {/* Badges */}
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
            className="text-4xl lg:text-[2.75rem] font-serif text-gray-900 mb-6 leading-[1.1] tracking-tight"
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
          className="mt-12 lg:mt-8 pt-6 border-t border-gray-100"
        >
          <button className="group flex items-center gap-4 text-xs font-bold text-gray-900 hover:text-[#7B0323] uppercase tracking-[0.2em] transition-colors">
            View Full Recipe
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#7B0323] group-hover:bg-[#7B0323] transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(123,3,35,0.2)] hover:scale-105">
              <ArrowRight className="w-4 h-4 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[50%] relative h-[350px] lg:h-auto overflow-hidden bg-gray-100 order-1 lg:order-2">
        <motion.div
          initial={{ scale: 1.15, filter: "blur(4px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 bg-[#7B0323]/5 mix-blend-overlay z-10" />
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/5 z-0" />
        </motion.div>
      </div>
    </motion.div>
  );
}
