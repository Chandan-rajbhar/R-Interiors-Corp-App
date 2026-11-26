import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Bell, User } from 'lucide-react';
import { BrandLogo } from '../assets/icons/BrandLogo';
import { getUnreadNotificationCount } from '../data/notificationsData';

const TOP_LEVEL_ROUTES = ['/home', '/about', '/services', '/gallery', '/contact'];
const MEMBER_STORAGE_KEY = 'manta_member_session';

function readMemberSession() {
  try {
    const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(getUnreadNotificationCount);
  const [member, setMember] = useState(readMemberSession);

  const isTopLevel = TOP_LEVEL_ROUTES.includes(location.pathname);
  const isNotificationsPage = location.pathname === '/notifications';
  const isProfilePage = location.pathname === '/profile';

  useEffect(() => {
    setUnreadCount(getUnreadNotificationCount());
    setMember(readMemberSession());
  }, [location.pathname]);

  useEffect(() => {
    const syncMember = () => setMember(readMemberSession());
    window.addEventListener('manta-member-updated', syncMember);
    return () => window.removeEventListener('manta-member-updated', syncMember);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  };

  const memberInitial = member?.name?.trim()?.charAt(0)?.toUpperCase() || '';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#C7C7C7]/40 px-4 h-14 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      {/* Left: Back + Brand */}
      <div className="flex items-center gap-1.5 min-w-0">
        {!isTopLevel && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="w-8 h-8 -ml-1 rounded-full flex items-center justify-center text-[#171717] hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
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

      {/* Right: Notifications Page + Profile Page */}
      <div className="flex items-center gap-1.5">
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() =>
            navigate(isNotificationsPage ? '/home' : '/notifications')
          }
          aria-label="Notifications"
          className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            isNotificationsPage
              ? 'bg-[#171717] text-white'
              : 'bg-neutral-100 text-[#171717] hover:bg-neutral-200/80'
          }`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#A71912] text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={() => navigate(isProfilePage ? '/home' : '/profile')}
          aria-label="Profile"
          className={`w-9 h-9 rounded-full overflow-hidden flex items-center justify-center transition-colors cursor-pointer ${
            member?.avatar
              ? 'border border-neutral-200'
              : member
                ? 'bg-[#A71912] text-white shadow-sm'
                : isProfilePage
                  ? 'bg-[#171717] text-white'
                  : 'bg-neutral-100 text-[#171717] hover:bg-neutral-200/80'
          }`}
        >
          {member?.avatar ? (
            <img
              src={member.avatar}
              alt={member.name || 'Profile'}
              className="w-full h-full object-cover"
            />
          ) : memberInitial ? (
            <span className="text-xs font-extrabold">{memberInitial}</span>
          ) : (
            <User className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </header>
  );
}
