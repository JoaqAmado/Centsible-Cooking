import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostSummaryProps {
  weeklyBudget?: number;
  weeklySpent?: number;
  monthlyBudget?: number;
  monthlySpent?: number;
  className?: string;
}

const CostSummary = ({
  weeklyBudget = 200,
  weeklySpent = 150,
  monthlyBudget = 800,
  monthlySpent = 650,
  className,
}: CostSummaryProps) => {
  const weeklyProgress = (weeklySpent / weeklyBudget) * 100;
  const monthlyProgress = (monthlySpent / monthlyBudget) * 100;

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-red-500";
    if (progress >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className={cn("w-[300px] bg-white", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Cost Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Weekly Budget</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                ${weeklySpent.toFixed(2)} / ${weeklyBudget.toFixed(2)}
              </span>
              {weeklyProgress >= 90 && (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
          <Progress
            value={weeklyProgress}
            className={cn("h-2", getProgressColor(weeklyProgress))}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Monthly Budget</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                ${monthlySpent.toFixed(2)} / ${monthlyBudget.toFixed(2)}
              </span>
              {monthlyProgress >= 90 && (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
          <Progress
            value={monthlyProgress}
            className={cn("h-2", getProgressColor(monthlyProgress))}
          />
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-4 w-4" />
            <span>
              {monthlyProgress > 75
                ? "Over budget - consider adjusting meals"
                : "Within budget - good job!"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostSummary;
