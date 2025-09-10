'use client';
import { analytics } from '@/lib/analytics';

export default function AddToQuoteClient({ product }: { product: any }) {
  function onClick() {
    analytics.add_to_quote(product);
  }
  return (
    <button onClick={onClick} className="rounded bg-black px-5 py-3 text-white" type="button">
      Đặt hàng nhanh
    </button>
  );
}
