"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import type { CocktailWithIngredients } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uniq(arr: string[]) {
  return Array.from(new Set(arr)).sort();
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-200 ${
        active
          ? "bg-[#1C1814] text-[#FAF8F5]"
          : "border border-[#C9C2B8] text-[#5C5248] hover:border-[#1C1814] hover:text-[#1C1814]"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Catalog Card ─────────────────────────────────────────────────────────────

function CatalogCard({
  cocktail,
  index,
  onClick,
}: {
  cocktail: CocktailWithIngredients;
  index: number;
  onClick: () => void;
}) {
  const num = String(index + 1).padStart(2, "0");

  const diffColor: Record<string, string> = {
    Easy: "#69B578",
    Medium: "#D4A843",
    Advanced: "#7B0323",
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#1C1814]"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* Image */}
      <Image
        src={cocktail.imageUrl}
        fill
        alt={cocktail.title}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Permanent gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />

      {/* Hover darkening */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ── Top row ── */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
        <span className="font-mono text-[10px] text-white/40">{num}</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55 bg-black/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {cocktail.category}
        </span>
      </div>

      {/* ── Bottom content ── */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Meta */}
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

        {/* Name */}
        <h3
          className="font-playfair italic text-white leading-[1.05] mb-4"
          style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
        >
          {cocktail.title}
        </h3>

        {/* Hover reveal */}
        <div className="h-[14px] overflow-hidden">
          <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-center gap-2">
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

// ─── Recipe Drawer ────────────────────────────────────────────────────────────

function RecipeDrawer({
  cocktail,
  onClose,
}: {
  cocktail: CocktailWithIngredients | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {cocktail && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            data-lenis-prevent
            className="fixed top-0 right-0 h-full w-full md:w-[460px] bg-[#FAF8F5] z-50 flex flex-col overflow-y-auto shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close recipe"
              className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#1C1814]/10 hover:bg-[#1C1814]/20 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[#1C1814]" />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/3] flex-shrink-0 bg-[#F0EBE3]">
              <Image
                src={cocktail.imageUrl}
                fill
                alt={cocktail.title}
                className="object-cover"
                sizes="460px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="px-8 pt-2 pb-16">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-[#1C1814] text-[#FAF8F5] px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-[0.15em]">
                  {cocktail.base}
                </span>
                <span className="border border-[#E8E3DC] text-[#9A8F84] px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-[0.15em]">
                  {cocktail.difficulty}
                </span>
                <span className="border border-[#E8E3DC] text-[#9A8F84] px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-[0.15em]">
                  {cocktail.category}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-playfair italic text-[#1C1814] leading-[1.05] mb-5"
                style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}
              >
                {cocktail.title}
              </h2>

              {/* Description */}
              <p className="font-mono text-[11px] text-[#9A8F84] leading-[1.85] mb-8">
                {cocktail.description}
              </p>

              <div className="h-px bg-[#E8E3DC] mb-8" />

              {/* Ingredients */}
              <div className="mb-8">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#9A8F84] mb-5">
                  Ingredients
                </p>
                <ul className="space-y-3">
                  {cocktail.ingredients.map((ing) => (
                    <li
                      key={ing.id}
                      className="flex justify-between items-baseline border-b border-[#F0EBE3] pb-3 last:border-0"
                    >
                      <span className="font-playfair italic text-[#1C1814] text-[15px]">
                        {ing.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#9A8F84] ml-4 flex-shrink-0">
                        {ing.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-[#E8E3DC] mb-8" />

              {/* Method */}
              <div className="mb-8">
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#9A8F84] mb-4">
                  Method
                </p>
                <p className="font-mono text-[12px] text-[#1C1814] leading-[1.9]">
                  {cocktail.method}
                </p>
              </div>

              {/* Garnish */}
              {cocktail.garnish && (
                <>
                  <div className="h-px bg-[#E8E3DC] mb-8" />
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#9A8F84] mb-3">
                      Garnish
                    </p>
                    <p className="font-playfair italic text-[#1C1814] text-[16px]">
                      {cocktail.garnish}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Hero animation variants ──────────────────────────────────────────────────

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const heroLine = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Main page component ──────────────────────────────────────────────────────

export default function Cocktails({
  cocktails,
}: {
  cocktails: CocktailWithIngredients[];
}) {
  const [activeBase, setActiveBase] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<CocktailWithIngredients | null>(
    null,
  );

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (selected) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [selected, lenis]);

  const bases = useMemo(
    () => ["All", ...uniq(cocktails.map((c) => c.base))],
    [cocktails],
  );
  const categories = useMemo(
    () => ["All", ...uniq(cocktails.map((c) => c.category))],
    [cocktails],
  );
  const difficulties = ["All", "Easy", "Medium", "Advanced"];

  const filtered = useMemo(
    () =>
      cocktails.filter((c) => {
        const okBase = activeBase === "All" || c.base === activeBase;
        const okDiff =
          activeDifficulty === "All" || c.difficulty === activeDifficulty;
        const okCat = activeCategory === "All" || c.category === activeCategory;
        return okBase && okDiff && okCat;
      }),
    [cocktails, activeBase, activeDifficulty, activeCategory],
  );

  return (
    <div className="bg-[#FAF8F5]">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#1C1814] h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-[96px] md:pt-[128px] pb-14">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.p
            variants={heroLine}
            className="font-mono uppercase tracking-[0.22em] text-[9px] text-[#9A8F84] mb-10 md:mb-14"
          >
            The Bartender&apos;s Selection&nbsp;&nbsp;·&nbsp;&nbsp;
            {cocktails.length} Recipes
          </motion.p>

          <h1
            className="font-playfair italic text-[#FAF8F5] leading-[0.88] pb-3"
            style={{ fontSize: "clamp(70px, 11vw, 182px)" }}
          >
            <motion.span variants={heroLine} className="block">
              Curated
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[12%] md:pl-[16%]"
              style={{ color: "#7B0323" }}
            >
              cocktail
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[5%] md:pl-[8%]"
            >
              catalog.
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="font-mono text-[10px] text-[#9A8F84] mt-12 max-w-[260px] leading-[1.9] uppercase tracking-wider"
        >
          Crafted with the world&apos;s finest spirits — available at your
          favourite Kathmandu bar.
        </motion.p>
      </section>

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <div className="top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E8E3DC]">
        <div className="px-6 md:px-12 lg:px-16 py-4 flex flex-col gap-2.5">
          {/* Base */}
          <div className="flex items-center gap-12">
            <span className="font-mono text-sm uppercase tracking-[0.22em] text-[#9A8F84] w-10 flex-shrink-0">
              Base
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {bases.map((b) => (
                <Pill
                  key={b}
                  label={b}
                  active={activeBase === b}
                  onClick={() => setActiveBase(b)}
                />
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-12">
            <span className="font-mono text-sm uppercase tracking-[0.22em] text-[#9A8F84] w-10 flex-shrink-0">
              Level
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {difficulties.map((d) => (
                <Pill
                  key={d}
                  label={d}
                  active={activeDifficulty === d}
                  onClick={() => setActiveDifficulty(d)}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-12">
            <span className="font-mono text-sm uppercase tracking-[0.22em] text-[#9A8F84] w-10 flex-shrink-0">
              Style
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => (
                <Pill
                  key={c}
                  label={c}
                  active={activeCategory === c}
                  onClick={() => setActiveCategory(c)}
                />
              ))}
            </div>
          </div>

          {/* Live count */}
          <p className="font-mono text-[8px] text-[#9A8F84] uppercase tracking-[0.18em]">
            {filtered.length === cocktails.length
              ? `All ${cocktails.length} recipes`
              : `${filtered.length} of ${cocktails.length} recipes`}
          </p>
        </div>
      </div>

      {/* ── Catalog grid ────────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
            >
              {filtered.map((c, i) => (
                <CatalogCard
                  key={c.id}
                  cocktail={c}
                  index={i}
                  onClick={() => setSelected(c)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <p
                className="font-playfair italic text-[#9A8F84] mb-3"
                style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
              >
                No cocktails match.
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#C5BDB5]">
                Try adjusting the filters above
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Recipe drawer ────────────────────────────────────────── */}
      <RecipeDrawer cocktail={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
