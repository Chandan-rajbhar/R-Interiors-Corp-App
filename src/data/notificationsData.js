import { FileText, Building2, Sparkles } from 'lucide-react';

export const NOTIFICATIONS_LIST = [
  {
    id: 'n1',
    title: 'Free Estimate Available',
    body: 'Request a custom stucco or drywall quote in minutes.',
    time: 'Just now',
    path: '/estimate',
    defaultUnread: true,
    icon: FileText,
  },
  {
    id: 'n2',
    title: 'Explore Local Directory',
    body: 'Browse Construction, Restaurants, HVAC & more categories.',
    time: '2h ago',
    path: '/directory',
    defaultUnread: true,
    icon: Building2,
  },
  {
    id: 'n3',
    title: '27+ Years of Craftsmanship',
    body: 'R Interiors Corp is open Mon–Fri, 7:00 AM – 4:30 PM.',
    time: '1d ago',
    path: '/hours',
    defaultUnread: false,
    icon: Sparkles,
  },
];

const READ_STORAGE_KEY = 'manta_notifications_read';

export function getReadNotificationIds() {
  try {
    const raw = localStorage.getItem(READ_STORAGE_KEY);
    if (raw) {
      return new Set(JSON.parse(raw));
    }
  } catch {
    // Ignore storage errors
  }
  return new Set(
    NOTIFICATIONS_LIST.filter((n) => !n.defaultUnread).map((n) => n.id)
  );
}

export function saveReadNotificationIds(readSet) {
  try {
    localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readSet]));
  } catch {
    // Ignore storage errors
  }
}

export function getUnreadNotificationCount() {
  const readIds = getReadNotificationIds();
  return NOTIFICATIONS_LIST.filter((n) => !readIds.has(n.id)).length;
}
