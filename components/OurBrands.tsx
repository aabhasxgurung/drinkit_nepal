"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Brand data ──────────────────────────────────────────────────── */
interface BrandData {
  number: string;
  logo?: string;
  name: string;
  category: string;
  origin: string;
  expressions: number;
  link: string;
  tint: string;
}

const BRANDS: BrandData[] = [
  {
    number: "01",
    logo: "/home/hapusalogo.png",
    name: "Hapusa",
    category: "Craft Gin",
    origin: "India",
    expressions: 2,
    link: "/products?brand=hapusa",
    tint: "rgba(27, 67, 50, 0.05)",
  },
  {
    number: "02",
    logo: "/home/Luxardologo.png",
    name: "Luxardo",
    category: "Italian Liqueur",
    origin: "Italy",
    expressions: 13,
    link: "/products?brand=luxardo",
    tint: "rgba(123, 3, 35, 0.05)",
  },
  {
    number: "03",
    logo: "/home/sulalogo.png",
    name: "Sula",
    category: "Indian Wine",
    origin: "India",
    expressions: 8,
    link: "/products?brand=sula",
    tint: "rgba(146, 64, 14, 0.05)",
  },
  {
    number: "04",
    logo: "/home/whistler.png",
    name: "The Whistler",
    category: "Irish Whiskey",
    origin: "Ireland",
    expressions: 1,
    link: "/products?brand=whistler",
    tint: "rgba(30, 58, 95, 0.05)",
  },
  {
    number: "05",
    logo: "/home/greaterthanlogo.png",
    name: "Greater Than",
    category: "London Dry Gin",
    origin: "India",
    expressions: 1,
    link: "/products?brand=greater-than",
    tint: "rgba(120, 53, 15, 0.05)",
  },
  {
    number: "06",
    logo: "/home/Merrys_Logo.png",
    name: "Merry's",
    category: "Vermouth & Amaro",
    origin: "Ireland",
    expressions: 1,
    link: "/products?brand=merrys",
    tint: "rgba(120, 53, 15, 0.05)",
  },
  {
    number: "07",
    logo: "/home/Bongalogo.png",
    name: "Bonga Bonga Mystery Liqueur",
    category: "Liqueur",
    origin: "India",
    expressions: 1,
    link: "/products?brand=bonga-bonga",
    tint: "rgba(120, 53, 15, 0.05)",
  },
  {
    number: "08",
    logo: "/home/brocode.png",
    name: "Bro Code",
    category: "Strong Beer",
    origin: "India",
    expressions: 3,
    link: "/products?brand=bro-code",
    tint: "rgba(202, 138, 4, 0.05)",
  },
];

