'use client';
import { useState } from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import { WishlistItem } from '../../lib/wishlist';

interface WishlistButtonProps {
  product: {
    id: string;
    slug: string;
    attributes: {
      title: string;
      price_vnd?: number;
      images?: { data?: Array<{ attributes?: { url: string } }> };
    };
  };
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

export default function WishlistButton({ 
  product, 
  size = 'md', 
  variant = 'icon',
  className = '' 
}: WishlistButtonProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleToggle = async () => {
    setIsAnimating(true);
    
    try {
      const wishlistItem: Omit<WishlistItem, 'addedAt'> = {
        id: product.id,
        slug: product.slug,
        title: product.attributes.title,
        price: product.attributes.price_vnd || 0,
        imageUrl: product.attributes.images?.data?.[0]?.attributes?.url,
      };

      const wasAdded = toggleItem(wishlistItem);
      
      // Optional: Show toast notification here
      // You can implement a toast context for better UX
      
    } catch (error) {
      console.error('Failed to toggle wishlist item:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
          inWishlist 
            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
        } ${className}`}
      >
        <svg 
          className={`${iconSizeClasses[size]} transition-transform duration-200 ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`} 
          fill={inWishlist ? 'currentColor' : 'none'} 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        {inWishlist ? 'Đã yêu thích' : 'Yêu thích'}
      </button>
    );
  }

  // Icon variant
  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
        inWishlist 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm'
      } ${className}`}
      title={inWishlist ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
    >
      <svg 
        className={`${iconSizeClasses[size]} transition-all duration-200 ${
          isAnimating ? 'scale-110' : 'scale-100'
        }`} 
        fill={inWishlist ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
}
