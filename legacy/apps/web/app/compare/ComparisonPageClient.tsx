"use client";
import {
  ArrowRight,
  BarChart3,
  Battery,
  Check,
  Plus,
  Share2,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Price from "../../components/ui/Price";
import { useComparison } from "../../hooks/useComparison";
import { mediaUrl } from "../../utils/mediaUrl";

// Mock data for demo - in real app, this would come from API
const mockProductDetails = {
  "ba-mini": {
    power_watt: 50,
    battery_hours: 12,
    connectivity: ["Bluetooth 5.0", "AUX", "USB"],
    weight: 2.5,
    dimensions: "25x15x18cm",
    features: ["IPX4 Chống nước", "Bass Boost", "LED RGB", "Micro không dây"],
    pros: ["Âm bass sâu", "Pin trâu", "Thiết kế đẹp"],
    cons: ["Hơi nặng", "Giá cao"],
  },
  "ba-k1": {
    power_watt: 100,
    battery_hours: 8,
    connectivity: ["Bluetooth 5.0", "AUX", "USB", "Micro"],
    weight: 4.2,
    dimensions: "35x25x28cm",
    features: ["2 Micro không dây", "Echo/Reverb", "LED Party", "Wheels"],
    pros: ["Âm thanh cực mạnh", "Full tính năng karaoke", "Di chuyển dễ"],
    cons: ["Khá nặng", "Pin yếu hơn"],
  },
};

export default function ComparisonPageClient() {
  const { comparison, removeItem, clearComparison } = useComparison();
  const [showDetails, setShowDetails] = useState({
    features: true,
    specs: true,
    proscons: true,
  });

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "So sánh sản phẩm B-Audio",
        text: `So sánh ${comparison.items.map((item) => item.attributes.title).join(" vs ")}`,
        url: window.location.href,
      });
    } catch (_error) {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
      alert("Đã copy link so sánh!");
    }
  };

  if (comparison.itemCount === 0) {
    return (
      <div className="card-industrial p-12 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary-800 border-2 border-gray-600 flex items-center justify-center">
            <BarChart3 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading text-h1 text-neutral-100 mb-4 uppercase tracking-wide">
            CHƯA CÓ SẢN PHẨM SO SÁNH
          </h2>
          <p className="text-body-lg text-neutral-400 leading-relaxed max-w-md mx-auto">
            Thêm sản phẩm từ trang danh sách để so sánh thông số kỹ thuật, tính
            năng và giá cả một cách chi tiết.
          </p>
        </div>

        <Link href="/products" className="btn-primary group">
          <span>KHÁM PHÁ SẢN PHẨM</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-h2 text-neutral-100 mb-2 uppercase tracking-wide">
            SO SÁNH SẢN PHẨM
          </h2>
          <p className="text-body text-neutral-400">
            {comparison.itemCount} sản phẩm đang được so sánh
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="btn-secondary group">
            <Share2 className="h-4 w-4" />
            <span>CHIA SẺ</span>
          </button>
          <button
            onClick={clearComparison}
            className="btn-ghost text-body-sm px-4 py-2"
          >
            XÓA TẤT CẢ
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card-industrial p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Product Headers */}
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-6 text-left w-48">
                  <span className="font-heading text-body-sm text-neutral-400 uppercase tracking-wide">
                    THÔNG SỐ
                  </span>
                </th>
                {comparison.items.map((product, _index) => {
                  const imageUrl =
                    product.attributes.images?.data?.[0]?.attributes?.url;

                  return (
                    <th
                      key={product.id}
                      className="p-6 text-center min-w-[280px] border-l border-gray-600"
                    >
                      {/* Product Card */}
                      <div className="relative">
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        {/* Product Image */}
                        <div className="relative w-32 h-32 mx-auto mb-4 rounded-xl bg-secondary-800 border border-gray-600 overflow-hidden">
                          {imageUrl ? (
                            <Image
                              src={mediaUrl(imageUrl)}
                              alt={product.attributes.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl">🔊</span>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <h3 className="font-heading text-h4 text-neutral-100 mb-2 uppercase tracking-wide">
                          {product.attributes.title}
                        </h3>
                        <Price
                          value={product.attributes.price_vnd}
                          className="mb-4"
                        />

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="btn-secondary flex-1 text-body-sm px-3 py-2"
                          >
                            XEM CHI TIẾT
                          </Link>
                          <button className="btn-primary px-3 py-2 group">
                            <ShoppingBag className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </th>
                  );
                })}
                {/* Add More Column */}
                {comparison.itemCount < 4 && (
                  <th className="p-6 text-center min-w-[200px] border-l border-gray-600">
                    <Link
                      href="/products"
                      className="flex flex-col items-center justify-center h-full min-h-[300px] text-neutral-400 hover:text-primary transition-colors group"
                    >
                      <Plus className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
                      <span className="font-heading text-body uppercase tracking-wide">
                        THÊM SẢN PHẨM
                      </span>
                    </Link>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {/* Technical Specs Section */}
              <tr>
                <td
                  colSpan={
                    comparison.itemCount + (comparison.itemCount < 4 ? 2 : 1)
                  }
                  className="p-0"
                >
                  <button
                    onClick={() =>
                      setShowDetails((prev) => ({
                        ...prev,
                        specs: !prev.specs,
                      }))
                    }
                    className="w-full p-4 text-left bg-secondary-800/50 border-b border-gray-600 font-heading text-body-sm text-neutral-200 uppercase tracking-wide hover:bg-secondary-800/70 transition-colors"
                  >
                    THÔNG SỐ KỸ THUẬT {showDetails.specs ? "▼" : "▶"}
                  </button>
                </td>
              </tr>

              {showDetails.specs && (
                <>
                  {/* Power */}
                  <tr className="border-b border-gray-600/50">
                    <td className="p-4 font-heading text-body-sm text-neutral-400 uppercase tracking-wide flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      CÔNG SUẤT
                    </td>
                    {comparison.items.map((product) => {
                      const mockDetails =
                        mockProductDetails[
                          product.id as keyof typeof mockProductDetails
                        ];
                      return (
                        <td
                          key={`power-${product.id}`}
                          className="p-4 text-center border-l border-gray-600/50"
                        >
                          <span className="font-heading text-body text-neutral-100 font-semibold">
                            {product.attributes.power_watt ||
                              mockDetails?.power_watt ||
                              "N/A"}
                            W RMS
                          </span>
                        </td>
                      );
                    })}
                    {comparison.itemCount < 4 && (
                      <td className="border-l border-gray-600/50"></td>
                    )}
                  </tr>

                  {/* Battery */}
                  <tr className="border-b border-gray-600/50">
                    <td className="p-4 font-heading text-body-sm text-neutral-400 uppercase tracking-wide flex items-center gap-2">
                      <Battery className="h-4 w-4 text-primary" />
                      PIN
                    </td>
                    {comparison.items.map((product) => {
                      const mockDetails =
                        mockProductDetails[
                          product.id as keyof typeof mockProductDetails
                        ];
                      return (
                        <td
                          key={`battery-${product.id}`}
                          className="p-4 text-center border-l border-gray-600/50"
                        >
                          <span className="font-heading text-body text-neutral-100 font-semibold">
                            {product.attributes.battery_hours ||
                              mockDetails?.battery_hours ||
                              "N/A"}
                            h
                          </span>
                        </td>
                      );
                    })}
                    {comparison.itemCount < 4 && (
                      <td className="border-l border-gray-600/50"></td>
                    )}
                  </tr>

                  {/* Weight & Dimensions */}
                  <tr className="border-b border-gray-600/50">
                    <td className="p-4 font-heading text-body-sm text-neutral-400 uppercase tracking-wide">
                      CHI TIẾT
                    </td>
                    {comparison.items.map((product) => {
                      const mockDetails =
                        mockProductDetails[
                          product.id as keyof typeof mockProductDetails
                        ];
                      return (
                        <td
                          key={`details-${product.id}`}
                          className="p-4 text-center border-l border-gray-600/50"
                        >
                          <div className="space-y-1">
                            <div className="text-body-sm text-neutral-300">
                              {mockDetails?.weight}kg
                            </div>
                            <div className="text-body-sm text-neutral-400">
                              {mockDetails?.dimensions}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    {comparison.itemCount < 4 && (
                      <td className="border-l border-gray-600/50"></td>
                    )}
                  </tr>
                </>
              )}

              {/* Features Section */}
              <tr>
                <td
                  colSpan={
                    comparison.itemCount + (comparison.itemCount < 4 ? 2 : 1)
                  }
                  className="p-0"
                >
                  <button
                    onClick={() =>
                      setShowDetails((prev) => ({
                        ...prev,
                        features: !prev.features,
                      }))
                    }
                    className="w-full p-4 text-left bg-secondary-800/50 border-b border-gray-600 font-heading text-body-sm text-neutral-200 uppercase tracking-wide hover:bg-secondary-800/70 transition-colors"
                  >
                    TÍNH NĂNG {showDetails.features ? "▼" : "▶"}
                  </button>
                </td>
              </tr>

              {showDetails.features && (
                <tr>
                  <td className="p-4 font-heading text-body-sm text-neutral-400 uppercase tracking-wide">
                    TÍNH NĂNG
                  </td>
                  {comparison.items.map((product) => {
                    const mockDetails =
                      mockProductDetails[
                        product.id as keyof typeof mockProductDetails
                      ];
                    return (
                      <td
                        key={`features-${product.id}`}
                        className="p-4 border-l border-gray-600/50"
                      >
                        <div className="space-y-2">
                          {mockDetails?.features?.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Check className="h-3 w-3 text-primary flex-shrink-0" />
                              <span className="text-body-sm text-neutral-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                  {comparison.itemCount < 4 && (
                    <td className="border-l border-gray-600/50"></td>
                  )}
                </tr>
              )}

              {/* Pros & Cons Section */}
              <tr>
                <td
                  colSpan={
                    comparison.itemCount + (comparison.itemCount < 4 ? 2 : 1)
                  }
                  className="p-0"
                >
                  <button
                    onClick={() =>
                      setShowDetails((prev) => ({
                        ...prev,
                        proscons: !prev.proscons,
                      }))
                    }
                    className="w-full p-4 text-left bg-secondary-800/50 border-b border-gray-600 font-heading text-body-sm text-neutral-200 uppercase tracking-wide hover:bg-secondary-800/70 transition-colors"
                  >
                    ƯU & NHƯỢC ĐIỂM {showDetails.proscons ? "▼" : "▶"}
                  </button>
                </td>
              </tr>

              {showDetails.proscons && (
                <tr>
                  <td className="p-4 font-heading text-body-sm text-neutral-400 uppercase tracking-wide">
                    ĐÁNH GIÁ
                  </td>
                  {comparison.items.map((product) => {
                    const mockDetails =
                      mockProductDetails[
                        product.id as keyof typeof mockProductDetails
                      ];
                    return (
                      <td
                        key={`proscons-${product.id}`}
                        className="p-4 border-l border-gray-600/50"
                      >
                        <div className="space-y-4">
                          {/* Pros */}
                          <div>
                            <h4 className="font-heading text-body-sm text-primary uppercase tracking-wide mb-2">
                              ƯU ĐIỂM
                            </h4>
                            <div className="space-y-1">
                              {mockDetails?.pros?.map((pro, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                                  <span className="text-body-sm text-neutral-300">
                                    {pro}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Cons */}
                          <div>
                            <h4 className="font-heading text-body-sm text-neutral-400 uppercase tracking-wide mb-2">
                              NHƯỢC ĐIỂM
                            </h4>
                            <div className="space-y-1">
                              {mockDetails?.cons?.map((con, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <div className="w-2 h-2 rounded-full bg-neutral-500 flex-shrink-0"></div>
                                  <span className="text-body-sm text-neutral-400">
                                    {con}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                  {comparison.itemCount < 4 && (
                    <td className="border-l border-gray-600/50"></td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 card-industrial p-6">
        <div className="text-center sm:text-left">
          <p className="text-body text-neutral-400">
            Cần hỗ trợ chọn sản phẩm?
            <Link
              href="https://zalo.me/0877257799"
              className="text-primary hover:text-primary/80 transition-colors ml-1"
            >
              Liên hệ chuyên gia
            </Link>
          </p>
        </div>

        <Link href="/products" className="btn-primary group">
          <span>XEM THÊM SẢN PHẨM</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
