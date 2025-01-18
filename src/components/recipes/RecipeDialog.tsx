import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, ChefHat, Utensils, CalendarDays } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

interface RecipeDialogProps {
  open: boolean;
  onClose: () => void;
  recipe?: {
    id: string;
    title: string;
    image: string;
    cost: number;
    prepTime: string;
    ingredients?: string[];
    instructions?: string[];
    difficulty?: string;
  };
  onAddToCalendar?: (recipeId: string, mealType: string, date: Date) => void;
}

const RecipeDialog = ({
  open,
  onClose,
  recipe,
  onAddToCalendar = () => {},
}: RecipeDialogProps) => {
  const [selectedMealType, setSelectedMealType] = React.useState("breakfast");
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{recipe.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipe Details */}
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <span className="text-lg">${recipe.cost.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="text-lg">{recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-gray-600" />
                <span className="text-lg">{recipe.difficulty || "Medium"}</span>
              </div>
            </div>
          </div>

          {/* Add to Calendar Section */}
          <div className="space-y-6">
            {/* Ingredients List */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Utensils className="h-5 w-5" /> Ingredients & Instructions
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {(recipe.ingredients || []).map((ingredient, index) => (
                  <li key={index} className="text-gray-600">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Meal Type and Date Picker */}
            <div className="space-y-4">
              <Select
                value={selectedMealType}
                onValueChange={setSelectedMealType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" /> Select a Date
                </h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-fit rounded-md border"
                />
              </div>

              {/* Add to Calendar Button */}
              <Button
                onClick={() =>
                  onAddToCalendar(recipe.id, selectedMealType, selectedDate)
                }
              >
                Add to Calendar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDialog;
