import { ArrowRight, Shield, Wrench, Zap } from "lucide-react";
import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const res = await getProducts({ page: 1, pageSize: 6 }).catch(() => null);
  const products = res?.data ?? [];

  return (
    <div className="space-y-12">
      <section className="section-hero relative flex min-h-screen items-center overflow-hidden">
        <div className="metal-texture absolute inset-0 opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/50 via-transparent to-accent-800/30" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2">
          <div className="stagger-fade-up space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading text-hero lg:text-display font-bold uppercase tracking-tight text-neutral-100 leading-none">
                INDUSTRIAL
                <br />
                <span className="glow-text text-primary">AUDIO</span>
                <br />
                WORKSHOP
              </h1>
              <div className="h-1 w-24 bg-primary shadow-gold-glow" />
            </div>

            <p className="font-body text-body-lg leading-relaxed text-neutral-300 max-w-lg">
              Chế tạo loa bluetooth chuyên nghiệp và hệ thống karaoke di động
              với tiêu chuẩn công nghiệp.{" "}
              <span className="font-semibold text-primary">DIY Focus</span> -
              <span className="font-semibold text-primary">Mobile-First</span> -
              <span className="font-semibold text-primary">Trust</span>.
            </p>

            <div className="flex items-center gap-6 text-body-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Bảo hành 2 năm</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Giao hàng 48h</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/products" className="btn-primary group">
                <span>KHÁM PHÁ SẢN PHẨM</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/custom" className="btn-secondary group">
                <Wrench className="h-4 w-4" />
                <span>ĐẶT CUSTOM</span>
              </Link>
            </div>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-3xl animate-pulse" />

              <div className="card-industrial relative overflow-hidden p-8">
                <div className="absolute inset-4 rounded-xl border-2 border-gray-600" />
                <div className="absolute inset-6 rounded-lg border border-primary/30" />

                <div className="relative space-y-6">
                  <div className="mb-6 border-b border-gray-600 pb-4 text-center">
                    <div className="logo mb-2 text-h3">b-audio</div>
                    <div className="text-microcopy tracking-widest text-neutral-400 uppercase">
                      DIY SERIES
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="shadow-gold-glow relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-primary/50 bg-secondary-800 overflow-hidden">
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary/30 bg-secondary-700">
                        <div className="h-20 w-20 rounded-full border border-primary/40 bg-primary/20" />
                      </div>
                      <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-gray-500" />
                      <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-gray-500" />
                      <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-gray-500" />
                      <div className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-gray-500" />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-600 bg-secondary-800">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-500 bg-secondary-700">
                        <div className="h-6 w-6 rounded-full bg-neutral-400" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-600 bg-secondary-900 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <div className="shadow-gold-glow h-3 w-3 animate-pulse rounded-full bg-primary" />
                        <div className="h-3 w-3 rounded-full bg-gray-600" />
                        <div className="h-3 w-3 rounded-full bg-gray-600" />
                      </div>
                      <div className="text-microcopy tracking-wider text-neutral-400">
                        POWER ON
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sản phẩm nổi bật</h2>
        {products.length === 0 ? (
          <p className="text-sm text-neutral-500">
            Chưa có sản phẩm (hoặc API chưa có dữ liệu). Thêm dữ liệu trong
            Laravel rồi reload.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
