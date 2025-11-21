#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const strapiFactory = require('@strapi/strapi');

const UID = process.argv[2] || 'api::product.product';

async function run() {
  process.chdir(path.join(__dirname, '..'));
  const app = await strapiFactory().load();
  try {
    const conf = await app
      .plugin('content-manager')
      .service('content-types')
      .getConfiguration(UID);
    console.log(JSON.stringify(conf, null, 2));
  } catch (e) {
    console.error('Failed to get CM config:', e.message || e);
    process.exitCode = 1;
  } finally {
    await app.destroy();
  }
}

run();

