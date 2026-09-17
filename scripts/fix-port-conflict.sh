#!/bin/bash

# Port Conflict Resolver
# Script untuk mendeteksi dan menyelesaikan konflik port

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
echo "🔧 PORT CONFLICT RESOLVER"
echo "=========================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    error "Docker is not running. Please start Docker first."
    exit 1
fi

# List of ports to check
PORTS=(80 3000 3100 9090 9100 16686 8080 6379)

log "🔍 Checking port conflicts..."
echo ""

CONFLICTS=()

for PORT in "${PORTS[@]}"; do
    # Check if port is in use
    if command -v lsof &> /dev/null; then
        PID=$(lsof -ti :$PORT 2>/dev/null || echo "")
    elif command -v netstat &> /dev/null; then
        PID=$(netstat -anp 2>/dev/null | grep ":$PORT " | awk '{print $7}' | cut -d'/' -f1 || echo "")
    elif command -v ss &> /dev/null; then
        PID=$(ss -tulpn 2>/dev/null | grep ":$PORT " | grep -oP 'pid=\K[0-9]+' || echo "")
    else
        warning "Cannot check port $PORT (no lsof, netstat, or ss available)"
        continue
    fi
    
    if [ -n "$PID" ]; then
        # Check if it's a Docker container
        CONTAINER=$(docker ps --filter "publish=$PORT" --format "{{.Names}}" 2>/dev/null || echo "")
        
        if [ -n "$CONTAINER" ]; then
            warning "Port $PORT is used by Docker container: $CONTAINER"
            CONFLICTS+=("$PORT:$CONTAINER")
        else
            # Get process name
            if command -v ps &> /dev/null; then
                PROCESS=$(ps -p $PID -o comm= 2>/dev/null || echo "unknown")
            else
                PROCESS="unknown"
            fi
            warning "Port $PORT is used by process: $PROCESS (PID: $PID)"
            CONFLICTS+=("$PORT:$PROCESS")
        fi
    else
        success "Port $PORT is available"
    fi
done

echo ""

if [ ${#CONFLICTS[@]} -eq 0 ]; then
    success "No port conflicts detected!"
    exit 0
fi

echo ""
echo "=========================================="
echo "🎯 RESOLUTION OPTIONS"
echo "=========================================="
echo ""
echo "1) Stop conflicting containers"
echo "2) Change port mappings in docker-compose"
echo "3) Kill conflicting processes"
echo "4) Show detailed information"
echo "5) Exit"
echo ""
read -p "Select option (1-5): " OPTION

case $OPTION in
    1)
        echo ""
        log "🛑 Stopping conflicting containers..."
        for CONFLICT in "${CONFLICTS[@]}"; do
            IFS=':' read -r PORT CONTAINER <<< "$CONFLICT"
            
            if docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER}$"; then
                log "Stopping $CONTAINER (port $PORT)..."
                docker stop "$CONTAINER" 2>/dev/null || true
                docker rm "$CONTAINER" 2>/dev/null || true
                success "Stopped $CONTAINER"
            fi
        done
        echo ""
        success "Conflicts resolved! You can now start your containers."
        ;;
    
    2)
        echo ""
        log "📝 Updating docker-compose files..."
        
        # Backup original files
        for FILE in docker-compose.yml docker-compose.prod.yml docker-compose.full.yml; do
            if [ -f "$FILE" ]; then
                cp "$FILE" "${FILE}.backup"
                success "Backed up $FILE to ${FILE}.backup"
            fi
        done
        
        echo ""
        warning "Please manually edit docker-compose files to use different ports:"
        echo ""
        echo "For Grafana (port 3000):"
        echo "  Change: ports: - \"3000:3000\""
        echo "  To:     ports: - \"3001:3000\""
        echo ""
        echo "For other services, use similar pattern."
        echo ""
        echo "Then run: docker-compose -f docker-compose.full.yml up -d"
        ;;
    
    3)
        echo ""
        warning "⚠️  This will kill processes using the ports!"
        read -p "Are you sure? (y/n): " CONFIRM
        
        if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
            for CONFLICT in "${CONFLICTS[@]}"; do
                IFS=':' read -r PORT CONTAINER <<< "$CONFLICT"
                
                # Try to stop Docker container first
                if docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER}$"; then
                    log "Stopping Docker container $CONTAINER..."
                    docker stop "$CONTAINER" 2>/dev/null || true
                    docker rm "$CONTAINER" 2>/dev/null || true
                else
                    # Kill process
                    if command -v lsof &> /dev/null; then
                        PID=$(lsof -ti :$PORT 2>/dev/null || echo "")
                    elif command -v netstat &> /dev/null; then
                        PID=$(netstat -anp 2>/dev/null | grep ":$PORT " | awk '{print $7}' | cut -d'/' -f1 || echo "")
                    fi
                    
                    if [ -n "$PID" ]; then
                        log "Killing process on port $PORT (PID: $PID)..."
                        kill -9 "$PID" 2>/dev/null || true
                    fi
                fi
            done
            echo ""
            success "Processes killed! You can now start your containers."
        else
            warning "Operation cancelled"
        fi
        ;;
    
    4)
        echo ""
        echo "=========================================="
        echo "📊 DETAILED INFORMATION"
        echo "=========================================="
        echo ""
        
        for CONFLICT in "${CONFLICTS[@]}"; do
            IFS=':' read -r PORT CONTAINER <<< "$CONFLICT"
            echo "Port $PORT:"
            
            # Docker container info
            if docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER}$"; then
                echo "  Container: $CONTAINER"
                docker ps -a --filter "name=$CONTAINER" --format "  Status: {{.Status}}\n  Image: {{.Image}}"
            else
                echo "  Process: $CONTAINER"
                
                # Get more info
                if command -v lsof &> /dev/null; then
                    PID=$(lsof -ti :$PORT 2>/dev/null || echo "")
                    if [ -n "$PID" ]; then
                        echo "  PID: $PID"
                        echo "  Command: $(ps -p $PID -o args= 2>/dev/null || echo "unknown")"
                    fi
                fi
            fi
            echo ""
        done
        ;;
    
    5)
        echo ""
        log "Exiting..."
        exit 0
        ;;
    
    *)
        error "Invalid option"
        exit 1
        ;;
esac

echo ""
success "🎉 Port conflict resolution complete!"
echo ""
