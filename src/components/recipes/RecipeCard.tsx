import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  title?: string;
  image?: string;
  cost?: number;
  prepTime?: string;
  isFavorite?: boolean;
  onFavoriteClick?: (isFavorite: boolean) => void;
  onClick?: () => void;
  className?: string;
}

const RecipeCard = ({
  title = "Delicious Recipe",
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  cost = 12.99,
  prepTime = "30 mins",
  isFavorite: initialFavorite,
  onFavoriteClick = () => {return false},
  onClick = () => {},
  className,
}: RecipeCardProps) => {
  const [isFavorite,setIsFavorite] = useState(initialFavorite)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering `onClick` for the card
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    onFavoriteClick(newFavoriteStatus); // Notify parent if needed
  };

  return (
    <Card
      className={cn(
        "w-[280px] h-[320px] bg-white cursor-pointer hover:shadow-lg transition-shadow duration-200",
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="p-0 h-40 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={cn(
                "h-5 w-5",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-500",
              )}
            />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{cost.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{prepTime}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
