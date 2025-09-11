'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/cart';
import { formatWishlistDate } from '../../lib/wishlist';

export default function WishlistPageClient() {
  const { wishlist, removeItem, clearWishlist, shareWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const handleMoveToCart = (item: any) => {
    // Convert wishlist item to cart item
    addToCart({
      id: item.id,
      slug: item.slug,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
    }, 1);
    
    // Remove from wishlist
    removeItem(item.id);
  };

  const handleShare = async () => {
    try {
      const url = shareWishlist();
      setShareUrl(url);
      setShowShareModal(true);
      
      // Copy to clipboard if available
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      console.error('Failed to share wishlist:', error);
    }
  };

  if (wishlist.itemCount === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Danh sách yêu thích trống
        </h2>
        <p className="text-gray-600 mb-6">
          Hãy khám phá các sản phẩm tuyệt vời và thêm vào danh sách yêu thích của bạn!
        </p>
        <Link 
          href="/products" 
          className="inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition-colors"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {wishlist.itemCount} sản phẩm trong danh sách yêu thích
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Chia sẻ
            </button>
            
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 rounded-lg text-sm text-red-600 hover:bg-red-50 px-4 py-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xóa tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow p-4">
            {/* Image */}
            <div className="relative mb-4">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Remove button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-colors"
                title="Bỏ yêu thích"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div>
                <Link 
                  href={`/products/${item.slug}`}
                  className="font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                >
                  {item.title}
                </Link>
                <div className="text-sm text-gray-500 mt-1">
                  Đã thêm {formatWishlistDate(item.addedAt)}
                </div>
              </div>
              
              <div className="text-lg font-semibold text-gray-900">
                {formatPrice(item.price)}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 rounded-lg bg-black text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Thêm vào giỏ
                </button>
                <Link
                  href={`/products/${item.slug}`}
                  className="flex-1 rounded-lg border border-gray-300 text-gray-700 py-2 text-sm font-medium text-center hover:bg-gray-50 transition-colors"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chia sẻ danh sách yêu thích</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link chia sẻ:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard?.writeText(shareUrl)}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                Chia sẻ link này để cho bạn bè xem danh sách yêu thích của bạn.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
