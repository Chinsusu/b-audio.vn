import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.b-audio.vn';

async function getCategories() {
  const res = await fetch(`${API_BASE}/api/categories?fields[0]=name&fields[1]=slug&sort=name:asc&pagination[pageSize]=100`, { next: { revalidate: 300 } });
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return (json.data || []) as any[];
}

async function getProducts(searchParams: { category?: string; min?: string; max?: string }) {
  const params = new URLSearchParams();
  params.set('populate', 'images,category');
  params.set('pagination[pageSize]', '12');
  if (searchParams?.category) params.set('filters[category][slug][$eq]', searchParams.category);
  if (searchParams?.min) params.set('filters[price][$gte]', searchParams.min);
  if (searchParams?.max) params.set('filters[price][$lte]', searchParams.max);

  const res = await fetch(`${API_BASE}/api/products?${params.toString()}`, { next: { revalidate: 60 } });
  if (!res.ok) return [] as any[];
  const json = await res.json();
  return (json.data || []) as any[];
}

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string; min?: string; max?: string }}) {
  const [products, categories] = await Promise.all([
    getProducts(searchParams || {} as any),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Sản phẩm</h1>

      <form className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3" method="get">
        <select name="category" defaultValue={searchParams?.category || ''} className="rounded border px-3 py-2">
          <option value="">Tất cả danh mục</option>
          {categories.map((c:any) => (
            <option key={c.id} value={c.attributes?.slug}>{c.attributes?.name}</option>
          ))}
        </select>
        <input name="min" type="number" placeholder="Giá từ" defaultValue={searchParams?.min || ''} className="rounded border px-3 py-2" />
        <input name="max" type="number" placeholder="Giá đến" defaultValue={searchParams?.max || ''} className="rounded border px-3 py-2" />
        <div className="flex gap-3">
          <button className="rounded bg-black px-4 py-2 text-white" type="submit">Lọc</button>
          <a href="/products" className="rounded border px-4 py-2">Xoá lọc</a>
        </div>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p:any) => {
          const attrs = p.attributes || {};
          const img = attrs.images?.data?.[0]?.attributes?.url as string | undefined;
          const imageUrl = img ? (/^https?:\/\//.test(img) ? img : `${API_BASE}${img}`) : undefined;
          return (
            <Link key={p.id} href={`/products/${attrs.slug}`} className="rounded-xl border p-4">
              {imageUrl && <img src={imageUrl} alt={attrs.title} className="aspect-square w-full object-cover rounded-lg" />}
              <div className="mt-3 font-medium">{attrs.title}</div>
              <div className="text-sm text-gray-600">{new Intl.NumberFormat('vi-VN').format(attrs.price)} đ</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
