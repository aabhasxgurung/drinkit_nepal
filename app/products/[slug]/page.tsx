import { notFound } from "next/navigation";
import { Bottles } from "@/constants/product";
import { Detail } from "./Detail"; // keep Detail as a client component

export const dynamicParams = false;

// Required for static export on a dynamic segment
export function generateStaticParams() {
  return Bottles.map((b) => ({ slug: b.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const product = Bottles.find((b) => b.slug === params.slug);
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-amber-50/30 py-12">
      <Detail bottle={product} />
    </div>
  );
}
