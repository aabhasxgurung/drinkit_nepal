"use client";

import { ReactLenis as LenisComponent } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

interface SmoothScrollingProps {
  children: ReactNode;
}

interface LenisOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  syncTouch?: boolean;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal";
  touchMultiplier?: number;
  wheelMultiplier?: number;
  normalizeWheel?: boolean;
  wrapper?: HTMLElement | null;
  content?: HTMLElement | null;
}

// Type assertion to treat it as a valid component
const ReactLenis = LenisComponent as unknown as React.FC<{
  children: ReactNode;
  root?: boolean;
  options?: LenisOptions;
}>;

function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
