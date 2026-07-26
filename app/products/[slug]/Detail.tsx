"use client";

import { type ReactNode, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Prisma } from "@prisma/client";
import type { CocktailWithIngredients } from "@/lib/types";

// ─── Palette ─────────────────────────────────────────────────────────────────
const INK = "#1C1814"; // espresso
const CREAM = "#FAF8F5";
const WINE = "#8B1A1A";
const FAINT = "#9A8F84";
const LINE = "#E8E3DC";
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Types ───────────────────────────────────────────────────────────────────
type ProductWithBrand = Prisma.ProductGetPayload<{ include: { brand: true } }>;
type BrandMate = {
  slug: string;
  name: string;
  image: string;
  category: string;
};
type NavItem = { slug: string; name: string } | null;

// ─── Tasting-note parser ─────────────────────────────────────────────────────
// "Nose: … Palate: … Finish: …" → structured; otherwise returns null (prose).
function parseTastingNotes(raw: string) {
  const noseIdx = raw.search(/Nose:/i);
  const palateIdx = raw.search(/Palate:/i);
  const finishIdx = raw.search(/Finish:/i);
  if (noseIdx === -1 && palateIdx === -1 && finishIdx === -1) return null;

  const slice = (start: number, labelLen: number, end: number) =>
    raw.slice(start + labelLen, end === -1 ? undefined : end).trim();

  return {
    nose:
      noseIdx !== -1
        ? slice(noseIdx, 5, palateIdx !== -1 ? palateIdx : finishIdx)
        : undefined,
    palate: palateIdx !== -1 ? slice(palateIdx, 7, finishIdx) : undefined,
    finish: finishIdx !== -1 ? slice(finishIdx, 7, -1) : undefined,
  };
}

