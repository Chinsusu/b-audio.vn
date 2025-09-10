'use strict';

/**
 * order router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::order.order', {
  config: {
    create: {
      middlewares: [
        {
          name: 'global::rate-limit',
          config: {
            max: 5, // 5 requests per window
            duration: 60000, // 1 minute
            message: 'Too many order requests, please try again later.',
          },
        },
      ],
    },
  },
});
