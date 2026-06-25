import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CocktailDetailClient from "./CocktailDetailClient";

export async function generateStaticParams() {
  const cocktails = await prisma.cocktail.findMany({ select: { slug: true } });
  return cocktails.map((c) => ({ slug: c.slug }));
}

export default async function CocktailDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [raw, allCocktails] = await Promise.all([
    prisma.cocktail.findUnique({
      where: { slug: params.slug },
      include: {
        ingredients: {
          orderBy: { order: "asc" },
          include: { product: { select: { slug: true, name: true } } },
        },
      },
    }),
    prisma.cocktail.findMany({
      orderBy: { title: "asc" },
      select: { slug: true, title: true },
    }),
  ]);

  if (!raw) return notFound();

  const related = await prisma.cocktail.findMany({
    where: { base: raw.base, slug: { not: raw.slug } },
    take: 3,
    select: { slug: true, title: true, imageUrl: true, base: true },
  });

  const currentIdx = allCocktails.findIndex((c) => c.slug === raw.slug);
  const prev = currentIdx > 0 ? allCocktails[currentIdx - 1] : null;
  const next =
    currentIdx < allCocktails.length - 1
      ? allCocktails[currentIdx + 1]
      : null;

  const cocktail = {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    description: raw.description,
    imageUrl: raw.imageUrl,
    difficulty: raw.difficulty as string,
    category: raw.category,
    base: raw.base,
    method: raw.method,
    garnish: raw.garnish,
    ingredients: raw.ingredients.map((ing) => ({
      id: ing.id,
      name: ing.name,
      amount: ing.amount,
      productSlug: ing.product?.slug ?? null,
      productName: ing.product?.name ?? null,
    })),
  };

  return (
    <CocktailDetailClient
      cocktail={cocktail}
      related={related}
      prev={prev}
      next={next}
    />
  );
}
