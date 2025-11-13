'use strict';

async function recalcProductRating(productId) {
  if (!productId) return;
  try {
    // Fetch published reviews for this product
    const rows = await strapi.db.query('api::review.review').findMany({
      where: {
        product: productId,
        publishedAt: { $notNull: true },
      },
      select: ['rating'],
    });
    const count = rows.length;
    const sum = rows.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    const avg = count > 0 ? Number((sum / count).toFixed(2)) : 0;

    await strapi.entityService.update('api::product.product', productId, {
      data: { rating_avg: avg, rating_count: count },
    });
  } catch (e) {
    strapi.log.warn(`recalcProductRating failed for product ${productId}: ${e.message}`);
  }
}

module.exports = {
  async afterCreate(event) {
    try {
      const productId = event?.result?.product?.id || event?.params?.data?.product;
      await recalcProductRating(productId);
    } catch (e) {
      strapi.log.warn(`afterCreate review lifecycle error: ${e.message}`);
    }
  },
  async afterUpdate(event) {
    try {
      const productId = event?.result?.product?.id || event?.params?.data?.product;
      await recalcProductRating(productId);
    } catch (e) {
      strapi.log.warn(`afterUpdate review lifecycle error: ${e.message}`);
    }
  },
  async beforeDelete(event) {
    // Save productId in state so we can use it in afterDelete
    try {
      const id = event?.params?.where?.id;
      if (!id) return;
      const row = await strapi.db.query('api::review.review').findOne({
        where: { id },
        populate: { product: true },
      });
      event.state = event.state || {};
      event.state.productId = row?.product?.id;
    } catch (e) {
      strapi.log.warn(`beforeDelete review lifecycle error: ${e.message}`);
    }
  },
  async afterDelete(event) {
    try {
      const productId = event?.state?.productId;
      await recalcProductRating(productId);
    } catch (e) {
      strapi.log.warn(`afterDelete review lifecycle error: ${e.message}`);
    }
  },
};

