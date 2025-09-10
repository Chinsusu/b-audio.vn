# Bảo mật tối thiểu

- UFW mở `Nginx Full`, chặn port nội bộ.
- Fail2ban chống brute-force.
- Strapi: bật CORS whitelist, rate-limit cho endpoint `orders`.
- reCAPTCHA cho form đặt hàng/tuỳ biến.
- Audit log thay đổi nội dung (Strapi Admin).

```bash
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo apt -y install fail2ban
```
