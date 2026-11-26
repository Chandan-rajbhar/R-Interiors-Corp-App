import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  Star,
  Info,
  Wrench,
  Image,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Home,
  Search,
  BookOpen,
  TrendingUp,
  Globe,
  Building2,
  Newspaper,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

const MENU_SECTIONS = [
  {
    title: 'Estimates & Services',
    items: [
      {
        label: 'Request Free Estimate',
        sublabel: 'Submit project details & photos',
        path: '/estimate',
        icon: FileText,
        accent: true,
      },
      {
        label: 'Business Directory & Search',
        sublabel: 'Search services, cities & FAQs',
        path: '/directory',
        icon: Search,
      },
      {
        label: 'Our Services',
        sublabel: 'Stucco Finishing & Drywall Installation',
        path: '/services',
        icon: Wrench,
      },
      {
        label: 'Project & Service Gallery',
        sublabel: 'Browse stucco & drywall visuals',
        path: '/gallery',
        icon: Image,
      },
    ],
  },
  {
    title: 'Company Information',
    items: [
      {
        label: 'Home Dashboard',
        sublabel: 'Overview & highlights',
        path: '/home',
        icon: Home,
      },
      {
        label: 'About R Interiors Corp',
        sublabel: '27+ years experience • Serving since 2015',
        path: '/about',
        icon: Info,
      },
      {
        label: 'Business Hours',
        sublabel: 'Mon – Fri: 7:00 AM – 4:30 PM',
        path: '/hours',
        icon: Clock,
      },
      {
        label: 'Customer Reviews',
        sublabel: 'View or share project feedback',
        path: '/reviews',
        icon: Star,
      },
      {
        label: 'FAQs & Project Resources',
        sublabel: 'Answers and preparation notes',
        path: '/faqs',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'Manta Services & Resources',
    items: [
      {
        label: 'Digital Marketing Services',
        sublabel: 'Online marketing & growth solutions',
        path: '/digital-marketing',
        icon: TrendingUp,
      },
      {
        label: 'Local SEO Starter & FAQs',
        sublabel: 'Rankings, packages & SEO answers',
        path: '/seo-services',
        icon: Globe,
      },
      {
        label: 'Business Listings Management',
        sublabel: 'Free listing claim & directory sync',
        path: '/business-listings',
        icon: Building2,
      },
      {
        label: 'Small Business Blog',
        sublabel: 'Marketing advice that works',
        path: '/blog',
        icon: Newspaper,
      },
      {
        label: 'About Manta & Reviews',
        sublabel: '25+ years • 35M businesses',
        path: '/manta-about',
        icon: Info,
      },
      {
        label: 'Manta Business Reviews',
        sublabel: 'Verified customer testimonials',
        path: '/manta-reviews',
        icon: Star,
      },
      {
        label: 'Terms & Conditions',
        sublabel: 'Platform usage & listing terms',
        path: '/terms',
        icon: Scale,
      },
      {
        label: 'Privacy Policy',
        sublabel: 'Data collection & privacy details',
        path: '/privacy',
        icon: ShieldCheck,
      },
    ],
  },
];

export function MenuQuickAccess() {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {MENU_SECTIONS.map((section) => (
        <section key={section.title}>
          <h2 className="px-1 mb-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            {section.title}
          </h2>
          <div className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden divide-y divide-neutral-100">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.path}
                  type="button"
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(item.path)}
                  className="w-full px-4 py-3.5 flex items-center gap-3.5 text-left hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      item.accent
                        ? 'bg-[#A71912] text-white shadow-sm'
                        : 'bg-[#A71912]/10 text-[#A71912]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#171717] truncate">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {item.sublabel}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </motion.button>
              );
            })}
          </div>
        </section>
      ))}

      {/* Direct Contact Section */}
      <section>
        <h2 className="px-1 mb-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Direct Contact
        </h2>
        <div className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm p-4 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-neutral-600">
            <MapPin className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#171717]">{BUSINESS_INFO.name}</p>
              <p className="mt-0.5">{BUSINESS_INFO.address.full}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="py-2.5 px-3 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
            <a
              href={BUSINESS_INFO.emailHref}
              className="py-2.5 px-3 rounded-xl border border-[#C7C7C7] text-[#171717] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
