# 🔧 Loki Troubleshooting Guide

Panduan lengkap untuk menyelesaikan masalah Loki yang tidak berjalan.

---

## ❌ Masalah Umum Loki

### 1. Loki Not Running

**Gejala:**
```bash
docker ps | grep loki
# Tidak ada output
```

**Penyebab:**
- Container belum dibuat
- Container crash saat start
- Configuration error
- Volume permission issues

**Solusi:**

#### Option 1: Gunakan Script Otomatis
```bash
chmod +x scripts/fix-loki.sh
./scripts/fix-loki.sh
```

#### Option 2: Manual Fix
```bash
# Check container status
docker ps -a | grep loki

# View logs
docker logs nxt-1-astro-loki

# Restart Loki
docker-compose -f docker-compose.full.yml restart loki

# Recreate container
docker-compose -f docker-compose.full.yml up -d --force-recreate loki
```

---

### 2. Loki Configuration Error

**Gejala:**
```
level=error ts=... msg="error parsing config" err="yaml: unmarshal errors..."
```

**Penyebab:**
- File `monitoring/loki.yml` tidak valid
- Schema version tidak kompatibel
- Storage configuration salah

**Solusi:**

#### Check Configuration
```bash
# Validate YAML
yamllint monitoring/loki.yml

# Or use Python
python3 -c "import yaml; yaml.safe_load(open('monitoring/loki.yml'))"
```

#### Fix Configuration
File `monitoring/loki.yml` sudah diupdate ke format modern:
- Schema v13 (latest)
- TSDB storage (bukan boltdb-shipper)
- Embedded cache enabled
- Analytics disabled

#### Recreate with New Config
```bash
# Stop Loki
docker-compose -f docker-compose.full.yml stop loki

# Remove container
docker-compose -f docker-compose.full.yml rm -f loki

# Start again
docker-compose -f docker-compose.full.yml up -d loki
```

---

### 3. Loki Volume Permission Issues

**Gejala:**
```
level=error ts=... msg="unable to create directory" dir=/loki/... err="permission denied"
```

**Penyebab:**
- Volume owned by root
- Loki container user tidak punya access

**Solusi:**

#### Fix Permissions
```bash
# Stop Loki
docker-compose -f docker-compose.full.yml stop loki

# Fix permissions
docker run --rm -v loki-data:/loki alpine sh -c "chown -R 10001:10001 /loki"

# Start Loki
docker-compose -f docker-compose.full.yml start loki
```

#### Alternative: Run as Root
File `docker-compose.full.yml` sudah diupdate dengan `user: root` untuk menghindari permission issues.

---

### 4. Loki Port Already in Use

**Gejala:**
```
Error starting userland proxy: listen tcp4 0.0.0.0:3100: bind: address already in use
```

**Penyebab:**
- Port 3100 sudah digunakan service lain
- Container lain menggunakan port yang sama

**Solusi:**

#### Check Port Usage
```bash
# Linux
sudo lsof -i :3100
sudo netstat -tuln | grep 3100

# Mac
lsof -i :3100
```

#### Stop Conflicting Service
```bash
# Stop service using port 3100
sudo systemctl stop <service-name>

# Or kill process
sudo kill -9 <PID>
```

#### Use Different Port
Edit `docker-compose.full.yml`:
```yaml
loki:
  ports:
    - "3101:3100"  # Change 3101 to available port
```

Update Promtail config (`monitoring/promtail.yml`):
```yaml
clients:
  - url: http://loki:3100/loki/api/v1/push  # Keep internal port
```

---

### 5. Loki Not Ready

**Gejala:**
```bash
curl http://localhost:3100/ready
# Returns: "Service not ready"
```

**Penyebab:**
- Loki masih starting up
- Storage initialization lambat
- Configuration error

**Solusi:**

#### Wait and Retry
```bash
# Wait 30 seconds
sleep 30

# Check again
curl http://localhost:3100/ready
```

#### Check Logs
```bash
docker logs -f nxt-1-astro-loki
```

#### Restart Loki
```bash
docker-compose -f docker-compose.full.yml restart loki
```

---

### 6. Promtail Cannot Connect to Loki

