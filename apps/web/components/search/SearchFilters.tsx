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
    <div className="bg-white rounded-2xl shadow p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Bộ lọc tìm kiếm</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-gray-600"
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sắp xếp theo
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khoảng giá ({formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])} VND)
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min="0"
              max="50000000"
              step="100000"
              value={filters.priceRange[0]}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max="50000000"
              step="100000"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              className="flex-1"
            />
          </div>
        </div>

        {/* Power Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Công suất ({filters.powerRange[0]} - {filters.powerRange[1]}W)
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              value={filters.powerRange[0]}
              onChange={(e) => handleFilterChange('powerRange', [parseInt(e.target.value), filters.powerRange[1]])}
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              value={filters.powerRange[1]}
              onChange={(e) => handleFilterChange('powerRange', [filters.powerRange[0], parseInt(e.target.value)])}
              className="flex-1"
            />
          </div>
        </div>

        {/* Battery Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thời lượng pin ({filters.batteryRange[0]} - {filters.batteryRange[1]}h)
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={filters.batteryRange[0]}
              onChange={(e) => handleFilterChange('batteryRange', [parseInt(e.target.value), filters.batteryRange[1]])}
              className="flex-1"
            />
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={filters.batteryRange[1]}
              onChange={(e) => handleFilterChange('batteryRange', [filters.batteryRange[0], parseInt(e.target.value)])}
              className="flex-1"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="w-full text-center text-sm text-gray-600 hover:text-black border rounded-lg py-2 mt-4"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
}
