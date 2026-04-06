import { Clock, Droplet } from "lucide-react";
import type { CocktailIngredient } from "@prisma/client";

export const RecipeContent = ({
  ingredients,
  method,
}: {
  ingredients: CocktailIngredient[];
  method: string;
}) => (
  <div className="mt-4 gap-4 flex flex-col lg:flex-row">
    {/* Ingredients */}
    <div className="flex-1">
      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
        <Droplet className="w-4 h-4 mr-2 text-[#7B0323]" />
        Ingredients:
      </h4>
      <ul className="text-sm text-gray-600 space-y-1 pl-6 list-disc marker:text-[#7B0323] font-sans">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.amount} {ingredient.name}
          </li>
        ))}
      </ul>
    </div>

    {/* Method */}
    <div className="flex-1">
      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
        <Clock className="w-4 h-4 mr-2 text-[#7B0323]" />
        Method:
      </h4>
      <ol className="text-sm text-gray-600 space-y-2 pl-6 list-decimal font-sans">
        {method}
      </ol>
    </div>
  </div>
);
