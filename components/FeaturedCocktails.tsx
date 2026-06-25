"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeaturedCocktailCard from "./FeaturedCocktailCard";
import type { CocktailWithIngredients } from "@/lib/types";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCocktails({
  cocktails,
}: {
  cocktails: CocktailWithIngredients[];
}) {
  const [activeId, setActiveId] = useState(cocktails[0]?.id);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".reveal-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 48, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const activeCocktail =
    cocktails.find((c) => c.id === activeId) ?? cocktails[0];

  if (!cocktails.length) return null;

  return (
    <section className="relative py-16 md:py-28 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-full px-5 sm:px-8 lg:px-12">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9A8F84] mb-6">
              Signature Cocktails
            </p>
            <h2
              ref={headingRef}
              className="font-playfair italic font-normal text-[#1C1814] leading-[1.15] overflow-hidden"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              <span className="reveal-word inline-block mr-[0.22em]">
                Crafted
              </span>
              <span className="reveal-word inline-block mr-[0.22em]">
                for
              </span>
              <span className="reveal-word inline-block">Nepal.</span>
            </h2>
          </div>

          <Link
            href="/cocktails"
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] text-[#8B1A1A] mt-8 md:mt-0 self-start md:self-auto"
          >
            <span>Explore all cocktails</span>
            <span>→</span>
          </Link>
        </div>

        {/* ── Mobile: tab row ───────────────────────────────────── */}
        <div
          className="lg:hidden overflow-x-auto -mx-5 px-5 mb-8"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-0 w-max" style={{ borderBottom: "0.5px solid #E8E3DC" }}>
            {cocktails.map((c, idx) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className="relative flex items-center gap-2 px-5 py-3 text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors duration-200 font-sans"
                  style={{ color: isActive ? "#1C1814" : "#9A8F84" }}
                >
                  <span
                    className="text-[9px] tracking-widest"
                    style={{ color: isActive ? "#7B0323" : "#C4B9B0" }}
                  >
                    0{idx + 1}
                  </span>
                  {c.title}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#7B0323]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: numbered list — desktop only */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="relative" style={{ borderLeft: "0.5px solid #E8E3DC" }}>
              {cocktails.map((c, idx) => {
                const isActive = c.id === activeId;
                return (
                  <div
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className="relative cursor-pointer group pl-8 py-6 transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-bar"
                        className="absolute left-0 top-0 bottom-0 w-px bg-[#7B0323]"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                      />
                    )}
                    <div className="flex items-baseline gap-5">
                      <span
                        className="text-[9px] tracking-[0.2em] font-sans shrink-0 transition-colors duration-200"
                        style={{ color: isActive ? "#7B0323" : "#C4B9B0" }}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className="font-playfair italic transition-colors duration-200"
                        style={{
                          fontSize: "clamp(18px, 2vw, 26px)",
                          color: isActive ? "#1C1814" : "#C4B9B0",
                        }}
                      >
                        {c.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: cocktail card */}
          <div className="lg:col-span-9 min-h-[480px] lg:min-h-[560px]">
            <AnimatePresence mode="wait">
              {activeCocktail && (
                <FeaturedCocktailCard key={activeCocktail.id} {...activeCocktail} />
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
