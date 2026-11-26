import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, CheckCircle2, Mail, Lock } from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { BrandLogo } from '../assets/icons/BrandLogo';

const MEMBER_STORAGE_KEY = 'manta_member_session';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [forgotNotice, setForgotNotice] = useState(false);
  const [signedInMember, setSignedInMember] = useState(() => {
    try {
      const saved = localStorage.getItem(MEMBER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveSession = (member) => {
    try {
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(member));
    } catch {
      // Ignore storage errors
    }
    setSignedInMember(member);
    window.dispatchEvent(new Event('manta-member-updated'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setForgotNotice(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    saveSession({
      email: trimmedEmail,
      name: trimmedEmail.split('@')[0],
      provider: 'email',
      signedInAt: new Date().toISOString(),
    });
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem(MEMBER_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    setSignedInMember(null);
    setEmail('');
    setPassword('');
    window.dispatchEvent(new Event('manta-member-updated'));
  };

  return (
    <AnimatedPage>
      <div className="bg-[#171717] text-white px-5 py-6 border-b-4 border-[#A71912]">
        <h1 className="text-xl font-black">Sign In to Manta</h1>
        <p className="mt-1 text-xs text-neutral-300">
          Access your business listings, saved searches, and member tools.
        </p>
      </div>

      <div className="px-4 py-6">
        {signedInMember ? (
          <div className="bg-white rounded-2xl p-5 border border-[#C7C7C7]/60 shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#171717]">
                Signed In as {signedInMember.name}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">{signedInMember.email}</p>
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
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl border border-[#C7C7C7] text-xs font-bold text-[#171717] hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Sign Out
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

            {forgotNotice && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                {email.trim()
                  ? `Password reset instructions would be sent to ${email.trim()}.`
                  : 'Enter your email address above, then click Forgot your Password? again.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold text-[#171717] mb-1.5"
                >
                  <span className="text-[#A71912]">*</span> Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-email"
                    type="email"
                    name="username"
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
                  htmlFor="login-password"
                  className="block text-xs font-bold text-[#171717] mb-1.5"
                >
                  <span className="text-[#A71912]">*</span> Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setForgotNotice(true)}
                  className="text-xs font-semibold text-[#171717] hover:text-[#A71912] underline cursor-pointer"
                >
                  Forgot your Password?
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>
            </form>

            <div className="pt-3 border-t border-neutral-100 text-center">
              <p className="text-xs text-neutral-600">
                Not a Manta Member?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="font-bold text-[#A71912] hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
