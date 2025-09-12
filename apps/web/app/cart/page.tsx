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
    <div className="min-h-screen bg-darkBg">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-textGrey hover:text-textWhite transition-colors">
              Trang chủ
            </Link>
            <span className="text-darkGrey">/</span>
            <span className="text-goldAccent font-medium">Giỏ hàng</span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-hero text-textWhite font-bold">GIỎ HÀNG CỦA BẠN</h1>
          <p className="mt-4 text-textGrey text-xl">
            Kiểm tra lại sản phẩm trước khi thanh toán
          </p>
        </div>

        {/* Cart Content */}
        <CartPageClient />
      </div>
    </div>
  );
}
