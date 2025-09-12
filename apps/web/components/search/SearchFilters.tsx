'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

// Dual Range Slider with separated interactive areas
interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue: (val: number) => string;
  accent: 'gold' | 'neon';
}

function DualRangeSlider({ min, max, step, value, onChange, formatValue, accent }: DualRangeSliderProps) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);

  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  }, [value]);

  const handleMinChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(event.target.value);
    const newMinVal = Math.min(raw, maxVal - step);
    setMinVal(newMinVal);
    onChange([newMinVal, maxVal]);
  }, [maxVal, step, onChange]);

  const handleMaxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(event.target.value);
    const newMaxVal = Math.max(raw, minVal + step);
    setMaxVal(newMaxVal);
    onChange([minVal, newMaxVal]);
  }, [minVal, step, onChange]);

  const accentColor = accent === 'gold' ? '#C8A15A' : '#00E0B8';
  const minPercent = ((minVal - min) / (max - min)) * 100; // 0..100
  const maxPercent = ((maxVal - min) / (max - min)) * 100; // 0..100

  return (
    <div className="space-y-4">
      <div className="relative h-2 bg-darkBg rounded-lg">
        {/* Selected range */}
        <div
          className="absolute top-0 h-full rounded-lg pointer-events-none"
          style={{ left: `${minPercent}%`, width: `${Math.max(0, maxPercent - minPercent)}%`, background: accentColor, opacity: 0.6 }}
        />

        {/* Min slider: interactive area only to the left of max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute h-2 bg-transparent appearance-none cursor-pointer outline-none"
          style={{ left: 0, width: `${Math.max(0, maxPercent)}%`, zIndex: 3 }}
        />

        {/* Max slider: interactive area only to the right of min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute h-2 bg-transparent appearance-none cursor-pointer outline-none"
          style={{ left: `${Math.max(0, minPercent)}%`, width: `${Math.max(0, 100 - minPercent)}%`, zIndex: 2 }}
        />
      </div>

      {/* Values */}
      <div className="flex justify-between items-center text-textGrey text-sm">
        <span className={`px-2 py-1 rounded text-xs bg-darkBg border ${accent === 'gold' ? 'border-goldAccent/50 text-goldAccent' : 'border-neonTurquoise/50 text-neonTurquoise'}`}>
          {formatValue(minVal)}
        </span>
        <span className="text-textGrey/60">—</span>
        <span className={`px-2 py-1 rounded text-xs bg-darkBg border ${accent === 'gold' ? 'border-goldAccent/50 text-goldAccent' : 'border-neonTurquoise/50 text-neonTurquoise'}`}>
          {formatValue(maxVal)}
        </span>
      </div>

      <style jsx>{`
        input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; height: 8px; }
        input[type="range"]::-webkit-slider-track { -webkit-appearance: none; background: transparent; height: 8px; }
        input[type="range"]::-moz-range-track { background: transparent; height: 8px; border: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: ${accentColor}; border: 2px solid ${accentColor}; box-shadow: 0 0 8px ${accentColor}66; }
        input[type="range"]::-moz-range-thumb { height: 20px; width: 20px; border-radius: 50%; background: ${accentColor}; border: 2px solid ${accentColor}; box-shadow: 0 0 8px ${accentColor}66; }
        input[type="range"]:active::-webkit-slider-thumb { box-shadow: 0 0 14px ${accentColor}88; transform: scale(1.06); }
        input[type="range"]:active::-moz-range-thumb { box-shadow: 0 0 14px ${accentColor}88; transform: scale(1.06); }
      `}</style>
    </div>
  );
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    priceRange: [0, 50000000] as [number, number],
    powerRange: [0, 2000] as [number, number],
    batteryRange: [0, 24] as [number, number],
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sort') || 'newest',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const newFilters = {
      ...filters,
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sort') || 'newest',
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  }, [searchParams]);

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.sortBy !== 'newest') params.set('sort', newFilters.sortBy);
    if (newFilters.priceRange[0] > 0) params.set('minPrice', newFilters.priceRange[0].toString());
    if (newFilters.priceRange[1] < 50000000) params.set('maxPrice', newFilters.priceRange[1].toString());
    if (newFilters.powerRange[0] > 0) params.set('minPower', newFilters.powerRange[0].toString());
    if (newFilters.powerRange[1] < 2000) params.set('maxPower', newFilters.powerRange[1].toString());
    if (newFilters.batteryRange[0] > 0) params.set('minBattery', newFilters.batteryRange[0].toString());
    if (newFilters.batteryRange[1] < 24) params.set('maxBattery', newFilters.batteryRange[1].toString());
    const url = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.push(url, { scroll: false });
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 50000000] as [number, number],
      powerRange: [0, 2000] as [number, number],
      batteryRange: [0, 24] as [number, number],
      category: '',
      search: '',
      sortBy: 'newest',
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
    router.push(pathname);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${price / 1000000}M VND`;
    if (price >= 1000) return `${price / 1000}K VND`;
    return `${price} VND`;
  };
  const formatPower = (power: number) => `${power}W`;
  const formatBattery = (battery: number) => `${battery}h`;

  return (
    <div className="bg-darkGrey/60 backdrop-blur-sm rounded-2xl border border-darkGrey shadow-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-h3 text-textWhite font-semibold">BỘ LỌC TÌM KIẾM</h3>
        <button onClick={() => setIsExpanded(!isExpanded)} className="md:hidden text-goldAccent rounded-2xl p-2 hover:bg-darkGrey/60 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-colors">{isExpanded ? '▲' : '▼'}</button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">SẮP XẾP THEO</label>
          <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className="w-full bg-darkBg border border-darkGrey rounded-2xl px-4 py-3 text-textWhite focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-colors">
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="power-asc">Công suất thấp → cao</option>
            <option value="power-desc">Công suất cao → thấp</option>
          </select>
        </div>

        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">KHOẢNG GIÁ</label>
          <DualRangeSlider min={0} max={50000000} step={100000} value={filters.priceRange} onChange={(v) => handleFilterChange('priceRange', v)} formatValue={formatPrice} accent="gold" />
        </div>

        <div>
          <label className="block font-microcopy text-microcopy text-neonTurquoise mb-3 tracking-widest">CÔNG SUẤT</label>
          <DualRangeSlider min={0} max={2000} step={10} value={filters.powerRange} onChange={(v) => handleFilterChange('powerRange', v)} formatValue={formatPower} accent="neon" />
        </div>

        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">THỜI LƯỢNG PIN</label>
          <DualRangeSlider min={0} max={24} step={1} value={filters.batteryRange} onChange={(v) => handleFilterChange('batteryRange', v)} formatValue={formatBattery} accent="gold" />
        </div>

        <button onClick={clearFilters} className="w-full font-microcopy text-microcopy text-textGrey hover:text-textWhite bg-darkBg hover:bg-darkGrey/80 border border-darkGrey hover:border-neonTurquoise/50 rounded-2xl py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-all duration-300 tracking-widest">XÓA BỘ LỌC</button>
      </div>
    </div>
  );
}
