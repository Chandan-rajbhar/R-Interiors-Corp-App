import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Wrench, Image, Phone } from 'lucide-react';
import { BOTTOM_NAV_ITEMS } from '../data/navigationData';

const ICON_MAP = {
  Home,
  User,
  Wrench,
  Image,
  Phone,
};

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const isItemActive = (path) => {
    if (path === '/services' && location.pathname.startsWith('/services')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav
      aria-label="Primary bottom navigation"
      className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#C7C7C7]/50 px-2 pt-1.5 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto pb-1.5">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon] || Home;
          const active = isItemActive(item.path);

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate(item.path)}
              aria-current={active ? 'page' : undefined}
              className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl focus:outline-none cursor-pointer"
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-x-2 top-0.5 h-7 rounded-full bg-[#A71912]/10"
                />
              )}
              <Icon
                className={`relative z-10 w-5 h-5 transition-colors duration-200 ${
                  active ? 'text-[#A71912]' : 'text-neutral-500'
                }`}
                strokeWidth={active ? 2.4 : 1.9}
              />
              <span
                className={`relative z-10 mt-1 text-[11px] leading-none transition-colors duration-200 ${
                  active ? 'text-[#A71912] font-bold' : 'text-neutral-500 font-medium'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
