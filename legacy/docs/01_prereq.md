# Prereq & hệ thống (Ubuntu 22.04)

```bash
sudo apt update && sudo apt -y upgrade
sudo apt -y install nginx redis-server certbot python3-certbot-nginx git curl unzip jq
# Node 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt -y install nodejs
sudo npm i -g pnpm pm2

# Postgres
sudo apt -y install postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER strapi WITH PASSWORD 'StrongPass!';"
sudo -u postgres psql -c "CREATE DATABASE strapi OWNER strapi;"
```
