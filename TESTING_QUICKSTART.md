# 🧪 Quick Testing Guide - nxt-1 astro

Panduan cepat untuk menguji coba model nxt-1 astro

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
pip install torch flask requests
```

### Step 2: Start Model Server
```bash
python server.py
```

Server akan running di: **http://localhost:8000**

### Step 3: Test Model

**Option A: Web Interface (Recommended)**
```bash
# Buka file test-model.html di browser
# Atau jalankan:
python quick_test.py
# Pilih opsi 1
```

**Option B: Automated Tests**
```bash
python test_model.py
```

**Option C: Manual API Test**
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Jelaskan apa itu machine learning", "max_tokens": 100}'
```

---

## 📁 File Testing

| File | Fungsi |
|------|--------|
| `server.py` | API server untuk model |
| `test-model.html` | Web interface untuk testing |
| `test_model.py` | Automated test suite |
| `quick_test.py` | Quick start script |
| `benchmark_test.py` | Benchmark performance |
| `TESTING.md` | Dokumentasi lengkap |

---

## 🎯 Test Scenarios

### 1. Basic Generation
```
Prompt: "Halo, apa kabar?"
Expected: Response natural
```

### 2. Knowledge Question
```
Prompt: "Jelaskan apa itu transformer architecture"
Expected: Penjelasan teknis
```

### 3. Creative Writing
```
Prompt: "Tulis cerita pendek tentang robot"
Expected: Cerita kreatif
```

### 4. Code Generation
```
Prompt: "Tulis fungsi Python untuk fibonacci"
Expected: Kode Python valid
```

### 5. Reasoning
```
Prompt: "Jika semua kucing adalah hewan, apakah kucing butuh makanan?"
Expected: Jawaban logis
```

---

## 📊 Expected Results

### Good Performance
- ✅ Latency: < 2s
- ✅ Speed: > 20 tokens/sec
- ✅ Success Rate: > 95%

### Mock Mode (No Model File)
- ✅ Server tetap running
- ✅ Response berdasarkan keywords
- ✅ Berguna untuk testing API

---

## 🐛 Troubleshooting

### Server Not Starting
```bash
# Check port 8000
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>
```

### Dependencies Missing
```bash
pip install torch flask requests
```

### Model Not Found
```bash
# Server akan run dalam MOCK MODE
# Untuk train model:
python train.py
```

---

## 📈 Testing Workflow

```
1. Start Server
   ↓
2. Check Health (GET /health)
   ↓
3. Test Generation (POST /generate)
   ↓
4. Run Automated Tests
   ↓
5. Run Benchmark
   ↓
6. Review Results
```

---

## 🎉 Success Criteria

Model berhasil jika:
- ✅ Server running tanpa error
- ✅ API responsive (< 3s latency)
- ✅ Generate text yang koheren
- ✅ Handle berbagai prompt
- ✅ Stable dalam jangka panjang

---

## 📚 Next Steps

Setelah testing berhasil:
1. [Train Model](./TRAINING.md) - Train model dengan data Anda
2. [Fine-tune](./FINETUNING.md) - Fine-tune untuk task spesifik
3. [Deploy](./DEPLOYMENT.md) - Deploy ke production
4. [Monitor](./MONITORING.md) - Setup monitoring

---

**Happy Testing! 🚀**

Untuk dokumentasi lengkap, lihat [TESTING.md](./TESTING.md)
