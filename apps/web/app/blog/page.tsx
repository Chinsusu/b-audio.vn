import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - B-Audio',
  description: 'Tech insights and speaker building guides',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-darkBg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-textWhite">Blog </span>
            <span className="text-goldAccent">Coming Soon</span>
          </h1>
          <div className="text-textGrey text-lg mb-8">
            We're working on bringing you the latest in DIY audio technology, 
            speaker building guides, and tech insights.
          </div>
          <div className="bg-cardBg/40 backdrop-blur-sm border border-darkGrey rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-goldAccent mb-4">What to Expect</h2>
            <ul className="text-textWhite space-y-3 text-left">
              <li className="flex items-center">
                <span className="text-neonTurquoise mr-3">•</span>
                DIY speaker building tutorials
              </li>
              <li className="flex items-center">
                <span className="text-neonTurquoise mr-3">•</span>
                Audio technology deep dives
              </li>
              <li className="flex items-center">
                <span className="text-neonTurquoise mr-3">•</span>
                Product reviews and comparisons
              </li>
              <li className="flex items-center">
                <span className="text-neonTurquoise mr-3">•</span>
                Industry news and trends
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
