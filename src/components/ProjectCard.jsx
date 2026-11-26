import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

export function ProjectCard({ item, onSelect }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(item)}
      className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-[#C7C7C7]/40 shadow-sm text-left focus:outline-none cursor-pointer"
      aria-label={`Preview ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-between p-2.5">
        <div className="flex justify-end">
          <span className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-sm text-white flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>
        <div>
          <span className="inline-block px-2 py-0.5 rounded-full bg-[#A71912] text-white text-[10px] font-bold uppercase tracking-wider">
            {item.category}
          </span>
          <p className="mt-1 text-xs font-bold text-white leading-tight line-clamp-2">
            {item.title}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
