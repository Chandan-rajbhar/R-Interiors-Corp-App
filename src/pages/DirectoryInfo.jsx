import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Phone, Calculator } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DIRECTORY_RESOURCES } from '../data/directoryData';
import { BUSINESS_INFO } from '../data/businessData';

export function DirectoryInfo() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topic = DIRECTORY_RESOURCES.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <AnimatedPage>
        <div className="p-6 text-center space-y-4">
          <h1 className="text-lg font-bold text-[#171717]">Resource Not Found</h1>
          <button
            type="button"
            onClick={() => navigate('/directory')}
            className="px-4 py-2.5 rounded-xl bg-[#A71912] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A71912] text-white text-[10px] font-bold uppercase tracking-wider">
          <BookOpen className="w-3 h-3" /> {topic.badge}
        </span>
        <h1 className="mt-2 text-xl font-black leading-tight">{topic.title}</h1>
        <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">{topic.summary}</p>
      </div>

      <div className="px-4 py-5 space-y-4">
        {topic.sections.map((sec) => (
          <section
            key={sec.heading}
            className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2"
          >
            <h2 className="text-sm font-extrabold text-[#171717]">{sec.heading}</h2>
            <p className="text-xs text-neutral-600 leading-relaxed">{sec.body}</p>
          </section>
        ))}

        <div className="flex flex-col gap-2.5 pt-1">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/estimate')}
            className="w-full py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            Request a Free Estimate
          </motion.button>
          <motion.a
            whileTap={{ scale: 0.98 }}
            href={BUSINESS_INFO.phoneHref}
            className="w-full py-3 px-4 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call {BUSINESS_INFO.phone}
          </motion.a>
        </div>
      </div>
    </AnimatedPage>
  );
}
