'use strict';

const { RateLimiterMemory } = require('rate-limiter-flexible');

module.exports = (config, { strapi }) => {
  const rateLimiter = new RateLimiterMemory({
    keyGenerator: (req) => req.ip || req.connection.remoteAddress,
    points: config.max || 10, // Number of requests
    duration: config.duration || 60, // Per seconds
  });

  return async (ctx, next) => {
    try {
      await rateLimiter.consume(ctx.ip || ctx.request.ip);
      return next();
    } catch (rejRes) {
      ctx.status = 429;
      ctx.body = {
        error: {
          status: 429,
          name: 'TooManyRequestsError',
          message: config.message || 'Too many requests',
          details: {},
        },
      };
    }
  };
};
