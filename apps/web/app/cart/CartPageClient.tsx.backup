'use client';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/cart';

export default function CartPageClient() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  if (cart.itemCount === 0) {
    return (
      <div className="bg-cardBg backdrop-blur-sm border border-darkGrey rounded-2xl p-12 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-darkGrey/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-textGrey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-heading font-bold text-textWhite mb-2">
            Giỏ hàng trống
          </h2>
          <p className="text-textGrey text-lg">
            Hãy thêm sản phẩm để tiếp tục mua sắm
          </p>
        </div>
        <Link 
          href="/products" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-goldAccent to-yellow-400 text-darkBg px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-goldAccent/20 transition-all duration-300 hover:scale-105"
        >
          Khám phá sản phẩm
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Items */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-textWhite">
            Sản phẩm trong giỏ ({cart.itemCount})
          </h2>
          {cart.itemCount > 0 && (
            <button 
              onClick={clearCart} 
              className="text-red-400 hover:text-red-300 font-medium transition-colors duration-200"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {cart.items.map((item) => (
          <div 
            key={item.id} 
            className="group bg-cardBg backdrop-blur-sm border border-darkGrey rounded-2xl p-6 hover:border-goldAccent/30 transition-all duration-300"
          >
            <div className="flex gap-6">
              {item.imageUrl && (
                <div className="flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-32 h-32 rounded-xl object-cover border border-darkGrey"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-textWhite line-clamp-2 group-hover:text-goldAccent transition-colors duration-200">
                    {item.title}
                  </h3>
                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="ml-4 text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-200"
                    title="Xóa sản phẩm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <p className="text-goldAccent text-2xl font-bold mb-4">
                  {formatPrice(item.price)}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-textGrey font-medium">Số lượng:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg bg-darkGrey border border-darkGrey hover:border-goldAccent hover:bg-goldAccent/10 flex items-center justify-center text-textWhite hover:text-goldAccent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="w-12 text-center text-xl font-semibold text-textWhite bg-darkBg border border-darkGrey rounded-lg py-2">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-darkGrey border border-darkGrey hover:border-goldAccent hover:bg-goldAccent/10 flex items-center justify-center text-textWhite hover:text-goldAccent transition-all duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-textGrey text-sm">Thành tiền</p>
                    <p className="text-goldAccent text-xl font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <div className="bg-cardBg backdrop-blur-sm border border-darkGrey rounded-2xl p-6">
            <h2 className="text-2xl font-heading font-bold text-textWhite mb-6">
              Tóm tắt đơn hàng
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-darkGrey">
                <span className="text-textGrey font-medium">Số sản phẩm:</span>
                <span className="text-textWhite font-semibold">{cart.itemCount}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-darkGrey">
                <span className="text-textGrey font-medium">Tạm tính:</span>
                <span className="text-textWhite font-semibold">{formatPrice(cart.total)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-xl font-bold text-textWhite">Tổng cộng:</span>
                <span className="text-2xl font-bold text-goldAccent">{formatPrice(cart.total)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Link 
                href="/checkout" 
                className="block w-full text-center bg-gradient-to-r from-goldAccent to-yellow-400 text-darkBg font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-goldAccent/20 transition-all duration-300 hover:scale-105"
              >
                Tiến hành thanh toán
              </Link>
              
              <Link
                href="/products"
                className="block w-full text-center border border-darkGrey text-textWhite py-4 rounded-xl hover:border-goldAccent hover:bg-goldAccent/5 transition-all duration-300"
              >
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-darkGrey">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-goldAccent/10 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-goldAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-xs text-textGrey">Bảo mật</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-goldAccent/10 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-goldAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <span className="text-xs text-textGrey">Giao hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
