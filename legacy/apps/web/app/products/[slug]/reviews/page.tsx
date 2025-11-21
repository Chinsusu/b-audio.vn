import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.b-audio.vn";

async function getProductBySlug(slug: string) {
  const res = await fetch(
    `${API_BASE}/api/products?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=slug`,
    { next: { revalidate: 60 } },
  );
  const json = await res.json();
  return json.data?.[0] || null;
}

async function getReviews(productId: number, page: number) {
  const params = new URLSearchParams();
  params.set("filters[product][id][$eq]", String(productId));
  params.set("fields[0]", "rating");
  params.set("fields[1]", "author_name");
  params.set("fields[2]", "content");
  params.set("sort", "createdAt:desc");
  params.set("pagination[page]", String(page));
  params.set("pagination[pageSize]", "10");
  const res = await fetch(`${API_BASE}/api/reviews?${params.toString()}`, {
    next: { revalidate: 30 },
  });
  const json = await res.json();
  return { items: json.data || [], meta: json.meta?.pagination };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  const title = p?.attributes?.title
    ? `Đánh giá ${p.attributes.title} | B-Audio`
    : "Đánh giá sản phẩm | B-Audio";
  return { title };
}

export default async function ReviewsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const page = Number(searchParams?.page || "1");
  const p = await getProductBySlug(params.slug);
  if (!p) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        Không tìm thấy sản phẩm
      </main>
    );
  }
  const productId = p.id as number;
  const title = p.attributes.title as string;
  const { items, meta } = await getReviews(productId, page);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-heading text-h2 text-neutral-100 mb-4">
        Đánh giá: {title}
      </h1>
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-neutral-400">Chưa có đánh giá.</div>
        ) : (
          items.map((rv: any) => (
            <article
              key={rv.id}
              className="rounded-xl border border-gray-600 bg-secondary-800/40 p-4"
            >
              <div className="text-neutral-200 font-medium mb-1">
                {rv.attributes.author_name || "Khách hàng"}
              </div>
              <div className="text-neutral-300 whitespace-pre-wrap">
                {rv.attributes.content}
              </div>
              <div className="mt-1 text-sm text-neutral-400">
                Đánh giá: {rv.attributes.rating}/5
              </div>
            </article>
          ))
        )}
      </div>
      {meta && meta.pageCount > 1 && (
        <nav className="mt-6 flex items-center justify-between text-neutral-300">
          <a
            href={`?page=${Math.max(1, page - 1)}`}
            className={`px-3 py-2 rounded border border-gray-600 ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            ← Trước
          </a>
          <span>
            Trang {meta.page} / {meta.pageCount}
          </span>
          <a
            href={`?page=${Math.min(meta.pageCount, page + 1)}`}
            className={`px-3 py-2 rounded border border-gray-600 ${page >= meta.pageCount ? "pointer-events-none opacity-50" : ""}`}
          >
            Sau →
          </a>
        </nav>
      )}
    </main>
  );
}
