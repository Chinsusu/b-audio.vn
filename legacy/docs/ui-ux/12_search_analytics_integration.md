# Autocomplete Search + Analytics Integration

## Header.tsx
- Đã thay bằng phiên bản có **autocomplete** (debounce 250ms), gọi Strapi:
  `/api/products?filters[title][$containsi]=<term>&fields[0]=title&fields[1]=slug&pagination[pageSize]=5`
- Sự kiện:
  - `analytics.search(term)` khi submit
  - `analytics.select_item(item)` khi chọn gợi ý

## Listing `/products`
- Thêm client wrapper `ItemListClient` để bắn `view_item_list` khi render danh sách.

## PDP `/products/[slug]`
- Thêm `ProductAnalytics` để bắn `view_item`.
- Nút “Đặt hàng nhanh” bắn `add_to_quote`.

## GA4/Pixels
- Đảm bảo đã cài snippet GA4/FB Pixel trong `app/layout.tsx` như README.
