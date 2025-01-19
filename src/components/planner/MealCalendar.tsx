import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MealPlan {
  date: Date;
  meals: {
    type: "breakfast" | "lunch" | "dinner";
    recipe: {
      title: string;
      cost: number;
    };
  }[];
}

interface MealCalendarProps {
  mealPlans?: MealPlan[];
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

const MealCalendar = ({
  mealPlans = [
    {
      date: new Date(),
      meals: [
        {
          type: "breakfast",
          recipe: { title: "Oatmeal with Berries", cost: 3.5 },
        },
        { type: "lunch", recipe: { title: "Chicken Salad", cost: 8.75 } },
        { type: "dinner", recipe: { title: "Pasta Primavera", cost: 6.25 } },
      ],
    },
  ],
  onDateSelect = () => {},
  selectedDate = new Date(),
}: MealCalendarProps) => {
  const [currentDate, setCurrentDate] = React.useState<Date>(selectedDate);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
      onDateSelect(date);
    }
  };

  const selectedDayMeals =
    mealPlans.find(
      (plan) =>
        format(plan.date, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd"),
    )?.meals || [];

  return (
    <Card className="w-full h-[700px] bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Meal Calendar
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(currentDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(currentDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid justify-center">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={handleDateSelect}
            className="w-max rounded-md border"
          />
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">
            Meals for {format(currentDate, "MMMM d, yyyy")}
          </h3>
          <ScrollArea className="h-[250px] w-full rounded-md border p-4">
            <div className="space-y-4">
              {["breakfast", "lunch", "dinner"].map((mealType) => (
                <div key={mealType} className="p-4 rounded-lg border">
                  <h4 className="text-sm font-medium capitalize mb-2">
                    {mealType}
                  </h4>
                  {selectedDayMeals.find((meal) => meal.type === mealType) ? (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {
                          selectedDayMeals.find(
                            (meal) => meal.type === mealType,
                          )?.recipe.title
                        }
                      </span>
                      <span className="text-sm text-muted-foreground">
                        $
                        {selectedDayMeals
                          .find((meal) => meal.type === mealType)
                          ?.recipe.cost}
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No meal planned
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCalendar;
