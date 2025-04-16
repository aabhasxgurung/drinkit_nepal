"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp, Award } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import { FeaturedProduct } from "@/constants/product";

const FeaturedProducts = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto 2xl:max-w-full">
        <motion.div
          className="lg:col-span-3 lg:sticky lg:top-24 lg:h-fit"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="max-w-md">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-4"
            >
              <Award className="h-5 w-5 text-wine" />
              <span className="text-sm font-medium text-wine uppercase tracking-wider">
                Premium Selection
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl mb-4 font-serif"
            >
              Our Featured Products
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-6 font-sans"
            >
              Discover our handpicked selection of premium spirits, each bottle
              telling its own unique story of craftsmanship and tradition.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href="/products"
                className="group inline-flex items-center px-6 py-3 bg-wine text-white rounded-lg hover:bg-wine-dark transition-all duration-300"
              >
                <span className="font-medium">Discover Collection</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="lg:col-span-9 relative">
          <div className="w-full flex relative z-10">
            <Swiper
              slidesPerView={3.5}
              spaceBetween={20}
              className="mySwiper !pb-5"
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 2.1, spaceBetween: 20 },
                1280: { slidesPerView: 2.7, spaceBetween: 20 },
                1600: { slidesPerView: 3.5, spaceBetween: 20 },
              }}
            >
              {FeaturedProduct.map((product, i) => (
                <SwiperSlide
                  key={product.slug || i}
                  className="group relative mt-4 bg-white rounded-xl overflow-x-hidden transition-all duration-300"
                >
                  <div className="p-4">
                    {/* Badge for special products */}
                    {i === 0 && (
                      <div className="absolute top-6 left-6 z-10">
                        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                          <TrendingUp className="h-4 w-4 text-wine" />
                          <span className="text-xs font-medium text-wine">
                            Best Seller
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Product Rating */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">4.9</span>
                      </div>
                    </div>

                    {/* Image with gradient overlay */}
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="aspect-[4/4]">
                        <Image
                          src={product.img}
                          fill
                          alt={product.name}
                          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 "
                        />
                      </div>
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                      <p className="text-sm text-wine uppercase tracking-wider font-medium">
                        {product.category}
                      </p>
                      <h2 className="text-xl font-semibold mt-2 line-clamp-1">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-gray-600 line-clamp-2 font-sans">
                        Experience the finest craftsmanship in every bottle,
                        carefully selected for connoisseurs.
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <Link
                          href={`/products/${product.slug}`}
                          className="group inline-flex items-center text-wine hover:text-wine-dark transition-colors"
                        >
                          <span className="font-medium">View Details</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Background shape */}
          <div className="hidden lg:block w-[96.5%] h-[570px] absolute bg-[#FBF4E7] left-12 top-0 z-0" />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
