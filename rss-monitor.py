#!/usr/bin/env python3
"""
Growth Pulse - RSS Monitor
Fetches latest articles from marketing sources daily
"""

import feedparser
import json
from datetime import datetime, timedelta
from typing import List, Dict

# RSS Sources for Growth Marketing
RSS_SOURCES = {
    "Search Engine Journal": "https://www.searchenginejournal.com/feed/",
    "Search Engine Land": "https://searchengineland.com/feed/",
    "Moz Blog": "https://moz.com/blog/feed",
    "HubSpot Marketing": "https://blog.hubspot.com/marketing/rss.xml",
    "Neil Patel": "https://neilpatel.com/blog/feed/",
    "GrowthHackers": "https://growthhackers.com/feed",
    "SaaStr": "https://www.saastr.com/feed/",
    "Social Media Examiner": "https://www.socialmediaexaminer.com/feed/",
    "Marketing AI Institute": "https://www.marketingaiinstitute.com/rss.xml",
    "MarTech": "https://martech.org/feed/",
}

def fetch_feed(source_name: str, feed_url: str) -> List[Dict]:
    """Fetch articles from a single RSS feed"""
    try:
        feed = feedparser.parse(feed_url)
        articles = []
        
        for entry in feed.entries[:5]:  # Get top 5 articles
            # Parse published date
            published = entry.get('published_parsed') or entry.get('updated_parsed')
            if published:
                pub_date = datetime(*published[:6])
            else:
                continue
            
            # Only get articles from last 24 hours
            if datetime.now() - pub_date > timedelta(hours=24):
                continue
            
            articles.append({
                "title": entry.get('title', ''),
                "link": entry.get('link', ''),
                "summary": entry.get('summary', '')[:300],
                "published": pub_date.isoformat(),
                "source": source_name
            })
        
        return articles
    except Exception as e:
        print(f"Error fetching {source_name}: {e}")
        return []

def fetch_all_sources() -> Dict[str, List[Dict]]:
    """Fetch from all RSS sources"""
    all_articles = {}
    
    for source_name, feed_url in RSS_SOURCES.items():
        print(f"Fetching {source_name}...")
        articles = fetch_feed(source_name, feed_url)
        if articles:
            all_articles[source_name] = articles
            print(f"  ✓ Found {len(articles)} recent articles")
        else:
            print(f"  - No recent articles")
    
    return all_articles

def identify_trending_topics(articles: Dict[str, List[Dict]]) -> List[Dict]:
    """Identify trending topics across multiple sources"""
    # Simple keyword matching for trending topics
    topic_keywords = {
        "SEO": ["seo", "search", "ranking", "google update"],
        "Social Media": ["instagram", "tiktok", "linkedin", "social media"],
        "AI Marketing": ["ai", "artificial intelligence", "chatgpt", "automation"],
        "Content Marketing": ["content", "blogging", "copywriting"],
        "Paid Ads": ["ppc", "google ads", "facebook ads", "paid"],
        "Analytics": ["analytics", "data", "metrics", "roi"],
        "Email Marketing": ["email", "newsletter"],
        "CRO": ["conversion", "landing page", "a/b test"]
    }
    
    trending = []
    
    for topic, keywords in topic_keywords.items():
        sources_covering = []
        
        for source, articles_list in articles.items():
            for article in articles_list:
                title_lower = article['title'].lower()
                if any(kw in title_lower for kw in keywords):
                    sources_covering.append({
                        "source": source,
                        "title": article['title'],
                        "link": article['link'],
                        "summary": article['summary']
                    })
                    break
        
        if len(sources_covering) >= 2:  # Trending if covered by 2+ sources
            trending.append({
                "topic": topic,
                "sources": sources_covering,
                "coverage_count": len(sources_covering)
            })
    
    # Sort by coverage count
    trending.sort(key=lambda x: x['coverage_count'], reverse=True)
    return trending

def save_daily_digest(articles: Dict, trending: List[Dict]):
    """Save daily digest for review"""
    digest = {
        "date": datetime.now().isoformat(),
        "articles_by_source": articles,
        "trending_topics": trending
    }
    
    filename = f"daily-digest-{datetime.now().strftime('%Y-%m-%d')}.json"
    with open(filename, 'w') as f:
        json.dump(digest, f, indent=2)
    
    print(f"\n📄 Saved digest: {filename}")

def main():
    """Main monitoring function"""
    print("🔍 Growth Pulse - Daily RSS Monitor")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("-" * 50)
    
    # Fetch all sources
    articles = fetch_all_sources()
    
    print("\n📊 Total articles found:", sum(len(v) for v in articles.values()))
    
    # Identify trending topics
    trending = identify_trending_topics(articles)
    
    print("\n🔥 Trending Topics:")
    for topic in trending[:5]:  # Top 5 trending
        print(f"\n  {topic['topic']} ({topic['coverage_count']} sources)")
        for source in topic['sources'][:2]:  # Show first 2 sources
            print(f"    - {source['source']}: {source['title'][:60]}...")
    
    # Save digest
    save_daily_digest(articles, trending)
    
    print("\n✅ Monitoring complete!")
    print("\nNext steps:")
    print("1. Review daily-digest-YYYY-MM-DD.json")
    print("2. Select trending topics to write about")
    print("3. Read original articles for context")
    print("4. Write original Growth Pulse article")
    print("5. Generate GPT-1.5 image")
    print("6. Publish to posts.json")

if __name__ == "__main__":
    main()
