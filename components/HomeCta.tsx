import Link from "next/link";
import React from "react";

const HomeCta = () => {
  return (
    <div>
      <section className="py-24 bg-wine-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 max-w-2xl mx-auto">
            Elevate Your Experience with Drink It Import Export
          </h2>
          <p className="text-wine-100 mb-10 max-w-2xl mx-auto">
            Join us in celebrating the art of fine spirits. Discover exceptional
            products and learn how to create remarkable cocktails with our
            expert guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-white text-wine-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              See Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCta;
