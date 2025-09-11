import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B-Audio | Xưởng Loa DIY',
  description: 'Loa bluetooth, loa kéo karaoke, gia công theo yêu cầu.',
  alternates: { canonical: 'https://b-audio.vn/' },
  openGraph: {
    title: 'B-Audio | Xưởng Loa DIY',
    url: 'https://b-audio.vn/',
    images: [{ url: 'https://b-audio.vn/og/home-cover.svg', width: 1200, height: 630, alt: 'B-Audio' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/home-cover.svg'] },
};

export default async function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <section className="py-16">
        <h1 className="font-heading text-h1 text-textWhite">Loa DIY · Bluetooth · Loa kéo karaoke</h1>
        <p className="mt-4 text-body text-textGrey">Gia công theo yêu cầu · Bảo hành xưởng · Tối ưu âm thanh theo gu của bạn.</p>
        <div className="mt-8 flex gap-4">
          <Link className="rounded-xl bg-goldAccent px-5 py-3 text-darkBg shadow-glowGold hover:shadow-lg transition-shadow" href="/products">Xem sản phẩm</Link>
          <Link className="rounded-xl border border-darkGrey px-5 py-3 text-textWhite hover:bg-darkGrey/60 transition-colors" href="/custom">Đặt hàng custom</Link>
        </div>
      </section>
    </main>
  );
}
