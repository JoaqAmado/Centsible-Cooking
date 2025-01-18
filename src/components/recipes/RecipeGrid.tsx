import React from "react";
import RecipeCard from "./RecipeCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recipe {
  id: string;
  title: string;
  image: string;
  cost: number;
  prepTime: string;
  isFavorite: boolean;
}

interface RecipeGridProps {
  recipes?: Recipe[];
  onRecipeClick?: (recipeId: string) => void;
  onFavoriteClick?: (recipeId: string) => void;
  className?: string;
}

const defaultRecipes: Recipe[] = [
  {
    id: "1",
    title: "Grilled Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    cost: 15.99,
    prepTime: "25 mins",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Vegetarian Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cost: 12.5,
    prepTime: "20 mins",
    isFavorite: true,
  },
  {
    id: "3",
    title: "Chicken Stir Fry",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    cost: 10.99,
    prepTime: "30 mins",
    isFavorite: false,
  },
  {
    id: "4",
    title: "Mediterranean Pasta",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
    cost: 8.99,
    prepTime: "35 mins",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Quinoa Salad",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71",
    cost: 9.99,
    prepTime: "15 mins",
    isFavorite: true,
  },
  {
    id: "6",
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    cost: 7.99,
    prepTime: "10 mins",
    isFavorite: false,
  },
];

const RecipeGrid = ({
  recipes = defaultRecipes,
  onRecipeClick = () => {},
  onFavoriteClick = () => {},
  className = "",
}: RecipeGridProps) => {
  return (
    <div className={`w-full h-full bg-gray-50 p-6 ${className}`}>
      <ScrollArea className="h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              cost={recipe.cost}
              prepTime={recipe.prepTime}
              isFavorite={recipe.isFavorite}
              onClick={() => onRecipeClick(recipe.id)}
              onFavoriteClick={() => onFavoriteClick(recipe.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecipeGrid;
