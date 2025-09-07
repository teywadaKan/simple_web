# Simple Web Stack - Docker Setup

This project includes a complete Docker setup for both development and production environments.

## Free API
- https://jsonplaceholder.typicode.com (/users)
- https://api.dicebear.com/7.x/avataaars/svg  (?seed=${user.username}&backgroundColor=b6e3f4,c0aede,d1d4f9)

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 2.0+)

## 🏗️ Architecture

The application consists of:
- **Backend**: Node.js + Express API (Port 3001)
- **Frontend**: React + Vite application (Port 5173)

## 🔧 Configuration

### Environment Variables

#### Backend
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)

#### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)

### Custom Configuration

1. **API URL**: Update `VITE_API_URL` in docker-compose files
2. **Ports**: Modify port mappings in docker-compose files

## 🛠️ Available Commands

### Quick Start
```bash
# Start docker-compose
docker-compose up --build -d

# Remove containers
docker-compose down
```

### Development
```bash
# Start development stack
docker-compose -f docker-compose.dev.yml up

# Rebuild and start
docker-compose -f docker-compose.dev.yml up --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop and remove containers
docker-compose -f docker-compose.dev.yml down

# Remove volumes (clean start)
docker-compose -f docker-compose.dev.yml down -v
```

### Production
```bash
# Start production stack
docker-compose up -d

# View logs
docker-compose logs -f

# Scale services
docker-compose up --scale backend=2 --scale frontend=2

# Stop services
docker-compose down

# Complete cleanup
docker-compose down -v --rmi all
```

### Individual Services
```bash
# Start only backend
docker-compose up backend

# Start only frontend
docker-compose up frontend

# Rebuild specific service
docker-compose build backend
docker-compose up backend
```

## 🔍 Health Checks

- **Backend**: http://localhost:3001/health
- **Frontend**: http://localhost:5173

## 📊 Monitoring

### Container Status
```bash
# Check running containers
docker-compose ps

# View resource usage
docker stats
```

### Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend

# Follow logs
docker-compose logs -f frontend
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -tulpn | grep :3001
   
   # Change port in docker-compose.yml
   ports:
     - "3002:3001"  # Use port 3002 instead
   ```

2. **Permission denied**
   ```bash
   # Fix Docker permissions (Linux/Mac)
   sudo chown -R $USER:$USER .
   ```

3. **Out of disk space**
   ```bash
   # Clean up Docker
   docker system prune -a
   docker volume prune
   ```

4. **Build cache issues**
   ```bash
   # Force rebuild without cache
   docker-compose build --no-cache
   ```

### Reset Everything
```bash
# Complete reset
docker-compose down -v --rmi all
docker system prune -a
docker-compose up --build
```

## 🚀 Production Deployment

### With Docker Swarm
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml simple-web-stack
```

### With Kubernetes
```bash
# Convert compose to kubernetes
kompose convert -f docker-compose.yml

# Apply to cluster
kubectl apply -f .
```

## 🔐 Security Considerations

- Non-root user in containers
- Rate limiting configured
- CORS properly configured
- Health checks implemented

## 📈 Performance Tips

- Use multi-stage builds for smaller images
- Enable gzip compression
- Configure proper caching headers
- Use Docker layer caching
- Optimize package.json for better caching

## 🤝 Contributing

1. Make changes to source code
2. Test with development environment
3. Test with production environment
4. Update documentation if needed"# simple_web" 
