'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/cart';

export default function CartDrawer() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (cart.itemCount === 0) {
    return (
      <button className="relative p-2 text-gray-600 hover:text-black">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19" />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-black"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19" />
        </svg>
        {cart.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.itemCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Giỏ hàng ({cart.itemCount})</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              
              <div className="flex-1">
                <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {formatPrice(item.price)}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  
                  <span className="text-sm font-medium px-2">{item.quantity}</span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                    disabled={item.quantity >= (item.maxQuantity || 99)}
                  >
                    +
                  </button>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-red-600 hover:text-red-800 text-sm"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="font-bold text-lg">{formatPrice(cart.total)}</span>
          </div>
          
          <div className="space-y-2">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-gray-100 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Xem giỏ hàng
            </Link>
            
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
