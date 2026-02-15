'use client';

import Hero from '@/components/Hero';
import PostGrid from '@/components/PostGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import CategoryFilter from '@/components/CategoryFilter';
import postsData from '@/public/posts/posts.json';
import { useState, useEffect } from 'react';

export default function FilteredContent() {
  const [category, setCategory] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setCategory(params.get('category'));
    }
  }, []);

  // Filter posts based on category
  let filteredPosts = postsData;
  let activeCategoryLabel = 'All Articles';

  if (category) {
    filteredPosts = postsData.filter(post => post.category === category);
    activeCategoryLabel = category;
  }

  const featuredPost = !category ? filteredPosts[0] : null;
  const otherPosts = !category ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      {/* Filter Bar */}
      <section className="bg-surface-dim/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <CategoryFilter />
        </div>
      </section>
      
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
