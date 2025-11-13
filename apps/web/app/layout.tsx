import "./globals.css";

import { Chakra_Petch, Inter as InterFont } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

export const metadata = {
  metadataBase: new URL("https://b-audio.vn"),
  title: { default: "B-Audio | Xưởng Loa DIY", template: "%s | B-Audio" },
  description: "Loa bluetooth, loa kéo karaoke, gia công theo yêu cầu.",
  openGraph: {
    siteName: "B-Audio",
    images: [
      {
        url: "https://b-audio.vn/og/home-cover.svg",
        width: 1200,
        height: 630,
        alt: "B-Audio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://b-audio.vn/og/home-cover.svg"],
  },
};

const fontHeading = Chakra_Petch({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = InterFont({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Note: no manual font preloads to avoid 404s/unused warnings; fonts are loaded via CSS/next-font */}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FLX0YSYM3D"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FLX0YSYM3D');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-secondary-900 text-neutral-200 font-body antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
