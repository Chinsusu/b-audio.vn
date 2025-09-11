This PR updates the project changelog and documents the recent CMS (Strapi) fixes and improvements.

Summary
- Override Sharp to 0.34.3 via pnpm overrides to resolve native binary installation issues on Linux
- Add @strapi/plugin-users-permissions dependency
- Add core routers/services with public read (auth: false) for: products, categories, reviews, faqs
- Fix content-type Category pluralName to "categories" (route now /api/categories)
- Ensure upload folder exists (apps/cms/public/uploads)
- Rebuild Strapi admin artifacts
- Persist PM2 process list

API status after changes
- /api/products → 200
- /api/categories → 200 (previously /api/categorys)
- /api/reviews → 200
- /api/faqs → 200

Notes
- These changes unblock CMS startup and make public READ endpoints available for the storefront.
