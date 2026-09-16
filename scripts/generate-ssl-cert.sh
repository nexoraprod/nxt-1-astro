#!/bin/bash

# Generate self-signed SSL certificate untuk development
# Usage: ./scripts/generate-ssl-cert.sh [domain]

DOMAIN=${1:-"localhost"}

echo "🔐 Generating SSL certificate for: $DOMAIN"

# Create ssl directory
mkdir -p ssl

# Generate private key
openssl genrsa -out ssl/key.pem 2048

# Generate certificate
openssl req -new -x509 -key ssl/key.pem -out ssl/cert.pem -days 365 -subj "/CN=$DOMAIN"

echo "✅ SSL certificate generated!"
echo ""
echo "Files created:"
echo "  - ssl/cert.pem (certificate)"
echo "  - ssl/key.pem (private key)"
echo ""
echo "Restart nginx-ssl container:"
echo "  docker-compose -f docker-compose.yml restart nginx-ssl"
