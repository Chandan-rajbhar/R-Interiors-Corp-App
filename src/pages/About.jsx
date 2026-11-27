import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  Share2,
  Check,
  TrendingUp,
  Award,
  Target,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import aboutBannerImg from '../assets/images/stucco-finishing.jpg';

const TOP_BENEFITS = [
  'Full Digital Marketing suite with data-driven decisions and strategies.',
  'Industry-leading user experience.',
  'Custom quote for every product built for the needs of your business.',
  'Dedicated Customer Success Manager and Digital Marketing Experts to help along the way.',
  'Customizable reporting through a Member Dashboard to see all products and progress in one place.',
  'Proprietary SEO technology built to service the needs of your business.',
];

export function About() {
  const navigate = useNavigate();
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'About Manta',
      text: 'Manta Provides Online Marketing Services for Small Businesses.',
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled share
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      // Ignore clipboard errors
    }
  };

  return (
    <AnimatedPage>
      {/* Top Banner */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={aboutBannerImg}
          alt="About Manta"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
            Online Marketing &amp; Directory
          </span>
          <h1 className="text-2xl font-black text-white mt-0.5 drop-shadow-sm">
            About Manta
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Manta Provides Online Marketing Services */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3">
          <h2 className="text-base font-extrabold text-[#171717]">
            Manta Provides Online Marketing Services
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Manta is a results-driven online marketing agency dedicated to helping small and medium-sized businesses grow online. For over 25 years, our mission has been to provide effective online marketing results and client experiences in the industry.
          </p>

          <div className="pt-2 border-t border-neutral-100 space-y-2">
            <h3 className="text-xs font-extrabold text-[#171717] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#A71912]" />
              Delivering Award-Winning Online Marketing Services for Over 25 Years
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Manta started over 25 years ago to become a resource for small businesses nationwide. Today, Manta has helped millions of businesses grow online with digital marketing services, trusted experts, and consistent growth.
            </p>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our team has helped 66% of our clients reach the top 10 results of Google within the first 6 months of beginning an SEO campaign.
            </p>
          </div>

          <div className="pt-2 border-t border-neutral-100 space-y-1.5">
            <h3 className="text-xs font-extrabold text-[#171717]">
              Manta Prioritizes Generating Successful Outcomes
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No matter what industry your business comes from, Manta has the experience and expertise to understand and assist your business needs.
            </p>
          </div>
        </section>

        {/* Top Benefits of Manta */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3">
          <div>
            <h2 className="text-base font-extrabold text-[#171717] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#A71912]" />
              Top Benefits of Manta
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              30,000+ customers worldwide trust Manta with their digital marketing efforts.
            </p>
          </div>

          <ul className="space-y-2.5">
            {TOP_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#A71912] shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-700 leading-relaxed">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Workplace, Competitive Advantage & Mission */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3.5">
          <div>
            <h2 className="text-xs font-extrabold text-[#171717]">
              Award-Winning Workplace
            </h2>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              Ready to make an impact and help small businesses succeed along the way? Our team is dedicated to supporting local businesses every day.
            </p>
          </div>

          <div className="pt-2.5 border-t border-neutral-100">
            <h2 className="text-xs font-extrabold text-[#171717]">
              Online Marketing Services Designed to Give Your Business a Competitive Advantage
            </h2>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              We analyze your business and show you what online marketing services we recommend to grow your revenue—fast, easy, and tailored to your goals.
            </p>
          </div>

          <div className="pt-2.5 border-t border-neutral-100">
            <h2 className="text-xs font-extrabold text-[#171717] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#A71912]" />
              Our Mission is to Empower Small Businesses to Achieve Success
            </h2>
            <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
              Millions of unique visitors search our Manta directory every month to find local business needs through our comprehensive database. Business owners can claim and customize their profile page to improve online visibility and marketability.
            </p>
          </div>
        </section>

        {/* Share & Actions */}
        <div className="flex flex-col gap-2.5 pt-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/digital-marketing')}
            className="w-full py-3.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
          >
            Explore Digital Marketing Services
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/business-listings')}
              className="py-3 px-4 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              Claim My Listing
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="py-3 px-4 rounded-xl bg-white border border-[#C7C7C7] text-[#171717] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Link Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#A71912]" />
                  Share
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
