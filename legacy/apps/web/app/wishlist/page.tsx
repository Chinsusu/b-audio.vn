import { Metadata } from "next";
import Link from "next/link";

import WishlistPageClient from "./WishlistPageClient";

export const metadata: Metadata = {
  title: "Danh sách yêu thích | B-Audio Vietnam",
  description:
    "Xem và quản lý danh sách sản phẩm yêu thích tại B-Audio Vietnam - Loa di động và âm thanh chuyên nghiệp.",
  alternates: { canonical: "https://b-audio.vn/wishlist" },
  openGraph: {
    title: "Danh sách yêu thích - B-Audio Vietnam",
    description: "Xem danh sách sản phẩm yêu thích của bạn tại B-Audio Vietnam",
    url: "https://b-audio.vn/wishlist",
    siteName: "B-Audio Vietnam",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Danh sách yêu thích - B-Audio Vietnam",
  },
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-darkBg text-textWhite">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-microcopy font-microcopy tracking-widest uppercase text-textGrey">
            <Link href="/" className="hover:text-textWhite transition-colors">
              Trang chủ
            </Link>
            <span className="text-textGrey/60">/</span>
            <span className="text-textWhite font-heading tracking-tight">
              Danh sách yêu thích
            </span>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-h2 text-textWhite">
            Danh sách yêu thích
          </h1>
          <p className="mt-2 text-textGrey">
            Các sản phẩm bạn đã lưu để xem sau
          </p>
        </div>

        {/* Wishlist Content */}
        <WishlistPageClient />
      </div>
    </div>
  );
}
