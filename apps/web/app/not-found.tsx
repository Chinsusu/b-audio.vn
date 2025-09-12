import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center">
      <div className="text-center px-4 max-w-lg">
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-goldAccent/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl">🔍</div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-textWhite mb-4">
          Page Not Found
        </h1>
        
        <p className="text-textGrey mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-goldAccent hover:bg-goldAccent/80 text-darkBg px-8 py-3 rounded-lg font-medium transition-colors btn-transition"
          >
            Go Home
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link 
              href="/products" 
              className="text-neonTurquoise hover:text-neonTurquoise/80 transition-colors"
            >
              Browse Products
            </Link>
            <span className="text-darkGrey">•</span>
            <Link 
              href="/custom" 
              className="text-neonTurquoise hover:text-neonTurquoise/80 transition-colors"
            >
              Custom Builds
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
