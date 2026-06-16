"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CatalogCard from "@/app/cocktails/components/CatalogCard";
import type { CatalogCocktail } from "@/app/cocktails/components/CatalogCard";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

type BartenderEvent = {
  name: string;
  type: string;
  venue: string;
};

type Bartender = {
  name: string;
  role: string;
  bio: string;
  quote: string;
  instagramHandle: string;
  photoUrl: string;
  events: BartenderEvent[];
};

export default function BartenderProfileClient({
  bartender,
  cocktails,
}: {
  bartender: Bartender;
  cocktails: CatalogCocktail[];
}) {
  const prefersReduced = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const quoteRef = useRef<HTMLElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-60px" });

  const heroReveal = (i: number): React.CSSProperties => {
    if (prefersReduced) return {};
    return {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(10px)",
      transition: `opacity 400ms ${EASE} ${i * 30}ms, transform 400ms ${EASE} ${i * 30}ms`,
    };
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Back */}
      <div
        className="px-6 md:px-10 py-5"
        style={{ borderBottom: "0.5px solid #E8E3DC" }}
      >
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#9A8F84] transition-colors [@media(hover:hover)]:hover:text-[#1C1814]"
        >
          ← Back
        </Link>
      </div>

      {/* ── Section 1: Hero split ─────────────────────────────────── */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: 360 }}>
        <div
          className="relative w-full md:w-[42%] aspect-[4/3] md:aspect-auto"
          style={{ backgroundColor: "#EDE8E1" }}
        >
          <Image
            src={bartender.photoUrl}
            alt={bartender.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 42vw"
            priority
          />
        </div>

        <div
          className="flex-1 flex flex-col justify-center px-6 py-10 md:px-9"
          style={{ borderLeft: "0.5px solid #E8E3DC" }}
        >
          <p
            style={heroReveal(0)}
            className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9A8F84] mb-3"
          >
            Brand Ambassador
          </p>
          <h1
            style={{
              ...heroReveal(1),
              fontSize: "clamp(32px, 4vw, 48px)",
            }}
            className="font-playfair italic text-[#1C1814] leading-tight"
          >
            {bartender.name}
          </h1>
          <p
            style={heroReveal(2)}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B1A1A] mt-2"
          >
            {bartender.role}
          </p>
          <p
            style={{ ...heroReveal(3), maxWidth: 384 }}
            className="font-playfair italic text-[14px] text-[#6B6259] leading-relaxed mt-4"
          >
            {bartender.bio}
          </p>
          <Link
            href={`https://instagram.com/${bartender.instagramHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            style={heroReveal(4)}
            className="font-mono text-[11px] text-[#9A8F84] mt-4 w-fit transition-colors [@media(hover:hover)]:hover:text-[#1C1814]"
          >
            @{bartender.instagramHandle}
          </Link>
        </div>
      </div>

      {/* ── Section 2: Big quote ──────────────────────────────────── */}
      <section
        ref={quoteRef}
        className="text-center bg-[#FAF8F5]"
        style={{
          borderTop: "0.5px solid #E8E3DC",
          borderBottom: "0.5px solid #E8E3DC",
          padding: "60px 40px",
          opacity: quoteInView ? 1 : 0,
          transform: quoteInView || prefersReduced ? "scale(1)" : "scale(0.98)",
          transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}`,
        }}
      >
        <p
          className="font-playfair italic text-[#6B6259] leading-relaxed max-w-2xl mx-auto"
          style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}
        >
          <span className="text-[#8B1A1A]">&ldquo;</span>
          {bartender.quote}
          <span className="text-[#8B1A1A]">&rdquo;</span>
        </p>
      </section>

      {/* ── Section 3: Cocktail collection ───────────────────────── */}
      {cocktails.length > 0 && (
        <section style={{ backgroundColor: "#FAF8F5", padding: "48px 40px" }}>
          <p className="font-mono uppercase tracking-[0.16em] text-[9px] text-[#9A8F84] mb-6">
            His Cocktail Collection
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 12 }}>
            {cocktails.map((c, i) => (
              <CatalogCard key={c.slug} cocktail={c} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── Section 4: Events & Takeovers ────────────────────────── */}
      {bartender.events.length > 0 && (
        <section
          style={{
            backgroundColor: "#FAF8F5",
            borderTop: "0.5px solid #E8E3DC",
            padding: "48px 40px",
          }}
        >
          <p className="font-mono uppercase tracking-[0.16em] text-[9px] text-[#9A8F84] mb-6">
            Events &amp; Takeovers
          </p>
          <ul>
            {bartender.events.map((ev) => (
              <li
                key={ev.name}
                className="flex items-center gap-4 py-3 border-b border-[#E8E3DC] last:border-b-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A] flex-shrink-0" />
                <span className="font-playfair italic text-[14px] text-[#1C1814] flex-1">
                  {ev.name}
                </span>
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#9A8F84] px-2 py-1 rounded-full"
                  style={{ border: "0.5px solid #E8E3DC" }}
                >
                  {ev.type}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
