import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'https://api.yourdomain.com';
  const res = await fetch(`${base}/api/products?fields[0]=slug&pagination[pageSize]=100`);
  const json = await res.json().catch(()=>({data:[]}));
  return (json.data||[]).map((p:any)=>({ slug: p.attributes.slug }));
}

async function getProduct(slug:string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || 'https://api.yourdomain.com';
  const res = await fetch(`${base}/api/products?filters[slug][$eq]=${slug}&populate=images,reviews,faqs`, { next: { revalidate: 120 }});
  const json = await res.json();
  return json.data?.[0];
}

export default async function ProductPage({ params }: { params: { slug: string }}) {
  const data = await getProduct(params.slug);
  if (!data) return notFound();
  const p = data.attributes;
  const img = p.images?.data?.[0]?.attributes?.url;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>{img && <img src={img} alt={p.title} className="rounded-xl w-full object-cover" />}</div>
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
