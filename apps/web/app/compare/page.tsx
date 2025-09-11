import type { Metadata } from 'next';
import ComparisonPageClient from './ComparisonPageClient';

export const metadata: Metadata = {
  title: 'So sánh sản phẩm | B-Audio Vietnam',
  description: 'So sánh chi tiết các sản phẩm loa B-Audio: giá cả, công suất, pin, và tính năng.',
  alternates: { canonical: 'https://b-audio.vn/compare' },
  openGraph: {
    title: 'So sánh sản phẩm | B-Audio Vietnam',
    url: 'https://b-audio.vn/compare',
    images: [{ url: 'https://b-audio.vn/og/compare-cover.svg', width: 1200, height: 630, alt: 'So sánh sản phẩm B-Audio' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/compare-cover.svg'] },
};

export default function ComparePage() {
  return <ComparisonPageClient />;
}
