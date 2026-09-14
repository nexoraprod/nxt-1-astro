.PHONY: help install dev build test clean docker-build docker-run docker-dev docker-stop lint typecheck

# Default target
help:
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build for production"
	@echo "  make test          - Run tests"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make lint          - Run linter"
	@echo "  make typecheck     - Run TypeScript type check"
	@echo ""
	@echo "Docker commands:"
	@echo "  make docker-build  - Build Docker image"
	@echo "  make docker-run    - Run Docker container"
	@echo "  make docker-dev    - Run development container"
	@echo "  make docker-stop   - Stop Docker container"
	@echo "  make docker-clean  - Remove Docker images"

# Install dependencies
install:
	npm install

# Development
dev:
	npm run dev

# Build
build:
	npm run build

# Test
test:
	npm run test

# Clean
clean:
	rm -rf dist node_modules/.cache

# Lint
lint:
	npm run lint

# Type check
typecheck:
	npm run typecheck

# Docker - Build production image
docker-build:
	docker build -t nxt-1-astro:latest .

# Docker - Run production container
docker-run:
	docker run -d -p 80:80 --name nxt-1-astro nxt-1-astro:latest

# Docker - Run development container
docker-dev:
	docker-compose up app-dev

# Docker - Stop all containers
docker-stop:
	docker-compose down

# Docker - Clean up
docker-clean:
	docker-compose down -v
	docker rmi nxt-1-astro:latest || true

# Docker - Logs
docker-logs:
	docker-compose logs -f

# Docker - Rebuild
docker-rebuild:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d

# Production deployment
deploy:
	@echo "Building for production..."
	npm run build
	@echo "Build complete! Files in dist/"
	@echo "Deploy dist/ to your web server"

# Full setup (for new developers)
setup: install
	@echo "Setup complete! Run 'make dev' to start development server"
