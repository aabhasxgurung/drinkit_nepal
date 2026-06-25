import { prisma } from "@/lib/prisma"
import Cocktails from "./components/Cocktails"

// TEMPORARY: a few cocktails still reuse product bottle shots instead of real
// cocktail photography. Hide those cards from the catalog until proper images
// exist. The recipes stay in the database — this only filters the view.
const BOTTLE_IMAGE_URLS = new Set([
  "https://res.cloudinary.com/dvhoi2xg1/image/upload/featuredLux_rbv8jd.png",
  "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_maraschino_originale_tklhqm.png",
  "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo-cherry_hlnyxc.webp",
  "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardotriple_eaimmo.jpg",
  "https://res.cloudinary.com/dvhoi2xg1/image/upload/luxardo_aperitivo_rhr7wx.png",
  "https://res.cloudinary.com/dvhoi2xg1/image/upload/angioletto_tzd5nh.png",
])

export default async function CocktailsPage() {
  const allCocktails = await prisma.cocktail.findMany({
    include: { ingredients: { orderBy: { order: "asc" } } },
    orderBy: { title: "asc" },
  })

  const cocktails = allCocktails.filter(
    (c) => !BOTTLE_IMAGE_URLS.has(c.imageUrl),
  )

  return <Cocktails cocktails={cocktails} />
}