// ─── Gentle fade-in on scroll ────────────────────────────────────────────────
function Reveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, color }: { children: ReactNode; color: string }) {
  return (
    <p
      className="font-mono uppercase"
      style={{ fontSize: 9, letterSpacing: "0.26em", color }}
    >
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Detail({
  product,
  cocktails,
  brandMates,
  prev,
  next,
}: {
  product: ProductWithBrand;
  cocktails: CocktailWithIngredients[];
  brandMates: BrandMate[];
  prev: NavItem;
  next: NavItem;
}) {
  const reduce = useReducedMotion();

  const tasting = product.tastingNotes
    ? parseTastingNotes(product.tastingNotes)
    : null;
  const flavors =
    product.flavors
      ?.split(",")
      .map((f) => f.trim())
      .filter(Boolean) ?? [];
  const pairings = product.pairings ?? [];
  const country = product.country ?? product.brand.country;

  const specs = [
    { label: "Origin", value: country },
    { label: "Strength", value: product.alcoholPercentage },
    { label: "Volume", value: product.volume },
    { label: "Style", value: product.category },
  ].filter((s): s is { label: string; value: string } => !!s.value);

  return (
    <div style={{ background: CREAM }}>
      {/* ════════════════════════════════════════════════════════════════════
          HERO, bottle + everything essential, calm
      ════════════════════════════════════════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-16 pt-24 md:pt-28 pb-20 md:pb-28">
        <Link
          href="/products"
          className="font-mono uppercase transition-colors duration-200 [@media(hover:hover)]:hover:text-[#1C1814]"
          style={{ fontSize: 10, letterSpacing: "0.16em", color: FAINT }}
        >
          ← Collection
        </Link>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative order-1 lg:order-none mx-auto w-full"
            style={{ maxWidth: 460 }}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "3/4", maxHeight: "70svh" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Text */}
          <div className="order-2 lg:order-none">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <Eyebrow color={WINE}>
                {product.brand.name}&nbsp;&nbsp;·&nbsp;&nbsp;{product.category}
              </Eyebrow>
              <h1
                className="font-playfair italic mt-5"
                style={{
                  fontSize: "clamp(36px, 5vw, 68px)",
                  lineHeight: 1.02,
                  color: INK,
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h1>
              <p
                className="mt-7"
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: "#5C544B",
                  maxWidth: 480,
                }}
              >
                {product.description}
              </p>
            </motion.div>

            {/* Spec row — the only place specs live */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-5 pt-7"
              style={{ borderTop: `0.5px solid ${LINE}` }}
            >
              {specs.map((s) => (
                <div key={s.label}>
                  <Eyebrow color="#C2BAAF">{s.label}</Eyebrow>
                  <p
                    className="font-playfair italic mt-1.5"
                    style={{ fontSize: 18, color: INK }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TASTING NOTES + FLAVOUR
      ════════════════════════════════════════════════════════════════════ */}
      {(product.tastingNotes || flavors.length > 0) && (
        <section
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{ borderTop: `0.5px solid ${LINE}` }}
        >
          <Reveal>
            <Eyebrow color={FAINT}>Tasting Notes</Eyebrow>
          </Reveal>

          {tasting ? (
            <div className="mt-10 grid md:grid-cols-3 gap-10 md:gap-14 max-w-5xl">
              {[
                { label: "Nose", text: tasting.nose },
                { label: "Palate", text: tasting.palate },
                { label: "Finish", text: tasting.finish },
              ]
                .filter((n) => n.text)
                .map((n, i) => (
                  <Reveal key={n.label} delay={i * 0.08}>
                    <p
                      className="font-mono uppercase"
                      style={{ fontSize: 9, letterSpacing: "0.18em", color: WINE }}
                    >
                      {n.label}
                    </p>
                    <p
                      className="font-playfair italic mt-3"
                      style={{ fontSize: 18, lineHeight: 1.7, color: INK }}
                    >
                      {n.text}
                    </p>
                  </Reveal>
                ))}
            </div>
          ) : product.tastingNotes ? (
            <Reveal delay={0.05}>
              <p
                className="font-playfair italic mt-8"
                style={{
                  fontSize: "clamp(20px, 2.4vw, 30px)",
                  lineHeight: 1.6,
                  color: INK,
                  maxWidth: 880,
                }}
              >
                {product.tastingNotes}
              </p>
            </Reveal>
          ) : null}

          {flavors.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap gap-2.5">
                {flavors.map((f) => (
                  <span
                    key={f}
                    className="font-mono uppercase rounded-full"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      padding: "7px 16px",
                      color: "#5C544B",
                      border: `0.5px solid ${LINE}`,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          PAIRS WITH
      ════════════════════════════════════════════════════════════════════ */}
      {pairings.length > 0 && (
        <section
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{ borderTop: `0.5px solid ${LINE}` }}
        >
          <Reveal>
            <Eyebrow color={FAINT}>Pairs With</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-2 items-baseline">
              {pairings.map((p, i) => (
                <span key={p} className="font-playfair italic" style={{ color: INK }}>
                  <span style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}>{p}</span>
                  {i < pairings.length - 1 && (
                    <span style={{ color: WINE, margin: "0 0.5rem" }}>·</span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          FROM THE HOUSE, brand + more bottles
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
        style={{ borderTop: `0.5px solid ${LINE}` }}
      >
        <div className="grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-16">
          <Reveal>
            <div className="relative" style={{ width: 96, height: 96 }}>
              <Image
                src={product.brand.logo}
                alt={product.brand.name}
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <Eyebrow color={FAINT}>From the House of {product.brand.name}</Eyebrow>
            <p
              className="font-playfair italic mt-4"
              style={{
                fontSize: "clamp(20px, 2.4vw, 30px)",
                lineHeight: 1.5,
                color: INK,
                maxWidth: 720,
              }}
            >
              {product.brand.description}
            </p>
          </Reveal>
        </div>

        {brandMates.length > 0 && (
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {brandMates.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.06}>
                <Link href={`/products/${m.slug}`} className="group block">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "3/4", background: "#F0EBE3" }}
                  >
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-6 transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-105"
                    />
                  </div>
                  <p
                    className="font-playfair italic mt-4"
                    style={{ fontSize: 16, color: INK, lineHeight: 1.3 }}
                  >
                    {m.name}
                  </p>
                  <p
                    className="font-mono uppercase mt-1.5"
                    style={{ fontSize: 9, letterSpacing: "0.12em", color: FAINT }}
                  >
                    {m.category}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MAKE IT INTO, cocktails (dark)
      ════════════════════════════════════════════════════════════════════ */}
      {cocktails.length > 0 && (
        <section
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{ background: INK }}
        >
          <Reveal>
            <Eyebrow color={FAINT}>Make It Into</Eyebrow>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {cocktails.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.08}>
                <Link href={`/cocktails/${c.slug}`} className="group block">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "4/5", background: "#2A241F" }}
                  >
                    <Image
                      src={c.imageUrl}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105"
                    />
                  </div>
                  <p
                    className="font-playfair italic mt-5"
                    style={{ fontSize: 21, color: CREAM }}
                  >
                    {c.title}
                  </p>
                  <p
                    className="font-mono uppercase mt-2"
                    style={{ fontSize: 9, letterSpacing: "0.14em", color: FAINT }}
                  >
                    {c.method}&nbsp;&nbsp;·&nbsp;&nbsp;{c.difficulty}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          PREV / NEXT
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="grid sm:grid-cols-2"
        style={{ background: INK, borderTop: "0.5px solid rgba(255,255,255,0.08)" }}
      >
        {prev ? (
          <Link
            href={`/products/${prev.slug}`}
            className="group px-6 md:px-12 lg:px-16 py-14 md:py-16 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[#241f1a]"
            style={{ borderRight: "0.5px solid rgba(255,255,255,0.08)" }}
          >
            <p
              className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT }}
            >
              ← Previous
            </p>
            <p
              className="font-playfair italic mt-3 transition-transform duration-300 [@media(hover:hover)]:group-hover:-translate-x-1"
              style={{ fontSize: "clamp(20px, 2.6vw, 30px)", color: CREAM }}
            >
              {prev.name}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/products/${next.slug}`}
            className="group px-6 md:px-12 lg:px-16 py-14 md:py-16 text-right transition-colors duration-300 [@media(hover:hover)]:hover:bg-[#241f1a]"
          >
            <p
              className="font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.2em", color: FAINT }}
            >
              Next →
            </p>
            <p
              className="font-playfair italic mt-3 transition-transform duration-300 [@media(hover:hover)]:group-hover:translate-x-1"
              style={{ fontSize: "clamp(20px, 2.6vw, 30px)", color: CREAM }}
            >
              {next.name}
            </p>
          </Link>
        ) : (
          <span />
        )}
      </section>
    </div>
  );
}
