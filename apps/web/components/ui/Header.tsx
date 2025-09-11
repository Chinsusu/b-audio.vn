'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Phone, Heart } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { analytics } from '@/lib/analytics';
import CartDrawer from "../cart/CartDrawer";
import { useWishlist } from "@/hooks/useWishlist";

export default function Header() {
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 300);
  const { wishlist } = useWishlist();

  // Simple client-side search redirect
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qs = (debounced || '').trim();
    if (qs) {
      analytics.event('search', { search_term: qs });
      window.location.href = `/products?search=${encodeURIComponent(qs)}`;
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">b‑audio</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/products">Sản phẩm</Link>
          <Link href="/custom">Đặt custom</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <form onSubmit={submit} className="ml-auto flex items-center gap-2 rounded-xl border px-3">
          <Search className="h-4 w-4 opacity-60" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm loa 500W, pin 12h..."
            className="h-9 w-48 md:w-64 bg-transparent outline-none text-sm"
          />
        </form>
        <a href="https://zalo.me/0877257799" className="hidden md:flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white">
          <Phone className="h-4 w-4" /> 0877 25 77 99
        </a>
        <div className="flex items-center gap-2">
          <Link 
            href="/wishlist" 
            className="relative flex items-center justify-center h-10 w-10 rounded-lg border hover:bg-gray-50 transition-colors"
            title="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {wishlist.itemCount}
              </span>
            )}
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
