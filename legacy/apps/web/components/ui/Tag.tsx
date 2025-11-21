import Link from "next/link";
import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  href?: string;
  variant?: "gold" | "neutral";
  className?: string;
};

export default function Tag({
  children,
  href,
  variant = "gold",
  className = "",
}: TagProps) {
  const base = [
    "inline-flex items-center gap-1 rounded-full px-3 py-1",
    "font-heading text-microcopy uppercase tracking-widest",
    "transition-colors",
  ];

  const style =
    variant === "neutral"
      ? "border border-gray-600 bg-secondary-800/60 text-neutral-100 hover:bg-secondary-800/80"
      : "border border-goldAccent/60 bg-secondary-800/60 text-neutral-100 hover:border-goldAccent hover:bg-secondary-800/80 shadow-gold-glow";

  const cls = [...base, style, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <span className={cls}>{children}</span>;
}
