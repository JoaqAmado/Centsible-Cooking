import React from "react";
import SearchPanel from "./search/SearchPanel";
import RecipeGrid from "./recipes/RecipeGrid";
import MealCalendar from "./planner/MealCalendar";
import CostSummary from "./budget/CostSummary";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";

interface HomeProps {
  onRandomRecipe?: () => void;
}

const Home = ({ onRandomRecipe = () => {} }: HomeProps) => {
  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
  };

  const handleRecipeClick = (recipeId: string) => {
    console.log("Recipe clicked:", recipeId);
  };

  const handleFavoriteClick = (recipeId: string) => {
    console.log("Favorite clicked:", recipeId);
  };

  const handleDateSelect = (date: Date) => {
    console.log("Date selected:", date);
  };

  const handleMealDrop = (date: Date, mealType: string, recipeId: string) => {
    console.log("Meal dropped:", { date, mealType, recipeId });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6">
        <SearchPanel onSearch={handleSearch} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative">
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

        <div className="lg:w-[850px] flex gap-6">
          <MealCalendar
            onDateSelect={handleDateSelect}
            onMealDrop={handleMealDrop}
          />
          <CostSummary />
        </div>
      </div>
    </div>
  );
};

export default Home;
