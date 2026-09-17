# 🔧 GitHub Actions Configuration Guide

Panduan lengkap untuk mengkonfigurasi GitHub Actions workflows agar berjalan tanpa error.

---

## ⚠️ Error yang Sering Terjadi

### 1. "Username and password required"

**Penyebab:**
GitHub Actions mencoba login ke Docker Hub atau deploy ke server, tapi credentials (secrets) belum dikonfigurasi.

**Solusi:**
Konfigurasi secrets yang diperlukan di repository settings (lihat bagian di bawah).

### 2. "Node.js 20 is deprecated"

**Penyebab:**
GitHub Actions akan menghentikan dukungan untuk Node.js 20 pada September 2025. Actions lama akan dipaksa berjalan di Node.js 24.

**Solusi:**
Workflow sudah diupdate untuk menggunakan Node.js 20.x dan 22.x. Tidak perlu tindakan tambahan.

---

## 🔑 Konfigurasi GitHub Secrets

### Step 1: Buka Repository Settings

1. Buka repository Anda di GitHub
2. Klik **Settings** (tab di atas)
3. Di sidebar kiri, klik **Secrets and variables** → **Actions**

### Step 2: Tambahkan Secrets

Klik **New repository secret** dan tambahkan secrets berikut:

#### Untuk Docker Hub (Optional - untuk build & push image)

| Secret Name | Value | Keterangan |
|-------------|-------|------------|
| `DOCKERHUB_USERNAME` | `1astro` | Username Docker Hub Anda |
| `DOCKERHUB_TOKEN` | `dckr_pat_...` | Access Token dari Docker Hub |

**Cara mendapatkan Docker Hub Token:**
1. Login ke https://hub.docker.com
2. Klik profile icon → **Account Settings**
3. Klik **Security** → **New Access Token**
4. Beri nama: `github-actions`
5. Permissions: **Read, Write, Delete**
6. Copy token dan paste ke GitHub Secrets

#### Untuk Server Deployment (Optional - untuk auto-deploy)

| Secret Name | Value | Keterangan |
|-------------|-------|------------|
| `SERVER_HOST` | `123.45.67.89` | IP address atau domain server |
| `SERVER_USERNAME` | `deploy` | Username SSH |
| `SERVER_SSH_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----...` | Private SSH key (full content) |
| `SERVER_PORT` | `22` | Port SSH (default: 22) |
| `SERVER_PATH` | `/opt/nxt-1-astro` | Path deployment di server |

**Cara mendapatkan SSH Key:**
```bash
# Generate SSH key (jika belum ada)
ssh-keygen -t ed25519 -C "github-actions"

# Copy public key ke server
ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@YOUR_SERVER_IP

# Copy private key ke GitHub Secrets
cat ~/.ssh/id_ed25519
# Copy seluruh output (termasuk BEGIN dan END)
```

### Step 3: Verify Secrets

Setelah menambahkan secrets, verify di halaman Secrets:
- ✅ `DOCKERHUB_USERNAME` - Configured
- ✅ `DOCKERHUB_TOKEN` - Configured
- ✅ `SERVER_HOST` - Configured
- ✅ `SERVER_USERNAME` - Configured
- ✅ `SERVER_SSH_KEY` - Configured

---

## 🔄 Workflow Behavior

### Jika Secrets Tidak Dikonfigurasi

Workflow akan **skip** job yang memerlukan secrets:

```
✅ Build and Test - Always runs
⏭️ Docker Build and Push - Skipped (secrets not configured)
⏭️ Deploy to Server - Skipped (secrets not configured)
```

### Jika Secrets Dikonfigurasi

Workflow akan **run** semua jobs:

```
✅ Build and Test - Runs
✅ Docker Build and Push - Runs
✅ Deploy to Server - Runs
```

---

## 📋 Checklist Konfigurasi

### Minimum Setup (Build Only)
- [ ] Tidak perlu secrets
- [ ] Workflow akan build dan test saja
- [ ] Docker build dan deploy akan di-skip

