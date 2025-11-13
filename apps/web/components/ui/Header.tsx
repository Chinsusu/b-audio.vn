"use client";
import { BarChart3, Heart, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [q, setQ] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simple client-side search redirect
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
          {/* Logo */}
          <Link
            href="/"
            className="logo text-h2 glow-text hover-glow transition-glow"
          >
            b‑audio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 ml-8">
            <Link
              href="/products"
              className="nav-link text-microcopy uppercase tracking-widest"
            >
              SẢN PHẨM
            </Link>
            <Link
              href="/custom"
              className="nav-link text-microcopy uppercase tracking-widest"
            >
              ĐẶT CUSTOM
            </Link>
            <Link
              href="/blog"
              className="nav-link text-microcopy uppercase tracking-widest"
            >
              BLOG
            </Link>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={submit}
            className="ml-auto flex-1 max-w-lg hidden md:block"
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

          {/* Contact CTA - Desktop */}
          <a
            href="https://zalo.me/0877257799"
            className="btn-primary hidden lg:flex items-center gap-2 hover-industrial"
          >
            <Phone className="h-4 w-4" />
            0877 25 77 99
          </a>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-secondary-800 border border-gray-600 text-neutral-300 hover:text-primary hover:border-primary transition-industrial focus-industrial"
              title="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Comparison */}
            <Link
              href="/compare"
              className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-secondary-800 border border-gray-600 text-neutral-300 hover:text-primary hover:border-primary transition-industrial focus-industrial"
              title="So sánh sản phẩm"
            >
              <BarChart3 className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-12 w-12 rounded-2xl bg-secondary-800 border border-gray-600 text-neutral-300 hover:text-primary hover:border-primary transition-industrial focus-industrial"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        <div className="md:hidden px-6 pb-4">
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

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-600">
            <span className="logo text-h3 glow-text">b‑audio</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center h-10 w-10 rounded-2xl bg-secondary-800 border border-gray-600 text-neutral-300 hover:text-primary hover:border-primary transition-industrial"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Content */}
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              href="/products"
              className="text-h4 font-heading text-neutral-200 hover:text-primary transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              SẢN PHẨM
            </Link>
            <Link
              href="/custom"
              className="text-h4 font-heading text-neutral-200 hover:text-primary transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              ĐẶT CUSTOM
            </Link>
            <Link
              href="/blog"
              className="text-h4 font-heading text-neutral-200 hover:text-primary transition-colors uppercase tracking-wide"
              onClick={() => setMobileMenuOpen(false)}
            >
              BLOG
            </Link>

            {/* Mobile Contact CTA */}
            <div className="pt-6 border-t border-gray-600">
              <a
                href="https://zalo.me/0877257799"
                className="btn-primary w-full flex items-center justify-center gap-2 hover-industrial"
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
