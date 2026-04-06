import { prisma } from "@/lib/prisma"
import Products from "./[slug]/Products"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  })

  return <Products products={products} />
}
