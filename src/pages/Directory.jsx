import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  ArrowRight,
  Phone,
  Share2,
  Check,
  BookOpen,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DirectoryCategoriesGrid } from '../components/DirectoryCategoriesGrid';
import { DirectorySearch } from '../components/DirectorySearch';
import { MantaHomebrandIcon } from '../assets/icons/MantaIcons';
import {
  DIRECTORY_CITIES,
  DIRECTORY_FAQS,
  DIRECTORY_RESOURCES,
} from '../data/directoryData';
import { BUSINESS_INFO } from '../data/businessData';
import { HERO_IMAGE, SERVICES_DATA } from '../data/servicesData';

const RESOURCE_ICON_MAP = {
  'construction-guide': BookOpen,
  'business-listings': FileText,
  'terms-privacy': ShieldCheck,
};

export function Directory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState({
    query: location.state?.query || '',
    location: location.state?.location || 'Deerfield Beach, FL',
  });
  const [showAllCities, setShowAllCities] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const normalizedQuery = searchState.query.trim().toLowerCase();

  const matchingServices = SERVICES_DATA.filter(
    (s) =>
      !normalizedQuery ||
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.shortDescription.toLowerCase().includes(normalizedQuery) ||
      'construction contractors'.includes(normalizedQuery)
  );

  const visibleCities = showAllCities
    ? DIRECTORY_CITIES
    : DIRECTORY_CITIES.slice(0, 6);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard may be unavailable in some contexts
    }
  };

  const handleShareProfile = async () => {
    const shareData = {
      title: BUSINESS_INFO.name,
      text: `${BUSINESS_INFO.name} — Stucco Finishing & Drywall Installation in ${BUSINESS_INFO.serviceArea}. Call ${BUSINESS_INFO.phone}`,
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyPhone();
    }
  };

  return (
    <AnimatedPage>
      {/* Hero Directory Search Section with Manta Homebrand SVG */}
      <section className="relative bg-[#171717] px-4 pt-5 pb-6 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/80 via-[#171717]/85 to-[#171717]" />

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md shrink-0 flex items-center justify-center">
              <MantaHomebrandIcon className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">
                R Interiors Business Directory
              </h1>
              <p className="text-xs font-bold text-[#F87171]">
                Find a Business &amp; Service Near You
              </p>
            </div>
          </div>

          <DirectorySearch
            initialQuery={searchState.query}
            initialLocation={searchState.location}
            onSearchSubmit={(next) =>
              setSearchState({ query: next.query, location: next.location })
            }
          />

          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Connecting homeowners and commercial clients to trusted local craftsmanship. Search our stucco &amp; drywall services or explore local business categories below.
          </p>
        </div>
      </section>

      {/* Search Cities Strip */}
      <section className="bg-[#A71912] text-white px-4 py-3.5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider">Search Cities</h2>
          <button
            type="button"
            onClick={() => setShowAllCities((v) => !v)}
            className="text-[11px] font-bold underline cursor-pointer"
          >
            {showAllCities ? 'Show Less' : 'See More'}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {visibleCities.map((city) => (
            <button
              key={city.name}
              type="button"
              onClick={() =>
                setSearchState((prev) => ({ ...prev, location: city.name }))
              }
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                searchState.location === city.name
                  ? 'bg-white text-[#A71912]'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </section>

      <div className="px-4 py-5 space-y-6">
        {/* Live Search Results for R Interiors Corp */}
        <section aria-labelledby="search-results-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 id="search-results-heading" className="text-sm font-extrabold text-[#171717]">
              {normalizedQuery
                ? `Results for "${searchState.query}"`
                : 'Featured Local Contractor'}
            </h2>
            <span className="text-[11px] font-semibold text-neutral-500">
              {searchState.location || 'Deerfield Beach, FL'}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/60 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#A71912]/10 text-[#A71912] text-[10px] font-bold uppercase">
                  Verified Listing
                </span>
                <h3 className="mt-1 text-base font-black text-[#171717]">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-[11px] text-neutral-500">
                  {BUSINESS_INFO.address.full}
                </p>
              </div>
              <button
                type="button"
                onClick={handleShareProfile}
                aria-label="Share business profile"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-[#171717] cursor-pointer shrink-0"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {matchingServices.length > 0 ? (
              <div className="space-y-2">
                {matchingServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F9FA] hover:bg-neutral-100 flex items-center justify-between text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#171717]">{service.title}</p>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A71912] shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">
                No direct R Interiors Corp service matched &ldquo;{searchState.query}&rdquo;. Explore categories below or request a custom stucco/drywall estimate.
              </p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                {BUSINESS_INFO.phone}
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="py-2.5 px-3 rounded-xl border border-[#C7C7C7] bg-white text-[#171717] text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                  </>
                ) : (
                  'Copy'
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Directory Categories Grid */}
        <DirectoryCategoriesGrid />

        {/* Resources, Guides & Business Info */}
        <section aria-labelledby="dir-resources-heading" className="space-y-2.5">
          <h2 id="dir-resources-heading" className="text-base font-extrabold text-[#171717]">
            Resources &amp; Industry Guides
          </h2>
          <div className="space-y-2">
            {DIRECTORY_RESOURCES.map((res) => {
              const ResIcon = RESOURCE_ICON_MAP[res.id] || BookOpen;
              return (
                <motion.button
                  key={res.id}
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(`/directory/info/${res.id}`)}
                  className="w-full bg-white rounded-2xl p-3.5 border border-[#C7C7C7]/50 shadow-sm flex items-center gap-3 text-left hover:border-[#A71912]/40 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A71912]/10 text-[#A71912] flex items-center justify-center shrink-0">
                    <ResIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A71912]">
                      {res.badge}
                    </span>
                    <p className="text-xs font-extrabold text-[#171717] truncate">
                      {res.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">
                      {res.summary}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section aria-labelledby="dir-faq-heading" className="space-y-2.5">
          <h2 id="dir-faq-heading" className="text-base font-extrabold text-[#171717]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {DIRECTORY_FAQS.map((faq, idx) => {
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
                    <div className="px-4 pb-3 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-2">
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
