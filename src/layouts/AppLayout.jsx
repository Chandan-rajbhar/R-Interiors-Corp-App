import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';

export function AppLayout({ children }) {
  const scrollRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

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
        <BottomNavigation />
        <div id="app-modal-root" />
      </div>
    </div>
  );
}
