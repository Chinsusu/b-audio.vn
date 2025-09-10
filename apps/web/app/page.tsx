import Link from 'next/link';

export default async function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="py-16">
        <h1 className="text-4xl font-semibold">Loa DIY · Bluetooth · Loa kéo karaoke</h1>
        <p className="mt-4 text-lg text-gray-600">Gia công theo yêu cầu · Bảo hành xưởng · Tối ưu âm thanh theo gu của bạn.</p>
        <div className="mt-8 flex gap-4">
          <Link className="rounded-xl bg-black px-5 py-3 text-white" href="/products">Xem sản phẩm</Link>
          <Link className="rounded-xl border px-5 py-3" href="/custom">Đặt hàng custom</Link>
        </div>
      </section>
    </main>
  );
}
