import { AnimatedPage } from '../components/AnimatedPage';
import { MenuQuickAccess } from '../components/MenuQuickAccess';
import { BUSINESS_INFO } from '../data/businessData';

export function Menu() {
  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-5 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">Menu &amp; Quick Access</h1>
        <p className="mt-1 text-xs text-neutral-300">
          Navigate all {BUSINESS_INFO.name} screens &amp; contact options
        </p>
      </div>

      <div className="px-4 py-5">
        <MenuQuickAccess />
      </div>
    </AnimatedPage>
  );
}
