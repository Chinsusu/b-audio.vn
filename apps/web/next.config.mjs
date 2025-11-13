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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Set a conservative, valid Permissions-Policy to avoid console warnings
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(), camera=(), microphone=(), fullscreen=(self), autoplay=(self)",
          },
          // Helpful security defaults
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};
