'use client';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { toast } from '../../lib/toast';
import { CartItem } from '../../lib/cart';

interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    attributes: {
      title: string;
      price_vnd?: number;
      images?: { data?: Array<{ attributes?: { url: string } }> };
    };
  };
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function AddToCartButton({ product, className = '', variant = 'primary' }: AddToCartButtonProps) {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      const cartItem: Omit<CartItem, 'quantity'> = {
        id: product.id,
        slug: product.slug,
        title: product.attributes.title,
        price: product.attributes.price_vnd || 0,
        imageUrl: product.attributes.images?.data?.[0]?.attributes?.url,
        maxQuantity: 10, // Default limit
      };

      addItem(cartItem, 1);
      
      // Optional: Show success feedback
      // You can implement a toast notification here
      
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // Handle error (show error message)
    } finally {
      setIsAdding(false);
    }
  };

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const baseClasses = "rounded-lg px-4 py-2 font-medium transition-all duration-200 disabled:opacity-50";
  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800 active:scale-95",
    secondary: "border border-black text-black hover:bg-black hover:text-white"
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isAdding ? (
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Đang thêm...
        </span>
      ) : inCart ? (
        `Trong giỏ (${quantity})`
      ) : (
        'Thêm vào giỏ'
      )}
    </button>
  );
}
