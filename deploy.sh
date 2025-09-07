#!/bin/bash

# LinkedIn Content Generator - Docker Build and Deploy Script

set -e

echo "🚀 Starting LinkedIn Content Generator Docker Build Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans || true

# Remove old images (optional)
read -p "Do you want to remove old images to save space? (y/N): " remove_images
if [[ $remove_images =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing old images..."
    docker image prune -f
    docker-compose build --no-cache
else
    echo "🔄 Building images (using cache if available)..."
    docker-compose build
fi

# Start the services
echo "🚀 Starting all services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
timeout=120
counter=0

while [ $counter -lt $timeout ]; do
    if docker-compose ps | grep -q "unhealthy\|starting"; then
        echo "Waiting... ($counter/$timeout seconds)"
        sleep 5
        counter=$((counter + 5))
    else
        break
    fi
done

# Check service status
echo ""
echo "📊 Service Status:"
docker-compose ps

# Show logs for any unhealthy services
unhealthy_services=$(docker-compose ps --services --filter "health=unhealthy" 2>/dev/null || true)
if [ ! -z "$unhealthy_services" ]; then
    print_warning "Some services are unhealthy. Showing logs:"
    for service in $unhealthy_services; do
        echo "--- Logs for $service ---"
        docker-compose logs --tail=20 $service
    done
fi

echo ""
print_status "LinkedIn Content Generator is ready!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8081/api"
echo "   Database: localhost:5433"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f [service_name]"
echo "   Stop all: docker-compose down"
echo "   Restart: docker-compose restart [service_name]"
echo ""
echo "🔐 Test Account:"
echo "   Email: test@test.com"
echo "   Password: test@123"
