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
    // Permissions for public read are handled via router config (auth: false).
    // Keeping bootstrap empty to avoid noisy permission updates at startup.
  },
 5000); // Wait 5 seconds for Strapi to fully initialize
  },
};
