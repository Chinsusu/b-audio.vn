'use client';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/cart';

export default function CartPageClient() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  if (cart.itemCount === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center">
        <p className="text-gray-600">Giỏ hàng trống.</p>
        <Link href="/products" className="mt-4 inline-block rounded-lg bg-black px-5 py-3 text-white">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Items */}
      <div className="md:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white rounded-2xl shadow p-4">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="w-24 h-24 rounded-xl object-cover" />
            )}
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{formatPrice(item.price)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="w-10 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
                <button onClick={() => removeItem(item.id)} className="ml-auto text-red-600 hover:underline">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6 h-fit">
        <h2 className="font-semibold mb-4">Tóm tắt đơn hàng</h2>
        <div className="flex justify-between py-2">
          <span>Tạm tính</span>
          <span>{formatPrice(cart.total)}</span>
        </div>
        <div className="flex justify-between py-2 border-t">
          <span>Tổng cộng</span>
          <span className="font-bold">{formatPrice(cart.total)}</span>
        </div>
        <div className="mt-4 space-y-2">
          <Link href="/checkout" className="block text-center bg-black text-white py-3 rounded-lg">
            Thanh toán
          </Link>
          <button onClick={clearCart} className="block w-full text-center border py-3 rounded-lg hover:bg-gray-50">
            Xoá giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
