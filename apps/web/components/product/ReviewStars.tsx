export function ReviewStars({
  rating = 0,
  count = 0,
}: {
  rating?: number;
  count?: number;
}) {
  const r = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.787 1.56 8.19L12 18.896 4.504 23.283l1.56-8.19L0 9.306l8.332-1.151z"
              fill={i <= r ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-600">
        {count ? `(${count})` : null}
      </span>
    </div>
  );
}
