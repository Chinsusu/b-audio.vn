# Cloudflare Tunnel cho b-audio.vn

## Bước 1: Cài cloudflared
```bash
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared jammy main' | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update && sudo apt -y install cloudflared
```

## Bước 2: Đăng nhập & tạo tunnel
```bash
sudo cloudflared tunnel login
# Mở trình duyệt → chọn account → cấp quyền

sudo cloudflared tunnel create b-audio-tunnel
# LƯU lại Tunnel UUID in ra: <TUNNEL-UUID>
# Tập tin credentials được tạo tại: /etc/cloudflared/<TUNNEL-UUID>.json
```

## Bước 3: Cấu hình ingress
Chỉnh `/etc/cloudflared/config.yml` (dùng file mẫu ở `infra/cloudflared/config.yml`), thay `<TUNNEL-UUID>`:

```yaml
tunnel: <TUNNEL-UUID>
credentials-file: /etc/cloudflared/<TUNNEL-UUID>.json
ingress:
  - hostname: b-audio.vn
    service: http://localhost:3000
  - hostname: www.b-audio.vn
    service: http://localhost:3000
  - hostname: api.b-audio.vn
    service: http://localhost:1337
  - service: http_status:404
```

## Bước 4: Tạo DNS CNAME cho hostnames
Tự động bằng cloudflared:
```bash
sudo cloudflared tunnel route dns <TUNNEL-UUID> b-audio.vn
sudo cloudflared tunnel route dns <TUNNEL-UUID> www.b-audio.vn
sudo cloudflared tunnel route dns <TUNNEL-UUID> api.b-audio.vn
```

## Bước 5: Chạy tunnel dưới systemd
```bash
sudo cloudflared --config /etc/cloudflared/config.yml service install
sudo systemctl enable cloudflared
sudo systemctl restart cloudflared
systemctl status cloudflared
```

## Ghi chú
- Không cần Nginx/SSL origin nếu dùng Cloudflare Tunnel (CF sẽ terminate TLS).
- Vẫn có thể đặt Nginx phía trong để gzip/brotli hoặc rate-limit; khi đó `service` → `http://localhost:8080` (Nginx reverse về 3000 & 1337).
- Đảm bảo PM2 đang chạy:
  - `pm2 start cms` (Strapi :1337)
  - `pm2 start web` (Next.js :3000)
