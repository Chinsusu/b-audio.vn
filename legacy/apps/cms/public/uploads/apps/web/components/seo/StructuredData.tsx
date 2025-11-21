interface Product {
  id: number;
  attributes: {
    title: string;
    description?: string;
    price: number;
    slug: string;
    images?: {
      data?: Array<{
        attributes: { url: string; alternativeText?: string; }
      }>
    };
    category?: {
      data?: {
        attributes: { name: string; }
      }
    };
  };
}

interface StructuredDataProps {
  product?: Product;
  type?: 'product' | 'organization' | 'website';
}

export default function StructuredData({ product, type = 'website' }: StructuredDataProps) {
  const generateProductSchema = (product: Product) => {
    const imageUrl = product.attributes.images?.data?.[0]?.attributes?.url;
    const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_API_BASE || 'https://api.b-audio.vn'}${imageUrl}`;
    
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.attributes.title,
      "description": product.attributes.description || `High-quality DIY speaker kit: ${product.attributes.title}`,
      "image": fullImageUrl,
      "brand": {
        "@type": "Brand",
        "name": "B-Audio"
      },
      "offers": {
        "@type": "Offer",
        "price": product.attributes.price,
        "priceCurrency": "VND",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "B-Audio Vietnam"
        }
      },
      "category": product.attributes.category?.data?.attributes?.name || "DIY Speaker Kits",
      "url": `https://b-audio.vn/products/${product.attributes.slug}`
    };
  };

  const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "B-Audio Vietnam",
    "description": "Premium DIY speaker kits and custom audio solutions",
    "url": "https://b-audio.vn",
    "logo": "https://b-audio.vn/hero.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@b-audio.vn",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/baudio.vn",
      "https://instagram.com/baudio.vn"
    ]
  });

  const generateWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "B-Audio Vietnam",
    "description": "Premium DIY speaker kits, custom builds, and professional audio solutions",
    "url": "https://b-audio.vn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://b-audio.vn/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  });

  let schema;
  if (type === 'product' && product) {
    schema = generateProductSchema(product);
  } else if (type === 'organization') {
    schema = generateOrganizationSchema();
  } else {
    schema = generateWebsiteSchema();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
