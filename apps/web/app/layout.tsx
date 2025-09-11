import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  metadataBase: new URL('https://b-audio.vn'),
  title: { default: 'B-Audio | Xưởng Loa DIY', template: '%s | B-Audio' },
  description: 'Loa bluetooth, loa kéo karaoke, gia công theo yêu cầu.',
  openGraph: {
    siteName: 'B-Audio',
    images: [{ url: 'https://b-audio.vn/og/home-cover.svg', width: 1200, height: 630, alt: 'B-Audio' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/home-cover.svg'] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
