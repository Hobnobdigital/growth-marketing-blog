#!/usr/bin/env python3
"""
Pulse AI - Article Approval & Publisher
Generates rewritten articles with Claude + OpenAI images
"""

import json
import os
import re
import requests
import base64
from datetime import datetime

ANTHROPIC_API_KEY = os.environ.get('ANTHROPIC_API_KEY')
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

def rewrite_with_claude(title, content, source):
    """Rewrite article with Claude"""
    
    prompt = f"""You are a witty, sharp tech journalist for Pulse AI.

Write a compelling article based on this source:

TITLE: {title}
CONTENT: {content[:4000]}
SOURCE: {source}

Requirements:
1. Headline: Catchy, informative, dry humor if appropriate
2. Tone: Smart, informed, witty
3. Length: 400-500 words  
4. Completely original - not traceable to source
5. Category: Choose from [LLMs, Enterprise AI, Industry, Research, GenAI]

Return JSON:
{{
  "title": "headline",
  "category": "Category", 
  "readTime": "X min read",
  "excerpt": "2-3 sentence summary",
  "content": "article content"
}}"""

    try:
        response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": ANTHROPIC_API_KEY,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01"
            },
            json={
                "model": "claude-3-haiku-20240307",
                "max_tokens": 2000,
                "messages": [{"role": "user", "content": prompt}]
            },
            timeout=120
        )
        
        if response.status_code == 200:
            data = response.json()
            content = data['content'][0]['text']
            
            # Extract JSON
            json_match = re.search(r'\{[\s\S]*\}', content)
            if json_match:
                return json.loads(json_match.group(0))
        
        return None
    except Exception as e:
        print(f"Error with Claude: {e}")
        return None

def generate_image(title, excerpt):
    """Generate image with OpenAI"""
    
    prompt = f"Photorealistic editorial illustration for tech news: {title}. {excerpt}. Modern cinematic style with purple and cyan neon accents. Professional tech aesthetic."
    
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
            timeout=120
        )
        
        if response.status_code == 200:
            data = response.json()
            return data['data'][0]['b64_json']
        
        return None
    except Exception as e:
        print(f"Error with OpenAI: {e}")
        return None

def publish_article(article_data, original_link, source):
    """Publish article to Pulse AI"""
    
    # Generate unique ID
    article_id = article_data['title'].lower().replace(' ', '-').replace('[^a-z0-9-]', '')[:50]
    timestamp = int(datetime.now().timestamp())
    
    # Generate image
    print("🎨 Generating image...")
    image_b64 = generate_image(article_data['title'], article_data['excerpt'])
    
    if image_b64:
        image_filename = f"{article_id}-{timestamp}.png"
        image_path = f"/home/ec2-user/clawd/pulse-ai/public/images/{image_filename}"
        
        # Save image
        with open(image_path, "wb") as f:
            f.write(base64.b64decode(image_b64))
        
        image_url = f"/images/{image_filename}"
    else:
        image_url = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"
    
    # Build post object
    post = {
        "id": article_id,
        "slug": article_id,
        "title": article_data['title'],
        "snippet": article_data['excerpt'],
        "content": article_data['content'],
        "category": article_data['category'],
        "read_time": article_data['readTime'],
        "image_url": image_url,
        "images": [image_url],
        "source": source,
        "source_attribution": f"Based on {source}",
        "original_link": original_link,
        "published_at": datetime.now().isoformat()
    }
    
    # Read existing posts
    posts_file = '/home/ec2-user/clawd/pulse-ai/public/posts/posts.json'
    with open(posts_file, 'r') as f:
        posts = json.load(f)
    
    # Add new post at beginning
    posts.insert(0, post)
    
    # Keep only last 50
    posts = posts[:50]
    
    # Save
    with open(posts_file, 'w') as f:
        json.dump(posts, f, indent=2)
    
    print(f"✅ Article published: {article_data['title']}")
    print(f"   Cost: ~$0.08 (Claude + OpenAI image)")
    
    return post

def process_approval(article_numbers):
    """Process user approval and publish selected articles"""
    
    state_file = '/home/ec2-user/clawd/pulse-ai/.rss-monitor-state.json'
    
    if not os.path.exists(state_file):
        print("No pending articles to publish")
        return
    
    with open(state_file, 'r') as f:
        state = json.load(f)
    
    articles = state.get('articles', [])
    
    for num in article_numbers:
        try:
            idx = int(num) - 1
            if 0 <= idx < len(articles):
                article = articles[idx]
                
                print(f"\n📝 Processing: {article['title']}")
                
                # Rewrite with Claude
                print("✍️ Rewriting with Claude...")
                rewritten = rewrite_with_claude(
                    article['title'],
                    article['description'],
                    article['source']
                )
                
                if rewritten:
                    # Publish
                    published = publish_article(
                        rewritten,
                        article['link'],
                        article['source']
                    )
                    
                    # Git commit
                    print("🚀 Pushing to GitHub...")
                    os.system('cd /home/ec2-user/clawd/pulse-ai && git add -A && git commit -m "auto: New article" && git push')
                    
                    print("✅ Published and deployed!")
                else:
                    print("❌ Failed to rewrite article")
            else:
                print(f"Invalid article number: {num}")
        except ValueError:
            print(f"Invalid input: {num}")

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python3 approve-articles.py 1,3,5")
        print("   or: python3 approve-articles.py all")
        return
    
    arg = sys.argv[1]
    
    if arg.lower() == 'all':
        # Publish all pending articles
        state_file = '/home/ec2-user/clawd/pulse-ai/.rss-monitor-state.json'
        if os.path.exists(state_file):
            with open(state_file, 'r') as f:
                state = json.load(f)
            articles = state.get('articles', [])
            numbers = [str(i+1) for i in range(len(articles))]
            process_approval(numbers)
    else:
        # Parse comma-separated numbers
        numbers = [n.strip() for n in arg.split(',')]
        process_approval(numbers)

if __name__ == "__main__":
    main()
