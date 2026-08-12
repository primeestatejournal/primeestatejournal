import React from 'react';
import { ShieldCheck, Globe, Building2, Calculator, KeyRound, Search, Bookmark, Compass, Sparkles, ChevronDown, User } from 'lucide-react';
import { CurrencyCode } from '../types';

interface HeaderProps {
  activeTab: 'marketplace' | 'verification_hub' | 'diaspora_gateway' | 'investment_calc' | 'property_mgmt' | 'client_portal';
  setActiveTab: (tab: 'marketplace' | 'verification_hub' | 'diaspora_gateway' | 'investment_calc' | 'property_mgmt' | 'client_portal') => void;
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
    <header className="sticky top-0 z-40 bg-[#0B1F3A] text-white border-b border-[#1E3A5F] shadow-lg">
      {/* Top Banner Notice */}
      <div className="bg-[#155EEF] px-4 py-1.5 text-xs font-medium text-white flex flex-wrap items-center justify-between gap-2">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#D4A72C] text-[#0B1F3A] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#155EEF] to-[#0B1F3A] border border-[#D4A72C]/40 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#D4A72C]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  primeestatejournal<span className="text-[#D4A72C]">.</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-[10px] text-blue-200 tracking-wider uppercase font-medium">
                Realty & Due Diligence Platform
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#102A4E] p-1.5 rounded-xl border border-[#1E3A5F]">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Management
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency Switcher */}
            <div className="relative group">
              <div className="flex items-center gap-1 bg-[#102A4E] text-xs font-semibold text-gray-200 px-2.5 py-1.5 rounded-lg border border-[#1E3A5F] cursor-pointer hover:border-blue-400/50">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>

              <div className="absolute right-0 mt-1 w-28 bg-[#0B1F3A] border border-[#1E3A5F] rounded-xl shadow-xl py-1 hidden group-hover:block z-50">
                {(['NGN', 'USD', 'GBP', 'EUR'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#155EEF] hover:text-white flex items-center justify-between ${
                      currency === c ? 'text-[#D4A72C] font-bold' : 'text-gray-300'
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
              className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-[#D4A72C]/40 text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0B1F3A] px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
              title="Ask AI Legal Due Diligence Advisor"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">AI Legal Advisor</span>
            </button>

            {/* Saved Properties Count */}
            <button
              onClick={() => setActiveTab('client_portal')}
              className="relative bg-[#102A4E] hover:bg-[#1E3A5F] p-2 rounded-lg text-gray-200 border border-[#1E3A5F] transition-all"
              title="My Client Portal & Saved Properties"
            >
              <Bookmark className="w-4 h-4 text-blue-300" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A72C] text-[#0B1F3A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Submit Property Verification CTA */}
            <button
              onClick={onRequestVerification}
              className="hidden sm:flex bg-[#155EEF] hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all items-center gap-1.5 border border-blue-400/30"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify Property
            </button>

            {/* Client Portal Tab */}
            <button
              onClick={() => setActiveTab('client_portal')}
              className={`p-2 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                activeTab === 'client_portal'
                  ? 'bg-[#155EEF] border-blue-400 text-white'
                  : 'bg-[#102A4E] border-[#1E3A5F] text-gray-300 hover:text-white'
              }`}
              title="Client Portal"
            >
              <User className="w-4 h-4 text-gray-200" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-[#1E3A5F] no-scrollbar text-xs">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'marketplace' ? 'bg-[#155EEF] text-white' : 'text-gray-300'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('verification_hub')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium flex items-center gap-1 ${
              activeTab === 'verification_hub' ? 'bg-[#155EEF] text-white' : 'text-gray-300'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-[#D4A72C]" />
            Verification Hub
          </button>
          <button
            onClick={() => setActiveTab('diaspora_gateway')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'diaspora_gateway' ? 'bg-[#155EEF] text-white' : 'text-gray-300'
            }`}
          >
            Diaspora Gateway
          </button>
          <button
            onClick={() => setActiveTab('investment_calc')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'investment_calc' ? 'bg-[#155EEF] text-white' : 'text-gray-300'
            }`}
          >
            ROI Calculator
          </button>
          <button
            onClick={() => setActiveTab('property_mgmt')}
            className={`px-3 py-1 rounded-full whitespace-nowrap font-medium ${
              activeTab === 'property_mgmt' ? 'bg-[#155EEF] text-white' : 'text-gray-300'
            }`}
          >
            Management
          </button>
        </div>
      </div>
    </header>
  );
};
