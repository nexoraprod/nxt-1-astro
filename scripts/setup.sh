#!/bin/bash

# Setup script for new developers
# Usage: ./scripts/setup.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Setting up nxt-1 astro development environment...${NC}"

# Check Node.js version
echo -e "${YELLOW}📋 Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Check npm
echo -e "${YELLOW}📋 Checking npm...${NC}"
echo -e "${GREEN}✅ npm $(npm -v)${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

# Create .env file if not exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Build application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Run type check
echo -e "${YELLOW}🔍 Running type check...${NC}"
npm run typecheck

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}🎉 You're ready to start development!${NC}"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run preview      - Preview production build"
echo "  make docker-dev      - Start Docker development environment"
echo ""
echo -e "${YELLOW}Happy coding! 🚀${NC}"
