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
    for (let i = 0; i < defaultRecipes.length; i++){
      if (defaultRecipes[i].id == recipeId){
        setSelectedRecipe(defaultRecipes[i]);
      }
    }
  };

  const handleFavoriteClick = (recipeId: string) => {
    console.log("Favorite clicked:", recipeId);
    for (let i = 0; i < defaultRecipes.length; i++){
      if (defaultRecipes[i].id == recipeId){
        console.log(defaultRecipes[i].isFavorite);
        defaultRecipes[i].isFavorite = !defaultRecipes[i].isFavorite;
        console.log(defaultRecipes[i].isFavorite);
      }
    }
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
            recipes = {defaultRecipes}
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
  {
    id: "2",
    title: "Vegetarian Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cost: 12.5,
    prepTime: "20 mins",
    ingredients: ["1 cup, Quinoa (cooked)", "1 cup, Mixed Greens", "1/2 cup, Cucumber (sliced)", "1/2 cup, Carrot (shredded)", "1/4, Avocado (sliced)", "1/2 cup, Tomato (diced)", "1/2 cup, Bell Pepper (sliced)", "1/2 cup, Edamame (cooked)", "1/2 cup, Chickpeas (cooked or canned, rinsed)", "1/2 cup, Tofu (cubed and pan-fried)", "1 tablespoon, Olive Oil", "1 tablespoon, Lemon Juice", "1 tablespoon, Balsamic Vinegar"],
    isFavorite: true,
  },
  {
    id: "3",
    title: "Chicken Stir Fry",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    cost: 10.99,
    prepTime: "30 mins",
    ingredients: ["2 pounds, Boneless, Skinless Chicken Breast", "1/2 cup, Cornstarch", "1/4 cup, Soy Sauce", "2 tablespoons, Sesame Oil", "1 tablespoon, Rice Vinegar", "1 teaspoon, Ginger (minced)", "1 teaspoon, Garlic (minced)", "1/2 cup, Broccoli Florets", "1/2 cup, Carrots (sliced)", "1/2 cup, Snap Peas", "1/4 cup, Red Bell Pepper (sliced)", "1/4 cup, Onion (sliced)", "2 tablespoons, Vegetable Oil"],
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
  {
    id: "7",
    title: "Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
    cost: 11.99,
    prepTime: "45 mins",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Spicy Tofu Stir-Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    cost: 9.5,
    prepTime: "25 mins",
    isFavorite: false,
  },
  {
    id: "9",
    title: "Greek Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    cost: 8.5,
    prepTime: "15 mins",
    isFavorite: false,
  },
  // ... other recipes
];

export default Home;
