import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGallery } from "../../../components/product/ProductGallery";
import { ReviewStars } from "../../../components/product/ReviewStars";
import Price from "../../../components/ui/Price";
import Tag from "../../../components/ui/Tag";
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

async function getTopReviews(productId: number, limit = 3) {
  try {
    const params = new URLSearchParams();
    params.set("filters[product][id][$eq]", String(productId));
    // ensure only published reviews are returned
    params.set("filters[publishedAt][$notNull]", "true");
    params.set("fields[0]", "rating");
    params.set("fields[1]", "author_name");
    params.set("fields[2]", "content");
    params.set("sort", "createdAt:desc");
    params.set("pagination[pageSize]", String(limit));
    const res = await fetch(`${API_BASE}/api/reviews?${params.toString()}`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getProduct(params.slug);
  if (!data) {
    return { title: "Sản phẩm | B-Audio" };
  }
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
  const productId = (data as any).id as number;

  // Get all image URLs
  const allImages =
    p.images?.data?.map((img: any) => mediaUrl(img.attributes.url)) || [];

  const catName = p.category?.data?.attributes?.name as string | undefined;
  const catSlug = p.category?.data?.attributes?.slug as string | undefined;
  let topReviews = await getTopReviews(productId, 3);
  // Fallback: if direct reviews endpoint is restricted, use populated relation
  if (
    (!topReviews || topReviews.length === 0) &&
    Array.isArray(p.reviews?.data)
  ) {
    topReviews = (p.reviews.data as any[]).slice(0, 3).map((rv: any) => ({
      id: rv.id,
      attributes: {
        rating: rv.attributes?.rating,
        author_name: rv.attributes?.author_name,
        content: rv.attributes?.content,
      },
    }));
  }

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
              <Tag href={`/products?category=${catSlug}`}>{catName}</Tag>
            )}
          </div>
          <div className="mt-2">
            <ReviewStars
              rating={Number(p.rating_avg) || 0}
              count={Number(p.rating_count) || 0}
              variant="tag"
              linkHref={`/products/${params.slug}/reviews`}
            />
          </div>
          <Price value={p.price} className="mt-3 tracking-wide" />
          <div
            className="prose mt-6"
            dangerouslySetInnerHTML={{ __html: p.description }}
          />
          {topReviews?.length > 0 && (
            <section className="mt-8">
              <h2 className="font-heading text-h4 text-neutral-100 mb-2">
                Đánh giá nổi bật
              </h2>
              <div className="space-y-4">
                {topReviews.map((rv: any) => (
                  <div
                    key={rv.id}
                    className="rounded-xl border border-gray-600 bg-secondary-800/40 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-neutral-200 font-medium">
                        {rv.attributes.author_name || "Khách hàng"}
                      </div>
                      <ReviewStars rating={Number(rv.attributes.rating) || 0} />
                    </div>
                    <div className="text-neutral-300 whitespace-pre-wrap">
                      {rv.attributes.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href={`/products/${params.slug}/reviews`}
                  className="text-neonTurquoise hover:underline"
                >
                  Xem tất cả đánh giá
                </a>
              </div>
            </section>
          )}
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
