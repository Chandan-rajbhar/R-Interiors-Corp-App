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
      className="shrink-0 z-30 px-3 pt-1 pb-2 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/90 to-transparent"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-full border border-[#C7C7C7]/40 shadow-[0_8px_24px_rgba(23,23,23,0.1)] px-2 py-1">
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
              className="relative flex flex-col items-center justify-center py-0.5 px-1 rounded-full focus:outline-none cursor-pointer"
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-x-2.5 top-0 h-6 rounded-full bg-[#A71912]/12"
                />
              )}
              <div className="relative z-10 h-6 flex items-center justify-center">
                <Icon
                  className={`w-[18px] h-[18px] transition-colors duration-200 ${
                    active ? 'text-[#A71912]' : 'text-neutral-500'
                  }`}
                  strokeWidth={active ? 2.4 : 1.9}
                />
              </div>
              <span
                className={`relative z-10 mt-1 text-[10px] leading-none transition-colors duration-200 ${
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
