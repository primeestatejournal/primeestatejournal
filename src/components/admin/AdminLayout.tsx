import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboardView } from '../../types';
import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Database, 
  Sparkles,
  ChevronRight,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Globe
} from 'lucide-react';

interface AdminLayoutProps {
  currentView: AdminDashboardView;
  onViewChange: (view: AdminDashboardView) => void;
  onReturnToSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentView,
  onViewChange,
  onReturnToSite,
  children,
}) => {
  const { user, profile, signOut, isConfigured } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyAdminUrl = () => {
    try {
      const url = `${window.location.origin}/admin`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const navItems: { id: AdminDashboardView; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties Management', icon: Building2 },
    { id: 'blog', label: 'Blog Posts (WYSIWYG)', icon: FileText },
    { id: 'profile', label: 'Admin Profile & Security', icon: User },
    { id: 'database', label: 'Database SQL Desk', icon: Database, badge: 'Supabase' },
  ];

  const adminName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Chief Admin';
  const adminEmail = user?.email || profile?.email || 'admin@primeestatejournal.ng';

  return (
    <div className="min-h-screen bg-[#071322] text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-[#155EEF] selection:text-white">
      
      {/* ---------------------------------------------------- */}
      {/* Mobile Top App Bar */}
      {/* ---------------------------------------------------- */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B1F3A] to-[#155EEF] border border-amber-400/40 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <span className="font-bold text-sm text-white">PrimeEstate Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onReturnToSite();
            }}
            className="text-xs bg-slate-800 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Live Site (/)</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>
          <button
            onClick={() => signOut()}
            title="Sign Out"
            className="p-1.5 rounded-lg bg-red-950/60 text-red-400 border border-red-800/60"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* Desktop / Collapsible Sidebar */}
      {/* ---------------------------------------------------- */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0B1728] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#155EEF] border border-amber-400/40 flex items-center justify-center shadow-md shadow-blue-900/30">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                  <span>PrimeEstate</span>
                  <span className="text-amber-400">Journal</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Admin Executive Portal
                </p>
              </div>
            </div>
          </div>

          {/* Database Indicator Pill */}
          <div className="px-5 pt-4">
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
              isConfigured 
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' 
                : 'bg-amber-950/30 border-amber-800/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5" />
                <span className="font-semibold text-[11px]">
                  {isConfigured ? 'Supabase Connected' : 'Sandbox Storage'}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40">
                v2.11
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Management Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all
                    ${isActive 
                      ? 'bg-[#155EEF] text-white shadow-md shadow-blue-900/40' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card & Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          {/* Return to Live Marketplace */}
          <button
            onClick={onReturnToSite}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>View Public Marketplace</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* User Profile Info & Logout */}
          <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#155EEF] to-blue-700 border border-amber-400/40 flex items-center justify-center font-bold text-xs text-white shrink-0">
                {adminName.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{adminName}</p>
                <p className="text-[11px] text-slate-400 truncate">{adminEmail}</p>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              title="Logout from Admin Dashboard"
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/70 text-slate-400 hover:text-red-300 hover:border-red-800/60 border border-slate-700/60 transition-all shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* Main Content Area */}
      {/* ---------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Desktop Top Header Bar */}
        <header className="hidden lg:flex bg-[#0B1728] border-b border-slate-800/80 px-8 py-4 items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Administration /</span>
              <span className="text-xs font-bold text-amber-400 capitalize">
                {navItems.find((n) => n.id === currentView)?.label || currentView}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Dedicated Admin URL Badge */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-inner">
              <span className="text-[11px] font-medium text-slate-400">Admin Path:</span>
              <span className="text-[11px] font-mono font-bold text-amber-400">/admin</span>
              <button
                onClick={handleCopyAdminUrl}
                title="Copy Direct Admin URL"
                className="ml-1 text-[10px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600/60 px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold transition-all cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-amber-400" />}
                <span>{copiedUrl ? 'Copied!' : 'Copy Direct URL'}</span>
              </button>
            </div>

            {/* View Live Website Button */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onReturnToSite();
              }}
              className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Website (/)</span>
            </a>

            <div className="h-4 w-px bg-slate-800" />

            {/* Admin Badge */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-white">{adminName}</p>
                <p className="text-[10px] text-slate-400 font-mono">{adminEmail}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#155EEF] to-blue-700 border border-amber-400/40 flex items-center justify-center font-bold text-xs text-white shadow-sm">
                {adminName.substring(0, 2).toUpperCase()}
              </div>
              <button
                onClick={() => signOut()}
                className="text-xs text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 px-3 py-2 rounded-xl transition-all font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#071322]">
          {children}
        </main>
      </div>
    </div>
  );
};
