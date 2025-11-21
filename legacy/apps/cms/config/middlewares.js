module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://res.cloudinary.com",
            "https://vn.jbl.com",
            "https://*.jbl.com",
            "https://*.harman.com",
            "https://*.demandware.net",
            "https:", // Allow all HTTPS sources for image uploads
          ],
          // Allow Cloudflare Browser Insights script to avoid CSP console noise
          // If you disable Browser Insights at Cloudflare, you can remove this.
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://static.cloudflareinsights.com",
          ],
          // Allow fonts from self + data + HTTPS CDNs used by admin build
          "font-src": ["'self'", "data:", "https:"],
          "media-src": ["'self'", "data:", "blob:", "https:"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://b-audio.vn",
        "https://www.b-audio.vn",
        "https://api.b-audio.vn",
        "http://localhost:3000", // for local dev
        "http://127.0.0.1:3000",
      ],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  // If Strapi favicon resolves with error, fall back to 204 to avoid console error
  { resolve: "./src/middlewares/favicon-fallback" },
  "strapi::favicon",
  "strapi::public",
];
