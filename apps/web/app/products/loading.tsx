import { SkeletonGrid } from '../../components/ui/loading/SkeletonCard';

export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-darkBg py-20">
      <div className="container mx-auto px-4">
        {/* Header skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-12 bg-darkGrey/60 rounded w-64 mb-4"></div>
          <div className="h-6 bg-darkGrey/40 rounded w-96 mb-8"></div>
        </div>

        {/* Filters skeleton */}
        <div className="mb-8 flex gap-4 animate-pulse">
          <div className="h-10 bg-darkGrey/60 rounded w-32"></div>
          <div className="h-10 bg-darkGrey/60 rounded w-32"></div>
          <div className="h-10 bg-darkGrey/60 rounded w-32"></div>
        </div>

        {/* Products grid skeleton */}
        <SkeletonGrid count={9} />
      </div>
    </div>
  );
}
