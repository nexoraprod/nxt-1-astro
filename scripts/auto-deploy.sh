#!/bin/bash

# Auto-deploy script untuk nxt-1 astro
# Script ini akan pull image terbaru dan restart container

set -e

# Configuration
APP_NAME="nxt-1-astro"
DEPLOY_DIR="/opt/nxt-1-astro"
LOG_FILE="/var/log/${APP_NAME}-deploy.log"
DOCKER_COMPOSE_FILE="${DEPLOY_DIR}/docker-compose.yml"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}" | tee -a "$LOG_FILE"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    error "Script ini harus dijalankan sebagai root atau dengan sudo"
    exit 1
fi

# Check if deploy directory exists
if [ ! -d "$DEPLOY_DIR" ]; then
    warning "Deploy directory tidak ditemukan, membuat directory baru..."
    mkdir -p "$DEPLOY_DIR"
fi

# Check if docker-compose.yml exists
if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
    error "docker-compose.yml tidak ditemukan di $DEPLOY_DIR"
    exit 1
fi

# Navigate to deploy directory
cd "$DEPLOY_DIR"

log "🚀 Starting deployment for $APP_NAME..."

# Pull latest image
log "📥 Pulling latest Docker image..."
if docker-compose pull; then
    success "Image berhasil di-pull"
else
    error "Gagal pull image"
    exit 1
fi

# Stop existing containers
log "🛑 Stopping existing containers..."
docker-compose down --remove-orphans || warning "Tidak ada container yang berjalan"

# Start new containers
log "🚀 Starting new containers..."
if docker-compose up -d; then
    success "Container berhasil dijalankan"
else
    error "Gagal menjalankan container"
    exit 1
fi

# Wait for container to be ready
log "⏳ Waiting for container to be ready..."
sleep 10

# Health check
log "🏥 Running health check..."
MAX_RETRIES=5
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f -s http://localhost/health > /dev/null; then
        success "Health check passed!"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            error "Health check failed after $MAX_RETRIES attempts"
            error "Container logs:"
            docker-compose logs --tail=50
            exit 1
        fi
        warning "Health check attempt $RETRY_COUNT/$MAX_RETRIES failed, retrying..."
        sleep 5
    fi
done

# Cleanup old images
log "🧹 Cleaning up old Docker images..."
docker image prune -f

# Show container status
log "📊 Container status:"
docker-compose ps

success "🎉 Deployment completed successfully!"
log "🌐 Application is running at: http://$(hostname -I | awk '{print $1}')"

exit 0
