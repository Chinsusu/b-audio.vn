'use client'

import { ProductCardSkeleton } from './ProductCardSkeleton'
import { cn } from '@/lib/utils'

interface ProductGridSkeletonProps {
  count?: number
  className?: string
}

export function ProductGridSkeleton({ 
  count = 12,
  className 
}: ProductGridSkeletonProps) {
  return (
    <div className={cn(
      // Grid responsive: 2 cột mobile, 3-4 cột desktop theo wireframes
      "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6",
      className
    )}>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
