"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import HomeWrapper from "@/components/ui/HomeWrapper";
import type { CocktailWithIngredients } from "@/lib/types";
import CocktailTitle from "./CocktailTitle";
import CocktailCard from "./CocktailCard";
import Modal from "@/components/ui/Modal";

export default function Cocktails({
  cocktails,
}: {
  cocktails: CocktailWithIngredients[];
}) {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
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
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-black mb-4">
              Our Cocktails
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto px-4 font-sans">
              Discover our carefully curated selection of Cocktail
            </p>
          </motion.div>
        </div>
      </div>

      <HomeWrapper>
        <section className="z-0">
          <div className="max-w-7xl mx-auto px-6 md:px-10 hidden lg:block">
            {cocktails.map((cocktail, index) => (
              <div key={cocktail.id}>
                <CocktailTitle
                  index={index}
                  title={cocktail.title}
                  setModal={setModal}
                  category={cocktail.base}
                />
              </div>
            ))}
          </div>
          <Modal modal={modal} cocktails={cocktails} />
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cocktails.map((cocktail) => (
            <div key={cocktail.id} className="flex flex-col h-full">
              <CocktailCard {...cocktail} />
            </div>
          ))}
        </div>

        <section className="py-16 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-[#7B0323] to-[#9B0C3C] rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div className="text-white">
                  <h2 className="text-3xl font-semibold mb-4">
                    Elevate Your Bar
                  </h2>
                  <p className="text-gray-100 mb-8 font-sans">
                    Take a look at our premium Gins, wines to liquers
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-6 py-3 bg-white text-[#7B0323] font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Explore Products
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="relative h-80 md:h-80">
                  <Image
                    src="/home/bar-accessories.jpg"
                    fill
                    alt="Bar accessories"
                    className="object-cover object-center rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </HomeWrapper>
    </div>
  );
}
