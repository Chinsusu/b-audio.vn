import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B-Audio | Xưởng Loa DIY',
  description: 'Loa bluetooth, loa kéo karaoke, gia công theo yêu cầu.',
  alternates: { canonical: 'https://b-audio.vn/' },
  openGraph: {
    title: 'B-Audio | Xưởng Loa DIY',
    url: 'https://b-audio.vn/',
    images: [{ url: 'https://b-audio.vn/og/home-cover.svg', width: 1200, height: 630, alt: 'B-Audio' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/home-cover.svg'] },
};

export default async function Page() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-darkBg flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-darkBg via-darkBg to-darkGrey/50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <h1 className="font-heading text-hero-lg lg:text-6xl xl:text-7xl text-textWhite font-bold leading-none tracking-tight">
              DIY BLUETOOTH<br />
              SPEAKERS &<br />
              <span className="text-goldAccent animate-glow">PORTABLE<br />KARAOKE SYSTEMS</span>
            </h1>
            <p className="text-xl lg:text-2xl text-textGrey font-light max-w-md">
              Diverse range, customizable to your needs
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-10 py-5 bg-goldAccent text-darkBg text-lg font-bold rounded-lg shadow-glowGold hover:shadow-glowGoldHover transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
            >
              <span className="mr-2">SHOP NOW</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          {/* Right Image */}
          <div className="relative lg:justify-self-end">
            <div className="relative w-full h-[500px] lg:h-[600px]">
              {/* Glow background effect */}
              <div className="absolute inset-0 bg-gradient-radial from-goldAccent/10 via-transparent to-transparent rounded-full blur-3xl transform scale-150"></div>
              {/* Speaker mockup */}
              <div className="relative w-full h-full bg-gradient-to-b from-darkGrey/40 to-darkGrey/20 rounded-2xl flex items-center justify-center border border-goldAccent/10 backdrop-blur-sm">
                <div className="w-80 h-96 bg-gradient-to-b from-darkGrey to-darkBg rounded-xl border-2 border-goldAccent/30 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                  {/* Speaker grille effect */}
                  <div className="absolute inset-4 border border-goldAccent/20 rounded-lg"></div>
                  <div className="absolute inset-8 border border-goldAccent/10 rounded-lg"></div>
                  
                  {/* Main speaker */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-darkGrey to-darkBg border-4 border-goldAccent/50 mb-4 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-goldAccent/20 border-2 border-goldAccent/40"></div>
                  </div>
                  
                  {/* Tweeter */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neonTurquoise/30 to-neonTurquoise/10 border-2 border-neonTurquoise/50 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-neonTurquoise/40"></div>
                  </div>
                  
                  {/* Control panel */}
                  <div className="absolute bottom-6 left-6 right-6 h-8 bg-darkBg/80 rounded border border-goldAccent/30 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-goldAccent/60"></div>
                    <div className="w-2 h-2 rounded-full bg-neonTurquoise/60"></div>
                    <div className="w-2 h-2 rounded-full bg-goldAccent/60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-darkBg py-24 border-t border-darkGrey/30">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading text-h1 text-textWhite mb-16 text-center">
            FEATURED <span className="text-goldAccent">PRODUCTS</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Bluetooth DIY Speaker', price: '$149', icon: '🎵', accent: 'goldAccent' },
              { name: 'Portable Karaoke Speaker', price: '$269', icon: '🎤', accent: 'neonTurquoise' },
              { name: 'Customizable DIY Speaker', price: '$179', icon: '🔊', accent: 'goldAccent' },
              { name: 'DIY Karaoke Speaker', price: '$249', icon: '🎛️', accent: 'neonTurquoise' }
            ].map((product, idx) => (
              <div key={idx} className="group bg-darkGrey/40 rounded-xl overflow-hidden border border-darkGrey hover:border-goldAccent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-darkGrey/60 to-darkBg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-goldAccent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500" style={{ filter: `drop-shadow(0 0 10px ${product.accent === 'goldAccent' ? '#C8A15A' : '#00E0B8'}66)` }}>
                    {product.icon}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-textWhite font-semibold mb-3 group-hover:text-goldAccent transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-goldAccent font-bold text-2xl">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Speaker Builds Section */}
      <section className="bg-gradient-to-br from-darkBg to-darkGrey/20 py-24 border-t border-darkGrey/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="font-heading text-hero text-textWhite font-bold">
                CUSTOM SPEAKER<br />
                <span className="text-neonTurquoise">BUILDS</span>
              </h2>
              <p className="text-xl text-textGrey leading-relaxed max-w-lg">
                Design your own DIY speaker tailored to your specifications. Choose components, 
                materials, and finishes to create a one-of-a-kind audio system.
              </p>
              <Link 
                href="/custom"
                className="inline-flex items-center px-10 py-5 bg-neonTurquoise text-darkBg text-lg font-bold rounded-lg shadow-glowNeon hover:shadow-glowNeonHover transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 group"
              >
                <span className="mr-2">START CUSTOMIZING</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative lg:justify-self-end">
              <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 bg-gradient-radial from-neonTurquoise/10 via-transparent to-transparent rounded-full blur-3xl transform scale-150"></div>
                <div className="relative w-full h-full bg-gradient-to-b from-darkGrey/40 to-darkGrey/20 rounded-2xl flex items-center justify-center border border-neonTurquoise/10 backdrop-blur-sm">
                  <div className="w-80 h-96 bg-gradient-to-b from-darkGrey to-darkBg rounded-xl border-2 border-neonTurquoise/30 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                    {/* Tool/Customize icons */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-neonTurquoise/20 rounded border border-neonTurquoise/40 flex items-center justify-center">
                      <span className="text-xs">⚙️</span>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-goldAccent/20 rounded border border-goldAccent/40 flex items-center justify-center">
                      <span className="text-xs">🔧</span>
                    </div>
                    
                    <div className="text-8xl text-neonTurquoise opacity-80 mb-4">🛠️</div>
                    <div className="text-center space-y-2">
                      <div className="text-textWhite font-semibold">CUSTOM BUILD</div>
                      <div className="text-textGrey text-sm">Your Specifications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
