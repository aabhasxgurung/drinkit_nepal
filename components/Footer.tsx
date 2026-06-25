import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1814] min-h-screen flex flex-col relative overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/home/footerbg.png"
          fill
          alt=""
          className="object-cover opacity-[0.05]"
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* ── Editorial hero ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-12 md:pb-16">
          <div>
            <p className="font-mono uppercase tracking-[0.22em] text-[9px] text-[#9A8F84] mb-10 md:mb-14">
              Drink It&nbsp;&nbsp;·&nbsp;&nbsp;Kathmandu,
              Nepal&nbsp;&nbsp;·&nbsp;&nbsp;27°42′N&nbsp;85°19′E
            </p>

            <h2
              className="font-playfair italic text-[#FAF8F5] leading-[0.88] select-none"
              style={{ fontSize: "clamp(68px, 12.5vw, 196px)" }}
            >
              <span className="block">The</span>
              <span className="block pl-[14%] md:pl-[18%] text-[#7B0323]">
                world
              </span>
              <span className="block pl-[6%] md:pl-[8%]">in your</span>
              <span className="block pl-[28%] md:pl-[38%]">glass.</span>
            </h2>
          </div>

          <p className="font-mono text-[10px] text-[#9A8F84] mt-10 md:mt-14 max-w-[280px] leading-[1.8] uppercase tracking-wider">
            Premium spirits sourced from the world&apos;s finest distilleries —
            brought to Kathmandu.
          </p>
        </div>

        {/* ── Info grid ──────────────────────────────────────────── */}
        <div className="border-t border-[#FAF8F5]/10 px-6 md:px-12 lg:px-16 py-12 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/home/logo.png"
                  width={140}
                  height={42}
                  alt="Drink It"
                  className="brightness-0 invert opacity-75 w-[120px] md:w-[140px]"
                />
              </Link>
              <p className="font-mono text-[9px] text-[#9A8F84] uppercase tracking-[0.2em]">
                Est. 2020
              </p>
            </div>

            {/* Navigate */}
            <div>
              <p className="font-mono uppercase tracking-[0.2em] text-[8px] text-[#9A8F84] mb-5">
                Navigate
              </p>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Products", path: "/products" },
                  { name: "Cocktails", path: "/cocktails" },
                  { name: "About", path: "/about" },
                  { name: "Distribution", path: "/distribution" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="font-playfair italic text-[#FAF8F5]/55 hover:text-[#FAF8F5] transition-colors duration-200"
                      style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="font-mono uppercase tracking-[0.2em] text-[8px] text-[#9A8F84] mb-5">
                Reach Us
              </p>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+9779819810683"
                    className="flex items-start gap-3 group"
                  >
                    <Phone className="h-3 w-3 text-[#9A8F84] flex-shrink-0 mt-[3px] group-hover:text-[#7B0323] transition-colors" />
                    <span className="font-mono text-[11px] text-[#FAF8F5]/55 group-hover:text-[#FAF8F5] transition-colors leading-relaxed">
                      +977 9801359489
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Drinkitimportandexport@gmail.com"
                    className="flex items-start gap-3 group"
                  >
                    <Mail className="h-3 w-3 text-[#9A8F84] flex-shrink-0 mt-[3px] group-hover:text-[#7B0323] transition-colors" />
                    <span className="font-mono text-[11px] text-[#FAF8F5]/55 group-hover:text-[#FAF8F5] transition-colors leading-relaxed break-all">
                      Drinkitimportandexport
                      <br />
                      @gmail.com
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-3 w-3 text-[#9A8F84] flex-shrink-0 mt-[3px]" />
                  <span className="font-mono text-[11px] text-[#FAF8F5]/55 leading-relaxed">
                    Baluwatar, Kathmandu
                  </span>
                </li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <p className="font-mono uppercase tracking-[0.2em] text-[8px] text-[#9A8F84] mb-5">
                Follow
              </p>
              <Link
                href="https://www.instagram.com/drinkit.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
              >
                <Instagram className="h-4 w-4 text-[#9A8F84] group-hover:text-[#FAF8F5] transition-colors" />
                <span className="font-mono text-[11px] text-[#FAF8F5]/55 group-hover:text-[#FAF8F5] transition-colors">
                  @drinkit.np
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Copyright strip ─────────────────────────────────────── */}
        <div className="border-t border-[#FAF8F5]/10 px-6 md:px-12 lg:px-16 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="font-mono text-[8px] text-[#9A8F84] uppercase tracking-[0.18em]">
            © {currentYear} Drink It Import &amp; Export. All rights reserved.
          </p>
          <p className="font-mono text-[8px] text-[#9A8F84] uppercase tracking-[0.18em]">
            Please drink responsibly &middot; 21+
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
