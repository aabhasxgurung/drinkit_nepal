import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BartenderProfileClient from "./BartenderProfileClient";

// TODO: move to Bartender model in Prisma schema
const BARTENDERS = [
  {
    name: "Anil Shrestha",
    slug: "amrit-tamang-waiba",
    role: "Brand Ambassador · Drink It Nepal",
    bio: "A decade behind the bar, building Nepal's cocktail culture one glass at a time. Trained across Southeast Asia, now rooted in Kathmandu — bringing the world's best spirits to local palates.",
    quote: "Every great cocktail tells a story — I just help you find yours.",
    instagramHandle: "anilshrestha.bar",
    // TODO: replace with real bartender portrait
    photoUrl: "/home/bartender.jpg",
    cocktailSlugs: [
      "summer-scandal",
      "under-the-fig-tree",
      "mid-night-offering",
      "oh-mami",
      "wild-seduction",
      "purple-tease",
      "smoke-and-dust",
    ],
    events: [
      {
        name: "Kathmandu Spirits Festival",
        type: "Festival",
        venue: "Hotel Yak & Yeti",
      },
      {
        name: "Bar Takeover — Alchemy",
        type: "Takeover",
        venue: "Alchemy Bar, Thamel",
      },
      {
        name: "Private Tasting — Hapusa Launch",
        type: "Brand Event",
        venue: "Dwarika's Hotel",
      },
    ],
  },
];

export default async function BartenderPage({
  params,
}: {
  params: { slug: string };
}) {
  const bartender = BARTENDERS.find((b) => b.slug === params.slug);
  if (!bartender) notFound();

  const cocktails = await prisma.cocktail.findMany({
    where:
      bartender.cocktailSlugs.length > 0
        ? { slug: { in: bartender.cocktailSlugs } }
        : { isFeatured: true },
    take: bartender.cocktailSlugs.length > 0 ? undefined : 6,
    select: {
      slug: true,
      title: true,
      imageUrl: true,
      base: true,
      category: true,
      difficulty: true,
    },
  });

  return <BartenderProfileClient bartender={bartender} cocktails={cocktails} />;
}
