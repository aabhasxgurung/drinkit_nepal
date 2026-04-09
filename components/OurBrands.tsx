"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Brand data ──────────────────────────────────────────────────── */
interface BrandData {
  number: string;
  logo: string;
  name: string;
  category: string;
  origin: string;
  expressions: number;
  link: string;
  bottle: string;
  tilt: number;
  tint: string; // rgba string for the card top-section tint
}

const BRANDS: BrandData[] = [
  {
    number: "01",
    logo: "/home/hapusalogo.png",
    name: "Hapusa",
    category: "Craft Gin",
    origin: "Himachal Pradesh, India",
    expressions: 2,
    link: "/products?brand=hapusa",
    bottle: "/home/hapusa.png",
    tilt: -8,
    tint: "rgba(27, 67, 50, 0.07)",
  },
  {
    number: "02",
    logo: "/home/Luxardologo.png",
    name: "Luxardo",
    category: "Italian Liqueur",
    origin: "Padova, Italy",
    expressions: 13,
    link: "/products?brand=luxardo",
    bottle: "/sula/luxardo_maraschino_originale.png",
    tilt: 6,
    tint: "rgba(123, 3, 35, 0.07)",
  },
  {
    number: "03",
    logo: "/home/sulalogo.png",
    name: "Sula",
    category: "Indian Wine",
    origin: "Nashik, India",
    expressions: 8,
    link: "/products?brand=sula",
    bottle: "/sula/cheninBlanc.png",
    tilt: -5,
    tint: "rgba(146, 64, 14, 0.07)",
  },
  {
    number: "04",
    logo: "/home/whistler.png",
    name: "The Whistler",
    category: "Irish Whiskey",
    origin: "County Louth, Ireland",
    expressions: 1,
    link: "/products?brand=whistler",
    bottle: "/sula/whistlerbottle.png",
    tilt: 10,
    tint: "rgba(30, 58, 95, 0.07)",
  },
  {
    number: "05",
    logo: "/home/greaterthanlogo.png",
    name: "Greater Than",
    category: "London Dry Gin",
    origin: "New Delhi, India",
    expressions: 1,
    link: "/products?brand=greater-than",
    bottle: "/home/greaterthan.png",
    tilt: -7,
    tint: "rgba(120, 53, 15, 0.07)",
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
      // h-auto on mobile; 500vh on desktop gives scroll room for 5 brands.
      // NO overflow-hidden here — that breaks position:sticky on the child.
      className="w-full h-auto md:h-[500vh]"
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
            style={{ color: "#9A8F84", maxWidth: 260 }}
          >
            Five brands. Each one handpicked.
            <br />
            Each one here for a reason.
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
                    width: "clamp(300px, 40vw, 380px)",
                    height: "78vh",
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
                  {/* ── Card top: bottle image + tint ─────────── */}
                  <div
                    className="relative"
                    style={{
                      height: "58%",
                      background: brand.tint,
                      overflow: "hidden",
                    }}
                  >
                    {/* Brand number badge */}
                    <span
                      className="absolute top-4 right-4 font-mono text-[10px] z-10"
                      style={{ color: "#C8C0B8" }}
                    >
                      {brand.number}
                    </span>

                    {/* Bottle with tilt */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: `rotate(${brand.tilt}deg)` }}
                    >
                      <Image
                        src={brand.bottle}
                        fill
                        alt={`${brand.name} bottle`}
                        sizes="380px"
                        style={{ objectFit: "contain", padding: "32px" }}
                      />
                    </div>
                  </div>

                  {/* ── Card bottom: brand identity ────────────── */}
                  <div
                    className="flex flex-col justify-between"
                    style={{
                      height: "42%",
                      padding: "20px 28px 24px",
                    }}
                  >
                    {/* Logo + name */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        {/* Logo box */}
                        <div
                          className="relative rounded-xl overflow-hidden shrink-0 w-48"
                          style={{
                            background: "#EDE8E1",
                            border: "0.5px solid #DDD8D0",
                          }}
                        >
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={180}
                            height={90}
                            style={{ objectFit: "contain", padding: "4px" }}
                          />
                        </div>

                        <div>
                          <h3
                            className="font-playfair italic font-normal leading-none"
                            style={{
                              fontSize: "clamp(22px, 2.2vw, 30px)",
                              color: "#1C1814",
                            }}
                          >
                            {brand.name}
                          </h3>
                          <p
                            className="text-[8px] uppercase tracking-[0.14em] mt-1"
                            style={{ color: "#9A8F84" }}
                          >
                            {brand.category}
                          </p>
                        </div>
                      </div>

                      <p
                        className="font-mono text-[9px]"
                        style={{ color: "#C8C0B8" }}
                      >
                        {brand.origin}
                      </p>
                    </div>

                    {/* Expressions + CTA */}
                    <div
                      className="flex items-end justify-between"
                      style={{
                        borderTop: "0.5px solid #E8E3DC",
                        paddingTop: 14,
                      }}
                    >
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: "#6B6259" }}
                      >
                        {brand.expressions}{" "}
                        {brand.expressions === 1 ? "expression" : "expressions"}
                      </span>
                      <span
                        className="text-[9px] uppercase tracking-[0.12em] transition-transform duration-200 hover:translate-x-0.5"
                        style={{ color: "#8B1A1A" }}
                      >
                        See products →
                      </span>
                    </div>
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
            style={{ color: "#9A8F84" }}
          >
            Five brands. Each one handpicked.
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
                width: 280,
                height: 380,
                background: "#FFFFFF",
                border: "0.5px solid #E8E3DC",
                boxShadow: "0 4px 20px rgba(28,24,20,0.08)",
              }}
            >
              {/* Bottle image */}
              <div
                className="relative flex items-center justify-center"
                style={{ height: "55%", background: brand.tint }}
              >
                <div
                  className="absolute inset-0"
                  style={{ transform: `rotate(${brand.tilt}deg)` }}
                >
                  <Image
                    src={brand.bottle}
                    fill
                    alt={`${brand.name} bottle`}
                    sizes="280px"
                    style={{ objectFit: "contain", padding: "24px" }}
                  />
                </div>
              </div>

              {/* Info */}
              <div
                className="flex flex-col justify-between flex-1"
                style={{ padding: "16px 20px 18px" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="relative rounded-lg overflow-hidden shrink-0"
                    style={{
                      width: 30,
                      height: 30,
                      background: "#EDE8E1",
                      border: "0.5px solid #DDD8D0",
                    }}
                  >
                    <Image
                      src={brand.logo}
                      fill
                      alt={`${brand.name} logo`}
                      sizes="30px"
                      style={{ objectFit: "contain", padding: "3px" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="font-playfair italic font-normal leading-none"
                      style={{ fontSize: 20, color: "#1C1814" }}
                    >
                      {brand.name}
                    </h3>
                    <p
                      className="text-[7px] uppercase tracking-[0.14em] mt-0.5"
                      style={{ color: "#9A8F84" }}
                    >
                      {brand.category}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between"
                  style={{ borderTop: "0.5px solid #E8E3DC", paddingTop: 10 }}
                >
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: "#6B6259" }}
                  >
                    {brand.expressions}{" "}
                    {brand.expressions === 1 ? "expression" : "expressions"}
                  </span>
                  <span
                    className="text-[8px] uppercase tracking-[0.12em]"
                    style={{ color: "#8B1A1A" }}
                  >
                    See products →
                  </span>
                </div>
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