**Gejala:**
```
level=error ts=... msg="error sending batch" err="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki: no such host"
```

**Penyebab:**
- Loki container tidak running
- Network issue
- Container name salah

**Solusi:**

#### Check Loki Status
```bash
docker ps | grep loki
```

#### Check Network
```bash
# Check if containers are in same network
docker network inspect nxt1-network | grep -E "(loki|promtail)"
```

#### Restart Both Services
```bash
docker-compose -f docker-compose.full.yml restart loki promtail
```

---

## 🛠️ Quick Fix Commands

### Complete Reset
```bash
# Stop all monitoring services
docker-compose -f docker-compose.full.yml stop loki promtail

# Remove containers
docker-compose -f docker-compose.full.yml rm -f loki promtail

# Delete volume (WARNING: deletes all logs)
docker volume rm loki-data

# Recreate
docker-compose -f docker-compose.full.yml up -d loki promtail
```

### View Logs
```bash
# Last 100 lines
docker logs --tail 100 nxt-1-astro-loki

# Follow logs
docker logs -f nxt-1-astro-loki

# Since timestamp
docker logs --since 2024-01-01T00:00:00 nxt-1-astro-loki
```

### Check Health
```bash
# Ready check
curl http://localhost:3100/ready

# Metrics
curl http://localhost:3100/metrics

# Labels
curl http://localhost:3100/loki/api/v1/labels

# Query
curl -G -s "http://localhost:3100/loki/api/v1/query" --data-urlencode 'query={job="docker"}'
```

---

## 📋 Checklist Troubleshooting

### Sebelum Troubleshooting
- [ ] Docker running
- [ ] docker-compose.full.yml exists
- [ ] monitoring/loki.yml exists
- [ ] Port 3100 available
- [ ] Disk space available

### Saat Troubleshooting
- [ ] Check container status: `docker ps -a | grep loki`
- [ ] Check logs: `docker logs nxt-1-astro-loki`
- [ ] Check health: `curl http://localhost:3100/ready`
- [ ] Check port: `sudo lsof -i :3100`
- [ ] Check volume: `docker volume ls | grep loki`

### Setelah Fix
- [ ] Loki running: `docker ps | grep loki`
- [ ] Loki ready: `curl http://localhost:3100/ready`
- [ ] Promtail connected: `docker logs nxt-1-astro-promtail`
- [ ] Grafana can query: Check Grafana → Explore → Loki

---

## 🔍 Debug Commands

```bash
# Inspect container
docker inspect nxt-1-astro-loki

# Execute command in container
docker exec -it nxt-1-astro-loki /bin/sh

# Check container logs with timestamps
docker logs --timestamps nxt-1-astro-loki

# Check resource usage
docker stats nxt-1-astro-loki

# Check network
docker network inspect nxt1-network
```

---

## 🎯 Common Solutions

### Solution 1: Update Configuration
File `monitoring/loki.yml` sudah diupdate ke format modern dengan:
- Schema v13 (latest stable)
- TSDB storage engine
- Embedded cache
- Proper ring configuration

### Solution 2: Fix Permissions
```bash
docker run --rm -v loki-data:/loki alpine sh -c "chown -R 10001:10001 /loki"
```

### Solution 3: Use Specific Version
File `docker-compose.full.yml` sudah diupdate menggunakan:
- `grafana/loki:2.9.0` (stable version)
- `grafana/promtail:2.9.0` (matching version)

### Solution 4: Health Checks
File `docker-compose.full.yml` sudah diupdate dengan:
- Healthcheck untuk Loki
- `depends_on` dengan condition `service_healthy`
- Promtail menunggu Loki ready

---

## 📞 Support

Jika masih ada masalah:

1. **Run troubleshooting script**: `./scripts/fix-loki.sh`
2. **Check logs**: `docker logs nxt-1-astro-loki`
3. **Check documentation**: [DOCKER_HUB_GUIDE.md](./DOCKER_HUB_GUIDE.md)
4. **Create issue**: https://github.com/nexoraprod/nxt-1-astro/issues

---

<div align="center">

**Happy Troubleshooting! 🔧**

</div>
