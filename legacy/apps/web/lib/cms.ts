export type Section = {
  id?: number;
  kind: string;
  title?: string;
  subtitle?: string;
  body?: string;
  items?: any;
  video_url?: string;
  cta_label?: string;
  cta_href?: string;
  order?: number;
};

export type Page = {
  title: string;
  slug: string;
  sections: Section[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.b-audio.vn";
const STRAPI_READ_TOKEN = process.env.STRAPI_READ_TOKEN || process.env.STRAPI_API_TOKEN;

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const params = new URLSearchParams();
  params.set("filters[slug][$eq]", slug);
  params.set("populate", "sections");
  const headers: Record<string, string> = {};
  if (STRAPI_READ_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_READ_TOKEN}`;
  }
  const res = await fetch(`${API_BASE}/api/pages?${params.toString()}`, {
    next: { revalidate: 60 },
    headers,
  });
  if (!res.ok) {
    return null;
  }
  const json = await res.json().catch(() => null);
  const row = json?.data?.[0];
  if (!row) {
    return null;
  }
  return {
    title: row.attributes?.title,
    slug: row.attributes?.slug,
    sections: row.attributes?.sections || [],
  };
}
