# Docker Deployment Guide

This guide helps you deploy the LinkedIn Content Generator using Docker containers.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- At least 2GB of free RAM
- Ports 3000, 8081, and 5433 available

### One-Command Deployment
```bash
./deploy.sh
```

### Manual Deployment
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## 📋 Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js React application |
| Backend | 8081 | Spring Boot API server |
| Database | 5433 | PostgreSQL database |

## 🔧 Configuration

### Environment Variables
Create or modify `.env` file:
```bash
# Database
POSTGRES_DB=linkedin_content_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# API Keys
GEMINI_API_KEY=your_gemini_api_key_here

# Backend
SERVER_PORT=8081

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

### Docker Compose Override
For development or custom configurations, create `docker-compose.override.yml`:
```yaml
version: '3.8'
services:
  backend:
    environment:
      - SPRING_PROFILES_ACTIVE=dev
    volumes:
      - ./backend/logs:/app/logs
  
  frontend:
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules
```

## 🛠️ Development

### Building Individual Services
```bash
# Backend only
docker-compose build backend

# Frontend only  
docker-compose build frontend

# Build without cache
docker-compose build --no-cache
```

### Accessing Services
```bash
# Backend logs
docker-compose logs -f backend

# Frontend logs
docker-compose logs -f frontend

# Database logs
docker-compose logs -f postgres

# Execute commands in containers
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec postgres psql -U postgres -d linkedin_content_db
```

### Database Management
```bash
# Backup database
docker-compose exec postgres pg_dump -U postgres linkedin_content_db > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres linkedin_content_db < backup.sql

# Reset database
docker-compose down -v
docker-compose up -d
```

## 🔍 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port
lsof -ti:3000 | xargs kill -9

# Or change port in docker-compose.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

**Out of Memory**
```bash
# Increase Docker memory limit in Docker Desktop
# Or add memory limits to services:
services:
  backend:
    mem_limit: 1g
    memswap_limit: 1g
```

**Service Health Check Failing**
```bash
# Check service status
docker-compose ps

# View detailed logs
docker-compose logs backend

# Restart specific service
docker-compose restart backend
```

### Useful Commands
```bash
# View resource usage
docker stats

# Clean up unused resources
docker system prune -f

# View all containers
docker ps -a

# Remove all stopped containers
docker container prune -f
```

## 🔐 Security Notes

- Change default passwords in production
- Use environment files for sensitive data
- Enable HTTPS in production
- Consider using Docker secrets for API keys
- Run containers as non-root users (already configured)

## 📊 Monitoring

### Health Checks
All services include health checks:
- Backend: `curl http://localhost:8081/api/health`
- Frontend: `curl http://localhost:3000`
- Database: `pg_isready -U postgres`

### Logs
```bash
# All services
docker-compose logs -f

# Specific service with timestamps
docker-compose logs -f -t backend

# Last 100 lines
docker-compose logs --tail=100 frontend
```

## 🚀 Production Deployment

### Additional Considerations
1. Use production-grade PostgreSQL
2. Set up reverse proxy (Nginx)
3. Enable SSL/TLS
4. Configure log rotation
5. Set up monitoring and alerting
6. Use Docker Swarm or Kubernetes for orchestration

### Example Production Override
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  
  backend:
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db:5432/linkedin_content_db
```

Run with: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
