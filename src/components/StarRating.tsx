import { Star } from "lucide-react";

export function StarRating({
  rating,
  reviews,
  size = 14,
}: {
  rating: number;
  reviews?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating);
          const half = !filled && i + 0.5 <= rating;
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={
                filled || half
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted-foreground/40"
              }
            />
          );
        })}
      </div>
      {reviews !== undefined && (
        <span className="text-muted-foreground">({reviews})</span>
      )}
    </div>
  );
}
