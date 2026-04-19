"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Hero variants (same as cocktails page) ───────────────────────────────────

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

// ─── Scroll-section stagger variants ─────────────────────────────────────────

const sectionStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const JOURNEY = [
  {
    year: "2020",
    title: "Founded",
    body: "Drink It Nepal is established with a singular mission: bring the world&apos;s finest spirits to Kathmandu&apos;s bars and tables.",
  },
  {
    year: "2021",
    title: "First Portfolio",
    body: "We launch our founding portfolio of five handpicked international brands spanning Scotch, gin, and premium rum.",
  },
  {
    year: "2022",
    title: "Hospitality Reach",
    body: "Distribution expands to 30+ premium bars, hotels, and restaurants across the Kathmandu valley.",
  },
  {
    year: "2023",
    title: "Cocktail Culture",
    body: "We begin hosting bartender education programmes, elevating Nepal&apos;s craft cocktail scene from the ground up.",
  },
  {
    year: "2024",
    title: "Growing Portfolio",
    body: "New spirits categories added — tequila, cognac, and craft liqueurs join an ever-expanding family.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5]">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#1C1814] h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-[96px] md:pt-[128px] pb-14">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.p
            variants={heroLine}
            className="font-mono uppercase tracking-[0.22em] text-[9px] text-[#9A8F84] mb-10 md:mb-14"
          >
            Drink It&nbsp;&nbsp;·&nbsp;&nbsp;Nepal&nbsp;&nbsp;·&nbsp;&nbsp;Est.
            2020
          </motion.p>

          <h1
            className="font-playfair italic text-[#FAF8F5] leading-[0.88] pb-3"
            style={{ fontSize: "clamp(70px, 11vw, 182px)" }}
          >
            <motion.span variants={heroLine} className="block">
              Our
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[12%] md:pl-[16%]"
              style={{ color: "#7B0323" }}
            >
              story,
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[5%] md:pl-[8%]"
            >
              told.
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="font-mono text-[10px] text-[#9A8F84] mt-12 max-w-[260px] leading-[1.9] uppercase tracking-wider"
        >
          Built on passion. Shaped by craft. Rooted in Nepal.
        </motion.p>
      </section>

      {/* ── Stacked Parallax Chapters ───────────────────────────── */}
      {/*
        Each wrapper is 200vh. Chapters 2 & 3 pull back 100vh with -mt-[100vh]
        so they begin sliding up WHILE the previous chapter is still pinned.
        Higher z-index ensures later chapters stack on top.
      */}

      {/* Chapter 1 — Who We Are */}
      <div className="relative h-[200vh]" style={{ zIndex: 10 }}>
        <div className="sticky top-0 h-screen bg-[#FAF8F5] overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16">
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10"
            >
              01 — Who We Are
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair italic text-[#1C1814] leading-[1.05] mb-8"
              style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
            >
              More than
              <br />
              <span style={{ color: "#7B0323" }}>an importer.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-mono text-[12px] text-[#9A8F84] leading-[2.1] max-w-[540px]"
            >
              Drink It Nepal is the country&apos;s premier spirits importer and
              distributor, bringing the world&apos;s finest distilleries to
              Kathmandu&apos;s tables and bars. Founded in 2020, we&apos;ve
              built a curated portfolio spanning heritage Scotch whiskies, craft
              gins, premium rums, and beyond — each label chosen for its story,
              quality, and character.
            </motion.p>
          </motion.div>

          <span
            className="absolute right-6 md:right-16 bottom-8 font-playfair italic text-[#E8E3DC] select-none pointer-events-none leading-none"
            style={{ fontSize: "clamp(100px, 18vw, 280px)" }}
          >
            01
          </span>
        </div>
      </div>

      {/* Chapter 2 — What We Stand For (slides over Ch 1) */}
      <div className="relative h-[200vh] -mt-[100vh]" style={{ zIndex: 20 }}>
        <div className="sticky top-0 h-screen bg-[#1C1814] rounded-t-[28px] overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 shadow-[0_-20px_60px_rgba(0,0,0,0.45)]">
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10"
            >
              02 — What We Stand For
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair italic text-[#FAF8F5] leading-[1.05] mb-14"
              style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
            >
              We don&apos;t
              <br />
              <span style={{ color: "#7B0323" }}>compromise.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[960px]"
            >
              {[
                {
                  n: "I",
                  title: "Curation",
                  body: "Every bottle earns its place. We source only spirits that represent the pinnacle of their category — no fillers, no shortcuts.",
                },
                {
                  n: "II",
                  title: "Quality",
                  body: "From temperature-controlled warehousing to white-glove delivery, we treat every bottle like it belongs in a collector&apos;s cellar.",
                },
                {
                  n: "III",
                  title: "Education",
                  body: "We invest in Nepal&apos;s bartending community through tastings, masterclasses, and one-on-one brand training.",
                },
              ].map((pillar) => (
                <div
                  key={pillar.n}
                  className="border-t border-[#FAF8F5]/10 pt-8 pr-6"
                >
                  <span className="font-mono text-[9px] text-[#7B0323] tracking-[0.2em] mb-5 block">
                    {pillar.n}
                  </span>
                  <h3 className="font-playfair italic text-[#FAF8F5] text-[22px] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-[11px] text-[#9A8F84] leading-[1.95]">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <span
            className="absolute right-6 md:right-16 bottom-8 font-playfair italic select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(100px, 18vw, 280px)",
              color: "rgba(255,255,255,0.03)",
            }}
          >
            02
          </span>
        </div>
      </div>

      {/* Chapter 3 — Who We Serve (slides over Ch 2) */}
      <div className="relative h-[200vh] -mt-[100vh]" style={{ zIndex: 30 }}>
        <div className="sticky top-0 h-screen bg-[#FAF8F5] rounded-t-[28px] overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-16 shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10"
            >
              03 — Who We Serve
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-playfair italic text-[#1C1814] leading-[1.05] mb-14"
              style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
            >
              Every glass,
              <br />
              <span style={{ color: "#7B0323" }}>everyone.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-[960px]"
            >
              {[
                {
                  title: "Hotels & Bars",
                  body: "Premium on-trade partners across Kathmandu&apos;s finest hospitality venues.",
                },
                {
                  title: "Restaurants",
                  body: "Curated wine and spirits lists for Nepal&apos;s leading dining destinations.",
                },
                {
                  title: "Retail",
                  body: "Off-trade partners who believe their customers deserve better choices.",
                },
                {
                  title: "Events",
                  body: "Bespoke curation for private celebrations, weddings, and corporate functions.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-t border-[#E8E3DC] pt-6 pr-8 pb-6"
                >
                  <h3 className="font-playfair italic text-[#1C1814] text-[18px] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[#9A8F84] leading-[1.95]">
                    {item.body}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <span
            className="absolute right-6 md:right-16 bottom-8 font-playfair italic text-[#E8E3DC] select-none pointer-events-none leading-none"
            style={{ fontSize: "clamp(100px, 18vw, 280px)" }}
          >
            03
          </span>
        </div>
      </div>

      {/* ── Our Journey ─────────────────────────────────────────── */}
      <section
        className="relative bg-[#1C1814] px-6 md:px-12 lg:px-16 py-24 md:py-36"
        style={{ zIndex: 40 }}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
          Our Journey
        </p>
        <h2
          className="font-playfair italic text-[#FAF8F5] leading-[1.05] mb-20 md:mb-24"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
        >
          Five years of
          <br />
          <span style={{ color: "#7B0323" }}>building something.</span>
        </h2>

        <div className="space-y-0">
          {JOURNEY.map((item) => (
            <div
              key={item.year}
              className="grid grid-cols-1 md:grid-cols-[100px_260px_1fr] gap-3 md:gap-12 border-b border-[#FAF8F5]/10 py-8 md:py-10 items-baseline"
            >
              <span className="font-mono text-[11px] text-[#7B0323] tracking-[0.18em]">
                {item.year}
              </span>
              <h3
                className="font-playfair italic text-[#FAF8F5]"
                style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
              >
                {item.title}
              </h3>
              <p className="font-mono text-[11px] text-[#9A8F84] leading-[1.95] max-w-[480px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-20 flex flex-col sm:flex-row gap-4 items-start">
          <Link
            href="/distribution"
            className="inline-flex items-center gap-3 border border-[#FAF8F5]/20 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5]/60 hover:text-[#FAF8F5] hover:border-[#FAF8F5]/50 transition-all duration-300"
          >
            Distribution Partners
            <span>→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#7B0323] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5] hover:bg-[#960329] transition-all duration-300"
          >
            Get in Touch
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