/* ── Component ───────────────────────────────────────────────────── */
export default function OurBrands() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Scroll mechanic — native listener, Lenis-compatible */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Distance from first card's left edge to last card's left edge
    const getTotalMove = (): number => {
      const cards = track.querySelectorAll<HTMLElement>(".ob-brand-card");
      if (cards.length < 2) return 0;
      return cards[cards.length - 1].offsetLeft - cards[0].offsetLeft;
    };

    const onScroll = () => {
      // scrolled = how far section top has passed above viewport top
      const scrolled = -section.getBoundingClientRect().top;
      // Full animation range = (n-1) viewport heights
      const maxScroll = window.innerHeight * (BRANDS.length - 1);
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      track.style.transform = `translateX(${-progress * getTotalMove()}px)`;
      setActiveIndex(Math.round(progress * (BRANDS.length - 1)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // sync immediately if section is already in view

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile scroll handler */
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const itemWidth = el.scrollWidth / BRANDS.length;
    const idx = Math.round(el.scrollLeft / itemWidth);
    setActiveIndex(Math.min(BRANDS.length - 1, Math.max(0, idx)));
  };

  const activeBrand = BRANDS[activeIndex];
  const counterLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(BRANDS.length).padStart(2, "0")}`;

  return (
    <section
      ref={sectionRef}
      // h-auto on mobile; (n-1)*100vh on desktop gives one vh per brand transition.
      // NO overflow-hidden here — that breaks position:sticky on the child.
      className="w-full h-auto md:h-[770vh]"
      style={{ backgroundColor: "#FAF8F5" }}
    >
      {/* ══ DESKTOP ════════════════════════════════════════════════════ */}
      {/* sticky + overflow-hidden on this div, NOT on the section      */}
      <div
        className="hidden md:flex w-full"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#FAF8F5",
        }}
      >
        {/* ── Left panel: sticky editorial copy + progress ──────────── */}
        <div
          className="flex flex-col justify-center px-12 lg:px-16 shrink-0"
          style={{
            width: "38%",
            borderRight: "0.5px solid #E8E3DC",
          }}
        >
          {/* Label */}
          <p
            className="text-[10px] uppercase tracking-[0.16em] mb-6"
            style={{ color: "#9A8F84" }}
          >
            Our Brands
          </p>

          {/* Heading */}
          <h2
            className="font-playfair italic font-normal leading-[1.08] mb-5"
            style={{ fontSize: "clamp(28px, 3vw, 42px)", color: "#1C1814" }}
          >
            The world&rsquo;s finest,
            <br />
            <span style={{ color: "#8B1A1A" }}>chosen</span> for Nepal.
          </h2>

          {/* Subtext */}
          <p
            className="text-[13px] leading-relaxed mb-10"
            style={{
              color: "#9A8F84",
              maxWidth: 260,
              fontVariant: "normal",
              textTransform: "none",
            }}
          >
            Eight brands. Each one handpicked. Each one here for a reason.
          </p>

          {/* Active brand origin hint */}
          <p
            className="font-playfair italic text-[15px] mb-10 transition-all duration-500"
            style={{ color: "#B8AFA6" }}
            key={activeBrand.name}
          >
            {activeBrand.origin}
          </p>

          {/* Progress dots + counter */}
          <div className="flex items-center gap-2">
            {BRANDS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === activeIndex ? 32 : 8,
                  backgroundColor: i === activeIndex ? "#8B1A1A" : "#DDD8D0",
                }}
              />
            ))}
            <span
              className="font-mono text-[10px] ml-3"
              style={{ color: "#B8AFA6" }}
            >
              {counterLabel}
            </span>
          </div>
        </div>

        {/* ── Right panel: scrolling card track ─────────────────────── */}
        <div
          className="relative flex items-center overflow-hidden"
          style={{ width: "62%", height: "100vh" }}
        >
          <div
            ref={trackRef}
            className="absolute flex items-center gap-5"
            style={{ left: 48, willChange: "transform" }}
          >
            {BRANDS.map((brand, i) => {
              const isActive = i === activeIndex;
              const isNext = i === activeIndex + 1;
              const isHidden = i > activeIndex + 1 || i < activeIndex;

              return (
                <Link
                  key={brand.number}
                  href={brand.link}
                  className="ob-brand-card relative shrink-0 flex flex-col rounded-2xl overflow-hidden transition-all duration-700 no-underline"
                  style={{
                    width: "clamp(280px, 36vw, 340px)",
                    height: 320,
                    background: "#FFFFFF",
                    border: "0.5px solid #E8E3DC",
                    boxShadow: isActive
                      ? "0 24px 60px rgba(28,24,20,0.12)"
                      : "0 4px 16px rgba(28,24,20,0.05)",
                    transform: isActive
                      ? "scale(1)"
                      : isNext
                        ? "scale(0.93)"
                        : "scale(0.86)",
                    opacity: isActive ? 1 : isNext ? 0.5 : isHidden ? 0 : 0.3,
                    filter: isNext ? "blur(2px)" : "none",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Brand number badge */}
                  <span
                    className="absolute top-3 right-4 font-mono text-[10px] z-10"
                    style={{ color: "#C8C0B8" }}
                  >
                    {brand.number}
                  </span>

                  {/* ── Logo area: 200px tall, 32px padding ───────── */}
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      height: 200,
                      background: brand.tint,
                      padding: 32,
                    }}
                  >
                    {brand.logo ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={brand.logo}
                          fill
                          alt={`${brand.name} logo`}
                          sizes="340px"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ) : (
                      <span
                        className="font-playfair italic text-[11px] tracking-[0.06em]"
                        style={{ color: "#C8C0B8" }}
                      >
                        Logo coming soon
                      </span>
                    )}
                  </div>

                  {/* ── Thin rule ─────────────────────────────────── */}
                  <div style={{ borderTop: "0.5px solid #E8E3DC" }} />

                  {/* ── Bottom info strip ─────────────────────────── */}
                  <div
                    className="flex items-center justify-between flex-1"
                    style={{ padding: "0 20px" }}
                  >
                    {/* Left: name + category */}
                    <div>
                      <h3
                        className="font-playfair italic font-normal leading-none"
                        style={{
                          fontSize: "clamp(20px, 2vw, 24px)",
                          color: "#1C1814",
                        }}
                      >
                        {brand.name}
                      </h3>
                      <p
                        className="font-mono text-[8px] mt-1"
                        style={{ color: "#9A8F84" }}
                      >
                        {brand.category}
                      </p>
                    </div>

                    {/* Right: expressions · CTA */}
                    <p
                      className="font-mono text-[9px] text-right"
                      style={{ color: "#6B6259" }}
                    >
                      {/* {brand.expressions}{" "}
                      {brand.expressions === 1 ? "expression" : "expressions"} */}
                      <span style={{ color: "#C8C0B8" }}> · </span>
                      <span
                        className="uppercase tracking-[0.1em]"
                        style={{ color: "#8B1A1A" }}
                      >
                        See products →
                      </span>
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ MOBILE ═════════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col w-full py-10 px-5">
        {/* Heading */}
        <div className="mb-8">
          <p
            className="text-[9px] uppercase tracking-[0.16em] mb-4"
            style={{ color: "#9A8F84" }}
          >
            Our Brands
          </p>
          <h2
            className="font-playfair italic font-normal leading-tight mb-3"
            style={{ fontSize: "clamp(28px, 8vw, 36px)", color: "#1C1814" }}
          >
            The world&rsquo;s finest,
            <br />
            <span style={{ color: "#8B1A1A" }}>chosen</span> for Nepal.
          </h2>
          <p
            className="text-[13px] leading-relaxed"
            style={{
              color: "#9A8F84",
              fontVariant: "normal",
              textTransform: "none",
            }}
          >
            Eight brands. Each one handpicked. Each one here for a reason.
          </p>
        </div>

        {/* Swipe carousel */}
        <div
          className="w-[100vw] -mx-5 px-5 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onScroll={handleMobileScroll}
        >
          {BRANDS.map((brand) => (
            <Link
              key={brand.number}
              href={brand.link}
              className="snap-center shrink-0 rounded-2xl overflow-hidden flex flex-col no-underline"
              style={{
                width: 240,
                background: "#FFFFFF",
                border: "0.5px solid #E8E3DC",
                boxShadow: "0 4px 20px rgba(28,24,20,0.08)",
              }}
            >
              {/* Logo area */}
              <div
                className="flex items-center justify-center shrink-0"
                style={{ height: 140, background: brand.tint, padding: 24 }}
              >
                {brand.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.logo}
                      fill
                      alt={`${brand.name} logo`}
                      sizes="240px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : (
                  <span
                    className="font-playfair italic text-[10px] tracking-[0.06em]"
                    style={{ color: "#C8C0B8" }}
                  >
                    Logo coming soon
                  </span>
                )}
              </div>

              {/* Thin rule */}
              <div style={{ borderTop: "0.5px solid #E8E3DC" }} />

              {/* Bottom info strip */}
              <div
                className="flex items-center justify-between flex-1"
                style={{ padding: "0 16px" }}
              >
                <div>
                  <h3
                    className="font-playfair italic font-normal leading-none"
                    style={{ fontSize: 18, color: "#1C1814" }}
                  >
                    {brand.name}
                  </h3>
                  <p
                    className="font-mono text-[7px] mt-0.5"
                    style={{ color: "#9A8F84" }}
                  >
                    {brand.category}
                  </p>
                </div>
                <p
                  className="font-mono text-[8px] text-right"
                  style={{ color: "#6B6259" }}
                >
                  {brand.expressions}{" "}
                  {brand.expressions === 1 ? "expression" : "expressions"}
                  <br />
                  <span
                    className="uppercase tracking-[0.1em]"
                    style={{ color: "#8B1A1A" }}
                  >
                    See products →
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {BRANDS.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: i === activeIndex ? 24 : 6,
                backgroundColor: i === activeIndex ? "#8B1A1A" : "#DDD8D0",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
