import { CheckCircle2, Star } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import {
  MANTA_ABOUT_DATA,
  MANTA_PRIVACY_SECTIONS,
  MANTA_REVIEWS_PAGE_DATA,
  MANTA_TERMS_SECTIONS,
  REVIEWS_BANNER_IMAGE,
} from '../data/mantaPagesData';

export function MantaInfoPage({ mode = 'about' }) {
  if (mode === 'reviews') {
    return (
      <AnimatedPage>
        <div className="relative h-36 overflow-hidden">
          <img
            src={REVIEWS_BANNER_IMAGE}
            alt="Manta Business Reviews"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-lg font-black text-white drop-shadow-sm">
              Manta Business Reviews
            </h1>
            <p className="mt-0.5 text-[11px] text-white/90 drop-shadow-sm">
              See what our customers say about growing their business.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
        </div>

        <div className="px-4 py-5 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {MANTA_REVIEWS_PAGE_DATA.stats.map((st) => (
              <div
                key={st.label}
                className="bg-[#A71912] text-white rounded-2xl p-3 text-center shadow-sm"
              >
                <p className="text-sm font-black leading-tight">{st.value}</p>
                <p className="text-[10px] text-white/85 mt-0.5">{st.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            {MANTA_REVIEWS_PAGE_DATA.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#171717]">
                    {rev.author}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400">
                    {rev.source}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (mode === 'terms' || mode === 'privacy') {
    const isTerms = mode === 'terms';
    const sections = isTerms ? MANTA_TERMS_SECTIONS : MANTA_PRIVACY_SECTIONS;

    return (
      <AnimatedPage>
        <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
          <h1 className="text-xl font-black">
            {isTerms ? 'Terms & Conditions' : 'Privacy Policy'}
          </h1>
          <p className="mt-1 text-xs text-neutral-300">
            Last updated: 2026
          </p>
        </div>

        <div className="px-4 py-5 space-y-3">
          {sections.map((sec) => (
            <section
              key={sec.heading}
              className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-1.5"
            >
              <h2 className="text-sm font-extrabold text-[#171717]">
                {sec.heading}
              </h2>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {sec.body}
              </p>
            </section>
          ))}
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">{MANTA_ABOUT_DATA.title}</h1>
        <p className="mt-1 text-xs text-neutral-300">
          {MANTA_ABOUT_DATA.subtitle}
        </p>
      </div>

      <div className="px-4 py-5 space-y-4">
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2.5">
          {MANTA_ABOUT_DATA.paragraphs.map((text) => (
            <p key={text} className="text-xs text-neutral-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2.5">
          <h2 className="text-sm font-extrabold text-[#171717]">
            Top Benefits
          </h2>
          <ul className="space-y-2">
            {MANTA_ABOUT_DATA.benefits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs text-neutral-600"
              >
                <CheckCircle2 className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AnimatedPage>
  );
}
