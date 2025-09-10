# Cách dùng bộ components (apps/web)

## 1) Bọc header/footer trong layout
```tsx
// apps/web/app/layout.tsx
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

## 2) Listing page thêm Filters + ProductCard
```tsx
// apps/web/app/products/page.tsx
import Filters from '@/components/shop/Filters';
import { ProductCard } from '@/components/product/ProductCard';
// ...fetch list như cũ, render:
// <div className="grid md:grid-cols-[240px_1fr] gap-6">
//   <Filters />
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{products.map(p => <ProductCard p={p} />)}</div>
// </div>
```

## 3) PDP dùng ProductGallery + SpecsTable + ReviewStars
```tsx
import { ProductGallery } from '@/components/product/ProductGallery';
import { SpecsTable } from '@/components/product/SpecsTable';
import { ReviewStars } from '@/components/product/ReviewStars';
```
