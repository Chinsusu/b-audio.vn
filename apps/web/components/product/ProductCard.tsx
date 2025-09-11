import Link from 'next/link';
import AddToCartButton from '../cart/AddToCartButton';

export function ProductCard({ p }: { p: any }) {
  const attrs = p?.attributes || {};
  const img = attrs.images?.data?.[0]?.attributes?.url;
  return (
    <div className="group rounded-2xl border p-4 shadow-soft hover:shadow-md transition">
      <Link href={`/products/${attrs.slug}`}>
        {img && <img src={img} alt={attrs.title} className="aspect-square w-full rounded-xl object-cover" />}
        <div className="mt-3 font-medium">{attrs.title}</div>
        <div className="text-sm text-gray-600">{new Intl.NumberFormat('vi-VN').format(attrs.price)} đ</div>
      </Link>
      <div className="mt-3">
        <AddToCartButton 
          product={{ 
            id: p.id, 
            slug: attrs.slug, 
            attributes: { 
              title: attrs.title, 
              price_vnd: attrs.price, 
              images: attrs.images 
            } 
          }} 
          className="w-full text-sm"
          variant="secondary"
        />
      </div>
    </div>
  );
}
