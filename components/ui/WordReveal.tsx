"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type HeadingTag = "h1" | "h2" | "h3" | "h4";

interface WordRevealProps {
  text: string;
  className?: string;
  as?: HeadingTag;
  delay?: number;
}

export default function WordReveal({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: WordRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".reveal-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 70, skewY: 4 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Tag ref={containerRef} className={`overflow-hidden ${className}`}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="reveal-word inline-block mr-[0.25em] last:mr-0"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
