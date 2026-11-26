import { useState } from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { MANTA_BLOG_POSTS } from '../data/mantaPagesData';

export function MantaBlog() {
  const [expandedId, setExpandedId] = useState(MANTA_BLOG_POSTS[0].id);

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#F87171]" />
          Small Business Blog
        </h1>
        <p className="mt-1 text-xs text-neutral-300">
          Small Business Marketing Advice That Actually Works
        </p>
      </div>

      <div className="px-4 py-5 space-y-3">
        {MANTA_BLOG_POSTS.map((post) => {
          const isOpen = expandedId === post.id;
          return (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-[#A71912]/10 text-[#A71912] font-bold uppercase">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-sm font-extrabold text-[#171717] leading-snug">
                {post.title}
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {isOpen ? post.content : post.summary}
              </p>
              <button
                type="button"
                onClick={() => setExpandedId(isOpen ? '' : post.id)}
                className="text-xs font-bold text-[#A71912] hover:underline cursor-pointer"
              >
                {isOpen ? 'Show less' : 'Read full article'}
              </button>
            </article>
          );
        })}
      </div>
    </AnimatedPage>
  );
}
