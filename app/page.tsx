import Hero from '@/components/Hero';
import PostGrid from '@/components/PostGrid';
import NewsletterSignup from '@/components/NewsletterSignup';
import postsData from '@/public/posts/posts.json';
import { Suspense } from 'react';
import FilteredContent from '@/components/FilteredContent';

// Generate static params for all category combinations
export function generateStaticParams() {
  return [
    { category: [] },
    { category: ['advertising'] },
    { category: ['tech'] },
  ];
}

// Force dynamic for search params
export const dynamic = 'force-dynamic';

function HomeContent() {
  return (
    <Suspense fallback={
      <>
        <Hero post={postsData[0]} />
        <PostGrid posts={postsData.slice(1)} categoryLabel="All Articles" isFiltered={false} />
        <NewsletterSignup />
      </>
    }>
      <FilteredContent />
    </Suspense>
  );
}

export default function Home() {
  return <HomeContent />;
}
