"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Product } from "@prisma/client";
import WordReveal from "@/components/ui/WordReveal";
import { Sparkles } from "lucide-react";

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-full/ mx-auto 2xl:max-w-full">
        {/* ── Left: heading + CTA ─────────────────────────────────── */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 lg:h-fit">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#7B0323]"></div>
              <Sparkles className="h-4 w-4 text-[#7B0323]" />
              <span className="text-sm font-semibold text-[#7B0323] uppercase tracking-[0.2em]">
                Signature Selection
              </span>
            </div>
            <WordReveal
              text="Selected for Nepal."
              as="h2"
              className="font-playfair italic font-normal text-[#1C1814] mb-8"
              style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.15 }}
            />

            <Link
              href="/products"
              className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-xs uppercase tracking-widest text-[#8B1A1A]"
            >
              <span>Discover Collection</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ── Right: product carousel ─────────────────────────────── */}
        <div className="lg:col-span-9 relative">
          <div className="w-full flex relative z-10">
            <Swiper
              slidesPerView={3.5}
              spaceBetween={20}
              className="mySwiper !pb-5"
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 2.1, spaceBetween: 20 },
                1280: { slidesPerView: 2.7, spaceBetween: 20 },
                1600: { slidesPerView: 3.5, spaceBetween: 20 },
              }}
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product.slug}
                  className="group mt-4 bg-white rounded-xl overflow-hidden"
                  style={{ border: "0.5px solid #E8E3DC" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-square">
                      <Image
                        src={product.featuredImage ?? product.image}
                        fill
                        alt={product.name}
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-end justify-center pb-7">
                        <span className="text-white text-[10px] uppercase tracking-widest border-b border-white/50 pb-1">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A8F84] mb-2">
                      {product.category}
                    </p>
                    <h3
                      className="font-playfair italic font-normal text-[#1C1814] mb-4"
                      style={{
                        fontSize: "clamp(18px, 1.6vw, 22px)",
                        lineHeight: 1.25,
                      }}
                    >
                      {product.name}
                    </h3>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200 text-[10px] uppercase tracking-widest text-[#8B1A1A]"
                    >
                      <span>View Details</span>
                      <span>→</span>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Background shape */}
          <div className="hidden lg:block w-[96.5%] h-[570px] absolute bg-[#F5EFE6] left-12 top-0 z-0 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
