"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Photos ──────────────────────────────────────────────────────── */
const PHOTOS = [
  {
    src: "/home/carousel1.jpg",
    left: "14%",
    top: "12%",
    w: 305,
    h: 275,
    rotate: "1.5deg",
    alt: "Brand launch",
  },
  {
    src: "/home/carousel2.jpg",
    left: "50%",
    top: "4%",
    w: 185,
    h: 248,
    rotate: "-7deg",
    alt: "Gin affair",
  },
  {
    src: "/home/carousel3.jpg",
    left: "28%",
    top: "52%",
    w: 210,
    h: 278,
    rotate: "1deg",
    alt: "Wine night",
  },
];

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imgCount, setImgCount] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const scrolled = -section.getBoundingClientRect().top;
      const maxScroll = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      /* Images appear one-by-one at 25 / 55 / 80 % */
      setImgCount(
        progress >= 0.8 ? 3 : progress >= 0.55 ? 2 : progress >= 0.25 ? 1 : 0,
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-auto md:h-[350vh] bg-[#FAF8F5]"
    >
      {/* ══ DESKTOP ══════════════════════════════════════════════════ */}
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
        {/* Left — text */}
        <div
          className="flex flex-col justify-center px-12 lg:px-16 shrink-0 z-10"
          style={{ width: "38%", borderRight: "0.5px solid #E8E3DC" }}
        >
          <p className="text-[10px] uppercase tracking-[0.18em] mb-8 text-[#9A8F84]">
            Our Story
          </p>

          <h2
            className="font-playfair italic font-normal text-[#1C1814] leading-[1.15] mb-6"
            style={{ fontSize: "clamp(30px, 3.6vw, 56px)" }}
          >
            Started with
            <br />
            one bold idea.
            <br />
            Building <span style={{ color: "#8B1A1A" }}>Nepal&apos;s</span>
            <br />
            spirits culture.
          </h2>

          <p
            className="text-[13px] leading-relaxed text-[#9A8F84] mb-10"
            style={{ maxWidth: 240 }}
          >
            Five brands. Zero compromise.
            <br />
            One mission.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] text-[#8B1A1A]"
          >
            <span>Full Story</span>
            <span>→</span>
          </Link>
        </div>

        {/* Right — photo collage */}
        <div className="relative flex-1 overflow-hidden">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-xl shadow-lg"
              style={{
                left: photo.left,
                top: photo.top,
                width: photo.w,
                height: photo.h,
                border: "0.5px solid #DDD8D0",
                zIndex: i + 1,
                opacity: imgCount > i ? 1 : 0,
                transform:
                  imgCount > i
                    ? `rotate(${photo.rotate}) translateY(0px) scale(1)`
                    : `rotate(${photo.rotate}) translateY(28px) scale(0.92)`,
                transition:
                  "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* TODO: replace with real event / lifestyle photos */}
              <Image
                src={photo.src}
                fill
                alt={photo.alt}
                sizes="220px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ══ MOBILE ════════════════════════════════════════════════════ */}
      <div className="md:hidden py-16 px-5">
        <p className="text-[9px] uppercase tracking-[0.18em] mb-6 text-[#9A8F84]">
          Our Story
        </p>

        <h2
          className="font-playfair italic font-normal text-[#1C1814] leading-[1.15] mb-5"
          style={{ fontSize: "clamp(32px, 9vw, 46px)" }}
        >
          Started with
          <br />
          one bold idea.
          <br />
          Building <span style={{ color: "#8B1A1A" }}>Nepal&apos;s</span>
          <br />
          spirits culture.
        </h2>

        <p className="text-[13px] leading-relaxed text-[#9A8F84] mb-8">
          Five brands. Zero compromise. One mission.
        </p>

        {/* Scrollable photo strip */}
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="shrink-0 relative overflow-hidden rounded-xl"
              style={{ width: 155, height: 208, border: "0.5px solid #DDD8D0" }}
            >
              {/* TODO: replace with real event / lifestyle photos */}
              <Image
                src={photo.src}
                fill
                alt={photo.alt}
                sizes="155px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-[0.2em] text-[#8B1A1A]"
        >
          <span>Full Story</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
