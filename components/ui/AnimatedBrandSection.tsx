"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Brand, Product } from "@prisma/client";

type BrandWithProducts = Brand & { products: Product[] };

interface Props {
  brand: BrandWithProducts;
  brandIndex: number;
  origin: string;
  displayName?: string;
}

export default function AnimatedBrandSection({
  brand,
  brandIndex,
  origin,
  displayName,
}: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Brand header: fade up on scroll, once
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition =
            "opacity 500ms cubic-bezier(0.23,1,0.32,1), transform 500ms cubic-bezier(0.23,1,0.32,1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Product cards: stagger in as row enters viewport, once
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(12px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.transition =
                "opacity 400ms ease-out, transform 400ms ease-out";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 40);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={`brand-${brand.slug}`}
      className="pt-[48px] md:pt-[80px]"
      style={
        brandIndex > 0
          ? { borderTop: "0.5px solid #E8E3DC" }
          : undefined
      }
    >
      {/* Brand header — constrained width */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          ref={headerRef}
          className="flex items-baseline justify-between mb-8"
        >
          <div>
            <h2
              className="font-playfair italic text-[#1C1814] leading-[1.1]"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              {displayName ?? brand.name}
            </h2>
            {origin && (
              <p className="font-mono text-[10px] text-[#9A8F84] mt-1">
                {origin}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 ml-4 flex-shrink-0">
            <span className="font-mono text-[11px] text-[#9A8F84]">
              {brand.products.length} products
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal scroll — full bleed */}
      <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4 pb-6 w-max pl-5 md:pl-12 lg:pl-16 pr-6 md:pr-12 lg:pr-16"
        >
          {brand.products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group flex-shrink-0 w-[160px] md:w-[220px]"
            >
              {/* Image container */}
              <div className="w-full h-[200px] md:h-[280px] bg-[#F0EBE3] rounded-xl overflow-hidden relative mb-[14px]">
                <Image
                  src={product.image}
                  fill
                  alt={product.name}
                  className="object-contain p-4 transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                  sizes="(max-width: 768px) 160px, 220px"
                />
              </div>

              {/* Product name */}
              <p className="font-playfair italic text-[13px] md:text-[16px] text-[#1C1814] leading-[1.2] mb-1">
                {product.name}
              </p>

              {/* Category label */}
              <p className="uppercase tracking-[0.12em] text-[8px] text-[#9A8F84]">
                {product.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
