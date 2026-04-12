import { prisma } from "@/lib/prisma";
import type { Brand, Product } from "@prisma/client";
import AnimatedBrandSection from "@/components/ui/AnimatedBrandSection";

const BRAND_META: Record<string, string> = {
  hapusa: "Himachal Pradesh, India · Est. 2017",
  luxardo: "Padova, Italy · Est. 1821",
  sula: "Nashik, India · Est. 1999",
  whistler: "County Louth, Ireland · Est. 2013",
  "greater-than": "New Delhi, India · Est. 2016",
};

const BRAND_ORDER = ["hapusa", "luxardo", "sula", "whistler", "greater-than"];

type BrandWithProducts = Brand & { products: Product[] };

export default async function ProductsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        orderBy: { name: "asc" },
      },
    },
  });

  // Sort per spec order; any unknown brands appended at end
  const known = BRAND_ORDER.map((slug) =>
    brands.find((b) => b.slug === slug)
  ).filter((b): b is BrandWithProducts => !!b);

  const knownSlugs = new Set(BRAND_ORDER);
  const rest = brands.filter(
    (b): b is BrandWithProducts => !knownSlugs.has(b.slug)
  );

  const orderedBrands = [...known, ...rest];
  const totalProducts = brands.reduce((sum, b) => sum + b.products.length, 0);

  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      {/* Page header */}
      <div className="pt-[80px] md:pt-[120px] pb-16 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="uppercase tracking-[0.16em] text-[10px] text-[#9A8F84] mb-4">
            Our Collection
          </p>
          <h1
            className="font-playfair italic text-[#1C1814] leading-[1.1]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {totalProducts} spirits worth knowing.
          </h1>
          <p className="text-[14px] text-[#9A8F84] mt-4">
            Five brands. Carefully chosen. All available in Kathmandu.
          </p>
        </div>
      </div>

      {/* Brand sections */}
      <div className="pb-24">
        {orderedBrands.map((brand, i) => (
          <AnimatedBrandSection
            key={brand.slug}
            brand={brand}
            brandIndex={i}
            origin={BRAND_META[brand.slug] ?? ""}
          />
        ))}
      </div>
    </main>
  );
}
