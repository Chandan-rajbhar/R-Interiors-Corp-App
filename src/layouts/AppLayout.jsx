import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';

const TOP_LEVEL_ROUTES = ['/home', '/about', '/services', '/gallery', '/contact'];

export function AppLayout({ children }) {
  const scrollRef = useRef(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isTopLevel = TOP_LEVEL_ROUTES.includes(pathname);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-dvh w-full bg-[#ECEEF2] sm:py-5 sm:px-4 flex items-center justify-center">
      {/* Mobile App Container */}
      <div className="w-full sm:max-w-[430px] h-dvh sm:h-[min(860px,calc(100dvh-2.5rem))] bg-[#F8F9FA] sm:rounded-[2.25rem] sm:border-[6px] sm:border-[#171717] sm:shadow-[0_24px_60px_rgba(23,23,23,0.22)] flex flex-col overflow-hidden relative">
        <Header />
        <main
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden app-scroll pb-6"
        >
          {children}
        </main>
        {!isTopLevel && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="absolute bottom-20 left-4 z-30 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#C7C7C7]/60 shadow-[0_4px_16px_rgba(23,23,23,0.16)] flex items-center justify-center text-[#A71912] hover:border-[#A71912] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        )}
        <BottomNavigation />
        <div id="app-modal-root" />
      </div>
    </div>
  );
}
