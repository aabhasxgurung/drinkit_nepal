"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function BrandsAnimated({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const strips = wrapper.querySelectorAll<HTMLElement>(".ob-strip");
    const observers: IntersectionObserver[] = [];

    strips.forEach((el, i) => {
      // Stagger delay per strip — set before the first IO fires
      el.style.transitionDelay = `${i * 0.07}s`;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
            // Clear delay once visible so hover bg transition isn't slowed
            el.style.transitionDelay = "0s";
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
