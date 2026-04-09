"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  opacity?: number; // default 0.04
}

export default function TopoPattern({ className = "", opacity = 0.04 }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  /* Desktop-only parallax: pattern moves at 15% of scroll speed */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    const el = imgRef.current;
    if (!el) return;

    const onScroll = () => {
      const section = el.closest("section");
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      el.style.transform = `translateY(${top * 0.15}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/topo-pattern.svg"
      alt=""
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}
