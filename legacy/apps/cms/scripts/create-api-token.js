#!/usr/bin/env node
/* eslint-disable no-console */
// Create a Strapi Admin API token (read-only) and print it
// Usage: node scripts/create-api-token.js [name]

const path = require('path');
const strapiFactory = require('@strapi/strapi');

async function run() {
  const name = process.argv[2] || 'web-read';
  process.chdir(path.join(__dirname, '..'));
  const app = await strapiFactory().load();
  try {
    const payload = {
      name,
      description: 'Read-only token for Next.js frontend',
      type: 'read-only',
    };
    const token = await app.service('admin::api-token').create(payload);
    // Strapi returns the unhashed key as "accessKey" on creation
    const access = token?.accessKey || token?.access_key || token?.token || null;
    if (!access) {
      throw new Error('Token created but access key not returned. Create via Admin if needed.');
    }
    console.log(access);
  } catch (e) {
    console.error('Failed to create API token:', e.message || e);
    process.exitCode = 1;
  } finally {
    await app.destroy();
  }
}

run();

