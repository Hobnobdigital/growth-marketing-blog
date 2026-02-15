'use client';

import Hero from '@/components/Hero';
import PostGrid from '@/components/PostGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import postsData from '@/public/posts/posts.json';
import { useSearchParams } from 'next/navigation';

export default function FilteredContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // Category mapping
  const categoryBuckets: Record<string, string[]> = {
    'advertising': ['Paid Advertising', 'B2C Marketing'],
    'tech': ['Marketing Tech', 'Marketing Analytics', 'Digital Marketing'],
  };

  // Filter posts based on category
  let filteredPosts = postsData;
  let activeCategoryLabel = 'All Articles';

  if (category && categoryBuckets[category]) {
    const allowedCategories = categoryBuckets[category];
    filteredPosts = postsData.filter(post => allowedCategories.includes(post.category));
    
    if (category === 'advertising') {
      activeCategoryLabel = 'Advertising';
    } else if (category === 'tech') {
      activeCategoryLabel = 'Tech & Analytics';
    }
  }

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <>
      {featuredPost && <Hero post={featuredPost} />}
      <PostGrid 
        posts={otherPosts} 
        categoryLabel={activeCategoryLabel}
        isFiltered={!!category}
      />
      <NewsletterSignup />
    </>
  );
}
