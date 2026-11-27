import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquarePlus, Send } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { ReviewCard } from '../components/ReviewCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { BUSINESS_INFO } from '../data/businessData';
import { SERVICES_DATA } from '../data/servicesData';

export function Reviews() {
  const [localReviews, setLocalReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [service, setService] = useState(SERVICES_DATA[0].title);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      setError('Please enter your name and review comment.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating,
      service,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      statusNote: 'Submitted in this session (pending verification)',
    };

    setLocalReviews((prev) => [newReview, ...prev]);
    setAuthor('');
    setComment('');
    setRating(5);
    setError('');
    setShowForm(false);
  };

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-5 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">Customer Reviews</h1>
        <p className="mt-1 text-xs text-neutral-300">
          Feedback for {BUSINESS_INFO.name}
        </p>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Overall Rating Section (Honest State) */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Verified Rating
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-2xl font-black text-[#171717]">—</span>
              <div className="flex items-center gap-0.5" aria-label="No verified ratings yet">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-neutral-300" />
                ))}
              </div>
            </div>
            <p className="mt-1 text-[11px] text-neutral-500">
              No verified customer reviews published yet.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="px-3.5 py-2.5 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            {showForm ? 'Close' : 'Write Review'}
          </motion.button>
        </section>

        {/* Review Submission Interface */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3.5"
          >
            <h2 className="text-sm font-extrabold text-[#171717]">Share Your Experience</h2>

            <div>
              <span className="block text-xs font-bold text-[#171717] mb-1">Your Rating</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        star <= rating
                          ? 'fill-[#A71912] text-[#A71912]'
                          : 'text-neutral-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review-author" className="block text-xs font-bold text-[#171717] mb-1">
                Your Name *
              </label>
              <input
                id="review-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-xl border border-[#C7C7C7] text-sm focus:outline-none focus:border-[#A71912]"
              />
            </div>

            <div>
              <label htmlFor="review-service" className="block text-xs font-bold text-[#171717] mb-1">
                Service
              </label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger id="review-service" className="bg-white text-sm">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES_DATA.map((s) => (
                    <SelectItem key={s.id} value={s.title}>
                      {s.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="review-comment" className="block text-xs font-bold text-[#171717] mb-1">
                Your Review *
              </label>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe your experience with R Interiors Corp..."
                className="w-full px-3 py-2 rounded-xl border border-[#C7C7C7] text-sm focus:outline-none focus:border-[#A71912] resize-none"
              />
            </div>

            {error && <p className="text-xs font-medium text-[#A71912]">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Post Review
            </button>
          </motion.form>
        )}

        {/* Reviews List or Empty State */}
        {localReviews.length > 0 ? (
          <div className="space-y-3">
            {localReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-[#C7C7C7]/50 text-center space-y-2">
            <Star className="w-8 h-8 text-[#C7C7C7] mx-auto" />
            <h2 className="text-sm font-bold text-[#171717]">No Customer Reviews Yet</h2>
            <p className="text-xs text-neutral-500 max-w-[260px] mx-auto leading-relaxed">
              Verified reviews for {BUSINESS_INFO.name} are not yet available. Have you worked with us? Tap &ldquo;Write Review&rdquo; above to share your feedback.
            </p>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
