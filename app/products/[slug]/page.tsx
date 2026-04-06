import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Detail } from "./Detail"

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } })
  return products.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  })

  if (!product) return notFound()

  return <Detail product={product} />
}
