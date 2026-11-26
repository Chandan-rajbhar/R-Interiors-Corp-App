import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { DIRECTORY_FAQS } from '../data/directoryData';

const PROJECT_RESOURCES = [
  {
    title: 'Planning a stucco finishing project',
    detail: 'Note the surfaces to be finished, the preferred texture or appearance, and any areas that need special attention. Share reference photos when requesting an estimate.',
    service: 'Stucco Finishing',
  },
  {
    title: 'Preparing for drywall installation',
    detail: 'List the rooms and surfaces involved, approximate dimensions if available, and any access or scheduling considerations that may affect the work.',
    service: 'Drywall Installation',
  },
  {
    title: 'Getting ready to request an estimate',
    detail: 'Describe the project scope and location, identify the service you need, and include clear photos when they help explain the work.',
    service: 'Project preparation',
  },
];

export function FAQs() {
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-5 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">FAQs &amp; Project Resources</h1>
        <p className="mt-1 text-xs text-neutral-300">Helpful information for planning stucco and drywall work.</p>
      </div>

      <div className="px-4 py-5 space-y-6">
        <section aria-labelledby="faqs-heading" className="space-y-2">
          <h2 id="faqs-heading" className="text-base font-extrabold text-[#171717]">Frequently Asked Questions</h2>
          {DIRECTORY_FAQS.map((item, index) => {
            const isOpen = openQuestion === index;
            return (
              <div key={item.q} className="bg-white rounded-xl border border-[#C7C7C7]/60 overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                  className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left cursor-pointer"
                >
                  <span className="text-sm font-bold text-[#171717]">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#A71912] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="px-4 pb-4 text-xs leading-relaxed text-neutral-600">{item.a}</p>}
              </div>
            );
          })}
        </section>

        <section aria-labelledby="resources-heading" className="space-y-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#A71912]" />
            <h2 id="resources-heading" className="text-base font-extrabold text-[#171717]">Project Resources</h2>
          </div>
          {PROJECT_RESOURCES.map((resource) => (
            <article key={resource.title} className="bg-white rounded-xl border border-[#C7C7C7]/60 p-4">
              <h3 className="text-sm font-bold text-[#171717]">{resource.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">{resource.detail}</p>
              <button
                type="button"
                onClick={() => navigate('/estimate', { state: { selectedService: resource.service } })}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#A71912] cursor-pointer"
              >
                Request an estimate <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </article>
          ))}
        </section>
      </div>
    </AnimatedPage>
  );
}