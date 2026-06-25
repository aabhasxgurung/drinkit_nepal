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

  const [cocktails, brandMates, allProducts] = await Promise.all([
    // Cocktails this product is an ingredient in
    prisma.cocktail.findMany({
      where: { ingredients: { some: { productId: product.id } } },
      include: { ingredients: { orderBy: { order: "asc" } } },
      orderBy: { title: "asc" },
    }),
    // Other bottles from the same house
    prisma.product.findMany({
      where: { brandId: product.brandId, id: { not: product.id } },
      take: 4,
      orderBy: { name: "asc" },
      select: { slug: true, name: true, image: true, category: true },
    }),
    // Whole catalogue (name-sorted) for prev / next navigation
    prisma.product.findMany({
      orderBy: { name: "asc" },
      select: { slug: true, name: true },
    }),
  ]);

  const idx = allProducts.findIndex((p) => p.slug === product.slug);
  const prev = idx > 0 ? allProducts[idx - 1] : null;
  const next =
    idx >= 0 && idx < allProducts.length - 1 ? allProducts[idx + 1] : null;

  return (
    <Detail
      product={product}
      cocktails={cocktails}
      brandMates={brandMates}
      prev={prev}
      next={next}
    />
  );
}
