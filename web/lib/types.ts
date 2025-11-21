export type CategorySummary = {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  product_count: number;
};

export type Product = {
  id: number;
  slug: string;
  title: string;
  descriptionHtml: string;
  price: number;
  compare_price?: number | null;
  power_watt?: number | null;
  battery_hours?: number | null;
  dimensions?: string | null;
  weight?: number | null;
  connectivity?: string | null;
  is_customizable: boolean;
  rating_avg: number;
  rating_count: number;
  category?: CategorySummary | null;
  images: { id: number; url: string; alt?: string | null }[];
  created_at?: string | null;
  updated_at?: string | null;
};

export type Review = {
  id: number;
  product_id: number;
  rating: number;
  author_name: string;
  content: string;
  created_at: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type SingleResponse<T> = {
  data: T;
};

