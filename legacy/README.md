# Mono: Next.js + Strapi + Postgres (FE/BE tách rời)

Repo mẫu đã đóng gói để bạn **deploy nhanh** website bán loa DIY/bluetooth/loa kéo karaoke.

## Thành phần
- **apps/web** — Next.js (FE) + Tailwind + SEO (JSON-LD, sitemap).
- **apps/cms** — Strapi v4 (BE/CMS, Postgres) kèm content-types: product, category, review, faq, order.
- **infra** — Nginx reverse proxy (FE & API), PM2, backup script, notes Ops.
- **.github/workflows** — CI/CD mẫu (build & deploy FE qua SSH, bạn chỉnh tuỳ hạ tầng).
- **docs** — hướng dẫn triển khai chi tiết.
- **scripts** — automation tools including SEO scanning.

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

## SEO Tools & Automation

### SEO Scan Script
Automated SEO validation tool with scoring and CI integration:

```bash
# Basic scan with detailed output
./scripts/seo_scan.sh

# JSON output for CI/CD
./scripts/seo_scan.sh --json --output reports/seo-report.json

# Strict mode (fails if SEO score < 70)
./scripts/seo_scan.sh --strict

# Custom path and depth
./scripts/seo_scan.sh --root ./apps/web --max-depth 5
```

**Features:**
- **SEO Scoring**: 0-100 point system with A-F grades
- **Comprehensive Checks**: robots.txt, sitemap, meta descriptions, JSON-LD, social meta tags
- **JSON-LD Validation**: Syntax checking for structured data
- **Image Analysis**: Alt text verification
- **CI Integration**: Automated reports on PRs and deployments

### Scoring System
- **90-100 (A)**: Excellent SEO implementation
- **80-89 (B)**: Good, minor improvements needed  
- **70-79 (C)**: Acceptable, some issues to address
- **60-69 (D)**: Poor, requires significant work
- **<60 (F)**: Failing, major SEO problems

### GitHub Actions Integration
The project includes automated SEO scanning via `.github/workflows/seo-scan.yml`:
- Runs on every PR and push to main
- Generates SEO report artifacts (downloadable from Actions tab)
- Optional strict mode to fail builds on low SEO scores

## CI/CD

- Workflow mẫu: `.github/workflows/deploy.yml` (đẩy artefact FE qua SSH). Bạn có thể bổ sung bước deploy CMS tương tự.
- **SEO Workflow**: `.github/workflows/seo-scan.yml` - automated SEO validation with artifacts.

## Nội dung & SEO
- JSON-LD, sitemap, robots.txt đã kèm mẫu với điểm SEO cao (Grade A).
- Strapi schema đã định nghĩa sẵn các collection types phổ biến cho hàng hoá.
- **SEO Guide**: Xem `docs/seo-guide.md` cho best practices và troubleshooting.

## Sample data (seed)

- The CMS includes a seed script to upsert sample categories, products, reviews and FAQs, and to attach placeholder images via the Upload plugin.
- Run the script after configuring the database and environment:

```bash
# from repo root
NODE_ENV=production pnpm --dir apps/cms run -s seed:sample
# or from CMS directory
cd apps/cms && NODE_ENV=production pnpm run seed:sample
```

- Verify:
```bash
curl -s "https://api.b-audio.vn/api/products?populate=images,category" | jq .
```

## Documentation

- **[Setup & Prerequisites](docs/01_prereq.md)** - Server setup and requirements
- **[SEO Best Practices](docs/seo-guide.md)** - Comprehensive SEO implementation guide
- **[Infrastructure](infra/)** - Nginx, PM2, backup configurations
- **[CI/CD Setup](CI_CD_SETUP.md)** - GitHub Actions deployment guide

## CI/CD triggers note

The deploy workflow triggers on push to `main` when files under `apps/**` or `.github/workflows/**` change. Pure documentation updates (README, CHANGELOG, docs) do not redeploy.

---

## Bản quyền
MIT – dùng tự do cho dự án của bạn.
