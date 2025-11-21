# Nginx reverse proxy

- FE: `yourdomain.com` → Next.js :3000
- API: `api.yourdomain.com` → Strapi :1337

Xem file mẫu trong `infra/nginx/` và thay domain tương ứng, sau đó:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
```
