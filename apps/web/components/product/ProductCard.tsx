import Image from "next/image";
import Link from "next/link";

import { mediaUrl } from "../../utils/mediaUrl";
import Price from "../ui/Price";
import { ReviewStars } from "./ReviewStars";

export function ProductCard({ p }: { p: any }) {
  const attrs = p?.attributes || {};
  const rel = attrs.images?.data?.[0]?.attributes?.url;
  const imageUrl = mediaUrl(rel);

  return (
    <div className="card-product group">
      <Link href={`/products/${attrs.slug}`}>
        {imageUrl ? (
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-secondary-800 border border-gray-600">
            <Image
              src={imageUrl}
              alt={attrs.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ) : (
          <div className="aspect-square w-full rounded-xl bg-secondary-800 border border-gray-600 flex items-center justify-center">
            <span className="text-6xl text-primary opacity-60">🔊</span>
          </div>
        )}

        <div className="mt-4 space-y-2">
          <h3 className="font-heading text-h4 text-neutral-100 font-semibold group-hover:text-primary transition-colors duration-300 uppercase tracking-wide line-clamp-2">
            {attrs.title}
          </h3>
          {typeof attrs.rating_avg !== "undefined" && (
            <ReviewStars
              rating={Number(attrs.rating_avg) || 0}
              count={Number(attrs.rating_count) || 0}
            />
          )}
          <Price value={attrs.price_vnd || attrs.price} />
        </div>
      </Link>

      {/* Action buttons would go here */}
      <div className="mt-4 flex items-center justify-between">
        <button className="btn-ghost text-body-sm px-4 py-2">
          XEM CHI TIẾT
        </button>
        <div className="flex gap-1">
          <button
            className="h-10 w-10 rounded-xl bg-secondary-800 border border-gray-600 flex items-center justify-center text-neutral-400 hover:text-primary hover:border-primary transition-industrial"
            title="Yêu thích"
          >
            ♥
          </button>
          <button
            className="h-10 w-10 rounded-xl bg-secondary-800 border border-gray-600 flex items-center justify-center text-neutral-400 hover:text-primary hover:border-primary transition-industrial"
            title="So sánh"
          >
            ⚖
          </button>
        </div>
      </div>
    </div>
  );
}
