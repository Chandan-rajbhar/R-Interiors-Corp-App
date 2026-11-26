import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, ChevronRight } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import {
  NOTIFICATIONS_LIST,
  getReadNotificationIds,
  saveReadNotificationIds,
} from '../data/notificationsData';

export function Notifications() {
  const navigate = useNavigate();
  const [readIds, setReadIds] = useState(getReadNotificationIds);

  const unreadCount = NOTIFICATIONS_LIST.filter((n) => !readIds.has(n.id)).length;

  const handleMarkAllRead = () => {
    const next = new Set(NOTIFICATIONS_LIST.map((n) => n.id));
    saveReadNotificationIds(next);
    setReadIds(next);
  };

  const handleOpenNotification = (item) => {
    const next = new Set(readIds);
    next.add(item.id);
    saveReadNotificationIds(next);
    setReadIds(next);
    navigate(item.path);
  };

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-5 border-b-4 border-[#A71912]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-black flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#F87171]" />
              Notifications
            </h1>
            <p className="mt-1 text-xs text-neutral-300">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.`
                : 'You are all caught up.'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-2">
        {NOTIFICATIONS_LIST.map((item) => {
          const Icon = item.icon;
          const isUnread = !readIds.has(item.id);
          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.99 }}
              onClick={() => handleOpenNotification(item)}
              className={`w-full rounded-xl p-3 border shadow-sm flex items-center gap-3 text-left transition-colors cursor-pointer ${
                isUnread
                  ? 'bg-white border-[#A71912]/40'
                  : 'bg-white/90 border-[#C7C7C7]/50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isUnread
                    ? 'bg-[#A71912] text-white'
                    : 'bg-[#A71912]/10 text-[#A71912]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs font-extrabold text-[#171717] truncate">
                    {item.title}
                  </h2>
                  {isUnread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A71912] shrink-0" />
                  )}
                  <span className="text-[10px] text-neutral-400 ml-auto shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-neutral-500 line-clamp-1">
                  {item.body}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </AnimatedPage>
  );
}
