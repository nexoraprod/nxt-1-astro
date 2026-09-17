#!/bin/bash

# Docker Hub Repository Setup Script
# Script untuk setup repository di Docker Hub dan push image

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

echo ""
echo "=========================================="
echo "🐳 DOCKER HUB REPOSITORY SETUP"
echo "=========================================="
echo ""

# Check Docker login
log "🔍 Checking Docker Hub login status..."
if docker info 2>&1 | grep -q "Username"; then
    USERNAME=$(docker info 2>&1 | grep "Username" | awk '{print $2}')
    success "Logged in as: $USERNAME"
else
    error "Not logged in to Docker Hub"
    echo ""
    echo "Please login to Docker Hub first:"
    echo ""
    read -p "Enter Docker Hub username: " DOCKER_USERNAME
    read -sp "Enter Docker Hub password: " DOCKER_PASSWORD
    echo ""
    
    if docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD" 2>&1; then
        success "Login successful"
        USERNAME="$DOCKER_USERNAME"
    else
        error "Login failed. Check credentials."
        exit 1
    fi
fi

echo ""

# Check if repository exists
REPO_NAME="nxt-1-astro"
IMAGE_NAME="$USERNAME/$REPO_NAME"

log "🔍 Checking if repository exists: $IMAGE_NAME"

# Try to pull the image (will fail if doesn't exist)
if docker pull "$IMAGE_NAME:latest" 2>&1 | grep -q "not found\|repository does not exist"; then
    warning "Repository does not exist yet"
    echo ""
    echo "=========================================="
    echo "📋 CREATE REPOSITORY IN DOCKER HUB"
    echo "=========================================="
    echo ""
    echo "You need to create the repository manually:"
    echo ""
    echo "1. Go to: https://hub.docker.com/repositories"
    echo "2. Click 'Create Repository'"
    echo "3. Fill in:"
    echo "   - Namespace: $USERNAME"
    echo "   - Repository Name: $REPO_NAME"
    echo "   - Description: nxt-1 astro - Panduan Lengkap Membangun Model AI"
    echo "   - Visibility: Public (recommended)"
    echo "4. Click 'Create'"
    echo ""
    echo "Or use this direct link:"
    echo "https://hub.docker.com/repository/create?namespace=$USERNAME&name=$REPO_NAME"
    echo ""
    read -p "Have you created the repository? (y/n): " CREATED
    
    if [ "$CREATED" != "y" ] && [ "$CREATED" != "Y" ]; then
        error "Please create the repository first, then run this script again."
        exit 1
    fi
else
    success "Repository exists: $IMAGE_NAME"
fi

echo ""

# Check if image exists locally
log "🔍 Checking local image..."
if docker images | grep -q "$IMAGE_NAME"; then
    success "Image exists locally: $IMAGE_NAME"
else
    warning "Image not found locally"
    echo ""
    read -p "Do you want to build the image now? (y/n): " BUILD
    
    if [ "$BUILD" = "y" ] || [ "$BUILD" = "Y" ]; then
        log "🔨 Building image..."
        docker build -t "$IMAGE_NAME:latest" .
        success "Image built successfully"
    else
        error "Cannot push without building the image first"
        exit 1
    fi
fi

echo ""

# Push image
log "🚀 Pushing image to Docker Hub..."
echo ""
read -p "Are you sure you want to push $IMAGE_NAME:latest? (y/n): " CONFIRM

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    if docker push "$IMAGE_NAME:latest" 2>&1; then
        success "Push successful!"
        echo ""
        echo "=========================================="
        echo "🎉 SUCCESS!"
        echo "=========================================="
        echo ""
        echo "📦 Image: $IMAGE_NAME:latest"
        echo "🔗 Docker Hub: https://hub.docker.com/r/$USERNAME/$REPO_NAME"
        echo ""
        echo "Pull command:"
        echo "  docker pull $IMAGE_NAME:latest"
        echo ""
        echo "Run command:"
        echo "  docker run -d -p 80:80 $IMAGE_NAME:latest"
        echo ""
    else
        error "Push failed!"
        echo ""
        echo "Possible solutions:"
        echo "1. Verify repository exists: https://hub.docker.com/r/$USERNAME/$REPO_NAME"
        echo "2. Check you have write permission"
        echo "3. Re-login: docker logout && docker login"
        echo "4. Check repository visibility (must be public or you must be owner)"
        exit 1
    fi
else
    warning "Push cancelled"
fi

echo ""
success "🎉 Setup complete!"
echo ""
