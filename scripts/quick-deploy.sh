#!/bin/bash

# Quick Local Deploy Script for nxt-1 astro
# Deploy website dengan monitoring stack dalam satu command

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

info() {
    echo -e "${PURPLE}[$(date +'%Y-%m-%d %H:%M:%S')] ℹ️  $1${NC}"
}

echo ""
echo "=========================================="
echo "🚀 NXT-1 ASTRO - QUICK LOCAL DEPLOY"
echo "=========================================="
echo ""

# Check prerequisites
log "🔍 Checking prerequisites..."

# Check Docker
if ! command -v docker &> /dev/null; then
    error "Docker is not installed. Please install Docker first."
fi

if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker first."
fi

success "Docker is running"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    if ! docker compose version &> /dev/null; then
        error "Docker Compose is not installed."
    fi
fi

success "Docker Compose is available"

# Check Node.js (optional, for local development)
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        warning "Node.js version is $NODE_VERSION. Recommended: 18+"
    else
        success "Node.js $NODE_VERSION is installed"
    fi
else
    warning "Node.js is not installed (optional for Docker deployment)"
fi

echo ""
log "🎯 What would you like to deploy?"
echo ""
echo "1) 🌐 Website Only (Basic)"
echo "2) 🔭 Website + Monitoring Stack (Recommended)"
echo "3) 🏭 Full Production Setup (Website + Monitoring + Redis)"
echo "4) 💻 Local Development (Hot reload)"
echo ""
read -p "Select option (1-4): " choice

case $choice in
    1)
        log "🌐 Deploying website only..."
        docker-compose -f docker-compose.prod.yml up -d app
        success "Website deployed!"
        echo ""
        echo "🌐 Access website at: http://localhost"
        ;;
    
    2)
        log "🔭 Deploying website with monitoring stack..."
        
        # Setup monitoring configuration
        if [ ! -d "monitoring" ]; then
            log "📁 Creating monitoring configuration..."
            ./scripts/setup-monitoring.sh
        fi
        
        # Start all services
        docker-compose -f docker-compose.full.yml up -d
        
        success "All services deployed!"
        echo ""
        echo "=========================================="
        echo "🎉 DEPLOYMENT COMPLETE!"
        echo "=========================================="
        echo ""
        echo "🌐 Website:              http://localhost"
        echo "🔥 Grafana Dashboard:    http://localhost:3000 (admin/admin)"
        echo "📈 Prometheus:           http://localhost:9090"
        echo "📝 Loki (Logs):          http://localhost:3100"
        echo "🔍 Jaeger (Tracing):     http://localhost:16686"
        echo "📊 Node Exporter:        http://localhost:9100"
        echo "📊 cAdvisor:             http://localhost:8080"
        echo ""
        echo "=========================================="
        ;;
    
    3)
        log "🏭 Deploying full production setup..."
        
        # Setup monitoring
        if [ ! -d "monitoring" ]; then
            ./scripts/setup-monitoring.sh
        fi
        
        # Start all services including Redis
        docker-compose -f docker-compose.full.yml up -d
        
        success "Full production stack deployed!"
        echo ""
        echo "=========================================="
        echo "🎉 PRODUCTION STACK DEPLOYED!"
        echo "=========================================="
        echo ""
        echo "🌐 Website:              http://localhost"
        echo "🔥 Grafana:              http://localhost:3000"
        echo "📈 Prometheus:           http://localhost:9090"
        echo "📝 Loki:                 http://localhost:3100"
        echo "🔍 Jaeger:               http://localhost:16686"
        echo "🗄️  Redis:               localhost:6379"
        echo ""
        echo "=========================================="
        ;;
    
    4)
        log "💻 Starting local development environment..."
        
        if ! command -v npm &> /dev/null; then
            error "npm is not installed. Please install Node.js first."
        fi
        
        # Install dependencies
        log "📦 Installing dependencies..."
        npm install
        
        # Start development server
        log "🚀 Starting development server..."
        npm run dev &
        DEV_PID=$!
        
        success "Development server started!"
        echo ""
        echo "=========================================="
        echo "💻 DEVELOPMENT MODE ACTIVE"
        echo "=========================================="
        echo ""
        echo "🌐 Website:              http://localhost:3000"
        echo "🔄 Hot reload:           Enabled"
        echo "📝 Edit files in:        src/"
        echo ""
        echo "Press Ctrl+C to stop"
        echo ""
        echo "=========================================="
        
        # Wait for Ctrl+C
        trap "kill $DEV_PID; exit" INT
        wait $DEV_PID
        ;;
    
    *)
        error "Invalid option. Please select 1-4."
        ;;
esac

echo ""
log "📊 Checking service status..."
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep nxt-1

echo ""
success "🎉 Deployment complete!"
echo ""
echo "Useful commands:"
echo "  - View logs:     docker-compose -f docker-compose.full.yml logs -f"
echo "  - Stop all:      docker-compose -f docker-compose.full.yml down"
echo "  - Restart:       docker-compose -f docker-compose.full.yml restart"
echo "  - Update:        docker-compose -f docker-compose.full.yml pull && docker-compose -f docker-compose.full.yml up -d"
echo ""
