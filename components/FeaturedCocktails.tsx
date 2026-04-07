"use client";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeaturedCocktailCard from "./FeaturedCocktailCard";
import type { CocktailWithIngredients } from "@/lib/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturedCocktails({
  cocktails,
}: {
  cocktails: CocktailWithIngredients[];
}) {
  const [activeCocktailId, setActiveCocktailId] = useState(cocktails[0]?.id);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = headingRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>(".reveal-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 65, skewY: 4 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  const activeCocktail =
    cocktails.find((c) => c.id === activeCocktailId) ?? cocktails[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!cocktails.length) return null;

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#FAFAFA]">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#7B0323]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7B0323]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24"
            variants={itemVariants}
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-[#7B0323]"></div>
                <Sparkles className="h-4 w-4 text-[#7B0323]" />
                <span className="text-sm font-semibold text-[#7B0323] uppercase tracking-[0.2em]">
                  Signature Selection
                </span>
              </div>
              <h2
                ref={headingRef}
                className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-[1.1] tracking-tight overflow-hidden"
              >
                <span className="reveal-word inline-block mr-[0.25em]" style={{ willChange: "transform, opacity" }}>
                  Curated
                </span>
                <br />
                <span className="reveal-word inline-block italic font-light text-gray-500" style={{ willChange: "transform, opacity" }}>
                  Masterpieces
                </span>
              </h2>
              <p className="text-gray-600 max-w-lg font-sans text-lg md:text-xl leading-relaxed">
                Discover our carefully curated selection of premium cocktails,
                crafted with precision, passion, and a touch of the Himalayas.
              </p>
            </div>

            <Link
              href="/cocktails"
              className="group inline-flex items-center justify-center mt-10 md:mt-0 pb-2 border-b-2 border-transparent hover:border-[#7B0323] transition-all duration-300"
            >
              <span className="text-lg font-medium text-gray-900 group-hover:text-[#7B0323] transition-colors">
                Explore entire menu
              </span>
              <ArrowRight className="ml-3 h-5 w-5 text-gray-900 group-hover:text-[#7B0323] transition-all duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>

          {/* Interactive Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[600px]">
            {/* Left: Interactive List */}
            <motion.div
              className="lg:col-span-4 flex flex-col justify-center space-y-2 relative"
              variants={containerVariants}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200" />

              {cocktails.map((cocktail, idx) => {
                const isActive = cocktail.id === activeCocktailId;
                return (
                  <motion.div
                    key={cocktail.id}
                    variants={itemVariants}
                    className="relative cursor-pointer group py-6 pl-8 md:pl-12"
                    onClick={() => setActiveCocktailId(cocktail.id)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-[0px] top-0 bottom-0 w-[2px] bg-[#7B0323] z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span
                          className={`text-sm tracking-widest font-medium transition-colors duration-300 ${
                            isActive ? "text-[#7B0323]" : "text-gray-400"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <h3
                          className={`text-3xl md:text-4xl font-serif transition-colors duration-300 ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        >
                          {cocktail.title}
                        </h3>
                      </div>

                      {idx === 0 && (
                        <div
                          className={`transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="hidden md:flex items-center gap-1.5 bg-[#7B0323]/10 px-3 py-1.5 rounded-full">
                            <TrendingUp className="h-3.5 w-3.5 text-[#7B0323]" />
                            <span className="text-xs font-semibold text-[#7B0323] tracking-wider uppercase">
                              Hot
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right: Dynamic Card */}
            <motion.div
              className="lg:col-span-8 h-full min-h-[500px] lg:min-h-[700px] relative w-full"
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                {activeCocktail && (
                  <FeaturedCocktailCard
                    key={activeCocktail.id}
                    {...activeCocktail}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
