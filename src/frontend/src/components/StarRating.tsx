import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        const starKey = `star-${i + 1}`;
        return (
          <button
            key={starKey}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(i + 1)}
            className={cn(
              "transition-colors",
              interactive && "cursor-pointer hover:scale-110",
              !interactive && "cursor-default pointer-events-none",
            )}
            aria-label={interactive ? `Rate ${i + 1} stars` : undefined}
          >
            <Star
              className={cn(
                sizeMap[size],
                filled || partial
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground/40",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

interface RatingDisplayProps {
  rating?: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RatingDisplay({
  rating,
  count,
  size = "sm",
  className,
}: RatingDisplayProps) {
  if (rating === undefined) {
    return (
      <span className={cn("text-xs text-muted-foreground italic", className)}>
        No reviews yet
      </span>
    );
  }
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <StarRating rating={rating} size={size} />
      <span className="text-sm font-semibold text-foreground">
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
