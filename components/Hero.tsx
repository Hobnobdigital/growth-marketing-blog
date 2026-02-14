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
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
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
            className="group relative rounded-2xl cursor-pointer bg-ink overflow-hidden"
          >
            {/* Image Container - Constrained height so title fits above fold */}
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>

            {/* Content Below Image - Compact but readable */}
            <div className="p-5 sm:p-6 md:p-8">
              {/* Category */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-neon-cyan/90 text-ink text-xs font-[var(--font-display)] font-bold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title - Responsive sizing */}
              <motion.h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[var(--font-display)] font-bold text-white mb-3 leading-tight"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {post.title}
              </motion.h1>

              {/* Snippet - Shorter on mobile */}
              <motion.p
                className="text-sm sm:text-base text-white/80 mb-4 max-w-3xl font-[var(--font-body)] leading-relaxed line-clamp-2 sm:line-clamp-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {post.snippet}
              </motion.p>

              {/* Meta */}
              <motion.div
                className="flex items-center gap-3 text-xs sm:text-sm text-white/60 font-[var(--font-display)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="px-3 py-1 bg-white/10 rounded-full">
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
