"use client";
import { ArrowRight,Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/cart";
import { mediaUrl } from "../../utils/mediaUrl";

export default function CartDrawer() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (cart.itemCount === 0) {
    return (
      <button className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-secondary-800 border border-gray-600 text-neutral-300 hover:text-primary hover:border-primary transition-industrial focus-industrial">
        <ShoppingCart className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-secondary-800 border border-gray-600 text-neutral-300 hover:text-primary hover:border-primary transition-industrial focus-industrial"
        title="Giỏ hàng"
      >
        <ShoppingCart className="h-5 w-5" />
        {cart.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-secondary-700 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-gold-glow">
            {cart.itemCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-secondary-900/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] glass-industrial shadow-deep transform transition-transform duration-300 z-50 border-l border-gray-600 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-600">
          <h2 className="font-heading text-h3 text-neutral-100 font-bold uppercase tracking-wide">
            GIỎ HÀNG ({cart.itemCount})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-secondary-800 border border-gray-600 text-neutral-400 hover:text-primary hover:border-primary transition-industrial"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {cart.items.map((item) => (
            <div key={item.id} className="card-industrial p-4 group">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-secondary-800 border border-gray-600 flex-shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={mediaUrl(item.imageUrl)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl">🔊</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-body-sm text-neutral-100 group-hover:text-primary transition-colors duration-300 uppercase tracking-wide line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-h5 font-heading text-primary font-bold mt-1">
                    {formatPrice(item.price)} ₫
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center bg-secondary-800 border border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="p-1 hover:bg-secondary-700 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3 text-neutral-400" />
                      </button>
                      <span className="px-3 py-1 text-neutral-100 font-heading text-body-sm min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-secondary-700 transition-colors"
                      >
                        <Plus className="h-3 w-3 text-neutral-400" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-neutral-400 hover:text-red-400 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-600 p-6 space-y-4 bg-secondary-800/50">
          {/* Total */}
          <div className="flex justify-between items-center py-2">
            <span className="font-heading text-body-sm text-neutral-400 uppercase tracking-wide">
              TỔNG CỘNG:
            </span>
            <span className="font-heading text-h3 text-primary font-bold">
              {formatPrice(cart.total)} ₫
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="btn-secondary w-full"
            >
              XEM GIỎ HÀNG
            </Link>

            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full group"
            >
              <span>THANH TOÁN</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mini Trust Signal */}
          <div className="text-center pt-2">
            <p className="text-microcopy text-neutral-400 uppercase tracking-wide">
              Miễn phí vận chuyển từ 5.000.000₫
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
