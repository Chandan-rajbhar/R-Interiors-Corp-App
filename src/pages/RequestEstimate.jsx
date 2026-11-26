import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Send,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { BUSINESS_INFO } from '../data/businessData';
import { SERVICES_DATA } from '../data/servicesData';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  service: SERVICES_DATA[0].title,
  projectAddress: '',
  description: '',
  preferredContact: 'Phone',
};

export function RequestEstimate() {
  const location = useLocation();
  const preselectedService = location.state?.selectedService;

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    service: preselectedService || INITIAL_FORM.service,
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | no-backend | error
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const digits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (digits.length < 10) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!form.projectAddress.trim()) {
      nextErrors.projectAddress = 'Project address is required.';
    }
    if (!form.description.trim() || form.description.trim().length < 10) {
      nextErrors.description = 'Please describe your project (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => f.type.startsWith('image/')).slice(0, 5 - images.length);
    const previews = validFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...previews]);
    e.target.value = '';
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `Estimate Request: ${form.service} - ${form.fullName}`
    );
    const body = encodeURIComponent(
      [
        `Full Name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Service Required: ${form.service}`,
        `Project Address: ${form.projectAddress}`,
        `Preferred Contact Method: ${form.preferredContact}`,
        `Attached Photos Selected: ${images.length > 0 ? images.map((i) => i.name).join(', ') : 'None'}`,
        '',
        'Project Description:',
        form.description,
      ].join('\n')
    );
    return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint = import.meta.env.VITE_ESTIMATE_ENDPOINT;
    setStatus('submitting');
    setStatusMessage('');

    if (!endpoint) {
      // Do not show a false success message when no backend/email service is configured.
      setStatus('no-backend');
      setStatusMessage(
        'Your inquiry details are validated and ready. Because no automated backend server is connected, please send your request directly via your email app or call us.'
      );
      return;
    }

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, val]) => payload.append(key, val));
      images.forEach((img) => payload.append('images', img.file));

      const response = await fetch(endpoint, {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      setStatus('success');
      setStatusMessage(
        'Your estimate request has been sent to R Interiors Corp. We will follow up via your preferred contact method.'
      );
    } catch (err) {
      setStatus('error');
      setStatusMessage(
        err.message ||
          'We could not reach the submission service. Please use the direct email or call options below.'
      );
    }
  };

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-5 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">Request a Free Estimate</h1>
        <p className="mt-1 text-xs text-neutral-300">
          Share your stucco or drywall project details with {BUSINESS_INFO.name}.
        </p>
      </div>

      <div className="px-4 py-5">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 border border-[#C7C7C7]/50 shadow-sm text-center space-y-3"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-extrabold text-[#171717]">Request Sent</h2>
            <p className="text-xs text-neutral-600 leading-relaxed">{statusMessage}</p>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_FORM);
                setImages([]);
                setStatus('idle');
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#A71912] text-white text-xs font-bold cursor-pointer"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-bold text-[#171717] mb-1">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C7C7C7] text-sm text-[#171717] focus:outline-none focus:border-[#A71912]"
              />
              {errors.fullName && (
                <p className="mt-1 text-[11px] font-medium text-[#A71912]">{errors.fullName}</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 gap-3.5">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-[#171717] mb-1">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C7C7C7] text-sm text-[#171717] focus:outline-none focus:border-[#A71912]"
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] font-medium text-[#A71912]">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-[#171717] mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(954) 555-0199"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C7C7C7] text-sm text-[#171717] focus:outline-none focus:border-[#A71912]"
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] font-medium text-[#A71912]">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Service Required */}
            <div>
              <label htmlFor="service" className="block text-xs font-bold text-[#171717] mb-1">
                Service Required *
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C7C7C7] text-sm text-[#171717] focus:outline-none focus:border-[#A71912]"
              >
                {SERVICES_DATA.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Stucco Finishing & Drywall Installation">
                  Both Stucco Finishing & Drywall Installation
                </option>
              </select>
            </div>

            {/* Project Address */}
            <div>
              <label htmlFor="projectAddress" className="block text-xs font-bold text-[#171717] mb-1">
                Project Address *
              </label>
              <input
                id="projectAddress"
                name="projectAddress"
                type="text"
                value={form.projectAddress}
                onChange={handleChange}
                placeholder="Street address, City, FL"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C7C7C7] text-sm text-[#171717] focus:outline-none focus:border-[#A71912]"
              />
              {errors.projectAddress && (
                <p className="mt-1 text-[11px] font-medium text-[#A71912]">
                  {errors.projectAddress}
                </p>
              )}
            </div>

            {/* Preferred Contact Method */}
            <div>
              <span className="block text-xs font-bold text-[#171717] mb-1.5">
                Preferred Contact Method
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {['Phone', 'Email'].map((method) => {
                  const active = form.preferredContact === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, preferredContact: method }))}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#A71912] text-white border-[#A71912]'
                          : 'bg-white text-[#171717] border-[#C7C7C7]'
                      }`}
                    >
                      {method}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-bold text-[#171717] mb-1">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the scope, rooms or exterior areas, and timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C7C7C7] text-sm text-[#171717] focus:outline-none focus:border-[#A71912] resize-none"
              />
              {errors.description && (
                <p className="mt-1 text-[11px] font-medium text-[#A71912]">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Upload Project Images */}
            <div>
              <span className="block text-xs font-bold text-[#171717] mb-1.5">
                Upload Project Images (Optional, up to 5)
              </span>
              <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-[#C7C7C7] bg-white hover:border-[#A71912] transition-colors cursor-pointer text-xs font-semibold text-neutral-600">
                <Upload className="w-4 h-4 text-[#A71912]" />
                Choose Photos from Device
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-2.5 grid grid-cols-3 gap-2">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#C7C7C7]/60 bg-neutral-100"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        aria-label={`Remove ${img.name}`}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Honest Status / Error / Mailto Fallback */}
            {(status === 'no-backend' || status === 'error') && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 leading-relaxed">{statusMessage}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={buildMailtoHref()}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#A71912] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send via Email App ({BUSINESS_INFO.email})
                  </a>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#171717] text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call {BUSINESS_INFO.phone}
                  </a>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] disabled:opacity-70 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <LoadingSpinner size="sm" label="Submitting request" />
                  Preparing Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Request
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </AnimatedPage>
  );
}
