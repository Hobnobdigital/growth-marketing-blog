#!/usr/bin/env python3
"""Generate GPT-1.5 image for AI Marketing Gold Rush article"""

import os
import base64
import requests

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

prompt = "A modern marketing office desk with multiple computer screens showing AI software dashboards and analytics charts. Scattered around are shiny new tech gadgets, smartphones, and tablets with AI apps open. In the foreground, crumpled receipts and unused software license cards pile up. Natural office lighting from a window. Photorealistic photo as if it was taken with an iPhone 16 in ultra HD."

print("Generating GPT-1.5 image for AI Marketing Gold Rush article...")

try:
    response = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "gpt-image-1.5",
            "prompt": prompt,
            "size": "1536x1024",
            "quality": "high"
        },
        timeout=180
    )
    
    if response.status_code == 200:
        data = response.json()
        b64 = data['data'][0]['b64_json']
        
        filename = "ai-marketing-gold-rush.png"
        path = f"/home/ec2-user/clawd/growth-marketing-blog/public/images/{filename}"
        
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64))
        
        print(f"✅ Saved: {filename}")
        print(f"   Size: {os.path.getsize(path) / 1024 / 1024:.2f} MB")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text[:200])
except Exception as e:
    print(f"❌ Error: {e}")
