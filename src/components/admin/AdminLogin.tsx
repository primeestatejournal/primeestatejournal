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
  Check
} from 'lucide-react';
import { getSupabase } from '../../lib/supabase';

interface AdminLoginProps {
  onReturnToSite: () => void;
}

type AuthTab = 'password' | 'otp' | 'register' | 'reset';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onReturnToSite }) => {
  const { 
    signIn, 
    signUp, 
    signInWithOtp, 
    verifyOtp, 
    resetPassword, 
    resendConfirmationEmail, 
    loginAsDemoAdmin, 
    isConfigured,
    supabaseConfig,
    updateSupabaseConfig,
    resetSupabaseConfig
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<AuthTab>('password');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('jonyebuchi215@gmail.com');
  const [password, setPassword] = useState('');
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
  const [isResending, setIsResending] = useState(false);
  const [showHelpGuide, setShowHelpGuide] = useState(false);

  const cleanEmail = email.trim().toLowerCase();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail || !password) {
      setErrorMessage('Please provide both your email address and password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(cleanEmail, password);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail || !password) {
      setErrorMessage('Please provide your email address and password.');
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name & designation.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(cleanEmail, password, fullName);
    setIsSubmitting(false);

    if (res.error) {
      if (res.error.toLowerCase().includes('already registered')) {
        setErrorMessage('This email is already registered in Supabase. Please switch to the Password or Magic Link tab to sign in.');
      } else {
        setErrorMessage(res.error);
      }
    } else if (res.needsEmailConfirmation) {
      setSuccessMessage('Admin account created! Supabase has sent a confirmation link to your email. Click the link to activate, or confirm the user in your Supabase Auth dashboard.');
    } else {
      setSuccessMessage('Admin account created and authenticated successfully!');
    }
  };

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
      setSuccessMessage(res.message || `Magic Link & 6-digit OTP code sent to ${cleanEmail}. Check your inbox!`);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail || !otpToken.trim()) {
      setErrorMessage('Please enter both your email address and the 6-digit OTP code from your email.');
      return;
    }

    setIsSubmitting(true);
    const res = await verifyOtp(cleanEmail, otpToken.trim());
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('OTP verified successfully! Access granted.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

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

  const handleResendConfirmation = async () => {
    if (!cleanEmail) {
      setErrorMessage('Please enter your email address first.');
      return;
    }
    setIsResending(true);
    const res = await resendConfirmationEmail(cleanEmail);
    setIsResending(false);
    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage(res.message || `Confirmation email resent to ${cleanEmail}.`);
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
        text: 'Please provide a valid Supabase URL starting with https:// and an anon public key.',
      });
      return;
    }

    const saved = updateSupabaseConfig(cleanU, cleanK);
    if (!saved) {
      setConfigTesting(false);
      setConfigTestMessage({ success: false, text: 'Invalid URL format.' });
      return;
    }

    // Try a test query
    try {
      const client = getSupabase();
      if (!client) {
        throw new Error('Client creation failed');
      }
      const { error } = await client.from('properties').select('id').limit(1);
      setConfigTesting(false);
      if (error && !error.message.includes('relation') && !error.message.includes('table')) {
        setConfigTestMessage({
          success: true,
          text: `Supabase project connected! (Notice: ${error.message})`,
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

  const isEmailNotConfirmed = errorMessage && (
    errorMessage.toLowerCase().includes('email not confirmed') ||
    errorMessage.toLowerCase().includes('not confirmed') ||
    errorMessage.toLowerCase().includes('email link is invalid')
  );

  const isInvalidCredentials = errorMessage && (
    errorMessage.toLowerCase().includes('invalid login credentials') ||
    errorMessage.toLowerCase().includes('invalid credentials')
  );

  return (
    <div className="min-h-screen bg-[#071322] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#155EEF] selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Navigation */}
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

        {/* Supabase Connection Status Pill */}
        <button
          type="button"
          onClick={() => setShowConfigPanel(!showConfigPanel)}
          className={`flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all ${
            isConfigured
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60'
              : 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>
            {isConfigured 
              ? `Supabase: Connected (${supabaseConfig.url ? supabaseConfig.url.replace(/^https?:\/\//, '').split('.')[0] : 'Active'})`
              : 'Supabase: Offline / Needs Project Credentials'}
          </span>
          <SlidersHorizontal className="w-3 h-3 opacity-70 ml-1" />
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 px-4 sm:px-0 pt-12 sm:pt-4">
        {/* Brand Crest & Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#155EEF] border border-amber-400/40 shadow-xl shadow-blue-900/30 mb-3 sm:mb-4">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PrimeEstate<span className="text-amber-400">Journal</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
            Executive Admin & Content Management Gateway
          </p>
        </div>

        {/* Supabase Custom Connection Modal/Drawer (Expandable) */}
        {showConfigPanel && (
          <div className="mb-5 bg-slate-900/95 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white">Connect Your Supabase Project</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigPanel(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              If your admin account is registered in a custom Supabase project, enter your project credentials below to connect live authentication and database tables.
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
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl"
                >
                  Reset to Default
                </button>
                <button
                  type="button"
                  onClick={handleTestAndSaveConfig}
                  disabled={configTesting}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
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

        {/* Auth Card Container */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          
          {/* Quick Account Pill Helper */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Account:</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('jonyebuchi215@gmail.com');
                setErrorMessage(null);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/70 border border-blue-600/40 text-blue-300 text-[11px] font-mono hover:bg-blue-900/70 transition-all cursor-pointer"
              title="Click to fill this email"
            >
              <span>jonyebuchi215@gmail.com</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6 gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('password');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'password'
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('otp');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'otp'
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Magic Link / OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'register'
                  ? 'bg-[#155EEF] text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error Banner with Interactive Fixes */}
          {errorMessage && (
            <div className="mb-5 space-y-2 animate-fadeIn">
              <div className="p-3.5 bg-red-950/70 border border-red-800/80 rounded-2xl flex items-start gap-3 text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-300">
                    {isInvalidCredentials ? 'Invalid Email or Password' : 'Authentication Notice'}
                  </div>
                  <p className="mt-0.5 text-[11px] text-red-200/90 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              </div>

              {/* Special Fix 1: Email Not Confirmed in Supabase */}
              {isEmailNotConfirmed && (
                <div className="p-3.5 bg-amber-950/40 border border-amber-500/40 rounded-2xl space-y-2 text-xs text-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Email Confirmation Required</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={isResending}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 transition-all"
                    >
                      {isResending ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                      <span>Resend Link</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    In your <strong>Supabase Dashboard &gt; Authentication &gt; Users</strong>, you can also click <strong className="text-emerald-400">"Confirm User"</strong> on your email to immediately enable password sign-in.
                  </p>
                </div>
              )}

              {/* Special Fix 2: Invalid Credentials / Try Magic Link or Reset */}
              {isInvalidCredentials && (
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 text-[11px]">Cannot remember password?</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('otp');
                        setErrorMessage(null);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold underline underline-offset-2"
                    >
                      Sign In with Magic Link
                    </button>
                    <span className="text-slate-600">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('reset');
                        setErrorMessage(null);
                      }}
                      className="text-amber-400 hover:text-amber-300 text-xs font-semibold underline underline-offset-2"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-950/70 border border-emerald-800/80 rounded-2xl flex items-start gap-3 text-emerald-200 text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 1: Standard Password Sign In */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
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
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('reset');
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
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
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
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
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Authenticate & Enter Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 2: Magic Link / Email OTP Sign In */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'otp' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive an instant 1-click login link or a 6-digit OTP code directly in your email inbox. No password needed!
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
                      <span>Send Magic Link & OTP Code</span>
                    </>
                  )}
                </button>
              ) : (
                <form onSubmit={handleOtpVerify} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                      Enter 6-Digit OTP Code from Email
                    </label>
                    <input
                      type="text"
                      required
                      value={otpToken}
                      onChange={(e) => setOtpToken(e.target.value)}
                      placeholder="e.g. 123456"
                      maxLength={8}
                      className="w-full bg-slate-950 border border-amber-500/50 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-300 tracking-widest text-center placeholder-slate-600 outline-none"
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

          {/* ---------------------------------------------------------------- */}
          {/* TAB 3: Register Admin */}
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
                    placeholder="e.g. Chief Executive Admin"
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
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      <span>Complete Admin Registration</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* TAB 4: Reset Password */}
          {/* ---------------------------------------------------------------- */}
          {activeTab === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your email address to receive password recovery instructions and a secure reset link.
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

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('password')}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Back to Sign In
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Quick Sandbox Access for instant testing */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="w-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 text-slate-200 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Demo Admin Access (Sandbox Mode)</span>
              </button>
              
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Troubleshooting Supabase authentication?</span>
                <button
                  type="button"
                  onClick={() => setShowHelpGuide(!showHelpGuide)}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{showHelpGuide ? 'Hide Guide' : 'Quick Checklist'}</span>
                </button>
              </div>

              {/* Troubleshooting Guide Drawer */}
              {showHelpGuide && (
                <div className="mt-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2.5 animate-fadeIn">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    <span>Supabase Admin Login Quick Checklist:</span>
                  </div>
                  <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-400">
                    <li>
                      <strong className="text-slate-200">Connect Project</strong>: Click the <strong className="text-amber-300">Supabase Connection Pill</strong> in the top right to paste your project URL and public Anon key.
                    </li>
                    <li>
                      <strong className="text-slate-200">Email Confirmation</strong>: In your Supabase Dashboard &gt; Authentication &gt; Users, if your email has not been confirmed, click the user and choose <strong className="text-emerald-400">"Confirm User"</strong>.
                    </li>
                    <li>
                      <strong className="text-slate-200">Passwordless Option</strong>: Switch to the <strong className="text-blue-400">"Magic Link / OTP"</strong> tab to log in immediately via email without entering a password.
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Security badge footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role-Based Access Control (RBAC) & Supabase PostgreSQL Auth</span>
        </div>
      </div>
    </div>
  );
};
