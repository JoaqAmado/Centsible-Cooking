import React from "react";
import SearchPanel from "./search/SearchPanel";
import RecipeGrid from "./recipes/RecipeGrid";
import MealCalendar from "./planner/MealCalendar";
import CostSummary from "./budget/CostSummary";
import RecipeDialog from "./recipes/RecipeDialog";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";

import axios from 'axios';

const queryGemini = async (prompt: string): Promise<string> => {
  const API_KEY = "AIzaSyCcp85pNE3nD-hdoY_YmW4t7CW5y_BMzC8";
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error querying Gemini:', error);
    return 'An error occurred while querying Gemini.';
  }
};

//Create prompt for Gemini based on search parameters
function searchParamsToPrompt(searchParams: any): string{

  var prompt: string = "Give me 10 "
  if (searchParams.dietaryRestrictions != "none"){
    prompt += searchParams.dietaryRestrictions;
    prompt += " ";
  } 
  prompt += "recipes that must contain the following ingredients: ";
  for (let i = 0; i < searchParams.ingredients.length; i++){
    prompt += searchParams.ingredients[i];
    if (i == searchParams.ingredients.length - 1){
      prompt += ". ";
    }
    else{
      prompt += ", ";
    }
  }

  prompt += "The recipe should be " + searchParams.difficulty + " difficulty and should take no longer than " + searchParams.prepTime + " minutes to make. ";
  prompt += "Lastly, the meal should cost no more than $" + searchParams.budget + ".";

  return prompt;

}


interface HomeProps {
  onRandomRecipe?: () => void;
}

const Home = ({ onRandomRecipe = () => {} }: HomeProps) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState<any>(null);

  const handleSearch = (searchParams: any) => {
    console.log("Search params:", searchParams);
    console.log(searchParamsToPrompt(searchParams));
    queryGemini(searchParamsToPrompt(searchParams)).then(result => console.log(result));
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
