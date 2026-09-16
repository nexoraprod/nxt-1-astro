# 🚀 Quick Start: Deploy dari GitHub

Panduan cepat untuk deploy **nxt-1 astro** dari GitHub repository ke server production.

---

## ⚡ 5 Menit Setup

### Step 1: Fork & Clone Repository

```bash
# Fork repository ini di GitHub, lalu clone
git clone https://github.com/1astro/nxt-1-astro.git
cd nxt-1-astro
```

### Step 2: Push ke Docker Hub

```bash
# Login ke Docker Hub
docker login

# Build image
docker build -t 1astro/nxt-1-astro:latest .

# Push ke Docker Hub
docker push 1astro/nxt-1-astro:latest
```

### Step 3: Setup Server

```bash
# SSH ke server Anda
ssh root@YOUR_SERVER_IP

# Download dan jalankan setup script
curl -O https://raw.githubusercontent.com/1astro/nxt-1-astro/main/scripts/setup-server.sh
chmod +x setup-server.sh
sudo ./setup-server.sh
```

### Step 4: Deploy Application

```bash
# Di server, navigate ke deploy directory
cd /opt/nxt-1-astro

# Pull dan run container
docker pull 1astro/nxt-1-astro:latest
docker run -d -p 80:80 --name nxt-1-astro 1astro/nxt-1-astro:latest
```

### Step 5: Verify

```bash
# Check container status
docker ps

# Test health endpoint
curl http://localhost/health

# Open in browser
# http://YOUR_SERVER_IP
```

---

## 🔄 Auto Deploy dengan GitHub Actions

### Setup GitHub Secrets

Di repository GitHub Anda:
```
Settings → Secrets and variables → Actions → New repository secret
```

Tambahkan secrets:

| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | Username Docker Hub Anda |
| `DOCKERHUB_TOKEN` | Access Token dari Docker Hub |
| `SERVER_HOST` | IP address server (contoh: `123.45.67.89`) |
| `SERVER_USERNAME` | Username SSH (contoh: `deploy` atau `root`) |
| `SERVER_SSH_KEY` | Private SSH key (lihat cara di bawah) |
| `SERVER_PATH` | `/opt/nxt-1-astro` |

### Generate SSH Key

```bash
# Di local machine
ssh-keygen -t ed25519 -C "github-actions"

# Copy public key ke server
ssh-copy-id -i ~/.ssh/id_ed25519.pub YOUR_USERNAME@YOUR_SERVER_IP

# Copy private key ke GitHub secret
cat ~/.ssh/id_ed25519
# Copy seluruh output (termasuk BEGIN dan END) ke SERVER_SSH_KEY
```

### Trigger Deployment

```bash
# Setiap push ke main branch akan auto deploy
git add .
git commit -m "feat: update content"
git push origin main

# GitHub Actions akan otomatis:
# 1. Build Docker image
# 2. Push ke Docker Hub
# 3. SSH ke server
# 4. Pull & restart container
# 5. Health check
```

---

## 📋 Checklist Deployment

### Pre-Deployment
- [ ] Fork repository ke GitHub account Anda
- [ ] Buat account Docker Hub
- [ ] Siapkan VPS/server (Ubuntu 20.04+ recommended)
- [ ] Pastikan server bisa diakses via SSH

### Setup
- [ ] Push Docker image ke Docker Hub
- [ ] Jalankan setup script di server
- [ ] Tambahkan GitHub secrets
- [ ] Test SSH connection dari GitHub Actions

### Deployment
- [ ] Push code ke main branch
- [ ] Monitor GitHub Actions workflow
- [ ] Verify website accessible
- [ ] Check health endpoint

---

## 🛠️ Troubleshooting

### Problem: SSH Connection Failed
```bash
# Test SSH connection manual
ssh -v YOUR_USERNAME@YOUR_SERVER_IP

# Check SSH key permissions
chmod 600 ~/.ssh/id_ed25519

# Pastikan private key di GitHub secret include newlines
```

### Problem: Docker Pull Failed
```bash
# Login ke Docker Hub di server
docker login

# Check image name
docker pull 1astro/nxt-1-astro:latest
```

### Problem: Port Already in Use
```bash
# Check what's using port 80
sudo lsof -i :80

# Stop conflicting service
sudo systemctl stop nginx  # atau service lain

# Atau change port di docker run
docker run -d -p 8080:80 --name nxt-1-astro YOUR_IMAGE
```

---

## 📊 Monitoring

### Check Logs
```bash
# Container logs
docker logs -f nxt-1-astro

# GitHub Actions logs
# GitHub → Actions → Select workflow run
```

### Health Check
```bash
# From server
curl http://localhost/health

# From outside
curl http://YOUR_SERVER_IP/health
```

### Resource Usage
```bash
# Docker stats
docker stats nxt-1-astro

# System resources
htop
```

---

## 🔄 Update & Rollback

### Update ke Version Terbaru
```bash
# Di server
cd /opt/nxt-1-astro
docker pull 1astro/nxt-1-astro:latest
docker stop nxt-1-astro
docker rm nxt-1-astro
docker run -d -p 80:80 --name nxt-1-astro 1astro/nxt-1-astro:latest
```

### Rollback ke Version Sebelumnya
```bash
# Tag version sebelumnya
docker tag 1astro/nxt-1-astro:v1.0.0 1astro/nxt-1-astro:latest

# Redeploy
docker stop nxt-1-astro
docker rm nxt-1-astro
docker run -d -p 80:80 --name nxt-1-astro 1astro/nxt-1-astro:latest
```

---

## 🎯 Commands Cepat

```bash
# Deploy manual
ssh YOUR_SERVER_IP "cd /opt/nxt-1-astro && docker-compose pull && docker-compose up -d"

# Check status
ssh YOUR_SERVER_IP "docker ps | grep nxt-1-astro"

# View logs
ssh YOUR_SERVER_IP "docker logs --tail 50 nxt-1-astro"

# Restart container
ssh YOUR_SERVER_IP "docker restart nxt-1-astro"

# Stop container
ssh YOUR_SERVER_IP "docker stop nxt-1-astro"

# Remove container
ssh YOUR_SERVER_IP "docker rm -f nxt-1-astro"
```

---

## 📞 Support

Jika ada masalah:
1. Check GitHub Actions logs
2. Check container logs: `docker logs nxt-1-astro`
3. Check DEPLOYMENT.md untuk panduan lengkap
4. Buka issue di GitHub

---

<div align="center">

**Happy Deploying! 🚀**

</div>
