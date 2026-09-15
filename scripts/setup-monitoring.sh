#!/bin/bash

# Monitoring Stack Setup Script
# Setup Prometheus, Grafana, Loki, Jaeger untuk nxt-1 astro

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

log "🔭 Setting up monitoring stack for nxt-1 astro..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker first."
fi

# Create monitoring directory
log "📁 Creating monitoring configuration directory..."
mkdir -p monitoring/grafana/dashboards
mkdir -p monitoring/grafana/datasources

# Check if configuration files exist
if [ ! -f "monitoring/prometheus.yml" ]; then
    warning "Prometheus config not found, creating default..."
    cat > monitoring/prometheus.yml << 'EOF'
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
  
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
EOF
fi

if [ ! -f "monitoring/loki.yml" ]; then
    warning "Loki config not found, creating default..."
    cat > monitoring/loki.yml << 'EOF'
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
    shared_store: filesystem
  filesystem:
    directory: /loki/chunks
EOF
fi

if [ ! -f "monitoring/promtail.yml" ]; then
    warning "Promtail config not found, creating default..."
    cat > monitoring/promtail.yml << 'EOF'
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    static_configs:
      - targets:
          - localhost
        labels:
          job: docker
          __path__: /var/lib/docker/containers/*/*log
    pipeline_stages:
      - docker: {}
EOF
fi

# Start monitoring stack
log "🚀 Starting monitoring stack..."
docker-compose -f docker-compose.full.yml up -d prometheus grafana loki promtail jaeger node-exporter cadvisor

# Wait for services to be ready
log "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
log "🔍 Checking service status..."

services=("prometheus:9090" "grafana:3000" "loki:3100" "jaeger:16686")
all_healthy=true

for service in "${services[@]}"; do
    IFS=':' read -r name port <<< "$service"
    if curl -f -s "http://localhost:$port" > /dev/null; then
        success "$name is running on port $port"
    else
        error "$name failed to start"
        all_healthy=false
    fi
done

if [ "$all_healthy" = true ]; then
    success "🎉 All monitoring services are running!"
    echo ""
    echo "=========================================="
    echo "📊 Monitoring Stack URLs:"
    echo "=========================================="
    echo ""
    echo "🔥 Grafana Dashboard:    http://localhost:3000"
    echo "   Username: admin"
    echo "   Password: admin"
    echo ""
    echo "📈 Prometheus:           http://localhost:9090"
    echo ""
    echo "📝 Loki (Logs):          http://localhost:3100"
    echo ""
    echo "🔍 Jaeger (Tracing):     http://localhost:16686"
    echo ""
    echo "📊 Node Exporter:        http://localhost:9100"
    echo ""
    echo "📊 cAdvisor:             http://localhost:8080"
    echo ""
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo "1. Open Grafana: http://localhost:3000"
    echo "2. Login with admin/admin"
    echo "3. Import dashboards or create your own"
    echo "4. Configure alerts as needed"
    echo ""
else
    error "Some services failed to start. Check logs with: docker-compose -f docker-compose.full.yml logs"
fi

exit 0
