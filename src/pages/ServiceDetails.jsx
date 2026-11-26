import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Calculator, ArrowLeft } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { SERVICES_DATA } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/businessData';

export function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return (
      <AnimatedPage>
        <div className="p-6 text-center space-y-4">
          <h1 className="text-lg font-bold text-[#171717]">Service Not Found</h1>
          <p className="text-sm text-neutral-600">
            The requested service could not be found.
          </p>
          <button
            type="button"
            onClick={() => navigate('/services')}
            className="px-4 py-2.5 rounded-xl bg-[#A71912] text-white text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      {/* Large Service Banner */}
      <div className="relative h-52 bg-[#171717] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#A71912] text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">
            R Interiors Corp Service
          </span>
          <h1 className="text-2xl font-black text-white">{service.title}</h1>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Detailed Description */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm">
          <h2 className="text-base font-extrabold text-[#171717]">Overview</h2>
          <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
            {service.fullDescription}
          </p>
        </section>

        {/* Benefits */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm">
          <h2 className="text-base font-extrabold text-[#171717]">Key Benefits</h2>
          <ul className="mt-3 space-y-2.5">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-700 leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Relevant Images */}
        {service.galleryImages && service.galleryImages.length > 0 && (
          <section>
            <h2 className="text-sm font-extrabold text-[#171717] mb-2.5 px-1">
              Illustrative {service.title} Examples
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {service.galleryImages.map((imgSrc, idx) => (
                <div
                  key={`${service.id}-img-${idx}`}
                  className="aspect-[4/3] rounded-xl overflow-hidden border border-[#C7C7C7]/40 bg-neutral-100"
                >
                  <img
                    src={imgSrc}
                    alt={`${service.title} example ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Why Choose R Interiors Corp */}
        <section className="bg-neutral-900 text-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-sm font-extrabold">
            Why Choose R Interiors Corp for {service.title}?
          </h2>
          <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
            {service.whyChoose}
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-col gap-2.5 pt-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() =>
              navigate('/estimate', { state: { selectedService: service.title } })
            }
            className="w-full py-3.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            Request an Estimate
          </motion.button>
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={BUSINESS_INFO.phoneHref}
            className="w-full py-3 px-4 rounded-xl border border-[#C7C7C7] bg-white hover:bg-neutral-50 text-[#171717] text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#A71912]" />
            Call Now: {BUSINESS_INFO.phone}
          </motion.a>
        </div>
      </div>
    </AnimatedPage>
  );
}
