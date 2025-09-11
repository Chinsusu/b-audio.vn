'use client'

import { useState } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { useWishlist } from '../../hooks/useWishlist'
import { toast } from '@/lib/toast'
import { WishlistItem } from '../../lib/wishlist'

interface WishlistButtonProps {
  product: {
    id: string
    slug: string
    attributes: {
      title: string
      price_vnd?: number
      images?: { data?: Array<{ attributes?: { url: string } }> }
    }
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'button'
  className?: string
}

export default function WishlistButton({ 
  product, 
  size = 'md', 
  variant = 'icon',
  className = '' 
}: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlist()
  const [isLoading, setIsLoading] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const handleToggle = async () => {
    setIsLoading(true)
    
    try {
      const wishlistItem: Omit<WishlistItem, 'addedAt'> = {
        id: product.id,
        slug: product.slug,
        title: product.attributes.title,
        price: product.attributes.price_vnd || 0,
        imageUrl: product.attributes.images?.data?.[0]?.attributes?.url,
      }

      const wasAdded = toggleItem(wishlistItem)
      
      // Show appropriate toast
      if (wasAdded) {
        toast.success('Đã thêm vào yêu thích', `${product.attributes.title}`)
      } else {
        toast.info('Đã xóa khỏi yêu thích', `${product.attributes.title}`)
      }
      
    } catch (error) {
      console.error('Failed to toggle wishlist item:', error)
    } finally {
      setTimeout(() => setIsLoading(false), 300)
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading} aria-busy={isLoading}
        className={`flex items-center gap-2 rounded-2xl px-4 py-2 font-medium transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2 ${
          inWishlist 
            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
        } ${className}`}
      >
        
        {isLoading ? (
          <>
            <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
            Đang xử lý...
          </>
        ) : (
          <>
            <Heart 
              className={`${iconSizeClasses[size]} transition-transform duration-200`}
              fill={inWishlist ? 'currentColor' : 'none'} 
            />
            {inWishlist ? 'Đã yêu thích' : 'Yêu thích'}
          </>
        )}
    
      </button>
    )
  }

  // Icon variant
  return (
    <button
      onClick={handleToggle}
      disabled={isLoading} aria-busy={isLoading}
      className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2 ${
        inWishlist 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm'
      } ${className}`}
      title={inWishlist ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
    >
      
      {isLoading ? (
        <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
      ) : (
        <Heart 
          className={`${iconSizeClasses[size]} transition-all duration-200`} 
          fill={inWishlist ? 'currentColor' : 'none'} 
        />
      )}
    
    </button>
  )
}
