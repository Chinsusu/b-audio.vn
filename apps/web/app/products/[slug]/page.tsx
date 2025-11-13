import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGallery } from "../../../components/product/ProductGallery";
import Price from "../../../components/ui/Price";
import { mediaUrl } from "../../../utils/mediaUrl";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.b-audio.vn";
const DEFAULT_OG = "https://b-audio.vn/og/product-default.svg";

export async function generateStaticParams() {
  const res = await fetch(
    `${API_BASE}/api/products?fields[0]=slug&pagination[pageSize]=100`,
  );
  const json = await res.json().catch(() => ({ data: [] }));
  return (json.data || []).map((p: any) => ({ slug: p.attributes.slug }));
}

async function getProduct(slug: string) {
  const res = await fetch(
    `${API_BASE}/api/products?filters[slug][$eq]=${slug}&populate=images,reviews,faqs,category`,
    {
      next: { revalidate: 120 },
    },
  );
  const json = await res.json();
  return json.data?.[0];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getProduct(params.slug);
  if (!data) {return { title: "Sản phẩm | B-Audio" };}
  const p = data.attributes as any;
  const rel = p.images?.data?.[0]?.attributes?.url as string | undefined;
  const imageUrl = rel ? mediaUrl(rel) : undefined;
  const title = `${p.title} | B-Audio`;
  const desc = p.description
    ? String(p.description)
        .replace(/<[^>]+>/g, "")
        .slice(0, 160)
    : `${p.title} – sản phẩm của B-Audio`;
  const canonical = `https://b-audio.vn/products/${params.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      images: imageUrl
        ? [{ url: imageUrl }]
        : [{ url: DEFAULT_OG, width: 1200, height: 630, alt: p.title }],
    },
    twitter: { card: "summary_large_image", images: [imageUrl || DEFAULT_OG] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getProduct(params.slug);
  if (!data) {
    notFound();
  }
  const p = (data as any).attributes;

  // Get all image URLs
  const allImages =
    p.images?.data?.map((img: any) => mediaUrl(img.attributes.url)) || [];

  const catName = p.category?.data?.attributes?.name as string | undefined;
  const catSlug = p.category?.data?.attributes?.slug as string | undefined;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductGallery images={allImages} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">{p.title}</h1>
            {catName && catSlug && (
              <a
                href={`/products?category=${catSlug}`}
                className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-gray-700"
              >
                {catName}
              </a>
            )}
          </div>
          <Price value={p.price} className="mt-3 tracking-wide" />
          <div
            className="prose mt-6"
            dangerouslySetInnerHTML={{ __html: p.description }}
          />
          <form className="mt-6 grid gap-3" action="/contact" method="get">
            <input
              className="rounded border px-3 py-2"
              name="name"
              placeholder="Tên của bạn"
            />
            <input
              className="rounded border px-3 py-2"
              name="phone"
              placeholder="Số điện thoại"
            />
            <button
              className="rounded bg-black px-5 py-3 text-white"
              type="submit"
            >
              Đặt hàng nhanh
            </button>
          </form>
        </div>
      </article>
    </main>
  );
}
