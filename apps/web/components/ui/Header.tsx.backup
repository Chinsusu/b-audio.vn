'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Phone, Heart, BarChart3 } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { analytics } from '@/lib/analytics';
import CartDrawer from "../cart/CartDrawer";
import { useWishlist } from "@/hooks/useWishlist";
import { useComparison } from "@/hooks/useComparison";

export default function Header() {
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 300);
  const { wishlist } = useWishlist();
  const { comparison } = useComparison();

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
    <header className="sticky top-0 z-40 border-b border-darkGrey bg-darkBg/90 backdrop-blur text-textWhite">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <Link href="/" className="font-heading text-h2 text-goldAccent tracking-tight">b‑audio</Link>
        <nav className="hidden md:flex gap-6 font-microcopy text-microcopy tracking-widest text-textGrey uppercase">
          <Link href="/products" className="hover:text-textWhite transition-colors">SẢN PHẨM</Link>
          <Link href="/custom" className="hover:text-textWhite transition-colors">ĐẶT CUSTOM</Link>
          <Link href="/blog" className="hover:text-textWhite transition-colors">BLOG</Link>
        </nav>
        <form onSubmit={submit} className="ml-auto flex items-center gap-2 rounded-2xl border border-darkGrey bg-darkGrey/40 px-3 focus-within:outline-none focus-within:ring-2 focus-within:ring-neonTurquoise focus-within:ring-offset-2 focus-within:ring-offset-darkBg">
          <Search className="h-4 w-4 opacity-70 text-textGrey" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Tìm loa 500W, pin 12h..."
            className="h-9 w-48 md:w-64 bg-transparent outline-none text-body font-body placeholder:text-textGrey/70"
          />
        </form>
        <a href="https://zalo.me/0877257799" className="hidden md:flex items-center gap-2 rounded-2xl bg-goldAccent px-4 py-2 text-darkBg shadow-glowGold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg transition-shadow">
          <Phone className="h-4 w-4" /> 0877 25 77 99
        </a>
        <div className="flex items-center gap-2">
          <Link 
            href="/wishlist" 
            className="relative flex items-center justify-center h-10 w-10 rounded-2xl border border-darkGrey text-textGrey hover:text-textWhite hover:bg-darkGrey/60 transition-colors focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
            title="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neonTurquoise text-darkBg text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {wishlist.itemCount}
              </span>
            )}
          </Link>
          <Link 
            href="/compare" 
            className="relative flex items-center justify-center h-10 w-10 rounded-2xl border border-darkGrey text-textGrey hover:text-textWhite hover:bg-darkGrey/60 transition-colors focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
            title="So sánh sản phẩm"
          >
            <BarChart3 className="h-5 w-5" />
            {comparison.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-goldAccent text-darkBg text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {comparison.itemCount}
              </span>
            )}
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
