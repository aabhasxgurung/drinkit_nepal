"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { CocktailWithIngredients } from "@/lib/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FeaturedCocktailCard({
  title,
  description,
  ingredients,
  imageUrl,
  base,
  category,
  slug,
}: CocktailWithIngredients) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col lg:flex-row h-full w-full bg-white overflow-hidden rounded-xl"
      style={{ border: "0.5px solid #E8E3DC" }}
    >
      {/* ── IMAGE ──────────────────────────────────────────────── */}
      <div className="relative w-full lg:w-[48%] overflow-hidden bg-[#F0EBE4]" style={{ minHeight: 280 }}>
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.04, opacity: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 48vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>

        {/* Category + base labels — bottom left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute bottom-5 left-5 flex items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-sans">
            {category}
          </span>
          <span className="text-white/30 text-[8px]">·</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4A0A0] font-sans">
            {base}
          </span>
        </motion.div>
      </div>

      {/* ── CONTENT ────────────────────────────────────────────── */}
      <div className="flex flex-col justify-between flex-1 p-8 lg:p-10">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            className="font-playfair italic font-normal text-[#1C1814] leading-[1.15] mb-4"
            style={{ fontSize: "clamp(24px, 2.8vw, 36px)" }}
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="text-[13px] text-[#9A8F84] leading-relaxed mb-8"
            style={{ maxWidth: 360 }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#9A8F84] mb-4">
              Key Ingredients
            </p>
            <ul className="space-y-2.5">
              {ingredients.slice(0, 4).map((ing) => (
                <li key={ing.id} className="flex items-baseline gap-3">
                  <span className="text-[#7B0323]/40 text-[8px] shrink-0">◆</span>
                  <span className="text-[13px] text-[#1C1814] font-sans">
                    {ing.amount} {ing.name}
                  </span>
                </li>
              ))}
              {ingredients.length > 4 && (
                <li className="text-[12px] text-[#9A8F84] italic font-sans pl-5">
                  +{ingredients.length - 4} more
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.45 }}
          className="mt-8 pt-6"
          style={{ borderTop: "0.5px solid #E8E3DC" }}
        >
          <Link
            href={`/cocktails/${slug ?? ""}`}
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] text-[#8B1A1A]"
          >
            <span>View Recipe</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
