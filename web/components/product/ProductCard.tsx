import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/types";
import Price from "@/components/ui/Price";
import { ReviewStars } from "@/components/product/ReviewStars";

const placeholderImage =
  "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%231A1A1A' offset='0'/%3E%3Cstop stop-color='%234B3A2B' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dy='0.35em' fill='%23C8A15A' font-family='sans-serif' font-size='32' font-weight='bold' text-anchor='middle'%3EB-AUDIO%3C/text%3E%3C/svg%3E";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl =
    product.images?.[0]?.url && product.images[0].url.length > 0
      ? product.images[0].url
      : placeholderImage;

  return (
    <div className="card-product group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-600 bg-secondary-800">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="line-clamp-2 font-heading text-h4 font-semibold uppercase tracking-wide text-neutral-100 transition-colors duration-300 group-hover:text-primary">
            {product.title}
          </h3>
          {product.category?.name && (
            <p className="text-xs uppercase tracking-widest text-textGrey">
              {product.category.name}
            </p>
          )}
          <div className="flex items-center justify-between">
            <Price
              value={product.price}
              compareAt={product.compare_price ?? undefined}
              size="md"
              as="span"
            />
          </div>
          <ReviewStars
            rating={product.rating_avg}
            count={product.rating_count}
            variant="inline"
            linkHref={`/products/${product.slug}#reviews`}
          />
        </div>
      </Link>
    </div>
  );
}

