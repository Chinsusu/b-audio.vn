export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-darkBg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="h-4 bg-darkGrey/40 rounded w-48 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image skeleton */}
            <div className="aspect-square bg-darkGrey/60 rounded-2xl"></div>
            
            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="h-10 bg-darkGrey/60 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-darkGrey/40 rounded"></div>
                <div className="h-4 bg-darkGrey/40 rounded w-5/6"></div>
                <div className="h-4 bg-darkGrey/40 rounded w-4/6"></div>
              </div>
              <div className="h-8 bg-goldAccent/30 rounded w-32"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-goldAccent/60 rounded w-32"></div>
                <div className="h-12 bg-darkGrey/60 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
