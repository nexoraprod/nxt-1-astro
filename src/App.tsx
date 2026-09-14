import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Cpu, Database, Layers, Code2, Rocket, BookOpen,
  ChevronDown, ChevronRight, Zap, Globe, Server, BarChart3,
  ArrowRight, ExternalLink, Copy, Check, Menu, X, Sparkles,
  TrendingUp, DollarSign, Clock, Users, Star, Orbit
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// ============ NAVIGATION ============
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#gpt6-astra', label: 'GPT-6 Astra' },
    { href: '#architecture', label: 'Arsitektur' },
    { href: '#pipeline', label: 'Pipeline' },
    { href: '#training', label: 'Training' },
    { href: '#rlhf', label: 'RLHF' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#deployment', label: 'Deploy' },
    { href: '#learning', label: 'Belajar' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Orbit className="w-6 h-6 text-purple-400" />
              <Star className="w-2.5 h-2.5 text-yellow-400 absolute top-0 right-0 fill-yellow-400" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">nxt-1 <span className="text-purple-400">astro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <a key={link.href} href={link.href} className="text-sm text-gray-300 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950/95 border-b border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map(link => (
                <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.1,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-purple-300">nxt-1 astro — Panduan Lengkap AI</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              nxt-1 astro
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Jelajahi galaksi AI — dari arsitektur Transformer hingga deployment. Panduan komprehensif
            untuk membangun model AI skala besar seperti GPT-6, dari nol hingga produksi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#architecture" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-purple-500/25">
              <Rocket className="w-5 h-5" />
              Mulai Belajar
            </a>
            <a href="#pipeline" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all hover:scale-105 border border-gray-700">
              <Layers className="w-5 h-5" />
              Lihat Pipeline
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Brain, label: 'Transformer', value: 'Architecture' },
            { icon: Database, label: 'Dataset', value: 'Triliunan Token' },
            { icon: Server, label: 'GPU', value: 'Ribuan H100' },
            { icon: TrendingUp, label: 'Parameter', value: 'Miliaran' },
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50 backdrop-blur-sm">
              <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============ OVERVIEW SECTION ============
function OverviewSection() {
  const components = [
    { icon: Layers, title: 'Architecture', desc: 'Transformer (Decoder-only, seperti GPT)', color: 'purple' },
    { icon: Database, title: 'Data', desc: 'Dataset teks dalam jumlah sangat besar (triliunan token)', color: 'blue' },
    { icon: Cpu, title: 'Compute', desc: 'Ribuan GPU/A100/H100 selama berbulan-bulan', color: 'cyan' },
    { icon: Brain, title: 'Training', desc: 'Pretraining → Fine-tuning → RLHF/Alignment', color: 'pink' },
    { icon: BarChart3, title: 'Evaluation', desc: 'Benchmark seperti MMLU, HumanEval, dll.', color: 'green' },
  ];

  const colorMap: Record<string, string> = {
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20 text-purple-400',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
    pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/20 text-pink-400',
    green: 'from-green-500/20 to-green-500/5 border-green-500/20 text-green-400',
  };

  return (
    <section id="overview" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Komponen Utama
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Lima pilar fundamental dalam membangun model AI skala besar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {components.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-b border backdrop-blur-sm hover:scale-105 transition-transform ${colorMap[comp.color]}`}
            >
              <comp.icon className="w-8 h-8 mb-4" />
              <h3 className="text-white font-semibold mb-2">{comp.title}</h3>
              <p className="text-gray-400 text-sm">{comp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ CODE BLOCK ============
function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-950">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/50 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm text-gray-400 ml-2">{title}</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  );
}

// ============ ARCHITECTURE SECTION ============
function ArchitectureSection() {
  const [showCode, setShowCode] = useState(false);

  const code = `import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        self.head_dim = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
    
    def forward(self, x, mask=None):
        B, T, C = x.shape
        Q = self.W_q(x).view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        K = self.W_k(x).view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        V = self.W_v(x).view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        
        scores = (Q @ K.transpose(-2, -1)) / math.sqrt(self.head_dim)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        
        attn = torch.softmax(scores, dim=-1)
        out = (attn @ V).transpose(1, 2).contiguous().view(B, T, C)
        return self.W_o(out)

class GPTModel(nn.Module):
    def __init__(self, vocab_size=50257, d_model=768, num_heads=12, 
                 num_layers=12, max_seq_len=1024):
        super().__init__()
        self.token_embed = nn.Embedding(vocab_size, d_model)
        self.pos_embed = nn.Embedding(max_seq_len, d_model)
        self.blocks = nn.ModuleList([
            TransformerBlock(d_model, num_heads) for _ in range(num_layers)
        ])
        self.ln_f = nn.LayerNorm(d_model)
        self.lm_head = nn.Linear(d_model, vocab_size, bias=False)
    
    def forward(self, idx, targets=None):
        B, T = idx.shape
        pos = torch.arange(0, T, dtype=torch.long, device=idx.device).unsqueeze(0)
        x = self.token_embed(idx) + self.pos_embed(pos)
        
        mask = torch.tril(torch.ones(T, T, device=idx.device))
        for block in self.blocks:
            x = block(x, mask)
        
        logits = self.lm_head(self.ln_f(x))
        loss = None
        if targets is not None:
            loss = nn.CrossEntropyLoss()(
                logits.view(-1, logits.size(-1)), targets.view(-1)
            )
        return logits, loss`;

  return (
    <section id="architecture" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Arsitektur Transformer
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Implementasi dasar model GPT menggunakan PyTorch — fondasi untuk model skala besar
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Komponen Model</h3>
            {[
              { name: 'Token Embedding', desc: 'Mengubah token menjadi vektor representasi', icon: '🔤' },
              { name: 'Positional Encoding', desc: 'Menambahkan informasi posisi ke setiap token', icon: '📍' },
              { name: 'Multi-Head Attention', desc: 'Mekanisme perhatian untuk menangkap konteks', icon: '👁️' },
              { name: 'Feed-Forward Network', desc: 'Transformasi non-linear per posisi', icon: '⚡' },
              { name: 'Layer Normalization', desc: 'Stabilisasi training', icon: '📊' },
              { name: 'Causal Mask', desc: 'Mencegah melihat token masa depan', icon: '🔒' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800/50">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-white font-medium text-sm">{item.name}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Konfigurasi Model</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'd_model', value: '768', sub: 'Hidden dimension' },
                { label: 'num_heads', value: '12', sub: 'Attention heads' },
                { label: 'num_layers', value: '12', sub: 'Transformer blocks' },
                { label: 'max_seq_len', value: '1024', sub: 'Context window' },
                { label: 'vocab_size', value: '50,257', sub: 'BPE tokens' },
                { label: 'd_ff', value: '3,072', sub: 'FFN dimension (4x)' },
              ].map((cfg, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                  <div className="text-purple-400 font-mono text-sm">{cfg.label}</div>
                  <div className="text-white font-bold text-2xl">{cfg.value}</div>
                  <div className="text-gray-500 text-xs">{cfg.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Code toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowCode(!showCode)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all border border-gray-700"
          >
            <Code2 className="w-5 h-5" />
            {showCode ? 'Sembunyikan Kode' : 'Lihat Starter Code'}
            <ChevronDown className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <CodeBlock code={code} title="gpt_model.py" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============ PIPELINE SECTION ============
function PipelineSection() {
  const stages = [
    {
      phase: 'TAHAP 1',
      title: 'Pretraining',
      icon: Database,
      color: 'purple',
      items: [
        'Kumpulkan dataset teks besar (Common Crawl, Wikipedia, Books, Code)',
        'Tokenisasi (BPE, SentencePiece)',
        'Latih model: next-token prediction',
        'Distributed Training (DeepSpeed, FSDP, Megatron-LM)',
      ]
    },
    {
      phase: 'TAHAP 2',
      title: 'Supervised Fine-Tuning (SFT)',
      icon: Users,
      color: 'blue',
      items: [
        'Siapkan dataset instruksi/conversations',
        'Fine-tune model agar mengikuti instruksi',
        'Quality filtering & data curation',
      ]
    },
    {
      phase: 'TAHAP 3',
      title: 'RLHF / Alignment',
      icon: Brain,
      color: 'cyan',
      items: [
        'Collect human preferences',
        'Train reward model',
        'Optimize dengan PPO atau DPO',
      ]
    },
    {
      phase: 'TAHAP 4',
      title: 'Evaluasi & Deployment',
      icon: Rocket,
      color: 'green',
      items: [
        'Benchmark (MMLU, GSM8K, HumanEval)',
        'Optimasi inference (quantization, vLLM, TensorRT)',
        'Build API & UI',
      ]
    },
  ];

  const colorClasses: Record<string, { border: string; bg: string; text: string; icon: string }> = {
    purple: { border: 'border-purple-500/30', bg: 'bg-purple-500/10', text: 'text-purple-400', icon: 'bg-purple-500/20' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', icon: 'bg-blue-500/20' },
    cyan: { border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', text: 'text-cyan-400', icon: 'bg-cyan-500/20' },
    green: { border: 'border-green-500/30', bg: 'bg-green-500/10', text: 'text-green-400', icon: 'bg-green-500/20' },
  };

  return (
    <section id="pipeline" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pipeline Training
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Empat tahap utama dalam membangun model AI dari awal hingga deployment
          </p>
        </motion.div>

        <div className="space-y-6">
          {stages.map((stage, i) => {
            const colors = colorClasses[stage.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-sm`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${colors.icon} flex items-center justify-center`}>
                    <stage.icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-xs font-mono ${colors.text} mb-1`}>{stage.phase}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{stage.title}</h3>
                    <ul className="space-y-2">
                      {stage.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                          <ChevronRight className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < stages.length - 1 && (
                    <div className="hidden md:flex absolute -bottom-6 left-1/2 -translate-x-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ TOOLS SECTION ============
function ToolsSection() {
  const tools = [
    { category: 'Training Framework', items: ['Hugging Face Transformers', 'Megatron-LM', 'DeepSpeed', 'FSDP'], icon: Cpu, color: 'purple' },
    { category: 'Dataset', items: ['Hugging Face Datasets', 'Common Crawl', 'The Pile'], icon: Database, color: 'blue' },
    { category: 'Tokenisasi', items: ['SentencePiece', 'Hugging Face Tokenizers'], icon: Code2, color: 'cyan' },
    { category: 'Distribusi', items: ['Ray', 'Slurm', 'Kubernetes'], icon: Globe, color: 'pink' },
    { category: 'Inference', items: ['vLLM', 'TensorRT-LLM', 'Ollama', 'llama.cpp'], icon: Zap, color: 'yellow' },
    { category: 'Fine-tuning', items: ['Axolotl', 'LLaMA-Factory', 'Unsloth'], icon: Layers, color: 'green' },
    { category: 'RLHF', items: ['TRL (Transformer RL)', 'OpenRLHF'], icon: Brain, color: 'orange' },
  ];

  const colorMap: Record<string, string> = {
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  };

  return (
    <section id="tools" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tools & Framework
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ekosistem tools yang direkomendasikan untuk setiap tahap pengembangan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[tool.color]}`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold">{tool.category}</h3>
              </div>
              <div className="space-y-2">
                {tool.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ RESOURCES SECTION ============
function ResourcesSection() {
  const costData = [
    { name: 'Mini (125M)', cost: 1250, gpus: 2 },
    { name: 'Small (1B)', cost: 12500, gpus: 12 },
    { name: 'Medium (7B)', cost: 125000, gpus: 48 },
    { name: 'Large (70B)', cost: 1000000, gpus: 384 },
    { name: 'GPT-4 (~1.8T)', cost: 100000000, gpus: 25000 },
  ];

  const gpuData = [
    { name: '125M', gpus: 2, label: '1-4 GPU' },
    { name: '1B', gpus: 12, label: '8-16 GPU' },
    { name: '7B', gpus: 48, label: '32-64 GPU' },
    { name: '70B', gpus: 384, label: '256-512 GPU' },
    { name: '1.8T', gpus: 25000, label: 'Ribuan GPU' },
  ];

  const resources = [
    { size: 'Mini', params: '125M', gpus: '1-4 GPU', cost: '$500 - $2,000', color: 'text-green-400' },
    { size: 'Small', params: '1B', gpus: '8-16 GPU', cost: '$5,000 - $20,000', color: 'text-blue-400' },
    { size: 'Medium', params: '7B', gpus: '32-64 GPU', cost: '$50,000 - $200,000', color: 'text-yellow-400' },
    { size: 'Large', params: '70B', gpus: '256-512 GPU', cost: '$500K - $2M+', color: 'text-orange-400' },
    { size: 'GPT-4 scale', params: '~1.8T', gpus: 'Ribuan GPU', cost: '$100M+', color: 'text-red-400' },
  ];

  return (
    <section id="resources" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Estimasi Sumber Daya
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Perkiraan biaya dan kebutuhan komputasi berdasarkan ukuran model
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 overflow-x-auto"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-4 px-4 text-sm font-semibold text-gray-400">Model Size</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-400">Parameters</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-400">GPU (H100)</th>
                <th className="py-4 px-4 text-sm font-semibold text-gray-400">Perkiraan Biaya</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-900/30 transition-colors">
                  <td className="py-4 px-4">
                    <span className={`font-semibold ${r.color}`}>{r.size}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-300 font-mono text-sm">{r.params}</td>
                  <td className="py-4 px-4 text-gray-300 text-sm">{r.gpus}</td>
                  <td className="py-4 px-4 text-gray-300 text-sm font-medium">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Estimasi Biaya Training (USD)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Biaya']}
                />
                <Area type="monotone" dataKey="cost" stroke="#8B5CF6" fill="url(#colorCost)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              Kebutuhan GPU (H100)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gpuData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value: number, name: string, props: any) => [`${value} GPU`, props.payload.label]}
                />
                <Bar dataKey="gpus" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ GETTING STARTED SECTION ============
function GettingStartedSection() {
  const steps = [
    {
      step: 1,
      title: 'Praktik Model Kecil',
      desc: 'Jalankan kode Transformer di Google Colab (GPU gratis)',
      icon: Code2,
      tip: 'Mulai dengan model 125M parameter',
    },
    {
      step: 2,
      title: 'Fine-tune Model Open-Source',
      desc: 'Gunakan model seperti LLaMA 3, Mistral, atau Gemma',
      icon: Layers,
      tip: 'Gunakan Axolotl atau Unsloth untuk kemudahan',
    },
    {
      step: 3,
      title: 'Bangun Chatbot',
      desc: 'Tambahkan RAG, memory, dan tools',
      icon: Globe,
      tip: 'Integrasikan dengan vector database',
    },
    {
      step: 4,
      title: 'Skala Bertahap',
      desc: 'Tingkatkan dataset dan model secara bertahap',
      icon: TrendingUp,
      tip: 'Evaluasi setiap tahap dengan benchmark',
    },
  ];

  const finetuneCode = `from trl import SFTTrainer, AutoModelForCausalLM, AutoTokenizer

model_name = "meta-llama/Meta-Llama-3-8B"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Train dengan instruksi dataset
# trainer = SFTTrainer(
#     model=model,
#     train_dataset=dataset,
#     tokenizer=tokenizer,
#     max_seq_length=1024,
# )
# trainer.train()`;

  return (
    <section id="getting-started" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Mulai dari yang Kecil! 🎯
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Langkah praktis untuk mulai membangun model AI tanpa sumber daya miliaran dolar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-green-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-green-400">Step {step.step}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{step.desc}</p>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                    <Zap className="w-3 h-3" />
                    {step.tip}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Contoh: Fine-tune dengan Hugging Face TRL</h3>
          <CodeBlock code={finetuneCode} title="finetune_example.py" />
        </motion.div>
      </div>
    </section>
  );
}

// ============ LEARNING RESOURCES SECTION ============
function LearningSection() {
  const resources = [
    {
      title: 'Attention Is All You Need',
      type: 'Paper',
      desc: 'Paper asli Transformer yang menjadi fondasi GPT',
      url: 'https://arxiv.org/abs/1706.03762',
      icon: BookOpen,
      color: 'purple',
    },
    {
      title: 'GPT-2 Paper',
      type: 'Paper',
      desc: 'Language Models are Unsupervised Multitask Learners',
      url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf',
      icon: BookOpen,
      color: 'blue',
    },
    {
      title: 'Andrej Karpathy: Build GPT from Scratch',
      type: 'Video',
      desc: 'Tutorial lengkap membangun GPT dari nol',
      url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
      icon: Code2,
      color: 'cyan',
    },
    {
      title: 'Hugging Face Course',
      type: 'Course',
      desc: 'Kursus lengkap NLP dan Transformers',
      url: 'https://huggingface.co/learn',
      icon: Layers,
      color: 'yellow',
    },
    {
      title: 'The Illustrated Transformer',
      type: 'Article',
      desc: 'Visualisasi intuitif cara kerja Transformer',
      url: 'https://jalammar.github.io/illustrated-transformer/',
      icon: Globe,
      color: 'green',
    },
  ];

  const colorMap: Record<string, string> = {
    purple: 'text-purple-400 bg-purple-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
    yellow: 'text-yellow-400 bg-yellow-500/10',
    green: 'text-green-400 bg-green-500/10',
  };

  return (
    <section id="learning" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sumber Belajar 📚
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Referensi terbaik untuk memahami dan membangun model AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res, i) => (
            <motion.a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all group block"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[res.color]}`}>
                  <res.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{res.type}</span>
                    <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors">{res.title}</h3>
                  <p className="text-gray-500 text-xs">{res.desc}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Important note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">💡 Catatan Penting</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Membangun model setara GPT-6 membutuhkan sumber daya miliaran dolar. Namun, Anda bisa{' '}
                <span className="text-purple-300 font-medium">membangun aplikasi AI yang sangat berguna</span>{' '}
                dengan memanfaatkan model open-source yang sudah ada + fine-tuning + RAG. 
                Itulah pendekatan yang paling realistis dan efektif saat ini.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ DEEP DIVE: TOKENIZATION ============
function TokenizationSection() {
  const [activeTab, setActiveTab] = useState<'bpe' | 'sentencepiece' | 'example'>('bpe');

  const bpeCode = `from tokenizers import Tokenizer
from tokenizers.models import BPE
from tokenizers.trainers import BpeTrainer
from tokenizers.pre_tokenizers import Whitespace

# Inisialisasi tokenizer BPE
tokenizer = Tokenizer(BPE(unk_token="[UNK]"))
tokenizer.pre_tokenizer = Whitespace()

# Trainer dengan vocab size 50,000
trainer = BpeTrainer(
    vocab_size=50000,
    min_frequency=2,
    special_tokens=["[UNK]", "[CLS]", "[SEP]", "[PAD]", "[MASK]"]
)

# Train dari file-file teks
files = ["data/train.txt", "data/valid.txt"]
tokenizer.train(files, trainer)

# Simpan tokenizer
tokenizer.save("tokenizer.json")

# Gunakan
encoding = tokenizer.encode("Hello, world!")
print(encoding.tokens)  # ['Hello', ',', 'world', '!']
print(encoding.ids)     # [1234, 5, 6789, 2]`;

  const sentencepieceCode = `import sentencepiece as spm

# Train SentencePiece model
spm.SentencePieceTrainer.train(
    input='data/corpus.txt',
    model_prefix='tokenizer',
    vocab_size=32000,
    character_coverage=0.9995,
    model_type='bpe',  # atau 'unigram', 'char', 'word'
    num_threads=8,
    split_digits=True,
    byte_fallback=True,
)

# Load dan gunakan
sp = spm.SentencePieceProcessor(model_file='tokenizer.model')

# Encode
text = "Artificial intelligence is transforming the world"
pieces = sp.encode(text, out_type=str)
ids = sp.encode(text, out_type=int)

print(f"Text: {text}")
print(f"Pieces: {pieces}")
print(f"IDs: {ids}")

# Decode
decoded = sp.decode(ids)
print(f"Decoded: {decoded}")`;

  const exampleCode = `# Contoh: Tokenisasi untuk training GPT
from transformers import AutoTokenizer
import torch

# Load tokenizer pretrained
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Tambahkan special tokens
special_tokens = {"pad_token": "<|pad|>"}
tokenizer.add_special_tokens(special_tokens)

# Tokenisasi batch
texts = [
    "The future of AI is bright",
    "Large language models can understand context",
    "Training requires massive compute"
]

# Encode dengan padding
encodings = tokenizer(
    texts,
    padding=True,
    truncation=True,
    max_length=512,
    return_tensors="pt"
)

print(f"Input IDs shape: {encodings['input_ids'].shape}")
print(f"Attention mask shape: {encodings['attention_mask'].shape}")

# Decode kembali
for i, text in enumerate(texts):
    decoded = tokenizer.decode(encodings['input_ids'][i])
    print(f"Original: {text}")
    print(f"Decoded:  {decoded}")`;

  const tabs = [
    { id: 'bpe', label: 'BPE Tokenizer', icon: Code2 },
    { id: 'sentencepiece', label: 'SentencePiece', icon: Layers },
    { id: 'example', label: 'Contoh Praktis', icon: Zap },
  ];

  return (
    <section id="tokenization" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Deep Dive: Tokenization 🔤
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tokenisasi adalah fondasi — mengubah teks mentah menjadi representasi numerik yang bisa diproses model
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Code blocks */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'bpe' && <CodeBlock code={bpeCode} title="bpe_tokenizer.py" />}
          {activeTab === 'sentencepiece' && <CodeBlock code={sentencepieceCode} title="sentencepiece_tokenizer.py" />}
          {activeTab === 'example' && <CodeBlock code={exampleCode} title="tokenization_example.py" />}
        </motion.div>

        {/* Explanation cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { title: 'BPE (Byte-Pair Encoding)', desc: 'Menggabungkan karakter yang sering muncul bersama menjadi subword', icon: '🔗' },
            { title: 'SentencePiece', desc: 'Language-agnostic, bekerja langsung pada raw text tanpa pre-tokenization', icon: '🌐' },
            { title: 'Vocabulary Size', desc: 'Trade-off: vocab besar = lebih efisien, vocab kecil = lebih fleksibel', icon: '📊' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-gray-900/50 border border-gray-800/50"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ TRAINING LOOP SECTION ============
function TrainingLoopSection() {
  const trainingCode = `import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
from tqdm import tqdm
import wandb

class TextDataset(Dataset):
    def __init__(self, data, seq_length):
        self.data = data
        self.seq_length = seq_length
    
    def __len__(self):
        return len(self.data) - self.seq_length
    
    def __getitem__(self, idx):
        x = self.data[idx:idx + self.seq_length]
        y = self.data[idx + 1:idx + self.seq_length + 1]
        return torch.tensor(x), torch.tensor(y)

def train_model(model, train_loader, val_loader, config):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    
    # Optimizer dengan weight decay
    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr=config['learning_rate'],
        weight_decay=config['weight_decay'],
        betas=(0.9, 0.95)
    )
    
    # Learning rate scheduler
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
        optimizer,
        T_max=config['max_steps']
    )
    
    # Mixed precision training
    scaler = torch.cuda.amp.GradScaler()
    
    # Initialize wandb
    wandb.init(project="gpt-training", config=config)
    
    global_step = 0
    best_val_loss = float('inf')
    
    for epoch in range(config['epochs']):
        model.train()
        train_loss = 0
        
        for batch_idx, (inputs, targets) in enumerate(tqdm(train_loader)):
            inputs = inputs.to(device)
            targets = targets.to(device)
            
            # Forward pass dengan mixed precision
            with torch.cuda.amp.autocast():
                logits, loss = model(inputs, targets)
                loss = loss / config['gradient_accumulation_steps']
            
            # Backward pass
            scaler.scale(loss).backward()
            
            # Gradient accumulation
            if (batch_idx + 1) % config['gradient_accumulation_steps'] == 0:
                # Gradient clipping
                scaler.unscale_(optimizer)
                torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                
                scaler.step(optimizer)
                scaler.update()
                optimizer.zero_grad()
                scheduler.step()
                
                global_step += 1
                
                # Logging
                if global_step % config['log_interval'] == 0:
                    wandb.log({
                        'train/loss': loss.item() * config['gradient_accumulation_steps'],
                        'train/lr': scheduler.get_last_lr()[0],
                        'train/step': global_step
                    })
                
                # Validation
                if global_step % config['eval_interval'] == 0:
                    val_loss = evaluate(model, val_loader, device)
                    wandb.log({'val/loss': val_loss, 'step': global_step})
                    
                    # Save best model
                    if val_loss < best_val_loss:
                        best_val_loss = val_loss
                        torch.save(model.state_dict(), 'best_model.pt')
                        print(f"✨ New best model! Val loss: {val_loss:.4f}")
            
            train_loss += loss.item()
        
        avg_train_loss = train_loss / len(train_loader)
        print(f"Epoch {epoch+1}/{config['epochs']} - Train Loss: {avg_train_loss:.4f}")

def evaluate(model, val_loader, device):
    model.eval()
    total_loss = 0
    
    with torch.no_grad():
        for inputs, targets in val_loader:
            inputs = inputs.to(device)
            targets = targets.to(device)
            
            with torch.cuda.amp.autocast():
                _, loss = model(inputs, targets)
            
            total_loss += loss.item()
    
    return total_loss / len(val_loader)

# Configuration
config = {
    'learning_rate': 3e-4,
    'weight_decay': 0.1,
    'epochs': 10,
    'batch_size': 32,
    'gradient_accumulation_steps': 4,
    'max_steps': 100000,
    'log_interval': 10,
    'eval_interval': 500,
}

# Run training
# train_model(model, train_loader, val_loader, config)`;

  return (
    <section id="training" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Training Loop & Optimization ⚡
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Implementasi lengkap training loop dengan mixed precision, gradient accumulation, dan distributed training
          </p>
        </motion.div>

        <CodeBlock code={trainingCode} title="training_loop.py" />

        {/* Key concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { title: 'Mixed Precision', desc: 'FP16/BF16 untuk mempercepat training 2-3x', icon: '⚡', color: 'yellow' },
            { title: 'Gradient Accumulation', desc: 'Simulasi batch size besar dengan GPU memory terbatas', icon: '📦', color: 'blue' },
            { title: 'Gradient Clipping', desc: 'Mencegah exploding gradients', icon: '✂️', color: 'red' },
            { title: 'LR Scheduler', desc: 'Cosine annealing untuk konvergensi optimal', icon: '📈', color: 'green' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-800/50"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ DISTRIBUTED TRAINING SECTION ============
function DistributedTrainingSection() {
  const deepspeedCode = `# DeepSpeed configuration (ds_config.json)
{
  "train_batch_size": 256,
  "gradient_accumulation_steps": 4,
  "fp16": {
    "enabled": true,
    "loss_scale": 0,
    "loss_scale_window": 1000
  },
  "zero_optimization": {
    "stage": 3,
    "offload_optimizer": {
      "device": "cpu",
      "pin_memory": true
    },
    "offload_param": {
      "device": "cpu",
      "pin_memory": true
    },
    "overlap_comm": true,
    "contiguous_gradients": true
  },
  "optimizer": {
    "type": "AdamW",
    "params": {
      "lr": 3e-4,
      "betas": [0.9, 0.95],
      "eps": 1e-8,
      "weight_decay": 0.1
    }
  },
  "scheduler": {
    "type": "WarmupDecayLR",
    "params": {
      "warmup_min_lr": 0,
      "warmup_max_lr": 3e-4,
      "warmup_num_steps": 2000,
      "total_num_steps": 100000
    }
  }
}`;

  const launchCode = `# Launch distributed training dengan DeepSpeed
# Untuk 8 GPU dalam 1 node
deepspeed --num_gpus=8 train.py \\
    --deepspeed ds_config.json \\
    --model_name gpt-large \\
    --train_data data/train \\
    --output_dir checkpoints/

# Untuk multi-node (4 nodes, masing-masing 8 GPU)
deepspeed --num_nodes=4 --num_gpus=8 \\
    --hostfile hostfile.txt \\
    train.py --deepspeed ds_config.json

# hostfile.txt berisi:
# node1 slots=8
# node2 slots=8
# node3 slots=8
# node4 slots=8`;

  const fsdpCode = `# PyTorch FSDP (Fully Sharded Data Parallel)
import torch
import torch.distributed as dist
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp import ShardingStrategy
from torch.distributed.fsdp.wrap import transformer_auto_wrap_policy

# Initialize distributed
dist.init_process_group(backend='nccl')
local_rank = int(os.environ['LOCAL_RANK'])
torch.cuda.set_device(local_rank)

# Auto wrap policy
transformer_layer = TransformerBlock
auto_wrap_policy = partial(
    transformer_auto_wrap_policy,
    transformer_layer_cls={transformer_layer}
)

# Wrap model dengan FSDP
model = FSDP(
    model,
    auto_wrap_policy=auto_wrap_policy,
    sharding_strategy=ShardingStrategy.FULL_SHARD,
    mixed_precision=MixedPrecision(
        param_dtype=torch.float16,
        reduce_dtype=torch.float16,
        buffer_dtype=torch.float16
    ),
    backward_prefetch=BackwardPrefetch.BACKWARD_PRE,
    forward_prefetch=True,
    limit_all_gathers=True,
)

# Launch dengan torchrun
# torchrun --nproc_per_node=8 train_fsdp.py`;

  return (
    <section id="distributed" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Distributed Training 🌐
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scale training ke ratusan GPU dengan DeepSpeed ZeRO dan PyTorch FSDP
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-400" />
              DeepSpeed ZeRO-3
            </h3>
            <CodeBlock code={deepspeedCode} title="ds_config.json" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              PyTorch FSDP
            </h3>
            <CodeBlock code={fsdpCode} title="train_fsdp.py" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-yellow-400" />
            Launch Commands
          </h3>
          <CodeBlock code={launchCode} title="launch_commands.sh" />
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 overflow-x-auto"
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-sm font-semibold text-gray-400">Feature</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-400">DeepSpeed ZeRO</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-400">PyTorch FSDP</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-800/50">
                <td className="py-3 px-4 text-gray-300">Memory Efficiency</td>
                <td className="py-3 px-4 text-green-400">Excellent (ZeRO-3)</td>
                <td className="py-3 px-4 text-green-400">Excellent</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 px-4 text-gray-300">Ease of Use</td>
                <td className="py-3 px-4 text-yellow-400">Medium</td>
                <td className="py-3 px-4 text-green-400">Easy (native PyTorch)</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 px-4 text-gray-300">CPU Offloading</td>
                <td className="py-3 px-4 text-green-400">Yes</td>
                <td className="py-3 px-4 text-yellow-400">Limited</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-3 px-4 text-gray-300">Multi-Node</td>
                <td className="py-3 px-4 text-green-400">Excellent</td>
                <td className="py-3 px-4 text-green-400">Good</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

// ============ RLHF SECTION ============
function RLHFSection() {
  const rlhfCode = `from trl import PPOTrainer, PPOConfig, AutoModelForCausalLMWithValueHead
from trl.core import query, respond
from transformers import AutoTokenizer
import torch

# Load model dan tokenizer
model_name = "gpt2"
model = AutoModelForCausalLMWithValueHead.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Reward model (sudah ditrain sebelumnya)
reward_model = load_reward_model("reward_model.pt")

# PPO Configuration
config = PPOConfig(
    model_name=model_name,
    learning_rate=1e-5,
    batch_size=64,
    mini_batch_size=16,
    ppo_epochs=4,
)

# Initialize PPO trainer
ppo_trainer = PPOTrainer(config, model, ref_model=None, tokenizer=tokenizer)

# Training loop
for epoch in range(100):
    # Sample prompts
    prompts = ["Write a story about", "Explain quantum physics", "What is AI"]
    
    # Generate responses
    query_tensors = [tokenizer.encode(p, return_tensors="pt") for p in prompts]
    response_tensors = ppo_trainer.generate(query_tensors, max_new_tokens=50)
    
    # Decode responses
    responses = [tokenizer.decode(r.squeeze()) for r in response_tensors]
    
    # Get rewards from reward model
    rewards = []
    for prompt, response in zip(prompts, responses):
        reward = reward_model(prompt + response)
        rewards.append(torch.tensor(reward))
    
    # Run PPO step
    stats = ppo_trainer.step(query_tensors, response_tensors, rewards)
    
    # Log metrics
    print(f"Epoch {epoch}: reward_mean={stats['ppo/mean_reward']:.4f}")`;

  const dpoCode = `from trl import DPOTrainer, DPOConfig
from datasets import load_dataset

# Load preference dataset
# Format: {"prompt": "...", "chosen": "...", "rejected": "..."}
dataset = load_dataset("Anthropic/hh-rlhf")

# Load model
model = AutoModelForCausalLM.from_pretrained("gpt2")
ref_model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# DPO Configuration
config = DPOConfig(
    beta=0.1,  # Temperature parameter
    learning_rate=5e-5,
    lr_scheduler_type="cosine",
    max_steps=1000,
    warmup_steps=100,
)

# Initialize DPO trainer
trainer = DPOTrainer(
    model=model,
    ref_model=ref_model,
    args=config,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"],
    tokenizer=tokenizer,
)

# Train
trainer.train()

# Save model
trainer.save_model("dpo_model")`;

  return (
    <section id="rlhf" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            RLHF & Alignment 🧠
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Align model dengan preferensi manusia menggunakan Reinforcement Learning from Human Feedback
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-pink-400" />
              PPO (Proximal Policy Optimization)
            </h3>
            <CodeBlock code={rlhfCode} title="ppo_training.py" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              DPO (Direct Preference Optimization)
            </h3>
            <CodeBlock code={dpoCode} title="dpo_training.py" />
          </motion.div>
        </div>

        {/* RLHF Pipeline diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50"
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">RLHF Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { step: '1', title: 'Collect Preferences', desc: 'Human annotators rank model outputs', icon: Users },
              { step: '2', title: 'Train Reward Model', desc: 'Learn to predict human preferences', icon: BarChart3 },
              { step: '3', title: 'RL Optimization', desc: 'PPO/DPO to optimize policy', icon: Brain },
              { step: '4', title: 'Evaluate & Iterate', desc: 'Benchmark and refine', icon: TrendingUp },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-pink-500/10 border-2 border-pink-500/30 flex items-center justify-center mb-2">
                    <item.icon className="w-7 h-7 text-pink-400" />
                  </div>
                  <div className="text-xs text-pink-400 font-mono mb-1">Step {item.step}</div>
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs max-w-[150px]">{item.desc}</div>
                </div>
                {i < 3 && <ArrowRight className="w-5 h-5 text-gray-600 hidden md:block" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ DEPLOYMENT SECTION ============
function DeploymentSection() {
  const vllmCode = `from vllm import LLM, SamplingParams

# Initialize vLLM engine
llm = LLM(
    model="meta-llama/Llama-2-7b-hf",
    tensor_parallel_size=2,  # Use 2 GPUs
    dtype="float16",
    gpu_memory_utilization=0.9,
)

# Sampling parameters
sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.9,
    max_tokens=500,
    repetition_penalty=1.1,
)

# Generate
prompts = [
    "The future of AI is",
    "Explain quantum computing in simple terms:",
]

outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    prompt = output.prompt
    generated_text = output.outputs[0].text
    print(f"Prompt: {prompt}")
    print(f"Generated: {generated_text}")
    print("---")`;

  const quantizationCode = `from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load model dengan quantization
model_id = "meta-llama/Llama-2-7b-hf"

# 4-bit quantization dengan bitsandbytes
from transformers import BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
)

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=quantization_config,
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained(model_id)

# Inference
inputs = tokenizer("AI will", return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=50)
print(tokenizer.decode(outputs[0]))

# Model size comparison:
# FP16: ~14GB
# 8-bit: ~7GB
# 4-bit: ~3.5GB`;

  const apiCode = `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vllm import LLM, SamplingParams
import uvicorn

app = FastAPI(title="GPT API")

# Load model
llm = LLM(model="meta-llama/Llama-2-7b-hf")

class GenerateRequest(BaseModel):
    prompt: str
    max_tokens: int = 100
    temperature: float = 0.7
    top_p: float = 0.9

class GenerateResponse(BaseModel):
    text: str
    tokens_generated: int

@app.post("/generate", response_model=GenerateResponse)
async def generate(request: GenerateRequest):
    try:
        sampling_params = SamplingParams(
            temperature=request.temperature,
            top_p=request.top_p,
            max_tokens=request.max_tokens,
        )
        
        outputs = llm.generate([request.prompt], sampling_params)
        generated_text = outputs[0].outputs[0].text
        
        return GenerateResponse(
            text=generated_text,
            tokens_generated=len(outputs[0].outputs[0].token_ids)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`;

  return (
    <section id="deployment" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Deployment & Inference 🚀
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Optimasi dan deploy model ke production dengan vLLM, quantization, dan FastAPI
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              High-Performance Inference dengan vLLM
            </h3>
            <CodeBlock code={vllmCode} title="vllm_inference.py" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Quantization (4-bit / 8-bit)
            </h3>
            <CodeBlock code={quantizationCode} title="quantization.py" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-400" />
              Production API dengan FastAPI
            </h3>
            <CodeBlock code={apiCode} title="api_server.py" />
          </motion.div>
        </div>

        {/* Performance comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { title: 'vLLM', desc: '24x throughput vs HuggingFace', metric: '24x', color: 'yellow' },
            { title: '4-bit Quantization', desc: '75% memory reduction', metric: '75%', color: 'cyan' },
            { title: 'Tensor Parallelism', desc: 'Linear scaling with GPUs', metric: 'O(n)', color: 'green' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 text-center">
              <div className={`text-4xl font-bold mb-2 text-${item.color}-400`}>{item.metric}</div>
              <div className="text-white font-semibold mb-1">{item.title}</div>
              <div className="text-gray-400 text-sm">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============ GPT-6 ASTRA BLUEPRINT SECTION ============
function GPT6AstraBlueprintSection() {
  const [activeCode, setActiveCode] = useState<'config' | 'tokenizer' | 'model' | 'train' | 'server'>('config');

  const architectureDiagram = `┌──────────────────────────────────────────────────────────┐
│                    GPT-6 ASTRA PROTOTYPE                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Input Text → [Tokenizer (BPE/SentencePiece)] → Token IDs│
│       ↓                                                  │
│  Token Embedding [B, T, d_model]                        │
│       + Positional Encoding (RoPE)                       │
│       ↓                                                  │
│  ┌─────────────────────────────┐  × N layers            │
│  │  RMSNorm                    │                        │
│  │  Causal Self-Attention      │  (Multi-Head + FlashAttn)│
│  │    ├─ Q, K, V projections  │                        │
│  │    ├─ RoPE rotation         │                        │
│  │    └─ Softmax attention     │                        │
│  │  + Residual Connection     │                        │
│  │  RMSNorm                    │                        │
│  │  SwiGLU Feed-Forward       │                        │
│  │  + Residual Connection     │                        │
│  └─────────────────────────────┘                        │
│       ↓                                                  │
│  Final RMSNorm                                           │
│       ↓                                                  │
│  LM Head (weight-tied) → Logits [B, T, vocab_size]     │
│       ↓                                                  │
│  Softmax → Next Token Prediction                         │
└──────────────────────────────────────────────────────────┘`;

  const configCode = `# config.py
class GPTConfig:
    """Konfigurasi untuk model GPT-6 Astra Prototype"""
    vocab_size: int = 50257       # Ukuran kosakata
    max_seq_len: int = 2048       # Panjang maksimum sequence
    d_model: int = 768            # Dimensi embedding
    n_heads: int = 12             # Jumlah attention head
    n_layers: int = 12            # Jumlah transformer block
    d_ff: int = 3072              # Dimensi feed-forward (4 * d_model)
    dropout: float = 0.1
    rms_eps: float = 1e-5`;

  const tokenizerCode = `# tokenizer.py
import re
from collections import Counter

class SimpleBPETokenizer:
    """Byte Pair Encoding Tokenizer Sederhana"""
    
    def __init__(self, vocab_size=50257):
        self.vocab_size = vocab_size
        self.merges = {}
        self.vocab = {}
        self.inverse_vocab = {}
    
    def encode(self, text: str) -> list[int]:
        """Mengubah teks menjadi token ID"""
        tokens = []
        for word in text.lower().split():
            chars = list(word) + ['</w>']
            while len(chars) > 1:
                pairs = self._get_pairs(chars)
                if not pairs:
                    break
                best_pair = min(pairs, key=lambda p: pairs[p])
                if best_pair not in self.merges:
                    break
                new_chars = []
                i = 0
                while i < len(chars):
                    if i < len(chars) - 1 and (chars[i], chars[i+1]) == best_pair:
                        new_chars.append(self.merges[best_pair])
                        i += 2
                    else:
                        new_chars.append(chars[i])
                        i += 1
                chars = new_chars
            tokens.extend([self.vocab.get(c, 0) for c in chars])
        return tokens
    
    def decode(self, token_ids: list[int]) -> str:
        """Mengubah token ID menjadi teks"""
        return ''.join([self.inverse_vocab.get(t, '') for t in token_ids])
    
    def train(self, corpus: str, vocab_size=50257):
        """Melatih BPE tokenizer dari corpus"""
        chars = sorted(set(corpus))
        self.vocab = {ch: i for i, ch in enumerate(chars)}
        self.inverse_vocab = {i: ch for ch, i in self.vocab.items()}
        next_id = len(chars)
        
        text = corpus
        while len(self.merges) < vocab_size - len(chars):
            pairs = Counter()
            words = text.split()
            for word in words:
                symbols = list(word)
                for i in range(len(symbols) - 1):
                    pair = (symbols[i], symbols[i+1])
                    pairs[pair] += 1
            
            if not pairs:
                break
            
            best = pairs.most_common(1)[0][0]
            self.merges[best] = next_id
            self.inverse_vocab[next_id] = best[0] + best[1]
            self.vocab[best[0] + best[1]] = next_id
            next_id += 1`;

  const modelCode = `# model.py
import torch
import torch.nn as nn
import math

class RoPE(nn.Module):
    """Rotary Position Embedding"""
    def __init__(self, dim, max_seq_len=2048):
        super().__init__()
        inv_freq = 1.0 / (10000 ** (torch.arange(0, dim, 2).float() / dim))
        position = torch.arange(max_seq_len)
        freqs = torch.outer(position, inv_freq)
        self.register_buffer('cos', torch.cos(freqs))
        self.register_buffer('sin', torch.sin(freqs))
    
    def forward(self, x, seq_len):
        cos = self.cos[:seq_len].unsqueeze(0).unsqueeze(-1)
        sin = self.sin[:seq_len].unsqueeze(0).unsqueeze(-1)
        x_complex = torch.view_as_complex(x.float().reshape(*x.shape[:-1], -1, 2))
        rotated = x_complex * torch.view_as_complex(cos + 1j * sin)
        return torch.view_as_real(rotated).reshape(x.shape)

class MultiHeadAttention(nn.Module):
    """Multi-Head Causal Self-Attention"""
    def __init__(self, config):
        super().__init__()
        self.n_heads = config.n_heads
        self.d_model = config.d_model
        self.head_dim = config.d_model // config.n_heads
        
        self.wq = nn.Linear(config.d_model, config.d_model, bias=False)
        self.wk = nn.Linear(config.d_model, config.d_model, bias=False)
        self.wv = nn.Linear(config.d_model, config.d_model, bias=False)
        self.wo = nn.Linear(config.d_model, config.d_model, bias=False)
        self.rope = RoPE(self.head_dim)
        self.dropout = nn.Dropout(config.dropout)
    
    def forward(self, x, mask=None):
        B, T, C = x.shape
        
        q = self.wq(x).view(B, T, self.n_heads, self.head_dim)
        k = self.wk(x).view(B, T, self.n_heads, self.head_dim)
        v = self.wv(x).view(B, T, self.n_heads, self.head_dim)
        
        q = self.rope(q, T)
        k = self.rope(k, T)
        
        q = q.transpose(1, 2)
        k = k.transpose(1, 2)
        v = v.transpose(1, 2)
        
        scale = 1.0 / math.sqrt(self.head_dim)
        att = (q @ k.transpose(-2, -1)) * scale
        
        mask = torch.tril(torch.ones(T, T), diagonal=0).bool()
        att = att.masked_fill(~mask, float('-inf'))
        att = torch.softmax(att, dim=-1)
        att = self.dropout(att)
        
        output = att @ v
        output = output.transpose(1, 2).contiguous().view(B, T, C)
        return self.wo(output)

class FeedForward(nn.Module):
    """SwiGLU Feed-Forward Network"""
    def __init__(self, config):
        super().__init__()
        self.w1 = nn.Linear(config.d_model, config.d_ff, bias=False)
        self.w2 = nn.Linear(config.d_ff, config.d_model, bias=False)
        self.w3 = nn.Linear(config.d_model, config.d_ff, bias=False)
        self.dropout = nn.Dropout(config.dropout)
    
    def forward(self, x):
        return self.dropout(self.w2(nn.functional.silu(self.w1(x)) * self.w3(x)))

class TransformerBlock(nn.Module):
    """Satu blok Transformer (RMSNorm + Attention + FFN)"""
    def __init__(self, config):
        super().__init__()
        self.attention = MultiHeadAttention(config)
        self.ffn = FeedForward(config)
        self.rms1 = nn.RMSNorm(config.d_model, eps=config.rms_eps)
        self.rms2 = nn.RMSNorm(config.d_model, eps=config.rms_eps)
    
    def forward(self, x, mask=None):
        x = x + self.attention(self.rms1(x), mask)
        x = x + self.ffn(self.rms2(x))
        return x

class GPTModel(nn.Module):
    """GPT-6 Astra Prototype — Transformer Decoder-Only"""
    def __init__(self, config):
        super().__init__()
        self.config = config
        
        self.token_embedding = nn.Embedding(config.vocab_size, config.d_model)
        self.position_embedding = nn.Embedding(config.max_seq_len, config.d_model)
        self.dropout = nn.Dropout(config.dropout)
        
        self.layers = nn.ModuleList([
            TransformerBlock(config) for _ in range(config.n_layers)
        ])
        
        self.final_rms = nn.RMSNorm(config.d_model, eps=config.rms_eps)
        self.lm_head = nn.Linear(config.d_model, config.vocab_size, bias=False)
        
        # Weight tying
        self.lm_head.weight = self.token_embedding.weight
    
    def forward(self, token_ids, targets=None):
        B, T = token_ids.shape
        pos = torch.arange(0, T, dtype=torch.long, device=token_ids.device).unsqueeze(0)
        
        x = self.token_embedding(token_ids) + self.position_embedding(pos)
        x = self.dropout(x)
        
        for layer in self.layers:
            x = layer(x)
        
        x = self.final_rms(x)
        logits = self.lm_head(x)
        
        loss = None
        if targets is not None:
            loss = nn.functional.cross_entropy(
                logits.view(-1, logits.size(-1)),
                targets.view(-1)
            )
        
        return logits, loss
    
    def generate(self, prompt_ids, max_new_tokens=100, temperature=1.0, top_k=50):
        """Generate teks baru dari prompt"""
        self.eval()
        with torch.no_grad():
            ids = torch.tensor([prompt_ids], device=next(self.parameters()).device)
            for _ in range(max_new_tokens):
                idx_cond = ids[:, -self.config.max_seq_len:]
                logits, _ = self(idx_cond)
                logits = logits[:, -1, :] / temperature
                
                v, _ = torch.topk(logits, min(top_k, logits.size(-1)))
                logits[logits < v[:, [-1]]] = float('-inf')
                
                probs = torch.softmax(logits, dim=-1)
                next_id = torch.multinomial(probs, num_samples=1)
                ids = torch.cat([ids, next_id], dim=1)
        
        return ids[0].tolist()`;

  const trainCode = `# train.py
import torch
import torch.optim as optim
from model import GPTModel, GPTConfig
from tokenizer import SimpleBPETokenizer

def train_model():
    """Loop training model GPT-6 Astra Prototype"""
    
    config = GPTConfig(
        vocab_size=1000,
        max_seq_len=512,
        d_model=256,
        n_heads=8,
        n_layers=4,
        d_ff=1024,
        dropout=0.1,
    )
    
    model = GPTModel(config)
    print(f"Total parameter: {sum(p.numel() for p in model.parameters()):,}")
    
    corpus = """
    Halo, dunia! Ini adalah model AI yang ditulis dalam bahasa Python.
    Model AI adalah program yang belajar dari data. Pembelajaran mesin 
    adalah cabang kecerdasan buatan. Jaringan saraf tiruan terinspirasi 
    oleh otak manusia. Transformer adalah arsitektur yang digunakan dalam 
    GPT, BERT, dan banyak model modern lainnya.
    """
    
    tokenizer = SimpleBPETokenizer()
    tokenizer.train(corpus, vocab_size=config.vocab_size)
    
    tokens = tokenizer.encode(corpus.lower())
    if len(tokens) < config.max_seq_len:
        tokens = tokens + [0] * (config.max_seq_len - len(tokens))
    
    data = torch.tensor(tokens[:config.max_seq_len]).unsqueeze(0)
    
    optimizer = optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
    scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=1000)
    
    print("🔄 Memulai training...")
    for epoch in range(1000):
        model.train()
        
        x = data[:, :-1]
        y = data[:, 1:]
        
        logits, loss = model(x, targets=y)
        
        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        scheduler.step()
        
        if epoch % 100 == 0:
            print(f"Epoch {epoch:4d} | Loss: {loss.item():.4f} | LR: {scheduler.get_last_lr()[0]:.6f}")
    
    torch.save(model.state_dict(), "gpt6_astra_prototype.pt")
    print("✅ Model disimpan!")
    
    return model, tokenizer

def demo_generation(model, tokenizer):
    """Demo generasi teks"""
    prompt = "Model AI"
    prompt_ids = tokenizer.encode(prompt.lower())
    
    print(f"\\n📝 Prompt: '{prompt}'")
    print("🔮 Hasil generasi:")
    
    generated_ids = model.generate(prompt_ids, max_new_tokens=50, temperature=0.8)
    generated_text = tokenizer.decode(generated_ids)
    print(generated_text)

if __name__ == "__main__":
    model, tokenizer = train_model()
    demo_generation(model, tokenizer)`;

  const serverCode = `# server.py
from flask import Flask, request, jsonify
import torch
from model import GPTModel, GPTConfig
from tokenizer import SimpleBPETokenizer

app = Flask(__name__)

config = GPTConfig(
    vocab_size=1000,
    max_seq_len=512,
    d_model=256,
    n_heads=8,
    n_layers=4,
    d_ff=1024,
)

model = GPTModel(config)
model.load_state_dict(torch.load("gpt6_astra_prototype.pt"))
model.eval()

tokenizer = SimpleBPETokenizer()

@app.route("/v1/chat/completions", methods=["POST"])
def chat_completion():
    """Endpoint chat completion seperti OpenAI API"""
    data = request.json
    messages = data.get("messages", [])
    temperature = data.get("temperature", 0.7)
    max_tokens = data.get("max_tokens", 256)
    
    prompt = ""
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role == "system":
            prompt += f"[SYSTEM] {content}\\n"
        elif role == "user":
            prompt += f"[USER] {content}\\n"
        elif role == "assistant":
            prompt += f"[ASSISTANT] {content}\\n"
    
    prompt_ids = tokenizer.encode(prompt.lower())
    generated_ids = model.generate(
        prompt_ids,
        max_new_tokens=max_tokens,
        temperature=temperature,
        top_k=50
    )
    response_text = tokenizer.decode(generated_ids)
    
    return jsonify({
        "id": "chatcmpl-gpt6-astra",
        "object": "chat.completion",
        "model": "gpt-6-astra-prototype",
        "choices": [{
            "index": 0,
            "message": {
                "role": "assistant",
                "content": response_text
            },
            "finish_reason": "stop"
        }],
        "usage": {
            "prompt_tokens": len(prompt_ids),
            "completion_tokens": len(generated_ids),
            "total_tokens": len(prompt_ids) + len(generated_ids)
        }
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "active", "model": "GPT-6 Astra Prototype"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)`;

  const codeTabs = [
    { id: 'config', label: 'Config', icon: Layers },
    { id: 'tokenizer', label: 'Tokenizer', icon: Code2 },
    { id: 'model', label: 'Model', icon: Brain },
    { id: 'train', label: 'Training', icon: Zap },
    { id: 'server', label: 'API Server', icon: Globe },
  ];

  return (
    <section id="gpt6-astra" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-purple-300">Blueprint Lengkap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
            GPT-6 Astra Prototype
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Arsitektur modern dengan RoPE, SwiGLU, dan RMSNorm — kode kerja lengkap dari konfigurasi hingga deployment
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Arsitektur Transformer Decoder-Only
          </h3>
          <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800/50 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300 font-mono whitespace-pre">{architectureDiagram}</pre>
          </div>
        </motion.div>

        {/* Key Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { title: 'RoPE', desc: 'Rotary Position Embedding untuk generalisasi panjang sequence', icon: '🔄', color: 'purple' },
            { title: 'SwiGLU', desc: 'Feed-forward dengan aktivasi SiLU untuk performa lebih baik', icon: '⚡', color: 'yellow' },
            { title: 'RMSNorm', desc: 'Normalisasi lebih efisien dibanding LayerNorm', icon: '📊', color: 'cyan' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-gray-900/50 border border-gray-800/50"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Code Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {codeTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCode(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeCode === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Code Display */}
        <motion.div
          key={activeCode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeCode === 'config' && <CodeBlock code={configCode} title="config.py" />}
          {activeCode === 'tokenizer' && <CodeBlock code={tokenizerCode} title="tokenizer.py" />}
          {activeCode === 'model' && <CodeBlock code={modelCode} title="model.py" />}
          {activeCode === 'train' && <CodeBlock code={trainCode} title="train.py" />}
          {activeCode === 'server' && <CodeBlock code={serverCode} title="server.py" />}
        </motion.div>
      </div>
    </section>
  );
}

// ============ ROADMAP SECTION ============
function RoadmapSection() {
  const roadmap = [
    { phase: '1', title: 'Prototipe', desc: 'Model kecil (4 layer, 256 dimensi)', time: '1-2 minggu', color: 'green' },
    { phase: '2', title: 'Dataset', desc: 'Kumpulkan corpus Bahasa Indonesia + Inggris (10GB+)', time: '2-4 minggu', color: 'blue' },
    { phase: '3', title: 'Scale Up', desc: 'Naikkan ke 1B+ parameter, banyak GPU', time: '2-3 bulan', color: 'cyan' },
    { phase: '4', title: 'Pretraining', desc: 'Latih dari nol dengan massive dataset', time: '6-12 bulan', color: 'purple' },
    { phase: '5', title: 'Fine-tuning', desc: 'Instruction tuning (SFT), RLHF, DPO', time: '2-4 minggu', color: 'pink' },
    { phase: '6', title: 'Evaluasi', desc: 'Benchmark: MMLU, HumanEval, ARC-AGI', time: '1-2 minggu', color: 'yellow' },
    { phase: '7', title: 'Deploy', desc: 'API server, scaling, monitoring', time: '2-4 minggu', color: 'orange' },
  ];

  const colorMap: Record<string, string> = {
    green: 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-400',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400',
    pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 text-pink-400',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400',
    orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400',
  };

  return (
    <section id="roadmap" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Roadmap Pengembangan 🗺️
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dari prototipe kecil hingga model produksi skala penuh
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-purple-500/50 to-orange-500/50 hidden md:block" />

          <div className="space-y-6">
            {roadmap.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline dot */}
                <div className={`hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${colorMap[item.color]} border-2 items-center justify-center font-bold text-lg`}>
                  {item.phase}
                </div>

                {/* Content card */}
                <div className={`flex-1 p-6 rounded-2xl bg-gradient-to-br border backdrop-blur-sm ${colorMap[item.color]}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full bg-black/20 ${colorMap[item.color].split(' ').pop()}`}>
                      <Clock className="w-3 h-3 inline mr-1" />
                      {item.time}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ FEATURES SECTION ============
function FeaturesSection() {
  const features = [
    { feature: 'Context 1M tokens', impl: 'FlashAttention + MoE (Mixture of Experts)', icon: '📏' },
    { feature: 'Multi-modal (teks+gambar)', impl: 'Tambahkan Vision Transformer (ViT) encoder', icon: '🖼️' },
    { feature: 'Tool use / Function calling', impl: 'Parse output JSON → eksekusi fungsi', icon: '🔧' },
    { feature: 'Reasoning (chain-of-thought)', impl: 'Fine-tune dengan reasoning data', icon: '🧠' },
    { feature: 'Agentic workflows', impl: 'Tambahkan planning module + tool loop', icon: '🤖' },
    { feature: 'Computer use', impl: 'Integrasi dengan OS automation (screenshots + actions)', icon: '💻' },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Fitur GPT-6 Astra 🔧
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Fitur-fitur advanced yang bisa diimplementasikan dalam model AI modern
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-cyan-500/30 transition-all group"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">{item.feature}</h3>
              <p className="text-gray-400 text-sm">{item.impl}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ QUICK START SECTION ============
function QuickStartSection() {
  const setupCode = `# Install dependencies
pip install torch torchvision flask

# Jalankan training
python train.py

# Jalankan server API
python server.py

# Test dengan curl
curl -X POST http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {"role": "user", "content": "Apa itu kecerdasan buatan?"}
    ],
    "temperature": 0.7
  }'`;

  return (
    <section id="quickstart" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Setup Cepat 📦
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Jalankan prototipe GPT-6 Astra dalam hitungan menit
          </p>
        </motion.div>

        <CodeBlock code={setupCode} title="setup.sh" />

        {/* Important notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="text-white font-semibold mb-2">Model Prototipe</h3>
                <p className="text-gray-300 text-sm">
                  Kode di atas adalah prototipe kecil (~10M parameter) untuk belajar. 
                  GPT-6 Astra asli membutuhkan ~triliunan parameter dan ribuan GPU.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="text-white font-semibold mb-2">Saran Praktis</h3>
                <p className="text-gray-300 text-sm">
                  Untuk produksi, lebih baik fine-tune model open-source (LLaMA, Mistral, Qwen) 
                  daripada melatih dari nol. Gunakan HuggingFace + Unsloth.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Orbit className="w-5 h-5 text-purple-400" />
              <Star className="w-2 h-2 text-yellow-400 fill-yellow-400 absolute top-0 right-0" />
            </div>
            <span className="font-bold text-white">nxt-1 <span className="text-purple-400">astro</span></span>
            <span className="text-gray-500 text-sm ml-2">— Panduan Lengkap AI Model</span>
          </div>
          <div className="text-gray-500 text-sm flex items-center gap-2">
            <Star className="w-3 h-3 text-yellow-400/50 fill-yellow-400/50" />
            Dibuat dengan ❤️ untuk komunitas AI Indonesia
            <Star className="w-3 h-3 text-yellow-400/50 fill-yellow-400/50" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navigation />
      <HeroSection />
      <OverviewSection />
      <GPT6AstraBlueprintSection />
      <ArchitectureSection />
      <TokenizationSection />
      <PipelineSection />
      <TrainingLoopSection />
      <DistributedTrainingSection />
      <ToolsSection />
      <RLHFSection />
      <ResourcesSection />
      <DeploymentSection />
      <RoadmapSection />
      <FeaturesSection />
      <QuickStartSection />
      <GettingStartedSection />
      <LearningSection />
      <Footer />
    </div>
  );
}
