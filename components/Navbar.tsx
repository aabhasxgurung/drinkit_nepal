"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./ui/NavContainer";
import Button from "./ui/NavButton";
import Link from "next/link";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindow";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock scroll on mobile when menu is active
  useEffect(() => {
    document.body.style.overflow = isActive && isMobile ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive, isMobile]);

  // Detect clicks outside menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isActive &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActive]);

  const menu = {
    open: {
      width: isMobile ? "100vw" : "480px",
      height: isMobile ? "100vh" : "650px",
      top: "-25px",
      right: "-25px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: "100px",
      height: "40px",
      top: "0px",
      right: "0px",
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50  w-full flex justify-between bg-white/30 backdrop-blur-sm md:bg-transparent">
      <div className="p-4 md:px-6 flex items-center justify-between w-full">
        <div>
          <Link href={"/"}>
            <Image
              src="/home/logo.png"
              width={200}
              height={60}
              alt="Company Logo"
              className="w-[150px] md:w-[200px] md:h-[60px]"
            />
          </Link>
        </div>
        <div
          className="relative z-50 w-[100px] h-[40px] md:w-[120px] md:h-[50px]"
          ref={menuRef}
        >
          <motion.div
            className={`absolute text-white bg-[#7B0323] rounded-3xl 

              `}
            variants={menu}
            animate={isActive ? "open" : "closed"}
            initial="closed"
          >
            <AnimatePresence>
              {isActive && <Nav closeMenu={() => setIsActive(false)} />}
            </AnimatePresence>
          </motion.div>

          <Button
            isActive={isActive}
            toggleMenu={() => setIsActive(!isActive)}
          />
        </div>
      </div>
    </div>
  );
}
