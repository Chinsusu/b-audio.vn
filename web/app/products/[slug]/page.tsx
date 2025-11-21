import Link from "next/link";

import Price from "@/components/ui/Price";
import Tag from "@/components/ui/Tag";
import { ReviewStars } from "@/components/product/ReviewStars";
import { ProductGallery } from "@/components/product/ProductGallery";
import { getProduct, getProductReviews } from "@/lib/api";

type Params = { slug: string };
type SearchParams = { page?: string };

function PaginationLink({
  slug,
  label,
  page,
  disabled,
}: {
  slug: string;
  label: string;
  page: number;
  disabled: boolean;
}) {
  const href = `/products/${slug}?page=${page}`;
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded border border-neutral-800 px-3 py-1 text-neutral-600">
        {label}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="rounded border border-neutral-700 px-3 py-1 hover:border-neutral-400"
    >
      {label}
    </Link>
  );
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const page = Number(searchParams.page || "1") || 1;

  const [productRes, reviewsRes] = await Promise.all([
    getProduct(params.slug).catch(() => null),
    getProductReviews(params.slug, { page, pageSize: 5 }).catch(() => null),
  ]);

  const product = productRes?.data;
  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="rounded-2xl border border-darkGrey bg-darkGrey/40 p-8">
          <p className="text-lg font-semibold text-textWhite">
            Không tìm thấy sản phẩm.
          </p>
          <Link
            href="/products"
            className="mt-3 inline-block text-neonTurquoise hover:underline"
          >
            ← Quay lại danh sách sản phẩm
          </Link>
        </div>
      </main>
    );
  }

  const reviews = reviewsRes?.data ?? [];
  const pagination = reviewsRes?.meta.pagination ?? {
    page: 1,
    pageSize: 5,
    pageCount: 1,
    total: reviews.length,
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <article className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images || []} />

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                <Link className="hover:underline" href="/products">
                  Sản phẩm
                </Link>{" "}
                / {product.category?.name ?? "Không phân loại"}
              </p>
              <h1 className="font-heading text-h2 font-bold uppercase tracking-tight text-neutral-100">
                {product.title}
              </h1>
            </div>
            {product.category?.slug && (
              <Tag
                href={`/products?category=${encodeURIComponent(
                  product.category.slug,
                )}`}
              >
                {product.category.name}
              </Tag>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Price
              value={product.price}
              compareAt={product.compare_price ?? undefined}
              size="lg"
              tone="primary"
              as="span"
            />
            <ReviewStars
              rating={product.rating_avg}
              count={product.rating_count}
              variant="tag"
              linkHref={`/products/${product.slug}#reviews`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-darkGrey bg-darkGrey/40 p-4 text-sm text-neutral-200">
            {product.power_watt ? (
              <div>
                <p className="text-xs uppercase tracking-wide text-textGrey">
                  Công suất
                </p>
                <p className="font-semibold">{product.power_watt}W</p>
              </div>
            ) : null}
            {product.battery_hours ? (
              <div>
                <p className="text-xs uppercase tracking-wide text-textGrey">
                  Pin
                </p>
                <p className="font-semibold">{product.battery_hours} giờ</p>
              </div>
            ) : null}
            {product.weight ? (
              <div>
                <p className="text-xs uppercase tracking-wide text-textGrey">
                  Khối lượng
                </p>
                <p className="font-semibold">{product.weight} kg</p>
              </div>
            ) : null}
            {product.connectivity ? (
              <div>
                <p className="text-xs uppercase tracking-wide text-textGrey">
                  Kết nối
                </p>
                <p className="font-semibold">{product.connectivity}</p>
              </div>
            ) : null}
          </div>

          <div
            className="prose prose-invert max-w-none text-sm leading-relaxed text-neutral-200"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <div className="flex flex-wrap gap-3">
            <a
              href="https://zalo.me/0877257799"
              className="btn-primary hover-industrial"
            >
              Liên hệ đặt hàng
            </a>
            <Link href="/custom" className="btn-secondary">
              Đặt custom theo yêu cầu
            </Link>
          </div>

          <div className="grid gap-4 rounded-2xl border border-darkGrey bg-darkGrey/30 p-4 md:grid-cols-2">
            <div>
              <h3 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
                Xưởng &amp; bảo hành
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-200">
                <li>Bảo hành 2 năm tại xưởng B-Audio</li>
                <li>Hỗ trợ nâng cấp/repair sau bảo hành</li>
                <li>Giao nhanh 48h khu vực nội thành</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-h4 text-neutral-100 uppercase tracking-tight">
                Custom theo yêu cầu
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-200">
                <li>Đổi màu thùng, lưới, logo theo ý muốn</li>
                <li>Tùy chỉnh cấu hình driver / ampli</li>
                <li>Thêm echo/đầu vào nhạc cụ nếu cần</li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      <section id="reviews" className="mt-12 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-h3 text-neutral-100 uppercase tracking-tight">
            Đánh giá của khách hàng
          </h2>
          <span className="text-sm text-textGrey">
            {pagination.total} đánh giá
          </span>
        </div>

        {reviews.length === 0 ? (
          <p className="text-sm text-neutral-500">Chưa có đánh giá.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-darkGrey bg-darkGrey/50 p-4"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-neutral-100">
                    {r.author_name}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ⭐ {r.rating}/5
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-200 whitespace-pre-wrap">
                  {r.content}
                </p>
              </article>
            ))}
          </div>
        )}

        {pagination.pageCount > 1 && (
          <nav className="mt-4 flex items-center justify-between text-sm text-neutral-300">
            <PaginationLink
              slug={product.slug}
              label="← Trước"
              page={pagination.page - 1}
              disabled={pagination.page <= 1}
            />
            <span>
              Trang {pagination.page} / {pagination.pageCount}
            </span>
            <PaginationLink
              slug={product.slug}
              label="Sau →"
              page={pagination.page + 1}
              disabled={pagination.page >= pagination.pageCount}
            />
          </nav>
        )}
      </section>
    </main>
  );
}
