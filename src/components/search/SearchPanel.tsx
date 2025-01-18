import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface SearchPanelProps {
  onSearch?: (searchParams: SearchParams) => void;
  defaultBudget?: number;
  defaultDietaryRestrictions?: string[];
  defaultIngredients?: string[];
  defaultDifficulty?: string;
  defaultPrepTime?: number;
}

interface SearchParams {
  budget: number;
  dietaryRestrictions: string[];
  ingredients: string[];
  difficulty: string;
  prepTime: number;
}

const SearchPanel = ({
  onSearch = () => {},
  defaultBudget = 15,
  defaultDietaryRestrictions = ["Vegetarian"],
  defaultIngredients = ["Tomatoes", "Pasta"],
  defaultDifficulty = "Medium",
  defaultPrepTime = 30,
}: SearchPanelProps) => {
  const [budget, setBudget] = React.useState(defaultBudget);
  const [ingredients, setIngredients] = React.useState(defaultIngredients);
  const [newIngredient, setNewIngredient] = React.useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = React.useState(
    defaultDietaryRestrictions,
  );
  const [difficulty, setDifficulty] = React.useState(defaultDifficulty);
  const [prepTime, setPrepTime] = React.useState(defaultPrepTime);

  const handleSearch = () => {
    onSearch({
      budget,
      dietaryRestrictions,
      ingredients,
      difficulty,
      prepTime,
    });
  };

  const handleAddIngredient = () => {
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="space-y-4">
            <Label>Budget per meal (${budget})</Label>
            <Slider
              value={[budget]}
              onValueChange={(value) => setBudget(value[0])}
              max={50}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <Label>Ingredients</Label>
            <div className="flex gap-2">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient"
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddIngredient();
                  }
                }}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleAddIngredient}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {ingredient}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleRemoveIngredient(ingredient)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Dietary Restrictions</Label>
            <Select
              value={dietaryRestrictions[0]}
              onValueChange={(value) => setDietaryRestrictions([value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select restriction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                <SelectItem value="Vegan">Vegan</SelectItem>
                <SelectItem value="Gluten-Free">Gluten-Free</SelectItem>
                <SelectItem value="Dairy-Free">Dairy-Free</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Difficulty Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Max Prep Time ({prepTime} mins)</Label>
            <Slider
              value={[prepTime]}
              onValueChange={(value) => setPrepTime(value[0])}
              max={120}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSearch}>Search Recipes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchPanel;
