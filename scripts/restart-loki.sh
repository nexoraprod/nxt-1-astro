#!/bin/bash

# Script untuk restart Loki dengan konfigurasi yang sudah diperbaiki

echo "🔧 Restarting Loki with fixed configuration..."

# Stop Loki
echo "🛑 Stopping Loki..."
docker-compose -f docker-compose.full.yml stop loki

# Remove container
echo "🗑️  Removing old container..."
docker-compose -f docker-compose.full.yml rm -f loki

# Start ulang
echo "🚀 Starting Loki with new configuration..."
docker-compose -f docker-compose.full.yml up -d loki

# Wait for startup
echo "⏳ Waiting for Loki to start (30 seconds)..."
sleep 30

# Check status
echo "🔍 Checking Loki status..."
if curl -s http://localhost:3100/ready | grep -q "ready"; then
    echo "✅ Loki is ready and running!"
    echo ""
    echo "📊 Loki endpoints:"
    echo "   - Ready: http://localhost:3100/ready"
    echo "   - Metrics: http://localhost:3100/metrics"
    echo "   - Push logs: http://localhost:3100/loki/api/v1/push"
    echo ""
    echo "🎯 Test Loki:"
    echo "   curl http://localhost:3100/ready"
else
    echo "❌ Loki is not ready yet. Checking logs..."
    echo ""
    docker logs --tail 50 nxt-1-astro-loki
    echo ""
    echo "💡 If you see YAML parsing errors, the configuration might still be incompatible."
    echo "   Check LOKI_TROUBLESHOOTING.md for more information."
fi
