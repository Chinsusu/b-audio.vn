# Mono: Next.js + Strapi + Postgres (FE/BE tách rời)

Repo mẫu đã đóng gói để bạn **deploy nhanh** website bán loa DIY/bluetooth/loa kéo karaoke.

## Thành phần
- **apps/web** — Next.js (FE) + Tailwind + SEO (JSON-LD, sitemap).
- **apps/cms** — Strapi v4 (BE/CMS, Postgres) kèm content-types: product, category, review, faq, order.
- **infra** — Nginx reverse proxy (FE & API), PM2, backup script, notes Ops.
- **.github/workflows** — CI/CD mẫu (build & deploy FE qua SSH, bạn chỉnh tuỳ hạ tầng).
- **docs** — hướng dẫn triển khai chi tiết.

> Lưu ý: Strapi nên được `pnpm build && pnpm start` sau khi bạn cấu hình `.env` và migrate DB.

---

## Quickstart (local dev)

```bash
# Prereq: Node 22, pnpm, Postgres 14+, Redis (optional)
# 1) CMS
cd apps/cms
pnpm install
cp .env.example .env
# chỉnh .env theo DB local của bạn
pnpm build
pnpm develop   # hoặc pnpm start (production)

# 2) Web
cd ../../apps/web
pnpm install
cp .env.example .env.local
pnpm dev       # http://localhost:3000
```

## Deploy (server Ubuntu 22.04)

1. Cài Node 22, pnpm, PM2, Postgres, Nginx (xem `docs/01_prereq.md`).
2. Cấu hình Nginx dùng file mẫu trong `infra/nginx/*.conf`.
3. Cấu hình `.env` cho `apps/cms` và `apps/web`.
4. Build & chạy:
```bash
# CMS
cd apps/cms && pnpm install && pnpm build
pm2 start "pnpm start" --name cms --cwd $(pwd)

# Web
cd ../../apps/web && pnpm install && pnpm build
pm2 start "pnpm start" --name web --cwd $(pwd)
pm2 save
```
5. Bật cron backup: xem `infra/backup/backup.sh`.

## CI/CD
- Workflow mẫu: `.github/workflows/deploy.yml` (đẩy artefact FE qua SSH). Bạn có thể bổ sung bước deploy CMS tương tự.

## Nội dung & SEO
- JSON-LD, sitemap, robots.txt đã kèm mẫu.
- Strapi schema đã định nghĩa sẵn các collection types phổ biến cho hàng hoá.

---

## Bản quyền
MIT – dùng tự do cho dự án của bạn.
