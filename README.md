# B-Audio v2 Monorepo (Planning)

This repo now has two generations of code:

- `legacy/` – the original Next.js + Strapi monorepo (apps/web, apps/cms, infra, docs).
- `backend/` – placeholder for the new Laravel API + admin.
- `web/` – placeholder for the new Next.js frontend that will talk to Laravel.
- `mobile/` – placeholder for the new React Native app.

## Layout

- `legacy/` – keep as reference for UI/UX and SEO, but no new feature work.
- `backend/` – new Laravel project will live here (API + CMS).
- `web/` – new Next.js app for the website UI.
- `mobile/` – new React Native app for iOS/Android.

## Next Steps

1. Scaffold Laravel in `backend/` (models + migrations for products, categories, reviews).
2. Define API routes according to the shared JSON contract (see docs/ or tech notes).
3. Scaffold a minimal Next.js 14 app in `web/` that consumes the Laravel API.
4. Scaffold a React Native app in `mobile/` (home + products list) using the same API.

The `legacy/` folder remains intact so we can copy layout, Tailwind tokens, and SEO patterns from the current site while building v2.

