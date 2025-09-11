export default function ProductCardSkeleton() {
  return (
    <div className="group rounded-2xl border p-4 shadow-soft animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square w-full rounded-xl bg-gray-200" />
      
      {/* Title skeleton */}
      <div className="mt-3 h-5 w-2/3 rounded bg-gray-200" />
      
      {/* Price skeleton */}
      <div className="mt-2 h-4 w-1/3 rounded bg-gray-200" />
      
      {/* Buttons skeleton */}
      <div className="mt-3 flex items-center gap-2">
        {/* Add to cart button skeleton */}
        <div className="flex-1 h-10 rounded-lg bg-gray-200" />
        
        {/* Wishlist button skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        
        {/* Compare button skeleton */}
        <div className="w-10 h-10 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
