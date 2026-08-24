import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { ShieldAlert, Lock, Sparkles } from 'lucide-react';

interface AdminRouteGuardProps {
  children?: React.ReactNode;
  onReturnToSite?: () => void;
  requiredRole?: string;
  fallback?: React.ReactNode;
}

export const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({
  children,
  onReturnToSite = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '';
      window.history.pushState({ tab: 'marketplace' }, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  },
  requiredRole = 'admin',
  fallback,
}) => {
  const { user, session, profile, loading } = useAuth();

  // 1. Loading State: Verifying Supabase / Auth session
  if (loading) {
    return (
      <div className="min-h-screen bg-[#071322] flex flex-col items-center justify-center text-slate-100 font-sans p-6">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-slate-800 border-t-amber-400 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
        </div>
        
        <div className="text-center max-w-sm space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Admin Route Guard</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-wide">
            Verifying Admin Session...
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Securing access to executive real estate management, inventory controls, and editorial authoring desks.
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Redirect/render secure Admin Sign-in Form
  if (!user && !session) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return <AdminLogin onReturnToSite={onReturnToSite} />;
  }

  // 3. Unauthorized: User authenticated but lacks required administrative role
  if (requiredRole && profile && profile.role !== requiredRole && profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#071322] flex flex-col items-center justify-center p-6 text-center text-slate-100 font-sans">
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Unauthorized Access</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
          Your active session does not possess the required <strong className="text-amber-400 font-mono">({requiredRole})</strong> authorization to access this administrative portal.
        </p>
        <button
          onClick={onReturnToSite}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg cursor-pointer"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  // 4. Authorized Admin: Render protected Admin Dashboard
  return <>{children}</>;
};

export default AdminRouteGuard;
