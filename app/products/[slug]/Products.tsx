"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Filter, Search, X, Check } from "lucide-react";
import type { Product } from "@prisma/client";

type FiltersState = {
  categories: string[];
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Products({ products }: { products: Product[] }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(products);
  const [filters, setFilters] = useState<FiltersState>({ categories: [] });

  const categories = [...new Set(products.map((p) => p.category))];

  const getCategoryCount = (category: string) =>
    products.filter((p) => p.category === category).length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.includes(p.category),
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, filters, products]);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden ">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/home/footerbg.png"
            fill
            alt="Product collection"
            className="object-contain object-bottom opacity-60"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5EBDA]/40 via-transparent to-[#F5EBDA]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-5 tracking-tight">
              Our Collection
            </h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#7B0323]/40" />
              <p className="text-gray-600 text-sm tracking-[0.15em] uppercase font-sans">
                Premium Wines &amp; Spirits
              </p>
              <span className="h-px w-12 bg-[#7B0323]/40" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-800 font-medium font-sans text-sm"
            >
              <Filter className="w-4 h-4" />
              {showMobileFilters ? "Hide Filters" : "Filter by Category"}
            </button>
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`lg:w-1/4 lg:block ${
              showMobileFilters ? "block" : "hidden"
            } space-y-8`}
          >
            <div className="lg:sticky lg:top-24 space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-9 pr-9 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-[#7B0323]/20 focus:bg-white transition-all duration-300 font-sans"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase font-sans">
                    Categories
                  </h3>
                  {filters.categories.length > 0 && (
                    <button
                      onClick={() => setFilters({ categories: [] })}
                      className="text-xs text-[#7B0323] hover:underline font-medium font-sans"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-2.5">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center justify-between group cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4.5 h-4.5 w-5 h-5 rounded border flex items-center justify-center transition-colors duration-200 ${
                            filters.categories.includes(category)
                              ? "bg-[#7B0323] border-[#7B0323]"
                              : "border-gray-300 group-hover:border-[#7B0323]"
                          }`}
                        >
                          {filters.categories.includes(category) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm capitalize font-sans ${
                            filters.categories.includes(category)
                              ? "text-gray-900 font-medium"
                              : "text-gray-500 group-hover:text-gray-800"
                          }`}
                        >
                          {category}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-sans">
                        {getCategoryCount(category)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-gray-500 font-sans">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.slug}
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, scale: 0.92 }}
                    >
                      <Link href={`/products/${product.slug}`}>
                        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#7B0323]/20 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          {/* Image area */}
                          <div className="relative aspect-[4/5] bg-white overflow-hidden">
                            <Image
                              src={product.image}
                              fill
                              alt={product.name}
                              className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Category badge */}
                            <span className="absolute top-4 left-4 text-[10px] font-medium tracking-[0.15em] text-[#7B0323] uppercase bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#7B0323]/15 font-sans">
                              {product.category}
                            </span>
                          </div>

                          {/* Text area */}
                          <div className="px-5 py-4 flex-1 flex flex-col justify-between border-t border-gray-100">
                            <h3 className="font-serif text-lg text-gray-900 mb-3 group-hover:text-[#7B0323] transition-colors line-clamp-2 leading-snug">
                              {product.name}
                            </h3>
                            <span className="text-xs text-[#7B0323] font-sans font-medium tracking-wide">
                              Explore →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-dashed border-gray-200"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-sm text-gray-400 max-w-xs mx-auto font-sans">
                  Try adjusting your search or category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ categories: [] });
                  }}
                  className="mt-6 px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-[#7B0323] hover:text-[#7B0323] transition-colors font-sans"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
