import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
  Clock,
  Star,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { ServiceCard } from '../components/ServiceCard';
import {
  BUSINESS_HIGHLIGHTS,
  BUSINESS_INFO,
  WHY_CHOOSE_US,
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
      <section className="relative h-[300px] overflow-hidden bg-[#171717]">
        <img
          src={HERO_IMAGE}
          alt="Modern residential exterior with smooth stucco finish"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/55 to-[#171717]/25" />
        <div className="absolute inset-0 p-5 flex flex-col justify-end">
          <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-[#A71912] text-white text-[10px] font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            Deerfield Beach, FL • Since {BUSINESS_INFO.servingSince}
          </span>
          <h1 className="text-[22px] font-black text-white leading-[1.18] tracking-tight">
            {BUSINESS_INFO.heroHeading}
          </h1>
          <p className="mt-2 text-xs text-neutral-200 leading-relaxed max-w-[340px]">
            {BUSINESS_INFO.heroSubheading}
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/estimate')}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              Get a Free Estimate
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/services')}
              className="py-2.5 px-3.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Explore Services
            </motion.button>
          </div>
        </div>
      </section>

      <div className="px-4 py-5 space-y-6">
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
                  <div className="w-8 h-8 rounded-lg bg-[#A71912]/10 text-[#A71912] flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-base font-black text-[#171717] leading-none">
                    {item.value}
                  </span>
                  <h2 className="mt-1 text-xs font-bold text-[#171717]">{item.label}</h2>
                  <p className="mt-1 text-[11px] text-neutral-500 leading-snug">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Our Services */}
        <section aria-labelledby="home-services-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="home-services-heading" className="text-base font-extrabold text-[#171717]">
              Our Services
            </h2>
            <button
              type="button"
              onClick={() => navigate('/services')}
              className="text-xs font-bold text-[#A71912] inline-flex items-center gap-1 hover:underline cursor-pointer"
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

        {/* Why Choose Us */}
        <section
          aria-labelledby="why-choose-heading"
          className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm"
        >
          <h2 id="why-choose-heading" className="text-base font-extrabold text-[#171717]">
            Why Choose R Interiors Corp
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Dependable stucco and drywall craftsmanship tailored to your property.
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {WHY_CHOOSE_US.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#171717]">{item.title}</p>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* About Preview */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#171717]">About Our Company</h2>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
              Est. {BUSINESS_INFO.servingSince}
            </span>
          </div>
          <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
            {BUSINESS_INFO.aboutSummary}
          </p>
          <div className="mt-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="px-3.5 py-2 rounded-xl bg-[#171717] text-white text-xs font-bold inline-flex items-center gap-1.5 hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Learn More <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/hours')}
              className="px-3 py-2 rounded-xl border border-[#C7C7C7] text-[#171717] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#A71912]" />
              Hours
            </button>
            <button
              type="button"
              onClick={() => navigate('/reviews')}
              className="px-3 py-2 rounded-xl border border-[#C7C7C7] text-[#171717] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-[#A71912]" />
              Reviews
            </button>
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
