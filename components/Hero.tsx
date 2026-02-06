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

export default function Hero({ post }: { post: Post }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-neon-cyan text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-widest border border-ink/10 rounded-full">
            Featured
          </span>
        </motion.div>

        <Link href={`/post/${post.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer bg-surface-dim"
          >
            {/* Image Container - Title Below Image to Prevent Cutoff */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>

            {/* Content Below Image - No Overlay, No Cutoff */}
            <div className="bg-ink p-6 sm:p-8 md:p-10">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-neon-cyan/90 text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title - Full Width, No Clamping */}
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[var(--font-display)] font-bold text-white mb-4 leading-[1.2]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {post.title}
              </motion.h1>

              {/* Snippet */}
              <motion.p
                className="text-base sm:text-lg text-white/80 mb-6 max-w-3xl font-[var(--font-body)] leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {post.snippet}
              </motion.p>

              {/* Meta */}
              <motion.div
                className="flex items-center gap-3 text-sm text-white/60 font-[var(--font-display)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                  {post.read_time}
                </span>
                <span className="text-white/30">|</span>
                <span>
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </motion.div>
            </div>

            {/* Hover neon border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-neon-cyan/40 transition-all duration-500 pointer-events-none" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
