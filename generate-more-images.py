#!/usr/bin/env python3
"""Generate GPT-1.5 images for new articles"""

import os
import base64
import requests

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

images = [
    {
        "filename": "b2b-video-strategy.png",
        "prompt": "A modern B2B sales professional recording a video on a laptop in a bright office space. Three video thumbnails floating in the air showing different video types: a customer testimonial, an expert presentation, and a casual team introduction. Clean minimalist setting with natural window light. Photorealistic photo as if it was taken with an iPhone 16 in ultra HD."
    },
    {
        "filename": "content-marketing-2026.png",
        "prompt": "A creative workspace with multiple devices showing different content platforms: laptop with LinkedIn, tablet with TikTok, phone with YouTube. Content calendars and strategy notes scattered on a clean white desk. Modern office environment with plants. Photorealistic photo as if it was taken with an iPhone 16 in ultra HD."
    }
]

print("🎨 Generating GPT-1.5 images for new articles...")

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
            
            size_mb = os.path.getsize(path) / 1024 / 1024
            print(f"✅ Saved: {img['filename']} ({size_mb:.2f} MB)")
        else:
            print(f"❌ Error {response.status_code}: {response.text[:200]}")
    except Exception as e:
        print(f"❌ Error: {e}")

print("\n✅ Image generation complete!")
