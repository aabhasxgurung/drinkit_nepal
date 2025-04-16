"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { Filter, Search, X } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filteredBottles, setFilteredBottles] = useState<Bottle[]>(Bottles);
  const [filters, setFilters] = useState<FiltersState>({
    categories: [],
  });

  // Extract unique categories from bottles data
  const categories = [...new Set(Bottles.map((bottle) => bottle.category))];

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

  return (
    <div className="min-h-screen">
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
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">
              Our Collection
            </h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto px-4">
              Discover our carefully curated selection of premium wines and
              spirits
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search our collection..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B0323] focus:border-transparent shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 ${
              showFilters ? "bg-gray-700" : "bg-[#7B0323]"
            } text-white rounded-full hover:bg-[#5B0219] transition-colors duration-300`}
          >
            <Filter className="w-5 h-5" />
            <span>{showFilters ? "Hide Filters" : "Filter"}</span>
          </button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Filters
                </h3>

                <div className="space-y-6">
                  {/* Category filters */}
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-2">
                      Categories
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.categories.includes(category)
                              ? "bg-[#7B0323] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } transition-colors duration-200`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reset filters button */}
                  <button
                    onClick={() =>
                      setFilters({
                        categories: [],
                      })
                    }
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Counter */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <p className="text-gray-600">
          Showing {filteredBottles.length} of {Bottles.length} products
        </p>
      </div>

      {/* Products Display */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBottles.length > 0 ? (
          <motion.div
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
          >
            {filteredBottles.map((bottle) => (
              <motion.div
                key={bottle.slug}
                variants={fadeInUp}
                className="group relative"
              >
                <Link href={`/products/${bottle.slug}`}>
                  <div className="relative flex flex-col items-center">
                    {/* Bottle Image with Reflection */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ y: -20 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative z-10"
                      >
                        <Image
                          src={bottle.img}
                          width={280}
                          height={400}
                          alt={bottle.name}
                          className="transform-gpu transition-transform duration-500 hover:scale-105 w-[280px] h-[400px] object-cover"
                        />
                      </motion.div>
                    </div>

                    {/* Product Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center mt-6 relative z-20"
                    >
                      <h3 className="font-serif text-2xl text-[#7B0323] mb-2 group-hover:text-[#5B0219] transition-colors">
                        {bottle.name}
                      </h3>
                      <p className="text-gray-600 font-light capitalize tracking-wide">
                        {bottle.category}
                      </p>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl text-gray-700 mb-4">No products found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-br from-[#7B0323] to-[#5B0219] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates about new products,
              special offers, and expert recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 text-white placeholder:text-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-white text-[#7B0323] rounded-full hover:bg-gray-100 transition-colors duration-300 font-semibold">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;
