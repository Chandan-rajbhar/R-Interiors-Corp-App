import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BrandLogo } from '../assets/icons/BrandLogo';
import { BUSINESS_INFO } from '../data/businessData';
import { HERO_IMAGE } from '../data/servicesData';

export function Splash({ onFinish }) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      } else {
        navigate('/home', { replace: true });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, onFinish]);

  return (
    <div className="min-h-dvh w-full bg-[#ECEEF2] sm:py-5 sm:px-4 flex items-center justify-center">
      <div className="w-full sm:max-w-[430px] h-dvh sm:h-[min(860px,calc(100dvh-2.5rem))] bg-[#171717] sm:rounded-[2.25rem] sm:border-[6px] sm:border-[#171717] sm:shadow-[0_24px_60px_rgba(23,23,23,0.28)] relative overflow-hidden flex flex-col items-center justify-center px-7 text-center">
        {/* Background Construction Image */}
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/80 via-[#171717]/75 to-[#171717]/95" />

        {/* Subtle Red Accent Glow */}
        <div className="absolute top-1/3 w-64 h-64 rounded-full bg-[#A71912]/25 blur-3xl pointer-events-none" />

        {/* Logo & Business Identity */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="p-5 rounded-3xl bg-white/95 shadow-2xl border border-white/20">
            <BrandLogo size="lg" showWordmark={false} />
          </div>

          <h1 className="mt-6 text-2xl font-black tracking-tight text-white uppercase">
            {BUSINESS_INFO.name}
          </h1>
          <div className="mt-2 h-1 w-12 rounded-full bg-[#A71912]" />
          <p className="mt-3 text-sm font-medium text-neutral-200 max-w-[260px] leading-relaxed">
            {BUSINESS_INFO.tagline}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#C7C7C7]">
            Deerfield Beach, Florida
          </p>
        </motion.div>

        {/* Animated Loading Indicator */}
        <div className="relative z-10 mt-14 w-40 flex flex-col items-center gap-2.5">
          <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#A71912] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 1.85, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-400">
            Loading Experience
          </span>
        </div>
      </div>
    </div>
  );
}
