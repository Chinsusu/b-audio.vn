'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function Filters() {
  const sp = useSearchParams();
  const router = useRouter();
  const [min, setMin] = useState(sp.get('min') || '');
  const [max, setMax] = useState(sp.get('max') || '');
  const [power, setPower] = useState(sp.get('power') || '');
  const debMin = useDebounce(min, 300);
  const debMax = useDebounce(max, 300);

  useEffect(() => {
    const qs = new URLSearchParams(sp.toString());
    if (debMin) qs.set('min', debMin); else qs.delete('min');
    if (debMax) qs.set('max', debMax); else qs.delete('max');
    if (power) qs.set('power', power); else qs.delete('power');
    router.replace(`/products?${qs.toString()}`, { scroll: false });
  }, [debMin, debMax, power]); // eslint-disable-line

  return (
    <aside className="rounded-2xl border border-cloud bg-white p-4">
      <div className="font-medium">Bộ lọc</div>
      <div className="mt-3 grid gap-2">
        <label className="text-sm">Giá tối thiểu</label>
        <input value={min} onChange={e=>setMin(e.target.value)} className="rounded border px-3 py-2" placeholder="500000" />
        <label className="mt-3 text-sm">Giá tối đa</label>
        <input value={max} onChange={e=>setMax(e.target.value)} className="rounded border px-3 py-2" placeholder="3000000" />
        <label className="mt-3 text-sm">Công suất (W)</label>
        <select value={power} onChange={e=>setPower(e.target.value)} className="rounded border px-3 py-2">
          <option value="">Tất cả</option>
          <option value="200">≥ 200W</option>
          <option value="500">≥ 500W</option>
          <option value="800">≥ 800W</option>
        </select>
      </div>
    </aside>
  );
}
