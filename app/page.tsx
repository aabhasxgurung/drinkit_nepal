import About from "@/components/About";
import Banner from "@/components/Banner";
import FeaturedCocktails from "@/components/FeaturedCocktails";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeCta from "@/components/HomeCta";
import MiniBanner from "@/components/MiniBanner";

export default function Home() {
  return (
    <div>
      <Banner />
      <MiniBanner />
      <About />
      <FeaturedProducts />
      <FeaturedCocktails />
      <HomeCta />
    </div>
  );
}
