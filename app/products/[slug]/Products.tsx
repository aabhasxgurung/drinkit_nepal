"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { Filter, Search, X, Check } from "lucide-react";
import { Bottles } from "@/constants/product";

type Bottle = {
  slug: string;
  name: string;
  category: string;
  img: string;
};

type FiltersState = {
  categories: string[];
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [filteredBottles, setFilteredBottles] = useState<Bottle[]>(Bottles);
  const [filters, setFilters] = useState<FiltersState>({
    categories: [],
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract unique categories from bottles data
  const categories = [...new Set(Bottles.map((bottle) => bottle.category))];

  // Get counts for each category
  const getCategoryCount = (category: string) => {
    return Bottles.filter((b) => b.category === category).length;
  };

  // Handle search input change
  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  // Apply filters and search
  useEffect(() => {
    let result = Bottles;

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (bottle) =>
          bottle.name.toLowerCase().includes(term) ||
          bottle.category.toLowerCase().includes(term)
      );
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter((bottle) =>
        filters.categories.includes(bottle.category)
      );
    }

    setFilteredBottles(result);
  }, [searchTerm, filters]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden bg-[#F5EBDA]">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/home/footerbg.png"
            fill
            alt="Cocktails background"
            className="object-contain object-bottom"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-4 tracking-tight">
              Our Collection
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto font-sans tracking-wide">
              Discover our carefully curated selection of premium wines and
              spirits
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-900 font-medium"
            >
              <Filter className="w-5 h-5" />
              <span>{showMobileFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>
          </div>

          {/* Sidebar Filters - Desktop & Mobile */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-1/4 lg:block ${
              showMobileFilters ? "block" : "hidden"
            } space-y-8`}
          >
            <div className="lg:sticky lg:top-24 space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              {/* Search in Sidebar for Desktop */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#7B0323]/20 focus:bg-white transition-all duration-300 font-sans"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif font-semibold text-gray-900">
                    Categories
                  </h3>
                  {filters.categories.length > 0 && (
                    <button
                      onClick={() => setFilters({ categories: [] })}
                      className="text-xs text-[#7B0323] hover:underline font-medium"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors duration-200 ${
                            filters.categories.includes(category)
                              ? "bg-[#7B0323] border-[#7B0323]"
                              : "border-gray-300 group-hover:border-[#7B0323]"
                          }`}
                        >
                          {filters.categories.includes(category) && (
                            <Check className="w-3.5 h-3.5 text-white" />
                          )}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={filters.categories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        <span
                          className={`text-sm capitalize ${
                            filters.categories.includes(category)
                              ? "text-gray-900 font-medium"
                              : "text-gray-600 group-hover:text-gray-900"
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
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 font-sans">
                Found{" "}
                <span className="font-semibold text-gray-900">
                  {filteredBottles.length}
                </span>{" "}
                products
              </p>
            </div>

            {filteredBottles.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              >
                <AnimatePresence>
                  {filteredBottles.map((bottle) => (
                    <motion.div
                      layout
                      key={bottle.slug}
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group"
                    >
                      <Link href={`/products/${bottle.slug}`}>
                        <div className="relative bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 h-full flex flex-col">
                          <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg bg-gray-50">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                              className="w-full h-full relative"
                            >
                              <Image
                                src={bottle.img}
                                fill
                                alt={bottle.name}
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </motion.div>
                          </div>

                          <div className="text-center mt-auto">
                            <span className="text-xs font-medium tracking-wider text-[#7B0323] uppercase mb-2 block">
                              {bottle.category}
                            </span>
                            <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-[#7B0323] transition-colors line-clamp-2">
                              {bottle.name}
                            </h3>
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
                className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  We couldn&apos;t find any products matching your search. Try
                  adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ categories: [] });
                  }}
                  className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
