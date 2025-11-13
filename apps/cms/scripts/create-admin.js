#!/usr/bin/env node
// Create or update a Strapi admin user (Super Admin)
// Usage:
//   node scripts/create-admin.js <email> <password> [firstname] [lastname]
// Or via env:
//   NEW_ADMIN_EMAIL=.. NEW_ADMIN_PASSWORD=.. node scripts/create-admin.js

/* eslint-disable no-console */

const path = require('path');
const strapiFactory = require('@strapi/strapi');

async function run() {
  try {
    const email = process.env.NEW_ADMIN_EMAIL || process.argv[2];
    const password = process.env.NEW_ADMIN_PASSWORD || process.argv[3];
    const firstname = process.env.NEW_ADMIN_FIRSTNAME || process.argv[4] || 'Owner';
    const lastname = process.env.NEW_ADMIN_LASTNAME || process.argv[5] || 'Admin';

    if (!email || !password) {
      console.error('Usage: node scripts/create-admin.js <email> <password> [firstname] [lastname]');
      process.exit(2);
    }

    // Ensure working directory is the Strapi app root
    process.chdir(path.join(__dirname, '..'));
    const app = await strapiFactory().load();

    const superAdminRole = await app.admin.services.role.getSuperAdmin();

    // Find existing admin by email
    const existing = await app.db.query('admin::user').findOne({ where: { email } });

    if (existing) {
      await app.admin.services.user.updateById(existing.id, {
        email,
        password,
        firstname,
        lastname,
        isActive: true,
        roles: [superAdminRole.id],
      });
      console.log(`Updated existing admin: ${email}`);
    } else {
      await app.admin.services.user.create({
        email,
        password,
        firstname,
        lastname,
        isActive: true,
        roles: [superAdminRole.id],
      });
      console.log(`Created new admin: ${email}`);
    }

    await app.destroy();
    process.exit(0);
  } catch (err) {
    console.error('Failed to create/update admin:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

run();

