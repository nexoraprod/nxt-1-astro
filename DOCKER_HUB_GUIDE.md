# 🐳 Docker Hub Publishing Guide

Panduan lengkap untuk build dan push image nxt-1-astro ke Docker Hub.

---

## 📋 Prerequisites

### 1. Docker Hub Account
- Daftar di: https://hub.docker.com/signup
- Username: `1astro` (atau username Anda)

### 2. Docker Installed
```bash
# Check Docker version
docker --version

# Check Docker Compose
docker-compose --version
```

### 3. Login ke Docker Hub
```bash
docker login
# Masukkan username dan password Docker Hub
```

---

## 🚀 Quick Build & Push

### Option 1: Build dan Push Manual

```bash
# 1. Build image
docker build -t 1astro/nxt-1-astro:latest .

# 2. Tag dengan version (optional)
docker tag 1astro/nxt-1-astro:latest 1astro/nxt-1-astro:v1.5.0

# 3. Push ke Docker Hub
docker push 1astro/nxt-1-astro:latest
docker push 1astro/nxt-1-astro:v1.5.0
```

### Option 2: Gunakan Docker Compose

```bash
# Build dan push dengan docker-compose
docker-compose -f docker-compose.full.yml build
docker-compose -f docker-compose.full.yml push
```

### Option 3: Gunakan Script Otomatis

```bash
# Make script executable
chmod +x scripts/build-and-push.sh

# Run script
./scripts/build-and-push.sh
```

---

## 📝 Build Script

Buat file `scripts/build-and-push.sh`:

```bash
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

# Configuration
IMAGE_NAME="1astro/nxt-1-astro"
VERSION=${1:-"latest"}

echo ""
echo "=========================================="
echo "🐳 BUILD AND PUSH TO DOCKER HUB"
echo "=========================================="
echo ""

# Check Docker login
log "🔍 Checking Docker login..."
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker first."
fi

# Check if logged in
if ! docker pull hello-world > /dev/null 2>&1; then
    warning "Not logged in to Docker Hub"
    log "Please login to Docker Hub:"
    docker login
fi

# Build image
log "🔨 Building image: $IMAGE_NAME:$VERSION"
docker build -t $IMAGE_NAME:$VERSION .

if [ $? -eq 0 ]; then
    success "Build successful!"
else
    error "Build failed!"
fi

# Tag as latest if version specified
if [ "$VERSION" != "latest" ]; then
    log "🏷️  Tagging as latest..."
    docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest
fi

# Show image size
log "📊 Image size:"
docker images $IMAGE_NAME --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"

# Push to Docker Hub
log "🚀 Pushing to Docker Hub..."
docker push $IMAGE_NAME:$VERSION

if [ "$VERSION" != "latest" ]; then
    docker push $IMAGE_NAME:latest
fi

if [ $? -eq 0 ]; then
    success "Push successful!"
else
    error "Push failed!"
fi

echo ""
echo "=========================================="
echo "🎉 SUCCESS!"
echo "=========================================="
echo ""
echo "📦 Image: $IMAGE_NAME:$VERSION"
echo "🔗 Docker Hub: https://hub.docker.com/r/1astro/nxt-1-astro"
echo ""
echo "Pull command:"
echo "  docker pull $IMAGE_NAME:$VERSION"
echo ""
echo "Run command:"
echo "  docker run -d -p 80:80 $IMAGE_NAME:$VERSION"
echo ""
```

---

## 🔧 Troubleshooting

### Error: "npm ci" failed

**Penyebab:** Tidak ada `package-lock.json`

**Solusi:**
```bash
# Generate package-lock.json
npm install

# Commit file
git add package-lock.json
git commit -m "Add package-lock.json"

# Build lagi
docker build -t 1astro/nxt-1-astro:latest .
```

### Error: "pull access denied"

**Penyebab:** Image name salah atau belum login

**Solusi:**
```bash
# Login ke Docker Hub
docker login

# Check image name
docker images | grep nxt-1-astro

# Build dengan nama yang benar
docker build -t 1astro/nxt-1-astro:latest .
```

### Error: "manifest unknown"

**Penyebab:** Image belum di-push ke Docker Hub

**Solusi:**
```bash
# Push image
docker push 1astro/nxt-1-astro:latest
```

### Error: "no such host"

**Penyebab:** Masalah DNS atau internet

**Solusi:**
```bash
# Check internet connection
ping hub.docker.com

# Restart Docker
sudo systemctl restart docker
```

---

## 📊 Verify di Docker Hub

Setelah push, verify di:
- https://hub.docker.com/r/1astro/nxt-1-astro

Check:
- ✅ Image size
- ✅ Tags (latest, v1.5.0, dll)
- ✅ Pull count
- ✅ Last updated

---

## 🎯 Usage After Push

### Pull Image
```bash
docker pull 1astro/nxt-1-astro:latest
```

### Run Container
```bash
# Basic run
docker run -d -p 80:80 1astro/nxt-1-astro:latest

# With environment variables
docker run -d \
  -p 80:80 \
  -e NODE_ENV=production \
  --name nxt-1-astro \
  1astro/nxt-1-astro:latest

# With volume
docker run -d \
  -p 80:80 \
  -v $(pwd)/logs:/var/log \
  --name nxt-1-astro \
  1astro/nxt-1-astro:latest
```

### Run dengan Docker Compose
```bash
# Pull dan run
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔄 Auto-Build dengan GitHub Actions

Buat file `.github/workflows/docker-publish.yml`:

```yaml
name: Docker Publish

on:
  push:
    branches: [ main ]
    tags: [ 'v*.*.*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: docker.io
  IMAGE_NAME: 1astro/nxt-1-astro

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
```

### Setup GitHub Secrets

Di repository GitHub, tambahkan secrets:
- `DOCKERHUB_USERNAME`: Username Docker Hub Anda
- `DOCKERHUB_TOKEN`: Access Token dari Docker Hub

Generate token di: https://hub.docker.com/settings/security

---

## 📋 Checklist

### Sebelum Build
- [ ] Docker installed dan running
- [ ] Login ke Docker Hub (`docker login`)
- [ ] Package-lock.json ada (atau gunakan `npm install`)
- [ ] Dockerfile sudah benar
- [ ] Image name format: `username/repository:tag`

### Setelah Build
- [ ] Build successful
- [ ] Image size reasonable
- [ ] Test locally: `docker run -p 80:80 1astro/nxt-1-astro:latest`
- [ ] Push successful
- [ ] Verify di Docker Hub

### After Push
- [ ] Pull test: `docker pull 1astro/nxt-1-astro:latest`
- [ ] Run test di server lain
- [ ] Update documentation
- [ ] Tag release di GitHub

---

## 🎉 Success Criteria

Image berhasil di-publish jika:
- ✅ Build tanpa error
- ✅ Push ke Docker Hub successful
- ✅ Bisa di-pull dari mesin lain
- ✅ Container berjalan dengan baik
- ✅ Website accessible di port 80

---

<div align="center">

**Happy Publishing! 🚀**

</div>
