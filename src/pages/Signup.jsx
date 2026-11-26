import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  UserPlus,
  CheckCircle2,
  User,
  Mail,
  Lock,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BrandLogo } from '../assets/icons/BrandLogo';

const MEMBER_STORAGE_KEY = 'manta_member_session';

export function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [createdMember, setCreatedMember] = useState(null);

  const saveMember = (member) => {
    try {
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(member));
    } catch {
      // Ignore storage errors
    }
    setCreatedMember(member);
    window.dispatchEvent(new Event('manta-member-updated'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedTerms) {
      setError('Please agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    saveMember({
      name: fullName.trim(),
      email: email.trim(),
      provider: 'email',
      signedInAt: new Date().toISOString(),
    });
  };

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">Create Your Account</h1>
        <p className="mt-1 text-xs text-neutral-300">
          Join to manage your business profile, claim listings, and request estimates.
        </p>
      </div>

      <div className="px-4 py-6">
        {createdMember ? (
          <div className="bg-white rounded-2xl p-5 border border-[#C7C7C7]/60 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#171717]">
                Welcome, {createdMember.name}!
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Your member account ({createdMember.email}) is ready.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="w-full py-3 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Go to Profile
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="w-full py-2.5 rounded-xl border border-[#C7C7C7] text-xs font-bold text-[#171717] hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 border border-[#C7C7C7]/60 shadow-sm space-y-4">
            <div className="flex justify-center pb-3 border-b border-neutral-100">
              <BrandLogo size="md" />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-xs font-bold text-[#171717] mb-1.5"
                >
                  <span className="text-[#A71912]">*</span> Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] placeholder:text-neutral-400 focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-bold text-[#171717] mb-1.5"
                >
                  <span className="text-[#A71912]">*</span> Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] placeholder:text-neutral-400 focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-xs font-bold text-[#171717] mb-1.5"
                >
                  <span className="text-[#A71912]">*</span> Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] placeholder:text-neutral-400 focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-bold text-[#171717] mb-1.5"
                >
                  <span className="text-[#A71912]">*</span> Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] placeholder:text-neutral-400 focus:outline-none focus:border-[#A71912] focus:bg-white"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-neutral-300 text-[#A71912] focus:ring-[#A71912]"
                />
                <span className="text-[11px] text-neutral-600 leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/directory/info/terms-privacy')}
                    className="font-semibold text-[#A71912] underline cursor-pointer"
                  >
                    Terms &amp; Conditions and Privacy Policy
                  </button>
                  .
                </span>
              </label>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </form>

            <div className="pt-3 border-t border-neutral-100 text-center">
              <p className="text-xs text-neutral-600">
                Already a Manta Member?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-bold text-[#A71912] hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
