import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Phone, Calculator, CheckCircle2 } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BUSINESS_HOURS, BUSINESS_INFO } from '../data/businessData';

function getScheduleSnapshot() {
  const now = new Date();
  const jsDayIndex = now.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const mondayBasedIndex = jsDayIndex === 0 ? 6 : jsDayIndex - 1;
  const todayItem = BUSINESS_HOURS[mondayBasedIndex];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isCurrentlyOpen =
    todayItem.isOpen && currentMinutes >= 7 * 60 && currentMinutes < 16 * 60 + 30;
  return { mondayBasedIndex, isCurrentlyOpen };
}

export function BusinessHours() {
  const navigate = useNavigate();
  const [{ mondayBasedIndex, isCurrentlyOpen }, setSnapshot] = useState(getScheduleSnapshot);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnapshot(getScheduleSnapshot());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-5 border-b-4 border-[#A71912]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-black">Business Hours</h1>
            <p className="mt-1 text-xs text-neutral-300">{BUSINESS_INFO.name}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
              isCurrentlyOpen
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                : 'bg-[#A71912]/30 text-red-200 border border-[#A71912]/50'
            }`}
          >
            {isCurrentlyOpen ? 'Open Now' : 'Currently Closed'}
          </span>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        <div className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden divide-y divide-neutral-100">
          {BUSINESS_HOURS.map((item, idx) => {
            const isToday = idx === mondayBasedIndex;
            return (
              <div
                key={item.day}
                className={`px-4 py-3.5 flex items-center justify-between ${
                  isToday ? 'bg-[#A71912]/8' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock
                    className={`w-4 h-4 ${
                      isToday ? 'text-[#A71912]' : 'text-neutral-400'
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      isToday ? 'font-extrabold text-[#171717]' : 'font-semibold text-neutral-700'
                    }`}
                  >
                    {item.day}
                  </span>
                  {isToday && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#A71912] text-white text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Today
                    </span>
                  )}
                </div>

                <span
                  className={`text-xs font-bold ${
                    item.isOpen
                      ? isToday
                        ? 'text-[#A71912]'
                        : 'text-[#171717]'
                      : 'text-neutral-400'
                  }`}
                >
                  {item.hours}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2.5">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="flex-1 py-3 px-4 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Phone className="w-4 h-4" />
            Call {BUSINESS_INFO.phone}
          </a>
          <button
            type="button"
            onClick={() => navigate('/estimate')}
            className="flex-1 py-3 px-4 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            Request Estimate
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
}
