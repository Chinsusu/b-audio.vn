"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: { id?: number; url: string; alt?: string | null }[];
};

const placeholder = {
  url: "data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%231A1A1A' offset='0'/%3E%3Cstop stop-color='%234B3A2B' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dy='0.35em' fill='%23C8A15A' font-family='sans-serif' font-size='32' font-weight='bold' text-anchor='middle'%3EB-AUDIO%3C/text%3E%3C/svg%3E",
  alt: "B-Audio",
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const list = images?.length ? images : [placeholder];
  const [current, setCurrent] = useState(0);
  const active = list[current] || placeholder;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-600 bg-secondary-800">
        <Image
          src={active.url}
          alt={active.alt || "Product image"}
          fill
          sizes="(max-width: 1024px) 100vw, 512px"
          className="object-cover"
          priority
        />
      </div>

      {list.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
          {list.map((img, idx) => (
            <button
              key={img.id || img.url + idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`relative aspect-square overflow-hidden rounded-xl border ${
                idx === current
                  ? "border-primary shadow-gold-glow"
                  : "border-gray-700 hover:border-primary/60"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || "Thumb"}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

