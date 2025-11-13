Nginx setup for b-audio.vn (FE) and api.b-audio.vn (API)

Files provided:
- fe-b-audio.conf – reverse proxy to Next.js (127.0.0.1:3000) with sane headers and static caching
- api-b-audio.conf – reverse proxy to Strapi (127.0.0.1:1337)
- Templates also exist: fe-yourdomain.conf, api-yourdomain.conf, and internal variants

Install (Ubuntu):

```bash
sudo cp infra/nginx/fe-b-audio.conf /etc/nginx/sites-available/b-audio.conf
sudo cp infra/nginx/api-b-audio.conf /etc/nginx/sites-available/api.b-audio.conf

sudo ln -sf /etc/nginx/sites-available/b-audio.conf /etc/nginx/sites-enabled/b-audio.conf
sudo ln -sf /etc/nginx/sites-available/api.b-audio.conf /etc/nginx/sites-enabled/api.b-audio.conf

sudo nginx -t && sudo systemctl reload nginx
```

Notes:
- TLS paths assume Let’s Encrypt at:
  - /etc/letsencrypt/live/b-audio.vn/
  - /etc/letsencrypt/live/api.b-audio.vn/
  Adjust if different.
- The config sets a sanitized `Permissions-Policy` to avoid browser console warnings:
  `geolocation=(), camera=(), microphone=(), fullscreen=(self), autoplay=(self)`
- Adds basic security headers (`Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`).
- Caches Next.js static assets under `/_next/static/` for 1 year and common assets for 30 days.
- Timeouts increased to handle slow clients without 502.

Cloudflare override (if proxied through CF):
1) Cloudflare Dashboard → Rules → Transform Rules → HTTP Response Header Modification → Create Rule
2) Condition: Hostname equals `b-audio.vn` (repeat for `api.b-audio.vn`)
3) Then → Set static header:
   - Header: `Permissions-Policy`
   - Value: `geolocation=(), camera=(), microphone=(), fullscreen=(self), autoplay=(self)`
   (or Remove header if you prefer origin’s header only)

Disable Cloudflare Browser Insights if you want to remove the blocked beacon request:
Cloudflare → Analytics & Logs → Browser Insights → Disable. The ad‑block blocked error is harmless otherwise.

Troubleshooting 502:
- Ensure Next.js is built and running on 127.0.0.1:3000 (`pnpm --dir apps/web build && pm2 restart web`)
- Check `pm2 logs web` / `pm2 logs cms` and `/var/log/nginx/error.log`

