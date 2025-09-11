# Changelog

All notable changes to this project will be documented in this file.

## 2025-09-11

### CMS (Strapi)
- Fix startup & runtime issues by overriding Sharp to 0.34.3 via pnpm overrides
- Add `@strapi/plugin-users-permissions` dependency
- Add core routers/services with public read (auth: false) for:
  - products, categories, reviews, faqs
- Fix content-type Category pluralName to `categories` (route now `/api/categories`)
- Ensure upload folder exists: `apps/cms/public/uploads`
- Rebuild Strapi admin artifacts
- Persist PM2 process list

### Notes
- API status after changes:
  - `/api/products` → 200
  - `/api/categories` → 200 (previously `/api/categorys`)
  - `/api/reviews` → 200
  - `/api/faqs` → 200
