import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Bookmark, 
  ChevronDown, 
  Menu
} from 'lucide-react';
import { CurrencyCode, NavigationTab } from '../types';
import { NavigationMenuDrawer } from './NavigationMenuDrawer';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  savedCount: number;
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  savedCount,
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 shadow-xs">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Brand Name */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('marketplace')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#155EEF] to-blue-700 border border-[#D4A72C]/40 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#D4A72C]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                    primeestatejournal
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold hidden sm:flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
                  Realty & Due Diligence Platform
                </p>
              </div>
            </div>

            {/* Right Action Tools - Clean & Minimalist */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Currency Selector */}
              <div className="relative group">
                <div className="flex items-center gap-1 bg-slate-100 text-xs font-semibold text-slate-800 px-2.5 py-2 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-[#155EEF]" />
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>

                <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-xl py-1 hidden group-hover:block z-50">
                  {(['NGN', 'USD', 'GBP', 'EUR'] as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#155EEF] hover:text-white flex items-center justify-between cursor-pointer ${
                        currency === c ? 'text-[#155EEF] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{c}</span>
                      {c === 'NGN' && <span>₦</span>}
                      {c === 'USD' && <span>$</span>}
                      {c === 'GBP' && <span>£</span>}
                      {c === 'EUR' && <span>€</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Saved Properties Quick Bookmark */}
              <button
                onClick={() => setActiveTab('client_portal')}
                className="relative bg-slate-100 hover:bg-slate-200 p-2 sm:px-3 sm:py-2 rounded-xl text-slate-700 border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                title="Saved Properties"
              >
                <Bookmark className="w-4 h-4 text-[#155EEF]" />
                <span className="hidden sm:inline text-xs font-semibold">Saved</span>
                {savedCount > 0 && (
                  <span className="bg-[#D4A72C] text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full shadow-xs">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Main Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuDrawerOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm border border-slate-700 cursor-pointer active:scale-95"
                aria-label="Open Navigation Menu"
                title="Open Platform Menu & All Services"
              >
                <Menu className="w-4 h-4 text-amber-400" />
                <span className="font-bold tracking-wide">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Drawer Modal */}
      <NavigationMenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        savedCount={savedCount}
        onRequestVerification={onRequestVerification}
        onOpenAIConsultant={onOpenAIConsultant}
      />
    </>
  );
};
