import React from 'react';
import { ShieldCheck, Globe, Building2, Calculator, KeyRound, Search, Bookmark, Compass, Sparkles, ChevronDown, User, FileText, Award, HelpCircle } from 'lucide-react';
import { CurrencyCode, NavigationTab } from '../types';

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
  return (
    <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-[#155EEF] px-4 py-1.5 text-xs font-medium text-white flex flex-wrap items-center justify-between gap-2">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#D4A72C] text-slate-950 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
              Diaspora Safe
            </span>
            <span>Independent Legal Title Search & Escrow Protection across Lagos, Abuja & Rivers State.</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <span>Lagos Liaison: +234 1 800 9000</span>
            <span className="text-blue-200">|</span>
            <span>London Desk: +44 20 7946 0912</span>
          </div>
        </div>
      </div>

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
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  primeestatejournal
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified
                </span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
                Realty & Due Diligence Platform
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Marketplace
            </button>

            <button
              onClick={() => setActiveTab('verification_hub')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'verification_hub'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4A72C]" />
              Verification Hub
            </button>

            <button
              onClick={() => setActiveTab('diaspora_gateway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'diaspora_gateway'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Diaspora Gateway
            </button>

            <button
              onClick={() => setActiveTab('investment_calc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'investment_calc'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              ROI Calculator
            </button>

            <button
              onClick={() => setActiveTab('property_mgmt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'property_mgmt'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Management
            </button>

            <button
              onClick={() => setActiveTab('title_guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'title_guide'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              Title Guide
            </button>

            <button
              onClick={() => setActiveTab('help_faq')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'help_faq'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Switcher */}
            <div className="relative group">
              <div className="flex items-center gap-1 bg-slate-100 text-xs font-semibold text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-200">
                <Globe className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>

              <div className="absolute right-0 mt-1 w-28 bg-white border border-slate-200 rounded-xl shadow-xl py-1 hidden group-hover:block z-50">
                {(['NGN', 'USD', 'GBP', 'EUR'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#155EEF] hover:text-white flex items-center justify-between ${
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

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAIConsultant}
              className="bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
              title="Ask AI Legal Due Diligence Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
              <span className="hidden md:inline">AI Legal Advisor</span>
            </button>

            {/* Saved Properties Count */}
            <button
              onClick={() => setActiveTab('client_portal')}
              className="relative bg-slate-100 hover:bg-slate-200 p-2 rounded-lg text-slate-700 border border-slate-200 transition-all"
              title="My Client Portal & Saved Properties"
            >
              <Bookmark className="w-4 h-4 text-[#155EEF]" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A72C] text-slate-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Submit Property Verification CTA */}
            <button
              onClick={onRequestVerification}
              className="hidden sm:flex bg-[#155EEF] hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify Property
            </button>

            {/* Client Portal Tab */}
            <button
              onClick={() => setActiveTab('client_portal')}
              className={`p-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                activeTab === 'client_portal'
                  ? 'bg-[#155EEF] border-blue-500 text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Client Portal"
            >
              <User className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-200 no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'marketplace' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('verification_hub')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 ${
              activeTab === 'verification_hub' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-[#D4A72C]" />
            Verification Hub
          </button>
          <button
            onClick={() => setActiveTab('diaspora_gateway')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'diaspora_gateway' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            Diaspora Gateway
          </button>
          <button
            onClick={() => setActiveTab('investment_calc')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'investment_calc' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            ROI Calculator
          </button>
          <button
            onClick={() => setActiveTab('property_mgmt')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'property_mgmt' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            Management
          </button>
          <button
            onClick={() => setActiveTab('title_guide')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'title_guide' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            Title Guide
          </button>
          <button
            onClick={() => setActiveTab('help_faq')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'help_faq' ? 'bg-[#155EEF] text-white' : 'text-slate-600'
            }`}
          >
            Help & FAQ
          </button>
        </div>
      </div>
    </header>
  );
};
