'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import PostCard from './PostCard';

interface Post {
  id: string;
  title: string;
  snippet: string;
  image_url: string;
  category: string;
  read_time: string;
  published_at: string;
}

interface PostGridProps {
  posts: Post[];
  categoryLabel?: string;
  isFiltered?: boolean;
}

export default function PostGrid({ posts, categoryLabel = 'Growth Tactics', isFiltered = false }: PostGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-[var(--font-display)] font-bold mb-3">
              {isFiltered ? categoryLabel : 'Latest'} <span className="text-gradient-neon">{isFiltered ? '' : 'Growth Tactics'}</span>
            </h2>
            <p className="text-ink-muted font-[var(--font-body)] text-lg max-w-xl">
              {isFiltered 
                ? `Showing ${posts.length} article${posts.length !== 1 ? 's' : ''} in ${categoryLabel}`
                : 'Real strategies that actually move the needle. No fluff, just results.'
              }
            </p>
          </div>
          
          {isFiltered && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-[var(--font-display)] font-medium text-ink-muted hover:text-neon-cyan transition-colors border border-border rounded-lg hover:border-neon-cyan/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filter
            </Link>
          )}
        </div>
      </motion.div>

      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-ink-muted text-lg">No articles found in this category.</p>
          <Link href="/" className="text-neon-cyan hover:underline mt-2 inline-block">
            View all articles
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
