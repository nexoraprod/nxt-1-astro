#!/usr/bin/env python3
"""
API Server untuk Model nxt-1 astro
Server ini menyediakan REST API untuk text generation
"""

from flask import Flask, request, jsonify
import torch
import time
import sys
from pathlib import Path

app = Flask(__name__)

# Global variables
model = None
tokenizer = None
device = None

def load_model():
    """Load model and tokenizer"""
    global model, tokenizer, device
    
    print("🔄 Loading model...")
    
    # Set device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"📱 Using device: {device}")
    
    # Check if model file exists
    model_path = Path("nxt1_astro_prototype.pt")
    if not model_path.exists():
        print("⚠️  Model file not found. Using mock model for testing.")
        return False
    
    try:
        # Load model
        from train import GPTConfig, GPTModel
        from tokenizer import SimpleBPETokenizer
        
        config = GPTConfig(
            vocab_size=1000,
            max_seq_len=512,
            d_model=256,
            n_heads=8,
            n_layers=4,
            d_ff=1024,
        )
        
        model = GPTModel(config)
        model.load_state_dict(torch.load(model_path, map_location=device))
        model.to(device)
        model.eval()
        
        # Load tokenizer
        tokenizer = SimpleBPETokenizer()
        
        print("✅ Model loaded successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        print("💡 Using mock model for testing")
        return False

class MockModel:
    """Mock model for testing when real model is not available"""
    
    def generate(self, prompt, max_tokens=100, temperature=0.7):
        """Generate mock response"""
        # Simple mock responses based on keywords
        prompt_lower = prompt.lower()
        
        if "machine learning" in prompt_lower or "ml" in prompt_lower:
            return "Machine learning adalah cabang dari kecerdasan buatan yang memungkinkan sistem belajar dan meningkatkan kinerja dari pengalaman tanpa diprogram secara eksplisit. Contoh algoritma populer termasuk decision trees, neural networks, dan support vector machines."
        
        elif "robot" in prompt_lower or "cerita" in prompt_lower:
            return "Di sebuah pabrik tua, robot bernama RX-7 menemukan sebuah bunga kecil yang tumbuh di celah beton. Untuk pertama kalinya, sensor emosionalnya aktif. 'Indah,' bisiknya dalam bahasa mesin. Sejak hari itu, RX-7 merawat bunga itu setiap hari, membuktikan bahwa bahkan mesin pun bisa belajar tentang keindahan."
        
        elif "transformer" in prompt_lower:
            return "Transformer architecture adalah model deep learning yang menggunakan mekanisme self-attention untuk memproses data secara paralel. Diperkenalkan dalam paper 'Attention Is All You Need' (2017), transformer menjadi dasar bagi model-model besar seperti GPT, BERT, dan T5."
        
        elif "python" in prompt_lower or "kode" in prompt_lower:
            return "def fibonacci(n):\n    if n <= 1:\n        return n\n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\n# Contoh penggunaan\nfor i in range(10):\n    print(f'Fibonacci({i}) = {fibonacci(i)}')"
        
        elif "deep learning" in prompt_lower:
            return "Deep learning adalah subset dari machine learning yang menggunakan neural networks dengan banyak layer (deep). Setiap layer mengekstrak fitur yang semakin abstrak dari data. Contoh aplikasi: image recognition, natural language processing, dan autonomous driving."
        
        elif "ai" in prompt_lower and "ml" in prompt_lower:
            return "AI (Artificial Intelligence) adalah konsep luas tentang mesin yang bisa melakukan tugas cerdas. ML (Machine Learning) adalah subset dari AI yang fokus pada algoritma yang bisa belajar dari data. Jadi, semua ML adalah AI, tapi tidak semua AI adalah ML."
        
        else:
            return f"Ini adalah response simulasi untuk prompt: '{prompt}'. Dalam implementasi nyata, model nxt-1 astro akan menghasilkan text berdasarkan training data dan arsitektur transformer yang digunakan."

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model': 'nxt-1-astro-prototype',
        'device': str(device) if device else 'mock',
        'timestamp': time.time()
    })

@app.route('/generate', methods=['POST'])
def generate():
    """Generate text endpoint"""
    try:
        data = request.json
        prompt = data.get('prompt', '')
        max_tokens = data.get('max_tokens', 100)
        temperature = data.get('temperature', 0.7)
        top_p = data.get('top_p', 0.9)
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        start_time = time.time()
        
        # Generate text
        if model is not None:
            # Use real model
            prompt_ids = tokenizer.encode(prompt.lower())
            generated_ids = model.generate(
                prompt_ids,
                max_new_tokens=max_tokens,
                temperature=temperature,
                top_k=50
            )
            text = tokenizer.decode(generated_ids)
        else:
            # Use mock model
            mock = MockModel()
            text = mock.generate(prompt, max_tokens, temperature)
        
        latency = time.time() - start_time
        tokens_generated = len(text.split())
        
        return jsonify({
            'text': text,
            'tokens_generated': tokens_generated,
            'latency_ms': int(latency * 1000),
            'model': 'nxt-1-astro-prototype'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/info', methods=['GET'])
def info():
    """Get model info"""
    return jsonify({
        'model': 'nxt-1-astro-prototype',
        'version': '1.0.0',
        'architecture': 'Transformer Decoder-Only',
        'parameters': '~10M (prototype)',
        'vocab_size': 1000,
        'max_seq_len': 512,
        'd_model': 256,
        'n_layers': 4,
        'n_heads': 8,
        'device': str(device) if device else 'mock'
    })

def main():
    """Main function"""
    print("\n" + "="*60)
    print("🚀 NXT-1 ASTRO API SERVER")
    print("="*60)
    print()
    
    # Load model
    model_loaded = load_model()
    
    if not model_loaded:
        print("\n⚠️  Running in MOCK MODE")
        print("💡 To use real model, train it first:")
        print("   python train.py")
        print()
    
    print("\n📡 Server starting on http://localhost:8000")
    print("📋 Endpoints:")
    print("   GET  /health    - Health check")
    print("   POST /generate  - Generate text")
    print("   GET  /info      - Model info")
    print()
    print("🛑 Press Ctrl+C to stop server")
    print("="*60)
    print()
    
    # Start server
    app.run(host='0.0.0.0', port=8000, debug=False)

if __name__ == '__main__':
    main()
