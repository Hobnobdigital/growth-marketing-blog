'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const categories = [
  { id: 'all', label: 'All', count: 18 },
  { id: 'Marketing Tech', label: 'Marketing Tech', count: 4 },
  { id: 'Paid Advertising', label: 'Paid Advertising', count: 3 },
  { id: 'Breaking News', label: 'Breaking News', count: 3 },
  { id: 'B2B Marketing', label: 'B2B Marketing', count: 2 },
  { id: 'Digital Marketing', label: 'Digital Marketing', count: 2 },
  { id: 'Marketing Analytics', label: 'Analytics', count: 1 },
  { id: 'Growth Strategy', label: 'Growth Strategy', count: 1 },
  { id: 'Growth Hacking', label: 'Growth Hacking', count: 1 },
  { id: 'B2C Marketing', label: 'B2C Marketing', count: 1 },
];

export default function CategoryFilter() {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat) {
        setCurrentCategory(cat);
      }
    }
  }, []);

  const activeCategory = categories.find(c => c.id === currentCategory) || categories[0];

  return (
    <div className="w-full">
      {/* Mobile Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-border rounded-xl shadow-sm hover:border-neon-cyan/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <div className="text-left">
              <p className="text-xs text-ink-muted uppercase tracking-wider">Filter by</p>
              <p className="text-sm font-[var(--font-display)] font-semibold text-ink">
                {activeCategory.label}
              </p>
            </div>
          </div>
          <motion.svg 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="w-5 h-5 text-ink-muted" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.id === 'all' ? '/' : `/?category=${encodeURIComponent(cat.id)}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-surface-dim transition-colors ${
                    currentCategory === cat.id ? 'bg-neon-cyan/5' : ''
                  }`}
                >
                  <span className={`font-[var(--font-display)] font-medium ${
                    currentCategory === cat.id ? 'text-neon-cyan' : 'text-ink'
                  }`}>
                    {cat.label}
                  </span>
                  <span className="text-xs text-ink-faint bg-surface-dim px-2 py-1 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Horizontal Pills */}
      <div className="hidden md:block">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <svg className="w-5 h-5 text-neon-cyan flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === 'all' ? '/' : `/?category=${encodeURIComponent(cat.id)}`}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-[var(--font-display)] font-medium transition-all duration-200 border ${
                currentCategory === cat.id
                  ? 'bg-neon-cyan text-ink border-neon-cyan shadow-neon-cyan'
                  : 'bg-white text-ink-muted border-border hover:border-neon-cyan/50 hover:text-ink'
              }`}
            >
              {cat.label}
              <span className={`ml-2 text-xs ${
                currentCategory === cat.id ? 'text-ink/60' : 'text-ink-faint'
              }`}>
                {cat.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
