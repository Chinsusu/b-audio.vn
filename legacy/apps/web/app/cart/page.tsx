import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Giỏ hàng | B-Audio - Xưởng Loa DIY",
  description:
    "Xem giỏ hàng và thanh toán đơn hàng tại B-Audio Vietnam - Chuyên gia loa di động và âm thanh chuyên nghiệp.",
  alternates: { canonical: "https://b-audio.vn/cart" },
  openGraph: {
    title: "Giỏ hàng - B-Audio Vietnam",
    description: "Xem giỏ hàng và thanh toán đơn hàng tại B-Audio Vietnam",
    url: "https://b-audio.vn/cart",
    siteName: "B-Audio Vietnam",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Giỏ hàng - B-Audio Vietnam",
  },
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-secondary-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb - Industrial Style */}
        <nav className="mb-8">
          <div className="flex items-center space-x-3 text-body-sm">
            <Link
              href="/"
              className="text-neutral-400 hover:text-primary transition-colors font-body"
            >
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-primary font-heading uppercase tracking-wide">
              Giỏ hàng
            </span>
          </div>
        </nav>

        {/* Header - Industrial Typography */}
        <div className="mb-12">
          <h1 className="font-heading text-hero text-neutral-100 font-bold uppercase tracking-tight leading-none mb-4">
            GIỎ HÀNG
          </h1>
          <div className="w-24 h-1 bg-primary shadow-gold-glow mb-6"></div>
          <p className="text-body-lg text-neutral-300 leading-relaxed max-w-2xl">
            Kiểm tra lại sản phẩm và hoàn tất đơn hàng. Chúng tôi cam kết chất
            lượng và dịch vụ tốt nhất cho khách hàng DIY.
          </p>
        </div>

        {/* Cart Content */}
        <CartPageClient />
      </div>
    </div>
  );
}
