import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import ComparisonPageClient from "./ComparisonPageClient";

export const metadata: Metadata = {
  title: "So sánh sản phẩm | B-Audio - Xưởng Loa DIY",
  description:
    "So sánh chi tiết thông số kỹ thuật, tính năng và giá cả các dòng loa bluetooth, loa kéo karaoke tại B-Audio Vietnam.",
  alternates: { canonical: "https://b-audio.vn/compare" },
  openGraph: {
    title: "So sánh sản phẩm - B-Audio Vietnam",
    description:
      "So sánh chi tiết các dòng loa bluetooth và loa kéo karaoke chất lượng cao",
    url: "https://b-audio.vn/compare",
    siteName: "B-Audio Vietnam",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "So sánh sản phẩm - B-Audio Vietnam",
  },
};

export default function ComparePage() {
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
              So sánh
            </span>
          </div>
        </nav>

        {/* Header - Industrial Typography */}
        <div className="mb-12">
          <h1 className="font-heading text-hero text-neutral-100 font-bold uppercase tracking-tight leading-none mb-4">
            SO SÁNH SẢN PHẨM
          </h1>
          <div className="w-24 h-1 bg-primary shadow-gold-glow mb-6"></div>
          <p className="text-body-lg text-neutral-300 leading-relaxed max-w-2xl">
            So sánh chi tiết thông số kỹ thuật, tính năng và giá cả để tìm ra
            loa phù hợp nhất với nhu cầu DIY của bạn.
          </p>
        </div>

        {/* Comparison Content */}
        <ComparisonPageClient />
      </div>
    </div>
  );
}
