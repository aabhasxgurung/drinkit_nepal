import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  bgImage: string;
}

export default function Hero({ bgImage }: HeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden hero-grain">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          fill
          alt="Premium spirits background"
          className="object-cover"
          priority
        />
      </div>

      {/* Dark gradient overlay — heavier on the left where content sits */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Main content — vertically centred, left-aligned */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-28">
        {/* Eyebrow label */}
        <p className="hero-label font-sans text-[11px] tracking-[0.3em] uppercase text-[#F5F0E8]/55 mb-7">
          Nepal&apos;s Spirits Culture
        </p>

        {/* Display heading — two lines with Kettmeir-style right stagger on line 2 */}
        <div className="mb-7">
          <h1
            className="hero-line-1 font-playfair text-[#F5F0E8] leading-[1.05] block"
            style={{ fontSize: "clamp(52px, 8vw, 110px)", fontWeight: 400 }}
          >
            Drink the World.
          </h1>
          <h1
            className="hero-line-2 font-playfair italic text-[#F5F0E8] leading-[1.05] block ml-8 md:ml-16 lg:ml-24"
            style={{ fontSize: "clamp(52px, 8vw, 110px)", fontWeight: 400 }}
          >
            Stay in Nepal.
          </h1>
        </div>

        {/* Subtext */}
        <p className="hero-subtext font-sans text-[#F5F0E8]/60 text-base max-w-[480px] mb-10 leading-relaxed">
          The finest spirits, brought home to Kathmandu.
        </p>

        {/* CTA — outline style, fills cream on hover */}
        <div className="hero-cta">
          <Link
            href="/products"
            className="inline-block border border-[#F5F0E8]/55 text-[#F5F0E8] px-9 py-3.5 text-[11px] tracking-[0.22em] uppercase font-sans transition-all duration-300 hover:bg-[#F5F0E8] hover:text-[#0d0805] hover:border-[#F5F0E8]"
          >
            Explore our world
          </Link>
        </div>
      </div>

      {/* Bottom-left coordinate detail */}
      <div className="absolute bottom-8 left-8 sm:left-14 md:left-20 lg:left-28 z-10">
        <p className="hero-coord font-mono text-[10px] text-white tracking-[0.18em]">
          27°42′N · 85°19′E · 1,400m
        </p>
      </div>
    </section>
  );
}
