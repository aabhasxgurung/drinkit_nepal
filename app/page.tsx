import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import OurBrands from "@/components/OurBrands";
import About from "@/components/About";
import AboutTeaser from "@/components/AboutTeaser";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedCocktails from "@/components/FeaturedCocktails";
import HomeCta from "@/components/HomeCta";

export default async function Home() {
  const [featuredProducts, featuredCocktails, stats] = await Promise.all([
    prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { featuredOrder: "asc" },
    }),
    prisma.cocktail.findMany({
      where: { isFeatured: true },
      include: { ingredients: { orderBy: { order: "asc" } } },
      orderBy: { featuredOrder: "asc" },
    }),
    prisma.companyStat.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div>
      <Hero bgImage="/home/carousel1.jpg" />
      <OurBrands />
      <AboutTeaser />
      {/* <About stats={stats} /> */}
      <FeaturedProducts products={featuredProducts} />
      <FeaturedCocktails cocktails={featuredCocktails} />
      <HomeCta />
    </div>
  );
}
