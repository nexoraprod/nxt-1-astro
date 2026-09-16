# 🔧 Quick Fix - Common Docker Errors

Panduan cepat untuk menyelesaikan error Docker yang umum terjadi.

---

## ❌ Error 1: `npm ci` Failed

### Error Message
```
ERROR [builder 4/6] RUN npm ci
npm error code EUSAGE
npm error The `npm ci` command can only install with an existing package-lock.json
```

### Penyebab
File `package-lock.json` tidak ada di repository.

### Solusi Cepat

#### Option 1: Generate package-lock.json
```bash
# Generate package-lock.json
npm install

# Commit file
git add package-lock.json
git commit -m "Add package-lock.json"

# Build lagi
docker build -t 1astro/nxt-1-astro:latest .
```

#### Option 2: Gunakan npm install di Dockerfile
Edit `Dockerfile` baris 11:
```dockerfile
# Ganti dari:
RUN npm ci

# Menjadi:
RUN npm install
```

**Catatan:** `npm install` lebih lambat tapi tidak butuh package-lock.json

#### Option 3: Gunakan Script Otomatis
```bash
chmod +x scripts/build-and-push.sh
./scripts/build-and-push.sh
```

Script akan otomatis generate package-lock.json jika tidak ada.

---

## ❌ Error 2: Docker Registry Not Found

### Error Message
```
The push refers to repository [docker.io/your-registry/nxt-1-astro]
tag does not exist: your-registry/nxt-1-astro:latest
Error response from daemon: pull access denied for your-registry/nxt-1-astro
```

### Penyebab
Image name masih menggunakan placeholder `your-registry` atau belum login ke Docker Hub.

### Solusi Cepat

#### Step 1: Login ke Docker Hub
```bash
docker login
# Masukkan username dan password Docker Hub
```

#### Step 2: Build dengan Nama yang Benar
```bash
# Build dengan nama yang benar
docker build -t nexoraprod/nxt-1-astro:latest .

# Push ke Docker Hub
docker push nexoraprod/nxt-1-astro:latest
```

#### Step 3: Update docker-compose.yml
Pastikan image name sudah benar di semua docker-compose files:

**docker-compose.yml:**
```yaml
services:
  app-prod:
    image: nexoraprod/nxt-1-astro:latest
```

**docker-compose.prod.yml:**
```yaml
services:
  app:
    image: ${DOCKER_IMAGE:-nexoraprod/nxt-1-astro:latest}
```

**docker-compose.full.yml:**
```yaml
services:
  app:
    image: nexoraprod/nxt-1-astro:latest
```

#### Option 4: Gunakan Script Otomatis
```bash
chmod +x scripts/build-and-push.sh
./scripts/build-and-push.sh
```

---

## ❌ Error 3: Permission Denied

### Error Message
```
docker: Error response from daemon: pull access denied for nexoraprod/nxt-1-astro
```

### Penyebab
- Belum login ke Docker Hub
- Token expired
- Repository private tapi tidak punya access

### Solusi

#### Check Login Status
```bash
docker info | grep Username
```

#### Login Ulang
```bash
# Logout
docker logout

# Login lagi
docker login
```

#### Generate New Token
1. Buka: https://hub.docker.com/settings/security
2. Click "New Security Token"
3. Copy token
4. Gunakan token sebagai password saat `docker login`

---

## ❌ Error 4: Build Context Failed

### Error Message
```
unable to prepare context: path "Dockerfile" not found
```

### Penyebab
File Dockerfile tidak ada atau nama file salah.

### Solusi
```bash
# Check file ada
ls -la Dockerfile*

# Jika tidak ada, buat dari template
# Atau copy dari backup
```

---

## ❌ Error 5: Port Already in Use

### Error Message
```
Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use
```

### Penyebab
Port 80 sudah digunakan oleh service lain.

### Solusi

#### Option 1: Gunakan Port Lain
```bash
# Run dengan port berbeda
docker run -d -p 8080:80 nexoraprod/nxt-1-astro:latest

# Access di http://localhost:8080
```

