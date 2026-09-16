# 🚀 Deploy Lokal - NXT-1 Astro

Panduan lengkap untuk deploy website nxt-1 astro secara lokal dengan monitoring stack.

**Last Updated:** 2026-09-16  
**Version:** 1.5.0

---

## 📋 Daftar Isi

1. [Prerequisites](#-prerequisites)
2. [Quick Deploy](#-quick-deploy-recommended)
3. [Deploy dengan Monitoring Stack](#-deploy-dengan-monitoring-stack)
4. [Local Development](#-local-development)
5. [Docker Commands](#-docker-commands)
6. [Monitoring Stack Details](#-monitoring-stack-details)
7. [Landing Page](#-landing-page)
8. [Configuration](#-configuration)
9. [Troubleshooting](#-troubleshooting)
10. [Performance Tips](#-performance-tips)
11. [Update & Maintenance](#-update--maintenance)

---

## 📋 Prerequisites

### Hardware Requirements
- **CPU**: 4+ cores (8+ recommended)
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 10GB+ free space
- **GPU**: Optional (untuk model inference)

### Software Requirements
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Node.js**: 18+ (optional, untuk development)
- **Git**: Latest version
- **Python**: 3.8+ (untuk script helper)

### Check Prerequisites

```bash
# Check Docker
docker --version
docker-compose --version

# Check Node.js (optional)
node --version
npm --version

# Check Python (optional)
python3 --version
```

---

## 🎯 Quick Deploy (Recommended)

### Option 1: One-Command Deploy

```bash
# Clone repository
git clone https://github.com/nexoraprod/nxt-1-astro.git
cd nxt-1-astro

# Make scripts executable
chmod +x scripts/*.sh

# Run quick deploy
./scripts/quick-deploy.sh
```

Script akan memberikan 4 pilihan:
1. **Website Only** - Hanya website tanpa monitoring
2. **Website + Monitoring** - Website dengan full monitoring stack (recommended)
3. **Full Production** - Website + Monitoring + Redis
4. **Local Development** - Development mode dengan hot reload

### Option 2: Manual Quick Deploy

```bash
# Clone repository
git clone https://github.com/nexoraprod/nxt-1-astro.git
cd nxt-1-astro

# Deploy website only
docker-compose -f docker-compose.prod.yml up -d

# Access website
open http://localhost
```

---

## 🔭 Deploy dengan Monitoring Stack

### Step 1: Setup Monitoring Configuration

```bash
# Setup monitoring stack
chmod +x scripts/setup-monitoring.sh
./scripts/setup-monitoring.sh
```

### Step 2: Start All Services

```bash
# Start full stack
docker-compose -f docker-compose.full.yml up -d
```

### Step 3: Access Services

| Service | URL | Credentials |
|---------|-----|-------------|
| **Website** | http://localhost | - |
| **Grafana** | http://localhost:3001 | admin / admin |
| **Prometheus** | http://localhost:9090 | - |
| **Loki** | http://localhost:3100 | - |
| **Jaeger** | http://localhost:16686 | - |
| **Node Exporter** | http://localhost:9100 | - |
| **cAdvisor** | http://localhost:8080 | - |

### Step 4: Verify Services

```bash
# Check all containers running
docker ps

# Test Grafana
curl http://localhost:3001/api/health

# Test Prometheus
curl http://localhost:9090/-/ready

# Test Loki
curl http://localhost:3100/ready
```

---

## 💻 Local Development

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Website akan berjalan di http://localhost:3002 dengan hot reload.

### Step 3: Edit Files

Edit files di folder `src/` dan perubahan akan otomatis ter-reload.

### Step 4: Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`.

---

## 🐳 Docker Commands

### Basic Commands

```bash
# Start all services
docker-compose -f docker-compose.full.yml up -d

# Stop all services
docker-compose -f docker-compose.full.yml down

# View logs
docker-compose -f docker-compose.full.yml logs -f

# Restart services
docker-compose -f docker-compose.full.yml restart

# Update images
docker-compose -f docker-compose.full.yml pull
docker-compose -f docker-compose.full.yml up -d
```

### Service-Specific Commands

```bash
# Start only website
docker-compose -f docker-compose.prod.yml up -d app

# Start only monitoring
docker-compose -f docker-compose.full.yml up -d prometheus grafana loki jaeger

# View specific service logs
docker logs -f nxt-1-astro-app
docker logs -f nxt-1-astro-grafana
docker logs -f nxt-1-astro-loki
```

### Cleanup Commands

```bash
# Stop and remove containers
docker-compose -f docker-compose.full.yml down

# Stop, remove containers and volumes
docker-compose -f docker-compose.full.yml down -v

# Remove all unused images
docker image prune -a

# Full cleanup
docker system prune -a --volumes
```

### Check Status

```bash
# List all containers
docker ps -a

# Check resource usage
docker stats

# Check port mappings
docker ps --format "table {{.Names}}\t{{.Ports}}"
```

---

## 📊 Monitoring Stack Details

### Prometheus
- **Port**: 9090
- **Purpose**: Metrics collection
- **Scrape Interval**: 15s
- **Retention**: 30 days
- **Access**: http://localhost:9090

### Grafana
- **Port**: 3001 (changed from 3000 to avoid conflicts)
- **Purpose**: Visualization & dashboards
- **Default Login**: admin / admin
- **Data Sources**: Prometheus, Loki, Jaeger
- **Access**: http://localhost:3001

**Change Grafana Password:**
```bash
# Via CLI
docker exec -it nxt-1-astro-grafana grafana-cli admin reset-admin-password newpassword

# Or via UI
# Login → Profile icon → Change Password
```

### Loki
- **Port**: 3100
- **Purpose**: Log aggregation
- **Version**: 2.9.0 (specific version for stability)
- **Storage**: Filesystem
- **Retention**: Configurable
- **Access**: http://localhost:3100

**Important:** Loki menggunakan versi spesifik `grafana/loki:2.9.0` untuk menghindari masalah kompatibilitas.

### Jaeger
- **Port**: 16686 (UI), 14268 (collector)
- **Purpose**: Distributed tracing
- **Storage**: In-memory (default)
- **Access**: http://localhost:16686

### Node Exporter
- **Port**: 9100
- **Purpose**: System metrics
- **Metrics**: CPU, memory, disk, network
- **Access**: http://localhost:9100

### cAdvisor
- **Port**: 8080
- **Purpose**: Container metrics
- **Metrics**: Container resource usage
- **Access**: http://localhost:8080

---

## 🌐 Landing Page

Website ini juga memiliki landing page yang bisa diakses terpisah.

### Run Landing Page Server

```bash
# Run landing page server
python3 serve-landing.py
```

Browser akan otomatis terbuka di http://localhost:8080

### Deploy Landing Page

**Option 1: GitHub Pages**
```bash
git checkout -b gh-pages
git add index.html
git commit -m "Add landing page"
git push origin gh-pages
```

**Option 2: Netlify/Vercel**
```bash
# Drag & drop index.html ke Netlify/Vercel
# Atau connect GitHub repo
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
# Application
NODE_ENV=production
TZ=Asia/Jakarta

# Grafana
GF_SECURITY_ADMIN_PASSWORD=your_password

# Redis (if using full stack)
REDIS_PASSWORD=your_redis_password
```

### Custom Ports

Edit `docker-compose.full.yml` untuk mengubah ports:

```yaml
services:
  app:
    ports:
      - "8080:80"  # Change 8080 to your preferred port
  
  grafana:
    ports:
      - "3001:3000"  # Change 3001 to your preferred port
```

### Port Mapping Summary

| Service | Host Port | Container Port |
|---------|-----------|----------------|
| Website | 80 | 80 |
| Grafana | 3001 | 3000 |
| Prometheus | 9090 | 9090 |
| Loki | 3100 | 3100 |
| Jaeger | 16686 | 16686 |
| Node Exporter | 9100 | 9100 |
| cAdvisor | 8080 | 8080 |
| Redis | 6379 | 6379 |
| App Dev | 3002 | 3000 |

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Loki Not Running / Continuously Restarting

**Symptoms:**
```bash
docker ps | grep loki
# Status: Restarting
```

**Solution:**
```bash
# Stop and remove container
docker stop nxt-1-astro-loki
docker rm -f nxt-1-astro-loki

# Remove volume
docker volume rm nxt-1-astro_loki-data

# Pull correct version
docker pull grafana/loki:2.9.0

# Restart
docker-compose -f docker-compose.full.yml up -d loki

# Wait and verify
sleep 30
curl http://localhost:3100/ready
```

**More Info:** See [LOKI_TROUBLESHOOTING.md](./LOKI_TROUBLESHOOTING.md)

#### 2. Port Already in Use

**Symptoms:**
```
Error: Bind for 0.0.0.0:3000 failed: port is already allocated
```

**Solution:**
```bash
# Check what's using the port
sudo lsof -i :3000

# Stop conflicting service
sudo systemctl stop <service-name>

# Or change port in docker-compose.yml
# Edit docker-compose.full.yml and change port mapping
```

**More Info:** See [PORT_CONFLICT_TROUBLESHOOTING.md](./PORT_CONFLICT_TROUBLESHOOTING.md)

#### 3. Docker Build Failed

**Symptoms:**
```
ERROR: npm ci failed
```

**Solution:**
```bash
# Generate package-lock.json
npm install

# Rebuild
docker build -t nexoraprod/nxt-1-astro:latest .
```

#### 4. Grafana Login Failed

**Symptoms:**
```
Invalid username or password
```

**Solution:**
```bash
# Reset password
docker exec -it nxt-1-astro-grafana grafana-cli admin reset-admin-password admin

# Restart Grafana
docker-compose -f docker-compose.full.yml restart grafana
```

#### 5. Services Not Starting

**Solution:**
```bash
# Check logs
docker-compose -f docker-compose.full.yml logs

# Check service status
docker-compose -f docker-compose.full.yml ps

# Restart specific service
docker-compose -f docker-compose.full.yml restart <service_name>
```

### Quick Fix Commands

```bash
# Reset Loki
docker stop nxt-1-astro-loki && \
docker rm -f nxt-1-astro-loki && \
docker volume rm nxt-1-astro_loki-data && \
docker-compose -f docker-compose.full.yml up -d loki

# Reset Grafana password
docker exec -it nxt-1-astro-grafana grafana-cli admin reset-admin-password admin

# Reset all monitoring
docker-compose -f docker-compose.full.yml down
docker volume rm nxt-1-astro_prometheus-data nxt-1-astro_grafana-data nxt-1-astro_loki-data
docker-compose -f docker-compose.full.yml up -d
```

### Troubleshooting Scripts

```bash
# Fix port conflicts
./scripts/fix-port-conflict.sh

# Fix Loki issues
./scripts/troubleshoot-loki.sh

# Fix GitHub API issues
./scripts/fix-github-api.sh
```

---

## 📈 Performance Tips

### Optimize Docker

```bash
# Limit resources for containers
docker update --cpus=2 --memory=512m nxt-1-astro-app

# Enable Docker buildkit
export DOCKER_BUILDKIT=1
```

### Optimize Monitoring

```bash
# Reduce Prometheus scrape interval
# Edit monitoring/prometheus.yml
scrape_interval: 30s  # Instead of 15s

# Reduce Loki retention
# Edit monitoring/loki.yml
retention_period: 168h  # 7 days instead of unlimited
```

### Monitor Resource Usage

```bash
# Check Docker resource usage
docker stats

# Check system resources
htop

# Check disk usage
df -h
```

---

## 🔄 Update & Maintenance

### Update Website

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.full.yml build
docker-compose -f docker-compose.full.yml up -d
```

### Backup Data

```bash
# Backup Grafana dashboards
docker exec nxt-1-astro-grafana tar czf /tmp/grafana-backup.tar.gz /var/lib/grafana
docker cp nxt-1-astro-grafana:/tmp/grafana-backup.tar.gz ./backups/

# Backup Prometheus data
docker exec nxt-1-astro-prometheus tar czf /tmp/prometheus-backup.tar.gz /prometheus
docker cp nxt-1-astro-prometheus:/tmp/prometheus-backup.tar.gz ./backups/
```

### Restore Data

```bash
# Restore Grafana
docker cp ./backups/grafana-backup.tar.gz nxt-1-astro-grafana:/tmp/
docker exec nxt-1-astro-grafana tar xzf /tmp/grafana-backup.tar.gz -C /

# Restart Grafana
docker-compose -f docker-compose.full.yml restart grafana
```

### Cleanup Old Data

```bash
# Remove old Docker images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Full cleanup
docker system prune -a --volumes
```

---

## 📞 Support

Jika ada masalah:

1. **Check logs**: `docker-compose -f docker-compose.full.yml logs`
2. **Check troubleshooting guides**:
   - [LOKI_TROUBLESHOOTING.md](./LOKI_TROUBLESHOOTING.md)
   - [PORT_CONFLICT_TROUBLESHOOTING.md](./PORT_CONFLICT_TROUBLESHOOTING.md)
   - [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
   - [QUICK_FIX.md](./QUICK_FIX.md)
3. **Use helper scripts**:
   - `./scripts/fix-port-conflict.sh`
   - `./scripts/troubleshoot-loki.sh`
4. **Create issue**: https://github.com/nexoraprod/nxt-1-astro/issues

---

## 📚 Additional Documentation

- **[README.md](./README.md)** - Project overview
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[DOCKER_HUB_GUIDE.md](./DOCKER_HUB_GUIDE.md)** - Docker Hub publishing
- **[GITHUB_ACTIONS_CONFIG.md](./GITHUB_ACTIONS_CONFIG.md)** - CI/CD configuration
- **[LOKI_TROUBLESHOOTING.md](./LOKI_TROUBLESHOOTING.md)** - Loki troubleshooting
- **[PORT_CONFLICT_TROUBLESHOOTING.md](./PORT_CONFLICT_TROUBLESHOOTING.md)** - Port conflict solutions

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] Ports available (80, 3001, 3100, 9090, etc.)
- [ ] Sufficient disk space (10GB+)
- [ ] Sufficient RAM (8GB+)

### Deployment
- [ ] Repository cloned
- [ ] Scripts made executable
- [ ] Services started
- [ ] All containers running
- [ ] Health checks passing

### Post-Deployment
- [ ] Website accessible at http://localhost
- [ ] Grafana accessible at http://localhost:3001
- [ ] All monitoring services running
- [ ] Logs being collected
- [ ] Metrics being scraped

---

<div align="center">

**Happy Deploying! 🚀**

Made with ❤️ for the AI community

</div>
