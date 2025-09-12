import Link from 'next/link';
import { mediaUrl } from '../../utils/mediaUrl';
import Image from 'next/image';
import AddToCartButton from '../cart/AddToCartButton';
import WishlistButton from "../wishlist/WishlistButton";
import CompareButton from "../comparison/CompareButton";


// Replaced by mediaUrl import from utils

export function ProductCard({ p }: { p: any }) {
  const attrs = p?.attributes || {};
  const rel = attrs.images?.data?.[0]?.attributes?.url;
  const imageUrl = mediaUrl(rel);
  
  return (
    <div className="group rounded-xl border border-darkGrey bg-darkGrey/40 backdrop-blur-sm p-4 shadow-2xl hover:border-goldAccent/50 hover:shadow-glowGold/20 transition-all duration-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-goldAccent focus-within:ring-offset-2 focus-within:ring-offset-darkBg">
      <Link href={`/products/${attrs.slug}`}>
        {imageUrl ? (
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-darkBg/60">
            <Image
              src={imageUrl}
              alt={attrs.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkBg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="aspect-square w-full rounded-lg bg-darkBg/60 border border-darkGrey flex items-center justify-center">
            <span className="text-4xl opacity-60">🔊</span>
          </div>
        )}
        <div className="mt-3 font-heading text-h4 text-textWhite font-semibold group-hover:text-goldAccent transition-colors">
          {attrs.title}
        </div>
        <div className="font-body text-body text-neonTurquoise font-medium">
          {new Intl.NumberFormat('vi-VN').format(attrs.price)} đ
        </div>
      </Link>
      <div className="mt-3 flex items-center gap-2">
        <AddToCartButton 
          product={{ 
            id: p.id, 
            slug: attrs.slug, 
            attributes: { 
              title: attrs.title, 
              price_vnd: attrs.price, 
              images: attrs.images 
            } 
          }} 
          className="flex-1 font-microcopy text-microcopy tracking-widest"
          variant="secondary"
        />
        <WishlistButton
          product={{ 
            id: p.id, 
            slug: attrs.slug, 
            attributes: { 
              title: attrs.title, 
              price_vnd: attrs.price, 
              images: attrs.images 
            } 
          }}
          size="md"
          variant="icon"
        />        
        <CompareButton
          product={{ 
            id: p.id, 
            slug: attrs.slug, 
            attributes: { 
              title: attrs.title, 
              price_vnd: attrs.price, 
              power_watt: attrs.power_watt,
              battery_hours: attrs.battery_hours,
              connectivity: attrs.connectivity,
              images: attrs.images 
            } 
          }}
          size="md"
          variant="icon"
        />
      </div>
    </div>
  );
}
