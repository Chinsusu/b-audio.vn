'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::review.review', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
