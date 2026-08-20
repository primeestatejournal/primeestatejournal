import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, ShieldCheck, KeyRound, Check, AlertCircle, Sparkles, Building2, Lock } from 'lucide-react';

export const AdminProfileSettings: React.FC = () => {
  const { user, profile, updateProfile, isConfigured } = useAuth();

  const [fullName, setFullName] = useState(
    profile?.full_name || user?.user_metadata?.full_name || ''
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }

    setIsSaving(true);
    const res = await updateProfile(fullName.trim());
    setIsSaving(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Admin profile updated successfully in public.profiles table!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#0B1728] p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-amber-400" />
            <span>Admin Executive Profile & Credentials</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Linked to Supabase <span className="font-mono text-amber-400 text-[11px]">auth.users</span> and <span className="font-mono text-amber-400 text-[11px]">public.profiles</span> table.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Role: {profile?.role || 'admin'}</span>
          </span>
        </div>
      </div>

      {/* Messages */}
      {errorMessage && (
        <div className="p-4 bg-red-950/60 border border-red-800 rounded-2xl flex items-center gap-3 text-red-200 text-xs">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-200 text-xs">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Profile Form Card */}
      <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Profile Information</span>
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Executive Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-[#155EEF] outline-none"
                />
              </div>
            </div>

            {/* Email Address (read-only for security) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Primary Account Email (Auth.users ID)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || profile?.email || 'admin@primeestatejournal.ng'}
                  className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-400 outline-none cursor-not-allowed font-mono"
                />
              </div>
            </div>

          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#155EEF] hover:bg-blue-600 active:scale-95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Update Profile Data</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Security & Database Status Card */}
      <div className="bg-[#0B1728] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-emerald-400" />
          <span>Security & Database Credentials</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-semibold">User UUID:</span>
            <p className="font-mono text-slate-300 text-[11px] break-all">{user?.id || 'demo-admin-uuid-001'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-semibold">Role-Based Access Level:</span>
            <p className="font-semibold text-emerald-400">{profile?.role || 'admin'} (Read / Write / Delete)</p>
          </div>
        </div>
      </div>

    </div>
  );
};
