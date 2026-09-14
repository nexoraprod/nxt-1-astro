#!/bin/bash

# Deployment script for nxt-1 astro
# Usage: ./scripts/deploy.sh [environment]

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Environment
ENV=${1:-production}

echo -e "${GREEN}🚀 Deploying nxt-1 astro to ${ENV}...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Build application
echo -e "${YELLOW}📦 Building application...${NC}"
npm run build

# Build Docker image
echo -e "${YELLOW}🐳 Building Docker image...${NC}"
docker build -t nxt-1-astro:${ENV} .

# Stop existing container
echo -e "${YELLOW}🛑 Stopping existing container...${NC}"
docker stop nxt-1-astro-${ENV} 2>/dev/null || true
docker rm nxt-1-astro-${ENV} 2>/dev/null || true

# Run new container
echo -e "${YELLOW}▶️  Starting new container...${NC}"
docker run -d \
    --name nxt-1-astro-${ENV} \
    -p 80:80 \
    --restart unless-stopped \
    nxt-1-astro:${ENV}

# Wait for container to start
echo -e "${YELLOW}⏳ Waiting for container to start...${NC}"
sleep 5

# Health check
echo -e "${YELLOW}🏥 Running health check...${NC}"
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌐 Application is running at: http://localhost${NC}"
else
    echo -e "${RED}❌ Health check failed!${NC}"
    echo -e "${YELLOW}📋 Container logs:${NC}"
    docker logs nxt-1-astro-${ENV}
    exit 1
fi

# Show container info
echo -e "${GREEN}📊 Container Info:${NC}"
docker ps | grep nxt-1-astro-${ENV}

echo -e "${GREEN}🎉 Done!${NC}"
