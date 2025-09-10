'use client';
import { useState } from 'react';

export function ProductGallery({ images = [] as string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  return (
    <div className="grid gap-3">
      <div className="aspect-square overflow-hidden rounded-2xl border">
        <img src={images[idx]} alt="" className="h-full w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`aspect-square overflow-hidden rounded-xl border ${i===idx?'ring-2 ring-black':''}`}>
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
