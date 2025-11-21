import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "B-Audio | Xưởng Loa DIY",
  description: "Website B-Audio v2 (Laravel API + Next.js)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <main className="mx-auto max-w-7xl px-6 py-10">
          <Layout>{children}</Layout>
        </main>
      </body>
    </html>
  );
}
