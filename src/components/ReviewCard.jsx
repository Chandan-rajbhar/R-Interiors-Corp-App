import { Star } from 'lucide-react';

export function ReviewCard({ review }) {
  return (
    <article className="bg-white rounded-2xl border border-[#C7C7C7]/50 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#171717]">{review.author}</h3>
          <p className="text-[11px] text-neutral-500">{review.date}</p>
        </div>
        <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? 'fill-[#A71912] text-[#A71912]'
                  : 'text-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
      {review.service && (
        <span className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-[11px] font-semibold text-neutral-700">
          {review.service}
        </span>
      )}
      <p className="mt-2.5 text-sm text-neutral-700 leading-relaxed">{review.comment}</p>
      {review.statusNote && (
        <p className="mt-2 text-[11px] font-medium text-neutral-400 italic">
          {review.statusNote}
        </p>
      )}
    </article>
  );
}
