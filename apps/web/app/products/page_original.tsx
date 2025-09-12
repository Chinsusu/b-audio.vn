import Link from 'next/link';
import { mediaUrl } from '../../utils/mediaUrl';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.b-audio.vn";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sản phẩm | B-Audio',
  description: 'Danh sách sản phẩm loa B‑Audio: portable, karaoke... với hình ảnh và giá cập nhật.',
  alternates: { canonical: 'https://b-audio.vn/products' },
  openGraph: {
    title: 'Sản phẩm | B-Audio',
    url: 'https://b-audio.vn/products',
    images: [{ url: 'https://b-audio.vn/og/products-cover.svg', width: 1200, height: 630, alt: 'B-Audio Products' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/products-cover.svg'] },
};


const formatVND = (v: any) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(Number(v || 0));

type SearchParams = { category?: string; min?: string; max?: string; sort?: string; page?: string };

function mapSort(sort?: string): string {
  if (!sort) return 'publishedAt:desc';
  if (sort === 'price:asc' || sort === 'price:desc' || sort === 'publishedAt:desc' || sort === 'publishedAt:asc') return sort;
  if (sort === 'newest') return 'publishedAt:desc';
  return sort;
}

async function getCategories() {
  const res = await fetch(`${API_BASE}/api/categories?fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100`, { next: { revalidate: 300 } });
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return (json.data || []) as any[];
}

async function getProducts(searchParams: SearchParams): Promise<{ items: any[]; meta: any }> {
  const params = new URLSearchParams();
  params.set('populate', 'images,category');
  const pageSize = '12';
  const page = String(Number(searchParams.page || '1') || 1);
  params.set('pagination[pageSize]', pageSize);
  params.set('pagination[page]', page);
  if (searchParams?.category) params.set('filters[category][slug][$eq]', searchParams.category);
  if (searchParams?.min) params.set('filters[price][$gte]', searchParams.min);
  if (searchParams?.max) params.set('filters[price][$lte]', searchParams.max);
  params.set('sort', mapSort(searchParams?.sort));

  const res = await fetch(`${API_BASE}/api/products?${params.toString()}`, { next: { revalidate: 60 } });
  if (!res.ok) return { items: [] as any[], meta: { pagination: { page: Number(page), pageSize: Number(pageSize), pageCount: 1, total: 0 } } };
  const json = await res.json();
  return { items: (json.data || []) as any[], meta: json.meta || { pagination: { page: Number(page), pageSize: Number(pageSize), pageCount: 1, total: 0 } } };
}

function nextQuery(current: SearchParams, patch: Partial<SearchParams>): string {
  const merged: SearchParams = { ...current, ...patch };
  const sp = new URLSearchParams();
  if (merged.category) sp.set('category', merged.category);
  if (merged.min) sp.set('min', merged.min);
  if (merged.max) sp.set('max', merged.max);
  if (merged.sort) sp.set('sort', merged.sort);
  if (merged.page) sp.set('page', merged.page);
  return sp.toString();
}

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const [cats, result] = await Promise.all([
    getCategories(),
    getProducts(searchParams || {}),
  ]);
  const products = result.items;
  const pg = result.meta?.pagination || { page: 1, pageSize: 12, pageCount: 1, total: 0 };
  const curPage = Number(pg.page) || 1;
  const pageCount = Number(pg.pageCount) || 1;
  const pageSizeNum = Number(pg.pageSize || 12) || 12;
  const prevDisabled = curPage <= 1;
  const nextDisabled = curPage >= pageCount;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Sản phẩm | B-Audio',
    url: 'https://b-audio.vn/products',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://b-audio.vn/' },
        { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://b-audio.vn/products' },
      ],
    },
  } as any;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p: any, i: number) => {
      const attrs = p.attributes || {};
      const slug = attrs.slug as string;
      const url = `https://b-audio.vn/products/${slug}`;
      const name = attrs.title as string;
      const rel = attrs.images?.data?.[0]?.attributes?.url as string | undefined;
      const imageUrl = rel ? (/^https?:\/\//.test(rel) ? rel : `${API_BASE}${rel}`) : undefined;
      return {
        '@type': 'ListItem',
        position: (curPage - 1) * pageSizeNum + i + 1,
        url,
        item: {
          '@type': 'Product',
          name,
          url,
          image: imageUrl ? [imageUrl] : undefined,
        },
      };
    }),
  } as any;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />

      <h1 className="text-3xl font-semibold">Sản phẩm</h1>

      <form className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3" method="get">
        <select name="category" defaultValue={searchParams?.category || ''} className="rounded border px-3 py-2">
          <option value="">Tất cả danh mục</option>
          {cats.map((c:any) => (
            <option key={c.id} value={c.attributes?.slug}>{c.attributes?.name}</option>
          ))}
        </select>
        <input name="min" type="number" placeholder="Giá từ" defaultValue={searchParams?.min || ''} className="rounded border px-3 py-2" />
        <input name="max" type="number" placeholder="Giá đến" defaultValue={searchParams?.max || ''} className="rounded border px-3 py-2" />
        <select name="sort" defaultValue={searchParams?.sort || 'publishedAt:desc'} className="rounded border px-3 py-2">
          <option value="publishedAt:desc">Mới nhất</option>
          <option value="price:asc">Giá tăng dần</option>
          <option value="price:desc">Giá giảm dần</option>
        </select>
        <div className="flex gap-3">
          <button className="rounded bg-black px-4 py-2 text-white" type="submit">Lọc</button>
          <a href="/products" className="rounded border px-4 py-2">Xoá lọc</a>
        </div>
      </form>

      {products.length === 0 ? (
        <div className="py-20 text-center text-gray-600">
          Không tìm thấy sản phẩm phù hợp.
          <div className="mt-4"><a className="underline" href="/products">Xoá bộ lọc</a></div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p:any) => {
            const attrs = p.attributes || {};
            const img = attrs.images?.data?.[0]?.attributes?.url as string | undefined;
            const imageUrl = img ? (/^https?:\/\//.test(img) ? img : `${API_BASE}${img}`) : undefined;
            const cat = attrs.category?.data?.attributes?.name as string | undefined;
            const catSlug = attrs.category?.data?.attributes?.slug as string | undefined;
            return (
              <Link key={p.id} href={`/products/${attrs.slug}`} className="rounded-xl border p-4 block">
                {imageUrl && <img src={imageUrl} alt={attrs.title} className="aspect-square w-full object-cover rounded-lg" />}
                <div className="mt-3 flex items-center justify-between">
                  <div className="font-medium">{attrs.title}</div>
                  {typeof attrs.price !== 'undefined' && <div className="text-sm text-gray-700">{formatVND(attrs.price)}</div>}
                </div>
                {cat && catSlug && (
                  <div className="mt-1">
                    <a href={`/products?category=${catSlug}`} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-gray-700">
                      {cat}
                    </a>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}

      <nav className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">Trang {curPage} / {pageCount}</div>
        <div className="flex gap-3">
          {prevDisabled ? (
            <span className="rounded border px-4 py-2 opacity-50">Trước</span>
          ) : (
            <a className="rounded border px-4 py-2" href={`/products?${nextQuery(searchParams || {}, { page: String(curPage - 1) })}`}>Trước</a>
          )}
          {nextDisabled ? (
            <span className="rounded border px-4 py-2 opacity-50">Sau</span>
          ) : (
            <a className="rounded border px-4 py-2" href={`/products?${nextQuery(searchParams || {}, { page: String(curPage + 1) })}`}>Sau</a>
          )}
        </div>
      </nav>
    </main>
  );
}
