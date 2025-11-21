"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTrackBackground, Range } from "react-range";

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onCommit?: (value: [number, number]) => void;
  formatValue: (val: number) => string;
  accent: "gold" | "neon";
}

function DualRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  onCommit,
  formatValue,
  accent,
}: DualRangeSliderProps) {
  const [vals, setVals] = useState<[number, number]>(value);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setVals(value);
  }, [value]);

  const accentColor = accent === "gold" ? "#C8A15A" : "#00E0B8";
  const railColor = "#1C1E22";
  const trackBg = getTrackBackground({
    values: vals,
    colors: [railColor, accentColor, railColor],
    min,
    max,
  });

  useEffect(() => {
    const handleUp = () => {
      if (dragging) {
        setDragging(false);
        onCommit?.(vals);
      }
    };
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging, vals, onCommit]);

  return (
    <div className="space-y-4">
      <Range
        min={min}
        max={max}
        step={step}
        values={vals}
        onChange={(newVals) => {
          const [n0, n1] = newVals as [number, number];
          const gap = step;

          let next0 = vals[0];
          let next1 = vals[1];

          if (n0 !== vals[0]) {
            next0 = Math.min(n0, vals[1] - gap);
          } else if (n1 !== vals[1]) {
            next1 = Math.max(n1, vals[0] + gap);
          }

          next0 = Math.max(min, Math.min(next0, max - gap));
          next1 = Math.min(max, Math.max(next1, min + gap));

          const next: [number, number] = [next0, next1];
          setVals(next);
          setDragging(true);
          onChange(next);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="flex h-6 w-full select-none"
          >
            <div
              ref={props.ref}
              className="h-2 w-full self-center rounded-lg"
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

      <div className="flex items-center justify-between text-sm text-textGrey">
        <span
          className={`rounded border bg-darkBg px-2 py-1 text-xs ${
            accent === "gold"
              ? "border-goldAccent/50 text-goldAccent"
              : "border-neonTurquoise/50 text-neonTurquoise"
          }`}
        >
          {formatValue(vals[0])}
        </span>
        <span className="text-textGrey/60">—</span>
        <span
          className={`rounded border bg-darkBg px-2 py-1 text-xs ${
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

  const parseNum = (val: string | null, fallback: number) => {
    if (!val) return fallback;
    const n = Number(val);
    return Number.isNaN(n) ? fallback : n;
  };

  const readRanges = () => ({
    priceRange: [
      parseNum(searchParams.get("min_price"), 0),
      parseNum(searchParams.get("max_price"), 50_000_000),
    ] as [number, number],
    powerRange: [
      parseNum(searchParams.get("min_power"), 0),
      parseNum(searchParams.get("max_power"), 2000),
    ] as [number, number],
    batteryRange: [
      parseNum(searchParams.get("min_battery"), 0),
      parseNum(searchParams.get("max_battery"), 24),
    ] as [number, number],
  });

  const [filters, setFilters] = useState({
    ...readRanges(),
    category:
      searchParams.get("category") ||
      searchParams.get("category_slug") ||
      "",
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sort") || "newest",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const newFilters = {
      ...readRanges(),
      category:
        searchParams.get("category") ||
        searchParams.get("category_slug") ||
        "",
      search: searchParams.get("search") || "",
      sortBy: searchParams.get("sort") || "newest",
    };
    setFilters((prev) => ({ ...prev, ...newFilters }));
    onFiltersChange?.({ ...filters, ...newFilters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, onFiltersChange]);

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newFilters.search) {
      params.set("search", newFilters.search);
    }
    if (newFilters.category) {
      params.set("category", newFilters.category);
    }
    if (newFilters.sortBy !== "newest") {
      params.set("sort", newFilters.sortBy);
    }
    if (newFilters.priceRange[0] > 0) {
      params.set("min_price", newFilters.priceRange[0].toString());
    }
    if (newFilters.priceRange[1] < 50000000) {
      params.set("max_price", newFilters.priceRange[1].toString());
    }
    if (newFilters.powerRange[0] > 0) {
      params.set("min_power", newFilters.powerRange[0].toString());
    }
    if (newFilters.powerRange[1] < 2000) {
      params.set("max_power", newFilters.powerRange[1].toString());
    }
    if (newFilters.batteryRange[0] > 0) {
      params.set("min_battery", newFilters.batteryRange[0].toString());
    }
    if (newFilters.batteryRange[1] < 24) {
      params.set("max_battery", newFilters.batteryRange[1].toString());
    }
    const url = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(url, { scroll: false });
  };

  const handleFilterChange = (
    key: string,
    value: unknown,
    commit: boolean = false,
  ) => {
    const newFilters = { ...filters, [key]: value } as typeof filters;
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
    if (commit || key === "sortBy" || key === "search" || key === "category") {
      updateURL(newFilters);
    }
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
    if (price >= 1_000_000) {
      return `${price / 1_000_000}M VND`;
    }
    if (price >= 1_000) {
      return `${price / 1_000}K VND`;
    }
    return `${price} VND`;
  };

  const formatPower = (power: number) => `${power}W`;
  const formatBattery = (battery: number) => `${battery}h`;

  return (
    <div className="mb-6 rounded-2xl border border-darkGrey bg-darkGrey/60 p-6 shadow-2xl backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-heading text-h3 font-semibold text-textWhite">
          BỘ LỌC TÌM KIẾM
        </h3>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-2xl p-2 text-goldAccent transition-colors hover:bg-darkGrey/60 focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg md:hidden"
        >
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? "block" : "hidden md:block"}`}>
        <div>
          <label className="mb-3 block font-microcopy text-microcopy tracking-widest text-goldAccent">
            SẮP XẾP THEO
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full rounded-2xl border border-darkGrey bg-darkBg px-4 py-3 text-textWhite transition-colors focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá thấp → cao</option>
            <option value="price_desc">Giá cao → thấp</option>
            <option value="power_asc">Công suất thấp → cao</option>
            <option value="power_desc">Công suất cao → thấp</option>
          </select>
        </div>

        <div>
          <label className="mb-3 block font-microcopy text-microcopy tracking-widest text-goldAccent">
            KHOẢNG GIÁ
          </label>
          <DualRangeSlider
            min={0}
            max={50_000_000}
            step={100_000}
            value={filters.priceRange}
            onChange={(v) => handleFilterChange("priceRange", v)}
            onCommit={(v) => handleFilterChange("priceRange", v, true)}
            formatValue={formatPrice}
            accent="gold"
          />
        </div>

        <div>
          <label className="mb-3 block font-microcopy text-microcopy tracking-widest text-neonTurquoise">
            CÔNG SUẤT
          </label>
          <DualRangeSlider
            min={0}
            max={2000}
            step={10}
            value={filters.powerRange}
            onChange={(v) => handleFilterChange("powerRange", v)}
            onCommit={(v) => handleFilterChange("powerRange", v, true)}
            formatValue={formatPower}
            accent="neon"
          />
        </div>

        <div>
          <label className="mb-3 block font-microcopy text-microcopy tracking-widest text-goldAccent">
            THỜI LƯỢNG PIN
          </label>
          <DualRangeSlider
            min={0}
            max={24}
            step={1}
            value={filters.batteryRange}
            onChange={(v) => handleFilterChange("batteryRange", v)}
            onCommit={(v) => handleFilterChange("batteryRange", v, true)}
            formatValue={formatBattery}
            accent="gold"
          />
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="mt-6 w-full rounded-2xl border border-darkGrey bg-darkBg py-3 font-microcopy text-microcopy tracking-widest text-textGrey transition-all duration-300 hover:border-neonTurquoise/50 hover:bg-darkGrey/80 hover:text-textWhite focus:outline-none focus:ring-2 focus:ring-neonTurquoise focus:ring-offset-2 focus:ring-offset-darkBg"
        >
          XÓA BỘ LỌC
        </button>
      </div>
    </div>
  );
}
