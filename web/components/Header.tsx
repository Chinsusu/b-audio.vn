"use client";

import { BarChart3, Heart, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [q, setQ] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qs = q.trim();
    if (qs) {
      window.location.href = `/products?search=${encodeURIComponent(qs)}`;
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 glass-industrial border-b border-gray-600">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
          <Link
            href="/"
            className="logo text-h2 glow-text hover-glow transition-glow"
          >
            b‑audio
          </Link>

          <nav className="hidden gap-8 ml-8 lg:flex">
            <Link
              href="/products"
              className="nav-link font-heading text-microcopy uppercase tracking-widest"
            >
              SẢN PHẨM
            </Link>
            <Link
              href="/custom"
              className="nav-link font-heading text-microcopy uppercase tracking-widest"
            >
              ĐẶT CUSTOM
            </Link>
            <Link
              href="/blog"
              className="nav-link font-heading text-microcopy uppercase tracking-widest"
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="nav-link font-heading text-microcopy uppercase tracking-widest"
            >
              GIỚI THIỆU
            </Link>
            <Link
              href="/faq"
              className="nav-link font-heading text-microcopy uppercase tracking-widest"
            >
              FAQ
            </Link>
          </nav>

          <form
            onSubmit={submit}
            className="hidden ml-auto flex-1 max-w-lg md:block"
          >
            <div className="input-search w-full focus-industrial">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm loa 500W, pin 12h..."
                className="w-full bg-transparent outline-none text-body font-body placeholder:text-gray-400"
              />
            </div>
          </form>

          <a
            href="https://zalo.me/0877257799"
            className="btn-primary hidden items-center gap-2 hover-industrial lg:flex"
          >
            <Phone className="h-4 w-4" />
            0877 25 77 99
          </a>

          <div className="flex items-center gap-2">
            <Link
              href="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-600 bg-secondary-800 text-neutral-300 transition-industrial hover:border-primary hover:text-primary focus-industrial"
              title="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </Link>

            <Link
              href="/compare"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-600 bg-secondary-800 text-neutral-300 transition-industrial hover:border-primary hover:text-primary focus-industrial"
              title="So sánh sản phẩm"
            >
              <BarChart3 className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-600 bg-secondary-800 text-neutral-300 transition-industrial hover:border-primary hover:text-primary focus-industrial lg:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div className="px-6 pb-4 md:hidden">
          <form onSubmit={submit}>
            <div className="input-search w-full focus-industrial">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm loa 500W, pin 12h..."
                className="w-full bg-transparent outline-none text-body font-body placeholder:text-gray-400"
              />
            </div>
          </form>
        </div>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-600 p-6">
            <span className="logo text-h3 glow-text">b‑audio</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-600 bg-secondary-800 text-neutral-300 transition-industrial hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col space-y-6 p-6">
            <Link
              href="/products"
              className="text-h4 font-heading uppercase tracking-wide text-neutral-200 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              SẢN PHẨM
            </Link>
            <Link
              href="/custom"
              className="text-h4 font-heading uppercase tracking-wide text-neutral-200 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              ĐẶT CUSTOM
            </Link>
            <Link
              href="/blog"
              className="text-h4 font-heading uppercase tracking-wide text-neutral-200 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="text-h4 font-heading uppercase tracking-wide text-neutral-200 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              GIỚI THIỆU
            </Link>
            <Link
              href="/faq"
              className="text-h4 font-heading uppercase tracking-wide text-neutral-200 transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>

            <div className="border-t border-gray-600 pt-6">
              <a
                href="https://zalo.me/0877257799"
                className="btn-primary hover-industrial flex w-full items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                LIÊN HỆ: 0877 25 77 99
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
