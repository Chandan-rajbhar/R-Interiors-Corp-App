import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  BarChart3,
  Users,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DIGITAL_MARKETING_DATA } from '../data/mantaPagesData';

const PILLAR_ICONS = {
  tech: Award,
  results: TrendingUp,
  support: Users,
  reporting: BarChart3,
};

export function DigitalMarketing() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black leading-tight">
          {DIGITAL_MARKETING_DATA.heroTitle}
        </h1>
        <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
          {DIGITAL_MARKETING_DATA.heroSubtitle}
        </p>
        <div className="mt-4 flex gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/estimate')}
            className="px-4 py-2.5 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Get Started
          </button>
          <button
            type="button"
            onClick={() => navigate('/seo-services')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Explore SEO
          </button>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Stats */}
        <section className="grid grid-cols-2 gap-3">
          {DIGITAL_MARKETING_DATA.stats.map((stat) => (
            <div
              key={stat.value}
              className="bg-[#171717] text-white rounded-2xl p-4 shadow-sm"
            >
              <p className="text-2xl font-black text-[#F87171]">{stat.value}</p>
              <p className="mt-1 text-[11px] text-neutral-300 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Why Partner with Manta */}
        <section className="space-y-2.5">
          <h2 className="text-base font-extrabold text-[#171717]">
            Why Partner with Manta?
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {DIGITAL_MARKETING_DATA.pillars.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id] || Award;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#C7C7C7]/50 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#A71912]/10 text-[#A71912] flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-[#171717]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-neutral-500 leading-snug">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Services */}
        <section className="space-y-2.5">
          <h2 className="text-base font-extrabold text-[#171717]">
            Digital Marketing Services
          </h2>
          <div className="space-y-2">
            {DIGITAL_MARKETING_DATA.services.map((srv) => (
              <motion.button
                key={srv.id}
                type="button"
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(srv.route)}
                className="w-full bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm flex items-center justify-between gap-3 text-left hover:border-[#A71912]/50 transition-colors cursor-pointer"
              >
                <div>
                  <h3 className="text-sm font-bold text-[#171717]">{srv.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{srv.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A71912] shrink-0" />
              </motion.button>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm">
          <h2 className="text-sm font-extrabold text-[#171717] flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#A71912]" />
            Industries We Help
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {DIGITAL_MARKETING_DATA.industries.map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => navigate('/directory')}
                className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-[#A71912]/10 text-xs font-semibold text-[#171717] hover:text-[#A71912] cursor-pointer transition-colors"
              >
                {ind}
              </button>
            ))}
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
