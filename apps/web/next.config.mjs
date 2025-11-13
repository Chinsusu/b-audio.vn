export default {
  images: {
    domains: ["api.b-audio.vn", "localhost"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  compress: true,
  optimizeFonts: true,
  // Security headers are handled by Nginx and Cloudflare edge; not set here to avoid duplicates.
};
