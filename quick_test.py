#!/usr/bin/env python3
"""
Quick Start Script untuk Testing Model nxt-1 astro
Script ini akan menjalankan model server dan membuka test interface
"""

import subprocess
import webbrowser
import time
import os
import sys
from pathlib import Path

def print_header():
    """Print welcome header"""
    print("\n" + "="*60)
    print("🚀 NXT-1 ASTRO - MODEL TESTING QUICK START")
    print("="*60)
    print()

def check_dependencies():
    """Check if required dependencies are installed"""
    print("🔍 Checking dependencies...")
    
    try:
        import torch
        print("✅ PyTorch installed")
    except ImportError:
        print("❌ PyTorch not found. Install with: pip install torch")
        return False
    
    try:
        import flask
        print("✅ Flask installed")
    except ImportError:
        print("❌ Flask not found. Install with: pip install flask")
        return False
    
    try:
        import requests
        print("✅ Requests installed")
    except ImportError:
        print("❌ Requests not found. Install with: pip install requests")
        return False
    
    print("✅ All dependencies OK!\n")
    return True

def start_model_server():
    """Start the model API server"""
    print("🚀 Starting model server...")
    
    # Check if server.py exists
    if not Path("server.py").exists():
        print("❌ server.py not found!")
        print("💡 Please create server.py first or use the provided template")
        return None
    
    # Start server in background
    process = subprocess.Popen(
        [sys.executable, "server.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    # Wait for server to start
    print("⏳ Waiting for server to start...")
    time.sleep(3)
    
    # Check if server is running
    try:
        import requests
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code == 200:
            print("✅ Server started successfully!")
            print("📡 API available at: http://localhost:8000")
            return process
        else:
            print(f"⚠️  Server returned status {response.status_code}")
            return process
    except Exception as e:
        print(f"❌ Server failed to start: {e}")
        return None

def open_test_interface():
    """Open the test interface in browser"""
    print("\n🌐 Opening test interface...")
    
    test_file = Path("test-model.html")
    if test_file.exists():
        webbrowser.open(f"file://{test_file.absolute()}")
        print("✅ Test interface opened in browser!")
    else:
        print("❌ test-model.html not found!")

def run_automated_tests():
    """Run automated test suite"""
    print("\n🧪 Running automated tests...")
    
    test_file = Path("test_model.py")
    if test_file.exists():
        subprocess.run([sys.executable, "test_model.py"])
    else:
        print("❌ test_model.py not found!")

def show_menu():
    """Show interactive menu"""
    print("\n" + "="*60)
    print("📋 TESTING OPTIONS")
    print("="*60)
    print()
    print("1. 🌐 Open Web Test Interface (test-model.html)")
    print("2. 🧪 Run Automated Test Suite (test_model.py)")
    print("3. 🚀 Start Full Testing (Server + Web + Tests)")
    print("4. 📊 Run Benchmark Tests")
    print("5. 🛑 Stop Model Server")
    print("6. ❌ Exit")
    print()
    
    choice = input("Enter your choice (1-6): ").strip()
    return choice

def run_benchmark():
    """Run benchmark tests"""
    print("\n📊 Running benchmark tests...")
    
    benchmark_script = Path("benchmark_test.py")
    if benchmark_script.exists():
        subprocess.run([sys.executable, "benchmark_test.py"])
    else:
        print("❌ benchmark_test.py not found!")
        print("💡 Creating benchmark_test.py...")
        create_benchmark_script()

def create_benchmark_script():
    """Create benchmark test script"""
    benchmark_code = '''#!/usr/bin/env python3
"""
Benchmark Test untuk Model nxt-1 astro
"""

import requests
import time
import statistics

def benchmark_generation(api_url="http://localhost:8000", num_tests=10):
    """Benchmark text generation performance"""
    print("\\n" + "="*60)
    print("📊 BENCHMARK TEST")
    print("="*60)
    
    prompts = [
        "Jelaskan apa itu machine learning",
        "Tulis cerita pendek tentang AI",
        "Apa perbedaan deep learning dan machine learning?",
        "Jelaskan transformer architecture",
        "Berapa hasil dari 123 * 456?",
    ]
    
    latencies = []
    tokens_per_sec_list = []
    
    for i in range(num_tests):
        prompt = prompts[i % len(prompts)]
        print(f"\\nTest {i+1}/{num_tests}: {prompt[:40]}...")
        
        start_time = time.time()
        
        try:
            response = requests.post(
                f"{api_url}/generate",
                json={
                    "prompt": prompt,
                    "max_tokens": 100,
                    "temperature": 0.7
                },
                timeout=30
            )
            
            latency = time.time() - start_time
            
            if response.status_code == 200:
                result = response.json()
                tokens = len(result.get('text', '').split())
                tps = tokens / latency if latency > 0 else 0
                
                latencies.append(latency)
                tokens_per_sec_list.append(tps)
                
                print(f"  ✅ Latency: {latency:.2f}s | Tokens: {tokens} | Speed: {tps:.2f} tok/s")
            else:
                print(f"  ❌ Error: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"  ❌ Error: {e}")
    
    if latencies:
        print("\\n" + "="*60)
        print("📈 BENCHMARK RESULTS")
        print("="*60)
        print(f"Total Tests: {len(latencies)}")
        print(f"Average Latency: {statistics.mean(latencies):.2f}s")
        print(f"Median Latency: {statistics.median(latencies):.2f}s")
        print(f"Min Latency: {min(latencies):.2f}s")
        print(f"Max Latency: {max(latencies):.2f}s")
        print(f"Std Dev: {statistics.stdev(latencies):.2f}s" if len(latencies) > 1 else "")
        print(f"\\nAverage Speed: {statistics.mean(tokens_per_sec_list):.2f} tokens/sec")
        print(f"Max Speed: {max(tokens_per_sec_list):.2f} tokens/sec")
        print("="*60)

if __name__ == "__main__":
    benchmark_generation()
'''
    
    with open("benchmark_test.py", "w") as f:
        f.write(benchmark_code)
    
    print("✅ benchmark_test.py created!")

def main():
    """Main function"""
    print_header()
    
    # Check dependencies
    if not check_dependencies():
        print("\\n❌ Please install missing dependencies and try again.")
        sys.exit(1)
    
    server_process = None
    
    while True:
        choice = show_menu()
        
        if choice == "1":
            open_test_interface()
        
        elif choice == "2":
            if server_process is None:
                print("⚠️  Server not running. Starting server...")
                server_process = start_model_server()
                if server_process is None:
                    continue
            run_automated_tests()
        
        elif choice == "3":
            server_process = start_model_server()
            if server_process:
                time.sleep(2)
                open_test_interface()
                time.sleep(2)
                run_automated_tests()
        
        elif choice == "4":
            if server_process is None:
                print("⚠️  Server not running. Starting server...")
                server_process = start_model_server()
                if server_process is None:
                    continue
            run_benchmark()
        
        elif choice == "5":
            if server_process:
                print("🛑 Stopping server...")
                server_process.terminate()
                server_process = None
                print("✅ Server stopped")
            else:
                print("⚠️  No server running")
        
        elif choice == "6":
            if server_process:
                print("🛑 Stopping server...")
                server_process.terminate()
            print("\\n👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
