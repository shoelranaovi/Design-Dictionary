import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ratings = [
  { stars: 5, percentage: 62 },
  { stars: 4, percentage: 22 },
  { stars: 3, percentage: 10 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 3 },
];

export default function CustomerReviews() {
  return (
    <Card className="max-w-md p-4 border rounded-lg shadow-md">
      <CardContent>
        <div className="text-lg font-semibold">Customer reviews</div>
        <div className="flex items-center gap-2 text-xl font-bold">
          4.3 out of 5
          <div className="flex text-yellow-500">
            {[...Array(4)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" stroke="none" />
            ))}
            <Star size={20} fill="none" stroke="currentColor" />
          </div>
        </div>
        <div className="text-sm text-gray-500">779 global ratings</div>

        <div className="mt-3 space-y-1">
          {ratings.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-2">
              <span className="w-12 text-sm">{rating.stars} star</span>
              <Progress value={rating.percentage} className="w-40" />
              <span className="text-sm">{rating.percentage}%</span>
            </div>
          ))}
        </div>

        <Button className="mt-4 w-full">Write a customer review</Button>
      </CardContent>
    </Card>
  );
}