### Full Setup (Build + Docker + Deploy)
- [ ] `DOCKERHUB_USERNAME` configured
- [ ] `DOCKERHUB_TOKEN` configured
- [ ] `SERVER_HOST` configured
- [ ] `SERVER_USERNAME` configured
- [ ] `SERVER_SSH_KEY` configured
- [ ] Server sudah install Docker
- [ ] SSH access sudah dikonfigurasi

---

## 🧪 Testing Workflow

### Test Manual Trigger

1. Buka repository di GitHub
2. Klik **Actions** tab
3. Pilih workflow: **Deploy to Production** atau **CI/CD Pipeline**
4. Klik **Run workflow**
5. Pilih branch: `main`
6. Klik **Run workflow**

### Check Workflow Logs

1. Buka **Actions** tab
2. Klik workflow run yang ingin dilihat
3. Klik job untuk melihat logs
4. Check step-by-step execution

### Common Issues

#### Issue: "Secret not found"
**Solusi:** Verify secret name di repository settings (case-sensitive)

#### Issue: "Authentication failed"
**Solusi:** 
- Check token masih valid
- Check username benar
- Regenerate token jika perlu

#### Issue: "SSH connection failed"
**Solusi:**
- Check SSH key format (harus include BEGIN dan END)
- Check server firewall allow SSH
- Test SSH manual: `ssh deploy@YOUR_SERVER_IP`

---

## 🚀 Quick Setup Commands

### Generate SSH Key
```bash
# Generate key
ssh-keygen -t ed25519 -C "github-actions"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy to server
ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@YOUR_SERVER_IP

# Copy private key to clipboard (Mac)
cat ~/.ssh/id_ed25519 | pbcopy

# Copy private key to clipboard (Linux)
cat ~/.ssh/id_ed25519 | xclip -selection clipboard
```

### Test SSH Connection
```bash
ssh -T deploy@YOUR_SERVER_IP
# Should show: Welcome to Ubuntu... (or similar)
```

### Test Docker Hub Login
```bash
docker login -u YOUR_USERNAME -p YOUR_TOKEN
# Should show: Login Succeeded
```

---

## 📊 Workflow Comparison

### deploy.yml
- **Trigger:** Push ke `main` branch atau manual
- **Jobs:**
  1. Check secrets (skip jika tidak configured)
  2. Build and push Docker image (skip jika secrets tidak ada)
  3. Deploy to server (skip jika secrets tidak ada)

### ci-cd.yml
- **Trigger:** Push ke `main`/`develop` atau PR ke `main`
- **Jobs:**
  1. Build and test (always runs)
  2. Docker build and push (skip jika secrets tidak ada)
  3. Deploy to server (skip jika secrets tidak ada)
  4. Lighthouse audit (hanya untuk PR)

---

## 💡 Best Practices

### 1. Gunakan Personal Access Token (PAT)
Jangan gunakan password Docker Hub, gunakan PAT untuk security.

### 2. Rotate Tokens Secara Berkala
Ganti tokens setiap 90 hari untuk security.

### 3. Gunakan Environment Secrets
Untuk production, gunakan GitHub Environments dengan required reviewers.

### 4. Test Workflow Secara Manual
Sebelum push ke production, test workflow dengan manual trigger.

### 5. Monitor Workflow Runs
Check workflow runs secara berkala untuk detect issues.

---

## 🔍 Troubleshooting

### Workflow tidak berjalan
**Check:**
- Branch name benar (`main` bukan `master`)
- Workflow file ada di `.github/workflows/`
- Syntax YAML valid

### Job di-skip
**Check:**
- Secrets sudah dikonfigurasi
- Secret names case-sensitive
- Conditions di workflow file

### Build gagal
**Check:**
- Node.js version compatible
- Dependencies bisa di-install
- Build script tidak error

### Docker push gagal
**Check:**
- Docker Hub credentials valid
- Repository exists di Docker Hub
- Token punya write permission

### Deploy gagal
**Check:**
- SSH key valid
- Server accessible
- Docker installed di server
- docker-compose.yml ada di server

---

## 📞 Support

Jika masih ada masalah:
1. Check workflow logs di GitHub Actions
2. Verify secrets configuration
3. Test credentials secara manual
4. Create issue: https://github.com/nexoraprod/nxt-1-astro/issues

---

**Workflow configured successfully! 🎉**
