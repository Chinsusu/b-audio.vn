import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout - B-Audio",
  description: "Complete your speaker purchase",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-darkBg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-textWhite">Checkout </span>
            <span className="text-goldAccent">Coming Soon</span>
          </h1>
          <div className="text-textGrey text-lg mb-8">
            Our e-commerce checkout system is currently under development. For
            now, please contact us directly for purchases.
          </div>
          <div className="bg-cardBg/40 backdrop-blur-sm border border-darkGrey rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-goldAccent mb-4">
              How to Order
            </h2>
            <div className="text-textWhite space-y-4 text-left">
              <div className="flex items-center">
                <span className="text-neonTurquoise mr-3">1.</span>
                Browse our products and note the models you want
              </div>
              <div className="flex items-center">
                <span className="text-neonTurquoise mr-3">2.</span>
                Contact us via email or phone with your selection
              </div>
              <div className="flex items-center">
                <span className="text-neonTurquoise mr-3">3.</span>
              We&apos;ll provide pricing and payment options
              </div>
              <div className="flex items-center">
                <span className="text-neonTurquoise mr-3">4.</span>
                Receive your custom B-Audio speakers
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Link
              href="/cart"
              className="inline-block bg-goldAccent hover:bg-goldAccent/80 text-darkBg font-bold py-3 px-8 rounded-lg transition-colors"
            >
              View Cart
            </Link>
            <div className="text-textGrey">
              or contact us directly at{" "}
              <a
                href="mailto:info@b-audio.vn"
                className="text-goldAccent hover:text-goldAccent/80"
              >
                info@b-audio.vn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
