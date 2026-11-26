import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { SEO_SERVICES_DATA } from '../data/mantaPagesData';

export function SeoServices() {
  const navigate = useNavigate();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">{SEO_SERVICES_DATA.title}</h1>
        <p className="mt-1 text-xs text-neutral-300">
          {SEO_SERVICES_DATA.subtitle}
        </p>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* 3-Step Process */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3">
          <h2 className="text-sm font-extrabold text-[#171717]">
            Our Proven 3-Step Process
          </h2>
          <div className="space-y-2.5">
            {SEO_SERVICES_DATA.steps.map((st) => (
              <div key={st.step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#A71912] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                  {st.step}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-[#171717]">{st.title}</h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {st.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section className="space-y-2.5">
          <h2 className="text-base font-extrabold text-[#171717]">
            Local SEO Packages
          </h2>
          <div className="space-y-2.5">
            {SEO_SERVICES_DATA.plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#171717]">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#A71912]/10 text-[#A71912] text-[10px] font-bold">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2 text-xs text-neutral-600"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A71912] shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => navigate('/estimate')}
                  className="w-full py-2.5 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SEO FAQs */}
        <section className="space-y-2.5">
          <h2 className="text-base font-extrabold text-[#171717]">
            SEO Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {SEO_SERVICES_DATA.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left gap-2 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#171717]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A71912] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 pt-2 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
