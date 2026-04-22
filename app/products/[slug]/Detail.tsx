"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import type { CocktailWithIngredients } from "@/lib/types";

type ProductWithBrand = Prisma.ProductGetPayload<{ include: { brand: true } }>;

// ── Tasting note parser ───────────────────────────────────────────────────────
// Expects "Nose: ... Palate: ... Finish: ..." — returns null if no structure found.
function parseTastingNotes(raw: string) {
  const noseIdx = raw.search(/Nose:/i);
  const palateIdx = raw.search(/Palate:/i);
  const finishIdx = raw.search(/Finish:/i);

  if (noseIdx === -1 && palateIdx === -1 && finishIdx === -1) return null;

  const slice = (start: number, labelLen: number, end: number) =>
    raw.slice(start + labelLen, end === -1 ? undefined : end).trim();

  const nose =
    noseIdx !== -1
      ? slice(noseIdx, "Nose:".length, palateIdx !== -1 ? palateIdx : finishIdx)
      : undefined;
  const palate =
    palateIdx !== -1
      ? slice(palateIdx, "Palate:".length, finishIdx)
      : undefined;
  const finish =
    finishIdx !== -1 ? slice(finishIdx, "Finish:".length, -1) : undefined;

  return { nose, palate, finish };
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────────────────

export function Detail({
  product,
  cocktails,
}: {
  product: ProductWithBrand;
  cocktails: CocktailWithIngredients[];
}) {
  const tasting = product.tastingNotes ? parseTastingNotes(product.tastingNotes) : null;
  const flavors = product.flavors?.split(",").map((f) => f.trim()).filter(Boolean) ?? [];
  const highlights = product.highlights ?? [];
  const pairings = product.pairings ?? [];
  const awards = product.awards ?? [];

  const specsInfo = [
    { label: "Region", value: product.region },
    { label: "Country", value: product.country ?? product.brand.country },
    { label: "Alcohol", value: product.alcoholPercentage },
    { label: "Volume", value: product.volume },
    { label: "Category", value: product.category },
  ].filter((s): s is { label: string; value: string } => !!s.value);

  const tastingReveal = useReveal();
  const detailsReveal = useReveal();
  const highlightsReveal = useReveal();
  const cocktailsReveal = useReveal();

  return (
    <div>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col lg:flex-row"
        style={{ backgroundColor: "#1C1814", minHeight: "100svh" }}
      >
        {/* Left — text */}
        <div className="flex flex-col justify-between lg:w-[52%] px-6 md:px-12 lg:px-16 pt-28 md:pt-36 pb-12 lg:pb-20 order-2 lg:order-1">
          {/* Eyebrow */}
          <div>
            <p
              className="font-mono uppercase tracking-[0.25em] text-[10px]"
              style={{ color: "#9A8F84", marginBottom: 32 }}
            >
              {product.brand.name}&nbsp;&nbsp;·&nbsp;&nbsp;{product.category}
            </p>

            <h1
              className="font-playfair italic"
              style={{
                fontSize: "clamp(40px, 5.5vw, 80px)",
                color: "#FAF8F5",
                lineHeight: 1.0,
                marginBottom: 24,
              }}
            >
              {product.name}
            </h1>

            <p
              className="font-mono leading-[1.9]"
              style={{ fontSize: 12, color: "#9A8F84", maxWidth: 420, marginBottom: 40 }}
            >
              {product.description}
            </p>
          </div>

          {/* Bottom spec row */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8" style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
            {specsInfo.slice(0, 4).map((s) => (
              <div key={s.label}>
                <p
                  className="font-mono uppercase text-[8px] tracking-[0.2em]"
                  style={{ color: "rgba(245,240,232,0.25)", marginBottom: 4 }}
                >
                  {s.label}
                </p>
                <p className="font-mono text-[12px]" style={{ color: "#FAF8F5" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — bottle */}
        <div
          className="relative lg:w-[48%] order-1 lg:order-2"
          style={{ minHeight: "55svh" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            style={{ padding: "48px 40px" }}
            priority
          />
          {/* Subtle gradient fade at bottom on mobile */}
          <div
            className="absolute bottom-0 left-0 right-0 lg:hidden pointer-events-none"
            style={{
              height: 80,
              background: "linear-gradient(to top, #1C1814, transparent)",
            }}
          />
        </div>
      </section>

      {/* ══ TASTING NOTES ═══════════════════════════════════════════════════════ */}
      {(product.tastingNotes || flavors.length > 0) && (
        <section
          ref={tastingReveal.ref}
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{
            backgroundColor: "#FAF8F5",
            opacity: tastingReveal.visible ? 1 : 0,
            transform: tastingReveal.visible ? "none" : "translateY(20px)",
            transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p
            className="font-mono uppercase text-[9px] tracking-[0.28em]"
            style={{ color: "#9A8F84", marginBottom: 40 }}
          >
            Tasting Notes
          </p>

          {/* Structured nose / palate / finish */}
          {tasting ? (
            <div className="grid md:grid-cols-3 gap-10 md:gap-14 mb-12">
              {[
                { label: "Nose", text: tasting.nose },
                { label: "Palate", text: tasting.palate },
                { label: "Finish", text: tasting.finish },
              ]
                .filter((n) => n.text)
                .map((n) => (
                  <div key={n.label}>
                    <p
                      className="font-mono uppercase text-[9px] tracking-[0.2em]"
                      style={{ color: "#7B0323", marginBottom: 12 }}
                    >
                      {n.label}
                    </p>
                    <p
                      className="font-playfair italic leading-[1.75]"
                      style={{ fontSize: 17, color: "#1C1814" }}
                    >
                      {n.text}
                    </p>
                  </div>
                ))}
            </div>
          ) : product.tastingNotes ? (
            <p
              className="font-playfair italic leading-[1.8] max-w-3xl mb-12"
              style={{ fontSize: 19, color: "#1C1814" }}
            >
              {product.tastingNotes}
            </p>
          ) : null}

          {/* Flavor tags */}
          {flavors.length > 0 && (
            <div>
              <p
                className="font-mono uppercase text-[8px] tracking-[0.22em]"
                style={{ color: "#C9C2B8", marginBottom: 12 }}
              >
                Flavour profile
              </p>
              <div className="flex flex-wrap gap-2">
                {flavors.map((f, i) => (
                  <span
                    key={f}
                    className="font-mono text-[10px] uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
                    style={{
                      backgroundColor: i === 0 ? "#7B0323" : "#EDE8E1",
                      color: i === 0 ? "#FAF8F5" : "#6B6259",
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ══ SPECIFICATIONS + SERVING + PAIRINGS ═════════════════════════════════ */}
      <section
        ref={detailsReveal.ref}
        className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
        style={{
          backgroundColor: "#1C1814",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          opacity: detailsReveal.visible ? 1 : 0,
          transform: detailsReveal.visible ? "none" : "translateY(20px)",
          transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">

          {/* Specs */}
          <div>
            <p
              className="font-mono uppercase text-[9px] tracking-[0.28em]"
              style={{ color: "rgba(245,240,232,0.3)", marginBottom: 24 }}
            >
              Specifications
            </p>
            <div>
              {specsInfo.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between py-3.5"
                  style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
                >
                  <span
                    className="font-mono uppercase text-[9px] tracking-[0.12em]"
                    style={{ color: "rgba(245,240,232,0.3)" }}
                  >
                    {s.label}
                  </span>
                  <span className="font-mono text-[11px]" style={{ color: "#FAF8F5" }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Serving suggestion */}
          {product.servingSuggestion && (
            <div>
              <p
                className="font-mono uppercase text-[9px] tracking-[0.28em]"
                style={{ color: "rgba(245,240,232,0.3)", marginBottom: 24 }}
              >
                How to Serve
              </p>
              <p
                className="font-playfair italic leading-[1.75]"
                style={{ fontSize: 16, color: "#FAF8F5" }}
              >
                {product.servingSuggestion}
              </p>
            </div>
          )}

          {/* Pairings */}
          {pairings.length > 0 && (
            <div>
              <p
                className="font-mono uppercase text-[9px] tracking-[0.28em]"
                style={{ color: "rgba(245,240,232,0.3)", marginBottom: 24 }}
              >
                Pairs With
              </p>
              <div className="flex flex-col gap-3">
                {pairings.map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-3"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)", paddingBottom: 10 }}
                  >
                    <span style={{ color: "#7B0323", fontSize: 12 }}>—</span>
                    <span className="font-mono text-[11px]" style={{ color: "rgba(245,240,232,0.6)" }}>
                      {p}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ HIGHLIGHTS ══════════════════════════════════════════════════════════ */}
      {highlights.length > 0 && (
        <section
          ref={highlightsReveal.ref}
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{
            backgroundColor: "#FAF8F5",
            borderTop: "0.5px solid #E8E3DC",
            opacity: highlightsReveal.visible ? 1 : 0,
            transform: highlightsReveal.visible ? "none" : "translateY(20px)",
            transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p
            className="font-mono uppercase text-[9px] tracking-[0.28em]"
            style={{ color: "#9A8F84", marginBottom: 32 }}
          >
            Highlights
          </p>

          <div>
            {highlights.map((h, i) => (
              <div
                key={i}
                className="grid gap-4 py-6"
                style={{
                  borderTop: "0.5px solid #E8E3DC",
                  gridTemplateColumns: "56px 1fr",
                }}
              >
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "#C9C2B8", paddingTop: 4 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className="font-playfair italic leading-[1.65]"
                  style={{ fontSize: 18, color: "#1C1814" }}
                >
                  {h}
                </p>
              </div>
            ))}
          </div>

          {/* Awards — appended at the bottom of this cream section */}
          {awards.length > 0 && (
            <div className="mt-16 pt-12" style={{ borderTop: "0.5px solid #E8E3DC" }}>
              <p
                className="font-mono uppercase text-[9px] tracking-[0.28em]"
                style={{ color: "#9A8F84", marginBottom: 20 }}
              >
                Awards &amp; Recognition
              </p>
              <div className="flex flex-col gap-0">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-3.5"
                    style={{ borderBottom: "0.5px solid #E8E3DC" }}
                  >
                    <span className="font-mono text-[9px] shrink-0 mt-0.5" style={{ color: "#7B0323" }}>
                      —
                    </span>
                    <span className="font-mono text-[11px] leading-[1.7]" style={{ color: "#6B6259" }}>
                      {award}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Awards standalone if no highlights */}
      {awards.length > 0 && highlights.length === 0 && (
        <section
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{ backgroundColor: "#FAF8F5", borderTop: "0.5px solid #E8E3DC" }}
        >
          <p
            className="font-mono uppercase text-[9px] tracking-[0.28em]"
            style={{ color: "#9A8F84", marginBottom: 20 }}
          >
            Awards &amp; Recognition
          </p>
          <div className="flex flex-col gap-0">
            {awards.map((award, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-3.5"
                style={{ borderBottom: "0.5px solid #E8E3DC" }}
              >
                <span className="font-mono text-[9px] shrink-0 mt-0.5" style={{ color: "#7B0323" }}>
                  —
                </span>
                <span className="font-mono text-[11px] leading-[1.7]" style={{ color: "#6B6259" }}>
                  {award}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══ COCKTAILS ═══════════════════════════════════════════════════════════ */}
      {cocktails.length > 0 && (
        <section
          ref={cocktailsReveal.ref}
          className="px-6 md:px-12 lg:px-16 py-20 md:py-28"
          style={{
            backgroundColor: "#1C1814",
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            opacity: cocktailsReveal.visible ? 1 : 0,
            transform: cocktailsReveal.visible ? "none" : "translateY(20px)",
            transition: "opacity 600ms ease-out, transform 600ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p
            className="font-mono uppercase text-[9px] tracking-[0.28em]"
            style={{ color: "rgba(245,240,232,0.3)", marginBottom: 40 }}
          >
            Make It Into
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {cocktails.map((c) => (
              <Link
                key={c.id}
                href={`/cocktails/${c.slug}`}
                className="group block"
                style={{ textDecoration: "none" }}
              >
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/5", backgroundColor: "#0f0f0f", marginBottom: 16 }}
                >
                  <Image
                    src={c.imageUrl}
                    alt={c.title}
                    fill
                    className="object-cover"
                    style={{
                      transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)" }}
                  />
                </div>

                {/* Info */}
                <p
                  className="font-playfair italic"
                  style={{
                    fontSize: 20,
                    color: "#FAF8F5",
                    marginBottom: 6,
                    transition: "color 200ms ease",
                  }}
                >
                  {c.title}
                </p>
                <p
                  className="font-mono uppercase text-[9px] tracking-[0.15em]"
                  style={{ color: "#9A8F84" }}
                >
                  {c.method}&nbsp;&nbsp;·&nbsp;&nbsp;{c.difficulty}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
