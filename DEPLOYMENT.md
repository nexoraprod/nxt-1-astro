# 🚀 Panduan Deploy Docker dari GitHub Repository

Panduan lengkap untuk deploy website **nxt-1 astro** dari GitHub ke server production menggunakan Docker.

---

## 📋 Daftar Isi

1. [Persiapan](#persiapan)
2. [Setup GitHub Repository](#setup-github-repository)
3. [Setup Docker Registry](#setup-docker-registry)
4. [Setup Server](#setup-server)
5. [GitHub Actions CI/CD](#github-actions-cicd)
6. [Manual Deployment](#manual-deployment)
7. [Auto Deployment](#auto-deployment)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## 1. Persiapan

### Requirements
- ✅ GitHub Account
- ✅ Docker Hub Account (atau registry lain)
- ✅ VPS/Server dengan Docker installed
- ✅ Domain (optional, untuk SSL)
- ✅ SSH access ke server

### Tools yang Dibutuhkan
```bash
# Di local machine
- Git
- Docker
- Docker Compose
- SSH client

# Di server
- Docker
- Docker Compose
- Nginx (optional, untuk reverse proxy)
```

---

## 2. Setup GitHub Repository

### Step 1: Initialize Git Repository
```bash
# Di folder project
git init
git add .
git commit -m "feat: initial commit - nxt-1 astro"

# Buat repository di GitHub
# https://github.com/new
# Nama: nxt-1-astro
# Visibility: Public/Private

# Connect ke GitHub
git remote add origin https://github.com/nexoraprod/nxt-1-astro.git
git branch -M main
git push -u origin main
```

### Step 2: Verifikasi Repository
```bash
# Check status
git status

# Check remote
git remote -v

# Pull latest
git pull origin main
```

---

## 3. Setup Docker Registry

### Option A: Docker Hub (Recommended untuk pemula)

#### 1. Buat Account Docker Hub
```bash
# Sign up di https://hub.docker.com
# Verifikasi email
```

#### 2. Login dari CLI
```bash
docker login
# Masukkan username & password
```

#### 3. Buat Repository
```bash
# Di Docker Hub dashboard
# Click "Create Repository"
# Name: nxt-1-astro
# Visibility: Public/Private
# Description: Panduan lengkap membangun model AI
```

#### 4. Push Image
```bash
# Build image
docker build -t nexoraprod/nxt-1-astro:latest .

# Tag dengan version
docker tag nexoraprod/nxt-1-astro:latest nexoraprod/nxt-1-astro:v1.0.0

# Push ke Docker Hub
docker push nexoraprod/nxt-1-astro:latest
docker push nexoraprod/nxt-1-astro:v1.0.0
```

### Option B: GitHub Container Registry (GHCR)

#### 1. Generate Personal Access Token
```bash
# GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# Generate new token
# Scopes: write:packages, read:packages
```

#### 2. Login ke GHCR
```bash
echo YOUR_GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

#### 3. Build & Push
```bash
# Build image
docker build -t ghcr.io/nexoraprod/nxt-1-astro:latest .

# Push
docker push ghcr.io/nexoraprod/nxt-1-astro:latest
```

### Option C: Self-Hosted Registry

```bash
# Di server
docker run -d \
  --name registry \
  --restart always \
  -p 5000:5000 \
  -v /opt/registry/data:/var/lib/registry \
  registry:2

# Di local
docker build -t localhost:5000/nxt-1-astro:latest .
docker push localhost:5000/nxt-1-astro:latest
```

---

## 4. Setup Server

### Step 1: Install Docker di Server

#### Ubuntu/Debian
```bash
# Update packages
sudo apt-get update

# Install dependencies
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify
sudo docker --version
sudo docker compose version
```

#### CentOS/RHEL
```bash
# Install dependencies
sudo yum install -y yum-utils

# Add repository
sudo yum-config-manager --add-repo \
  https://download.docker.com/linux/centos/docker-ce.repo

# Install Docker
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Start & enable
sudo systemctl start docker
sudo systemctl enable docker

# Verify
sudo docker --version
```

### Step 2: Setup User Permissions
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout & login kembali
# atau
newgrp docker

# Test tanpa sudo
docker ps
```

### Step 3: Prepare Deployment Directory
```bash
# Create directory
sudo mkdir -p /opt/nxt-1-astro
sudo chown $USER:$USER /opt/nxt-1-astro
cd /opt/nxt-1-astro

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: nexoraprod/nxt-1-astro:latest
    container_name: nxt-1-astro
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF
```

### Step 4: Setup Firewall
```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

---

## 5. GitHub Actions CI/CD

### Step 1: Setup GitHub Secrets

Di repository GitHub:
```
Settings → Secrets and variables → Actions → New repository secret
```

Tambahkan secrets berikut:

| Secret Name | Value |
|-------------|-------|
| `DOCKERHUB_USERNAME` | Username Docker Hub Anda |
| `DOCKERHUB_TOKEN` | Access Token Docker Hub |
| `SERVER_HOST` | IP/Domain server (contoh: `123.45.67.89`) |
| `SERVER_USERNAME` | Username SSH (contoh: `root` atau `ubuntu`) |
| `SERVER_SSH_KEY` | Private SSH key (lihat cara generate di bawah) |
| `SERVER_PATH` | Path deployment (contoh: `/opt/nxt-1-astro`) |

#### Generate SSH Key
```bash
# Di local machine
ssh-keygen -t ed25519 -C "github-actions"

# Copy public key ke server
ssh-copy-id -i ~/.ssh/id_ed25519.pub USERNAME@SERVER_IP

# Copy private key ke GitHub secret
cat ~/.ssh/id_ed25519
# Copy seluruh output ke SERVER_SSH_KEY secret
```

### Step 2: GitHub Actions Workflow

File `.github/workflows/deploy.yml` sudah dibuat dengan fitur:

✅ Auto build & push Docker image  
✅ Auto deploy ke server via SSH  
✅ Health check setelah deploy  
✅ Rollback jika gagal  
✅ Slack notification (optional)  
✅ Caching untuk speed up build  

### Step 3: Trigger Deployment

```bash
# Push ke main branch akan auto trigger deployment
git add .
git commit -m "feat: update content"
git push origin main

# Atau manual trigger
# GitHub → Actions → Deploy → Run workflow
```

---

## 6. Manual Deployment

Jika ingin deploy manual tanpa GitHub Actions:

### Step 1: Build Image di Local
```bash
# Clone repository
git clone https://github.com/nexoraprod/nxt-1-astro.git
cd nxt-1-astro

# Build Docker image
docker build -t nxt-1-astro:latest .
```

### Step 2: Push ke Registry
```bash
# Tag image
docker tag nxt-1-astro:latest nexoraprod/nxt-1-astro:latest

# Push
docker push nexoraprod/nxt-1-astro:latest
```

### Step 3: Deploy di Server
```bash
# SSH ke server
ssh USERNAME@SERVER_IP

# Pull latest image
cd /opt/nxt-1-astro
docker-compose pull

# Restart container
docker-compose down
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Step 4: Verify Deployment
```bash
# Check container status
docker-compose ps

# Check health
curl http://SERVER_IP/health

# Check logs
docker-compose logs --tail=50
```

---

## 7. Auto Deployment

### Option A: GitHub Actions (Recommended)

Sudah dikonfigurasi di `.github/workflows/deploy.yml`

Setiap push ke `main` branch akan:
1. Build Docker image
2. Push ke Docker Hub
3. SSH ke server
4. Pull & restart container
5. Health check
6. Notify jika gagal

### Option B: Webhook Auto Deploy

#### 1. Setup Webhook Server di Server
```bash
# Install webhook receiver
sudo apt-get install -y webhook

# Create webhook config
sudo mkdir -p /etc/webhook
cat > /etc/webhook/hooks.json << 'EOF'
[
  {
    "id": "deploy-nxt-1-astro",
    "execute-command": "/opt/nxt-1-astro/deploy.sh",
    "command-working-directory": "/opt/nxt-1-astro",
    "pass-environment-to-command": [
      {
        "envname": "GITHUB_REF",
        "source": "header",
        "name": "X-GitHub-Ref"
      }
    ]
  }
]
EOF

# Create deploy script
cat > /opt/nxt-1-astro/deploy.sh << 'EOF'
#!/bin/bash
cd /opt/nxt-1-astro
docker-compose pull
docker-compose down
docker-compose up -d
echo "Deployment completed at $(date)" >> /var/log/deploy.log
EOF

chmod +x /opt/nxt-1-astro/deploy.sh

# Start webhook service
sudo systemctl enable webhook
sudo systemctl start webhook
```

#### 2. Setup GitHub Webhook
```bash
# GitHub → Settings → Webhooks → Add webhook
# Payload URL: http://SERVER_IP:9000/hooks/deploy-nxt-1-astro
# Content type: application/json
# Secret: YOUR_SECRET
# Events: Just the push event
# Active: ✓
```

### Option C: Cron Job Auto Update

```bash
# Di server, edit crontab
crontab -e

# Auto update setiap hari jam 2 pagi
0 2 * * * cd /opt/nxt-1-astro && docker-compose pull && docker-compose up -d --force-recreate >> /var/log/auto-deploy.log 2>&1
```

---

## 8. Monitoring & Maintenance

### Monitoring Container
```bash
# Check status
docker-compose ps

# Check logs
docker-compose logs -f

# Check resource usage
docker stats nxt-1-astro

# Check health
curl http://SERVER_IP/health
```

### Backup
```bash
# Backup container data
docker exec nxt-1-astro tar czf /backup/app-$(date +%Y%m%d).tar.gz /app/data

# Backup ke remote
scp /backup/app-*.tar.gz user@backup-server:/backups/
```

### Update & Rollback
```bash
# Update ke version terbaru
docker-compose pull
docker-compose up -d

# Rollback ke version sebelumnya
docker-compose down
docker tag nexoraprod/nxt-1-astro:v1.0.0 nexoraprod/nxt-1-astro:latest
docker-compose up -d
```

### Cleanup
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Full cleanup
docker system prune -a --volumes
```

---

## 9. Troubleshooting

### Problem: Container tidak start
```bash
# Check logs
docker-compose logs

# Check container status
docker inspect nxt-1-astro

# Restart container
docker-compose restart
```

### Problem: Port sudah terpakai
```bash
# Check port usage
sudo lsof -i :80

# Kill process
sudo kill -9 PID

# Atau change port di docker-compose.yml
ports:
  - "8080:80"
```

### Problem: Cannot pull image
```bash
# Login ke Docker Hub
docker login

# Check image name
docker images | grep nxt-1-astro

# Pull manual
docker pull nexoraprod/nxt-1-astro:latest
```

### Problem: SSH connection failed
```bash
# Test SSH connection
ssh -v USERNAME@SERVER_IP

# Check SSH key permissions
chmod 600 ~/.ssh/id_ed25519

# Check GitHub secret (harus include newlines)
```

### Problem: Health check failed
```bash
# Check nginx config
docker exec nxt-1-astro cat /etc/nginx/conf.d/default.conf

# Test from inside container
docker exec -it nxt-1-astro wget -O- http://localhost/health

# Check firewall
sudo ufw status
```

### Problem: Out of memory
```bash
# Check memory usage
docker stats

# Limit memory di docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] GitHub repository sudah dibuat
- [ ] Docker Hub account sudah siap
- [ ] Server sudah install Docker
- [ ] SSH access sudah dikonfigurasi
- [ ] GitHub secrets sudah diisi
- [ ] Firewall sudah allow port 80/443

### Deployment
- [ ] Code sudah push ke main branch
- [ ] GitHub Actions workflow berjalan
- [ ] Docker image berhasil build
- [ ] Image berhasil push ke registry
- [ ] Container berhasil deploy di server
- [ ] Health check passed

### Post-Deployment
- [ ] Website accessible di browser
- [ ] SSL certificate valid (jika pakai HTTPS)
- [ ] Monitoring sudah setup
- [ ] Backup strategy sudah ada
- [ ] Documentation sudah update

---

## 🎯 Quick Start Commands

```bash
# 1. Clone repository
git clone https://github.com/nexoraprod/nxt-1-astro.git
cd nxt-1-astro

# 2. Build & test local
docker build -t nxt-1-astro:latest .
docker run -d -p 80:80 nxt-1-astro:latest

# 3. Push ke Docker Hub
docker tag nxt-1-astro:latest nexoraprod/nxt-1-astro:latest
docker push nexoraprod/nxt-1-astro:latest

# 4. Deploy ke server
ssh USERNAME@SERVER_IP
cd /opt/nxt-1-astro
docker-compose pull
docker-compose up -d

# 5. Verify
curl http://SERVER_IP/health
```

---

## 📞 Support

Jika ada masalah:
1. Check logs: `docker-compose logs`
2. Check GitHub Actions: Repository → Actions
3. Check troubleshooting section di atas
4. Buka issue di GitHub

---

<div align="center">

**Happy Deploying! 🚀**

</div>
