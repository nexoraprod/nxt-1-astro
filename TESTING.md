# 🧪 Testing Guide - nxt-1 astro

Panduan lengkap untuk menguji coba model nxt-1 astro

## 📋 Daftar Isi

1. [Quick Start Testing](#quick-start-testing)
2. [Web Interface Testing](#web-interface-testing)
3. [Automated Testing](#automated-testing)
4. [Benchmark Testing](#benchmark-testing)
5. [Manual API Testing](#manual-api-testing)
6. [Test Cases](#test-cases)

---

## 🚀 Quick Start Testing

### Cara Tercepat untuk Testing

```bash
# 1. Jalankan quick test script
python quick_test.py

# 2. Pilih opsi yang diinginkan:
#    1 - Open Web Test Interface
#    2 - Run Automated Tests
#    3 - Start Full Testing
#    4 - Run Benchmark Tests
```

Script ini akan:
- ✅ Check dependencies
- ✅ Start model server
- ✅ Open test interface di browser
- ✅ Run automated tests

---

## 🌐 Web Interface Testing

### Menggunakan test-model.html

**Buka file di browser:**
```bash
# Option 1: Langsung buka file
open test-model.html  # Mac
xdg-open test-model.html  # Linux
start test-model.html  # Windows

# Option 2: Via quick_test.py
python quick_test.py
# Pilih opsi 1
```

**Fitur Web Interface:**
- 📝 Input prompt dengan text area
- ⚙️ Kontrol parameter (temperature, top_p, max_tokens)
- 📊 Real-time statistics (tokens, latency, speed)
- 💡 Contoh prompt siap pakai
- 🎨 UI yang user-friendly

**Cara Menggunakan:**
1. Masukkan prompt di text area
2. Atur parameter sesuai kebutuhan
3. Klik "Generate Text" atau tekan Ctrl+Enter
4. Lihat hasil di output box
5. Check statistics di bawah

---

## 🧪 Automated Testing

### Menggunakan test_model.py

**Jalankan test suite:**
```bash
# Basic test
python test_model.py

# Dengan custom API URL
python test_model.py http://localhost:8000
```

**Test yang Dijalankan:**
1. ✅ Basic Generation - Test generation sederhana
2. ✅ Creative Writing - Test kemampuan menulis kreatif
3. ✅ Knowledge - Test pengetahuan umum
4. ✅ Code Generation - Test generation kode
5. ✅ Reasoning - Test kemampuan reasoning
6. ✅ Multilingual - Test kemampuan multi-bahasa
7. ✅ Math - Test kemampuan matematika

**Output:**
```
============================================================
🚀 NXT-1 ASTRO MODEL TEST SUITE
============================================================

🔗 API URL: http://localhost:8000
Checking API availability...
✅ API is available!

============================================================
📝 Running: Basic Generation
============================================================

🧪 Testing: Halo, apa kabar?...
✅ Status: SUCCESS
⏱️  Latency: 1.23s
📊 Tokens: 15
⚡ Speed: 12.20 tokens/sec
📝 Response: Halo! Saya baik-baik saja...

...

============================================================
📊 TEST SUMMARY
============================================================

Total Tests: 7
✅ Passed: 7
❌ Failed: 0
📈 Success Rate: 100.0%

⏱️  Average Latency: 1.45s
📊 Average Tokens: 45.3
⚡ Average Speed: 31.2 tokens/sec

============================================================
💾 Results saved to test_results.json
```

---

## 📊 Benchmark Testing

### Menggunakan benchmark_test.py

**Jalankan benchmark:**
```bash
python benchmark_test.py
```

**Benchmark Metrics:**
- Latency (waktu respons)
- Tokens per second (kecepatan generation)
- Consistency (stabilitas performa)

**Output Example:**
```
============================================================
📊 BENCHMARK TEST
============================================================

Test 1/10: Jelaskan apa itu machine learning...
  ✅ Latency: 1.23s | Tokens: 45 | Speed: 36.59 tok/s

Test 2/10: Tulis cerita pendek tentang AI...
  ✅ Latency: 2.15s | Tokens: 89 | Speed: 41.40 tok/s

...

============================================================
📈 BENCHMARK RESULTS
============================================================
Total Tests: 10
Average Latency: 1.67s
Median Latency: 1.54s
Min Latency: 1.12s
Max Latency: 2.89s
Std Dev: 0.45s

Average Speed: 35.42 tokens/sec
Max Speed: 45.21 tokens/sec
============================================================
```

---

## 🔧 Manual API Testing

### Menggunakan cURL

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Generate Text:**
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Jelaskan apa itu machine learning",
    "max_tokens": 100,
    "temperature": 0.7,
    "top_p": 0.9
  }'
```

**Response Format:**
```json
{
  "text": "Machine learning adalah...",
  "tokens_generated": 45,
  "latency_ms": 1234,
  "model": "nxt-1-astro-prototype"
}
```

### Menggunakan Python Requests

```python
import requests

# Health check
response = requests.get("http://localhost:8000/health")
print(response.json())

# Generate text
response = requests.post(
    "http://localhost:8000/generate",
    json={
        "prompt": "Apa itu deep learning?",
        "max_tokens": 100,
        "temperature": 0.7
    }
)
print(response.json())
```

---

## 📝 Test Cases

### Test Case 1: Basic Conversation
**Prompt:** "Halo, apa kabar?"
**Expected:** Response natural dan relevan

### Test Case 2: Knowledge Question
**Prompt:** "Jelaskan apa itu transformer architecture"
**Expected:** Penjelasan teknis yang akurat

### Test Case 3: Creative Writing
**Prompt:** "Tulis cerita pendek tentang robot yang belajar tentang emosi"
**Expected:** Cerita kreatif dengan struktur yang baik

### Test Case 4: Code Generation
**Prompt:** "Tulis fungsi Python untuk fibonacci sequence"
**Expected:** Kode Python yang valid dan berfungsi

### Test Case 5: Reasoning
**Prompt:** "Jika semua kucing adalah hewan, dan semua hewan butuh makanan, apakah kucing butuh makanan?"
**Expected:** Jawaban logis yang benar

### Test Case 6: Mathematics
**Prompt:** "Berapa hasil dari 15 * 23 + 47?"
**Expected:** Jawaban matematika yang benar (392)

### Test Case 7: Multilingual
**Prompt:** "Translate to English: Saya sedang belajar machine learning"
**Expected:** Terjemahan yang akurat

### Test Case 8: Long Context
**Prompt:** (Text panjang 500+ tokens)
**Expected:** Model bisa handle context panjang

### Test Case 9: Temperature Variation
**Prompt:** Sama, tapi dengan temperature berbeda (0.1, 0.7, 1.5)
**Expected:** Output bervariasi sesuai temperature

### Test Case 10: Edge Cases
**Prompt:** "", "   ", "???", special characters
**Expected:** Model handle edge cases dengan baik

---

## 🎯 Testing Checklist

### Pre-Testing
- [ ] Model server running
- [ ] API accessible (check /health endpoint)
- [ ] Dependencies installed
- [ ] Test files available

### During Testing
- [ ] Test all basic functionalities
- [ ] Test with different parameters
- [ ] Test edge cases
- [ ] Monitor performance metrics
- [ ] Check for errors in logs

### Post-Testing
- [ ] Review test results
- [ ] Analyze performance metrics
- [ ] Identify issues or bugs
- [ ] Document findings
- [ ] Save test results

---

## 🐛 Troubleshooting

### Server Not Starting
```bash
# Check if port 8000 is available
lsof -i :8000  # Mac/Linux
netstat -ano | findstr :8000  # Windows

# Kill process if needed
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### API Not Responding
```bash
# Check server logs
tail -f server.log

# Restart server
pkill -f server.py
python server.py
```

### Dependencies Missing
```bash
# Install required packages
pip install torch flask requests

# Or use requirements.txt
pip install -r requirements.txt
```

---

## 📈 Performance Metrics

### Good Performance
- Latency: < 2s untuk 100 tokens
- Speed: > 20 tokens/sec
- Success Rate: > 95%

### Average Performance
- Latency: 2-5s untuk 100 tokens
- Speed: 10-20 tokens/sec
- Success Rate: 80-95%

### Poor Performance
- Latency: > 5s untuk 100 tokens
- Speed: < 10 tokens/sec
- Success Rate: < 80%

---

## 📚 Additional Resources

- [Model Architecture](./ARCHITECTURE.md)
- [Training Guide](./TRAINING.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./API.md)

---

## 🎉 Success Criteria

Model dianggap berhasil jika:
- ✅ Bisa generate text yang koheren
- ✅ Latency < 3s untuk 100 tokens
- ✅ Success rate > 90%
- ✅ Handle berbagai jenis prompt
- ✅ Stabil dalam jangka waktu lama

---

**Happy Testing! 🚀**
