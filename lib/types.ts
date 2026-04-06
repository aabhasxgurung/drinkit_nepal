import type { Prisma } from "@prisma/client"

// Cocktail with its ordered ingredients list included
export type CocktailWithIngredients = Prisma.CocktailGetPayload<{
  include: { ingredients: true }
}>
