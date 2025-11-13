#!/usr/bin/env node
// Recompute rating_avg and rating_count for all products from published reviews
// Usage:
//   node scripts/backfill-ratings.js [--dry] [--batch 100]
//   NEW_ADMIN_EMAIL=... NEW_ADMIN_PASSWORD=... node scripts/create-admin.js  # separate helper

/* eslint-disable no-console */

const path = require('path');
const strapiFactory = require('@strapi/strapi');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { dry: false, batch: 100 };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--dry') out.dry = true;
    else if (a === '--batch') {
      const v = Number(args[i + 1]);
      if (!Number.isNaN(v) && v > 0) out.batch = v;
      i++;
    }
  }
  return out;
}

async function getAllProducts(strapi, start, limit) {
  return await strapi.entityService.findMany('api::product.product', {
    fields: ['id', 'title'],
    start,
    limit,
    sort: { id: 'asc' },
  });
}

async function getRatingsForProduct(strapi, productId) {
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
  return { avg, count };
}

async function run() {
  const opts = parseArgs();
  console.log('[backfill] starting... opts=', opts);

  // Ensure CWD is the Strapi app root
  process.chdir(path.join(__dirname, '..'));
  const app = await strapiFactory().load();

  let start = 0;
  const limit = opts.batch;
  let totalUpdated = 0;
  for (;;) {
    const products = await getAllProducts(app, start, limit);
    if (!products || products.length === 0) break;
    for (const p of products) {
      const { avg, count } = await getRatingsForProduct(app, p.id);
      if (opts.dry) {
        console.log(`DRY product#${p.id} ${p.title || ''} => avg=${avg} count=${count}`);
      } else {
        await app.entityService.update('api::product.product', p.id, {
          data: { rating_avg: avg, rating_count: count },
        });
        console.log(`OK product#${p.id} => avg=${avg} count=${count}`);
        totalUpdated++;
      }
    }
    start += products.length;
  }

  console.log(`[backfill] done. products updated: ${totalUpdated}`);
  await app.destroy();
}

run().catch((err) => {
  console.error('[backfill] failed:', err && err.message ? err.message : err);
  process.exit(1);
});

