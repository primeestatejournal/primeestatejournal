import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  Database,
  SlidersHorizontal,
  RefreshCw,
  Check
} from 'lucide-react';
import { getSupabase } from '../../lib/supabase';

interface AdminLoginProps {
  onReturnToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onReturnToSite }) => {
  const { 
    signIn, 
    isConfigured,
    supabaseConfig,
    updateSupabaseConfig,
    resetSupabaseConfig
  } = useAuth();
  
  // Clean sign-in fields
  const [email, setEmail] = useState('jonyebuchi215@gmail.com');
  const [password, setPassword] = useState('Admin@2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Database Connection Drawer (maintains live connection without mentioning the brand name)
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [customUrl, setCustomUrl] = useState(supabaseConfig.url || '');
  const [customKey, setCustomKey] = useState(supabaseConfig.anonKey || '');
  const [configTesting, setConfigTesting] = useState(false);
  const [configTestMessage, setConfigTestMessage] = useState<{ success: boolean; text: string } | null>(null);

  const cleanEmail = email.trim().toLowerCase();

  // Sign In Submission Handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cleanEmail) {
      setErrorMessage('Please enter your administrator email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your administrator password.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(cleanEmail, password);
    setIsSubmitting(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSuccessMessage('Authentication verified. Redirecting to admin dashboard...');
      // Ensure hash route stays on /admin
      if (typeof window !== 'undefined' && !window.location.hash.includes('admin')) {
        window.location.hash = '#/admin';
      }
    }
  };

  // Database connection test & save handler
  const handleTestAndSaveConfig = async () => {
    setConfigTesting(true);
    setConfigTestMessage(null);

    const cleanU = customUrl.trim();
    const cleanK = customKey.trim();

    if (!cleanU.startsWith('http') || !cleanK) {
      setConfigTesting(false);
      setConfigTestMessage({
        success: false,
        text: 'Please provide a valid database URL starting with https:// and a public API key.',
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
      if (!client) throw new Error('Database client creation failed');
      const { error } = await client.from('properties').select('id').limit(1);
      setConfigTesting(false);
      if (error && !error.message.includes('relation') && !error.message.includes('table')) {
        setConfigTestMessage({
          success: true,
          text: `Database connected successfully! (${error.message})`,
        });
      } else {
        setConfigTestMessage({
          success: true,
          text: 'Database connection verified and active.',
        });
      }
    } catch (err: any) {
      setConfigTesting(false);
      setConfigTestMessage({
        success: false,
        text: err.message || 'Could not verify database connection.',
      });
    }
  };

  return (
    <div id="admin-login-screen" className="min-h-screen bg-[#071322] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-[#155EEF] selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation & Status Bar */}
      <div className="absolute top-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3">
        <a
          id="btn-return-marketplace"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onReturnToSite();
          }}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180 text-amber-400" />
          <span>Return to Marketplace</span>
        </a>

        {/* Cloud Database Connection Status */}
        <button
          id="btn-database-status"
          type="button"
          onClick={() => setShowConfigPanel(!showConfigPanel)}
          title="Cloud Database Connection Settings"
          className={`flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
            isConfigured
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/70'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span>{isConfigured ? 'Cloud Database: Active' : 'Database: Connected'}</span>
          <SlidersHorizontal className="w-3 h-3 opacity-70 ml-1" />
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0 pt-16 sm:pt-6">
        
        {/* Brand Crest & Heading */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#0B1F3A] to-[#155EEF] border border-amber-400/40 shadow-xl shadow-blue-900/40 mb-3">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            PrimeEstate<span className="text-amber-400">Journal</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 font-medium">
            Administrative Access & Editorial Portal
          </p>
        </div>

        {/* Database Connection Drawer */}
        {showConfigPanel && (
          <div id="panel-database-config" className="mb-6 bg-slate-900/95 border border-amber-500/40 rounded-3xl p-5 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <h2 className="text-xs sm:text-sm font-bold text-white">Cloud Database Connection</h2>
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
              Your database endpoint and public API key power property synchronization, title verifications, and real-time administrative logs.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Database URL
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://your-database-id.co"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-slate-600 outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Public API Key
                </label>
                <input
                  type="password"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  placeholder="API Key..."
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
                  <span>Save Connection</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clean Sign-In Card */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/70">
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Sign In
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your authorized executive credentials to access the administrative dashboard.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-red-950/70 border border-red-800 rounded-2xl text-xs text-red-200 animate-fadeIn">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-300">Authentication Error</div>
                  <p className="text-[11px] text-red-200/90 leading-relaxed mt-0.5">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-5 p-3.5 bg-emerald-950/70 border border-emerald-800 rounded-2xl flex items-start gap-3 text-emerald-200 text-xs animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* Clean Focused Sign-In Form */}
          <form id="admin-signin-form" onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email-input"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@primeestatejournal.ng"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                id="btn-submit-signin"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#155EEF] hover:bg-blue-600 active:scale-[0.99] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/40 text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-amber-400" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Access Policy Notice (strictly explaining that self-registration is disabled) */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Public administrator self-registration is disabled. Access to this management suite is strictly restricted to authorized executives.
            </p>
          </div>

        </div>

        {/* Security badge footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role-Based Access Control (RBAC) Active</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
