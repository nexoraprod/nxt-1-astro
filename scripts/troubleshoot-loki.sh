#!/bin/bash

# Script untuk troubleshooting dan fix Loki

echo "🔍 Loki Troubleshooting Script"
echo "================================"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker tidak terinstall!"
    exit 1
fi

# Check docker-compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose tidak terinstall!"
    exit 1
fi

echo "✅ Docker dan docker-compose terinstall"
echo ""

# Stop Loki
echo "🛑 Stopping Loki..."
docker-compose -f docker-compose.full.yml stop loki
docker-compose -f docker-compose.full.yml rm -f loki

# Remove volume jika ada masalah persisten
read -p "Apakah Anda ingin menghapus volume Loki (akan menghapus semua logs)? (y/n): " remove_volume
if [ "$remove_volume" = "y" ]; then
    echo "🗑️  Removing Loki volume..."
    docker volume rm nxt-1-astro_loki-data 2>/dev/null || echo "Volume tidak ada atau sudah dihapus"
fi

# Pull image terbaru
echo "📥 Pulling latest Loki image..."
docker pull grafana/loki:2.9.0

# Start Loki
echo "🚀 Starting Loki..."
docker-compose -f docker-compose.full.yml up -d loki

# Wait for startup
echo "⏳ Waiting for Loki to start (30 seconds)..."
sleep 30

# Check status
echo ""
echo "📊 Checking Loki status..."
echo ""

# Check if container is running
if docker ps | grep -q "nxt-1-astro-loki"; then
    echo "✅ Container Loki berjalan"
else
    echo "❌ Container Loki tidak berjalan"
    echo ""
    echo "📋 Logs:"
    docker logs --tail 50 nxt-1-astro-loki
    exit 1
fi

# Check health
echo ""
echo "🏥 Checking health..."
if curl -s http://localhost:3100/ready | grep -q "ready"; then
    echo "✅ Loki is ready!"
else
    echo "⚠️  Loki belum ready, checking logs..."
    echo ""
    docker logs --tail 50 nxt-1-astro-loki
fi

# Show endpoints
echo ""
echo "🌐 Loki Endpoints:"
echo "   - Ready: http://localhost:3100/ready"
echo "   - Metrics: http://localhost:3100/metrics"
echo "   - Push: http://localhost:3100/loki/api/v1/push"
echo ""

# Test push
echo "🧪 Testing push endpoint..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" -X POST http://localhost:3100/loki/api/v1/push \
  -H "Content-Type: application/json" \
  -d '{"streams": [{"stream": {"job": "test"}, "values": [["1234567890000000000", "test log"]]}]}'

echo ""
echo "✅ Troubleshooting complete!"
