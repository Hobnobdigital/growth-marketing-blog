'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: string;
  title: string;
  snippet: string;
  image_url: string;
  category: string;
  read_time: string;
  published_at: string;
}

// Category to filter bucket mapping
const categoryToBucket: Record<string, string> = {
  'Paid Advertising': 'advertising',
  'B2C Marketing': 'advertising',
  'Marketing Tech': 'tech',
  'Marketing Analytics': 'tech',
  'Digital Marketing': 'tech',
};

// Category styles based on bucket
const categoryStyle: Record<string, { badge: string; accent: string }> = {
  'Paid Advertising': {
    badge: 'bg-neon-magenta/15 text-fuchsia-700 border-neon-magenta/30 hover:bg-neon-magenta/25',
    accent: 'bg-neon-magenta',
  },
  'B2C Marketing': {
    badge: 'bg-neon-magenta/15 text-fuchsia-700 border-neon-magenta/30 hover:bg-neon-magenta/25',
    accent: 'bg-neon-magenta',
  },
  'Marketing Tech': {
    badge: 'bg-neon-cyan/15 text-emerald-700 border-neon-cyan/30 hover:bg-neon-cyan/25',
    accent: 'bg-neon-cyan',
  },
  'Marketing Analytics': {
    badge: 'bg-neon-cyan/15 text-emerald-700 border-neon-cyan/30 hover:bg-neon-cyan/25',
    accent: 'bg-neon-cyan',
  },
  'Digital Marketing': {
    badge: 'bg-neon-cyan/15 text-emerald-700 border-neon-cyan/30 hover:bg-neon-cyan/25',
    accent: 'bg-neon-cyan',
  },
  'B2B Marketing': {
    badge: 'bg-neon-yellow/15 text-amber-700 border-neon-yellow/30 hover:bg-neon-yellow/25',
    accent: 'bg-neon-yellow',
  },
  'Growth Strategy': {
    badge: 'bg-primary-100 text-primary-700 border-primary-200 hover:bg-primary-200',
    accent: 'bg-primary-500',
  },
  'Growth Hacking': {
    badge: 'bg-primary-100 text-primary-700 border-primary-200 hover:bg-primary-200',
    accent: 'bg-primary-500',
  },
  'Breaking News': {
    badge: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
    accent: 'bg-red-500',
  },
};

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const style = categoryStyle[post.category] || categoryStyle['Growth Strategy'];
  const bucket = categoryToBucket[post.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <article className="group relative bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-border hover:border-ink/20 hover:shadow-medium transition-all duration-300">
        {/* Image - clickable to article */}
        <Link href={`/post/${post.id}`} className="block">
          <div className="relative h-52 sm:h-56 overflow-hidden bg-surface-dim">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {/* Category badge - clickable to filter */}
          {bucket ? (
            <Link href={`/?category=${bucket}`}>
              <span
                className={`inline-block self-start px-3 py-1 text-[11px] font-[var(--font-display)] font-semibold uppercase tracking-wider rounded-full border mb-3 cursor-pointer transition-colors ${style.badge}`}
              >
                {post.category}
              </span>
            </Link>
          ) : (
            <span
              className={`inline-block self-start px-3 py-1 text-[11px] font-[var(--font-display)] font-semibold uppercase tracking-wider rounded-full border mb-3 ${style.badge}`}
            >
              {post.category}
            </span>
          )}

          <Link href={`/post/${post.id}`} className="block">
            <h3 className="text-lg sm:text-xl font-[var(--font-display)] font-bold mb-2 leading-snug group-hover:text-gradient-neon transition-all duration-300 cursor-pointer">
              {post.title}
            </h3>
          </Link>

          <Link href={`/post/${post.id}`} className="block flex-1">
            <p className="text-ink-muted font-[var(--font-body)] text-sm leading-relaxed mb-4 line-clamp-3 cursor-pointer">
              {post.snippet}
            </p>
          </Link>

          <div className="flex items-center justify-between text-xs font-[var(--font-display)] text-ink-faint pt-3 border-t border-border-dim">
            <span>{post.read_time}</span>
            <span>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Accent line at bottom */}
        <div className={`h-[3px] ${style.accent} w-0 group-hover:w-full transition-all duration-500`} />
      </article>
    </motion.div>
  );
}
