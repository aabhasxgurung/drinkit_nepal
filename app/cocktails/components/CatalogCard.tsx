"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type CatalogCocktail = {
  slug: string;
  title: string;
  imageUrl: string;
  base: string;
  category: string;
  difficulty: string;
};

const diffColor: Record<string, string> = {
  Easy: "#69B578",
  Medium: "#D4A843",
  Advanced: "#7B0323",
};

export default function CatalogCard({
  cocktail,
  index,
}: {
  cocktail: CatalogCocktail;
  index: number;
}) {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      onClick={() => router.push(`/cocktails/${cocktail.slug}`)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#1C1814]"
      style={{ aspectRatio: "3 / 4" }}
    >
      <motion.div
        layoutId={
          shouldReduceMotion ? undefined : `cocktail-image-${cocktail.slug}`
        }
        className="absolute inset-0"
      >
        <Image
          src={cocktail.imageUrl}
          fill
          alt={cocktail.title}
          className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
      <div className="absolute inset-0 bg-black/20 opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <span className="font-mono text-[10px] text-white/40">{num}</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {cocktail.category}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/80">
            {cocktail.base}
          </span>
          <span className="text-white/45">·</span>
          <span
            className="font-mono text-[8px] uppercase tracking-[0.14em]"
            style={{ color: diffColor[cocktail.difficulty] ?? "#9A8F84" }}
          >
            {cocktail.difficulty}
          </span>
        </div>

        <motion.h3
          layoutId={
            shouldReduceMotion ? undefined : `cocktail-title-${cocktail.slug}`
          }
          className="font-playfair italic text-white leading-[1.05] mb-4"
          style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
        >
          {cocktail.title}
        </motion.h3>

        <div className="h-[14px] overflow-hidden">
          <div className="opacity-0 [@media(hover:hover)]:group-hover:opacity-100 translate-y-full [@media(hover:hover)]:group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/55">
              View Recipe
            </span>
            <span className="text-white/35 text-[10px]">→</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
