#!/usr/bin/env python3
"""
Simple HTTP server untuk serve landing page nxt-1 astro
Usage: python3 serve-landing.py
"""

import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 8080
DIRECTORY = Path(__file__).parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

def main():
    print("\n🚀 nxt-1 astro Landing Page Server")
    print("=" * 50)
    print(f"\n📍 Server running at: http://localhost:{PORT}")
    print(f"📁 Serving from: {DIRECTORY}")
    print("\n🛑 Press Ctrl+C to stop the server\n")
    
    # Auto open browser
    webbrowser.open(f"http://localhost:{PORT}")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Server stopped. See you!")

if __name__ == "__main__":
    main()
