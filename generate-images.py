#!/usr/bin/env python3
"""Generate GPT-1.5 images for Growth Pulse articles"""

import os
import base64
import requests

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

images = [
    {
        "filename": "cookie-deprecation-marketing.png",
        "prompt": "Photorealistic image of digital privacy concept. A broken chocolate chip cookie dissolving into digital particles and binary code. Modern minimalist setting with deep purple and cyan neon lighting accents. Professional marketing aesthetic, hyper realistic, 8K quality, dramatic cinematic lighting."
    },
    {
        "filename": "linkedin-algorithm-strategy.png",
        "prompt": "Photorealistic professional networking concept. A sleek modern smartphone displaying a LinkedIn-style interface with engagement metrics floating above it in holographic displays. Business professionals silhouettes in background. Deep blue and cyan neon lighting. Hyper realistic, 8K quality, professional marketing photography style."
    },
    {
        "filename": "retention-ltv-strategy.png",
        "prompt": "Photorealistic business growth concept. An ascending staircase made of golden coins and graphs leading upward, representing customer lifetime value growth. Modern corporate setting with subtle magenta and cyan neon accent lighting. Hyper realistic, 8K quality, cinematic business photography."
    },
    {
        "filename": "tiktok-shop-commerce.png",
        "prompt": "Photorealistic social commerce concept. A modern smartphone surrounded by floating shopping bags and product boxes with TikTok-style interface elements. Young diverse consumers in background. Vibrant pink, cyan, and yellow neon lighting. Hyper realistic, 8K quality, trendy e-commerce aesthetic."
    },
    {
        "filename": "ai-personalization-marketing.png",
        "prompt": "Photorealistic AI marketing concept. A futuristic customer profile hologram with data streams and personalization nodes connected in a neural network pattern. Modern tech office setting with cyan and magenta neon lighting. Hyper realistic, 8K quality, futuristic marketing technology aesthetic."
    }
]

print("Generating GPT-1.5 images for Growth Pulse articles...")

for img in images:
    try:
        print(f"\nGenerating: {img['filename']}")
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-image-1.5",
                "prompt": img["prompt"],
                "size": "1536x1024",
                "quality": "high"
            },
            timeout=180
        )
        
        if response.status_code == 200:
            data = response.json()
            b64 = data['data'][0]['b64_json']
            
            path = f"/home/ec2-user/clawd/growth-marketing-blog/public/images/{img['filename']}"
            
            with open(path, "wb") as f:
                f.write(base64.b64decode(b64))
            
            print(f"✅ Saved: {img['filename']}")
        else:
            print(f"❌ Error {response.status_code}: {response.text[:200]}")
    except Exception as e:
        print(f"❌ Error: {e}")

print("\n✅ Image generation complete!")
