import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { ProjectCard } from '../components/ProjectCard';
import { GALLERY_ITEMS, HERO_IMAGE } from '../data/servicesData';

const CATEGORIES = ['All', 'Stucco', 'Drywall'];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem = activeIndex !== null ? filteredItems[activeIndex] : null;

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % filteredItems.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <AnimatedPage>
      {/* Header Banner */}
      <div className="relative h-40 bg-[#171717] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Craftsmanship Gallery"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-2xl font-black text-white">Project & Service Gallery</h1>
          <p className="mt-1 text-xs text-neutral-300">
            Quality Craftsmanship in Stucco & Drywall
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Gallery categories">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#A71912] text-white shadow-sm'
                    : 'bg-white text-neutral-700 border border-[#C7C7C7]/60 hover:bg-neutral-50'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Honest Illustrative Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#C7C7C7]/50 text-[11px] text-neutral-600">
          <Info className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            These images are illustrative service visuals representing the stucco finishing and drywall installation work offered by R Interiors Corp.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item, idx) => (
            <ProjectCard
              key={item.id}
              item={item}
              onSelect={() => setActiveIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Full-Screen Image Preview Modal (scoped inside mobile app wrapper) */}
      {(() => {
        const modalContent = (
          <AnimatePresence>
            {activeItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveIndex(null)}
                className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col justify-between p-4"
                role="dialog"
                aria-modal="true"
                aria-label={activeItem.title}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="px-2.5 py-1 rounded-full bg-[#A71912] text-[11px] font-bold uppercase tracking-wider">
                    {activeItem.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(null)}
                    aria-label="Close preview"
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full mx-auto my-auto"
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full max-h-[58vh] object-contain rounded-2xl shadow-2xl"
                  />
                  {filteredItems.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/55 text-white flex items-center justify-center hover:bg-black/80 cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </motion.div>

                <div className="w-full mx-auto text-center text-white pb-2">
                  <h2 className="text-base font-bold">{activeItem.title}</h2>
                  <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                    {activeItem.caption}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );

        const modalRoot = typeof document !== 'undefined' ? document.getElementById('app-modal-root') : null;
        return modalRoot ? createPortal(modalContent, modalRoot) : modalContent;
      })()}
    </AnimatedPage>
  );
}
