"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import type { CocktailWithIngredients } from "@/lib/types";

type ProductWithBrand = Prisma.ProductGetPayload<{ include: { brand: true } }>;

// Emil: strong ease-out — cubic-bezier(0.23, 1, 0.32, 1)
const EASE = [0.23, 1, 0.32, 1] as const;

// ─── Animation helpers ────────────────────────────────────────────────────────

// Left-panel text: clip-path reveal upward on page load, staggered
function loadClip(delayMs: number, reduce: boolean) {
  if (reduce)
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2, delay: delayMs / 1000 },
    };
  return {
    initial: { clipPath: "inset(0 0 100% 0)" },
    animate: { clipPath: "inset(0 0 0% 0)" },
    transition: { duration: 0.4, delay: delayMs / 1000, ease: EASE },
  };
}

// Right-panel sections: clip-path reveal upward on scroll
function scrollClip(reduce: boolean) {
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
    transition: { duration: 0.38, ease: EASE },
  };
}

// Cocktail rows: translateY(12px)→0, opacity 0→1, 50ms stagger on scroll
function rowAnim(i: number, reduce: boolean) {
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
    transition: { duration: 0.28, delay: i * 0.05, ease: EASE },
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Detail({
  product,
  cocktails,
}: {
  product: ProductWithBrand;
  cocktails: CocktailWithIngredients[];
}) {
  const reduce = useReducedMotion() ?? false;

  const botanicals =
    product.flavors
      ?.split(",")
      .map((f) => f.trim())
      .filter(Boolean) ?? [];

  // Specs live on the left panel only — not repeated on the right
  const specs = [
    product.volume,
    product.alcoholPercentage,
    product.category,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col lg:flex-row bg-[#0f0f0f]">
      {/* ── Left panel (45%) — sticky on desktop ────────────────── */}
      <aside className="relative lg:sticky lg:top-0 lg:self-start lg:w-[45%]">
        {/* Mobile: aspect-ratio height; Desktop: viewport height */}
        <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-screen">
          {/* Bottle: scale 0.97→1 on load, 400ms ease-out */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="object-contain"
              width={1200}
              height={1200}
              priority
            />
          </motion.div>

          {/* Gradient overlay — heavy at bottom for text legibility, light at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Bottom: brand → name only */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            {/* Brand label */}
            <motion.p
              {...loadClip(0, reduce)}
              className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#F5F0E8]/60 mb-2"
            >
              {product.brand.name}
            </motion.p>

            {/* Product name */}
            <motion.h1
              {...loadClip(80, reduce)}
              className="font-playfair italic text-[#F5F0E8] leading-[1.0]"
              style={{ fontSize: "clamp(26px, 3vw, 44px)" }}
            >
              {product.name}
            </motion.h1>
          </div>
        </div>
      </aside>

      {/* ── Right panel (55%) — natural scroll ──────────────────── */}
      <div className="lg:w-[55%] bg-[#FAF8F5] px-6 md:px-12 lg:px-14 xl:px-20 pt-12 lg:pt-24 pb-28">

        {/* ① Specs — ABV / Volume / Category as prominent stat blocks */}
        {specs.length > 0 && (
          <motion.div
            {...scrollClip(reduce)}
            className="flex items-stretch gap-0 mb-12 border border-[#E8E3DC]"
          >
            {specs.map((s, i) => {
              const labels = ["ABV", "Volume", "Category"];
              const label = labels[
                [product.alcoholPercentage, product.volume, product.category].indexOf(s)
              ] ?? "";
              return (
                <div
                  key={s}
                  className={`flex-1 flex flex-col items-center justify-center px-4 py-5 ${
                    i < specs.length - 1 ? "border-r border-[#E8E3DC]" : ""
                  }`}
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#9A8F84] mb-2">
                    {label}
                  </span>
                  <span
                    className="font-playfair italic text-[#1C1814] leading-none"
                    style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ② Opening description */}
        <motion.blockquote
          {...scrollClip(reduce)}
          className="font-playfair italic text-[#2C2420] leading-[1.75]"
          style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
        >
          {product.description}
        </motion.blockquote>

        {/* ② Flavour profile — only if botanicals exist */}
        {botanicals.length > 0 && (
          <>
            <div className="h-px bg-[#E8E3DC] mt-12 mb-10" />

            <div>
              <motion.p
                {...scrollClip(reduce)}
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B6158] mb-5"
              >
                Flavour Profile
              </motion.p>

              {/* Flowing inline text — first botanical in wine red, rest muted */}
              <motion.p
                {...scrollClip(reduce)}
                className="font-mono text-[13px] uppercase tracking-[0.1em] leading-[2.2] text-[#3D3530]"
              >
                {botanicals.map((b, i) => (
                  <Fragment key={b}>
                    <span style={i === 0 ? { color: "#8B1A1A" } : undefined}>
                      {b}
                    </span>
                    {i < botanicals.length - 1 && (
                      <span className="mx-2.5 text-[#C9C2B8]">·</span>
                    )}
                  </Fragment>
                ))}
              </motion.p>
            </div>
          </>
        )}

        {/* ③ Tasting notes — prose paragraph, not pills */}
        {product.grapeVarietal && (
          <>
            <div className="h-px bg-[#E8E3DC] mt-12 mb-10" />

            <div>
              <motion.p
                {...scrollClip(reduce)}
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B6158] mb-5"
              >
                Tasting Notes
              </motion.p>
              <motion.p
                {...scrollClip(reduce)}
                className="font-playfair italic text-[#1C1814] leading-[1.8]"
                style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}
              >
                {product.grapeVarietal}
              </motion.p>
            </div>
          </>
        )}

        {/* ④ Cocktails featuring this spirit */}
        {cocktails.length > 0 && (
          <>
            <div className="h-px bg-[#E8E3DC] mt-12 mb-10" />

            <div>
              <motion.p
                {...scrollClip(reduce)}
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B6158] mb-6"
              >
                Try it in
              </motion.p>
              <div>
                {cocktails.map((c, i) => (
                  <motion.div key={c.id} {...rowAnim(i, reduce)}>
                    <Link
                      href="/cocktails"
                      className="group flex items-center gap-4 py-4 border-b border-[#E8E3DC] last:border-0"
                    >
                      {/* Cocktail thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#1C1814]">
                        <Image
                          src={c.imageUrl}
                          fill
                          alt={c.title}
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      {/* Name + method */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-playfair italic text-[#1C1814] text-[15px] leading-snug
                                     transition-colors duration-200
                                     [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#7B0323]"
                        >
                          {c.title}
                        </p>
                        <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#9A8F84] mt-0.5">
                          {c.method}
                        </p>
                      </div>

                      {/* Arrow */}
                      <span
                        className="font-mono text-[10px] text-[#C9C2B8] flex-shrink-0
                                   transition-colors duration-200
                                   [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#7B0323]"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
