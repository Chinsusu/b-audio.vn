# CI/CD Setup cho b-audio.vn

## 1. GitHub Actions (Tự động)

### Cấu hình GitHub Secrets

Trong GitHub repository settings → Secrets and variables → Actions, thêm:

```
SSH_HOST=103.161.180.58
SSH_USER=root
SSH_PRIVATE_KEY=<private-key-content>
SSH_PORT=22
```

### Lấy SSH Private Key

```bash
# Trên server, tạo deploy key hoặc dùng key hiện có
cat ~/.ssh/id_rsa  # Copy nội dung này vào SSH_PRIVATE_KEY
```

### Workflow sẽ chạy khi:
- Push code lên branch `main`
- Có thay đổi trong thư mục `apps/`
- Chỉ deploy CMS nếu có thay đổi trong `apps/cms/`
- Luôn deploy Web nếu có thay đổi

## 2. Manual Deployment

### Trên server:

```bash
# Deploy cả hai
/var/www/mono/deploy.sh

# Chỉ deploy Web
/var/www/mono/deploy.sh web

# Chỉ deploy CMS  
/var/www/mono/deploy.sh cms
```

## 3. Rollback nhanh

```bash
# Xem PM2 logs nếu có lỗi
pm2 logs

# Restart services
pm2 restart cms web

# Backup automatic restore (nếu cần)
/usr/local/bin/backup.sh
```

## 4. Zero-downtime deployment

Workflow đã được thiết kế:
- Build trước trên GitHub Actions
- Transfer file nhanh qua SCP
- PM2 restart (rolling restart)
- Cleanup tự động

## 5. Monitoring deployment

```bash
# Xem trạng thái services
pm2 list

# Xem logs real-time
pm2 logs --lines 50

# Test endpoints
curl -I https://b-audio.vn
curl -I https://api.b-audio.vn/api/products
```
