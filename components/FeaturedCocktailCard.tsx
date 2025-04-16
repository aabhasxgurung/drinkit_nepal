"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Droplet, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { CocktailDataProps } from "@/constants/cocktail";

const FeaturedCocktailCard = ({
  title,
  description,
  ingredients,
  imageUrl,
  difficulty,
  method,
}: CocktailDataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const difficultyConfig = {
    Easy: {
      color: "bg-green-50 text-green-700",
      icon: <Droplet className="w-4 h-4 mr-1" />,
    },
    Medium: {
      color: "bg-amber-50 text-amber-700",
      icon: <Droplet className="w-4 h-4 mr-1" />,
    },
    Advanced: {
      color: "bg-red-50 text-red-700",
      icon: <Droplet className="w-4 h-4 mr-1" />,
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image Container */}
      <div className="overflow-hidden relative">
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={400}
            className="object-cover w-full md:w-[400x] h-[300px] object-center"
          />
        </motion.div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${difficultyConfig[difficulty].color}`}
          >
            {difficultyConfig[difficulty].icon}
            {difficulty}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-xl font-medium text-gray-900 mb-2"
          animate={{ color: isHovered ? "#7B0323" : "#111827" }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 font-sans">
          {description}
        </p>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-[#7B0323] text-sm font-medium hover:text-[#9B0C3C] transition-colors focus:outline-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="ml-1 w-4 h-4" />
            </>
          ) : (
            <>
              Show recipe <ChevronDown className="ml-1 w-4 h-4" />
            </>
          )}
        </motion.button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4">
                {/* Ingredients */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-[#7B0323]" />
                    Ingredients:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 pl-6 list-disc marker:text-[#7B0323] font-sans">
                    {ingredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {ingredient}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-[#7B0323]" />
                    Method:
                  </h4>
                  <ol className="text-sm text-gray-600 space-y-2 pl-6 list-decimal font-sans">
                    {method}
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FeaturedCocktailCard;
