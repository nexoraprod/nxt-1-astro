# 🔧 Troubleshooting GitHub Publishing

Panduan lengkap untuk menyelesaikan masalah saat push ke GitHub.

---

## 🚨 Masalah Umum & Solusi

### 1. **Konflik Merge (Merge Conflicts)**

**Gejala:**
```
CONFLICT (content): Merge conflict in src/App.tsx
Automatic merge failed; fix conflicts and then commit the result.
```

**Solusi:**

#### Option A: Resolve Manual
```bash
# Lihat file yang konflik
git status

# Edit file yang konflik
# Cari marker: <<<<<<< HEAD, =======, >>>>>>> branch-name

# Setelah resolve, stage file
git add src/App.tsx

# Commit
git commit -m "Resolve merge conflicts"

# Push
git push origin main
```

#### Option B: Abort dan Pull Ulang
```bash
# Abort merge
git merge --abort

# Pull dengan rebase
git pull --rebase origin main

# Jika masih konflik, resolve manual lalu:
git rebase --continue
```

#### Option C: Force Push (⚠️ HATI-HATI)
```bash
# WARNING: Ini akan overwrite perubahan di remote!
git push --force origin main
```

---

### 2. **Authentication Failed**

**Gejala:**
```
remote: Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Solusi:**

#### Check SSH Key
```bash
# Check apakah SSH key ada
ls -la ~/.ssh

# Generate SSH key jika belum ada
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

#### Add SSH Key ke GitHub
1. Buka https://github.com/settings/keys
2. Click "New SSH key"
3. Paste public key
4. Test connection:
```bash
ssh -T git@github.com
```

#### Gunakan HTTPS sebagai Alternative
```bash
# Change remote URL ke HTTPS
git remote set-url origin https://github.com/1astro/nxt-1-astro.git

# Push lagi
git push origin main
```

---

### 3. **Branch Tidak Sinkron**

**Gejala:**
```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'github.com:nexoraprod/nxt-1-astro.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally.
```

**Solusi:**

#### Pull Dulu
```bash
# Pull perubahan dari remote
git pull origin main

# Jika ada konflik, resolve dulu
# Kemudian push
git push origin main
```

#### Rebase
```bash
# Rebase local changes ke remote
git pull --rebase origin main

# Jika ada konflik, resolve lalu:
git rebase --continue

# Push
git push origin main
```

---

### 4. **File Terlalu Besar**

**Gejala:**
```
remote: error: File dist/assets/index-xxx.js is 1.5 MB; this exceeds GitHub's file size limit of 100 MB
```

**Solusi:**

#### Tambahkan ke .gitignore
```bash
# Edit .gitignore
echo "dist/" >> .gitignore
echo "*.log" >> .gitignore
echo "node_modules/" >> .gitignore

# Remove dari git cache
git rm -r --cached dist/
git rm -r --cached node_modules/

# Commit
git commit -m "Remove large files from tracking"

# Push
git push origin main
```

#### Gunakan Git LFS (Large File Storage)
```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.pdf"
git lfs track "*.zip"

# Add .gitattributes
git add .gitattributes

# Commit
git commit -m "Track large files with LFS"
```

---

### 5. **Repository Tidak Ditemukan**

**Gejala:**
```
ERROR: Repository not found.
fatal: Could not read from remote repository.
```

**Solusi:**

#### Check Remote URL
```bash
# Lihat remote URL
git remote -v

# Jika salah, set ulang
git remote set-url origin https://github.com/nexoraprod/nxt-1-astro.git
```

#### Buat Repository di GitHub
1. Buka https://github.com/new
2. Repository name: `nxt-1-astro`
3. Visibility: Public/Private
4. **JANGAN** initialize dengan README
5. Click "Create repository"
6. Copy URL dan set remote:
```bash
git remote add origin https://github.com/nexoraprod/nxt-1-astro.git
```

---

### 6. **Permission Denied**

**Gejala:**
```
remote: Permission to nexoraprod/nxt-1-astro.git denied to username.
fatal: unable to access 'https://github.com/nexoraprod/nxt-1-astro.git'
```

**Solusi:**

#### Check Credentials
```bash
# Lihat credential helper
git config credential.helper

# Clear credentials
git credential reject <<EOF
protocol=https
host=github.com
EOF

# Push lagi, akan diminta login
git push origin main
```

#### Gunakan Personal Access Token
1. Buka https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `repo`
4. Copy token
5. Gunakan sebagai password saat push

---

## 🛠️ Script Helper

### Gunakan Script Otomatis

```bash
# Make script executable
chmod +x scripts/push-to-github.sh

# Run script
./scripts/push-to-github.sh
```

Script ini akan:
- ✅ Check git status
- ✅ Detect conflicts
- ✅ Auto commit changes
- ✅ Pull & rebase jika perlu
- ✅ Push ke GitHub
- ✅ Verify push success

---

## 📋 Checklist Troubleshooting

### Sebelum Push
- [ ] Git installed dan configured
- [ ] SSH key atau HTTPS credentials ready
- [ ] Repository exists di GitHub
- [ ] Remote URL correct
- [ ] No uncommitted changes
- [ ] No merge conflicts
- [ ] Files under 100MB

### Saat Push Gagal
- [ ] Check error message
- [ ] Check internet connection
- [ ] Verify GitHub credentials
- [ ] Check repository permissions
- [ ] Check file sizes
- [ ] Check branch name

### Setelah Push
- [ ] Verify di GitHub website
- [ ] Check commit history
- [ ] Verify files uploaded
- [ ] Check GitHub Actions (jika ada)

---

## 🎯 Quick Fix Commands

### Reset dan Push Ulang
```bash
# Reset ke commit terakhir
git reset --hard HEAD

# Pull dari remote
git pull origin main

# Push
git push origin main
```

### Clean dan Push
```bash
# Clean untracked files
git clean -fd

# Reset staged changes
git reset HEAD

# Add all
git add -A

# Commit
git commit -m "Clean commit"

# Push
git push origin main
```

### Force Push (Last Resort)
```bash
# ⚠️ WARNING: Overwrite remote!
git push --force origin main
```

---

## 📞 Support

Jika masih ada masalah:

1. **Check GitHub Status**: https://www.githubstatus.com/
2. **GitHub Docs**: https://docs.github.com/en/get-started
3. **Stack Overflow**: Search error message
4. **Create Issue**: https://github.com/nexoraprod/nxt-1-astro/issues

---

## 🔍 Debug Commands

```bash
# Check git config
git config --list

# Check remote
git remote -v

# Check branch
git branch -a

# Check log
git log --oneline -10

# Check status
git status

# Check diff
git diff

# Check staged
git diff --cached
```

---

<div align="center">

**Happy Coding! 🚀**

</div>
