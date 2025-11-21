# Performance

- Next Image + WebP/AVIF, kích thước ảnh đúng thực tế.
- Lazyload dưới màn hình đầu tiên, prefetch route quan trọng.
- Tối thiểu bundle: import icon theo nhu cầu, tránh icon pack lớn.
- Cache API listing 60–120s (SWR, revalidate).
- Font: dùng system font/Inter từ assets, tránh block render.
