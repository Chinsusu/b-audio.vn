// Strapi v4 programmatic seed script
// Usage: NODE_ENV=development pnpm run seed:sample

const Strapi = require('@strapi/strapi');

(async () => {
  const strapi = await Strapi().load();
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
    const catPortable = await upsert(catModel, { slug: 'portable' }, { name: 'Portable', slug: 'portable', publishedAt: new Date() });
    const catKaraoke  = await upsert(catModel, { slug: 'karaoke' }, { name: 'Karaoke',  slug: 'karaoke',  publishedAt: new Date() });

    // Products (minimal fields only)
    await upsert(prodModel, { slug: 'ba-mini' }, {
      title: 'B-Audio Mini', slug: 'ba-mini', price: 990000,
      power_watt: 15, battery_hours: 8, connectivity: 'BT',
      category: catPortable.id, publishedAt: new Date(),
    });
    await upsert(prodModel, { slug: 'ba-k1' }, {
      title: 'B-Audio K1', slug: 'ba-k1', price: 2990000,
      power_watt: 60, battery_hours: 10, connectivity: 'BT',
      category: catKaraoke.id, publishedAt: new Date(),
    });

    
    // Reviews
    const revModel = 'api::review.review';
    await upsert(revModel, { author_name: 'An', content: 'Âm thanh tốt, pin bền', rating: 5 }, {
      author_name: 'An', content: 'Âm thanh tốt, pin bền', rating: 5,
      product: 1, publishedAt: new Date(),
    });
    await upsert(revModel, { author_name: 'Binh', content: 'Giá ổn, chất lượng ổn', rating: 4 }, {
      author_name: 'Binh', content: 'Giá ổn, chất lượng ổn', rating: 4,
      product: 2, publishedAt: new Date(),
    });

    // FAQs
    const faqModel = 'api::faq.faq';
    await upsert(faqModel, { question: 'Thời lượng pin?', answer: 'Tối đa 8-10 giờ tùy model' }, {
      question: 'Thời lượng pin?', answer: 'Tối đa 8-10 giờ tùy model',
      product: 1, publishedAt: new Date(),
    });
    await upsert(faqModel, { question: 'Bảo hành?', answer: '12 tháng tại B-Audio' }, {
      question: 'Bảo hành?', answer: '12 tháng tại B-Audio',
      product: 2, publishedAt: new Date(),
    });


    // Attach placeholder images to products if missing
    const https = require('https');
    const { promisify } = require('util');

    const fetchBuffer = (url) => new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const chunks = [];
        res.on('data', (d) => chunks.push(d));
        res.on('end', () => resolve({
          buffer: Buffer.concat(chunks),
          contentType: res.headers['content-type'] || 'image/jpeg',
        }));
      }).on('error', reject);
    });

    const uploadService = strapi.plugin('upload').service('upload');
    const fs = require('fs');
    const path = require('path');
    const fsp = fs.promises;

    const ensureProductImage = async (slug, url, fileName) => {
      // find product with images
      const prods = await strapi.entityService.findMany(prodModel, {
        filters: { slug },
        populate: { images: true },
        limit: 1,
      });
      if (!prods.length) return;
      const prod = prods[0];
      if (prod.images && prod.images.length) return; // already has image
      const { buffer, contentType } = await fetchBuffer(url);
      const tmpPath = path.join('/tmp', fileName);
      await fsp.writeFile(tmpPath, buffer);
      const uploaded = await uploadService.upload({
        data: {},
        files: {
          path: tmpPath,
          name: fileName,
          type: contentType,
          size: buffer.length,
        },
      });
      try { await fsp.unlink(tmpPath); } catch (e) {}
      const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
      await strapi.entityService.update(prodModel, prod.id, {
        data: { images: [file.id] },
      });
      console.log(`Attached image to ${slug}:`, file && file.url);
    };

    await ensureProductImage('ba-mini', 'https://picsum.photos/seed/ba-mini/800/600', 'ba-mini.jpg');
    await ensureProductImage('ba-k1', 'https://picsum.photos/seed/ba-k1/800/600', 'ba-k1.jpg');

    console.log('✅ Seed completed');
  } catch (e) {
    console.error('❌ Seed failed:', e);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
})();
