"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import type { CarouselSlide } from "@prisma/client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Banner({ slides }: { slides: CarouselSlide[] }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (bgRef.current && heroRef.current) {
      gsap.fromTo(
        bgRef.current,
        { y: 0 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.32,
      y: y * 0.32,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div ref={heroRef} className="w-full h-screen relative overflow-hidden">
      {/* Parallax background — taller than viewport to allow upward movement */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 w-full"
        style={{ top: "-80px", height: "calc(100% + 160px)" }}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          className="mySwiper w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  fill
                  alt={slide.altText ?? "Premium Spirits Background"}
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />

      {/* Grain texture overlay */}
      <div className="hero-grain absolute inset-0 z-[2]" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-in-up w-full">
          <p className="text-[#F5EBDA]/55 text-[0.6rem] tracking-[0.55em] uppercase mb-6 font-sans">
            Premium Spirits &amp; Fine Wines
          </p>

          <h1
            className="font-serif text-[#F5EBDA] tracking-wide leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
          >
            EXPERIENCE
          </h1>

          <h1
            className="font-serif text-[#F5EBDA]/70 italic font-light leading-[1.05]"
            style={{ fontSize: "clamp(2.2rem, 7vw, 6rem)" }}
          >
            the Essence of
          </h1>

          <h1
            className="font-serif text-[#F5EBDA] tracking-[0.12em] leading-[0.88] mb-8"
            style={{ fontSize: "clamp(4rem, 12vw, 9rem)" }}
          >
            LUXURY
          </h1>

          <p className="text-gray-300/90 text-sm md:text-base font-sans max-w-lg mx-auto mb-12 tracking-wide leading-relaxed">
            Curated collection of premium spirits and wines for the discerning
            palate.
          </p>

          <Link
            href="/products"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="inline-block bg-[#7B0323] hover:bg-[#9B0C3C] text-white px-10 py-4 rounded-full uppercase tracking-[0.22em] text-xs font-medium transition-colors duration-300 shadow-[0_8px_32px_rgba(123,3,35,0.4)]"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
        <span className="text-white/70 text-[0.6rem] tracking-widest uppercase mb-2">
          Scroll
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/70"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
