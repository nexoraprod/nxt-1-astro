# 🚀 nxt-1 astro - Panduan Lengkap Membangun Model AI

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.0-3178C6.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)

**Panduan komprehensif untuk membangun model AI seperti GPT-6 Astra**

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

**nxt-1 astro** adalah panduan interaktif lengkap untuk membangun model AI skala besar seperti GPT-6. Website ini mencakup seluruh lifecycle pengembangan AI:

- ✅ Blueprint arsitektur Transformer
- ✅ Implementasi kode lengkap (25+ file Python)
- ✅ Training & optimization techniques
- ✅ Fine-tuning (Full, LoRA, QLoRA)
- ✅ RAG (Retrieval-Augmented Generation)
- ✅ Agent AI & Tool Use
- ✅ Multimodal (Vision, Audio, Video)
- ✅ Advanced architectures (MoE, Long Context)
- ✅ Evaluation & benchmarking
- ✅ Safety & alignment
- ✅ Production deployment

---

## ✨ Fitur

### 📚 Konten Edukatif
- **27 Section** mencakup seluruh AI development lifecycle
- **25+ File kode Python** production-ready
- **Diagram interaktif** untuk arsitektur kompleks
- **Perbandingan tools** dan framework

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
│   ├── App.tsx           # Main application (27 sections)
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── dist/                 # Build output
├── Dockerfile            # Production Docker image
├── Dockerfile.dev        # Development Docker image
├── docker-compose.yml    # Docker orchestration
├── nginx.conf            # Nginx configuration
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
git clone https://github.com/nexoraprod/nxt-1-astro.git
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
docker build -t nxt-1-astro:latest .

# List images
docker images | grep nxt-1-astro

# Run container
docker run -d -p 80:80 nxt-1-astro:latest

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi nxt-1-astro:latest
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
# Build and push to registry
docker build -t your-registry/nxt-1-astro:latest .
docker push your-registry/nxt-1-astro:latest

# Deploy to server
docker pull your-registry/nxt-1-astro:latest
docker run -d -p 80:80 your-registry/nxt-1-astro:latest
```

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

## 📊 Sections Overview

| # | Section | Deskripsi |
|---|---------|-----------|
| 1 | Overview | Komponen utama AI model |
| 2 | GPT-6 Astra Blueprint | Arsitektur lengkap |
| 3 | Architecture | Transformer decoder-only |
| 4 | Tokenization | BPE, SentencePiece |
| 5 | Data Engineering | Data pipeline |
| 6 | Pipeline | 4 tahap training |
| 7 | Training Loop | Optimization techniques |
| 8 | Distributed Training | DeepSpeed, FSDP |
| 9 | Fine-Tuning | Full, LoRA, QLoRA |
| 10 | RAG | Retrieval-Augmented Generation |
| 11 | Agent AI | Tool use, planning |
| 12 | Multimodal | Vision, audio, video |
| 13 | Advanced Architectures | MoE, long context |
| 14 | Evaluation | Benchmarks, LLM-as-judge |
| 15 | Safety | Guardrails, red teaming |
| 16 | Tools | Frameworks & libraries |
| 17 | RLHF | PPO, DPO |
| 18 | Resources | Cost estimation |
| 19 | Deployment | vLLM, quantization |
| 20 | Roadmap | Development timeline |
| 21 | Features | Advanced capabilities |
| 22 | Quick Start | Setup guide |
| 23 | Getting Started | Learning path |
| 24 | Learning | Resources & papers |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Report Issues
- Found a bug? [Open an issue](https://github.com/nexoraprod/nxt-1-astro/issues)
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

## 🚀 Deploy dari GitHub

Untuk panduan lengkap deployment dari GitHub repository, lihat:

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start 5 menit
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Panduan deployment lengkap

### Quick Deploy Commands

```bash
# 1. Fork & clone repository
git clone https://github.com/nexoraprod/nxt-1-astro.git
cd nxt-1-astro

# 2. Build & push ke Docker Hub
docker build -t nexoraprod/nxt-1-astro:latest .
docker push nexoraprod/nxt-1-astro:latest

# 3. Deploy ke server
ssh YOUR_SERVER "cd /opt/nxt-1-astro && docker-compose pull && docker-compose up -d"
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

## 📧 Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **LinkedIn**: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=nexoraprod/nxt-1-astro&type=Date)](https://star-history.com/#nexoraprod/nxt-1-astro&Date)

---

<div align="center">

**Made with ❤️ for the AI community**

[⬆ Back to Top](#-nxt-1-astro---panduan-lengkap-membangun-model-ai)

</div>
