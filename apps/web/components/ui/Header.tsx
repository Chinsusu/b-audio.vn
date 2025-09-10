'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Search, Phone } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { analytics } from '@/lib/analytics';

export default function Header() {
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 300);

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
      </div>
    </header>
  );
}
