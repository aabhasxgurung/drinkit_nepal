import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import gsap from "gsap";
import CocktailCard from "@/app/cocktails/components/CocktailCard";

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

export default function Modal({ modal, cocktails }: any) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    window.addEventListener("mousemove", (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[450px] w-[1000px] absolute bg-white overflow-hidden pointer-events-none flex justify-center items-center"
      >
        {/* <div
          style={{
            top: index * -100 + "%",
            transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          }}
          className="h-full w-full absolute transition-[top] duration-500"
        >
          {cocktails.map((project: { src: any; color: any }, index: any) => {
            const { src, color } = project;
            return (
              <div
                className="h-full w-full flex justify-center items-center"
                key={`modal_${index}`}
              >
                <Image
                  src={src}
                  width={300}
                  height={0}
                  alt="image"
                  className="h-auto"
                />
              </div>
            );
          })}
        </div> */}
        {active && cocktails[index] && (
          <div className="h-full w-full absolute flex justify-center items-center">
            <CocktailCard {...cocktails[index]} />
          </div>
        )}
      </motion.div>
      <motion.div
        ref={cursor}
        className="w-20 h-20 rounded-[50%] bg-[#455CE9] text-white absolute z-10 flex justify-center items-center text-sm pointer-events-none"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      ></motion.div>
      <motion.div
        ref={cursorLabel}
        className="bg-transparent"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}
