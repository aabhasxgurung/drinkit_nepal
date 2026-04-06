"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Brand } from "@prisma/client";

export default function MiniBanner({ brands }: { brands: Brand[] }) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-serif mb-4 text-gray-900">
              Explore Our Premium Brands
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-sans">
              Discover our carefully curated selection of world-class spirits
              and wines, each chosen for their exceptional quality and heritage.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-xl p-6 shadow-md transition-all duration-300"
            >
              <div className="aspect-square relative mb-4 bg-white rounded-lg overflow-hidden">
                <Image
                  src={brand.logo}
                  fill
                  alt={brand.name}
                  className="object-contain p-4 duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {brand.name}
                </h3>
                <p className="text-gray-600 text-sm font-sans">
                  {brand.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
