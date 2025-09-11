import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.b-audio.vn';

export async function generateStaticParams() {
  const res = await fetch(`${API_BASE}/api/products?fields[0]=slug&pagination[pageSize]=100`);
  const json = await res.json().catch(()=>({data:[]}));
  return (json.data||[]).map((p:any)=>({ slug: p.attributes.slug }));
}

async function getProduct(slug:string) {
  const res = await fetch(`${API_BASE}/api/products?filters[slug][$eq]=${slug}&populate=images,reviews,faqs,category`, { next: { revalidate: 120 }});
  const json = await res.json();
  return json.data?.[0];
}

export async function generateMetadata({ params }: { params: { slug: string }}): Promise<Metadata> {
  const data = await getProduct(params.slug);
  if (!data) return { title: 'Sản phẩm | B-Audio' };
  const p = data.attributes;
  const rel = p.images?.data?.[0]?.attributes?.url as string | undefined;
  const imageUrl = rel ? (/^https?:\/\//.test(rel) ? rel : `${API_BASE}${rel}`) : undefined;
  const title = `${p.title} | B-Audio`;
  const desc = p.description ? String(p.description).replace(/<[^>]+>/g,'').slice(0, 160) : `${p.title} – sản phẩm của B-Audio`;
  const canonical = `https://b-audio.vn/products/${params.slug}`;
  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string }}) {
  const data = await getProduct(params.slug);
  if (!data) return notFound();
  const p = data.attributes;
  const rel = p.images?.data?.[0]?.attributes?.url as string | undefined;
  const imageUrl = rel ? (/^https?:\/\//.test(rel) ? rel : `${API_BASE}${rel}`) : undefined;
  const canonical = `https://b-audio.vn/products/${params.slug}`;

  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    image: imageUrl ? [imageUrl] : undefined,
    description: p.description ? String(p.description).replace(/<[^>]+>/g,'') : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: p.price,
      availability: 'http://schema.org/InStock',
      url: canonical,
    },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://b-audio.vn/' },
      { '@type': 'ListItem', position: 2, name: 'Sản phẩm', item: 'https://b-audio.vn/products' },
      { '@type': 'ListItem', position: 3, name: p.title, item: canonical },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>{imageUrl && <img src={imageUrl} alt={p.title} className="rounded-xl w-full object-cover" />}</div>
        <div>
          <h1 className="text-3xl font-semibold">{p.title}</h1>
          <div className="mt-2 text-xl text-gray-700">{new Intl.NumberFormat('vi-VN').format(p.price)} đ</div>
          <div className="prose mt-6" dangerouslySetInnerHTML={{__html: p.description}} />
          <form className="mt-6 grid gap-3">
            <input className="rounded border px-3 py-2" name="name" placeholder="Tên của bạn" />
            <input className="rounded border px-3 py-2" name="phone" placeholder="Số điện thoại" />
            <button className="rounded bg-black px-5 py-3 text-white" type="button">Đặt hàng nhanh</button>
          </form>
        </div>
      </article>
    </main>
  );
}
