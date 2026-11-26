import { AnimatedPage } from '../components/AnimatedPage';
import { ServiceCard } from '../components/ServiceCard';
import { HERO_IMAGE, SERVICES_DATA } from '../data/servicesData';

export function Services() {
  return (
    <AnimatedPage>
      {/* Header Banner */}
      <div className="relative h-40 bg-[#171717] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="R Interiors Corp Services"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-2xl font-black text-white">Our Services</h1>
          <p className="mt-1 text-xs text-neutral-300">
            Professional Solutions for Your Interior & Exterior Needs
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      {/* Verified Services List */}
      <div className="px-4 py-5 space-y-4">
        {SERVICES_DATA.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </AnimatedPage>
  );
}
