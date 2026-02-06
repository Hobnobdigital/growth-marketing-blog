#!/usr/bin/env python3
"""Generate GPT-1.5 images for Growth Pulse articles

Usage: python3 generate-images.py

All images are photorealistic as if taken with an iPhone 16 in ultra HD.
"""

import os
import base64
import requests

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

def generate_image(prompt, filename):
    """Generate a photorealistic image with GPT-1.5"""
    
    # Add photorealistic iPhone 16 instruction to every prompt
    full_prompt = f"{prompt} Photorealistic photo as if it was taken with an iPhone 16 in ultra HD."
    
    try:
        print(f"Generating: {filename}")
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-image-1.5",
                "prompt": full_prompt,
                "size": "1536x1024",
                "quality": "high"
            },
            timeout=180
        )
        
        if response.status_code == 200:
            data = response.json()
            b64 = data['data'][0]['b64_json']
            
            path = f"/home/ec2-user/clawd/growth-marketing-blog/public/images/{filename}"
            
            with open(path, "wb") as f:
                f.write(base64.b64decode(b64))
            
            print(f"✅ Saved: {filename}")
            return True
        else:
            print(f"❌ Error {response.status_code}: {response.text[:200]}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

# Article images configuration
articles = [
    {
        "id": "end-of-third-party-cookies",
        "filename": "cookie-deprecation-marketing.png",
        "prompt": "A close-up of a chocolate chip cookie crumbling and dissolving into digital pixels and binary code on a clean white desk. Modern minimalist office setting with soft natural lighting. Professional product photography style."
    },
    {
        "id": "linkedin-algorithm-2026",
        "filename": "linkedin-algorithm-strategy.png",
        "prompt": "A professional's hand holding an iPhone showing the LinkedIn app with engagement metrics floating above the screen in holographic style. Modern coworking space background with glass walls. Business casual atmosphere."
    },
    {
        "id": "retention-new-acquisition",
        "filename": "retention-ltv-strategy.png",
        "prompt": "A golden staircase made of coins ascending upward with soft glowing light at the top. Clean white background with subtle shadows. Minimalist financial concept photography. Elegant and aspirational."
    },
    {
        "id": "tiktok-shop-revolution",
        "filename": "tiktok-shop-commerce.png",
        "prompt": "A young person's hands holding an iPhone with shopping bags floating around it in a bedroom setting. TikTok interface visible on screen. Natural bedroom lighting with colorful decor. Lifestyle photography."
    },
    {
        "id": "ai-personalization-scale",
        "filename": "ai-personalization-marketing.png",
        "prompt": "A futuristic transparent holographic display showing customer profile data and connection nodes floating above a modern desk. Tech office environment with soft blue ambient lighting. Sci-fi but realistic aesthetic."
    }
]

print("🎨 Generating GPT-1.5 images for Growth Pulse...")
print("All images will be photorealistic iPhone 16 style.\n")

success_count = 0
for article in articles:
    if generate_image(article["prompt"], article["filename"]):
        success_count += 1

print(f"\n✅ Complete! Generated {success_count}/{len(articles)} images.")
print(f"📁 Location: /home/ec2-user/clawd/growth-marketing-blog/public/images/")
