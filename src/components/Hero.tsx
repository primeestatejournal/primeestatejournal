import React from 'react';
import { Search, ShieldCheck, CheckCircle2, Lock, FileText, ArrowRight, Sparkles, MapPin, Building, ChevronDown } from 'lucide-react';
import { FilterState, PropertyCategory } from '../types';
import { PROPERTY_LOCATIONS } from '../data/properties';

interface HeroProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  onRequestVerification: () => void;
  onOpenAIConsultant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filter,
  setFilter,
  onRequestVerification,
  onOpenAIConsultant,
}) => {
  return (
    <section className="relative bg-[#0B1F3A] text-white pt-8 pb-14 overflow-hidden border-b border-[#1E3A5F]">
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#155EEF]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D4A72C]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#102A4E] border border-[#D4A72C]/40 text-[#D4A72C] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-inner">
            <ShieldCheck className="w-4 h-4 text-[#D4A72C]" />
            <span>PrimeEstateJournal Due Diligence Protocol™</span>
            <span className="text-gray-400">•</span>
            <span className="text-white font-normal">Independent Lands Registry Search</span>
          </div>
        </div>

        {/* Headline & Subtitle */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15] font-sans">
            Buy Nigerian Property <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-blue-300 to-[#D4A72C]">
              With Total Confidence.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
            Verified properties. Independent legal title search. Transparent escrow protection for Nigerians living at home and in the diaspora.
          </p>
        </div>

        {/* Search & Filter Box (SaaS Style) */}
        <div className="bg-[#102A4E] border border-[#1E3A5F] rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md mb-10">
          
          {/* Quick Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-[#1E3A5F] no-scrollbar text-xs">
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'all' }))}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter.category === 'all'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              All Verified Listings
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'residential_land' }))}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter.category === 'residential_land'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Verified Land Plots
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'luxury_apartment' }))}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter.category === 'luxury_apartment'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Luxury Apartments
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'diaspora_pick' }))}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                filter.category === 'diaspora_pick'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
              Diaspora Top Picks
            </button>
            <button
              onClick={() => setFilter((prev) => ({ ...prev, category: 'commercial_land' }))}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter.category === 'commercial_land'
                  ? 'bg-[#155EEF] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Commercial Acreage
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            
            {/* Search Query Input */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Keywords / Title / Dev</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={filter.searchQuery}
                  onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="e.g. Lekki Phase 1, C of O, Penthouse..."
                  className="w-full bg-[#0B1F3A] border border-[#1E3A5F] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#155EEF]"
                />
              </div>
            </div>

            {/* Location Select */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">State / District</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#D4A72C]" />
                <select
                  value={filter.district}
                  onChange={(e) => setFilter((prev) => ({ ...prev, district: e.target.value }))}
                  className="w-full bg-[#0B1F3A] border border-[#1E3A5F] rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-[#155EEF] appearance-none"
                >
                  <option value="">All Locations (Lagos, Abuja, PH)</option>
                  {PROPERTY_LOCATIONS.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name} ({loc.state})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Title Type Select */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Legal Title Document</label>
              <div className="relative">
                <FileText className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                <select
                  value={filter.titleFilter}
                  onChange={(e) => setFilter((prev) => ({ ...prev, titleFilter: e.target.value }))}
                  className="w-full bg-[#0B1F3A] border border-[#1E3A5F] rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-[#155EEF] appearance-none"
                >
                  <option value="">All Title Types</option>
                  <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                  <option value="Governor's Consent">Governor's Consent</option>
                  <option value="Gazette / Excision">Gazette / Excision</option>
                  <option value="Federal C of O">Federal C of O</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sorting Select */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">Sort Properties By</label>
              <div className="relative">
                <select
                  value={filter.sortBy}
                  onChange={(e) => setFilter((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="w-full bg-[#0B1F3A] border border-[#1E3A5F] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#155EEF] appearance-none"
                >
                  <option value="recommended">Recommended & Verified</option>
                  <option value="highest-yield">Highest Rental Yield</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Toggle Switches Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1E3A5F] text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filter.verifiedOnly}
                  onChange={(e) => setFilter((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-600 text-[#155EEF] focus:ring-[#155EEF] bg-[#0B1F3A]"
                />
                <span className="text-gray-200 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Clean Title Verified Only
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filter.diasporaOnly}
                  onChange={(e) => setFilter((prev) => ({ ...prev, diasporaOnly: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-600 text-[#155EEF] focus:ring-[#155EEF] bg-[#0B1F3A]"
                />
                <span className="text-gray-200 font-medium flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#D4A72C]" />
                  Diaspora Escrow Ready Only
                </span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAIConsultant}
                className="text-xs text-[#D4A72C] hover:underline font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI Due Diligence Advisor
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics / Trust Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="bg-[#102A4E]/60 border border-[#1E3A5F] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white font-sans">₦4.2 Billion+</p>
              <p className="text-[11px] text-gray-400">Verified Deals Audited</p>
            </div>
          </div>

          <div className="bg-[#102A4E]/60 border border-[#1E3A5F] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white font-sans">100% Legal Guarantee</p>
              <p className="text-[11px] text-gray-400">Lands Registry Search</p>
            </div>
          </div>

          <div className="bg-[#102A4E]/60 border border-[#1E3A5F] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D4A72C]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white font-sans">350+ Diaspora Buyers</p>
              <p className="text-[11px] text-gray-400">Safely Transacted Abroad</p>
            </div>
          </div>

          <div className="bg-[#102A4E]/60 border border-[#1E3A5F] rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-white font-sans">0 Fraud Incidents</p>
              <p className="text-[11px] text-gray-400">Strict Due Diligence Audit</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
