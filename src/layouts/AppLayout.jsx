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
    <div className="min-h-screen w-full bg-[#ECEEF2] sm:py-6 sm:px-4 flex items-center justify-center">
      {/* Mobile App Container: Fullscreen on phones, realistic centered mobile app frame on tablets/desktop */}
      <div className="w-full sm:max-w-[430px] min-h-screen sm:min-h-[840px] sm:max-h-[900px] sm:h-[calc(100vh-3rem)] bg-[#F8F9FA] sm:rounded-[2.25rem] sm:border-[6px] sm:border-[#171717] sm:shadow-[0_24px_60px_rgba(23,23,23,0.22)] flex flex-col overflow-hidden relative">
        <Header />
        <main
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden app-scroll pb-6"
        >
          {children}
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
}
