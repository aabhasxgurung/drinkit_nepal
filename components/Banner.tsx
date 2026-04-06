"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import type { CarouselSlide } from "@prisma/client";

export default function Banner({ slides }: { slides: CarouselSlide[] }) {
  return (
    <>
      <div className="w-full md:h-screen relative justify-center">
        {/* Background Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper relative w-full h-screen md:h-full inset-0 -z-10 top-0"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full h-full">
                <Image
                  src={slide.image}
                  fill
                  alt={slide.altText ?? "Premium Spirits Background"}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hero Content */}
        <div className="top-0 absolute w-full h-screen flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-serif text-[#F5EBDA] tracking-wide mb-2">
              EXPERIENCE THE
            </h1>
            <h1 className="text-4xl md:text-7xl font-serif text-[#F5EBDA] italic mb-4">
              ESSENCE OF
            </h1>
            <h1 className="text-5xl md:text-8xl font-serif text-[#F5EBDA] tracking-widest mb-6">
              LUXURY
            </h1>

            <p className="text-gray-200 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-10 tracking-wide">
              Curated collection of premium spirits and wines for the discerning
              palate.
            </p>

            <Link
              href="/products"
              className="bg-[#7B0323] hover:bg-[#9B0C3C] text-white px-8 py-3 rounded-full uppercase tracking-wider text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20">
          <span className="text-white/80 text-xs tracking-widest uppercase mb-2">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  );
}
