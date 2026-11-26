import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Share2,
  Check,
  TrendingUp,
  Globe,
  Building2,
  Calculator,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DirectorySearch } from '../components/DirectorySearch';
import { ServiceCard } from '../components/ServiceCard';
import { BUSINESS_INFO } from '../data/businessData';
import { DIRECTORY_CITIES } from '../data/directoryData';
import { HERO_IMAGE, SERVICES_DATA } from '../data/servicesData';

const MANTA_SERVICE_LINKS = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    description: 'Results-driven online marketing, reporting, and growth tools.',
    path: '/digital-marketing',
    icon: TrendingUp,
  },
  {
    id: 'seo-services',
    title: 'Local SEO Starter & FAQs',
    description: 'Boost Google Maps & local search rankings with transparent plans.',
    path: '/seo-services',
    icon: Globe,
  },
  {
    id: 'business-listings',
    title: 'Business Listings Management',
    description: 'Claim your free listing and keep directory details synced.',
    path: '/business-listings',
    icon: Building2,
  },
];

export function Services() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Deerfield Beach, FL');
  const [showAllCities, setShowAllCities] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

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
      {/* Header Banner */}
      <div className="relative h-40 bg-[#171717] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="R Interiors Corp Services"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-2xl font-black text-white">Our Services</h1>
          <p className="mt-1 text-xs text-neutral-300">
            Professional Solutions for Your Interior &amp; Exterior Needs
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

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
              onClick={() => setSelectedCity(city.name)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${selectedCity === city.name
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
        {/* Service & Location Search */}
        <section aria-label="Search services">
          <DirectorySearch key={selectedCity} initialLocation={selectedCity} />
        </section>

        {/* Verified Specialty Services */}
        <section aria-labelledby="specialty-services-heading" className="space-y-3">
          <h2
            id="specialty-services-heading"
            className="text-base font-extrabold text-[#171717]"
          >
            Specialty Craftsmanship
          </h2>
          <div className="space-y-4">
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Manta Growth & Business Services */}
        <section aria-labelledby="manta-services-heading" className="space-y-2.5">
          <h2
            id="manta-services-heading"
            className="text-base font-extrabold text-[#171717]"
          >
            Business &amp; Marketing Services
          </h2>
          <div className="space-y-2">
            {MANTA_SERVICE_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(item.path)}
                  className="w-full bg-white rounded-2xl p-3.5 border border-[#C7C7C7]/50 shadow-sm flex items-center gap-3 text-left hover:border-[#A71912]/40 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#A71912]/10 text-[#A71912] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-[#171717] truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A71912] shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Featured Local Contractor Card */}
        <section aria-labelledby="featured-contractor-heading" className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2
              id="featured-contractor-heading"
              className="text-sm font-extrabold text-[#171717]"
            >
              Featured Local Contractor
            </h2>
            <span className="text-[11px] font-semibold text-neutral-500">
              {selectedCity}
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

        {/* Free Estimate CTA Banner */}
        <section className="rounded-2xl bg-gradient-to-br from-[#171717] to-[#262626] p-4 text-white shadow-md">
          <h2 className="text-base font-extrabold">Need a Custom Project Quote?</h2>
          <p className="mt-1 text-xs text-neutral-300">
            Tell us about your stucco or drywall project and get a free estimate.
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/estimate')}
            className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Calculator className="w-4 h-4" />
            Get a Free Estimate
          </motion.button>
        </section>
      </div>
    </AnimatedPage>
  );
}
