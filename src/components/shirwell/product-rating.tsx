import { Star } from "lucide-react";

type ProductRatingProps = {
  rating: number;
  reviewCount: number;
};

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const roundedUp = rating - fullStars >= 0.75;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < fullStars || (i === fullStars && roundedUp);
          const half = i === fullStars && hasHalf;

          return (
            <Star
              key={i}
              className={`h-3 w-3 ${
                filled
                  ? "fill-[#FFC107] text-[#FFC107]"
                  : half
                    ? "fill-[#FFC107]/50 text-[#FFC107]/50"
                    : "fill-zinc-600 text-zinc-600"
              }`}
            />
          );
        })}
      </div>
      <span className="text-[11px] text-zinc-500">({reviewCount.toLocaleString()})</span>
    </div>
  );
}
