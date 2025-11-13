"use client";
import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images = [] as string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) {
    return null;
  }
  return (
    <div className="grid gap-3">
      <div className="aspect-square overflow-hidden rounded-2xl bg-secondary-800 border border-gray-600 relative">
        <Image
          src={images[idx]}
          alt={`Hình sản phẩm ${idx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-secondary-800 border transition-all duration-300 ${
                i === idx
                  ? "ring-2 ring-primary border-primary shadow-gold-glow"
                  : "border-gray-600 hover:border-primary/50"
              }`}
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <Image
                src={src}
                alt="Thumbnail"
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
