"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Wine, Grape, Award, Star, Users } from "lucide-react";

const stats = [
  { icon: Wine, label: "Premium Wines", value: "100+" },
  { icon: Award, label: "Years Experience", value: "3+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Star, label: "Expert Reviews", value: "50+" },
];

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[600px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/home/about.jpg"
                  fill
                  alt="Wine cellar"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                <Grape className="w-12 h-12 text-[#7B0323]" />
              </div>
            </div>

            <div className="lg:pl-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-4xl font-bold mb-6 text-gray-900">
                  Welcome to{" "}
                  <span className="text-[#7B0323] text-5xl font-serif block mt-2">
                    Drink It Nepal
                  </span>
                </h1>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed font-sans text-justify">
                  Since 2020, we&apos;ve been curating exceptional wine and gin
                  experiences for Nepal&apos;s most discerning palates. Our
                  journey began with a simple vision: to bring the world&apos;s
                  finest spirits to your glass.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="bg-white p-4 rounded-lg shadow-sm text-center"
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-[#7B0323]" />
                      <div className="font-bold text-2xl text-[#7B0323]">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 font-sans text-justify">
                <p>
                  With a passion for excellence and a deep understanding of fine
                  spirits, we&apos;ve cultivated partnerships with the
                  world&apos;s most prestigious wineries and distilleries. Our
                  carefully curated selection represents the perfect balance of
                  tradition and innovation.
                </p>
                <p>
                  Every bottle in our collection tells a story - of sun-drenched
                  vineyards, of age-old traditions, of master craftsmen pursuing
                  perfection. We&apos;re not just distributors; we&apos;re
                  storytellers, sharing these tales with every pour.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Promise</h2>
              <div className="space-y-4 text-gray-600 font-sans text-justify">
                <p>
                  We believe that every moment of celebration deserves to be
                  paired with the perfect drink. Whether youre a seasoned
                  connoisseur or just beginning your journey into the world of
                  fine wines and spirits, our team is here to guide you.
                </p>
                <p>
                  From intimate gatherings to grand celebrations, we&apos;re
                  committed to elevating your experience with exceptional
                  service and unparalleled expertise. Let us help you discover
                  the perfect pour for every occasion.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default About;
