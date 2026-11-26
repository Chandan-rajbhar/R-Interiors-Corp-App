import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  LogIn,
  UserPlus,
  LogOut,
  Pencil,
  Camera,
  Check,
  X,
  Trash2,
  Building2,
  Mail,
  Phone,
} from 'lucide-react';
import { AnimatedPage } from '../components/AnimatedPage';
import { MenuQuickAccess } from '../components/MenuQuickAccess';

const MEMBER_STORAGE_KEY = 'manta_member_session';

function readMember() {
  try {
    const raw = localStorage.getItem(MEMBER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [member, setMember] = useState(readMember);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: member?.name || '',
    businessName: member?.businessName || '',
    email: member?.email || '',
    phone: member?.phone || '',
    avatar: member?.avatar || '',
  });
  const [saveNotice, setSaveNotice] = useState('');

  const persistMember = (nextMember) => {
    try {
      localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(nextMember));
    } catch {
      // Ignore storage errors
    }
    setMember(nextMember);
    window.dispatchEvent(new Event('manta-member-updated'));
  };

  const startEditing = () => {
    setFormState({
      name: member?.name || '',
      businessName: member?.businessName || '',
      email: member?.email || '',
      phone: member?.phone || '',
      avatar: member?.avatar || '',
    });
    setSaveNotice('');
    setIsEditing(true);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormState((prev) => ({ ...prev, avatar: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...member,
      name: formState.name.trim() || member?.name || 'Member',
      businessName: formState.businessName.trim(),
      email: formState.email.trim() || member?.email || '',
      phone: formState.phone.trim(),
      avatar: formState.avatar,
      updatedAt: new Date().toISOString(),
    };
    persistMember(updated);
    setIsEditing(false);
    setSaveNotice('Profile updated.');
    setTimeout(() => setSaveNotice(''), 2500);
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem(MEMBER_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    setMember(null);
    setIsEditing(false);
    window.dispatchEvent(new Event('manta-member-updated'));
  };

  const memberInitial = member?.name?.trim()?.charAt(0)?.toUpperCase() || 'M';

  return (
    <AnimatedPage>
      <div className="px-4 py-5 space-y-6">
        {/* Profile Card */}
        {!member ? (
          <section className="bg-white rounded-2xl p-5 border border-[#C7C7C7]/60 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#A71912]/10 text-[#A71912] flex items-center justify-center shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#171717]">
                  Manta Member Account
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Sign in or sign up to customize your profile and upload a photo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/login')}
                className="py-3 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => navigate('/signup')}
                className="py-3 px-4 rounded-xl border border-[#C7C7C7] hover:bg-neutral-50 text-[#171717] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </div>
          </section>
        ) : isEditing ? (
          <section className="bg-white rounded-2xl p-5 border border-[#C7C7C7]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-[#171717]">Edit Profile</h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                aria-label="Cancel editing"
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex items-center gap-4 pt-1">
              <div className="relative w-18 h-18 rounded-2xl overflow-hidden bg-[#A71912] text-white flex items-center justify-center shrink-0 border border-neutral-200">
                {formState.avatar ? (
                  <img
                    src={formState.avatar}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black">{memberInitial}</span>
                )}
              </div>

              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Upload Photo
                  </button>
                  {formState.avatar && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, avatar: '' }))
                      }
                      className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-neutral-400">
                  JPG, PNG, or WebP from your device.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formState.businessName}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      businessName: e.target.value,
                    }))
                  }
                  placeholder="Optional"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="(555) 123-4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-[#C7C7C7]/70 text-xs text-[#171717] focus:outline-none focus:border-[#A71912] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#C7C7C7] text-xs font-bold text-[#171717] hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className="bg-white rounded-2xl p-5 border border-[#C7C7C7]/60 shadow-sm space-y-4">
            {saveNotice && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                {saveNotice}
              </div>
            )}

            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#A71912] text-white flex items-center justify-center shrink-0 border border-neutral-200 shadow-sm">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-black">{memberInitial}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-extrabold text-[#171717] truncate">
                  {member.name}
                </h2>
                {member.businessName && (
                  <p className="text-xs font-semibold text-[#A71912] flex items-center gap-1 mt-0.5 truncate">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    {member.businessName}
                  </p>
                )}
                <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {member.email}
                </p>
                {member.phone && (
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5 truncate">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    {member.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={startEditing}
                className="py-2.5 px-4 rounded-xl bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit Profile
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSignOut}
                className="py-2.5 px-4 rounded-xl border border-[#C7C7C7] hover:bg-neutral-50 text-[#A71912] text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </motion.button>
            </div>
          </section>
        )}

        {/* Menu & Quick Access Section below Profile */}
        <div className="pt-1">
          <div className="px-1 mb-3">
            <h2 className="text-base font-black text-[#171717]">
              Menu &amp; Quick Access
            </h2>
            <p className="text-xs text-neutral-500">
              Navigate all screens &amp; contact options
            </p>
          </div>
          <MenuQuickAccess />
        </div>
      </div>
    </AnimatedPage>
  );
}
