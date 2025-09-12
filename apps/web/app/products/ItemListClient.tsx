'use client';
import { ProductCard } from '@/components/product/ProductCard';
import Filters from '@/components/shop/Filters';

export default function ItemListClient({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
      <Filters />
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((p:any) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </div>
  );
}
