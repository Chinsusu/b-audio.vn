import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface LoadingButtonProps {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  loadingText?: string;
}

export default function LoadingButton({
  children,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  loadingText,
}: LoadingButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2";

  const variants = {
    primary: "bg-espresso text-ivory hover:bg-espresso/90",
    secondary:
      "border border-espresso text-espresso hover:bg-espresso hover:text-ivory",
    outline: "border border-cloud text-espresso hover:bg-cloud",
    ghost: "text-espresso hover:bg-cloud/80",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin mr-2`} />
      )}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
