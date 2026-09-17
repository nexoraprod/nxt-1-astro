# 🔧 Port Conflict Troubleshooting

Panduan untuk menyelesaikan konflik port saat menjalankan Docker containers.

## ❌ Error yang Umum

```
Error response from daemon: failed to set up container networking: 
Bind for 0.0.0.0:3000 failed: port is already allocated
```

## 🔍 Penyebab

Port yang dibutuhkan sudah digunakan oleh:
- Container Docker lain yang masih berjalan
- Service lokal (Node.js, Python, dll)
- Aplikasi lain di sistem

## ✅ Solusi Cepat

### Option 1: Gunakan Script Otomatis (Recommended)

```bash
# Make script executable
chmod +x scripts/fix-port-conflict.sh

# Run script
./scripts/fix-port-conflict.sh
```

Script akan:
- Detect semua port conflicts
- Tampilkan container/process yang konflik
- Berikan opsi untuk resolve

### Option 2: Stop Container yang Konflik

```bash
# Check container yang menggunakan port 3000
docker ps -a | grep ":3000"

# Stop container
docker stop <container-name>

# Remove container
docker rm <container-name>
```

### Option 3: Ubah Port Mapping

Edit `docker-compose.full.yml`:

```yaml
# Sebelum
grafana:
  ports:
    - "3000:3000"

# Sesudah (ubah ke port lain)
grafana:
  ports:
    - "3001:3000"  # Host port 3001, container port tetap 3000
```

## 📋 Port yang Digunakan

| Service | Default Port | Alternative Port |
|---------|--------------|------------------|
| Website | 80 | 8080 |
| Grafana | 3000 | 3001 |
| Loki | 3100 | 3101 |
| Prometheus | 9090 | 9091 |
| Node Exporter | 9100 | 9101 |
| Jaeger | 16686 | 16687 |
| cAdvisor | 8080 | 8081 |
| Redis | 6379 | 6380 |

## 🔧 Manual Resolution

### Step 1: Check Port Usage

```bash
# Linux/Mac
sudo lsof -i :3000

# Atau
sudo netstat -tulpn | grep :3000

# Atau
ss -tulpn | grep :3000
```

### Step 2: Identify Process

```bash
# Get PID
PID=$(sudo lsof -t -i:3000)

# Check process details
ps -p $PID -f
```

### Step 3: Kill Process

```bash
# Kill specific process
sudo kill -9 $PID

# Atau stop Docker container
docker stop $(docker ps -q --filter "publish=3000")
```

### Step 4: Restart Services

```bash
# Stop all containers
docker-compose -f docker-compose.full.yml down

# Start again
docker-compose -f docker-compose.full.yml up -d
```

## 🎯 Common Scenarios

### Scenario 1: Grafana Port 3000 Conflict

**Problem:**
```
Bind for 0.0.0.0:3000 failed: port is already allocated
```

**Solution:**
```bash
# Option A: Stop conflicting container
docker ps -a | grep ":3000"
docker stop <container-name>
docker rm <container-name>

# Option B: Use alternative port
# Edit docker-compose.full.yml, change 3000:3000 to 3001:3000
docker-compose -f docker-compose.full.yml up -d

# Access Grafana at http://localhost:3001
```

### Scenario 2: Multiple Port Conflicts

**Problem:**
Beberapa port sekaligus konflik (3000, 9090, dll)

**Solution:**
```bash
# Use automated script
./scripts/fix-port-conflict.sh

# Select option 1 to stop all conflicting containers
# Or option 2 to update all port mappings
```

### Scenario 3: Port Used by Non-Docker Process

**Problem:**
Port digunakan oleh aplikasi lokal (bukan Docker)

**Solution:**
```bash
# Find process
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>

# Or use different port in docker-compose
```

## 📊 Verification

Setelah resolve conflict, verify:

```bash
# Check all containers running
docker ps

# Check port mappings
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Test access
curl http://localhost:80      # Website
curl http://localhost:3001    # Grafana (new port)
curl http://localhost:3100    # Loki
curl http://localhost:9090    # Prometheus
```

## 🚀 Quick Commands

```bash
# List all port mappings
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Find container using specific port
docker ps --filter "publish=3000"

# Stop all containers
docker-compose -f docker-compose.full.yml down

# Start all containers
docker-compose -f docker-compose.full.yml up -d

# View logs
docker-compose -f docker-compose.full.yml logs -f

# Restart specific service
docker-compose -f docker-compose.full.yml restart grafana
```

## 💡 Tips

1. **Selalu check port sebelum start**
   ```bash
   ./scripts/fix-port-conflict.sh
   ```

2. **Gunakan port alternative** untuk menghindari konflik

3. **Stop container yang tidak dipakai**
   ```bash
   docker stop $(docker ps -q)
   ```

4. **Clean up unused containers**
   ```bash
   docker container prune
   ```

5. **Check resource usage**
   ```bash
   docker stats
   ```

## 📞 Support

Jika masih ada masalah:
1. Run `./scripts/fix-port-conflict.sh`
2. Check logs: `docker-compose -f docker-compose.full.yml logs`
3. Create issue: https://github.com/1astro/nxt-1-astro/issues

---

**Port conflicts resolved! 🎉**
