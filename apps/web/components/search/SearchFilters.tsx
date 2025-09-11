'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000], // 0 - 50M VND
    powerRange: [0, 2000], // 0 - 2000W
    batteryRange: [0, 24], // 0 - 24 hours
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
      priceRange: [0, 50000000],
      powerRange: [0, 2000],
      batteryRange: [0, 24],
      category: '',
      search: '',
      sortBy: 'newest',
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
    router.push(pathname);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `${price / 1000000}M`;
    if (price >= 1000) return `${price / 1000}K`;
    return price.toString();
  };

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
            KHOẢNG GIÁ ({formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])} VND)
          </label>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                  className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer slider-thumb-gold focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer slider-thumb-gold focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg"
                />
              </div>
            </div>
            <div className="flex justify-between text-textGrey text-sm">
              <span>{formatPrice(filters.priceRange[0])} VND</span>
              <span>{formatPrice(filters.priceRange[1])} VND</span>
            </div>
          </div>
        </div>

        {/* Power Range */}
        <div>
          <label className="block font-microcopy text-microcopy text-neonTurquoise mb-3 tracking-widest">
            CÔNG SUẤT ({filters.powerRange[0]} - {filters.powerRange[1]}W)
          </label>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={filters.powerRange[0]}
                  onChange={(e) => handleFilterChange('powerRange', [parseInt(e.target.value), filters.powerRange[1]])}
                  className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer slider-thumb-neon focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={filters.powerRange[1]}
                  onChange={(e) => handleFilterChange('powerRange', [filters.powerRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer slider-thumb-neon focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
                />
              </div>
            </div>
            <div className="flex justify-between text-textGrey text-sm">
              <span>{filters.powerRange[0]}W</span>
              <span>{filters.powerRange[1]}W</span>
            </div>
          </div>
        </div>

        {/* Battery Range */}
        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            THỜI LƯỢNG PIN ({filters.batteryRange[0]} - {filters.batteryRange[1]}H)
          </label>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={filters.batteryRange[0]}
                  onChange={(e) => handleFilterChange('batteryRange', [parseInt(e.target.value), filters.batteryRange[1]])}
                  className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer slider-thumb-gold focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg"
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={filters.batteryRange[1]}
                  onChange={(e) => handleFilterChange('batteryRange', [filters.batteryRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-darkBg rounded-lg appearance-none cursor-pointer slider-thumb-gold focus:outline-none focus:ring-2 focus:ring-goldAccent focus:ring-offset-2 focus:ring-offset-darkBg"
                />
              </div>
            </div>
            <div className="flex justify-between text-textGrey text-sm">
              <span>{filters.batteryRange[0]}h</span>
              <span>{filters.batteryRange[1]}h</span>
            </div>
          </div>
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
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid;
        }
        
        .slider-thumb-gold input[type="range"]::-webkit-slider-thumb {
          background: #C8A15A;
          border-color: #C8A15A;
          box-shadow: 0 0 8px #C8A15A66;
        }
        
        .slider-thumb-neon input[type="range"]::-webkit-slider-thumb {
          background: #00E0B8;
          border-color: #00E0B8;
          box-shadow: 0 0 8px #00E0B866;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid;
        }
        
        .slider-thumb-gold input[type="range"]::-moz-range-thumb {
          background: #C8A15A;
          border-color: #C8A15A;
        }
        
        .slider-thumb-neon input[type="range"]::-moz-range-thumb {
          background: #00E0B8;
          border-color: #00E0B8;
        }
      `}</style>
    </div>
  );
}
