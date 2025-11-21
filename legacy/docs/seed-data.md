# Seeding data (CMS)

This document explains how to seed sample data for Strapi CMS.

## Scripts
- Location: `apps/cms/scripts/seed-sample.js`
- NPM command: `pnpm --filter cms run seed:sample`

## Local development
```bash
cd apps/cms
pnpm install
# ensure .env points to your local Postgres
NODE_ENV=development pnpm run seed:sample
```

## Production / Staging
- Caution: seeding writes to the database currently configured in `.env`
- On server (production):
```bash
cd /var/www/mono/apps/cms
NODE_ENV=production pnpm run seed:sample
```

## What gets seeded
- Categories: `Portable`, `Karaoke`
- Products: `B-Audio Mini`, `B-Audio K1` (published)
- Reviews: 2 entries
- FAQs: 2 entries

## Idempotency
- The seed script uses a simple upsert strategy by content keys to avoid duplicates on re-run.
