import { prisma } from "@/lib/prisma";
import type { Brand, Product } from "@prisma/client";
import AnimatedBrandSection from "@/components/ui/AnimatedBrandSection";
import ProductsHero from "./components/ProductsHero";

const BRAND_META: Record<string, string> = {
  "nao-spirits": "India",
  luxardo: "Padova, Italy · Est. 1821",
  sula: "Nashik, India · Est. 1999",
  whistler: "County Louth, Ireland · Est. 2013",
};

// These two brands are merged into a single NAO Spirits section
const NAO_SPIRITS_SLUGS = ["hapusa", "greater-than"];

// Standalone brands (in display order)
const STANDALONE_SLUGS = ["luxardo", "sula", "whistler"];

// Display name overrides
const BRAND_DISPLAY_NAMES: Record<string, string> = {
  luxardo: "Luxardo S.p.A",
};

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

  const brandMap = new Map(
    brands.map((b) => [b.slug, b as BrandWithProducts])
  );

  // Merge hapusa + greater-than into a single virtual NAO Spirits brand
  const naoBrands = NAO_SPIRITS_SLUGS.map((s) => brandMap.get(s)).filter(
    (b): b is BrandWithProducts => !!b
  );
  const naoProducts = naoBrands.flatMap((b) => b.products);
  const naoSection: BrandWithProducts | null =
    naoBrands.length > 0
      ? {
          ...naoBrands[0],
          id: -1,
          slug: "nao-spirits",
          name: "NAO Spirits",
          products: naoProducts,
        }
      : null;

  const standaloneBrands = STANDALONE_SLUGS.map((s) => brandMap.get(s)).filter(
    (b): b is BrandWithProducts => !!b
  );

  const knownSlugs = new Set([...NAO_SPIRITS_SLUGS, ...STANDALONE_SLUGS]);
  const unknownBrands = brands.filter(
    (b): b is BrandWithProducts => !knownSlugs.has(b.slug)
  );

  const totalProducts = brands.reduce((sum, b) => sum + b.products.length, 0);

  const orderedSections: { brand: BrandWithProducts; index: number }[] = [];
  if (naoSection) orderedSections.push({ brand: naoSection, index: 0 });
  standaloneBrands.forEach((b, i) =>
    orderedSections.push({ brand: b, index: naoSection ? i + 1 : i })
  );
  unknownBrands.forEach((b, i) =>
    orderedSections.push({
      brand: b,
      index: (naoSection ? 1 : 0) + standaloneBrands.length + i,
    })
  );

  return (
    <main className="bg-[#FAF8F5] min-h-screen">
      {/* Hero */}
      <ProductsHero totalProducts={totalProducts} />

      {/* Brand sections */}
      <div className="pb-24">
        {orderedSections.map(({ brand, index }) => (
          <AnimatedBrandSection
            key={brand.slug}
            brand={brand}
            brandIndex={index}
            origin={BRAND_META[brand.slug] ?? ""}
            displayName={BRAND_DISPLAY_NAMES[brand.slug]}
          />
        ))}
      </div>
    </main>
  );
}
