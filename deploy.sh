#!/bin/bash
# Manual deployment script for b-audio.vn
set -e

echo "🚀 Starting manual deployment..."

# Function to deploy web
deploy_web() {
    echo "📦 Building Web..."
    cd /var/www/mono/apps/web
    pnpm install
    pnpm build
    pm2 restart web
    echo "✅ Web deployed successfully"
}

# Function to deploy CMS  
deploy_cms() {
    echo "📦 Building CMS..."
    cd /var/www/mono/apps/cms
    pnpm install
    pnpm build
    pm2 restart cms
    echo "✅ CMS deployed successfully"
}

# Parse arguments
case "${1:-both}" in
    "web")
        deploy_web
        ;;
    "cms")
        deploy_cms
        ;;
    "both")
        deploy_cms
        deploy_web
        ;;
    *)
        echo "Usage: $0 [web|cms|both]"
        echo "  web  - Deploy only Web (Next.js)"
        echo "  cms  - Deploy only CMS (Strapi)"
        echo "  both - Deploy both (default)"
        exit 1
        ;;
esac

echo "🎉 Deployment completed!"
pm2 list
