#!/usr/bin/env python3
"""
Test Script untuk Model nxt-1 astro
Script ini menguji berbagai aspek model AI
"""

import requests
import json
import time
from typing import Dict, List
import sys

class ModelTester:
    def __init__(self, api_url: str = "http://localhost:8000"):
        self.api_url = api_url
        self.results = []
        
    def test_basic_generation(self, prompt: str, max_tokens: int = 100) -> Dict:
        """Test basic text generation"""
        print(f"\n🧪 Testing: {prompt[:50]}...")
        
        start_time = time.time()
        
        try:
            response = requests.post(
                f"{self.api_url}/generate",
                json={
                    "prompt": prompt,
                    "max_tokens": max_tokens,
                    "temperature": 0.7,
                    "top_p": 0.9
                },
                timeout=30
            )
            
            latency = time.time() - start_time
            
            if response.status_code == 200:
                result = response.json()
                tokens = len(result.get('text', '').split())
                tokens_per_sec = tokens / latency if latency > 0 else 0
                
                test_result = {
                    'test': 'basic_generation',
                    'prompt': prompt,
                    'status': 'success',
                    'latency': latency,
                    'tokens': tokens,
                    'tokens_per_sec': tokens_per_sec,
                    'response': result.get('text', '')[:200] + '...'
                }
            else:
                test_result = {
                    'test': 'basic_generation',
                    'prompt': prompt,
                    'status': 'error',
                    'error': f"HTTP {response.status_code}"
                }
                
        except Exception as e:
            test_result = {
                'test': 'basic_generation',
                'prompt': prompt,
                'status': 'error',
                'error': str(e)
            }
        
        self.results.append(test_result)
        self._print_result(test_result)
        return test_result
    
    def test_creative_writing(self) -> Dict:
        """Test creative writing capabilities"""
        prompt = "Tulis cerita pendek tentang robot yang belajar tentang emosi manusia"
        return self.test_basic_generation(prompt, max_tokens=200)
    
    def test_knowledge(self) -> Dict:
        """Test knowledge retrieval"""
        prompt = "Jelaskan apa itu transformer architecture dalam machine learning"
        return self.test_basic_generation(prompt, max_tokens=150)
    
    def test_code_generation(self) -> Dict:
        """Test code generation"""
        prompt = "Tulis fungsi Python untuk menghitung fibonacci sequence"
        return self.test_basic_generation(prompt, max_tokens=100)
    
    def test_reasoning(self) -> Dict:
        """Test reasoning capabilities"""
        prompt = "Jika semua kucing adalah hewan, dan semua hewan butuh makanan, apakah kucing butuh makanan?"
        return self.test_basic_generation(prompt, max_tokens=50)
    
    def test_multilingual(self) -> Dict:
        """Test multilingual capabilities"""
        prompt = "Translate to English: Saya sedang belajar machine learning"
        return self.test_basic_generation(prompt, max_tokens=50)
    
    def test_math(self) -> Dict:
        """Test mathematical reasoning"""
        prompt = "Berapa hasil dari 15 * 23 + 47?"
        return self.test_basic_generation(prompt, max_tokens=30)
    
    def run_all_tests(self):
        """Run all test suites"""
        print("\n" + "="*60)
        print("🚀 NXT-1 ASTRO MODEL TEST SUITE")
        print("="*60)
        
        tests = [
            ("Basic Generation", lambda: self.test_basic_generation("Halo, apa kabar?")),
            ("Creative Writing", self.test_creative_writing),
            ("Knowledge", self.test_knowledge),
            ("Code Generation", self.test_code_generation),
            ("Reasoning", self.test_reasoning),
            ("Multilingual", self.test_multilingual),
            ("Math", self.test_math),
        ]
        
        for test_name, test_func in tests:
            print(f"\n{'='*60}")
            print(f"📝 Running: {test_name}")
            print('='*60)
            try:
                test_func()
            except Exception as e:
                print(f"❌ Test failed: {e}")
        
        self._print_summary()
    
    def _print_result(self, result: Dict):
        """Print test result"""
        if result['status'] == 'success':
            print(f"✅ Status: SUCCESS")
            print(f"⏱️  Latency: {result['latency']:.2f}s")
            print(f"📊 Tokens: {result['tokens']}")
            print(f"⚡ Speed: {result['tokens_per_sec']:.2f} tokens/sec")
            print(f"📝 Response: {result['response']}")
        else:
            print(f"❌ Status: ERROR")
            print(f"🐛 Error: {result.get('error', 'Unknown error')}")
    
    def _print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        total = len(self.results)
        success = sum(1 for r in self.results if r['status'] == 'success')
        failed = total - success
        
        print(f"\nTotal Tests: {total}")
        print(f"✅ Passed: {success}")
        print(f"❌ Failed: {failed}")
        print(f"📈 Success Rate: {(success/total*100):.1f}%" if total > 0 else "N/A")
        
        if success > 0:
            avg_latency = sum(r['latency'] for r in self.results if r['status'] == 'success') / success
            avg_tokens = sum(r['tokens'] for r in self.results if r['status'] == 'success') / success
            avg_speed = sum(r['tokens_per_sec'] for r in self.results if r['status'] == 'success') / success
            
            print(f"\n⏱️  Average Latency: {avg_latency:.2f}s")
            print(f"📊 Average Tokens: {avg_tokens:.1f}")
            print(f"⚡ Average Speed: {avg_speed:.2f} tokens/sec")
        
        print("\n" + "="*60)
        
        # Save results to file
        with open('test_results.json', 'w') as f:
            json.dump(self.results, f, indent=2)
        print("💾 Results saved to test_results.json")

def main():
    """Main function"""
    api_url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000"
    
    print(f"\n🔗 API URL: {api_url}")
    print("Checking API availability...")
    
    try:
        response = requests.get(f"{api_url}/health", timeout=5)
        if response.status_code == 200:
            print("✅ API is available!")
        else:
            print(f"⚠️  API returned status {response.status_code}")
    except Exception as e:
        print(f"❌ Cannot connect to API: {e}")
        print("\n💡 Make sure the model server is running:")
        print("   python server.py")
        sys.exit(1)
    
    tester = ModelTester(api_url)
    tester.run_all_tests()

if __name__ == "__main__":
    main()
