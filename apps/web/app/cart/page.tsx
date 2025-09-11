import { Metadata } from 'next';
import Link from 'next/link';
import CartPageClient from './CartPageClient';

export const metadata: Metadata = {
  title: 'Giỏ hàng | B-Audio Vietnam',
  description: 'Xem giỏ hàng và thanh toán đơn hàng tại B-Audio Vietnam - Chuyên gia loa di động và âm thanh chuyên nghiệp.',
  alternates: { canonical: 'https://b-audio.vn/cart' },
  openGraph: {
    title: 'Giỏ hàng - B-Audio Vietnam',
    description: 'Xem giỏ hàng và thanh toán đơn hàng tại B-Audio Vietnam',
    url: 'https://b-audio.vn/cart',
    siteName: 'B-Audio Vietnam',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Giỏ hàng - B-Audio Vietnam',
  },
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black">
              Trang chủ
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-black font-medium">Giỏ hàng</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
          <p className="mt-2 text-gray-600">
            Kiểm tra lại sản phẩm trước khi thanh toán
          </p>
        </div>

        {/* Cart Content */}
        <CartPageClient />
      </div>
    </div>
  );
}
