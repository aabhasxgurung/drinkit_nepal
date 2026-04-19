"use client";

import { motion } from "framer-motion";

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const heroLine = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProductsHero({
  totalProducts,
}: {
  totalProducts: number;
}) {
  return (
    <section className="bg-[#1C1814] h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-[96px] md:pt-[128px] pb-14">
      <motion.div variants={heroStagger} initial="hidden" animate="visible">
        <motion.p
          variants={heroLine}
          className="font-mono uppercase tracking-[0.22em] text-[9px] text-[#9A8F84] mb-10 md:mb-14"
        >
          Our Portfolio&nbsp;&nbsp;·&nbsp;&nbsp;{totalProducts} Spirits
        </motion.p>

        <h1
          className="font-playfair italic text-[#FAF8F5] leading-[0.88] pb-3"
          style={{ fontSize: "clamp(70px, 11vw, 182px)" }}
        >
          <motion.span variants={heroLine} className="block">
            Finest
          </motion.span>
          <motion.span
            variants={heroLine}
            className="block pl-[12%] md:pl-[16%]"
            style={{ color: "#7B0323" }}
          >
            spirits,
          </motion.span>
          <motion.span
            variants={heroLine}
            className="block pl-[5%] md:pl-[8%]"
          >
            sourced.
          </motion.span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.7 }}
        className="font-mono text-[10px] text-[#9A8F84] mt-12 max-w-[260px] leading-[1.9] uppercase tracking-wider"
      >
        Five brands. Carefully chosen. All available in Kathmandu.
      </motion.p>
    </section>
  );
}
