'use client';
import { useComparison } from '@/hooks/useComparison';
import { Trash2, Share2, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ComparisonPageClient() {
  const { comparison, removeItem, clearComparison, shareComparison } = useComparison();
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = async () => {
    try {
      const shareUrl = shareComparison();
      await navigator.clipboard.writeText(shareUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    } catch (error) {
      console.error('Failed to copy share URL:', error);
    }
  };

  if (comparison.itemCount === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold mb-2">Chưa có sản phẩm để so sánh</h1>
          <p className="text-gray-600 mb-8">
            Thêm sản phẩm vào danh sách so sánh để xem bảng so sánh chi tiết
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      </main>
    );
  }

  const formatPrice = (value: number) => `${new Intl.NumberFormat('vi-VN').format(value)} đ`;
  const formatWatt = (value?: number) => value ? `${value}W` : 'N/A';
  const formatHours = (value?: number) => value ? `${value}h` : 'N/A';
  const formatString = (value?: string) => value || 'N/A';

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">So sánh sản phẩm</h1>
          <p className="text-gray-600 mt-2">
            So sánh {comparison.itemCount} sản phẩm đã chọn
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Chia sẻ
          </button>
          <button
            onClick={clearComparison}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Xóa tất cả
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <td className="p-4 font-medium sticky left-0 bg-gray-50 z-10">Thông số</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4 min-w-[250px] relative">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    title="Bỏ khỏi so sánh"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Product Image */}
                  <div className="mb-3">
                    {item.attributes.images?.data?.[0] && (
                      <img
                        src={item.attributes.images.data[0].attributes.url}
                        alt={item.attributes.title}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Product Names */}
            <tr className="bg-white">
              <td className="p-4 font-medium sticky left-0 bg-white z-10 border-r">Tên sản phẩm</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4">
                  <Link 
                    href={`/products/${item.slug}`}
                    className="font-medium text-black hover:text-blue-600 transition-colors"
                  >
                    {item.attributes.title}
                  </Link>
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr className="bg-gray-50/50">
              <td className="p-4 font-medium sticky left-0 bg-gray-50/50 z-10 border-r">Giá</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4">
                  <span className="font-semibold text-green-600">
                    {formatPrice(item.attributes.price_vnd)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Power */}
            <tr className="bg-white">
              <td className="p-4 font-medium sticky left-0 bg-white z-10 border-r">Công suất</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4">
                  {formatWatt(item.attributes.power_watt)}
                </td>
              ))}
            </tr>

            {/* Battery */}
            <tr className="bg-gray-50/50">
              <td className="p-4 font-medium sticky left-0 bg-gray-50/50 z-10 border-r">Pin</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4">
                  {formatHours(item.attributes.battery_hours)}
                </td>
              ))}
            </tr>

            {/* Connectivity */}
            <tr className="bg-white">
              <td className="p-4 font-medium sticky left-0 bg-white z-10 border-r">Kết nối</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4">
                  {formatString(item.attributes.connectivity)}
                </td>
              ))}
            </tr>
            
            {/* Action Row */}
            <tr className="border-t-2">
              <td className="p-4 font-medium sticky left-0 bg-white z-10">Hành động</td>
              {comparison.items.map((item) => (
                <td key={item.id} className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${item.slug}`}
                      className="flex-1 text-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Back to Products */}
      <div className="mt-8 text-center">
        <Link 
          href="/products" 
          className="inline-block text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Quay lại danh sách sản phẩm
        </Link>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Đã copy link chia sẻ!
        </div>
      )}
    </main>
  );
}
