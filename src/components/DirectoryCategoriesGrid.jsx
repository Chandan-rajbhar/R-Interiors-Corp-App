import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  MantaRestaurantsIcon,
  MantaLandscapingIcon,
  MantaConstructionIcon,
  MantaHealthcareIcon,
  MantaHvacIcon,
  MantaRealEstateIcon,
  MantaTruckingIcon,
} from '../assets/icons/MantaIcons';
import { CATEGORY_IMAGES, DIRECTORY_CATEGORIES } from '../data/directoryData';

const CATEGORY_SVG_MAP = {
  construction: MantaConstructionIcon,
  restaurants: MantaRestaurantsIcon,
  landscaping: MantaLandscapingIcon,
  healthcare: MantaHealthcareIcon,
  hvac: MantaHvacIcon,
  realestate: MantaRealEstateIcon,
  trucking: MantaTruckingIcon,
};

export function DirectoryCategoriesGrid({
  heading = "Find What You're Looking For",
  subheading = 'Select any category to explore details and services inside the app.',
  headingId = 'dir-categories-heading',
  limit = null,
  onViewMore,
  viewMoreLabel = 'View More',
}) {
  const navigate = useNavigate();
  const visibleCategories = DIRECTORY_CATEGORIES.filter(
    (cat) => !cat.hiddenFromGrid
  );
  const displayedCategories = limit
    ? visibleCategories.slice(0, limit)
    : visibleCategories;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-base font-extrabold text-[#171717]">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-0.5 text-xs text-neutral-500">{subheading}</p>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {displayedCategories.map((cat) => {
          const SvgIcon = CATEGORY_SVG_MAP[cat.id] || MantaConstructionIcon;
          const categoryImage = CATEGORY_IMAGES[cat.id];
          return (
            <motion.button
              key={cat.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/directory/category/${cat.id}`)}
              className={`rounded-2xl bg-white shadow-sm text-center flex flex-col overflow-hidden cursor-pointer transition-colors ${
                cat.highlight
                  ? 'border-2 border-[#A71912]/70'
                  : 'border border-[#C7C7C7]/50 hover:border-[#A71912]/40'
              }`}
            >
              <div className="relative w-full h-24 bg-neutral-100 overflow-hidden">
                {categoryImage ? (
                  <img
                    src={categoryImage}
                    alt={cat.label}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <SvgIcon
                      className={`w-10 h-10 ${
                        cat.highlight ? 'text-[#A71912]' : 'text-[#171717]'
                      }`}
                    />
                  </div>
                )}
                <div
                  className={`absolute bottom-1.5 right-1.5 w-7 h-7 rounded-lg bg-white/95 shadow-sm flex items-center justify-center ${
                    cat.highlight ? 'text-[#A71912]' : 'text-[#171717]'
                  }`}
                >
                  <SvgIcon className="w-4 h-4" />
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center">
                <p
                  className={`text-sm text-[#171717] ${
                    cat.highlight ? 'font-extrabold' : 'font-bold'
                  }`}
                >
                  {cat.label}
                </p>
                <p
                  className={`text-[10px] mt-0.5 ${
                    cat.highlight
                      ? 'font-semibold text-[#A71912]'
                      : 'text-neutral-500'
                  }`}
                >
                  {cat.subtitle}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {onViewMore && (
        <div className="mt-3 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onViewMore}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#A71912]/10 hover:bg-[#A71912] text-[#A71912] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
          >
            {viewMoreLabel}
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      )}
    </section>
  );
}
