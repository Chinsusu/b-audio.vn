'use client';
import { useState } from 'react';
import { BarChart3, Check } from 'lucide-react';
import { useComparison } from '../../hooks/useComparison';
import { toast } from '../../lib/toast';

interface Product {
  id: string;
  slug: string;
  attributes: {
    title: string;
    price_vnd: number;
    power_watt?: number;
    battery_hours?: number;
    connectivity?: string;
    images: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          name: string;
        };
      }>;
    };
  };
}

interface CompareButtonProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'button';
  className?: string;
}

export default function CompareButton({ 
  product, 
  size = 'md', 
  variant = 'button',
  className = '' 
}: CompareButtonProps) {
  const { isInComparison, toggleItem, canAddMore, getMaxItems } = useComparison();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const inComparison = isInComparison(product.id);

  const showToastMessage = (message: string) => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleToggle = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const wasAdded = toggleItem({
        id: product.id,
        slug: product.slug,
        attributes: {
          title: product.attributes.title,
          price_vnd: product.attributes.price_vnd,
          power_watt: product.attributes.power_watt,
          battery_hours: product.attributes.battery_hours,
          connectivity: product.attributes.connectivity,
          images: product.attributes.images,
        },
      });

      if (wasAdded) {
        toast.success('Đã thêm vào so sánh');
      } else {
        toast.info('Đã bỏ khỏi so sánh');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra';
      toast.error('Lỗi', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = !inComparison && !canAddMore();

  if (variant === 'icon') {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="relative">
        <button
          onClick={handleToggle}
          disabled={disabled || isLoading}
          aria-busy={isLoading}
          className={`
            ${sizeClasses[size]} rounded-full flex items-center justify-center
            transition-all duration-200 hover:scale-110 active:scale-95
            ${inComparison 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-white/80 text-gray-400 hover:text-blue-500 hover:bg-white shadow-sm'
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${className}
          `}
          title={inComparison ? 'Bỏ khỏi so sánh' : disabled ? `Chỉ so sánh được ${getMaxItems()} sản phẩm` : 'Thêm vào so sánh'}
        >
          {isLoading ? (
            <div className={`${iconSizes[size]} animate-spin border-2 border-current border-t-transparent rounded-full`} />
          ) : inComparison ? (
            <Check className={`${iconSizes[size]} transition-all duration-200`} />
          ) : (
            <BarChart3 className={`${iconSizes[size]} transition-all duration-200`} />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`
          rounded-lg px-4 py-2 font-medium transition-all duration-200 disabled:opacity-50
          ${inComparison
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
          }
          disabled:cursor-not-allowed
          ${size === 'sm' ? 'text-xs px-3 py-1.5' : ''}
          ${size === 'lg' ? 'text-lg px-6 py-3' : ''}
          ${className}
        `}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
            Đang xử lý...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {inComparison ? <Check className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
            {inComparison ? 'Đã so sánh' : disabled ? 'Đã đủ số lượng' : 'So sánh'}
          </div>
        )}
      </button>
    </div>
  );
}
