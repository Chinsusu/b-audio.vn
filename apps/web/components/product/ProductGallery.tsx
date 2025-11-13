"use client";
import { useState } from "react";

export function ProductGallery({ images = [] as string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) {return null;}
  return (
    <div className="grid gap-3">
      <div className="aspect-square overflow-hidden rounded-2xl bg-secondary-800 border border-gray-600">
        <img src={images[idx]} alt="" className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`aspect-square overflow-hidden rounded-xl bg-secondary-800 border transition-all duration-300 ${
                i === idx
                  ? "ring-2 ring-primary border-primary shadow-gold-glow"
                  : "border-gray-600 hover:border-primary/50"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
