import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Share2,
  Check,
  Building2,
  BadgeCheck,
  MapPin,
  Globe,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DirectoryCategoriesGrid } from '../components/DirectoryCategoriesGrid';
import { DirectorySearch } from '../components/DirectorySearch';
import { MantaHomebrandIcon } from '../assets/icons/MantaIcons';
import {
  DIRECTORY_CATEGORIES,
  DIRECTORY_CITIES,
} from '../data/directoryData';
import { MANTA_DIRECTORY_LISTINGS } from '../data/mantaDirectoryListings';
import { BUSINESS_INFO } from '../data/businessData';
import { HERO_IMAGE, SERVICES_DATA } from '../data/servicesData';

export function Directory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchState, setSearchState] = useState({
    query: location.state?.query || '',
    location: location.state?.location || 'Deerfield Beach, FL',
  });
  const [showAllCities, setShowAllCities] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    if (location.state?.scrollToCategories) {
      const timer = setTimeout(() => {
        document
          .getElementById('dir-categories-heading')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const normalizedQuery = searchState.query.trim().toLowerCase();

  const matchingServices = SERVICES_DATA.filter(
    (s) =>
      !normalizedQuery ||
      s.title.toLowerCase().includes(normalizedQuery) ||
      s.shortDescription.toLowerCase().includes(normalizedQuery) ||
      'construction contractors'.includes(normalizedQuery)
  );

  // Search across all Manta directory listings when user enters a query
  const matchingBusinesses = useMemo(() => {
    if (!normalizedQuery) return [];
    const results = [];
    Object.entries(MANTA_DIRECTORY_LISTINGS).forEach(([catId, data]) => {
      const categoryLabel =
        DIRECTORY_CATEGORIES.find((c) => c.id === catId)?.label || catId;
      const combined = [
        ...(data.featuredListings || []),
        ...(data.allListings || []),
      ];
      combined.forEach((biz) => {
        const haystack = [
          biz.name,
          biz.location,
          biz.street,
          biz.description,
          categoryLabel,
          ...(biz.categories || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (haystack.includes(normalizedQuery)) {
          results.push({ ...biz, categoryId: catId, categoryLabel });
        }
      });
    });
    return results.slice(0, 8);
  }, [normalizedQuery]);

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
      {/* Hero Directory Search Section (Manta.com style) */}
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
                Manta Business Directory
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
            Search verified local businesses, contractors, and services by keyword or city.
          </p>
        </div>
      </section>

      {/* Search Cities Strip */}
      <section className="bg-[#A71912] text-white px-4 py-3.5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-extrabold uppercase tracking-wider">
            Search Cities
          </h2>
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
        {/* Live Search Results (Businesses + R Interiors Corp) */}
        {normalizedQuery && (
          <section aria-labelledby="dir-live-results" className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2
                id="dir-live-results"
                className="text-sm font-extrabold text-[#171717]"
              >
                Directory Results for &ldquo;{searchState.query}&rdquo;
              </h2>
              <button
                type="button"
                onClick={() => setSearchState((prev) => ({ ...prev, query: '' }))}
                className="text-[11px] font-bold text-[#A71912] hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>

            {matchingBusinesses.length > 0 ? (
              <div className="space-y-2.5">
                {matchingBusinesses.map((biz) => (
                  <div
                    key={`${biz.categoryId}-${biz.id}`}
                    className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/60 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#A71912]/10 text-[#A71912] text-[10px] font-bold uppercase">
                        {biz.categoryLabel}
                      </span>
                      {biz.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-extrabold text-[#171717]">
                      {biz.name}
                    </h3>
                    {(biz.street || biz.location) && (
                      <p className="text-[11px] text-neutral-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#A71912] shrink-0" />
                        {[biz.street, biz.location].filter(Boolean).join(', ')}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {biz.phone && (
                        <a
                          href={`tel:${biz.phone.replace(/\D/g, '')}`}
                          className="px-3 py-1.5 rounded-xl bg-[#171717] text-white text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          {biz.phone}
                        </a>
                      )}
                      {biz.website && (
                        <a
                          href={biz.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-[#A71912]/10 text-[#A71912] text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" />
                          Website
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/directory/category/${biz.categoryId}`)
                        }
                        className="ml-auto text-[11px] font-bold text-[#A71912] inline-flex items-center gap-1 cursor-pointer"
                      >
                        View Category <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/60 text-xs text-neutral-500">
                No directory listings matched &ldquo;{searchState.query}&rdquo;. Try browsing the categories below.
              </div>
            )}
          </section>
        )}

        {/* Featured Local Contractor */}
        <section aria-labelledby="search-results-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2
              id="search-results-heading"
              className="text-sm font-extrabold text-[#171717]"
            >
              Featured Local Contractor
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

            {matchingServices.length > 0 && (
              <div className="space-y-2">
                {matchingServices.slice(0, 3).map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="w-full p-2.5 rounded-xl bg-[#F8F9FA] hover:bg-neutral-100 flex items-center justify-between text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#171717]">
                        {service.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">
                        {service.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A71912] shrink-0" />
                  </button>
                ))}
              </div>
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

        {/* Own a Business? Claim Your Listing CTA (Manta.com core feature) */}
        <section className="rounded-2xl bg-[#171717] text-white p-4 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#A71912] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold">Own a Business?</h2>
              <p className="text-[11px] text-neutral-300">
                Add or claim your free listing to manage your business details.
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/business-listings')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            Claim My Listing
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </section>
      </div>
    </AnimatedPage>
  );
}
