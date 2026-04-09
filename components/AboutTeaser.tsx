"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ── Topographic scribble paths ─────────────────────────────────────
   ViewBox 0 0 1000 900 — 4 sweeping lines + 3 concentric mountain rings
   Rings centred at (490, 430) so the mountain form sits in the right panel
   ──────────────────────────────────────────────────────────────────── */
const SCRIBBLE_PATHS = [
  // Sweeping terrain lines
  { d: "M-60,92  C180,64  420,108 640,78  C820,52  960,94  1080,72",          sw: 0.7 },
  { d: "M-60,218 C160,190 400,235 640,202 C820,174 980,218 1080,196",          sw: 0.5 },
  { d: "M-60,452 C160,424 400,468 640,436 C820,408 980,452 1080,430",          sw: 0.8 },
  { d: "M-60,632 C180,606 440,648 680,616 C880,588 1010,632 1080,612",         sw: 0.6 },
  { d: "M-60,785 C200,758 460,800 720,768 C920,742 1020,784 1080,764",         sw: 0.5 },
  // Concentric rings — mountain contour form
  { d: "M490,68  C802,65  1058,224 1064,430 C1070,640 834,798 490,804 C146,810 -108,652 -114,430 C-120,218 164,71 490,68",   sw: 1.2 },
  { d: "M490,188 C736,184 950,314  956,430 C962,548 750,672  490,676 C230,680  16,556  10,430 C4,308 234,192 490,188",        sw: 0.8 },
  { d: "M490,308 C658,304 790,364  796,430 C802,498 672,556  490,560 C308,564 176,504 170,430 C164,360 312,312 490,308",     sw: 0.5 },
];

/* ── Images scattered in right panel ────────────────────────────── */
const PHOTOS = [
  { src: "/home/carousel1.jpg", left: "52%", top: "7%",  rotate: "2deg",   w: 195, h: 258, alt: "Brand launch"   },
  { src: "/home/carousel2.jpg", left: "66%", top: "36%", rotate: "-2.5deg",w: 178, h: 238, alt: "Gin affair"      },
  { src: "/home/carousel3.jpg", left: "44%", top: "59%", rotate: "1.5deg", w: 195, h: 258, alt: "Wine night"      },
];

export default function AboutTeaser() {
  const sectionRef   = useRef<HTMLElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const pathRefs     = useRef<(SVGPathElement | null)[]>([]);
  const pathLengths  = useRef<number[]>([]);
  const [imgCount, setImgCount] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const section = sectionRef.current;
    const svg     = svgRef.current;
    if (!section || !svg) return;

    /* Measure + initialise paths (hidden until scroll begins) */
    pathLengths.current = pathRefs.current.map(p => p?.getTotalLength() ?? 0);
    pathRefs.current.forEach((p, i) => {
      if (!p) return;
      const len = pathLengths.current[i];
      p.style.strokeDasharray  = String(len);
      p.style.strokeDashoffset = String(len); // fully hidden
    });
    svg.style.opacity = "1";

    const onScroll = () => {
      const scrolled  = -section.getBoundingClientRect().top;
      const maxScroll = section.offsetHeight - window.innerHeight;
      const progress  = Math.max(0, Math.min(1, scrolled / maxScroll));

      /* Draw scribbles: staggered across 0 → 0.75 of total progress */
      const norm = Math.min(1, progress / 0.75);
      pathRefs.current.forEach((path, i) => {
        if (!path) return;
        const len   = pathLengths.current[i];
        const n     = SCRIBBLE_PATHS.length;
        const start = (i / n) * 0.6;
        const end   = start + 0.4;
        const p     = Math.max(0, Math.min(1, (norm - start) / (end - start)));
        path.style.strokeDashoffset = String(len * (1 - p));
      });

      /* Images: appear one-by-one at ~33 / 62 / 88 % */
      setImgCount(progress >= 0.88 ? 3 : progress >= 0.62 ? 2 : progress >= 0.33 ? 1 : 0);
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
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#FAF8F5" }}
      >
        {/* Left — text */}
        <div
          className="flex flex-col justify-center px-12 lg:px-16 shrink-0 z-10"
          style={{ width: "42%", borderRight: "0.5px solid #E8E3DC" }}
        >
          <p className="text-[10px] uppercase tracking-[0.18em] mb-8 text-[#9A8F84]">
            Our Story
          </p>

          <h2
            className="font-playfair italic font-normal text-[#1C1814] leading-[1.15] mb-6"
            style={{ fontSize: "clamp(30px, 3.6vw, 56px)" }}
          >
            Started with
            <br />one bold idea.
            <br />Building{" "}
            <span style={{ color: "#8B1A1A" }}>Nepal&apos;s</span>
            <br />spirits culture.
          </h2>

          <p
            className="text-[13px] leading-relaxed text-[#9A8F84] mb-10"
            style={{ maxWidth: 240 }}
          >
            Five brands. Zero compromise.
            <br />One mission.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] text-[#8B1A1A]"
          >
            <span>Full Story</span>
            <span>→</span>
          </Link>
        </div>

        {/* Right — scribble + images */}
        <div className="relative flex-1 overflow-hidden">
          {/* Scribble SVG — opacity:0 until JS initialises */}
          <svg
            ref={svgRef}
            viewBox="0 0 1000 900"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0 }}
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            {SCRIBBLE_PATHS.map((p, i) => (
              <path
                key={i}
                ref={el => { pathRefs.current[i] = el; }}
                d={p.d}
                stroke="#8B1A1A"
                strokeWidth={p.sw}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          {/* Photos — reveal one by one */}
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="absolute overflow-hidden rounded-xl shadow-xl"
              style={{
                left:   photo.left,
                top:    photo.top,
                width:  photo.w,
                height: photo.h,
                border: "0.5px solid #DDD8D0",
                zIndex: i + 1,
                opacity:   imgCount > i ? 1 : 0,
                transform: imgCount > i
                  ? `rotate(${photo.rotate}) translateY(0px) scale(1)`
                  : `rotate(${photo.rotate}) translateY(24px) scale(0.9)`,
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
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
        <p className="text-[9px] uppercase tracking-[0.18em] mb-6 text-[#9A8F84]">Our Story</p>

        <h2
          className="font-playfair italic font-normal text-[#1C1814] leading-[1.15] mb-5"
          style={{ fontSize: "clamp(32px, 9vw, 46px)" }}
        >
          Started with
          <br />one bold idea.
          <br />Building{" "}
          <span style={{ color: "#8B1A1A" }}>Nepal&apos;s</span>
          <br />spirits culture.
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
