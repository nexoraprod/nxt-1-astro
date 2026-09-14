import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Cpu, Database, Layers, Code2, Rocket, BookOpen,
  ChevronDown, ChevronRight, Zap, Globe, Server, BarChart3,
  ArrowRight, ExternalLink, Copy, Check, Menu, X, Sparkles,
  TrendingUp, DollarSign, Clock, Users
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// ============ NAVIGATION ============
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '#overview', label: 'Overview' },
    { href: '#architecture', label: 'Arsitektur' },
    { href: '#pipeline', label: 'Pipeline' },
    { href: '#tools', label: 'Tools' },
    { href: '#resources', label: 'Sumber Daya' },
    { href: '#getting-started', label: 'Mulai' },
    { href: '#learning', label: 'Belajar' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="font-bold text-white text-lg">BuildGPT</span>
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
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Panduan Lengkap Membuat Model AI</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Build Your Own{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              GPT Model
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Dari arsitektur Transformer hingga deployment — panduan komprehensif untuk membangun
            model AI skala besar seperti GPT-6, dari nol hingga produksi.
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

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-white">BuildGPT</span>
            <span className="text-gray-500 text-sm ml-2">— Panduan Lengkap AI Model</span>
          </div>
          <div className="text-gray-500 text-sm">
            Dibuat dengan ❤️ untuk komunitas AI Indonesia
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
      <ArchitectureSection />
      <PipelineSection />
      <ToolsSection />
      <ResourcesSection />
      <GettingStartedSection />
      <LearningSection />
      <Footer />
    </div>
  );
}
