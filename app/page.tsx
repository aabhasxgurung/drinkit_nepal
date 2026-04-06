import { prisma } from "@/lib/prisma"
import Banner from "@/components/Banner"
import MiniBanner from "@/components/MiniBanner"
import About from "@/components/About"
import FeaturedProducts from "@/components/FeaturedProducts"
import FeaturedCocktails from "@/components/FeaturedCocktails"
import HomeCta from "@/components/HomeCta"

export default async function Home() {
  const [slides, brands, featuredProducts, featuredCocktails, stats] =
    await Promise.all([
      prisma.carouselSlide.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.brand.findMany({
        orderBy: { name: "asc" },
      }),
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
    ])

  return (
    <div>
      <Banner slides={slides} />
      <MiniBanner brands={brands} />
      <About stats={stats} />
      <FeaturedProducts products={featuredProducts} />
      <FeaturedCocktails cocktails={featuredCocktails} />
      <HomeCta />
    </div>
  )
}
