"use client";
import { useParams } from "next/navigation";
import { Bottles } from "@/constants/product";
import { Detail } from "./Detail";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = Bottles.find((bottle) => bottle.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-red-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/30 py-12">
      <Detail bottle={product} />
    </div>
  );
};

export default ProductDetail;
