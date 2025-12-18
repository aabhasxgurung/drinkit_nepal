"use client";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import FeaturedCocktailCard from "./FeaturedCocktailCard";
import { cocktailsData } from "@/constants/cocktail";

const FeaturedCocktails = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
            variants={itemVariants}
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-[#7B0323]" />
                <span className="text-sm font-medium text-[#7B0323] uppercase tracking-wider">
                  Featured Collection
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
                Signature Cocktail Recipes
              </h2>
              <p className="text-gray-600 max-w-xl font-sans">
                Discover our carefully curated selection of premium cocktails,
                crafted with precision and passion.
              </p>
            </div>

            <Link
              href="/cocktails"
              className="group inline-flex items-center px-6 py-3 mt-6 md:mt-0 bg-[#7B0323] text-white rounded-lg hover:bg-[#9B0C3C] transition-all duration-300"
            >
              <span className="font-medium">Explore all recipes</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Featured Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            variants={itemVariants}
          >
            {[
              { label: "Signature Drinks", value: "15+" },
              { label: "Premium Spirits", value: "25+" },
              { label: "Years of Expertise", value: "10+" },
              { label: "Happy Customers", value: "1000+" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-lg p-4 text-center"
              >
                <div className="text-2xl font-bold text-[#7B0323]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Cocktails Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {cocktailsData.slice(0, 3).map((cocktail) => (
              <motion.div
                key={cocktail.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Trending Badge */}
                {cocktail.id === "1" && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      <TrendingUp className="h-4 w-4 text-[#7B0323]" />
                      <span className="text-xs font-medium text-[#7B0323]">
                        Trending
                      </span>
                    </div>
                  </div>
                )}
                <FeaturedCocktailCard {...cocktail} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCocktails;
