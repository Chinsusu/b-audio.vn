import './globals.css'
import type { ReactNode } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import ToastContainer from '@/components/ui/Toast'
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata = {
  metadataBase: new URL('https://b-audio.vn'),
  title: { default: 'B-Audio | Xưởng Loa DIY', template: '%s | B-Audio' },
  description: 'Loa bluetooth, loa kéo karaoke, gia công theo yêu cầu.',
  openGraph: {
    siteName: 'B-Audio',
    images: [{ url: 'https://b-audio.vn/og/home-cover.svg', width: 1200, height: 630, alt: 'B-Audio' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/home-cover.svg'] },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FLX0YSYM3D"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FLX0YSYM3D');
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-darkBg text-textWhite font-body">
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        {/* Global toast container */}
        <ToastContainer />
      </body>
    </html>
  )
}
