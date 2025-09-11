import Link from 'next/link';

async function getProducts() {
  const base = API_BASE;
  const res = await fetch(`${base}/api/products?populate=images`, { next: { revalidate: 60 }});
  if (!res.ok) return [];
  const json = await res.json();
  return json.data || [];
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Sản phẩm</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p:any) => {
          const attrs = p.attributes || {};
          const img = attrs.images?.data?.[0]?.attributes?.url;
          const imageUrl = img ? (/^https?:\/\\//.test(img) ? img : `${API_BASE}${img}`) : null;
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
