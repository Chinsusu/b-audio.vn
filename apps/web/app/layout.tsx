import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Xưởng Loa DIY | yourdomain.com',
  description: 'Loa bluetooth, loa kéo karaoke, gia công theo yêu cầu.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
