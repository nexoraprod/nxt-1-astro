# 🚀 Deploy Lokal - NXT-1 Astro

Panduan lengkap untuk deploy website nxt-1 astro secara lokal dengan monitoring stack.

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

---

## 🎯 Quick Deploy (Recommended)

### Option 1: One-Command Deploy

```bash
# Clone repository
git clone https://github.com/1astro/nxt-1-astro.git
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
| **Grafana** | http://localhost:3000 | admin / admin |
| **Prometheus** | http://localhost:9090 | - |
| **Loki** | http://localhost:3100 | - |
| **Jaeger** | http://localhost:16686 | - |
| **Node Exporter** | http://localhost:9100 | - |
| **cAdvisor** | http://localhost:8080 | - |

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

Website akan berjalan di http://localhost:3000 dengan hot reload.

### Step 3: Edit Files

Edit files di folder `src/` dan perubahan akan otomatis ter-reload.

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
docker logs -f nxt-1-astro-prometheus
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

---

## 📊 Monitoring Stack Details

### Prometheus
- **Port**: 9090
- **Purpose**: Metrics collection
- **Scrape Interval**: 15s
- **Retention**: 30 days

### Grafana
- **Port**: 3000
- **Purpose**: Visualization & dashboards
- **Default Login**: admin / admin
- **Data Sources**: Prometheus, Loki, Jaeger

### Loki
- **Port**: 3100
- **Purpose**: Log aggregation
- **Storage**: Filesystem
- **Retention**: Configurable

### Jaeger
- **Port**: 16686 (UI), 14268 (collector)
- **Purpose**: Distributed tracing
- **Storage**: In-memory (default)

### Node Exporter
- **Port**: 9100
- **Purpose**: System metrics
- **Metrics**: CPU, memory, disk, network

### cAdvisor
- **Port**: 8080
- **Purpose**: Container metrics
- **Metrics**: Container resource usage

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

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or change port in docker-compose.yml
```

### Docker Build Failed

```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose -f docker-compose.full.yml build --no-cache
```

### Services Not Starting

```bash
# Check logs
docker-compose -f docker-compose.full.yml logs

# Check service status
docker-compose -f docker-compose.full.yml ps

# Restart specific service
docker-compose -f docker-compose.full.yml restart <service_name>
```

### Grafana Not Accessible

```bash
# Check if Grafana is running
docker ps | grep grafana

# Check Grafana logs
docker logs nxt-1-astro-grafana

# Reset Grafana password
docker exec -it nxt-1-astro-grafana grafana-cli admin reset-admin-password newpassword
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

---

## 📞 Support

Jika ada masalah:
1. Check logs: `docker-compose -f docker-compose.full.yml logs`
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap
3. Buka issue di GitHub: https://github.com/1astro/nxt-1-astro/issues

---

<div align="center">

**Happy Deploying! 🚀**

</div>
