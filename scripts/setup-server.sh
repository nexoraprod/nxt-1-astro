#!/bin/bash

# Server setup script untuk nxt-1 astro
# Script ini akan menginstall semua dependencies yang dibutuhkan

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

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    error "Script ini harus dijalankan sebagai root"
fi

log "🚀 Starting server setup for nxt-1 astro..."

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
else
    error "Cannot detect OS"
fi

log "📋 Detected OS: $OS"

# Update system
log "📦 Updating system packages..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    apt-get update -y
    apt-get upgrade -y
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    yum update -y
else
    warning "Unknown OS, skipping system update"
fi

# Install Docker
log "🐳 Installing Docker..."
if command -v docker &> /dev/null; then
    success "Docker already installed: $(docker --version)"
else
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        # Install dependencies
        apt-get install -y \
            ca-certificates \
            curl \
            gnupg \
            lsb-release
        
        # Add Docker GPG key
        mkdir -p /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
            gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        
        # Add repository
        echo \
            "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
            https://download.docker.com/linux/ubuntu \
            $(lsb_release -cs) stable" | \
            tee /etc/apt/sources.list.d/docker.list > /dev/null
        
        # Install Docker
        apt-get update -y
        apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
        
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        yum install -y yum-utils
        yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    fi
    
    # Start and enable Docker
    systemctl start docker
    systemctl enable docker
    
    success "Docker installed: $(docker --version)"
fi

# Install Docker Compose
log "🐙 Installing Docker Compose..."
if command -v docker-compose &> /dev/null; then
    success "Docker Compose already installed: $(docker-compose --version)"
else
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    success "Docker Compose installed: $(docker-compose --version)"
fi

# Create deploy user (optional)
log "👤 Setting up deploy user..."
DEPLOY_USER="deploy"
if id "$DEPLOY_USER" &>/dev/null; then
    success "Deploy user already exists"
else
    useradd -m -s /bin/bash "$DEPLOY_USER"
    usermod -aG docker "$DEPLOY_USER"
    success "Deploy user created and added to docker group"
fi

# Create deployment directory
log "📁 Creating deployment directory..."
DEPLOY_DIR="/opt/nxt-1-astro"
mkdir -p "$DEPLOY_DIR"
chown "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_DIR"
success "Deployment directory created: $DEPLOY_DIR"

# Create docker-compose.yml
log "📝 Creating docker-compose.yml..."
cat > "$DEPLOY_DIR/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  app:
    image: nxt-1-astro:latest
    container_name: nxt-1-astro
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

chown "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_DIR/docker-compose.yml"
success "docker-compose.yml created"

# Setup firewall
log "🔥 Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    success "UFW firewall configured"
elif command -v firewall-cmd &> /dev/null; then
    firewall-cmd --permanent --add-port=22/tcp
    firewall-cmd --permanent --add-port=80/tcp
    firewall-cmd --permanent --add-port=443/tcp
    firewall-cmd --reload
    success "FirewallD configured"
else
    warning "No firewall detected, skipping firewall configuration"
fi

# Install useful tools
log "🛠️  Installing useful tools..."
if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
    apt-get install -y \
        curl \
        wget \
        git \
        htop \
        net-tools \
        unzip
elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
    yum install -y \
        curl \
        wget \
        git \
        htop \
        net-tools \
        unzip
fi
success "Useful tools installed"

# Create auto-deploy script
log "📜 Creating auto-deploy script..."
cat > "$DEPLOY_DIR/deploy.sh" << 'EOF'
#!/bin/bash
cd /opt/nxt-1-astro
docker-compose pull
docker-compose down
docker-compose up -d
docker image prune -f
echo "Deployment completed at $(date)" >> /var/log/deploy.log
EOF

chmod +x "$DEPLOY_DIR/deploy.sh"
chown "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_DIR/deploy.sh"
success "Auto-deploy script created"

# Create log directory
log "📊 Creating log directory..."
mkdir -p /var/log
touch /var/log/deploy.log
chown "$DEPLOY_USER:$DEPLOY_USER" /var/log/deploy.log
success "Log directory created"

# Setup SSH key authentication (optional)
log "🔐 Setting up SSH..."
SSH_DIR="/home/$DEPLOY_USER/.ssh"
mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"
touch "$SSH_DIR/authorized_keys"
chmod 600 "$SSH_DIR/authorized_keys"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "$SSH_DIR"
success "SSH directory created"

# Final summary
success "🎉 Server setup completed!"
echo ""
echo "=========================================="
echo "📋 Next Steps:"
echo "=========================================="
echo ""
echo "1. Add your SSH public key to server:"
echo "   ssh-copy-id $DEPLOY_USER@$(hostname -I | awk '{print $1}')"
echo ""
echo "2. Add GitHub secrets:"
echo "   - SERVER_HOST: $(hostname -I | awk '{print $1}')"
echo "   - SERVER_USERNAME: $DEPLOY_USER"
echo "   - SERVER_SSH_KEY: (your private key)"
echo "   - SERVER_PATH: $DEPLOY_DIR"
echo ""
echo "3. Deploy your application:"
echo "   ssh $DEPLOY_USER@$(hostname -I | awk '{print $1}')"
echo "   cd $DEPLOY_DIR"
echo "   ./deploy.sh"
echo ""
echo "4. Access your application:"
echo "   http://$(hostname -I | awk '{print $1}')"
echo ""
echo "=========================================="
echo ""

exit 0
