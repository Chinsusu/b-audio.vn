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
      <button className="relative flex items-center justify-center h-10 w-10 rounded-2xl border border-darkGrey text-textGrey hover:text-textWhite hover:bg-darkGrey/60 transition-colors focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="relative flex items-center justify-center h-10 w-10 rounded-2xl border border-darkGrey text-textGrey hover:text-textWhite hover:bg-darkGrey/60 transition-colors focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
        title="Giỏ hàng"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19" />
        </svg>
        {cart.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-goldAccent text-darkBg text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {cart.itemCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-darkBg/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-darkGrey/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 z-50 border-l border-darkGrey ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-darkGrey">
          <h2 className="font-heading text-h3 text-textWhite font-semibold">GIỎ HÀNG ({cart.itemCount})</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-darkGrey/60 rounded-2xl text-textGrey hover:text-textWhite transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border border-darkGrey rounded-2xl bg-darkBg/40 backdrop-blur-sm">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl"
                />
              )}
              
              <div className="flex-1">
                <h3 className="font-semibold text-textWhite text-sm line-clamp-2">{item.title}</h3>
                <p className="text-goldAccent font-semibold mt-1">
                  {formatPrice(item.price)}
                </p>
                
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-xl border border-darkGrey bg-darkBg flex items-center justify-center hover:bg-darkGrey/60 text-textWhite disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  
                  <span className="text-textWhite font-medium px-2 min-w-[2rem] text-center">{item.quantity}</span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-xl border border-darkGrey bg-darkBg flex items-center justify-center hover:bg-darkGrey/60 text-textWhite disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={item.quantity >= (item.maxQuantity || 99)}
                  >
                    +
                  </button>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto text-neonTurquoise hover:text-textWhite font-microcopy text-xs tracking-widest transition-colors"
                  >
                    XÓA
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-darkGrey p-6 space-y-4 bg-darkBg/60 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <span className="font-microcopy text-microcopy text-goldAccent tracking-widest">TỔNG CỘNG:</span>
            <span className="font-heading text-h3 text-textWhite">{formatPrice(cart.total)}</span>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-darkGrey/60 border border-darkGrey text-textWhite text-center py-4 rounded-2xl font-semibold hover:bg-darkGrey hover:border-goldAccent/50 transition-all duration-300"
            >
              Xem giỏ hàng
            </Link>
            
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-goldAccent text-darkBg text-center py-4 rounded-2xl font-bold hover:shadow-glowGoldHover transition-all duration-300 transform hover:scale-105"
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
