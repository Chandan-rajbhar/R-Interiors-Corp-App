import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, Calendar, MapPin, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BUSINESS_INFO, COMPANY_VALUES } from '../data/businessData';
import aboutBannerImg from '../assets/images/stucco-finishing.jpg';

export function About() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Years Expertise', value: BUSINESS_INFO.experienceYears, icon: Award },
    { label: 'Serving Since', value: BUSINESS_INFO.servingSince, icon: Calendar },
    { label: 'Location', value: 'Deerfield Beach', icon: MapPin },
  ];

  return (
    <AnimatedPage>
      {/* Top Banner */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={aboutBannerImg}
          alt="R Interiors Corp craftsmanship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
            Company Profile
          </span>
          <h1 className="text-2xl font-black text-white mt-0.5 drop-shadow-sm">
            About R Interiors Corp
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-3 border border-[#C7C7C7]/50 shadow-sm text-center"
              >
                <Icon className="w-4 h-4 text-[#A71912] mx-auto mb-1" />
                <p className="text-sm font-black text-[#171717]">{stat.value}</p>
                <p className="text-[10px] font-medium text-neutral-500 mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Company Introduction */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3">
          <h2 className="text-base font-extrabold text-[#171717]">Who We Are</h2>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {BUSINESS_INFO.aboutSummary}
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            {BUSINESS_INFO.aboutExtended}
          </p>
        </section>

        {/* Experience Timeline */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm">
          <h2 className="text-base font-extrabold text-[#171717] mb-3">
            Our Experience & Approach
          </h2>
          <div className="space-y-4 border-l-2 border-[#A71912]/25 pl-4 ml-1.5">
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#A71912]" />
              <p className="text-xs font-bold text-[#A71912] uppercase tracking-wider">
                27+ Years of Trade Expertise
              </p>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                Deep hands-on knowledge in stucco finishing, exterior textures, and interior drywall installation.
              </p>
            </div>
            <div className="relative">
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#A71912]" />
              <p className="text-xs font-bold text-[#A71912] uppercase tracking-wider">
                Serving Since {BUSINESS_INFO.servingSince}
              </p>
              <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                Established in {BUSINESS_INFO.serviceArea}, delivering reliable weekday service and consistent craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Values & Commitment */}
        <section className="space-y-2.5">
          <h2 className="text-base font-extrabold text-[#171717] px-1">
            Our Values & Commitment
          </h2>
          {COMPANY_VALUES.map((val) => (
            <div
              key={val.title}
              className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-[#A71912]/10 text-[#A71912] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#171717]">{val.title}</h3>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Service Location */}
        <section className="bg-[#171717] text-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#A71912] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold">Service Location</h2>
              <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                Based at {BUSINESS_INFO.address.full}, serving {BUSINESS_INFO.serviceArea}.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2.5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate('/estimate')}
              className="flex-1 py-2.5 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Request Estimate <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={BUSINESS_INFO.phoneHref}
              className="py-2.5 px-4 rounded-xl bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </motion.a>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
