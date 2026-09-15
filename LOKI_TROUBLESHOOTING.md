# 🔧 Troubleshooting Loki

Panduan troubleshooting untuk masalah Loki di nxt-1 astro monitoring stack.

## ❌ Error: YAML Parsing Failed

### Error Message
```
failed parsing config: /etc/loki/local-config.yaml: yaml: unmarshal errors:
  line 32: field shared_store not found in type boltdb.IndexCfg
  line 37: field enforce_metric_name not found in type validation.plain
  line 42: field max_look_back_period not found in type config.ChunkStoreConfig
```

### Penyebab
Konfigurasi Loki tidak compatible dengan versi Loki yang digunakan. Field-field tertentu hanya tersedia di versi tertentu.

### Solusi

#### 1. Restart Loki dengan Konfigurasi Baru
```bash
# Stop Loki container
docker-compose -f docker-compose.full.yml stop loki

# Remove container lama
docker-compose -f docker-compose.full.yml rm -f loki

# Start ulang dengan konfigurasi baru
docker-compose -f docker-compose.full.yml up -d loki

# Check logs
docker logs -f nxt-1-astro-loki
```

#### 2. Verify Konfigurasi
```bash
# Check file konfigurasi
cat monitoring/loki.yml

# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('monitoring/loki.yml'))"
```

#### 3. Check Loki Version
```bash
# Check versi Loki yang digunakan
docker exec nxt-1-astro-loki loki --version
```

## ❌ Error: Loki Not Ready

### Error Message
```
level=warn ts=... msg="waiting for service to be in RUNNING state" component=ring
```

### Penyebab
Loki masih dalam proses startup atau ada masalah dengan ring/consensus.

### Solusi
```bash
# Wait 30 seconds
sleep 30

# Check status
curl http://localhost:3100/ready

# Jika masih belum ready, restart
docker-compose -f docker-compose.full.yml restart loki
```

## ❌ Error: Permission Denied

### Error Message
```
mkdir /loki/chunks: permission denied
```

### Solusi
```bash
# Fix permissions
docker exec -u root nxt-1-astro-loki chown -R 10001:10001 /loki

# Restart
docker-compose -f docker-compose.full.yml restart loki
```

## 🔍 Diagnostic Commands

### Check Loki Status
```bash
# Container status
docker ps | grep loki

# Logs
docker logs --tail 100 nxt-1-astro-loki

# Health check
curl http://localhost:3100/ready

# Metrics
curl http://localhost:3100/metrics
```

### Check Configuration
```bash
# View config
docker exec nxt-1-astro-loki cat /etc/loki/local-config.yaml

# Validate config
docker exec nxt-1-astro-loki loki -config.file=/etc/loki/local-config.yaml -config.check
```

### Check Storage
```bash
# Check disk space
docker exec nxt-1-astro-loki df -h /loki

# List files
docker exec nxt-1-astro-loki ls -la /loki
```

## 🔄 Reset Loki

Jika Loki masih bermasalah, reset complete:

```bash
# Stop semua services yang depend on Loki
docker-compose -f docker-compose.full.yml stop promtail loki

# Remove containers
docker-compose -f docker-compose.full.yml rm -f promtail loki

# Remove volume (WARNING: akan hapus semua logs)
docker volume rm nxt-1-astro_loki-data

# Start ulang
docker-compose -f docker-compose.full.yml up -d loki promtail

# Wait dan verify
sleep 30
curl http://localhost:3100/ready
```

## 📊 Verify Loki Working

### Test Push Logs
```bash
# Push test log
curl -H "Content-Type: application/json" \
  -XPOST http://localhost:3100/loki/api/v1/push \
  -d '{"streams": [{"stream": {"job": "test"}, "values": [["$(date +%s)000000000", "Hello Loki!"]]}]}'

# Query logs
curl -G http://localhost:3100/loki/api/v1/query \
  --data-urlencode 'query={job="test"}'
```

### Check di Grafana
1. Buka http://localhost:3001
2. Login: admin / admin
3. Go to Explore
4. Select Loki data source
5. Query: `{job="docker"}`
6. Should see container logs

## 📝 Konfigurasi Loki yang Benar

File `monitoring/loki.yml` yang compatible dengan Loki 2.9.0:

```yaml
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 127.0.0.1
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
  chunk_idle_period: 3m
  chunk_block_size: 262144
  chunk_retain_period: 1m
  max_transfer_retries: 0

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb-shipper
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 24h

storage_config:
  boltdb_shipper:
    active_index_directory: /loki/boltdb-shipper-active
    cache_location: /loki/boltdb-shipper-cache
    cache_ttl: 24h
    shared_store: filesystem
  filesystem:
    directory: /loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: false
  retention_period: 0s
```

## 🎯 Quick Fix Script

```bash
#!/bin/bash
# Quick fix untuk Loki

echo "🔧 Fixing Loki..."

# Stop Loki
docker-compose -f docker-compose.full.yml stop loki

# Remove container
docker-compose -f docker-compose.full.yml rm -f loki

# Start ulang
docker-compose -f docker-compose.full.yml up -d loki

# Wait
echo "⏳ Waiting for Loki to start..."
sleep 30

# Check
if curl -s http://localhost:3100/ready | grep -q "ready"; then
    echo "✅ Loki is ready!"
else
    echo "❌ Loki not ready. Check logs:"
    docker logs --tail 50 nxt-1-astro-loki
fi
```

Save as `fix-loki.sh` dan run:
```bash
chmod +x fix-loki.sh
./fix-loki.sh
```

## 📞 Support

Jika masih ada masalah:
1. Check logs: `docker logs nxt-1-astro-loki`
2. Verify config: `cat monitoring/loki.yml`
3. Check version compatibility
4. Reset volume jika perlu
