"use client";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const carouselImages = [
  {
    id: 1,
    src: "/home/carousel1.jpg",
  },
  {
    id: 2,
    src: "/home/carousel2.jpg",
  },
  {
    id: 3,
    src: "/home/carousel3.jpg",
  },
  {
    id: 4,
    src: "/backgrounds/Maraschino-1.jpg",
  },
];

const Banner = () => {
  return (
    <>
      <div className="w-full md:h-screen relative justify-center">
        <Swiper
          modules={[Autoplay]} // ✅ Add Autoplay module
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="mySwiper"
        >
          {carouselImages.map((item, i) => (
            <SwiperSlide key={i}>
              <div>
                <Image
                  src={item.src}
                  width={1800}
                  height={1000}
                  alt="hello"
                  className="w-full h-[500px] md:h-screen object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Ensure MiniBanner has a specific position or z-index */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Banner;
