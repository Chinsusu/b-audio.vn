export default function SkeletonCard() {
  return (
    <div className="bg-cardBg/40 backdrop-blur-sm border border-darkGrey rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-darkGrey/60"></div>
      <div className="p-6">
        <div className="h-5 bg-darkGrey/60 rounded mb-2"></div>
        <div className="h-4 bg-darkGrey/40 rounded mb-4 w-3/4"></div>
        <div className="h-6 bg-goldAccent/30 rounded w-24"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
