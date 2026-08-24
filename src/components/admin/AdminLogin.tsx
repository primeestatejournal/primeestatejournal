import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, User, Eye, EyeOff, ArrowRight, Sparkles, Building2, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onReturnToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onReturnToSite }) => {
  const { signIn, signUp, loginAsDemoAdmin, isConfigured } = useAuth();
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both your email address and password.');
      return;
    }

    if (isSignUpMode && !fullName.trim()) {
      setErrorMessage('Please enter your full name for admin profile creation.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);

    if (isSignUpMode) {
      const res = await signUp(email, password, fullName);
      setIsSubmitting(false);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Admin account created successfully! You are now logged in.');
      }
    } else {
      const res = await signIn(email, password);
      setIsSubmitting(false);
      if (res.error) {
        setErrorMessage(res.error === 'Invalid login credentials' 
          ? 'Invalid email or password. Please verify your credentials.' 
          : res.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#071322] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#155EEF] selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Live Site Button */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onReturnToSite();
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180 text-amber-400" />
          <span>Return to Marketplace (/)</span>
        </a>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-slate-400">
          <span>URL:</span>
          <span className="text-amber-400 font-bold">/admin</span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Crest & Heading */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#155EEF] border border-amber-400/40 shadow-xl shadow-blue-900/30 mb-4">
            <Building2 className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PrimeEstate<span className="text-amber-400">Journal</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
            Executive Admin & Real Estate Content Management System
          </p>
        </div>

        {/* Auth Card Container */}
        <div className="mt-8 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          
          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSignUpMode(false);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                !isSignUpMode
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUpMode(true);
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                isSignUpMode
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register Admin
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-950/60 border border-red-800/80 rounded-2xl flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl flex items-start gap-3 text-emerald-200 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name field (Sign Up only) */}
            {isSignUpMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name & Designation
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Barr. Kemi Adeyemi"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@primeestatejournal.ng"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-slate-500">Min. 6 characters</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#155EEF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/40 text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <span>{isSignUpMode ? 'Complete Admin Registration' : 'Authenticate & Enter Dashboard'}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Sandbox Access for instant testing */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="w-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Demo Admin Access (Sandbox Mode)</span>
              </button>
              <p className="text-[11px] text-center text-slate-500">
                Connected to Supabase Auth. Enter real credentials or use the sandbox bypass for local UI verification.
              </p>
            </div>
          </div>

        </div>

        {/* Security badge footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role-Based Access Control (RBAC) & SSL Escrow Encryption</span>
        </div>
      </div>
    </div>
  );
};
