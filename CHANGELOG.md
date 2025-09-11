# Changelog

All notable changes to this project will be documented in this file.

## 2025-09-11

### Updates (later on 2025-09-11)
- Product API now populates `images` by default in controller (find & findOne)
- Seed script attaches placeholder images via Upload plugin and links them to products
  - Run: `NODE_ENV=production pnpm --dir apps/cms run -s seed:sample`
- CI/CD deploy.yml improvements:
  - Web packaging includes only existing optional files (prevents tar errors)
  - CMS build/deploy runs only when `apps/cms/**` changed
  - Health checks added for web and API endpoints
  - NOTE: Docs-only changes (e.g. README/CHANGELOG) will not trigger deploy due to paths filter (`apps/**`, `.github/workflows/**`)


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
