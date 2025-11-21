import type {
  CategorySummary,
  PaginatedResponse,
  Product,
  Review,
  SingleResponse,
} from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000/api";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    // Let Next control caching per-call via next:{ revalidate }
    cache: "no-store",
  });

  if (!res.ok) {
    // Try to include server error body for debugging
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }
    // eslint-disable-next-line no-console
    console.error("API error", res.status, url, body);
    throw new Error(`API error ${res.status} for ${url}`);
  }

  return (await res.json()) as T;
}

export async function getProducts(params: {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  min_power?: number;
  max_power?: number;
  min_battery?: number;
  max_battery?: number;
} = {}): Promise<PaginatedResponse<Product>> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    qs.set(key, String(value));
  });
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return fetchJson<PaginatedResponse<Product>>(`/products${suffix}`);
}

export async function getProduct(slug: string): Promise<SingleResponse<Product & {
  top_reviews?: Review[];
}>> {
  return fetchJson<SingleResponse<Product & { top_reviews?: Review[] }>>(
    `/products/${encodeURIComponent(slug)}`,
  );
}

export async function getCategories(): Promise<SingleResponse<CategorySummary[]> | {
  data: CategorySummary[];
  meta: object;
}> {
  return fetchJson<{ data: CategorySummary[]; meta: object }>("/categories");
}

export async function getProductReviews(
  slug: string,
  params: { page?: number; pageSize?: number; sort?: string } = {},
): Promise<PaginatedResponse<Review>> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    qs.set(key, String(value));
  });
  const suffix = qs.toString() ? `?${qs.toString()}` : "";
  return fetchJson<PaginatedResponse<Review>>(
    `/products/${encodeURIComponent(slug)}/reviews${suffix}`,
  );
}

export async function createReview(
  slug: string,
  payload: { rating: number; author_name: string; content: string },
): Promise<SingleResponse<Review>> {
  return fetchJson<SingleResponse<Review>>(
    `/products/${encodeURIComponent(slug)}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

