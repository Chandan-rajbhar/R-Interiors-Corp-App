import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Calculator, ExternalLink } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { ContactCard } from '../components/ContactCard';
import { BUSINESS_INFO } from '../data/businessData';
import { HERO_IMAGE } from '../data/servicesData';

export function Contact() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      {/* Header Banner */}
      <div className="relative h-40 bg-[#171717] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Contact R Interiors Corp"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/65 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-2xl font-black text-white">Let&apos;s Discuss Your Project</h1>
          <p className="mt-1 text-xs text-neutral-300">
            Get in touch with {BUSINESS_INFO.name} for a free estimate.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      <div className="px-4 py-5 space-y-3">
        {/* Contact Information Cards */}
        <ContactCard
          icon={Phone}
          title={BUSINESS_INFO.phone}
          subtitle="Tap to Call Us"
          href={BUSINESS_INFO.phoneHref}
        />

        <ContactCard
          icon={Mail}
          title={BUSINESS_INFO.email}
          subtitle="Tap to Email Us"
          href={BUSINESS_INFO.emailHref}
        />

        <ContactCard
          icon={MapPin}
          title={BUSINESS_INFO.address.street}
          subtitle={`${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zip} • Get Directions`}
          href={BUSINESS_INFO.address.mapsUrl}
          external
        />

        <ContactCard
          icon={Clock}
          title="Business Hours"
          subtitle="Mon – Fri: 7:00 AM – 4:30 PM • Sat–Sun: Closed"
          onClick={() => navigate('/hours')}
        />

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={BUSINESS_INFO.phoneHref}
            className="w-full py-3.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </motion.a>

          <div className="grid grid-cols-2 gap-2.5">
            <motion.a
              whileTap={{ scale: 0.98 }}
              href={BUSINESS_INFO.emailHref}
              className="py-3 px-3 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </motion.a>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate('/estimate')}
              className="py-3 px-3 rounded-xl border border-[#C7C7C7] bg-white hover:bg-neutral-50 text-[#171717] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#A71912]" />
              Request Estimate
            </motion.button>
          </div>
        </div>

        {/* Business Location Map Card */}
        <section className="pt-2">
          <div className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden">
            <div className="p-3.5 flex items-center justify-between border-b border-[#C7C7C7]/40">
              <div>
                <h2 className="text-sm font-extrabold text-[#171717]">
                  {BUSINESS_INFO.name}
                </h2>
                <p className="text-[11px] text-neutral-500">
                  {BUSINESS_INFO.address.full}
                </p>
              </div>
              <a
                href={BUSINESS_INFO.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#A71912]/10 text-[#A71912] text-[11px] font-bold hover:bg-[#A71912]/20 transition-colors"
              >
                Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="h-44 w-full bg-neutral-100">
              <iframe
                title="R Interiors Corp Location Map"
                src="https://maps.google.com/maps?q=1240+SW+6th+Terrace+Deerfield+Beach+FL+33441&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
