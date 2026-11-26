import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Menu, X, Phone } from 'lucide-react';
import { BrandLogo } from '../assets/icons/BrandLogo';
import { BUSINESS_INFO } from '../data/businessData';

const TOP_LEVEL_ROUTES = ['/home', '/about', '/services', '/gallery', '/contact'];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isTopLevel = TOP_LEVEL_ROUTES.includes(location.pathname);
  const isMenuPage = location.pathname === '/menu';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  };

  const handleMenuToggle = () => {
    if (isMenuPage) {
      handleBack();
    } else {
      navigate('/menu');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#C7C7C7]/40 px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-1.5 min-w-0">
        {!isTopLevel && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            aria-label="Go back"
            className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-[#171717] hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        )}
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="text-left focus:outline-none cursor-pointer"
          aria-label="R Interiors Corp Home"
        >
          <BrandLogo size="sm" />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <motion.a
          whileTap={{ scale: 0.92 }}
          href={BUSINESS_INFO.phoneHref}
          aria-label={`Call ${BUSINESS_INFO.phone}`}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#A71912] bg-[#A71912]/8 hover:bg-[#A71912]/15 transition-colors"
        >
          <Phone className="w-4 h-4" />
        </motion.a>
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={handleMenuToggle}
          aria-label={isMenuPage ? 'Close menu page' : 'Open menu page'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isMenuPage
              ? 'bg-[#A71912] text-white'
              : 'text-[#171717] hover:bg-neutral-100'
          }`}
        >
          {isMenuPage ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>
    </header>
  );
}
