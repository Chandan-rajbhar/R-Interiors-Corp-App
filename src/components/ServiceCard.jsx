import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ServiceCard({ service, compact = false }) {
  const navigate = useNavigate();

  if (compact) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(`/services/${service.slug}`)}
        className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden cursor-pointer flex flex-col"
      >
        <div className="h-28 overflow-hidden bg-neutral-100">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-[#171717] leading-snug">{service.title}</h3>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#A71912]">
            Learn More <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden"
    >
      <div className="h-44 overflow-hidden bg-neutral-100 relative">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-extrabold text-[#171717]">{service.title}</h3>
        <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
          {service.shortDescription}
        </p>
        <div className="mt-4 flex flex-col gap-2.5">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate(`/services/${service.slug}`)}
            className="w-full py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() =>
              navigate('/estimate', { state: { selectedService: service.title } })
            }
            className="w-full py-2.5 px-4 rounded-xl border border-[#C7C7C7] bg-white hover:bg-neutral-50 text-[#171717] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#A71912]" />
            Request Estimate
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
