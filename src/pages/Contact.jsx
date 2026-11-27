import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Send,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import contactBannerImg from '../assets/images/stucco-texture-detail.jpg';

const CONTACT_FAQS = [
  {
    q: 'Why Should I Register on Manta?',
    a: 'Manta provides free registration for businesses in the United States to get their company information listed, update their profile, view details about other companies, and connect with local customers.',
  },
  {
    q: 'Do I Have to Pay in Order to Have a Manta Profile?',
    a: 'No. Creating and claiming a basic Manta business profile is completely free. Optional paid plans are available for enhanced visibility and multi-directory listings management.',
  },
  {
    q: 'How Do I Add My Business to Manta.com?',
    a: 'You can add your business anytime from our Business Listings page by entering your company name, city, state, and phone number.',
  },
  {
    q: 'How Do I Claim an Existing Business on Manta?',
    a: 'Search for your company in the Directory or open Business Listings, select your business, and complete the verification steps to manage your listing.',
  },
  {
    q: 'Someone Else at My Company Claimed My Company Account. How Do I Get Access to It?',
    a: 'Submit a General Inquiry below with your company name and listing URL so our support team can help transfer or add authorized access.',
  },
];

const GENERAL_INQUIRIES = [
  {
    q: 'How Do I Unsubscribe From Manta Emails?',
    a: 'Use the unsubscribe link at the bottom of any Manta email or update your preferences from your account settings.',
  },
  {
    q: 'What Is My Manta URL?',
    a: 'Open your business listing page in the directory and copy the web address shown in your browser.',
  },
  {
    q: "There's Incorrect Information About My Company. How Can I Fix It?",
    a: 'Claim your business listing to update your company description, address, phone number, hours, and photos anytime.',
  },
  {
    q: 'What Do I Do If I Forgot My Password?',
    a: 'Visit the Sign In page and tap "Forgot your Password?" to receive reset instructions for your email.',
  },
];

const INITIAL_FORM = {
  inquiryType: 'General Inquiry',
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  listingUrl: '',
  message: '',
};

export function Contact() {
  const navigate = useNavigate();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.message.trim()) {
      setError('Please enter your message (up to 500 characters).');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <AnimatedPage>
      {/* Header Banner */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={contactBannerImg}
          alt="Contact Manta"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-2xl font-black text-white drop-shadow-sm">
            Contact Manta
          </h1>
          <p className="mt-1 text-xs text-white/90 drop-shadow-sm">
            We are here to help answer your questions and typically respond within 5 business days.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A71912]" />
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Intro Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-2">
          <p className="text-xs text-neutral-600 leading-relaxed">
            Manta is an online marketing agency dedicated to helping small and medium-sized businesses succeed online. Explore common questions below or send us a message.
          </p>
        </section>

        {/* Frequently Asked Questions */}
        <section aria-labelledby="contact-faq-heading" className="space-y-2.5">
          <h2
            id="contact-faq-heading"
            className="text-base font-extrabold text-[#171717]"
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[#C7C7C7]/50 shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-4 py-3 flex items-center justify-between text-left gap-2 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#171717]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A71912] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 pt-2 border-t border-neutral-100 text-xs text-neutral-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-1 flex items-center justify-between gap-2">
            <span className="text-[11px] text-neutral-500">
              Didn&apos;t see your question here?
            </span>
            <button
              type="button"
              onClick={() => navigate('/business-listings')}
              className="px-3 py-1.5 rounded-full bg-[#A71912]/10 hover:bg-[#A71912] text-[#A71912] hover:text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              View Business Listings FAQ
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Contact Form: Contact Manta To Get The Help You Need Today */}
        <section
          aria-labelledby="contact-form-heading"
          className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3.5"
        >
          <div>
            <h2
              id="contact-form-heading"
              className="text-base font-extrabold text-[#171717]"
            >
              Contact Manta To Get The Help You Need Today
            </h2>
            <p className="mt-0.5 text-xs text-neutral-500">
              For general inquiries, please fill out the form below.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Inquiry Sent
              </div>
              <p>
                Thank you, {form.firstName}! Your {form.inquiryType.toLowerCase()} has been received. We typically respond within 5 business days.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm(INITIAL_FORM);
                }}
                className="text-xs font-bold text-[#A71912] underline cursor-pointer"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              {error && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={form.inquiryType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Remove Profile">Remove Profile</option>
                  <option value="Cancellation Request">Cancellation Request</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    * First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    * Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Smith"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    * Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717] mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Manta Listing URL <span className="font-normal text-neutral-400">(Optional)</span>
                </label>
                <input
                  type="url"
                  name="listingUrl"
                  value={form.listingUrl}
                  onChange={handleChange}
                  placeholder="https://www.manta.com/c/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  * Message
                </label>
                <textarea
                  rows={3}
                  maxLength={500}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter comments here (500 character limit)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Send
              </motion.button>
            </form>
          )}
        </section>

        {/* General Inquiries */}
        <section className="bg-white rounded-2xl p-4 border border-[#C7C7C7]/50 shadow-sm space-y-3">
          <h2 className="text-sm font-extrabold text-[#171717] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#A71912]" />
            General Inquiries
          </h2>
          <div className="space-y-3 divide-y divide-neutral-100">
            {GENERAL_INQUIRIES.map((item, idx) => (
              <div key={item.q} className={idx > 0 ? 'pt-3' : ''}>
                <h3 className="text-xs font-bold text-[#171717]">{item.q}</h3>
                <p className="mt-1 text-[11px] text-neutral-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA: Contact Manta to Get Started Today! */}
        <section className="rounded-2xl bg-[#171717] text-white p-4 shadow-sm space-y-2.5">
          <h2 className="text-base font-extrabold">
            Contact Manta to Get Started Today!
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Start growing your online presence and building your online marketing strategies today with Manta.
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/digital-marketing')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </section>
      </div>
    </AnimatedPage>
  );
}
