import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center px-6"
    >
      {/* Logo */}
      <div className="mb-10 opacity-90">
        <Image
          src="/home/logo.png"
          alt="Drink It Nepal"
          width={120}
          height={120}
          className="object-contain"
          priority
        />
      </div>

      {/* Heading */}
      <h1
        className="text-center text-5xl md:text-6xl italic text-[#7b0323] mb-5 leading-tight"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        We&rsquo;re upgrading.
      </h1>

      {/* Subtext */}
      <p
        className="text-center text-base md:text-lg text-[#16140f] leading-relaxed max-w-xs"
        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300 }}
      >
        Something better is coming.
        <br />
        Back soon.
      </p>

      {/* Domain */}
      <span
        className="absolute bottom-8 text-[11px] tracking-widest text-[#4a4540] uppercase"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        drinkitnepal.com
      </span>
    </div>
  );
}
