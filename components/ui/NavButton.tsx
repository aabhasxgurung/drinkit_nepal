"use client";
import { motion } from "framer-motion";
import "./button.css";

type ButtonProps = {
  isActive: boolean;
  toggleMenu: () => void;
};
type PerspectiveTextProps = {
  label: string;
};
export default function Button({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div className="button">
      <motion.div
        className="slider"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Menu Button */}
        <div className="el" onClick={toggleMenu}>
          <PerspectiveText label="Menu" />
        </div>

        {/* Close Button */}
        <div className="el" onClick={toggleMenu}>
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: PerspectiveTextProps) {
  return (
    <div className="perspectiveText">
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}
