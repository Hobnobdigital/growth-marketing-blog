#!/usr/bin/env python3
"""
Test script for Pulse AI content engine
Run this to verify all components are working before n8n setup
"""

import os
import json
import requests

def test_anthropic_api():
    """Test Anthropic API connection"""
    print("\n🧪 Testing Anthropic API...")
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    
    if not api_key:
        print("❌ ANTHROPIC_API_KEY not found in environment")
        return False
    
    try:
        response = requests.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "x-api-key": api_key,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01"
            },
            json={
                "model": "claude-3-haiku-20240307",
                "max_tokens": 100,
                "messages": [{"role": "user", "content": "Say 'Pulse AI test successful'"}]
            },
            timeout=30
        )
        
        if response.status_code == 200:
            print("✅ Anthropic API working")
            return True
        else:
            print(f"❌ Anthropic API error: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Anthropic API error: {e}")
        return False

def test_openai_api():
    """Test OpenAI API connection"""
    print("\n🧪 Testing OpenAI API...")
    api_key = os.environ.get('OPENAI_API_KEY')
    
    if not api_key:
        print("❌ OPENAI_API_KEY not found in environment")
        return False
    
    try:
        response = requests.get(
            "https://api.openai.com/v1/models",
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=10
        )
        
        if response.status_code == 200:
            print("✅ OpenAI API working")
            return True
        else:
            print(f"❌ OpenAI API error: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ OpenAI API error: {e}")
        return False

def test_rss_feeds():
    """Test RSS feed accessibility"""
    print("\n🧪 Testing RSS feeds...")
    
    feeds = [
        "https://openai.com/blog/rss.xml",
        "https://www.marktechpost.com/feed/",
        "https://techcrunch.com/category/artificial-intelligence/feed/",
        "https://venturebeat.com/category/ai/feed/",
        "https://www.anthropic.com/news/rss.xml"
    ]
    
    working = 0
    for feed in feeds:
        try:
            response = requests.get(feed, timeout=10)
            if response.status_code == 200:
                working += 1
                print(f"  ✅ {feed.split('/')[2]}")
            else:
                print(f"  ⚠️  {feed.split('/')[2]} - Status {response.status_code}")
        except Exception as e:
            print(f"  ❌ {feed.split('/')[2]} - {str(e)[:50]}")
    
    print(f"\n📊 {working}/{len(feeds)} feeds accessible")
    return working > 0

def test_file_structure():
    """Test required directories exist"""
    print("\n🧪 Testing file structure...")
    
    required_paths = [
        "/home/ec2-user/clawd/pulse-ai/public/posts/posts.json",
        "/home/ec2-user/clawd/pulse-ai/public/images"
    ]
    
    all_exist = True
    for path in required_paths:
        if os.path.exists(path):
            print(f"  ✅ {path}")
        else:
            print(f"  ❌ {path} missing")
            all_exist = False
    
    return all_exist

def test_git_access():
    """Test Git repository access"""
    print("\n🧪 Testing Git access...")
    
    git_dir = "/home/ec2-user/clawd/pulse-ai/.git"
    if os.path.exists(git_dir):
        print("  ✅ Git repository found")
        return True
    else:
        print("  ❌ Git repository not found")
        return False

def main():
    print("=" * 60)
    print("🚀 Pulse AI Content Engine - Pre-flight Check")
    print("=" * 60)
    
    results = {
        "Anthropic API": test_anthropic_api(),
        "OpenAI API": test_openai_api(),
        "RSS Feeds": test_rss_feeds(),
        "File Structure": test_file_structure(),
        "Git Access": test_git_access()
    }
    
    print("\n" + "=" * 60)
    print("📋 TEST RESULTS SUMMARY")
    print("=" * 60)
    
    for test, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} - {test}")
    
    all_passed = all(results.values())
    
    if all_passed:
        print("\n🎉 All tests passed! Ready to import n8n workflow.")
        print("\nNext steps:")
        print("  1. Open n8n dashboard")
        print("  2. Import pulse-ai-content-engine.json")
        print("  3. Configure credentials")
        print("  4. Enable schedule")
    else:
        print("\n⚠️  Some tests failed. Please fix issues before importing.")
        print("\nCommon fixes:")
        print("  • Set ANTHROPIC_API_KEY and OPENAI_API_KEY environment variables")
        print("  • Ensure RSS feeds are accessible (check firewall/VPN)")
        print("  • Verify Git repository is initialized")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    exit(main())
