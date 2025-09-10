import Link from 'next/link';

export function ProductCard({ p }: { p: any }) {
  const attrs = p?.attributes || {};
  const img = attrs.images?.data?.[0]?.attributes?.url;
  return (
    <Link href={`/products/${attrs.slug}`} className="group rounded-2xl border p-4 shadow-soft hover:shadow-md transition">
      {img && <img src={img} alt={attrs.title} className="aspect-square w-full rounded-xl object-cover" />}
      <div className="mt-3 font-medium">{attrs.title}</div>
      <div className="text-sm text-gray-600">{new Intl.NumberFormat('vi-VN').format(attrs.price)} đ</div>
    </Link>
  );
}
