'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    // Set public permissions for API endpoints
    setTimeout(async () => {
      try {
        const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: { type: 'public' },
        });

        if (publicRole) {
          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action: 'api::product.product.find' },
            data: { enabled: true },
          });

          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action: 'api::product.product.findOne' },
            data: { enabled: true },
          });

          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action: 'api::category.category.find' },
            data: { enabled: true },
          });

          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action: 'api::review.review.find' },
            data: { enabled: true },
          });

          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action: 'api::faq.faq.find' },
            data: { enabled: true },
          });

          await strapi.db.query('plugin::users-permissions.permission').updateMany({
            where: { role: publicRole.id, action: 'api::order.order.create' },
            data: { enabled: true },
          });

          strapi.log.info('✅ Public API permissions set successfully');
        }
      } catch (error) {
        strapi.log.error('❌ Error setting public permissions:', error);
      }
    }, 5000); // Wait 5 seconds for Strapi to fully initialize
  },
};
