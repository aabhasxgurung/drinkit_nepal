import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Detail } from "./Detail";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { brand: true },
  });

  if (!product) return notFound();

  const cocktails = await prisma.cocktail.findMany({
    where: { ingredients: { some: { productId: product.id } } },
    include: { ingredients: { orderBy: { order: "asc" } } },
    orderBy: { title: "asc" },
  });

  return <Detail product={product} cocktails={cocktails} />;
}
