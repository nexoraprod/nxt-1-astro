#!/bin/bash

# Loki Troubleshooting Script
# Script untuk diagnose dan fix masalah Loki

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
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

echo ""
echo "=========================================="
echo "🔧 LOKI TROUBLESHOOTING"
echo "=========================================="
echo ""

# Check if Docker is running
log "🔍 Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker first."
fi
success "Docker is running"

echo ""

# Check if Loki container exists
log "🔍 Checking Loki container..."
if docker ps -a | grep -q "nxt-1-astro-loki"; then
    success "Loki container exists"
    
    # Check if Loki is running
    if docker ps | grep -q "nxt-1-astro-loki"; then
        success "Loki container is running"
        
        # Check health
        log "🔍 Checking Loki health..."
        if curl -s http://localhost:3100/ready | grep -q "ready"; then
            success "Loki is healthy and ready"
        else
            warning "Loki is running but not ready"
            echo ""
            read -p "Do you want to check logs? (y/n): " CHECK_LOGS
            
            if [ "$CHECK_LOGS" = "y" ] || [ "$CHECK_LOGS" = "Y" ]; then
                echo ""
                log "📋 Loki logs (last 50 lines):"
                echo ""
                docker logs --tail 50 nxt-1-astro-loki
            fi
        fi
    else
        warning "Loki container exists but not running"
        echo ""
        read -p "Do you want to start Loki? (y/n): " START_LOKI
        
        if [ "$START_LOKI" = "y" ] || [ "$START_LOKI" = "Y" ]; then
            log "🚀 Starting Loki..."
            docker start nxt-1-astro-loki
            sleep 5
            
            if docker ps | grep -q "nxt-1-astro-loki"; then
                success "Loki started successfully"
            else
                error "Failed to start Loki"
            fi
        fi
    fi
else
    warning "Loki container does not exist"
    echo ""
    read -p "Do you want to create and start Loki? (y/n): " CREATE_LOKI
    
    if [ "$CREATE_LOKI" = "y" ] || [ "$CREATE_LOKI" = "Y" ]; then
        log "🚀 Creating and starting Loki..."
        
        # Check if docker-compose.full.yml exists
        if [ ! -f "docker-compose.full.yml" ]; then
            error "docker-compose.full.yml not found"
        fi
        
        # Start Loki with docker-compose
        docker-compose -f docker-compose.full.yml up -d loki
        
        if [ $? -eq 0 ]; then
            success "Loki created and started"
            sleep 5
        else
            error "Failed to create Loki"
        fi
    fi
fi

echo ""

# Check Loki configuration
log "🔍 Checking Loki configuration..."
if [ -f "monitoring/loki.yml" ]; then
    success "Loki configuration file exists"
    
    # Check if config is valid YAML
    if command -v yamllint &> /dev/null; then
        if yamllint monitoring/loki.yml > /dev/null 2>&1; then
            success "Loki configuration is valid YAML"
        else
            warning "Loki configuration might have YAML errors"
        fi
    else
        warning "yamllint not installed, skipping YAML validation"
    fi
else
    error "Loki configuration file not found: monitoring/loki.yml"
fi

echo ""

# Check port availability
log "🔍 Checking port 3100..."
if netstat -tuln 2>/dev/null | grep -q ":3100 " || ss -tuln 2>/dev/null | grep -q ":3100 "; then
    success "Port 3100 is in use (Loki is listening)"
else
    warning "Port 3100 is not in use"
fi

echo ""

# Check volume permissions
log "🔍 Checking Loki volume..."
if docker volume ls | grep -q "loki-data"; then
    success "Loki volume exists"
    
    # Check volume permissions
    log "🔍 Checking volume permissions..."
    docker run --rm -v loki-data:/loki alpine sh -c "ls -la /loki" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        success "Volume is accessible"
    else
        warning "Volume might have permission issues"
        echo ""
        read -p "Do you want to fix volume permissions? (y/n): " FIX_PERMS
        
        if [ "$FIX_PERMS" = "y" ] || [ "$FIX_PERMS" = "Y" ]; then
            log "🔧 Fixing volume permissions..."
            docker run --rm -v loki-data:/loki alpine sh -c "chown -R 10001:10001 /loki"
            success "Volume permissions fixed"
        fi
    fi
else
    warning "Loki volume does not exist"
fi

echo ""

# Test Loki API
log "🔍 Testing Loki API..."
if curl -s http://localhost:3100/ready | grep -q "ready"; then
    success "Loki API is responding"
    
    # Test query
    log "🔍 Testing Loki query..."
    if curl -s "http://localhost:3100/loki/api/v1/labels" | grep -q "status"; then
        success "Loki query API is working"
    else
        warning "Loki query API might have issues"
    fi
else
    warning "Loki API is not responding"
fi

echo ""

# Show options
echo "=========================================="
echo "🎯 TROUBLESHOOTING OPTIONS"
echo "=========================================="
echo ""
echo "1) View Loki logs"
echo "2) Restart Loki"
echo "3) Recreate Loki container"
echo "4) Reset Loki data (delete volume)"
echo "5) Check all monitoring services"
echo "6) Exit"
echo ""
read -p "Select option (1-6): " OPTION

case $OPTION in
    1)
        echo ""
        log "📋 Loki logs:"
        echo ""
        docker logs --tail 100 nxt-1-astro-loki
        ;;
    
    2)
        echo ""
        log "🔄 Restarting Loki..."
        docker-compose -f docker-compose.full.yml restart loki
        sleep 5
        
        if curl -s http://localhost:3100/ready | grep -q "ready"; then
            success "Loki restarted successfully"
        else
            warning "Loki restarted but not ready yet"
        fi
        ;;
    
    3)
        echo ""
        log "🔄 Recreating Loki container..."
        docker-compose -f docker-compose.full.yml up -d --force-recreate loki
        sleep 5
        
        if curl -s http://localhost:3100/ready | grep -q "ready"; then
            success "Loki recreated successfully"
        else
            warning "Loki recreated but not ready yet"
        fi
        ;;
    
    4)
        echo ""
        warning "⚠️  This will delete all Loki data!"
        read -p "Are you sure? (y/n): " CONFIRM
        
        if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
            log "🗑️  Stopping Loki..."
            docker-compose -f docker-compose.full.yml stop loki
            
            log "🗑️  Removing Loki container..."
            docker-compose -f docker-compose.full.yml rm -f loki
            
            log "🗑️  Deleting Loki volume..."
            docker volume rm loki-data
            
            log "🚀 Recreating Loki..."
            docker-compose -f docker-compose.full.yml up -d loki
            sleep 5
            
            success "Loki reset complete"
        else
            warning "Reset cancelled"
        fi
        ;;
    
    5)
        echo ""
        log "🔍 Checking all monitoring services..."
        echo ""
        
        services=("prometheus:9090" "grafana:3000" "loki:3100" "jaeger:16686")
        
        for service in "${services[@]}"; do
            IFS=':' read -r name port <<< "$service"
            
            if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$port" | grep -q "200\|302"; then
                success "$name is running (port $port)"
            else
                error "$name is not responding (port $port)"
            fi
        done
        ;;
    
    6)
        echo ""
        log "Exiting..."
        exit 0
        ;;
    
    *)
        error "Invalid option"
        ;;
esac

echo ""
success "🎉 Troubleshooting complete!"
echo ""
