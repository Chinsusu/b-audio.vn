module.exports = {
  siteUrl: "https://b-audio.vn",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [],
  },
  changefreq: "weekly",
  transform: async (config, path) => {
    let priority = 0.5;
    if (path === "/") {priority = 1.0;}
    else if (path.startsWith("/products/")) {priority = 0.7;}
    else if (path.startsWith("/products")) {priority = 0.8;}
    return {
      loc: path,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