#### Option 2: Stop Service yang Menggunakan Port 80
```bash
# Check apa yang menggunakan port 80
sudo lsof -i :80

# Stop service
sudo systemctl stop nginx  # atau service lain
```

#### Option 3: Update docker-compose.yml
```yaml
services:
  app:
    ports:
      - "8080:80"  # Ganti 8080 dengan port yang tersedia
```

---

## ❌ Error 6: Out of Memory

### Error Message
```
ERROR: Cannot start service app: OCI runtime create failed: container_linux.go:380
```

### Penyebab
Docker kehabisan memory.

### Solusi

#### Increase Docker Memory
**Docker Desktop (Mac/Windows):**
1. Buka Docker Desktop
2. Settings → Resources
3. Increase Memory ke 4GB+

**Linux:**
```bash
# Edit Docker daemon config
sudo nano /etc/docker/daemon.json

# Tambahkan:
{
  "default-ulimits": {
    "memlock": {
      "Name": "memlock",
      "Soft": -1,
      "Hard": -1
    }
  }
}

# Restart Docker
sudo systemctl restart docker
```

#### Limit Container Memory
```bash
docker run -d \
  -p 80:80 \
  --memory="512m" \
  --memory-swap="1g" \
  nexoraprod/nxt-1-astro:latest
```

---

## 🎯 Quick Fix Commands

### Reset Semua dan Build Ulang
```bash
# Stop semua container
docker-compose down

# Remove semua images
docker rmi $(docker images -q nexoraprod/nxt-1-astro)

# Clean build cache
docker builder prune -a

# Generate package-lock.json
npm install

# Build ulang
docker build -t nexoraprod/nxt-1-astro:latest .

# Test
docker run -d -p 8080:80 nexoraprod/nxt-1-astro:latest
```

### Force Push ke Docker Hub
```bash
# Login
docker login

# Build
docker build -t nexoraprod/nxt-1-astro:latest .

# Force push
docker push --force nexoraprod/nxt-1-astro:latest
```

### Debug Build
```bash
# Build tanpa cache
docker build --no-cache -t nexoraprod/nxt-1-astro:latest .

# Build dengan verbose
docker build --progress=plain -t nexoraprod/nxt-1-astro:latest .
```

---

## 📋 Checklist Troubleshooting

### Sebelum Build
- [ ] Docker installed dan running
- [ ] Login ke Docker Hub (`docker login`)
- [ ] package-lock.json ada (atau gunakan `npm install`)
- [ ] Dockerfile ada dan benar
- [ ] Port 80 available atau gunakan port lain
- [ ] Memory cukup (4GB+ recommended)

### Saat Build Error
- [ ] Check error message
- [ ] Check Docker logs: `docker logs <container-id>`
- [ ] Check build logs: `docker build --progress=plain`
- [ ] Verify file permissions
- [ ] Check disk space: `df -h`

### Setelah Build
- [ ] Test locally: `docker run -p 8080:80 nexoraprod/nxt-1-astro:latest`
- [ ] Check website: http://localhost:8080
- [ ] Verify di Docker Hub
- [ ] Pull test dari mesin lain

---

## 🔍 Debug Commands

```bash
# Check Docker status
docker info

# Check running containers
docker ps

# Check all containers
docker ps -a

# Check images
docker images

# Check disk usage
docker system df

# Check logs
docker logs <container-id>

# Inspect container
docker inspect <container-id>

# Execute command in container
docker exec -it <container-id> /bin/sh
```

---

## 📞 Support

Jika masih ada masalah:

1. **Check DOCKER_HUB_GUIDE.md** - Panduan lengkap Docker Hub
2. **Check TROUBLESHOOTING.md** - Troubleshooting umum
3. **Use script**: `./scripts/build-and-push.sh`
4. **Create issue**: https://github.com/nexoraprod/nxt-1-astro/issues

---

<div align="center">

**Happy Fixing! 🔧**

</div>
