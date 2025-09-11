'use client';
import { useState } from 'react';

export default function CompareDrawer({ products }: { products: any[] }) {
  const [open, setOpen] = useState(false);
  const selected = products.slice(0,3); // placeholder: implement your selection logic
  if (!selected.length) return null;
  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={()=>setOpen(v=>!v)} className="rounded-full bg-black px-5 py-3 text-white shadow-soft">
        So sánh ({selected.length})
      </button>
      {open && (
        <div className="mt-3 w-[90vw] max-w-3xl rounded-2xl border border-cloud bg-white p-4 shadow-soft">
          <div className="mb-3 text-lg font-semibold">So sánh sản phẩm</div>
          <div className="grid grid-cols-3 gap-3">
            {selected.map((p:any, i:number)=>{
              const a = p.attributes || {}; const img = a.images?.data?.[0]?.attributes?.url;
              return (
                <div key={i} className="rounded-2xl border border-cloud p-3">
                  {img && <img src={img} className="aspect-square w-full rounded-lg object-cover" alt="" />}
                  <div className="mt-2 text-sm font-medium">{a.title}</div>
                  <div className="text-xs text-gray-600">Công suất: {a.power_watt || '-' }W</div>
                  <div className="text-xs text-gray-600">Pin: {a.battery_hours || '-' }h</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
