'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

// Dual Range Slider Component
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

  // Update local state when prop changes
  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  }, [value]);

  // Handle min value change
  const handleMinChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinVal = Math.min(Number(event.target.value), maxVal - step);
    setMinVal(newMinVal);
    onChange([newMinVal, maxVal]);
  }, [maxVal, step, onChange]);

  // Handle max value change
  const handleMaxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxVal = Math.max(Number(event.target.value), minVal + step);
    setMaxVal(newMaxVal);
    onChange([minVal, newMaxVal]);
  }, [minVal, step, onChange]);

  const accentColor = accent === 'gold' ? '#C8A15A' : '#00E0B8';
  
  return (
    <div className="space-y-4">
      <div className="relative h-2 bg-darkBg rounded-lg">
        {/* Progress bar between thumbs */}
        <div 
          className="absolute h-full rounded-lg"
          style={{
            background: accentColor,
            left: `${((minVal - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
            opacity: 0.6
          }}
        />
        
        {/* Min range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className={`absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-${accent} focus:outline-none focus:ring-2 focus:ring-${accent === 'gold' ? 'goldAccent' : 'neonTurquoise'} focus:ring-offset-2 focus:ring-offset-darkBg`}
          style={{ zIndex: 1 }}
        />
        
        {/* Max range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className={`absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-${accent} focus:outline-none focus:ring-2 focus:ring-${accent === 'gold' ? 'goldAccent' : 'neonTurquoise'} focus:ring-offset-2 focus:ring-offset-darkBg`}
          style={{ zIndex: 2 }}
        />
      </div>
      
      {/* Value display */}
      <div className="flex justify-between items-center text-textGrey text-sm">
        <span className={`px-2 py-1 rounded text-xs bg-darkBg border ${accent === 'gold' ? 'border-goldAccent/50 text-goldAccent' : 'border-neonTurquoise/50 text-neonTurquoise'}`}>
          {formatValue(minVal)}
        </span>
        <span className="text-textGrey/60">—</span>
        <span className={`px-2 py-1 rounded text-xs bg-darkBg border ${accent === 'gold' ? 'border-goldAccent/50 text-goldAccent' : 'border-neonTurquoise/50 text-neonTurquoise'}`}>
          {formatValue(maxVal)}
        </span>
      </div>
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
    // Sync with URL params
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
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-goldAccent rounded-2xl p-2 hover:bg-darkGrey/60 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-colors"
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Sort */}
        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            SẮP XẾP THEO
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full bg-darkBg border border-darkGrey rounded-2xl px-4 py-3 text-textWhite focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-colors"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="power-asc">Công suất thấp → cao</option>
            <option value="power-desc">Công suất cao → thấp</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            KHOẢNG GIÁ
          </label>
          <DualRangeSlider
            min={0}
            max={50000000}
            step={100000}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            formatValue={formatPrice}
            accent="gold"
          />
        </div>

        {/* Power Range */}
        <div>
          <label className="block font-microcopy text-microcopy text-neonTurquoise mb-3 tracking-widest">
            CÔNG SUẤT
          </label>
          <DualRangeSlider
            min={0}
            max={2000}
            step={10}
            value={filters.powerRange}
            onChange={(value) => handleFilterChange('powerRange', value)}
            formatValue={formatPower}
            accent="neon"
          />
        </div>

        {/* Battery Range */}
        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            THỜI LƯỢNG PIN
          </label>
          <DualRangeSlider
            min={0}
            max={24}
            step={1}
            value={filters.batteryRange}
            onChange={(value) => handleFilterChange('batteryRange', value)}
            formatValue={formatBattery}
            accent="gold"
          />
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full font-microcopy text-microcopy text-textGrey hover:text-textWhite bg-darkBg hover:bg-darkGrey/80 border border-darkGrey hover:border-neonTurquoise/50 rounded-2xl py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-all duration-300 tracking-widest"
        >
          XÓA BỘ LỌC
        </button>
      </div>

      <style jsx>{`
        /* Gold themed slider */
        .slider-gold::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #C8A15A;
          border: 2px solid #C8A15A;
          cursor: pointer;
          box-shadow: 0 0 8px #C8A15A66;
          position: relative;
          z-index: 3;
        }
        
        .slider-gold::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #C8A15A;
          border: 2px solid #C8A15A;
          cursor: pointer;
          box-shadow: 0 0 8px #C8A15A66;
        }
        
        /* Neon themed slider */
        .slider-neon::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00E0B8;
          border: 2px solid #00E0B8;
          cursor: pointer;
          box-shadow: 0 0 8px #00E0B866;
          position: relative;
          z-index: 3;
        }
        
        .slider-neon::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00E0B8;
          border: 2px solid #00E0B8;
          cursor: pointer;
          box-shadow: 0 0 8px #00E0B866;
        }

        /* Remove default styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-track {
          background: transparent;
        }

        input[type="range"]::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
