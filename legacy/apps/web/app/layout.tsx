import "./globals.css";

import {
  Barlow_Condensed as BarlowCondensed,
  Exo_2 as Exo2Font,
  Inter as InterFont,
} from "next/font/google";
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

// Default heading: Exo 2 (square, industrial, good Vietnamese support)
const fontHeading = Exo2Font({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = InterFont({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

// Alternate option to compare quickly if needed
const fontHeadingAlt = BarlowCondensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-heading-alt",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="vi"
      className={`${fontHeading.variable} ${fontHeadingAlt.variable} ${fontBody.variable}`}
    >
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
        {/* Small helper to toggle alternate font via ?font=barlow */}
        <Script id="font-toggle" strategy="afterInteractive">
          {`
            try {
              const url = new URL(window.location.href);
              const f = url.searchParams.get('font');
              // Default is Exo 2; pass ?font=barlow to preview Barlow Condensed
              if (f && f.toLowerCase() === 'barlow') document.documentElement.classList.add('use-exo2');
            } catch (e) {}
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
