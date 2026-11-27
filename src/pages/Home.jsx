import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calendar,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DirectoryCategoriesGrid } from '../components/DirectoryCategoriesGrid';
import { DirectorySearch } from '../components/DirectorySearch';
import { ServiceCard } from '../components/ServiceCard';
import {
  BUSINESS_HIGHLIGHTS,
  BUSINESS_INFO,
} from '../data/businessData';
import { HERO_IMAGE, SERVICES_DATA } from '../data/servicesData';

const HIGHLIGHT_ICONS = {
  experience: Award,
  since: Calendar,
  craftsmanship: ShieldCheck,
  customer: Sparkles,
};

export function Home() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="bg-white border-b border-[#C7C7C7]/40">
        <div className="relative h-44 overflow-hidden bg-[#171717]">
          <img
            src={HERO_IMAGE}
            alt="Modern residential exterior with smooth stucco finish"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A71912] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Deerfield Beach, FL • Since {BUSINESS_INFO.servingSince}
          </span>
        </div>

        <div className="px-4 py-4">
          <h1 className="text-[20px] font-black text-[#171717] leading-[1.2] tracking-tight">
            {BUSINESS_INFO.heroHeading}
          </h1>
          <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed">
            {BUSINESS_INFO.heroSubheading}
          </p>
          <div className="mt-3.5 flex items-center gap-2.5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/estimate')}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              Get a Free Estimate
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/services')}
              className="py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-[#C7C7C7]/60 text-[#171717] text-xs font-semibold transition-colors cursor-pointer"
            >
              Explore Services
            </motion.button>
          </div>
        </div>
      </section>

      <div className="px-4 py-5 space-y-6">
        {/* Quick Service & Directory Search */}
        <section aria-label="Search services and directory">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 mb-2">
            Find Services Near You
          </h2>
          <DirectorySearch compact />
        </section>

        {/* Browse Directory Categories */}
        <DirectoryCategoriesGrid
          heading="Browse Directory"
          subheading="Select any category to explore local listings and services."
          headingId="home-directory-heading"
          limit={4}
          onViewMore={() =>
            navigate('/services', { state: { scrollToCategories: true } })
          }
          viewMoreLabel="View More"
        />

        {/* Our Services */}
        <section aria-labelledby="home-services-heading">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 id="home-services-heading" className="text-base font-extrabold text-[#171717]">
                Our Specialty Services
              </h2>
              <p className="text-[11px] text-neutral-500">
                Exterior stucco &amp; interior drywall craftsmanship
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="text-xs font-bold text-[#A71912] inline-flex items-center gap-1 hover:underline cursor-pointer shrink-0"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.id} service={service} compact />
            ))}
          </div>
        </section>

        {/* Business Highlights */}
        <section aria-label="Business highlights">
          <div className="grid grid-cols-2 gap-2.5">
            {BUSINESS_HIGHLIGHTS.map((item) => {
              const Icon = HIGHLIGHT_ICONS[item.id] || Award;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#C7C7C7]/50 shadow-sm flex flex-col items-start"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#A71912]/10 text-[#A71912] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-black text-[#171717]">
                      {item.value}
                    </span>
                  </div>
                  <h2 className="text-xs font-bold text-[#171717]">{item.label}</h2>
                  <p className="mt-0.5 text-[11px] text-neutral-500 leading-snug">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact CTA Banner */}
        <section className="rounded-2xl bg-gradient-to-br from-[#A71912] to-[#7B100B] p-4 text-white shadow-md">
          <h2 className="text-base font-extrabold">Ready to Start Your Project?</h2>
          <p className="mt-1 text-xs text-white/85">
            Speak directly with our team or request a free estimate today.
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={BUSINESS_INFO.phoneHref}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white text-[#A71912] text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </motion.a>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/estimate')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              Request Estimate
            </motion.button>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
