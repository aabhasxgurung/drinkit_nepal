"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import HomeWrapper from "@/components/ui/HomeWrapper";
import { cocktailsData } from "@/constants/cocktail";
import CocktailTitle from "./CocktailTitle";
import CocktailCard from "./CocktailCard";
import Modal from "@/components/ui/Modal";

const Cocktails = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[600px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src="/backgrounds/cocktailbg.jpg"
            fill
            alt="Cocktails background"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-white"
        >
          <h1 className="text-7xl font-serif mb-6">Craft Cocktails</h1>
          <p className="text-xl max-w-2xl text-center text-gray-100">
            Discover the art of mixology with our carefully curated collection
            of signature cocktails
          </p>
        </motion.div>
      </div>

      <HomeWrapper>
        <section className="z-0">
          <div className="max-w-7xl mx-auto px-6 md:px-10 hidden lg:block">
            {cocktailsData.map((cocktail, index) => (
              <div key={index}>
                <div className="">
                  <CocktailTitle
                    index={index}
                    title={cocktail.title}
                    setModal={setModal}
                    key={index}
                    category={cocktail.base}
                  />
                </div>
                <div className="lg:hidden flex flex-col gap-10">
                  <CocktailCard {...cocktail} />
                </div>
              </div>
            ))}
          </div>
          <Modal modal={modal} cocktails={cocktailsData} />
        </section>

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:hidden grid md:grid-cols-2 gap-8">
          {cocktailsData.map((cocktail, index) => (
            <div key={index}>
              <div className="lg:hidden flex flex-col gap-10">
                <CocktailCard {...cocktail} />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <section className="py-16 bg-white">
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
                    Elevate Your Home Bar
                  </h2>
                  <p className="text-gray-100 mb-8">
                    From premium spirits to professional-grade tools, find
                    everything you need to craft the perfect cocktail experience
                    at home.
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
                <div className="relative h-64 md:h-full">
                  <Image
                    src="/bar-accessories.jpg"
                    fill
                    alt="Bar accessories"
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </HomeWrapper>
    </div>
  );
};

export default Cocktails;
