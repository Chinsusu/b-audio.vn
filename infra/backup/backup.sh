#!/bin/bash
set -e

# Backup configuration
BACKUP_DIR="/var/backups/b-audio"
DATE=$(date +%Y%m%d_%H%M%S)
KEEP_DAYS=7

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "$(date): Starting backup..."

# 1. Backup PostgreSQL database
echo "$(date): Backing up PostgreSQL database..."
sudo -u postgres pg_dump strapi | gzip > "$BACKUP_DIR/strapi_db_$DATE.sql.gz"

# 2. Backup Strapi uploads directory
echo "$(date): Backing up Strapi uploads..."
if [ -d "/var/www/mono/apps/cms/public/uploads" ]; then
    tar -czf "$BACKUP_DIR/strapi_uploads_$DATE.tar.gz" -C "/var/www/mono/apps/cms/public" uploads
fi

# 3. Backup configuration files
echo "$(date): Backing up config files..."
tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" \
    /var/www/mono/apps/cms/.env \
    /var/www/mono/apps/web/.env.local \
    /etc/nginx/sites-available/b-audio.conf \
    /etc/cloudflared/config.yml \
    /root/.pm2/dump.pm2 2>/dev/null || true

# 4. Clean up old backups (keep last 7 days)
echo "$(date): Cleaning up old backups..."
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$KEEP_DAYS -delete
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +$KEEP_DAYS -delete

# 5. Log backup completion
echo "$(date): Backup completed successfully"
du -sh "$BACKUP_DIR"
