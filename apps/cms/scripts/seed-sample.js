// Strapi v4 programmatic seed script
// Usage: NODE_ENV=development pnpm run seed:sample

const { createStrapi } = require('@strapi/strapi');

(async () => {
  const app = await createStrapi().load();
  try {
    const catModel = 'api::category.category';
    const prodModel = 'api::product.product';

    // Upsert helper
    const upsert = async (model, where, data) => {
      const existing = await strapi.db.query(model).findOne({ where });
      return existing
        ? await strapi.db.query(model).update({ where: { id: existing.id }, data })
        : await strapi.db.query(model).create({ data });
    };

    // Categories
    const catPortable = await upsert(catModel, { slug: 'portable' }, { name: 'Portable', slug: 'portable' });
    const catKaraoke  = await upsert(catModel, { slug: 'karaoke' }, { name: 'Karaoke',  slug: 'karaoke'  });

    // Products (minimal fields only)
    await upsert(prodModel, { slug: 'ba-mini' }, {
      title: 'B-Audio Mini', slug: 'ba-mini', price: 990000,
      power_watt: 15, battery_hours: 8, connectivity: 'BT',
      category: catPortable.id,
    });
    await upsert(prodModel, { slug: 'ba-k1' }, {
      title: 'B-Audio K1', slug: 'ba-k1', price: 2990000,
      power_watt: 60, battery_hours: 10, connectivity: 'BT',
      category: catKaraoke.id,
    });

    console.log('✅ Seed completed');
  } catch (e) {
    console.error('❌ Seed failed:', e);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
})();
