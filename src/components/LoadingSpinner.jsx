import { motion } from 'framer-motion';

export function LoadingSpinner({ size = 'md', label = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-7 h-7 border-[2.5px]',
    lg: 'w-10 h-10 border-[3px]',
  };

  return (
    <div className="inline-flex items-center justify-center gap-2" role="status" aria-label={label}>
      <motion.span
        className={`${sizes[size] || sizes.md} rounded-full border-[#C7C7C7]/40 border-t-[#A71912] inline-block`}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
