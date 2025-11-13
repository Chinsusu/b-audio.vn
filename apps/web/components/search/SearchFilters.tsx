"use client";
import { usePathname,useRouter, useSearchParams } from "next/navigation";
import {useEffect, useState } from "react";
import { getTrackBackground,Range } from "react-range";

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
  accent: "gold" | "neon";
}

function DualRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
  accent,
}: DualRangeSliderProps) {
  const [vals, setVals] = useState<[number, number]>(value);

  useEffect(() => {
    // keep in sync if parent changes
    setVals(value);
  }, [value]);

  const accentColor = accent === "gold" ? "#C8A15A" : "#00E0B8";
  const railColor = "#1C1E22"; // darkBg
  const trackBg = getTrackBackground({
    values: vals,
    colors: [railColor, accentColor, railColor],
    min,
    max,
  });

  return (
    <div className="space-y-4">
      <Range
        min={min}
        max={max}
        step={step}
        values={vals}
        onChange={(newVals) => {
          const [n0, n1] = newVals as [number, number];
          const gap = step; // minimal distance to avoid thumb overlap

          let next0 = vals[0];
          let next1 = vals[1];

          if (n0 !== vals[0]) {
            // moving min thumb
            next0 = Math.min(n0, vals[1] - gap);
          } else if (n1 !== vals[1]) {
            // moving max thumb
            next1 = Math.max(n1, vals[0] + gap);
          }

          // Clamp within bounds with enforced gap
          next0 = Math.max(min, Math.min(next0, max - gap));
          next1 = Math.min(max, Math.max(next1, min + gap));

          const next: [number, number] = [next0, next1];
          setVals(next);
          onChange(next);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="h-6 flex w-full select-none"
          >
            <div
              ref={props.ref}
              className="h-2 w-full rounded-lg self-center"
              style={{ background: trackBg }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            className="h-6 w-6 rounded-full border-2 shadow-lg focus:outline-none focus-visible:ring-2"
            style={{
              ...props.style,
              borderColor: accentColor,
              background: isDragged ? accentColor : "#111417",
              boxShadow: isDragged
                ? `0 0 14px ${accentColor}88`
                : `0 0 8px ${accentColor}66`,
              zIndex: index === 1 ? 3 : 2,
            }}
            aria-label={index === 0 ? "Min value" : "Max value"}
          />
        )}
      />

      {/* Values */}
      <div className="flex justify-between items-center text-textGrey text-sm">
        <span
          className={`px-2 py-1 rounded text-xs bg-darkBg border ${
            accent === "gold"
              ? "border-goldAccent/50 text-goldAccent"
              : "border-neonTurquoise/50 text-neonTurquoise"
          }`}
        >
          {formatValue(vals[0])}
        </span>
        <span className="text-textGrey/60">—</span>
        <span
          className={`px-2 py-1 rounded text-xs bg-darkBg border ${
            accent === "gold"
              ? "border-goldAccent/50 text-goldAccent"
              : "border-neonTurquoise/50 text-neonTurquoise"
          }`}
        >
          {formatValue(vals[1])}
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
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sort") || "newest",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const newFilters = {
      ...filters,
      category: searchParams.get("category") || "",
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sort") || "newest",
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  }, [searchParams]);

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newFilters.search) {params.set("search", newFilters.search);}
    if (newFilters.category) {params.set("category", newFilters.category);}
    if (newFilters.sortBy !== "newest") {params.set("sort", newFilters.sortBy);}
    if (newFilters.priceRange[0] > 0)
      {params.set("minPrice", newFilters.priceRange[0].toString());}
    if (newFilters.priceRange[1] < 50000000)
      {params.set("maxPrice", newFilters.priceRange[1].toString());}
    if (newFilters.powerRange[0] > 0)
      {params.set("minPower", newFilters.powerRange[0].toString());}
    if (newFilters.powerRange[1] < 2000)
      {params.set("maxPower", newFilters.powerRange[1].toString());}
    if (newFilters.batteryRange[0] > 0)
      {params.set("minBattery", newFilters.batteryRange[0].toString());}
    if (newFilters.batteryRange[1] < 24)
      {params.set("maxBattery", newFilters.batteryRange[1].toString());}
    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
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
      category: "",
      search: "",
      sortBy: "newest",
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
    router.push(pathname);
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {return `${price / 1000000}M VND`;}
    if (price >= 1000) {return `${price / 1000}K VND`;}
    return `${price} VND`;
  };
  const formatPower = (power: number) => `${power}W`;
  const formatBattery = (battery: number) => `${battery}h`;

  return (
    <div className="bg-darkGrey/60 backdrop-blur-sm rounded-2xl border border-darkGrey shadow-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-h3 text-textWhite font-semibold">
          BỘ LỌC TÌM KIẾM
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-goldAccent rounded-2xl p-2 hover:bg-darkGrey/60 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-colors"
        >
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? "block" : "hidden md:block"}`}>
        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            SẮP XẾP THEO
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full bg-darkBg border border-darkGrey rounded-2xl px-4 py-3 text-textWhite focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-colors"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="power-asc">Công suất thấp → cao</option>
            <option value="power-desc">Công suất cao → thấp</option>
          </select>
        </div>

        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            KHOẢNG GIÁ
          </label>
          <DualRangeSlider
            min={0}
            max={50000000}
            step={100000}
            value={filters.priceRange}
            onChange={(v) => handleFilterChange("priceRange", v)}
            formatValue={formatPrice}
            accent="gold"
          />
        </div>

        <div>
          <label className="block font-microcopy text-microcopy text-neonTurquoise mb-3 tracking-widest">
            CÔNG SUẤT
          </label>
          <DualRangeSlider
            min={0}
            max={2000}
            step={10}
            value={filters.powerRange}
            onChange={(v) => handleFilterChange("powerRange", v)}
            formatValue={formatPower}
            accent="neon"
          />
        </div>

        <div>
          <label className="block font-microcopy text-microcopy text-goldAccent mb-3 tracking-widest">
            THỜI LƯỢNG PIN
          </label>
          <DualRangeSlider
            min={0}
            max={24}
            step={1}
            value={filters.batteryRange}
            onChange={(v) => handleFilterChange("batteryRange", v)}
            formatValue={formatBattery}
            accent="gold"
          />
        </div>

        <button
          onClick={clearFilters}
          className="w-full font-microcopy text-microcopy text-textGrey hover:text-textWhite bg-darkBg hover:bg-darkGrey/80 border border-darkGrey hover:border-neonTurquoise/50 rounded-2xl py-3 mt-6 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg transition-all duration-300 tracking-widest"
        >
          XÓA BỘ LỌC
        </button>
      </div>
    </div>
  );
}
