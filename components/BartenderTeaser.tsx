import Image from "next/image";
import Link from "next/link";
import BartenderTeaserReveal from "./ui/BartenderTeaserReveal";

// TODO: move to Bartender model in Prisma schema
const BARTENDER = {
  name: "Amrit Tamang Waiba",
  slug: "amrit-tamang-waiba",
  title: "Brand Ambassador · Drink It Nepal",
  quote: "Every great cocktail tells a story, I just help you find yours.",
  // TODO: replace with real bartender portrait
  photoUrl: "/home/bartender.jpg",
};

type FeaturedCocktail = {
  slug: string;
  title: string;
  imageUrl: string;
};

export default function BartenderTeaser({
  featuredCocktails,
}: {
  featuredCocktails: FeaturedCocktail[];
}) {
  return (
    <BartenderTeaserReveal>
      <div className="bg-[#FAF8F5] border-t border-b border-[#E8E3DC] flex items-center justify-center py-12 md:py-16">
        <div
          className="flex flex-col md:flex-row w-full"
          style={{ minHeight: 320 }}
        >
          {/* ── Left: portrait ──────────────────────────────────────── */}
          <div className="md:w-[50%] flex-shrink-0 flex items-center justify-center p-6 md:p-6">
            <div
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: 12,
                aspectRatio: "4/3",
                backgroundColor: "#EDE8E1",
              }}
            >
              {/* TODO: replace with real bartender portrait once available */}
              <Image
                src={BARTENDER.photoUrl}
                alt={BARTENDER.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 38vw"
              />
              <div
                className="absolute inset-0 pointer-events-none rounded-[12px]"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
                }}
              />
            </div>
          </div>

          {/* ── Right: content ──────────────────────────────────────── */}
          <div
            className="flex-1 flex flex-col justify-center px-6 py-8 md:px-10"
            style={{ gap: 14 }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9A8F84]">
              Behind the glass
            </p>

            <h2
              className="font-playfair text-[#1C1814] leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 40px)" }}
            >
              {BARTENDER.name}
            </h2>

            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8B1A1A]">
              {BARTENDER.title}
            </p>

            <p className="font-playfair italic text-[14px] text-[#6B6259] leading-relaxed max-w-md">
              &ldquo;{BARTENDER.quote}&rdquo;
            </p>

            {featuredCocktails.length > 0 && (
              <div className="flex gap-2">
                {featuredCocktails.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cocktails/${c.slug}`}
                    title={c.title}
                    className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-opacity [@media(hover:hover)]:hover:opacity-75"
                  >
                    <Image
                      src={c.imageUrl}
                      alt={c.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </Link>
                ))}
              </div>
            )}

            <Link
              href={`/bartenders/${BARTENDER.slug}`}
              className="group inline-flex items-center gap-2 w-fit font-mono text-[10px] uppercase tracking-[0.14em] text-[#1C1814] transition-colors [@media(hover:hover)]:hover:text-[#8B1A1A]"
            >
              <span>See his collection</span>
              <span className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </BartenderTeaserReveal>
  );
}
