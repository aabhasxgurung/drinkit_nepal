import { prisma } from "@/lib/prisma"
import Cocktails from "./components/Cocktails"

export default async function CocktailsPage() {
  const cocktails = await prisma.cocktail.findMany({
    include: {
      ingredients: { orderBy: { order: "asc" } },
    },
    orderBy: { title: "asc" },
  })

  return <Cocktails cocktails={cocktails} />
}
