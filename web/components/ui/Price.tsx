import React from "react";

type PriceProps = {
  value?: number | string | null;
  compareAt?: number | string | null;
  currency?: string;
  locale?: string;
  size?: "sm" | "md" | "lg";
  tone?: "primary" | "neutral";
  className?: string;
  as?: "div" | "span";
};

function formatCurrency(
  value: number,
  locale: string,
  currency: string,
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(value)} ₫`;
  }
}

export default function Price({
  value,
  compareAt,
  currency = "VND",
  locale = "vi-VN",
  size = "lg",
  tone = "primary",
  className = "",
  as = "div",
}: PriceProps) {
  const Tag = as as any;

  if (value === null || value === undefined || value === "") {
    return (
      <Tag className={["text-textGrey", className].filter(Boolean).join(" ")}>
        Liên hệ
      </Tag>
    );
  }

  const n = typeof value === "string" ? Number(value) : value;
  const priceText = Number.isNaN(n as number)
    ? String(value)
    : formatCurrency(Number(n), locale, currency);

  const sizeClass =
    size === "sm" ? "text-body" : size === "md" ? "text-h4" : "text-h3";
  const colorClass = tone === "primary" ? "text-primary" : "text-neutral-100";

  const base = ["font-heading", "font-bold", sizeClass, colorClass, className]
    .filter(Boolean)
    .join(" ");

  const compareEl = (() => {
    if (compareAt === null || compareAt === undefined || compareAt === "") {
      return null;
    }
    const cnum = typeof compareAt === "string" ? Number(compareAt) : compareAt;
    if (Number.isNaN(cnum as number)) {
      return null;
    }
    return (
      <span className="ml-3 text-sm line-through text-gray-400">
        {formatCurrency(Number(cnum), locale, currency)}
      </span>
    );
  })();

  return (
    <Tag className={base}>
      <span>{priceText}</span>
      {compareEl}
    </Tag>
  );
}

