"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Ingredient = {
  id: number;
  name: string;
  amount: string;
  productSlug: string | null;
  productName: string | null;
};

type Cocktail = {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  category: string;
  base: string;
  method: string;
  garnish: string | null;
  ingredients: Ingredient[];
};

type RelatedCocktail = {
  slug: string;
  title: string;
  imageUrl: string;
  base: string;
};

type NavCocktail = { slug: string; title: string } | null;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function trunc(s: string, n = 20) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

const EASE = [0.23, 1, 0.32, 1] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function CocktailDetailClient({
  cocktail,
  related,
  prev,
  next,
}: {
  cocktail: Cocktail;
  related: RelatedCocktail[];
  prev: NavCocktail;
  next: NavCocktail;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Ingredient rows trigger when the list enters the viewport
  const ingrRef = useRef<HTMLUListElement>(null);
  const isIngrInView = useInView(ingrRef, { once: true, margin: "-50px" });

  // Stagger-in variants for the top right-panel items (load animation)
  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: EASE,
        delay: i * 0.03,
      },
    }),
  };

  // Ingredient row variants — triggered by IntersectionObserver
  const rowVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: EASE,
        delay: i * 0.04,
      },
    }),
  };

  return (
    <div className="bg-[#FAF8F5] md:flex mt-20">
      {/* ══ LEFT PANEL — sticky image ══════════════════════════════════════════ */}
      <div
        className="md:w-[46%] md:flex-shrink-0 md:flex md:flex-col md:justify-between px-7 py-10"
        style={{ borderRight: "0.5px solid #E8E3DC" }}
      >
        {/* Image frame */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full overflow-hidden aspect-[3/4] md:aspect-[4/5]"
        >
          <Image
            src={cocktail.imageUrl}
            alt={cocktail.title}
            fill
            className="object-contain"
            sizes="46vw"
            priority
          />
        </motion.div>

        {/* Prev / Next — desktop only */}
        <div
          className="hidden md:flex justify-between pt-4"
          style={{ borderTop: "0.5px solid #E8E3DC" }}
        >
          {prev ? (
            <Link
              href={`/cocktails/${prev.slug}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9A8F84] transition-colors duration-200 [@media(hover:hover)]:hover:text-[#1C1814]"
            >
              ← {trunc(prev.title)}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/cocktails/${next.slug}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9A8F84] transition-colors duration-200 [@media(hover:hover)]:hover:text-[#1C1814]"
            >
              {trunc(next.title)} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

      {/* ══ RIGHT PANEL — scrollable content ══════════════════════════════════ */}
      <div
        className="md:flex-1 flex flex-col px-5 py-6 md:px-9 md:py-10"
        style={{ gap: 20, overflowY: "auto" }}
      >
        {/* 1. Back link */}
        <motion.div
          custom={0}
          variants={reveal}
          initial="hidden"
          animate="visible"
        >
          <Link
            href="/cocktails"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9A8F84] transition-colors duration-200 [@media(hover:hover)]:hover:text-[#1C1814]"
          >
            ← All Cocktails
          </Link>
        </motion.div>

        {/* 2. Tags */}
        <motion.div
          custom={1}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2"
        >
          <span
            className="font-mono text-[9px] uppercase tracking-[0.1em] px-3 py-1 rounded-full"
            style={{ border: "0.5px solid #8B1A1A", color: "#8B1A1A" }}
          >
            {cocktail.base}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.1em] px-3 py-1 rounded-full"
            style={{ border: "0.5px solid #DDD8D0", color: "#6B6259" }}
          >
            {cocktail.difficulty}
          </span>
          <span
            className="font-mono text-[9px] uppercase tracking-[0.1em] px-3 py-1 rounded-full"
            style={{ border: "0.5px solid #DDD8D0", color: "#6B6259" }}
          >
            {cocktail.category}
          </span>
        </motion.div>

        {/* 3. Title */}
        <motion.h1
          custom={2}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="font-playfair italic text-[#1C1814] leading-[1.05]"
          style={{ fontSize: "clamp(32px, 3.5vw, 44px)" }}
        >
          {cocktail.title}
        </motion.h1>

        {/* 4. Description */}
        <motion.p
          custom={3}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="font-playfair italic leading-relaxed"
          style={{ fontSize: 13, color: "#6B6259" }}
        >
          {cocktail.description}
        </motion.p>

        {/* 5. Rule */}
        <motion.div
          custom={4}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="border-t border-[#E8E3DC]"
        />

        {/* 6. Ingredients */}
        <div>
          <p
            className="font-mono uppercase tracking-[0.16em] text-[9px] mb-3"
            style={{ color: "#9A8F84" }}
          >
            Ingredients
          </p>

          <motion.ul
            ref={ingrRef}
            initial="hidden"
            animate={isIngrInView ? "visible" : "hidden"}
          >
            {cocktail.ingredients.map((ing, i) => (
              <motion.li
                key={ing.id}
                custom={i}
                variants={rowVariant}
                className="flex justify-between items-baseline py-[10px] border-b border-[#E8E3DC] last:border-b-0"
              >
                {ing.productSlug ? (
                  <Link
                    href={`/products/${ing.productSlug}`}
                    className="font-playfair italic transition-colors duration-150 [@media(hover:hover)]:hover:underline"
                    style={{ fontSize: 14, color: "#8B1A1A" }}
                  >
                    {ing.name}
                  </Link>
                ) : (
                  <span
                    className="font-playfair italic"
                    style={{ fontSize: 14, color: "#1C1814" }}
                  >
                    {ing.name}
                  </span>
                )}
                <span
                  className="font-mono text-[10px] ml-4 flex-shrink-0"
                  style={{ color: "#9A8F84" }}
                >
                  {ing.amount}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* 7. Rule */}
        <div className="border-t border-[#E8E3DC]" />

        {/* 8. Method */}
        <div>
          <p
            className="font-mono uppercase tracking-[0.16em] text-[9px] mb-2"
            style={{ color: "#9A8F84" }}
          >
            Method
          </p>
          <p
            className="leading-relaxed"
            style={{ fontSize: 13, color: "#6B6259" }}
          >
            {cocktail.method}
          </p>
        </div>

        {/* 9. Garnish */}
        {cocktail.garnish && (
          <div>
            <p
              className="font-mono uppercase tracking-[0.16em] text-[9px] mb-2"
              style={{ color: "#9A8F84" }}
            >
              Garnish
            </p>
            <p
              className="leading-relaxed"
              style={{ fontSize: 13, color: "#6B6259" }}
            >
              {cocktail.garnish}
            </p>
          </div>
        )}

        {/* 10. Rule + Related */}
        {related.length > 0 && (
          <>
            <div className="border-t border-[#E8E3DC]" />

            <div>
              <p
                className="font-mono uppercase tracking-[0.16em] text-[9px] mb-4"
                style={{ color: "#9A8F84" }}
              >
                More with {cocktail.base}
              </p>

              <ul className="list-none">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/cocktails/${r.slug}`}
                    className="group flex items-center gap-4 py-4 border-b border-[#E8E3DC] last:border-b-0"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={r.imageUrl}
                        alt={r.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span
                      className="font-playfair italic text-[15px] text-[#1C1814] group-hover:text-[#8B1A1A] transition-colors"
                    >
                      {r.title}
                    </span>
                    <span className="font-mono text-[9px] text-[#9A8F84] uppercase tracking-[0.1em] ml-auto">
                      {r.base}
                    </span>
                    <span className="font-mono text-[11px] text-[#9A8F84] transition-transform [@media(hover:hover)]:group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Mobile prev/next — bottom of right panel */}
        <div
          className="md:hidden flex justify-between pt-4 mt-4"
          style={{ borderTop: "0.5px solid #E8E3DC" }}
        >
          {prev ? (
            <Link
              href={`/cocktails/${prev.slug}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9A8F84]"
            >
              ← {trunc(prev.title)}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/cocktails/${next.slug}`}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9A8F84]"
            >
              {trunc(next.title)} →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
