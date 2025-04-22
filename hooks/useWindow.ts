// hooks/useWindow.ts
import { useState, useEffect } from "react";

type WindowSize = {
  width: number;
  height: number;
  isMobile: boolean;
};

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({
        width,
        height,
        isMobile: width < 768,
      });
    };

    handleResize(); // run initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
