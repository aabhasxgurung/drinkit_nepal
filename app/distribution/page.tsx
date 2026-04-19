"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ─── Animation variants ───────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: "01",
    title: "Reach Out",
    body: "Contact our distribution team with your venue details, location, and spirit preferences. No form — just a conversation.",
  },
  {
    n: "02",
    title: "Portfolio Review",
    body: "We'll arrange a tasting session and walk you through our full catalogue, guiding you to the labels that fit your menu best.",
  },
  {
    n: "03",
    title: "Onboarding",
    body: "Paperwork done quickly. Credit terms, minimum orders, and delivery schedules set to match the rhythm of your operation.",
  },
  {
    n: "04",
    title: "First Delivery",
    body: "Temperature-controlled, on time, every time. Your bottles arrive exactly as they left the distillery.",
  },
];

const BENEFITS = [
  {
    title: "Exclusive Labels",
    body: "Access brands not available anywhere else in Nepal — import exclusivity you can build a menu around.",
  },
  {
    title: "Consistent Supply",
    body: "No stockouts. We hold safety inventory so your back bar never runs dry mid-service.",
  },
  {
    title: "Staff Training",
    body: "Complimentary brand ambassador sessions for your team — pour confidently, sell compellingly.",
  },
  {
    title: "Menu Support",
    body: "Cocktail development, tasting notes, and brand collateral included with every label we supply.",
  },
  {
    title: "Flexible Minimums",
    body: "Whether you're a boutique bar or a five-star hotel, our minimums are designed to work for you.",
  },
  {
    title: "Dedicated Rep",
    body: "A single point of contact who knows your operation and shows up when you actually need them.",
  },
];

const REGIONS = [
  { area: "Kathmandu", status: "Active" },
  { area: "Lalitpur", status: "Active" },
  { area: "Bhaktapur", status: "Active" },
  { area: "Pokhara", status: "Coming Soon" },
];

const STATS = [
  { n: "5+", label: "Premium Brands" },
  { n: "30+", label: "Active Partners" },
  { n: "4", label: "Years Operating" },
  { n: "100%", label: "Import Certified" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DistributionPage() {
  return (
    <div className="bg-[#FAF8F5]">

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#1C1814] h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-[96px] md:pt-[128px] pb-14">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.p
            variants={heroLine}
            className="font-mono uppercase tracking-[0.22em] text-[9px] text-[#9A8F84] mb-10 md:mb-14"
          >
            Partnership&nbsp;&nbsp;·&nbsp;&nbsp;Distribution&nbsp;&nbsp;·&nbsp;&nbsp;Nepal
          </motion.p>

          <h1
            className="font-playfair italic text-[#FAF8F5] leading-[0.88] pb-3"
            style={{ fontSize: "clamp(70px, 11vw, 182px)" }}
          >
            <motion.span variants={heroLine} className="block">
              Bring the
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[12%] md:pl-[16%]"
              style={{ color: "#7B0323" }}
            >
              world
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[5%] md:pl-[8%]"
            >
              to Nepal.
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="font-mono text-[10px] text-[#9A8F84] mt-12 max-w-[280px] leading-[1.9] uppercase tracking-wider"
        >
          Partner with Nepal's most trusted spirits importer and distributor.
        </motion.p>
      </section>

      {/* ── How It Works ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-24 md:py-36 border-b border-[#E8E3DC]">
        <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
          How It Works
        </p>
        <h2
          className="font-playfair italic text-[#1C1814] leading-[1.05] mb-20"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
        >
          Simple from
          <br />
          <span style={{ color: "#7B0323" }}>first contact.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="border-t border-[#E8E3DC] pt-8 lg:pr-10 pb-10"
            >
              <span className="font-mono text-[9px] text-[#7B0323] tracking-[0.2em] mb-6 block">
                {step.n}
              </span>
              <h3 className="font-playfair italic text-[#1C1814] text-[22px] mb-4">
                {step.title}
              </h3>
              <p className="font-mono text-[11px] text-[#9A8F84] leading-[1.95]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Partner ─────────────────────────────────────────── */}
      <section className="bg-[#1C1814] px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
          Why Partner With Us
        </p>
        <h2
          className="font-playfair italic text-[#FAF8F5] leading-[1.05] mb-20"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
        >
          More than
          <br />
          <span style={{ color: "#7B0323" }}>a delivery.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="border-t border-[#FAF8F5]/10 pt-8 lg:pr-14 pb-10"
            >
              <h3 className="font-playfair italic text-[#FAF8F5] text-[20px] mb-3">
                {b.title}
              </h3>
              <p className="font-mono text-[11px] text-[#9A8F84] leading-[1.95]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coverage ────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-24 md:py-36 border-b border-[#E8E3DC]">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — text + regions */}
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
              Coverage
            </p>
            <h2
              className="font-playfair italic text-[#1C1814] leading-[1.05] mb-8"
              style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
            >
              Currently
              <br />
              <span style={{ color: "#7B0323" }}>serving.</span>
            </h2>
            <p className="font-mono text-[12px] text-[#9A8F84] leading-[2.1] mb-12 max-w-[400px]">
              We currently operate across the Kathmandu Valley with plans
              to expand into Pokhara and beyond. Our logistics ensure
              every bottle arrives in perfect condition.
            </p>

            <div className="grid grid-cols-2 gap-0">
              {REGIONS.map((r) => (
                <div
                  key={r.area}
                  className="border-t border-[#E8E3DC] pt-5 pb-5 pr-8"
                >
                  <p className="font-playfair italic text-[#1C1814] text-[17px] mb-1">
                    {r.area}
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{
                      color: r.status === "Active" ? "#69B578" : "#9A8F84",
                    }}
                  >
                    {r.status}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-px bg-[#E8E3DC]">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-[#FAF8F5] px-8 py-12 flex flex-col gap-3"
              >
                <span
                  className="font-playfair italic text-[#1C1814] leading-none"
                  style={{ fontSize: "clamp(40px, 5vw, 68px)" }}
                >
                  {s.n}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9A8F84]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="max-w-[640px]">
          <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
            Ready to Partner?
          </p>
          <h2
            className="font-playfair italic text-[#1C1814] leading-[1.05] mb-8"
            style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
          >
            Let's put the
            <br />
            <span style={{ color: "#7B0323" }}>right spirits</span>
            <br />
            in your hands.
          </h2>
          <p className="font-mono text-[12px] text-[#9A8F84] leading-[2.1] mb-14 max-w-[420px]">
            Whether you're opening a new venue or looking to upgrade your
            current portfolio, we'd love to talk. Reach us directly and
            we'll get back within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#1C1814] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#FAF8F5] hover:bg-[#2C2018] transition-all duration-300"
            >
              Contact Us
              <span>→</span>
            </Link>
            <a
              href="mailto:Drinkitimportandexport@gmail.com"
              className="inline-flex items-center justify-center gap-3 border border-[#E8E3DC] px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A8F84] hover:text-[#1C1814] hover:border-[#1C1814] transition-all duration-300"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
