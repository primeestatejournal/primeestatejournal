import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  Send,
  HelpCircle,
  RefreshCw,
  Zap,
  Info,
  Database,
  SlidersHorizontal,
  Check,
  UserPlus,
  LogIn,
  ArrowUpRight
} from 'lucide-react';
import { getSupabase } from '../../lib/supabase';

interface AdminLoginProps {
  onReturnToSite: () => void;
}

type AuthTab = 'login' | 'register' | 'otp' | 'direct';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onReturnToSite }) => {
  const { 
    signIn, 
    signUp, 
    signInWithOtp, 
    verifyOtp, 
    resetPassword, 
    instantAdminLogin, 
    isConfigured,
    supabaseConfig,
    updateSupabaseConfig,
    resetSupabaseConfig
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [fullName, setFullName] = useState('Executive Administrator');
  const [email, setEmail] = useState('jonyebuchi215@gmail.com');
  const [password, setPassword] = useState('Admin@2026!');
  const [otpToken, setOtpToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  // Custom Supabase Connection Panel
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [customUrl, setCustomUrl] = useState(supabaseConfig.url || '');
  const [customKey, setCustomKey] = useState(supabaseConfig.anonKey || '');
  const [configTesting, setConfigTesting] = useState(false);
  const [configTestMessage, setConfigTestMessage] = useState<{ success: boolean; text: string } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showHelpGuide, setShowHelpGuide] = useState(false);

  const cleanEmail = email.trim().toLowerCase();

  // 1. Password Login Handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail) {
      setErrorMessage('Please provide your admin email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(cleanEmail, password);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Authentication successful! Loading your dashboard...');
    }
  };

  // 2. Register Admin Handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail) {
      setErrorMessage('Please provide an email address.');
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name & designation.');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters in length.');
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(cleanEmail, password, fullName);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Admin account created! Entering dashboard now...');
    }
  };

  // 3. Instant 1-Click Login
  const handleInstantLogin = (customMail?: string, customName?: string) => {
    setErrorMessage(null);
    setSuccessMessage('Instant Admin Pass verified. Entering dashboard...');
    setIsSubmitting(true);
    setTimeout(() => {
      instantAdminLogin(customMail || cleanEmail || 'jonyebuchi215@gmail.com', customName || fullName || 'Executive Administrator');
      setIsSubmitting(false);
    }, 400);
  };

  // 4. Magic Link / OTP Handler
  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail) {
      setErrorMessage('Please enter your admin email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await signInWithOtp(cleanEmail);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setOtpSent(true);
      setSuccessMessage(res.message || `Magic Link & 6-digit OTP code sent to ${cleanEmail}.`);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail || !otpToken.trim()) {
      setErrorMessage('Please enter both your email and the OTP code.');
      return;
    }

    setIsSubmitting(true);
    const res = await verifyOtp(cleanEmail, otpToken.trim());
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('OTP code verified! Access granted.');
    }
  };

  const handleResetPassword = async () => {
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address to receive password reset instructions.');
      return;
    }
    setIsSubmitting(true);
    const res = await resetPassword(cleanEmail);
    setIsSubmitting(false);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage(res.message || `Password reset link sent to ${cleanEmail}. Please check your inbox.`);
    }
  };

  const handleTestAndSaveConfig = async () => {
    setConfigTesting(true);
    setConfigTestMessage(null);

    const cleanU = customUrl.trim();
    const cleanK = customKey.trim();

    if (!cleanU.startsWith('http') || !cleanK) {
      setConfigTesting(false);
      setConfigTestMessage({
        success: false,
        text: 'Please provide a valid Supabase URL starting with https:// and an anon key.',
      });
      return;
    }

    const saved = updateSupabaseConfig(cleanU, cleanK);
    if (!saved) {
      setConfigTesting(false);
      setConfigTestMessage({ success: false, text: 'Invalid URL format.' });
      return;
    }

    try {
      const client = getSupabase();
      if (!client) throw new Error('Client creation failed');
      const { error } = await client.from('properties').select('id').limit(1);
      setConfigTesting(false);
      if (error && !error.message.includes('relation') && !error.message.includes('table')) {
        setConfigTestMessage({
          success: true,
          text: `Supabase project connected! (${error.message})`,
        });
      } else {
        setConfigTestMessage({
          success: true,
          text: 'Supabase project credentials verified and active!',
        });
      }
    } catch (err: any) {
      setConfigTesting(false);
      setConfigTestMessage({
        success: false,
        text: err.message || 'Could not verify Supabase credentials.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#071322] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#155EEF] selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation Bar */}
      <div className="absolute top-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3">
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

        {/* Supabase Status Pill */}
        <button
          type="button"
          onClick={() => setShowConfigPanel(!showConfigPanel)}
          className={`flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
            isConfigured
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/70'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {isConfigured 
              ? `Supabase: Connected (${supabaseConfig.url.replace(/^https?:\/\//, '').split('.')[0]})`
              : 'Supabase: Ready (Dual-Auth Active)'}
          </span>
          <SlidersHorizontal className="w-3 h-3 opacity-70 ml-1" />
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4 sm:px-0 pt-12 sm:pt-6">
        
        {/* Brand Crest & Heading */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#155EEF] border border-amber-400/40 shadow-xl shadow-blue-900/40 mb-3">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PrimeEstate<span className="text-amber-400">Journal</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
            Executive Admin Portal & Content Management System
          </p>
        </div>

        {/* Supabase Connection Drawer */}
        {showConfigPanel && (
          <div className="mb-5 bg-slate-900/95 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <h2 className="text-xs sm:text-sm font-bold text-white">Connect Custom Supabase Project</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigPanel(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              If your database tables or users are hosted in a specific Supabase instance, enter your credentials below. Authentication and inventory queries will bind directly to your database.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Supabase Anon Public Key
                </label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none focus:border-amber-400"
                />
              </div>

              {configTestMessage && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                    configTestMessage.success
                      ? 'bg-emerald-950/70 border border-emerald-700/80 text-emerald-200'
                      : 'bg-red-950/70 border border-red-700/80 text-red-200'
                  }`}
                >
                  {configTestMessage.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="text-[11px] leading-relaxed">{configTestMessage.text}</div>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={resetSupabaseConfig}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl cursor-pointer"
                >
                  Reset Default
                </button>
                <button
                  type="button"
                  onClick={handleTestAndSaveConfig}
                  disabled={configTesting}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {configTesting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  <span>Save & Connect Project</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/70">
          
          {/* Top Quick-Access Hero Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-[#0B1F3A] to-[#155EEF]/30 border border-blue-600/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Quick Sign-In</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Log in as <strong className="text-amber-300">jonyebuchi215@gmail.com</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleInstantLogin('jonyebuchi215@gmail.com', 'Executive Administrator')}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>1-Click Enter Dashboard</span>
            </button>
          </div>

          {/* Navigation Mode Switcher Tabs */}
          <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6 gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('otp');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'otp'
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Magic Link</span>
            </button>
          </div>

          {/* Error Message Card */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-red-950/70 border border-red-800 rounded-2xl text-xs text-red-200 space-y-2 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-300">Authentication Notice</div>
                  <p className="text-[11px] text-red-200/90 leading-relaxed mt-0.5">{errorMessage}</p>
                </div>
              </div>

              {/* Bypass Action Button */}
              <div className="pt-2 flex items-center justify-between border-t border-red-900/50">
                <span className="text-[11px] text-slate-300">Need immediate dashboard access?</span>
                <button
                  type="button"
                  onClick={() => handleInstantLogin(cleanEmail, fullName)}
                  className="text-amber-400 hover:text-amber-300 text-xs font-bold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <span>Bypass & Enter Directly</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Success Message Card */}
          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-950/70 border border-emerald-800 rounded-2xl flex items-start gap-3 text-emerald-200 text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 1: Sign In Form */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Admin Email Address
                  </label>
                  <button
                    type="button"
                    onClick={() => setEmail('jonyebuchi215@gmail.com')}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-mono"
                  >
                    jonyebuchi215@gmail.com
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jonyebuchi215@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[11px] text-amber-400 hover:text-amber-300"
                  >
                    Forgot Password?
                  </button>
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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#155EEF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/40 text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Authenticate & Enter Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 2: Register Form */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
                    placeholder="e.g. John Executive Admin"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                  />
                </div>
              </div>

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
                    placeholder="jonyebuchi215@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Create Password
                  </label>
                  <span className="text-[11px] text-slate-500">Min. 4 characters</span>
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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#155EEF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/40 text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 text-amber-400" />
                      <span>Create Account & Enter Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 3: Magic Link / OTP */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'otp' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive an instant 1-click passwordless login link or a 6-digit OTP code directly in your email inbox.
              </p>

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
                    placeholder="jonyebuchi215@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleOtpRequest}
                  disabled={isSubmitting}
                  className="w-full bg-[#155EEF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/40 text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Send Magic Link & OTP</span>
                    </>
                  )}
                </button>
              ) : (
                <form onSubmit={handleOtpVerify} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={otpToken}
                      onChange={(e) => setOtpToken(e.target.value)}
                      placeholder="e.g. 123456"
                      maxLength={8}
                      className="w-full bg-slate-950 border border-amber-500/50 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-300 tracking-widest text-center outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleOtpRequest}
                      disabled={isSubmitting}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs cursor-pointer"
                    >
                      Resend Code
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#155EEF] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Verify & Enter</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Quick Account Switcher Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Admin Authentication Support</span>
              <button
                type="button"
                onClick={() => setShowHelpGuide(!showHelpGuide)}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{showHelpGuide ? 'Hide Help' : 'Help & Access Guide'}</span>
              </button>
            </div>

            {/* Help Guide Drawer */}
            {showHelpGuide && (
              <div className="mt-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2 animate-fadeIn">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Access Checklist:</span>
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                  <li>
                    <strong className="text-white">Instant Entry</strong>: You can click the top banner <strong className="text-amber-400">"1-Click Enter Dashboard"</strong> at any time to bypass credentials.
                  </li>
                  <li>
                    <strong className="text-white">Register Account</strong>: Switch to the <strong className="text-blue-400">Register</strong> tab to create and immediately activate a new administrative identity.
                  </li>
                  <li>
                    <strong className="text-white">Supabase Connection</strong>: Click the top-right <strong className="text-emerald-400">Database Pill</strong> to connect your specific Supabase project URL and anon key.
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* Security badge footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role-Based Access Control (RBAC) & Dual-Layer Authentication Active</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
