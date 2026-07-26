import { prisma } from "@/lib/prisma";
import type { Brand, Product } from "@prisma/client";
import AnimatedBrandSection from "@/components/ui/AnimatedBrandSection";
import ProductsHero from "./components/ProductsHero";

const BRAND_META: Record<string, string> = {
  "nao-spirits": "India",
  luxardo: "Padova, Italy · Est. 1821",
  sula: "Nashik, India · Est. 1999",
  "robert-merry": "Ireland",
  "indo-spirits": "India",
  "voga-italia": "Delle Venezie · Sicily · Pavia, Italy",
  galanti: "Veneto, Italy",
  "ca-del-lago": "Veneto & Tuscany, Italy",
};

const NAO_SPIRITS_SLUGS = ["hapusa", "greater-than"];
const ROBERT_MERRY_SLUGS = ["the-whistler", "merrys"];
const INDO_SPIRITS_SLUGS = ["bro-code", "bonga-bonga"];
const STANDALONE_SLUGS = ["luxardo", "sula"];

const BRAND_DISPLAY_NAMES: Record<string, string> = {
  luxardo: "Luxardo S.P.A",
};

type BrandWithProducts = Brand & { products: Product[] };

function makeMergedSection(
  slugs: string[],
  brandMap: Map<string, BrandWithProducts>,
  virtualSlug: string,
  virtualName: string,
): BrandWithProducts | null {
  const matched = slugs
    .map((s) => brandMap.get(s))
    .filter((b): b is BrandWithProducts => !!b);
  if (matched.length === 0) return null;
  return {
    ...matched[0],
    id: -1,
    slug: virtualSlug,
    name: virtualName,
    products: matched.flatMap((b) => b.products),
  };
}

export default async function ProductsPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        orderBy: { name: "asc" },
      },
    },
  });

  const brandMap = new Map(brands.map((b) => [b.slug, b as BrandWithProducts]));

  const naoSection = makeMergedSection(
    NAO_SPIRITS_SLUGS,
    brandMap,
    "nao-spirits",
    "NAO Spirits",
  );
  const robertMerrySection = makeMergedSection(
    ROBERT_MERRY_SLUGS,
    brandMap,
    "robert-merry",
    "Robert & Merry Co. Ltd",
  );
  const indoSpiritsSection = makeMergedSection(
    INDO_SPIRITS_SLUGS,
    brandMap,
    "indo-spirits",
    "Indo Spirits",
  );

  const standaloneBrands = STANDALONE_SLUGS.map((s) => brandMap.get(s)).filter(
    (b): b is BrandWithProducts => !!b,
  );

  const allGroupSlugs = new Set([
    ...NAO_SPIRITS_SLUGS,
    ...ROBERT_MERRY_SLUGS,
    ...INDO_SPIRITS_SLUGS,
    ...STANDALONE_SLUGS,
  ]);

  const totalProducts = brands.reduce((sum, b) => sum + b.products.length, 0);

  const orderedSections: { brand: BrandWithProducts; index: number }[] = [];
  let idx = 0;
  if (naoSection) orderedSections.push({ brand: naoSection, index: idx++ });
  if (robertMerrySection)
    orderedSections.push({ brand: robertMerrySection, index: idx++ });
  if (indoSpiritsSection)
    orderedSections.push({ brand: indoSpiritsSection, index: idx++ });
  standaloneBrands.forEach((b) =>
    orderedSections.push({ brand: b, index: idx++ }),
  );
  brands
    .filter((b): b is BrandWithProducts => !allGroupSlugs.has(b.slug))
    .forEach((b) => orderedSections.push({ brand: b, index: idx++ }));

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
