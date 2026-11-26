import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function ContactCard({ icon: Icon, title, subtitle, href, onClick, external = false }) {
  const content = (
    <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm hover:border-[#A71912]/40 transition-colors">
      <div className="w-11 h-11 rounded-xl bg-[#A71912] text-white flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-bold text-[#171717] truncate">{title}</p>
        <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
    </div>
  );

  if (href) {
    return (
      <motion.a
        whileTap={{ scale: 0.985 }}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="block focus:outline-none"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="w-full block focus:outline-none cursor-pointer"
    >
      {content}
    </motion.button>
  );
}
