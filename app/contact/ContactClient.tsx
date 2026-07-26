"use client";

import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import type { ContactInfo } from "@prisma/client";

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

export default function ContactClient({
  contactInfo,
}: {
  contactInfo: ContactInfo[];
}) {
  return (
    <div className="bg-[#FAF8F5]">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="bg-[#1C1814] min-h-[80vh] flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-[96px] md:pt-[128px] pb-14">
        <motion.div variants={heroStagger} initial="hidden" animate="visible">
          <motion.p
            variants={heroLine}
            className="font-mono uppercase tracking-[0.22em] text-[9px] text-[#9A8F84] mb-10 md:mb-14"
          >
            Contact&nbsp;&nbsp;·&nbsp;&nbsp;Partnership&nbsp;&nbsp;·&nbsp;&nbsp;Nepal
          </motion.p>

          <h1
            className="font-playfair italic text-[#FAF8F5] leading-[0.88] pb-3"
            style={{ fontSize: "clamp(70px, 11vw, 182px)" }}
          >
            <motion.span variants={heroLine} className="block">
              Let&apos;s
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[12%] md:pl-[16%]"
              style={{ color: "#7B0323" }}
            >
              start a
            </motion.span>
            <motion.span
              variants={heroLine}
              className="block pl-[5%] md:pl-[8%]"
            >
              conversation.
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="font-mono text-[10px] text-[#9A8F84] mt-12 max-w-[320px] leading-[1.9] uppercase tracking-wider"
        >
          Questions about our products, distribution, or partnerships, our team
          replies within 24 hours.
        </motion.p>
      </section>

      {/* ── Contact Info + Form ─────────────────────────────────── */}
      <section className="px-6 md:px-12 lg:px-16 py-24 md:py-36">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left — contact information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[#9A8F84] mb-10">
              Reach Us
            </p>
            <h2
              className="font-playfair italic text-[#1C1814] leading-[1.05] mb-8"
              style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
            >
              Contact
              <br />
              <span style={{ color: "#7B0323" }}>information.</span>
            </h2>
            <p className="font-mono text-[16px] text-[#5C5248] leading-[1.7] mb-12 max-w-[420px]">
              Our team is here to assist with our premium liquor selection,
              distribution services, and partnership opportunities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {contactInfo.map((info) => (
                <div
                  key={info.id}
                  className="border-t border-[#E8E3DC] pt-5 pb-5 pr-8"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7B0323] mb-3">
                    {info.title}
                  </p>
                  <p className="font-mono text-[#1C1814] text-[18px] md:text-[18px] leading-[1.6]">
                    {info.value}
                    {info.subValue && (
                      <>
                        <br />
                        <span className="font-mono text-[14px] text-[#9A8F84] tracking-wide">
                          {info.subValue}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — contact form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
