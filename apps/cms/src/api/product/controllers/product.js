'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find(ctx) {
    const populate = { category: true, images: true };
    const { results, pagination } = await strapi
      .service('api::product.product')
      .find({ ...ctx.query, populate });
    return this.transformResponse(results, { pagination });
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const populate = { category: true, images: true };
    const entity = await strapi
      .service('api::product.product')
      .findOne(id, { ...ctx.query, populate });
    return this.transformResponse(entity);
  },
}));
