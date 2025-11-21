# Backup & Monitoring

## Backup
- Script `infra/backup/backup.sh`:
  - Dump Postgres DB `strapi`
  - Rsync thư mục `apps/cms/public/uploads`
  - Nén & xoá bản cũ >7 ngày

Thêm cron:
```bash
echo "0 3 * * * root /usr/local/bin/backup.sh" | sudo tee /etc/cron.d/site-backup
```

## Monitoring
- UptimeRobot cho HTTP checks.
- Tùy chọn Prometheus/Grafana nếu cần metrics sâu.
