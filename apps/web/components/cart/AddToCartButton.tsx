'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { toast } from '@/lib/toast'
import LoadingButton from '../ui/LoadingButton'
import { CartItem } from '../../lib/cart'

interface AddToCartButtonProps {
  product: {
    id: string
    slug: string
    attributes: {
      title: string
      price_vnd?: number
      images?: { data?: Array<{ attributes?: { url: string } }> }
    }
  }
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function AddToCartButton({ 
  product, 
  className = '', 
  variant = 'primary' 
}: AddToCartButtonProps) {
  const { addItem, isInCart, getItemQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    try {
      const cartItem: Omit<CartItem, 'quantity'> = {
        id: product.id,
        slug: product.slug,
        title: product.attributes.title,
        price: product.attributes.price_vnd || 0,
        imageUrl: product.attributes.images?.data?.[0]?.attributes?.url,
        maxQuantity: 10, // Default limit
      }

      addItem(cartItem, 1)
      
      // Show success toast
      toast.success('Đã thêm vào giỏ hàng', `${product.attributes.title}`)
      
    } catch (err) {
      console.error('Failed to add item to cart:', err)
      toast.error('Có lỗi xảy ra', 'Không thể thêm sản phẩm vào giỏ hàng')
    } finally {
      setIsAdding(false)
    }
  }

  const inCart = isInCart(product.id)
  const quantity = getItemQuantity(product.id)

  return (
    <LoadingButton
      onClick={handleAddToCart}
      loading={isAdding}
      loadingText="Đang thêm..."
      variant={variant}
      className={className}
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      {inCart ? `Trong giỏ (${quantity})` : 'Thêm vào giỏ'}
    </LoadingButton>
  )
}
