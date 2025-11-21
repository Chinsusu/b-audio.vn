## API Contract v1 (Laravel Backend)

This document describes the JSON contract that the Laravel API must implement
for the web (Next.js) and mobile (React Native) clients.

### 1. Entities

#### Category

```jsonc
{
  "id": 1,
  "slug": "portable",
  "name": "Portable",
  "description": "Loa kéo, loa xách tay...",
  "product_count": 5
}
```

#### Product

```jsonc
{
  "id": 1,
  "slug": "ba-k1",
  "title": "B-Audio K1 Portable 100W",
  "descriptionHtml": "<p>...</p>",
  "price": 4900000,
  "compare_price": 5500000,
  "power_watt": 100,
  "battery_hours": 8,
  "dimensions": "45 x 27 x 25 cm",
  "weight": 10,
  "connectivity": "BT, AUX, USB",
  "is_customizable": true,
  "rating_avg": 4.7,
  "rating_count": 12,
  "category": {
    "id": 2,
    "slug": "karaoke",
    "name": "Karaoke"
  },
  "images": [
    { "id": 11, "url": "https://.../front.jpg", "alt": "B-Audio K1" }
  ],
  "created_at": "2025-09-10T10:00:00.000Z",
  "updated_at": "2025-11-13T03:21:00.000Z"
}
```

#### Review

```jsonc
{
  "id": 101,
  "product_id": 1,
  "rating": 5,
  "author_name": "An",
  "content": "Âm thanh tốt, pin bền",
  "created_at": "2025-09-12T12:34:00.000Z"
}
```

### 2. Endpoints

Base path: `/api`

#### GET /products

Query params:
- `page`, `pageSize`
- `sort`: `newest` | `price_asc` | `price_desc` | `power_asc` | `power_desc`
- `search`
- `category`
- `min_price`, `max_price`, `min_power`, `max_power`, `min_battery`, `max_battery`

Response:

```jsonc
{
  "data": [ /* Product[] */ ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 12, "pageCount": 5, "total": 60 }
  }
}
```

#### GET /products/{slug}

Response:

```jsonc
{
  "data": {
    /* Product */
    "top_reviews": [ /* Review[0..3] */ ]
  }
}
```

#### GET /categories

```jsonc
{
  "data": [ /* Category[] */ ],
  "meta": {}
}
```

#### GET /products/{slug}/reviews

Returns a paginated list of reviews for a product.

#### POST /products/{slug}/reviews

Creates a review and recomputes `rating_avg` and `rating_count` for the product.

