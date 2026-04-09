"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  opacity?: number; // default 0.04
}

/* 11 organic contour lines — varying stroke-width for natural depth */
const PATHS: { d: string; sw: number }[] = [
  {
    d: "M-50,42 C150,18 280,65 460,32 C640,0 760,58 940,26 C1080,4 1180,44 1260,22",
    sw: 0.5,
  },
  {
    d: "M-50,88 C100,62 260,108 450,80 C640,52 760,98 940,70 C1080,48 1180,86 1260,66",
    sw: 1.0,
  },
  {
    d: "M-50,138 C80,114 240,156 440,128 C640,100 760,145 940,116 C1100,92 1180,132 1260,114",
    sw: 1.5,
  },
  {
    d: "M-50,162 C120,144 260,178 440,158 C620,138 740,166 920,148 C1080,132 1170,158 1260,144",
    sw: 0.4,
  },
  {
    d: "M-50,205 C120,178 260,218 450,190 C640,162 760,205 940,178 C1080,154 1180,188 1260,172",
    sw: 0.8,
  },
  {
    d: "M-50,258 C100,230 280,272 460,244 C640,216 760,260 940,232 C1080,208 1180,248 1260,228",
    sw: 1.3,
  },
  {
    d: "M-50,315 C120,288 260,328 450,300 C640,272 760,316 940,290 C1060,268 1180,304 1260,286",
    sw: 0.6,
  },
  {
    d: "M-50,368 C100,340 280,382 460,354 C640,326 760,370 940,342 C1080,318 1180,356 1260,338",
    sw: 1.2,
  },
  {
    d: "M-50,422 C120,394 260,436 440,408 C620,380 760,424 940,396 C1060,372 1180,410 1260,394",
    sw: 0.5,
  },
  {
    d: "M-50,478 C100,450 280,492 460,464 C640,436 760,480 940,452 C1080,428 1180,466 1260,448",
    sw: 0.9,
  },
  {
    d: "M-50,534 C120,506 260,548 440,520 C620,492 760,538 940,510 C1060,486 1180,524 1260,506",
    sw: 0.6,
  },
];

export default function TopoPattern({ className = "", opacity = 0.04 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  /* Desktop-only parallax: pattern moves at 15% of scroll speed */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const svg = svgRef.current;
    if (!svg) return;

    const onScroll = () => {
      const section = svg.closest("section");
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      svg.style.transform = `translateY(${top * 0.15}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {PATHS.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke="#8B1A1A"
          strokeWidth={p.sw}
          fill="none"
        />
      ))}
    </svg>
  );
}
