import Tag from "../ui/Tag";

export function ReviewStars({
  rating = 0,
  count = 0,
  variant = 'inline',
  linkHref,
  className = '',
}: {
  rating?: number;
  count?: number;
  variant?: 'inline' | 'tag';
  linkHref?: string;
  className?: string;
}) {
  const r = Math.round(rating * 2) / 2;
  const TagEl: any = linkHref ? 'a' : 'span';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex text-primary">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.787 1.56 8.19L12 18.896 4.504 23.283l1.56-8.19L0 9.306l8.332-1.151z"
              fill={i <= r ? 'currentColor' : 'none'}
              stroke="currentColor"
            />
          </svg>
        ))}
      </div>
      {count > 0 && (
        variant === 'tag' ? (
          <Tag href={linkHref}>{count} đánh giá</Tag>
        ) : (
          <span className="text-sm text-gray-400">({count})</span>
        )
      )}
    </div>
  );
}
