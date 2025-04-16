import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
import CocktailCard from "@/app/cocktails/components/CocktailCard";
import { CocktailDataProps } from "@/constants/cocktail";

interface ModalProps {
  modal: {
    active: boolean;
    index: number;
  };
  cocktails: CocktailDataProps[];
}

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Modal({ modal, cocktails }: ModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorLabel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[466px] w-[1200px] absolute bg-gray-100 overflow-hidden pointer-events-none flex justify-center items-center rounded-lg"
      >
        {active && cocktails.length > 0 && (
          <div className="h-full w-full absolute overflow-hidden">
            <div
              style={{
                top: `-${index * 100}%`,
                transition: "top 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
              }}
              className="h-full w-full absolute"
            >
              {cocktails.map((cocktail: CocktailDataProps, i: number) => (
                <div
                  key={`modal_${i}`}
                  className="h-full w-full flex justify-center items-center"
                >
                  <CocktailCard {...cocktail} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
