import { prisma } from "@/lib/prisma"
import Cocktails from "./components/Cocktails"

export default async function CocktailsPage() {
  const [cocktails, signatureCocktails] = await Promise.all([
    prisma.cocktail.findMany({
      include: { ingredients: { orderBy: { order: "asc" } } },
      orderBy: { title: "asc" },
    }),
    prisma.cocktail.findMany({
      where: { category: "Signature" },
      select: { slug: true, title: true, imageUrl: true, base: true },
    }),
  ])

  return <Cocktails cocktails={cocktails} signatureCocktails={signatureCocktails} />
}
