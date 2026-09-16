#!/bin/bash

# Build and Push to Docker Hub
# Usage: ./scripts/build-and-push.sh [version]

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
    exit 1
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

# Configuration
IMAGE_NAME="1astro/nxt-1-astro"
VERSION=${1:-"latest"}

echo ""
echo "=========================================="
echo "🐳 BUILD AND PUSH TO DOCKER HUB"
echo "=========================================="
echo ""

# Check Docker
log "🔍 Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker first."
fi
success "Docker is running"

# Check if logged in
log "🔍 Checking Docker Hub login..."
if ! docker pull hello-world > /dev/null 2>&1; then
    warning "Not logged in to Docker Hub or no internet connection"
    echo ""
    read -p "Do you want to login now? (y/n): " LOGIN
    
    if [ "$LOGIN" = "y" ] || [ "$LOGIN" = "Y" ]; then
        docker login
    else
        warning "Continuing without login. Push might fail."
    fi
else
    success "Docker Hub connection OK"
fi

echo ""

# Check package-lock.json
log "🔍 Checking package-lock.json..."
if [ ! -f "package-lock.json" ]; then
    warning "package-lock.json not found"
    echo ""
    read -p "Generate package-lock.json now? (y/n): " GEN_LOCK
    
    if [ "$GEN_LOCK" = "y" ] || [ "$GEN_LOCK" = "Y" ]; then
        log "Running npm install..."
        npm install
        success "package-lock.json generated"
    else
        warning "Continuing without package-lock.json"
    fi
else
    success "package-lock.json found"
fi

echo ""

# Build image
log "🔨 Building image: $IMAGE_NAME:$VERSION"
echo ""

docker build -t $IMAGE_NAME:$VERSION .

if [ $? -eq 0 ]; then
    success "Build successful!"
else
    error "Build failed!"
fi

echo ""

# Tag as latest if version specified
if [ "$VERSION" != "latest" ]; then
    log "🏷️  Tagging as latest..."
    docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest
    success "Tagged as latest"
fi

echo ""

# Show image info
log "📊 Image information:"
echo ""
docker images $IMAGE_NAME --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
echo ""

# Test image locally
log "🧪 Testing image locally..."
echo ""
read -p "Do you want to test the image locally? (y/n): " TEST

if [ "$TEST" = "y" ] || [ "$TEST" = "Y" ]; then
    log "Starting container on port 8080..."
    
    # Stop existing container if any
    docker stop nxt-1-astro-test 2>/dev/null || true
    docker rm nxt-1-astro-test 2>/dev/null || true
    
    # Run container
    docker run -d \
        -p 8080:80 \
        --name nxt-1-astro-test \
        $IMAGE_NAME:$VERSION
    
    if [ $? -eq 0 ]; then
        success "Container started!"
        echo ""
        echo "🌐 Access website at: http://localhost:8080"
        echo ""
        read -p "Press Enter to stop test container and continue..."
        
        # Stop container
        docker stop nxt-1-astro-test
        docker rm nxt-1-astro-test
        success "Test container stopped"
    else
        error "Failed to start container"
    fi
fi

echo ""

# Push to Docker Hub
log "🚀 Pushing to Docker Hub..."
echo ""
read -p "Are you sure you want to push $IMAGE_NAME:$VERSION? (y/n): " CONFIRM

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    docker push $IMAGE_NAME:$VERSION
    
    if [ $? -eq 0 ]; then
        success "Push successful!"
    else
        error "Push failed!"
    fi
    
    # Push latest tag if version specified
    if [ "$VERSION" != "latest" ]; then
        log "🚀 Pushing latest tag..."
        docker push $IMAGE_NAME:latest
        
        if [ $? -eq 0 ]; then
            success "Latest tag pushed!"
        else
            warning "Failed to push latest tag"
        fi
    fi
else
    warning "Push cancelled"
    echo ""
    echo "Image built successfully but not pushed."
    echo "To push later, run:"
    echo "  docker push $IMAGE_NAME:$VERSION"
fi

echo ""
echo "=========================================="
echo "🎉 BUILD COMPLETE!"
echo "=========================================="
echo ""
echo "📦 Image: $IMAGE_NAME:$VERSION"
echo "🔗 Docker Hub: https://hub.docker.com/r/1astro/nxt-1-astro"
echo ""
echo "Commands:"
echo "  Pull:    docker pull $IMAGE_NAME:$VERSION"
echo "  Run:     docker run -d -p 80:80 $IMAGE_NAME:$VERSION"
echo "  Test:    docker run -p 8080:80 $IMAGE_NAME:$VERSION"
echo ""
