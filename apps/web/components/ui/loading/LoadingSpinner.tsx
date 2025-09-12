interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-goldAccent/20 border-t-goldAccent ${sizeClasses[size]} ${className}`} />
  );
}

export function LoadingButton({ children, loading = false, ...props }: { 
  children: React.ReactNode; 
  loading?: boolean; 
  [key: string]: any;
}) {
  return (
    <button 
      {...props} 
      disabled={loading || props.disabled}
      className={`${props.className} relative`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  );
}
