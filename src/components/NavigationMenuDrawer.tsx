import React, { useEffect } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  Globe, 
  Calculator, 
  KeyRound, 
  FileText, 
  Award, 
  HelpCircle, 
  Bookmark, 
  Sparkles, 
  ChevronRight, 
  Phone, 
  User, 
  Compass, 
  Lock,
  ArrowRight,
  BadgeCheck
} from 'lucide-react';
import { CurrencyCode, NavigationTab } from '../types';

interface NavigationMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  savedCount: number;
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const NavigationMenuDrawer: React.FC<NavigationMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  savedCount,
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  const navCategories = [
    {
      title: 'Properties & Due Diligence',
      items: [
        {
          id: 'marketplace' as NavigationTab,
          label: 'Marketplace',
          description: 'Browse 100% verified estates, lands & residences',
          icon: Building2,
          badge: 'Verified Clean',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        },
        {
          id: 'verification_hub' as NavigationTab,
          label: 'Verification Hub',
          description: 'Legal title searches, surveyor charting & title audit',
          icon: ShieldCheck,
          badge: 'Title Registry',
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
        },
        {
          id: 'diaspora_gateway' as NavigationTab,
          label: 'Diaspora Gateway',
          description: 'Direct cross-border acquisition, FX flows & escrow',
          icon: Globe,
          badge: 'UK/US Escrow',
          badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
        },
        {
          id: 'property_mgmt' as NavigationTab,
          label: 'Remote Management',
          description: 'Tenancy oversight, live inspections & rental yields',
          icon: KeyRound,
        },
      ],
    },
    {
      title: 'Intelligence & Legal Guides',
      items: [
        {
          id: 'blog' as NavigationTab,
          label: 'Editorial Journal',
          description: 'Market insights, title reforms & investment analysis',
          icon: Award,
          badge: 'Insights',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        },
        {
          id: 'investment_calc' as NavigationTab,
          label: 'ROI & Yield Calculator',
          description: 'Mortgage amortization, rental yield & appreciation model',
          icon: Calculator,
        },
        {
          id: 'title_guide' as NavigationTab,
          label: 'Land Title Guide',
          description: 'C of O, Governor\'s Consent, Gazette & AGIS explained',
          icon: FileText,
        },
        {
          id: 'developer_kyc' as NavigationTab,
          label: 'Developer Accreditation',
          description: 'CAC verification, delivery track records & solvency',
          icon: BadgeCheck,
        },
      ],
    },
    {
      title: 'Client Services & Support',
      items: [
        {
          id: 'client_portal' as NavigationTab,
          label: 'Client Portal & Saved Properties',
          description: 'Track saved listings, search history & legal dossiers',
          icon: Bookmark,
          counter: savedCount,
        },
        {
          id: 'help_faq' as NavigationTab,
          label: 'Help Center & Diaspora FAQ',
          description: 'Wire instructions, step-by-step diaspora guidebook',
          icon: HelpCircle,
        },
        {
          id: 'terms_privacy' as NavigationTab,
          label: 'Legal Terms & Safeguards',
          description: 'Independent legal disclaimer & escrow protocols',
          icon: Lock,
        },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform ease-out duration-300 animate-slide-left border-l border-slate-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#155EEF] to-blue-700 border border-[#D4A72C]/40 flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5 text-[#D4A72C]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-tight text-slate-900">
                    primeestatejournal
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Navigation & Services
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions Bar */}
          <div className="px-5 py-3 bg-gradient-to-r from-blue-50/60 to-slate-50 border-b border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAIConsultant();
              }}
              className="flex-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
              <span>Ask AI Advisor</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onRequestVerification();
              }}
              className="flex-1 bg-[#155EEF] hover:bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Property</span>
            </button>
          </div>

          {/* Drawer Navigation List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            {navCategories.map((category, catIdx) => (
              <div key={catIdx} className="space-y-2">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                  {category.title}
                </h3>
                
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'bg-blue-50/80 border border-blue-200 text-[#155EEF]'
                            : 'hover:bg-slate-50 border border-transparent text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isActive 
                              ? 'bg-[#155EEF] text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-900'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold truncate ${
                                isActive ? 'text-[#155EEF]' : 'text-slate-900'
                              }`}>
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                                  {item.badge}
                                </span>
                              )}
                              {item.counter !== undefined && item.counter > 0 && (
                                <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-[#D4A72C] text-slate-950 rounded-full">
                                  {item.counter}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-[#155EEF] translate-x-0.5' : 'text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Currency Selector inside Drawer */}
            <div className="pt-2 border-t border-slate-100">
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Globe className="w-3.5 h-3.5 text-[#155EEF]" />
                    <span>Display Currency</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500">Live FX Conversion</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {(['NGN', 'USD', 'GBP', 'EUR'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        currency === c
                          ? 'bg-[#155EEF] text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer: Diaspora Liaison Hotline */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/80">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#155EEF]" />
                <span className="font-semibold text-slate-800">Diaspora Liaison Desk</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                Live Support
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Hotline 1: <strong className="text-slate-800">09039215553</strong></span>
              <span>Hotline 2: <strong className="text-slate-800">09033142485</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
