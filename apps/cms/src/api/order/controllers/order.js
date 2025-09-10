'use strict';
const utils = require('@strapi/utils');
const { ApplicationError } = utils.errors;

/**
 * order controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    // TODO: validate reCAPTCHA token, rate-limit per IP
    const body = ctx.request.body || {};
    if (!body.data || !body.data.name || !body.data.phone) {
      throw new ApplicationError('Thiếu tên hoặc số điện thoại');
    }
    
    const entity = await strapi.entityService.create('api::order.order', { 
      data: body.data 
    });
    
    return { 
      data: entity,
      meta: {}
    };
  },
  
  // Allow admin to view orders
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  }
}));
