"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CocktailWithIngredients } from "@/lib/types";
import CatalogCard from "./CatalogCard";

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
                <CatalogCard key={c.id} cocktail={c} index={i} />
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
    </div>
  );
}
