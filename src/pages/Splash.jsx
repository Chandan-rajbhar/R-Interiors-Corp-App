import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { BrandLogo } from '../assets/icons/BrandLogo';
import { BUSINESS_INFO } from '../data/businessData';

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
    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#262626_0%,_#171717_55%,_#0D0D0D_100%)] relative overflow-hidden flex flex-col items-center justify-between px-7 py-12 text-center">
      {/* Top spacer for vertical centering */}
      <div />

      {/* Center Logo & Business Identity */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="px-5 py-4 rounded-2xl bg-white shadow-2xl border border-white/20">
          <BrandLogo size="lg" />
        </div>

        <h1 className="mt-6 text-xl font-black tracking-tight text-white">
          {BUSINESS_INFO.name}
        </h1>
        <p className="mt-1.5 text-xs font-medium text-neutral-300 max-w-[260px] leading-relaxed">
          {BUSINESS_INFO.tagline}
        </p>
      </motion.div>

      {/* Bottom Progress Bar & Location */}
      <div className="relative z-10 w-36 flex flex-col items-center gap-2.5">
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#A71912] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1.85, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">
          Deerfield Beach, FL
        </span>
      </div>
    </div>
  );
}
