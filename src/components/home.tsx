import React from "react";
import SearchPanel from "./search/SearchPanel";
import RecipeGrid from "./recipes/RecipeGrid";
import MealCalendar from "./planner/MealCalendar";
import CostSummary from "./budget/CostSummary";
import RecipeDialog from "./recipes/RecipeDialog";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";

interface HomeProps {
  onRandomRecipe?: () => void;
}

const Home = ({ onRandomRecipe = () => {} }: HomeProps) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<any>(null);

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
  };

  const handleRecipeClick = (recipeId: string) => {
    // In a real app, you would fetch the recipe details here
    const recipe = defaultRecipes.find((r) => r.id === recipeId);
    setSelectedRecipe(recipe);
  };

  const handleFavoriteClick = (recipeId: string) => {
    console.log("Favorite clicked:", recipeId);
  };

  const handleDateSelect = (date: Date) => {
    console.log("Date selected:", date);
  };

  const handleAddToCalendar = (recipeId: string, mealType: string) => {
    console.log("Adding to calendar:", { recipeId, mealType });
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Centsible Cooking
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Smart meal planning for your budget
        </p>
      </div>

      <div className="mb-6">
        <SearchPanel onSearch={handleSearch} />
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative min-h-[600px]">
          <RecipeGrid
            onRecipeClick={handleRecipeClick}
            onFavoriteClick={handleFavoriteClick}
          />
          <Button
            className="fixed bottom-6 right-6 rounded-full h-12 w-12"
            onClick={onRandomRecipe}
            size="icon"
          >
            <Dices className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MealCalendar onDateSelect={handleDateSelect} />
          <CostSummary />
        </div>
      </div>

      <RecipeDialog
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        recipe={selectedRecipe}
        onAddToCalendar={handleAddToCalendar}
      />
    </div>
  );
};

const defaultRecipes = [
  {
    id: "1",
    title: "Grilled Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    cost: 15.99,
    prepTime: "25 mins",
    difficulty: "Medium",
    ingredients: [
      "4 oz salmon fillet",
      "1 bunch asparagus",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "1 lemon",
    ],
    isFavorite: false,
  },
  // ... other recipes
];

export default Home;
