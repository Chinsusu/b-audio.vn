import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Wrench, Settings, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B-Audio | Xưởng Loa DIY Công Nghiệp',
  description: 'Loa bluetooth chuyên nghiệp, loa kéo karaoke, gia công theo yêu cầu với tiêu chuẩn công nghiệp cao cấp.',
  alternates: { canonical: 'https://b-audio.vn/' },
  openGraph: {
    title: 'B-Audio | Xưởng Loa DIY Công Nghiệp',
    url: 'https://b-audio.vn/',
    images: [{ url: 'https://b-audio.vn/og/home-cover.svg', width: 1200, height: 630, alt: 'B-Audio DIY Speaker Workshop' }],
  },
  twitter: { card: 'summary_large_image', images: ['https://b-audio.vn/og/home-cover.svg'] },
};

export default async function Page() {
  return (
    <>
      {/* Hero Section - Industrial Dark Tech */}
      <section className="section-hero min-h-screen flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 metal-texture opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/50 via-transparent to-accent-800/30"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          {/* Hero Content */}
          <div className="space-y-8 stagger-fade-up">
            <div className="space-y-4">
              <h1 className="font-heading text-hero lg:text-display text-neutral-100 font-bold leading-none tracking-tight uppercase">
                INDUSTRIAL<br />
                <span className="text-primary glow-text">AUDIO</span><br />
                WORKSHOP
              </h1>
              <div className="w-24 h-1 bg-primary shadow-gold-glow"></div>
            </div>
            
            <p className="text-body-lg text-neutral-300 font-body max-w-lg leading-relaxed">
              Chế tạo loa bluetooth chuyên nghiệp và hệ thống karaoke di động 
              với tiêu chuẩn công nghiệp. <span className="text-primary font-semibold">DIY Focus</span> - 
              <span className="text-primary font-semibold">Mobile-First</span> - 
              <span className="text-primary font-semibold">Trust</span>.
            </p>

            {/* Trust Signals */}
            <div className="flex items-center gap-6 text-body-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Bảo hành 2 năm</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Giao hàng 48h</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products"
                className="btn-primary group"
              >
                <span>KHÁM PHÁ SẢN PHẨM</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                href="/custom"
                className="btn-secondary group"
              >
                <Wrench className="h-4 w-4" />
                <span>ĐẶT CUSTOM</span>
              </Link>
            </div>
          </div>
          
          {/* Hero Visual - Industrial Speaker Mockup */}
          <div className="relative lg:justify-self-end">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glow Effects */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-150 animate-pulse"></div>
              
              {/* Main Speaker Unit */}
              <div className="card-industrial p-8 relative overflow-hidden">
                {/* Industrial Frame */}
                <div className="absolute inset-4 border-2 border-gray-600 rounded-xl"></div>
                <div className="absolute inset-6 border border-primary/30 rounded-lg"></div>
                
                {/* Speaker Components */}
                <div className="relative space-y-6">
                  {/* Brand Label */}
                  <div className="text-center border-b border-gray-600 pb-4 mb-6">
                    <div className="logo text-h3 mb-2">b-audio</div>
                    <div className="text-microcopy text-neutral-400 tracking-widest uppercase">DIY SERIES</div>
                  </div>
                  
                  {/* Main Driver */}
                  <div className="flex justify-center">
                    <div className="w-40 h-40 rounded-full bg-secondary-800 border-4 border-primary/50 shadow-gold-glow flex items-center justify-center relative overflow-hidden">
                      {/* Driver cone */}
                      <div className="w-32 h-32 rounded-full bg-secondary-700 border-2 border-primary/30 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40"></div>
                      </div>
                      {/* Mounting screws */}
                      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gray-500"></div>
                      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gray-500"></div>
                      <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-gray-500"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gray-500"></div>
                    </div>
                  </div>
                  
                  {/* Tweeter */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-secondary-800 border-2 border-gray-600 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-secondary-700 border border-gray-500 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-neutral-400"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Control Panel */}
                  <div className="bg-secondary-900 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <div className="w-3 h-3 rounded-full bg-primary shadow-gold-glow animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                      </div>
                      <div className="text-microcopy text-neutral-400 tracking-wider">POWER ON</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Industrial Grid */}
      <section className="section-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-h1 text-neutral-100 mb-4 uppercase tracking-tight">
              SẢN PHẨM <span className="text-primary">NỔI BẬT</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto shadow-gold-glow"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 stagger-fade-up">
            {[
              { 
                name: 'Loa Bluetooth DIY Pro', 
                price: '3.500.000', 
                spec: '50W RMS • Pin 12h', 
                icon: '🎵',
                featured: true
              },
              { 
                name: 'Loa Karaoke Di Động K1', 
                price: '6.500.000', 
                spec: '100W RMS • Pin 8h • Mic không dây', 
                icon: '🎤',
                featured: false
              },
              { 
                name: 'Loa Custom Build', 
                price: 'Từ 2.000.000', 
                spec: 'Tùy chỉnh theo yêu cầu', 
                icon: '🔧',
                featured: false
              }
            ].map((product, idx) => (
              <div key={idx} className="card-product group">
                {product.featured && (
                  <div className="absolute -top-3 -right-3 bg-primary text-secondary-700 px-3 py-1 rounded-full text-microcopy font-bold uppercase tracking-wider shadow-gold-glow">
                    BÁN CHẠY
                  </div>
                )}
                
                <div className="aspect-square bg-secondary-800 rounded-xl flex items-center justify-center relative overflow-hidden mb-6 border border-gray-600">
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
                    {product.icon}
                  </div>
                  
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-heading text-h4 text-neutral-100 group-hover:text-primary transition-colors duration-300 uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-body-sm text-neutral-400 font-mono">
                    {product.spec}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-h3 font-heading text-primary font-bold">
                      {product.price}₫
                    </span>
                    <button className="btn-ghost text-body-sm px-4 py-2">
                      XEM CHI TIẾT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary group">
              <span>XEM TẤT CẢ SẢN PHẨM</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* DIY Workshop Section */}
      <section className="section-accent py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-hero text-neutral-100 font-bold uppercase leading-none mb-4">
                  WORKSHOP<br />
                  <span className="text-primary">DIY FOCUS</span>
                </h2>
                <div className="w-24 h-1 bg-primary shadow-gold-glow mb-6"></div>
              </div>
              
              <p className="text-body-lg text-neutral-300 leading-relaxed">
                Xưởng chế tạo chuyên nghiệp với đội ngũ kỹ thuật giàu kinh nghiệm. 
                Chúng tôi tập trung vào việc tạo ra những sản phẩm audio chất lượng cao 
                theo tiêu chuẩn công nghiệp, phù hợp với nhu cầu DIY của khách hàng.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {[
                  'Thiết kế theo yêu cầu riêng biệt',
                  'Linh kiện chính hãng, chất lượng cao',
                  'Test âm thanh chuyên nghiệp',
                  'Hỗ trợ kỹ thuật trọn đời'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full shadow-gold-glow"></div>
                    <span className="text-body text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/custom" className="btn-primary group">
                <Wrench className="h-4 w-4" />
                <span>BẮT ĐẦU DỰ ÁN DIY</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Workshop Visual */}
            <div className="relative lg:justify-self-end">
              <div className="card-industrial p-8 max-w-md mx-auto">
                <div className="space-y-6">
                  {/* Workshop Header */}
                  <div className="text-center border-b border-gray-600 pb-4">
                    <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-heading text-h4 text-neutral-100 uppercase tracking-wide">
                      DIY WORKSHOP
                    </div>
                  </div>
                  
                  {/* Process Steps */}
                  <div className="space-y-4">
                    {[
                      { step: '01', label: 'THIẾT KẾ', status: 'active' },
                      { step: '02', label: 'CHẾ TẠO', status: 'pending' },
                      { step: '03', label: 'TEST CHẤT LƯỢNG', status: 'pending' },
                      { step: '04', label: 'GIAO HÀNG', status: 'pending' }
                    ].map((item, idx) => (
                      <div key={idx} className={`flex items-center gap-4 p-3 rounded-lg border ${
                        item.status === 'active' 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-600 bg-secondary-800/50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-label font-bold ${
                          item.status === 'active'
                            ? 'bg-primary text-secondary-700'
                            : 'bg-gray-600 text-neutral-400'
                        }`}>
                          {item.step}
                        </div>
                        <span className={`text-body-sm font-heading uppercase tracking-wide ${
                          item.status === 'active' 
                            ? 'text-primary' 
                            : 'text-neutral-400'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
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
