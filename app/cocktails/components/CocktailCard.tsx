"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplet, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { RecipeContent } from "./RecipeContent";
import { CocktailDataProps } from "@/constants/cocktail";

const CocktailCard = ({
  description,
  ingredients,
  imageUrl,
  difficulty,
  method,
  garnish,
  title,
}: CocktailDataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

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
      className="overflow-hidden flex flex-col lg:flex-row w-full h-full lg:py-8 lg:px-12 lg:items-start rounded-xl"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        willChange: "transform",
      }}
    >
      {/* Left Column – Bottle and Label (lg:) */}
      <div className="relative lg:w-2/5 flex flex-col items-center text-center lg:px-4">
        <h2 className="hidden lg:block text-[#7B0323] text-3xl font-serif leading-tight my-4">
          &quot;{title}&quot;
        </h2>

        <Image
          src={imageUrl}
          alt={title}
          width={450}
          height={400}
          className="object-cover w-full md:w-[400x] h-[300px] object-center"
        />
        <div className="absolute top-4 right-4 lg:hidden">
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

      {/* Right Column – Recipe Info (lg:) */}
      <div className="p-6 lg:w-3/5 lg:flex lg:flex-col lg:items-center">
        <motion.h3
          className="text-xl font-medium text-gray-900 mb-2 lg:hidden"
          animate={{ color: isHovered ? "#7B0323" : "#111827" }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 font-sans lg:hidden">
          {description}
        </p>
        <div className="hidden lg:block w-12 border-t border-gray-400 mb-6" />

        <h4 className="italic font-semibold mb-2 hidden lg:block">
          Ingredients:
        </h4>
        <ul className="text-center mb-6 text-sm hidden lg:block">
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {isMobile && (
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
        )}

        <AnimatePresence>
          {isMobile ? (
            isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <RecipeContent ingredients={ingredients} method={method} />
              </motion.div>
            )
          ) : (
            // lg: Desktop Method / Garnish / Glass
            <div className="hidden lg:grid grid-cols-3 divide-x divide-gray-300 text-center text-sm w-full border-t pt-4">
              <div className="px-4">
                <p className="italic font-semibold mb-1">Method:</p>
                <p>{method}</p>
              </div>
              <div className="px-4">
                <p className="italic font-semibold mb-1">Garnish:</p>
                <p>{garnish}</p>
              </div>
              <div className="px-4">
                <p className="italic font-semibold mb-1">Glass:</p>
                <p>🥂</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CocktailCard;
