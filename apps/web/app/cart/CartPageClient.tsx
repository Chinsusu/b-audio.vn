"use client";
import {
  ArrowRight,
  CreditCard,
  Minus,
  Plus,
  Shield,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/cart";
import { mediaUrl } from "../../utils/mediaUrl";

export default function CartPageClient() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate savings and shipping
  const subtotal = cart.total;
  const shipping = subtotal > 5000000 ? 0 : 200000; // Free shipping over 5M VND
  const promoDiscount = promoApplied ? subtotal * 0.1 : 0; // 10% discount
  const totalWithShipping = subtotal + shipping - promoDiscount;

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "diy2024") {
      setPromoApplied(true);
    }
  };

  if (cart.itemCount === 0) {
    return (
      <div className="card-industrial p-12 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary-800 border-2 border-gray-600 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading text-h1 text-neutral-100 mb-4 uppercase tracking-wide">
            GIỎ HÀNG TRỐNG
          </h2>
          <p className="text-body-lg text-neutral-400 leading-relaxed max-w-md mx-auto">
            Chưa có sản phẩm nào trong giỏ hàng. Khám phá bộ sưu tập loa DIY
            chuyên nghiệp của chúng tôi.
          </p>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-body-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Bảo hành 2 năm</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <span>Giao hàng miễn phí</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>Thanh toán an toàn</span>
          </div>
        </div>

        <Link href="/products" className="btn-primary group">
          <span>KHÁM PHÁ SẢN PHẨM</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-h2 text-neutral-100 uppercase tracking-wide">
            SẢN PHẨM ({cart.itemCount})
          </h2>
          {cart.itemCount > 0 && (
            <button
              onClick={clearCart}
              className="text-body-sm text-neutral-400 hover:text-red-400 font-heading uppercase tracking-wide transition-colors duration-200"
            >
              XÓA TẤT CẢ
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="card-industrial p-6 group">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary-800 border border-gray-600 flex-shrink-0">
                  {item.imageUrl ? (
                    <Image
                      src={mediaUrl(item.imageUrl)}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">🔊</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-h4 text-neutral-100 group-hover:text-primary transition-colors duration-300 uppercase tracking-wide line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-neutral-400 font-mono mt-1">
                        SKU: {item.id}
                      </p>
                      <div className="text-h4 font-heading text-primary font-bold mt-2">
                        {formatPrice(item.price)} ₫
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-xl bg-secondary-800 border border-gray-600 text-neutral-400 hover:text-red-400 hover:border-red-400 transition-industrial"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-body-sm text-neutral-400 uppercase tracking-wide font-heading">
                        SỐ LƯỢNG:
                      </span>
                      <div className="flex items-center bg-secondary-800 border border-gray-600 rounded-xl overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="p-2 hover:bg-secondary-700 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-neutral-400" />
                        </button>
                        <span className="px-4 py-2 text-neutral-100 font-heading min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-secondary-700 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-neutral-400" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-h4 font-heading text-primary font-bold">
                      {formatPrice(item.price * item.quantity)} ₫
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="card-industrial p-6 sticky top-24">
          <h3 className="font-heading text-h3 text-neutral-100 mb-6 uppercase tracking-wide border-b border-gray-600 pb-4">
            TỔNG ĐỢN HÀNG
          </h3>

          {/* Summary Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-body">
              <span className="text-neutral-400">Tạm tính:</span>
              <span className="text-neutral-100 font-heading">
                {formatPrice(subtotal)} ₫
              </span>
            </div>
            <div className="flex justify-between text-body">
              <span className="text-neutral-400">Phí vận chuyển:</span>
              <span
                className={`font-heading ${shipping === 0 ? "text-primary" : "text-neutral-100"}`}
              >
                {shipping === 0 ? "Miễn phí" : `${formatPrice(shipping)} ₫`}
              </span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-body">
                <span className="text-neutral-400">Giảm giá (DIY2024):</span>
                <span className="text-primary font-heading">
                  -{formatPrice(promoDiscount)} ₫
                </span>
              </div>
            )}
            <div className="border-t border-gray-600 pt-4">
              <div className="flex justify-between">
                <span className="font-heading text-h4 text-neutral-100 uppercase">
                  TỔNG CỘNG:
                </span>
                <span className="font-heading text-h3 text-primary font-bold">
                  {formatPrice(totalWithShipping)} ₫
                </span>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          {!promoApplied && (
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input-industrial flex-1 text-body-sm"
                />
                <button
                  onClick={handlePromoCode}
                  className="btn-secondary px-4 py-2 text-body-sm whitespace-nowrap"
                >
                  ÁP DỤNG
                </button>
              </div>
              <p className="text-microcopy text-neutral-400 mt-2 uppercase tracking-wide">
                Thử: DIY2024 để được giảm 10%
              </p>
            </div>
          )}

          {/* Shipping Info */}
          <div className="bg-secondary-800/50 rounded-xl p-4 mb-6 border border-gray-600">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="font-heading text-body-sm text-neutral-100 uppercase tracking-wide">
                VẬN CHUYỂN
              </span>
            </div>
            <p className="text-body-sm text-neutral-400 leading-relaxed">
              {shipping === 0
                ? "Đủ điều kiện giao hàng miễn phí! Đơn hàng sẽ được giao trong 2-3 ngày."
                : `Thêm ${formatPrice(5000000 - subtotal)} ₫ để được miễn phí vận chuyển.`}
            </p>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout" className="btn-primary w-full group mb-4">
            <span>THANH TOÁN</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Continue Shopping */}
          <Link href="/products" className="btn-ghost w-full">
            TIẾP TỤC MUA SẮM
          </Link>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-600">
            <div className="text-center">
              <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-microcopy text-neutral-400 uppercase tracking-wide">
                BẢO HÀNH 2 NĂM
              </div>
            </div>
            <div className="text-center">
              <CreditCard className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-microcopy text-neutral-400 uppercase tracking-wide">
                THANH TOÁN AN TOÀN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
