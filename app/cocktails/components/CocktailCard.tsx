"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Droplet, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { RecipeContent } from "./RecipeContent";

interface CocktailCardProps {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  difficulty: "Easy" | "Medium" | "Advanced";
}

const CocktailCard = ({
  name,
  description,
  ingredients,
  instructions,
  imageUrl,
  difficulty,
}: CocktailCardProps) => {
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
      className="overflow-hidden flex flex-col lg:flex-row justify-center items-center w-full h-full px-4"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        willChange: "transform",
      }}
    >
      {/* Image Container */}
      <div className="overflow-hidden relative">
        <motion.div
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className="object-cover w-[400x] h-[300px] object-center"
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
          {name}
        </motion.h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 font-sans">
          {description}
        </p>

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
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <RecipeContent
                    ingredients={ingredients}
                    instructions={instructions}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="mt-4">
              <RecipeContent
                ingredients={ingredients}
                instructions={instructions}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CocktailCard;
