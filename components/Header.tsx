'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSubscribeClick = () => {
    setMobileOpen(false);
    const newsletter = document.getElementById('newsletter');
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-soft'
            : 'bg-white/60 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div whileHover={{ scale: 1.03 }} className="relative">
                <span className="text-2xl md:text-3xl font-[var(--font-display)] font-bold tracking-tight">
                  GROWTH<span className="text-neon-cyan">.</span>PULSE
                </span>
                <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow group-hover:w-full transition-all duration-500" />
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-[var(--font-display)] font-medium text-ink-muted hover:text-neon-cyan transition-colors duration-200"
              >
                Home
              </Link>

              <button
                onClick={handleSubscribeClick}
                className="px-5 py-2 bg-ink text-white text-sm font-[var(--font-display)] font-semibold rounded-lg hover:bg-neon-cyan hover:text-ink transition-all duration-200"
              >
                Subscribe
              </button>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 h-[2px] w-6 bg-ink transition-all duration-300 ${
                    mobileOpen ? 'top-[9px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-[2px] w-6 bg-ink transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-6 bg-ink transition-all duration-300 ${
                    mobileOpen ? 'top-[9px] -rotate-45' : 'top-[18px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-[var(--font-display)] font-bold text-ink hover:text-neon-cyan transition-colors"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  onClick={handleSubscribeClick}
                  className="px-8 py-3 bg-ink text-white text-lg font-[var(--font-display)] font-semibold rounded-lg hover:bg-neon-cyan hover:text-ink transition-all"
                >
                  Subscribe
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
