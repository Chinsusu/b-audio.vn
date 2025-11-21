import Link from "next/link";

import { getCategories, getProducts } from "@/lib/api";
import type { CategorySummary } from "@/lib/types";
import SearchFilters from "@/components/search/SearchFilters";
import { ProductCard } from "@/components/product/ProductCard";

type SearchParams = {
  search?: string;
  category?: string;
  sort?: string;
  page?: string;
  min_price?: string;
  max_price?: string;
  min_power?: string;
  max_power?: string;
  min_battery?: string;
  max_battery?: string;
};

function parseNumber(value?: string): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
}

function nextQuery(
  current: SearchParams,
  overrides: Partial<SearchParams>,
): string {
  const params = new URLSearchParams();
  const merged: SearchParams = { ...current, ...overrides };
  Object.entries(merged).forEach(([key, value]) => {
    if (!value || key === "page") return;
    params.set(key, String(value));
  });
  if (overrides.page) {
    params.set("page", String(overrides.page));
  }
  return params.toString();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = Number(searchParams.page || "1") || 1;
  const sort = searchParams.sort || "newest";

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts({
      page,
      pageSize: 12,
      sort,
      search: searchParams.search || "",
      category: searchParams.category || "",
      min_price: parseNumber(searchParams.min_price),
      max_price: parseNumber(searchParams.max_price),
      min_power: parseNumber(searchParams.min_power),
      max_power: parseNumber(searchParams.max_power),
      min_battery: parseNumber(searchParams.min_battery),
      max_battery: parseNumber(searchParams.max_battery),
    }).catch(() => null),
    getCategories().catch(() => null),
  ]);

  const products = productsRes?.data ?? [];
  const pagination = productsRes?.meta.pagination ?? {
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: products.length,
  };

  const categories: CategorySummary[] = (categoriesRes as any)?.data ?? [];

  const total = pagination.total;
  const pageCount = pagination.pageCount;
  const curPage = pagination.page;

  const prevDisabled = curPage <= 1;
  const nextDisabled = curPage >= pageCount;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-h1 font-bold text-textWhite">
          Sản phẩm B-Audio
        </h1>
        <p className="mt-2 font-body text-body text-textGrey">
          Khám phá {total} sản phẩm loa chất lượng cao với công nghệ tiên tiến.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full px-4 py-2 font-microcopy text-microcopy uppercase tracking-widest transition-colors ${
              !searchParams?.category
                ? "bg-goldAccent text-darkBg shadow-gold-glow hover:shadow-lg"
                : "border border-darkGrey bg-darkGrey/40 text-textGrey hover:bg-darkGrey/60 hover:text-textWhite"
            } focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg`}
          >
            Tất cả
          </Link>
          {categories.map((cat) => {
            const isActive = searchParams?.category === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className={`rounded-full px-4 py-2 font-microcopy text-microcopy uppercase tracking-widest transition-colors ${
                  isActive
                    ? "bg-goldAccent text-darkBg shadow-gold-glow hover:shadow-lg"
                    : "border border-darkGrey bg-darkGrey/40 text-textGrey hover:bg-darkGrey/60 hover:text-textWhite"
                } focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <SearchFilters />
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-body text-body text-textGrey">
              {searchParams?.search &&
                `Kết quả cho "${searchParams.search}": `}
              {total} sản phẩm
            </p>
            {(searchParams?.search ||
              searchParams?.category ||
              searchParams?.min_price ||
              searchParams?.max_price ||
              searchParams?.min_power ||
              searchParams?.max_power ||
              searchParams?.min_battery ||
              searchParams?.max_battery) && (
              <Link
                href="/products"
                className="rounded text-body text-neonTurquoise hover:underline focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
              >
                Xóa bộ lọc
              </Link>
            )}
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center text-textWhite">
              <div className="mb-2 font-heading text-h3 font-semibold text-textWhite">
                Không tìm thấy sản phẩm
              </div>
              <p className="mb-4 font-body text-body text-textGrey">
                Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.
              </p>
              <Link
                href="/products"
                className="inline-block rounded-2xl bg-goldAccent px-6 py-3 text-darkBg shadow-gold-glow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg transition-shadow"
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <nav className="mt-12 flex items-center justify-between">
              <div className="font-body text-body text-textGrey">
                Trang {curPage} / {pageCount} ({total} sản phẩm)
              </div>

              <div className="flex gap-2">
                {prevDisabled ? (
                  <span className="cursor-not-allowed rounded-2xl border border-darkGrey px-4 py-2 text-textGrey/40">
                    ← Trước
                  </span>
                ) : (
                  <Link
                    href={`/products?${nextQuery(searchParams, {
                      page: String(curPage - 1),
                    })}`}
                    className="rounded-2xl border border-darkGrey px-4 py-2 text-textWhite transition-colors hover:border-goldAccent/50 hover:bg-darkGrey/60 focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg"
                  >
                    ← Trước
                  </Link>
                )}

                {nextDisabled ? (
                  <span className="cursor-not-allowed rounded-2xl border border-darkGrey px-4 py-2 text-textGrey/40">
                    Sau →
                  </span>
                ) : (
                  <Link
                    href={`/products?${nextQuery(searchParams, {
                      page: String(curPage + 1),
                    })}`}
                    className="rounded-2xl border border-darkGrey px-4 py-2 text-textWhite transition-colors hover:border-goldAccent/50 hover:bg-darkGrey/60 focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg"
                  >
                    Sau →
                  </Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </main>
  );
}
