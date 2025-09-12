'use client'

import { cn } from '@/lib/utils'

interface ProductCardSkeletonProps {
  className?: string
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm",
      className
    )}>
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="h-3 bg-gray-200 rounded-full w-16 animate-pulse" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-full w-3/4 animate-pulse" />
        </div>
        
        {/* Specs */}
        <div className="flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded-full w-12 animate-pulse" />
          <div className="w-1 h-1 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded-full w-8 animate-pulse" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded-full w-20 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded-full w-16 animate-pulse" />
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-9 bg-gray-200 rounded-xl flex-1 animate-pulse" />
          <div className="h-9 w-9 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-9 w-9 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
