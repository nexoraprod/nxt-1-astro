# 🚀 nxt-1 astro - Panduan Lengkap Membangun Model AI

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.0-3178C6.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)

**Panduan komprehensif untuk membangun model AI nxt-1 astro**

[Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Daftar Isi

- [Tentang](#-tentang)
- [Fitur](#-fitur)
- [Arsitektur](#-arsitektur)
- [Quick Start](#-quick-start)
- [Docker Setup](#-docker-setup)
- [Development](#-development)
- [Deployment](#-deployment)
- [Struktur Proyek](#-struktur-proyek)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Tentang

**nxt-1 astro** adalah panduan interaktif lengkap untuk membangun model AI skala besar. Website ini mencakup seluruh lifecycle pengembangan AI dengan **31 section komprehensif**:

### 📚 Konten Utama
- ✅ Blueprint arsitektur Transformer (nxt-1 astro Prototype)
- ✅ Implementasi kode lengkap (44+ file Python)
- ✅ Data Engineering & Synthetic Data Generation
- ✅ Training Loop & Distributed Training (DeepSpeed, FSDP)
- ✅ Fine-tuning (Full, LoRA, QLoRA)
- ✅ RAG (Retrieval-Augmented Generation) dengan Advanced Features
- ✅ Agent AI dengan Tool Use & Planning
- ✅ Multimodal (Vision, Audio, Video)
- ✅ Advanced Architectures (MoE, Long Context, FlashAttention)
- ✅ Evaluation & Benchmarking (MMLU, HumanEval, LLM-as-Judge)
- ✅ Safety & Alignment (Guardrails, Constitutional AI, Red Teaming)
- ✅ Monitoring & Observability (Prometheus, Grafana, Jaeger)
- ✅ BAGIAN D: Distributed Tracing, Centralized Logging, Drift Detection, A/B Testing, Audit Logging, Performance Profiling
- ✅ Optimasi Inferensi (KV Cache, Continuous Batching, Speculative Decoding, Quantization, Model Compilation, Streaming)
- ✅ Production Deployment dengan Docker & CI/CD

---

## ✨ Fitur

### 📚 Konten Edukatif
- **31 Section** mencakup seluruh AI development lifecycle
- **44+ File kode Python** production-ready
- **Diagram interaktif** untuk arsitektur kompleks
- **Perbandingan tools** dan framework
- **4 Learning Paths** (Pemula, Menengah, Lanjutan, Production)
- **BAGIAN D** - Observability lengkap (Tracing, Logging, Drift Detection, A/B Testing, Audit, Profiling)
- **8 Teknik Optimasi Inferensi** (KV Cache, Continuous Batching, Speculative Decoding, FlashAttention, Quantization, Compilation, Streaming, Benchmarking)

### 💻 Kode Examples
```python
# Contoh: GPT Model Implementation
class GPTModel(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.token_embedding = nn.Embedding(config.vocab_size, config.d_model)
        self.layers = nn.ModuleList([
            TransformerBlock(config) for _ in range(config.n_layers)
        ])
        # ... complete implementation
```

### 🎨 UI/UX
- Dark theme dengan aksen astro/space
- Animasi smooth dengan Framer Motion
- Responsive design (mobile-first)
- Code blocks dengan syntax highlighting
- Interactive navigation

---

## 🏗️ Arsitektur

### Tech Stack
- **Frontend**: React 18.3 + TypeScript 5.7
- **Styling**: Tailwind CSS 4.1
- **Animation**: Framer Motion 10.18
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build**: Vite 6.3
- **Container**: Docker + Nginx

### Project Structure
```
nxt-1-astro/
├── src/
│   ├── App.tsx           # Main application (31 sections, 8500+ lines)
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── dist/                 # Build output
├── scripts/
│   ├── deploy.sh         # Deployment script
│   ├── auto-deploy.sh    # Auto-deployment script
│   ├── setup.sh          # Setup script
│   └── setup-server.sh   # Server setup script
├── .github/
│   └── workflows/
│       ├── ci-cd.yml     # CI/CD pipeline
│       └── deploy.yml    # Deployment pipeline
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Docker orchestration
├── docker-compose.prod.yml # Production Docker setup
├── nginx.conf            # Nginx configuration
├── nginx-ssl.conf        # Nginx SSL configuration
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- Docker & Docker Compose (optional)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/1astro/nxt-1-astro.git
cd nxt-1-astro
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:3000
```

---

## 🐳 Docker Setup

### Development with Docker

```bash
# Build and start development container
docker-compose up app-dev

# Access at http://localhost:3000
```

### Production with Docker

```bash
# Build production image
docker build -t nxt-1-astro:latest .

# Run container
docker run -d -p 80:80 --name nxt-1-astro nxt-1-astro:latest

# Access at http://localhost
```

### Using Docker Compose (Production)

```bash
# Start production environment
docker-compose up -d app-prod

# Check logs
docker-compose logs -f app-prod

# Stop
docker-compose down
```

### Docker Commands

```bash
# Build image
docker build -t 1astro/nxt-1-astro:latest .

# List images
docker images | grep nxt-1-astro

# Run container
docker run -d -p 80:80 1astro/nxt-1-astro:latest

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi 1astro/nxt-1-astro:latest
```

### Build & Push ke Docker Hub

Untuk panduan lengkap build dan push ke Docker Hub, lihat **[DOCKER_HUB_GUIDE.md](./DOCKER_HUB_GUIDE.md)**

```bash
# Quick build & push
chmod +x scripts/build-and-push.sh
./scripts/build-and-push.sh

# Atau dengan version tag
./scripts/build-and-push.sh v1.5.0
```

---

## 💻 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Lint code
npm run lint
```

### Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=nxt-1-astro
```

---

## 🌐 Deployment

### Option 1: Docker (Recommended)

```bash
# Build and push to Docker Hub
docker build -t 1astro/nxt-1-astro:latest .
docker push 1astro/nxt-1-astro:latest

# Deploy to server
docker pull 1astro/nxt-1-astro:latest
docker run -d -p 80:80 1astro/nxt-1-astro:latest
```

Lihat **[DOCKER_HUB_GUIDE.md](./DOCKER_HUB_GUIDE.md)** untuk panduan lengkap.

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option 4: GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Deploy
npm run build
npx gh-pages -d dist
```

### Option 5: Traditional Server

```bash
# Build
npm run build

# Copy dist/ to web server
scp -r dist/* user@server:/var/www/html/
```

---

## 📁 Struktur Proyek

```
nxt-1-astro/
│
├── 📂 src/
│   ├── App.tsx              # Main app (27 sections)
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
│
├── 📂 public/               # Static assets
│
├── 📂 dist/                 # Build output (generated)
│
├── 🐳 Dockerfile            # Production image
├── 🐳 Dockerfile.dev        # Development image
├── 🐳 docker-compose.yml    # Docker orchestration
├── 🐳 .dockerignore         # Docker ignore
│
├── 🌐 nginx.conf            # Nginx config (HTTP)
├── 🌐 nginx-ssl.conf        # Nginx config (HTTPS)
│
├── 📝 package.json          # Dependencies
├── 📝 tsconfig.json         # TypeScript config
├── 📝 vite.config.js        # Vite config
│
├── 📝 .gitignore            # Git ignore
├── 📝 README.md             # This file
└── 📝 LICENSE               # MIT License
```

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **TypeScript** 5.7.0 - Type safety
- **Tailwind CSS** 4.1.7 - Utility-first CSS
- **Framer Motion** 10.18.0 - Animations
- **Lucide React** - Icons
- **Recharts** - Data visualization

### Build Tools
- **Vite** 6.3.5 - Build tool
- **TypeScript** - Type checking

### Deployment
- **Docker** - Containerization
- **Nginx** - Web server
- **GitHub Actions** - CI/CD (optional)

---

## 📊 Sections Overview (31 Section)

### 🏗️ Arsitektur & Fondasi
| # | Section | Deskripsi |
|---|---------|-----------|
| 1 | Overview | Komponen utama AI model |
| 2 | nxt-1 astro Blueprint | Arsitektur lengkap nxt-1 astro Prototype |
| 3 | Architecture | Transformer decoder-only implementation |
| 4 | Tokenization | BPE, SentencePiece, tokenizers |
| 5 | Data Engineering | Data pipeline, synthetic data generation |

### 🔄 Training & Fine-Tuning
| # | Section | Deskripsi |
|---|---------|-----------|
| 6 | Pipeline | 4 tahap training (Pretraining → SFT → RLHF → Deploy) |
| 7 | Training Loop | Mixed precision, gradient accumulation, distributed |
| 8 | Distributed Training | DeepSpeed ZeRO, PyTorch FSDP |
| 9 | Fine-Tuning | Full, LoRA, QLoRA dengan memory comparison |
| 10 | RLHF | PPO, DPO, reward modeling |

### 🚀 Advanced Features
| # | Section | Deskripsi |
|---|---------|-----------|
| 11 | RAG | Retrieval-Augmented Generation dengan advanced features |
| 12 | Agent AI | Tool use, planning, multi-step reasoning |
| 13 | Multimodal | Vision (LLaVA), Audio (Whisper/Bark), Video |
| 14 | Advanced Architectures | MoE, Long Context, FlashAttention |
| 15 | Evaluation | Benchmarks (MMLU, HumanEval), LLM-as-Judge |
| 16 | Safety | Guardrails, Constitutional AI, Red Teaming |

### 🔭 BAGIAN D: Observability
| # | Section | Deskripsi |
|---|---------|-----------|
| 17 | Monitoring | Prometheus, Grafana, alerting |
| 18 | Observability | Distributed tracing, centralized logging, drift detection, A/B testing, audit logging, performance profiling |

### ⚡ Optimasi
| # | Section | Deskripsi |
|---|---------|-----------|
| 19 | Optimasi Inferensi | KV Cache, Continuous Batching, Speculative Decoding, FlashAttention, Quantization, Compilation, Streaming, Benchmarking |
| 20 | Optimasi | Memory, cost, inference optimization |

### 🛠️ Tools & Resources
| # | Section | Deskripsi |
|---|---------|-----------|
| 21 | Tools | Frameworks & libraries comparison |
| 22 | Resources | Cost estimation, GPU requirements |
| 23 | Deployment | vLLM, quantization, FastAPI server |

### 🗺️ Roadmap & Learning
| # | Section | Deskripsi |
|---|---------|-----------|
| 24 | Roadmap | 7-phase development timeline |
| 25 | Features | Advanced capabilities (1M context, multi-modal, etc.) |
| 26 | Quick Start | 4 learning paths (Pemula → Production) |
| 27 | Getting Started | Step-by-step guide |
| 28 | Learning | Resources, papers, courses |

### 📦 Additional Sections
| # | Section | Deskripsi |
|---|---------|-----------|
| 29 | Hero Section | Landing page dengan animasi |
| 30 | Navigation | 17 menu items dengan responsive design |
| 31 | Footer | Links dan credits |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Report Issues
- Found a bug? [Open an issue](https://github.com/1astro/nxt-1-astro/issues)
- Have a suggestion? We'd love to hear it!

### Submit Changes
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) - Transformers & Datasets
- [OpenAI](https://openai.com/) - GPT research
- [Meta AI](https://ai.meta.com/) - LLaMA models
- [Andrej Karpathy](https://karpathy.ai/) - Educational content
- [LangChain](https://langchain.com/) - RAG & Agents

---

## 🚀 Deploy

### 📖 Panduan Deploy

- **[LOCAL_DEPLOY.md](./LOCAL_DEPLOY.md)** - Deploy lokal dengan monitoring stack (recommended)
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start 5 menit
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Panduan deployment lengkap ke server

### 🎯 Quick Local Deploy

```bash
# 1. Clone repository
git clone https://github.com/1astro/nxt-1-astro.git
cd nxt-1-astro

# 2. Make scripts executable
chmod +x scripts/*.sh

# 3. Run quick deploy (pilih opsi 2 untuk website + monitoring)
./scripts/quick-deploy.sh
```

### 🐳 Docker Commands

```bash
# Deploy website only
docker-compose -f docker-compose.prod.yml up -d

# Deploy dengan monitoring stack
docker-compose -f docker-compose.full.yml up -d

# Access services
# Website:   http://localhost
# Grafana:   http://localhost:3000 (admin/admin)
# Prometheus: http://localhost:9090
# Jaeger:    http://localhost:16686
```

### Auto Deploy dengan GitHub Actions

Setup GitHub secrets:
- `DOCKERHUB_USERNAME` - Username Docker Hub
- `DOCKERHUB_TOKEN` - Access Token Docker Hub
- `SERVER_HOST` - IP server
- `SERVER_USERNAME` - Username SSH
- `SERVER_SSH_KEY` - Private SSH key
- `SERVER_PATH` - `/opt/nxt-1-astro`

Setiap push ke `main` branch akan auto deploy! 🚀

---

## 🔧 Troubleshooting

### GitHub Publishing Failed?

Jika mengalami masalah saat push ke GitHub:

1. **Gunakan Script Helper**:
```bash
chmod +x scripts/push-to-github.sh
./scripts/push-to-github.sh
```

2. **Check TROUBLESHOOTING.md** - Panduan lengkap untuk:
   - Merge conflicts
   - Authentication failed
   - Branch tidak sinkron
   - File terlalu besar
   - Permission denied

3. **Quick Fix**:
```bash
# Pull dulu untuk sync
git pull --rebase origin main

# Jika ada konflik, resolve manual
# Kemudian push
git push origin main
```

4. **Force Push (Last Resort)**:
```bash
# ⚠️ WARNING: Overwrite remote!
git push --force origin main
```

Lihat [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) untuk panduan lengkap.

---

## 📧 Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **LinkedIn**: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=1astro/nxt-1-astro&type=Date)](https://star-history.com/#1astro/nxt-1-astro&Date)

---

<div align="center">

**Made with ❤️ for the AI community**

[⬆ Back to Top](#-nxt-1-astro---panduan-lengkap-membangun-model-ai)

</div>
