"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "drinkit_age_verified";

export default function AgeVerification() {
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem(STORAGE_KEY);
    if (!verified) setShow(true);
  }, []);

  function handleYes() {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  }

  function handleNo() {
    setDenied(true);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="age-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
              opacity: 0.04,
              mixBlendMode: "multiply",
            }}
          />

          {/* Radial glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,3,35,0.05) 0%, transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center text-center px-8 max-w-md w-full"
          >
            {/* Logo */}
            <div className="mb-10 opacity-90">
              <Image
                src="/home/logo.png"
                width={180}
                height={54}
                alt="Drink It Nepal"
                priority
              />
            </div>

            {/* Divider line */}
            <div
              className="w-10 mb-8"
              style={{ height: "1px", backgroundColor: "rgba(28,24,20,0.15)" }}
            />

            {!denied ? (
              <>
                <p
                  className="font-sans text-[10px] tracking-[0.3em] uppercase mb-5"
                  style={{ color: "rgba(28,24,20,0.5)" }}
                >
                  Please verify your age
                </p>

                <h1
                  className="font-playfair leading-[1.1] mb-4"
                  style={{
                    fontSize: "clamp(28px, 5vw, 42px)",
                    fontWeight: 400,
                    color: "#1C1814",
                  }}
                >
                  Are you of legal
                  <br />
                  <span className="italic">drinking age?</span>
                </h1>

                <p
                  className="font-sans text-sm leading-relaxed mb-10"
                  style={{ color: "rgba(28,24,20,0.5)", maxWidth: "320px" }}
                >
                  You must be of legal drinking age in your country to enter
                  this site.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <button
                    onClick={handleYes}
                    className="flex-1 font-sans text-[11px] tracking-[0.22em] uppercase py-3.5 px-6 transition-all duration-300"
                    style={{
                      backgroundColor: "#7B0323",
                      color: "#F5F0E8",
                      border: "1px solid #7B0323",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#9a0430";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                        "#7B0323";
                    }}
                  >
                    Yes, I am
                  </button>

                  <button
                    onClick={handleNo}
                    className="flex-1 font-sans text-[11px] tracking-[0.22em] uppercase py-3.5 px-6 transition-all duration-300"
                    style={{
                      backgroundColor: "transparent",
                      color: "rgba(28,24,20,0.6)",
                      border: "1px solid rgba(28,24,20,0.2)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(28,24,20,0.5)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#1C1814";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(28,24,20,0.2)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(28,24,20,0.6)";
                    }}
                  >
                    No, I am not
                  </button>
                </div>

                <p
                  className="font-sans text-[10px] mt-8 tracking-wide"
                  style={{ color: "rgba(28,24,20,0.3)" }}
                >
                  By entering you accept our terms &amp; conditions
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <p
                  className="font-sans text-[10px] tracking-[0.3em] uppercase mb-5"
                  style={{ color: "rgba(28,24,20,0.5)" }}
                >
                  Access restricted
                </p>
                <h2
                  className="font-playfair leading-[1.15] mb-4"
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 400,
                    color: "#1C1814",
                  }}
                >
                  We&apos;re sorry,
                  <br />
                  <span className="italic">come back later.</span>
                </h2>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(28,24,20,0.45)", maxWidth: "300px" }}
                >
                  This site is intended for adults of legal drinking age only.
                  Please visit again when you are older.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Bottom coordinate detail — matches Hero */}
          <div className="absolute bottom-8 left-8 sm:left-14">
            <p
              className="font-mono text-[10px] tracking-[0.18em]"
              style={{ color: "rgba(28,24,20,0.3)" }}
            >
              27°42′N · 85°19′E · 1,400m
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
