import { useState } from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BLOG_BANNER_IMAGE, MANTA_BLOG_POSTS } from '../data/mantaPagesData';

const BLOG_TOPICS = ['All Topics', 'Local SEO', 'Business Growth', 'Customer Trust'];

export function MantaBlog() {
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [expandedId, setExpandedId] = useState(MANTA_BLOG_POSTS[0].id);

  const visiblePosts =
    selectedTopic === 'All Topics'
      ? MANTA_BLOG_POSTS
      : MANTA_BLOG_POSTS.filter((p) => p.category === selectedTopic);

  return (
    <AnimatedPage>
      <div className="relative h-36 overflow-hidden">
        <img
          src={BLOG_BANNER_IMAGE}
          alt="Small Business Marketing Blog"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-lg font-black text-white flex items-center gap-1.5 drop-shadow-sm">
            <BookOpen className="w-4 h-4 text-[#F87171]" />
            Small Business Blog
          </h1>
          <p className="mt-0.5 text-[11px] text-white/90 drop-shadow-sm">
            Small Business Marketing Advice That Actually Works
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      <div className="px-4 py-4 space-y-3.5">
        {/* Topic Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {BLOG_TOPICS.map((topic) => {
            const active = selectedTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#171717] text-white'
                    : 'bg-white border border-[#C7C7C7]/60 text-neutral-600 hover:border-[#A71912]/50'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>

        {/* Articles */}
        <div className="space-y-2.5">
          {visiblePosts.map((post) => {
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
      </div>
    </AnimatedPage>
  );
}
