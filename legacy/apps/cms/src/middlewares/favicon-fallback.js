"use strict";

// If /favicon.ico fails (404/500), send 204 No Content instead to avoid console errors.
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path !== "/favicon.ico") {
      return next();
    }
    try {
      await next();
    } catch (e) {
      // swallow errors for favicon and return 204
      ctx.status = 204;
      ctx.set("Cache-Control", "public, max-age=2592000, immutable");
      ctx.body = "";
      return;
    }
    if (!ctx.status || ctx.status >= 400) {
      ctx.status = 204;
      ctx.set("Cache-Control", "public, max-age=2592000, immutable");
      ctx.body = "";
    }
  };
};

