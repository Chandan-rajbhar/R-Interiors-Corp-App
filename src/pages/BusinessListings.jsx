import { useState } from 'react';
import { CheckCircle2, Building2, ChevronDown } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BUSINESS_LISTINGS_DATA } from '../data/mantaPagesData';

export function BusinessListings() {
  const [businessName, setBusinessName] = useState('');
  const [cityState, setCityState] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const handleClaim = (e) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    setSubmitted(true);
  };

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">{BUSINESS_LISTINGS_DATA.title}</h1>
        <p className="mt-1 text-xs text-neutral-300">
          {BUSINESS_LISTINGS_DATA.subtitle}
        </p>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Benefits */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2.5">
          <h2 className="text-sm font-extrabold text-[#171717]">
            Why Claim Your Business Listing?
          </h2>
          <ul className="space-y-2">
            {BUSINESS_LISTINGS_DATA.benefits.map((item) => (
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

        {/* Free Listing Claim Form */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3">
          <h2 className="text-sm font-extrabold text-[#171717] flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#A71912]" />
            Add or Claim Free Business Listing
          </h2>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
              <p className="font-bold">
                Listing request received for &ldquo;{businessName}&rdquo;!
              </p>
              <p>Our directory team will verify your business details shortly.</p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setBusinessName('');
                  setCityState('');
                  setPhone('');
                }}
                className="text-xs font-bold text-[#A71912] underline cursor-pointer"
              >
                Submit another listing
              </button>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  * Business Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. R Interiors Corp"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  City &amp; State
                </label>
                <input
                  type="text"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  placeholder="Deerfield Beach, FL"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Business Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Claim My Listing
              </button>
            </form>
          )}
        </section>

        {/* Business Listings FAQ */}
        <section className="space-y-2">
          <h2 className="text-base font-extrabold text-[#171717]">
            Business Listings FAQ
          </h2>
          {BUSINESS_LISTINGS_DATA.faqs.map((faq, idx) => {
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
                  <span className="text-xs font-bold text-[#171717]">{faq.q}</span>
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
        </section>
      </div>
    </AnimatedPage>
  );
}
